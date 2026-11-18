import { neon } from '@neondatabase/serverless';

/**
 * Storage for reactions and comments: Neon Postgres over HTTP in production
 * (stateless, one HTTPS round trip per call, fine on Vercel functions), and
 * an in-memory store for `next dev` and the unit tests. Both offer the same
 * operations, named for what the feature needs rather than for SQL:
 *
 *   react(target, key, voter, on)        -> { changed, count }
 *   admitVoter(target, ipHash, voter, max, seconds) -> boolean
 *   hit(bucket, seconds)                 -> count in the current window
 *   thread(target, offset, limit)        -> { reactions, comments, total }
 *   summary()                            -> [{ target, key, count }]
 *   insertComment(comment, pendingMax)   -> boolean (false: queue full)
 *   getComment(id) / approve(id) / remove(id) -> comment | null
 *   list(status, limit)                  -> comments, newest first
 *
 * Comments come back as { id, target, name, text, status, ipHash, lang,
 * createdAt } with createdAt in milliseconds.
 *
 * Configured by the Vercel Neon integration, which sets DATABASE_URL (and
 * POSTGRES_URL); either is read. The tables are created on first use, so
 * nobody runs a migration.
 */

const now = () => Date.now();

export const createMemoryStore = () => {
  const reactions = new Map(); // `${target}|${key}` -> Set(voter)
  const voters = new Map(); // `${target}|${ipHash}` -> Map(voter -> expires)
  const limits = new Map(); // bucket -> { count, expires }
  const comments = new Map(); // id -> comment
  const set = (target, key) => reactions.get(`${target}|${key}`) ?? reactions.set(`${target}|${key}`, new Set()).get(`${target}|${key}`);
  const newest = (a, b) => b.createdAt - a.createdAt;
  return {
    kind: 'memory',
    async react(target, key, voter, on) {
      const s = set(target, key);
      const had = s.has(voter);
      if (on) s.add(voter);
      else s.delete(voter);
      return { changed: had !== on, count: s.size };
    },
    async admitVoter(target, ipHash, voter, max, seconds) {
      const known = voters.get(`${target}|${ipHash}`) ?? new Map();
      for (const [id, expires] of known) if (expires <= now()) known.delete(id);
      voters.set(`${target}|${ipHash}`, known);
      if (known.has(voter)) return true;
      if (known.size >= max) return false;
      known.set(voter, now() + seconds * 1000);
      return true;
    },
    async hit(bucket, seconds) {
      const entry = limits.get(bucket);
      if (!entry || entry.expires <= now()) {
        limits.set(bucket, { count: 1, expires: now() + seconds * 1000 });
        return 1;
      }
      entry.count += 1;
      return entry.count;
    },
    async thread(target, offset, limit) {
      const counts = {};
      for (const [field, s] of reactions) {
        const [t, key] = field.split('|');
        if (t === target && s.size) counts[key] = s.size;
      }
      const approved = [...comments.values()].filter((c) => c.target === target && c.status === 'approved').sort(newest);
      return { reactions: counts, comments: approved.slice(offset, offset + limit), total: approved.length };
    },
    async summary() {
      const rows = [];
      for (const [field, s] of reactions) {
        const [target, key] = field.split('|');
        if (target.startsWith('case:') && s.size) rows.push({ target, key, count: s.size });
      }
      const byTarget = {};
      for (const c of comments.values()) if (c.status === 'approved' && c.target.startsWith('case:')) byTarget[c.target] = (byTarget[c.target] ?? 0) + 1;
      for (const [target, count] of Object.entries(byTarget)) rows.push({ target, key: 'comments', count });
      return rows;
    },
    async insertComment(comment, pendingMax) {
      if ([...comments.values()].filter((c) => c.status === 'pending').length >= pendingMax) return false;
      comments.set(comment.id, { ...comment });
      return true;
    },
    async getComment(id) {
      const c = comments.get(id);
      return c ? { ...c } : null;
    },
    async approve(id) {
      const c = comments.get(id);
      if (!c) return null;
      const before = { ...c };
      c.status = 'approved';
      return before;
    },
    async remove(id) {
      const c = comments.get(id);
      if (!c) return null;
      comments.delete(id);
      return { ...c };
    },
    async list(status, limit) {
      return [...comments.values()].filter((c) => c.status === status).sort(newest).slice(0, limit).map((c) => ({ ...c }));
    },
  };
};

const fromRow = (row) =>
  row && {
    id: row.id,
    target: row.target,
    name: row.name,
    text: row.text,
    status: row.status,
    ipHash: row.ip_hash,
    lang: row.lang,
    createdAt: Number(row.created_at),
  };

