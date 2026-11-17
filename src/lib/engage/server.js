import { CASE_STUDY_SLUGS } from '../case-studies.js';
import { BLOG_SLUGS } from '../blog.js';
import { COURSES, TEACHING_PUBLIC } from '../teaching.js';
import { LIMITS, REACTION_KEYS, caseTarget, postTarget, teachTarget } from './shared.js';
import { validateComment, isReactionKey } from './validate.js';
import { newCommentId, voterKey } from './crypto.js';
import { getStore } from './store.js';

/**
 * Reactions and comments, server side. Everything here works on a store
 * (src/lib/engage/store.js) and a secret, both passed in, so the unit tests
 * run it on the memory store.
 *
 * Keys (all under `eng:`):
 *   r:<target>:<reaction>  set of voter keys     (count = size)
 *   c:<id>                 hash: one comment
 *   a:<target>             sorted set of approved comment ids, by time
 *   pending                sorted set of pending comment ids, by time
 *   recent                 sorted set of approved comment ids, all targets
 *   rl:<kind>:<ip hash>    hourly rate-limit counter
 */

/**
 * Every thread that may receive reactions or comments. The teaching courses
 * count only while the Teaching page is public (`TEACHING_PUBLIC` in
 * src/lib/teaching.js): a hidden page takes no comments.
 */
export const TEACHING_THREADS = TEACHING_PUBLIC === false ? [] : COURSES.map((course) => teachTarget(course.id));
export const TARGETS = new Set([...CASE_STUDY_SLUGS.map(caseTarget), ...BLOG_SLUGS.map(postTarget), ...TEACHING_THREADS]);
export const isTarget = (value) => typeof value === 'string' && TARGETS.has(value);

export const RATE_LIMITS = { comment: 5, react: 60, login: 10 };
const HOUR = 3600;

const K = {
  reaction: (target, key) => `eng:r:${target}:${key}`,
  comment: (id) => `eng:c:${id}`,
  approved: (target) => `eng:a:${target}`,
  pending: 'eng:pending',
  recent: 'eng:recent',
  rate: (kind, ipHash) => `eng:rl:${kind}:${ipHash}`,
};

/**
 * The feature's configuration for this environment, or null when it is off.
 * Off in a production build without Redis, or without a COMMENTS_SECRET of
 * at least 16 characters. Outside production a fixed development secret
 * stands in, so `next dev` and the tests work with no setup.
 */
export const engageConfig = (env = process.env) => {
  const store = getStore(env);
  if (!store) return null;
  const production = env.NODE_ENV === 'production';
  const secret = env.COMMENTS_SECRET || (production ? '' : 'development-only-comments-secret');
  if (secret.length < 16) return null;
  return {
    store,
    secret,
    resendKey: env.RESEND_API_KEY || '',
    ownerEmail: env.OWNER_EMAIL || 'belalnajy9@gmail.com',
  };
};

/** Counts one action against an hourly budget; true when over it. */
export const overLimit = async (store, kind, ipHash) =>
  (await store.incrWindow(K.rate(kind, ipHash), HOUR)) > RATE_LIMITS[kind];

const publicComment = (c) => ({ id: c.id, name: c.name, text: c.text, createdAt: Number(c.createdAt) });

/** Reaction counts (and this visitor's own), plus a page of approved comments, newest first. */
export const getThread = async ({ store, secret }, { target, visitorId, ipHash, page = 1 }) => {
  const voter = visitorId ? voterKey(secret, visitorId, ipHash) : null;
  const reactions = Object.fromEntries(
    await Promise.all(
      REACTION_KEYS.map(async (key) => [
        key,
        {
          count: Number(await store.scard(K.reaction(target, key))),
          mine: voter ? Boolean(Number(await store.sismember(K.reaction(target, key), voter))) : false,
        },
      ]),
    ),
  );
  const total = Number(await store.zcard(K.approved(target)));
  const pages = Math.max(1, Math.ceil(total / LIMITS.pageSize));
  const current = Math.min(Math.max(1, Math.floor(Number(page)) || 1), pages);
  const start = (current - 1) * LIMITS.pageSize;
  const ids = await store.zrevrange(K.approved(target), start, start + LIMITS.pageSize - 1);
  const comments = (await Promise.all(ids.map((id) => store.hgetall(K.comment(id)))))
    .filter((c) => c && c.status === 'approved')
    .map(publicComment);
  return { reactions, comments, total, page: current, pages };
};

/**
 * Turns one reaction on or off for this visitor. Idempotent: the same voter
 * pressing twice does not count twice. Returns the new count.
 */
export const react = async ({ store, secret }, { target, key, on, visitorId, ipHash }) => {
  if (!isTarget(target) || !isReactionKey(key) || typeof on !== 'boolean' || !visitorId) return { error: 'invalid' };
  if (await overLimit(store, 'react', ipHash)) return { error: 'rate' };
  const setKey = K.reaction(target, key);
  const voter = voterKey(secret, visitorId, ipHash);
  if (on) await store.sadd(setKey, voter);
  else await store.srem(setKey, voter);
  return { ok: true, count: Number(await store.scard(setKey)), mine: on };
};

/**
 * Stores a comment as pending. Bots get the same answer as people: a
 * honeypot hit or a form sent too fast is "accepted" and dropped.
 * Returns { ok, comment } (comment only when one was stored) or { error }.
 */
export const submitComment = async ({ store }, { target, name, text, website, elapsedMs, ipHash, now = Date.now() }) => {
  if (!isTarget(target)) return { error: 'invalid' };
  if (website || !(Number(elapsedMs) >= LIMITS.minFormMs)) return { ok: true, dropped: true };
  const checked = validateComment({ name, text });
  if (!checked.ok) return { error: checked.error };
  if (await overLimit(store, 'comment', ipHash)) return { error: 'rate' };
  const comment = {
    id: newCommentId(),
    target,
    name: checked.name,
    text: checked.text,
    createdAt: String(now),
    status: 'pending',
    ipHash,
  };
  await store.hset(K.comment(comment.id), comment);
  await store.zadd(K.pending, now, comment.id);
  return { ok: true, comment };
};

/** Approves or deletes a comment. Returns the comment as it was, or null when there is none. */
export const moderate = async ({ store }, action, id) => {
  if (typeof id !== 'string' || !/^[\w-]{8,32}$/.test(id)) return null;
  const comment = await store.hgetall(K.comment(id));
  if (!comment) return null;
  const at = Number(comment.createdAt);
  if (action === 'approve') {
    if (comment.status !== 'approved') {
      await store.hset(K.comment(id), { status: 'approved' });
      await store.zrem(K.pending, id);
      await store.zadd(K.approved(comment.target), at, id);
      await store.zadd(K.recent, at, id);
    }
    return comment;
  }
  if (action === 'delete') {
    await store.zrem(K.pending, id);
    await store.zrem(K.approved(comment.target), id);
    await store.zrem(K.recent, id);
    await store.del(K.comment(id));
    return comment;
  }
  return null;
};

const list = async (store, key, limit) => {
  const ids = await store.zrevrange(key, 0, limit - 1);
  return (await Promise.all(ids.map((id) => store.hgetall(K.comment(id))))).filter(Boolean);
};
export const listPending = ({ store }, limit = 100) => list(store, K.pending, limit);
export const listRecent = ({ store }, limit = 30) => list(store, K.recent, limit);