/**
 * The store over Postgres. `sql` is a Neon `neon()` tag: every query below
 * is a tagged template, so values always travel as parameters and are never
 * spliced into the SQL text. The unit tests pass a recording fake.
 */
export const createSqlStore = ({ url, sql: given }) => {
  const sql = given ?? neon(url);

  // Created once per server process, on first use. The advisory lock makes
  // two cold instances creating the tables at once wait for each other
  // instead of racing on the catalog. A failure is retried on the next call.
  let ready = null;
  const schema = () =>
    (ready ??= sql
      .transaction([
        sql`SELECT pg_advisory_xact_lock(7271001)`,
        sql`CREATE TABLE IF NOT EXISTS engage_reactions (
          target text NOT NULL,
          key text NOT NULL,
          voter text NOT NULL,
          created_at timestamptz NOT NULL DEFAULT now(),
          PRIMARY KEY (target, key, voter)
        )`,
        sql`CREATE TABLE IF NOT EXISTS engage_comments (
          id text PRIMARY KEY,
          target text NOT NULL,
          name text NOT NULL,
          text text NOT NULL,
          status text NOT NULL,
          ip_hash text NOT NULL,
          lang text NOT NULL DEFAULT 'en',
          created_at bigint NOT NULL
        )`,
        sql`CREATE INDEX IF NOT EXISTS engage_comments_thread ON engage_comments (target, status, created_at DESC)`,
        sql`CREATE INDEX IF NOT EXISTS engage_comments_status ON engage_comments (status, created_at DESC)`,
        sql`CREATE TABLE IF NOT EXISTS engage_limits (
          bucket text PRIMARY KEY,
          count integer NOT NULL,
          expires_at timestamptz NOT NULL
        )`,
        sql`CREATE TABLE IF NOT EXISTS engage_voters (
          target text NOT NULL,
          ip_hash text NOT NULL,
          voter text NOT NULL,
          expires_at timestamptz NOT NULL,
          PRIMARY KEY (target, ip_hash, voter)
        )`,
      ])
      .catch((error) => {
        ready = null;
        throw error;
      }));

  // Expired limit and voter rows are cleared on about one write in a hundred.
  const sweep = async () => {
    if (Math.random() >= 0.01) return;
    await sql.transaction([
      sql`DELETE FROM engage_limits WHERE expires_at <= now()`,
      sql`DELETE FROM engage_voters WHERE expires_at <= now()`,
    ]);
  };

  return {
    kind: 'postgres',

    async react(target, key, voter, on) {
      await schema();
      const [changed, [{ n }]] = await sql.transaction([
        on
          ? sql`INSERT INTO engage_reactions (target, key, voter) VALUES (${target}, ${key}, ${voter}) ON CONFLICT DO NOTHING RETURNING 1 AS done`
          : sql`DELETE FROM engage_reactions WHERE target = ${target} AND key = ${key} AND voter = ${voter} RETURNING 1 AS done`,
        sql`SELECT count(*)::int AS n FROM engage_reactions WHERE target = ${target} AND key = ${key}`,
      ]);
      return { changed: changed.length > 0, count: Number(n) };
    },

    /**
     * Lets a voter in if this network already brought it to this thread, or
     * has brought fewer than `max` today. One transaction under an advisory
     * lock per (thread, network): a burst of parallel requests is counted
     * one at a time, so the cap cannot be overshot.
     */
    async admitVoter(target, ipHash, voter, max, seconds) {
      await schema();
      const results = await sql.transaction([
        sql`SELECT pg_advisory_xact_lock(hashtext(${`${target}|${ipHash}`}::text))`,
        sql`DELETE FROM engage_voters WHERE target = ${target} AND ip_hash = ${ipHash} AND expires_at <= now()`,
        sql`INSERT INTO engage_voters (target, ip_hash, voter, expires_at)
          SELECT ${target}::text, ${ipHash}::text, ${voter}::text, now() + make_interval(secs => ${seconds}::int)
          WHERE (SELECT count(*) FROM engage_voters WHERE target = ${target} AND ip_hash = ${ipHash}) < ${max}::int
          ON CONFLICT (target, ip_hash, voter) DO NOTHING`,
        sql`SELECT EXISTS (SELECT 1 FROM engage_voters WHERE target = ${target} AND ip_hash = ${ipHash} AND voter = ${voter}) AS ok`,
      ]);
      await sweep();
      return Boolean(results[3][0]?.ok);
    },

    /** One more in a fixed window; the window starts again once it has expired. */
    async hit(bucket, seconds) {
      await schema();
      const [{ count }] = await sql`
        INSERT INTO engage_limits (bucket, count, expires_at)
        VALUES (${bucket}, 1, now() + make_interval(secs => ${seconds}::int))
        ON CONFLICT (bucket) DO UPDATE SET
          count = CASE WHEN engage_limits.expires_at <= now() THEN 1 ELSE engage_limits.count + 1 END,
          expires_at = CASE WHEN engage_limits.expires_at <= now() THEN EXCLUDED.expires_at ELSE engage_limits.expires_at END
        RETURNING count`;
      await sweep();
      return Number(count);
    },

    /** One round trip: the counts and total, then the page of approved comments. */
    async thread(target, offset, limit) {
      await schema();
      const [[head], rows] = await sql.transaction(
        [
          sql`SELECT
            (SELECT coalesce(json_object_agg(key, n), '{}'::json) FROM (
              SELECT key, count(*)::int AS n FROM engage_reactions WHERE target = ${target} GROUP BY key
            ) AS r) AS reactions,
            (SELECT count(*)::int FROM engage_comments WHERE target = ${target} AND status = 'approved') AS total`,
          sql`SELECT id, target, name, text, status, ip_hash, lang, created_at FROM engage_comments
            WHERE target = ${target} AND status = 'approved'
            ORDER BY created_at DESC LIMIT ${limit}::int OFFSET ${offset}::int`,
        ],
        { readOnly: true },
      );
      const reactions = typeof head.reactions === 'string' ? JSON.parse(head.reactions) : head.reactions ?? {};
      return { reactions, comments: rows.map(fromRow), total: Number(head.total) };
    },

    /** One query: reaction counts by key, and approved-comment counts, for every case study. */
    async summary() {
      await schema();
      const rows = await sql`
        SELECT target, key, count(*)::int AS count FROM engage_reactions WHERE target LIKE 'case:%' GROUP BY target, key
        UNION ALL
        SELECT target, 'comments' AS key, count(*)::int AS count FROM engage_comments
          WHERE target LIKE 'case:%' AND status = 'approved' GROUP BY target`;
      return rows.map((row) => ({ target: row.target, key: row.key, count: Number(row.count) }));
    },

    async insertComment(c, pendingMax) {
      await schema();
      const rows = await sql`
        INSERT INTO engage_comments (id, target, name, text, status, ip_hash, lang, created_at)
        SELECT ${c.id}::text, ${c.target}::text, ${c.name}::text, ${c.text}::text, ${c.status}::text, ${c.ipHash}::text, ${c.lang}::text, ${c.createdAt}::bigint
        WHERE (SELECT count(*) FROM engage_comments WHERE status = 'pending') < ${pendingMax}::int
        RETURNING id`;
      return rows.length > 0;
    },

    async getComment(id) {
      await schema();
      const [row] = await sql`SELECT id, target, name, text, status, ip_hash, lang, created_at FROM engage_comments WHERE id = ${id}`;
      return fromRow(row) ?? null;
    },

    /** Approves a comment; returns it as it was before (so the caller can tell whether it changed). */
    async approve(id) {
      await schema();
      const [before] = await sql.transaction([
        sql`SELECT id, target, name, text, status, ip_hash, lang, created_at FROM engage_comments WHERE id = ${id} FOR UPDATE`,
        sql`UPDATE engage_comments SET status = 'approved' WHERE id = ${id}`,
      ]);
      return fromRow(before[0]) ?? null;
    },

    async remove(id) {
      await schema();
      const [row] = await sql`DELETE FROM engage_comments WHERE id = ${id} RETURNING id, target, name, text, status, ip_hash, lang, created_at`;
      return fromRow(row) ?? null;
    },

    async list(status, limit) {
      await schema();
      const rows = await sql`
        SELECT id, target, name, text, status, ip_hash, lang, created_at FROM engage_comments
        WHERE status = ${status} ORDER BY created_at DESC LIMIT ${limit}::int`;
      return rows.map(fromRow);
    },
  };
};

/** The Postgres URL from the environment, or empty. */
export const databaseUrl = (env = process.env) => env.DATABASE_URL || env.POSTGRES_URL || '';

// One memory store per server process, so `next dev` keeps state between
// requests (and between hot reloads, through globalThis).
const memory = () => (globalThis.__engageMemoryStore ??= createMemoryStore());

// One SQL store per URL per process, so the schema check runs once.
const sqlStores = new Map();

/**
 * The store for this environment, or null when the feature is off:
 * Postgres when a database URL is set; memory only outside production builds.
 */
export const getStore = (env = process.env) => {
  const url = databaseUrl(env);
  if (url) return sqlStores.get(url) ?? sqlStores.set(url, createSqlStore({ url })).get(url);
  if (env.NODE_ENV !== 'production') return memory();
  return null;
};
