/**
 * Helpers shared by the reactions-and-comments block (Engagement.jsx) and
 * the reaction strips on the project lists (ProjectReactions.jsx), so both
 * keep one notion of "my reactions". Nothing here touches the browser at
 * import time, so the unit tests can run the pure parts.
 */

const VISITOR_KEY = 'engage-visitor';
const MINE_KEY = 'engage-mine';
let sessionVisitor = '';
let sessionMine = {};

/** An anonymous id for this browser, created on its first reaction (never on a page view). */
export const visitorId = () => {
  const fresh = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`);
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = fresh();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    sessionVisitor ||= fresh();
    return sessionVisitor;
  }
};

/**
 * How long this browser trusts its own reaction over a fetched count: the
 * CDN may serve a copy up to 5 minutes stale (30 s fresh + stale while
 * revalidating), plus a margin.
 */
export const OWN_WINDOW_MS = 6 * 60 * 1000;

/** One remembered reaction: { on, count, at } (the count the server gave back, when). Older records stored `true`. */
const entryOf = (value) =>
  value && typeof value === 'object'
    ? { on: Boolean(value.on), count: Number(value.count) || 0, at: Number(value.at) || 0 }
    : { on: value === true, count: 0, at: 0 };

/** This browser's reactions: { [target]: { [key]: { on, count, at } } }. */
export const readMine = () => {
  let all;
  try {
    all = JSON.parse(localStorage.getItem(MINE_KEY) ?? '{}') ?? {};
  } catch {
    all = sessionMine;
  }
  return Object.fromEntries(
    Object.entries(all).map(([target, keys]) => [
      target,
      Object.fromEntries(Object.entries(keys ?? {}).map(([key, value]) => [key, entryOf(value)])),
    ]),
  );
};

export const writeMine = (target, key, entry) => {
  const all = readMine();
  const forTarget = { ...(all[target] ?? {}) };
  forTarget[key] = entryOf(entry);
  const next = { ...all, [target]: forTarget };
  try {
    localStorage.setItem(MINE_KEY, JSON.stringify(next));
  } catch {
    sessionMine = next;
  }
};

/** The storage key, for `storage` events from other tabs. */
export const MINE_STORAGE_KEY = MINE_KEY;

/**
 * The count to show for one reaction, given the fetched count (possibly a
 * stale CDN copy) and this browser's own record. For a few minutes after the
 * visitor's own press, the cached copy cannot undo it: on, the larger of the
 * two counts; off, the smaller. After that the fetched count wins, though a
 * reaction that is on always shows at least 1.
 */
export const effectiveCount = (fetched, entry, now = Date.now()) => {
  const count = Math.max(0, Number(fetched) || 0);
  if (!entry) return count;
  if (entry.at && now - entry.at < OWN_WINDOW_MS) {
    return entry.on ? Math.max(count, entry.count, 1) : Math.min(count, entry.count);
  }
  return entry.on ? Math.max(count, 1) : count;
};

/**
 * A fetched summary merged into what the page already has: every case study
 * in the new summary takes its new counts, and one the summary no longer
 * lists (its counts fell to zero) keeps its keys at 0 rather than vanishing.
 */
export const mergeSummary = (current, fetched) => {
  const merged = {};
  for (const [slug, counts] of Object.entries(current ?? {})) {
    merged[slug] = Object.fromEntries(Object.keys(counts).map((key) => [key, 0]));
  }
  for (const [slug, counts] of Object.entries(fetched ?? {})) merged[slug] = { ...(merged[slug] ?? {}), ...counts };
  return merged;
};

export const postJson = (url, body) =>
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

/**
 * Turns one reaction on or off on the server and records it as this
 * browser's. Resolves to { count, mine } for that key; rejects when refused.
 */
export const sendReaction = async (target, key, on) => {
  const response = await postJson('/api/react', { target, emoji: key, on, visitor: visitorId() });
  if (!response.ok) throw new Error(String(response.status));
  const result = await response.json();
  writeMine(target, key, { on: result.mine, count: result.count, at: Date.now() });
  return { count: result.count, mine: result.mine };
};

/** Appends a page of comments, skipping any already shown (a new comment can shift the pages). */
export const mergeComments = (shown, incoming) => {
  const seen = new Set(shown.map((comment) => comment.id));
  return [...shown, ...incoming.filter((comment) => !seen.has(comment.id))];
};


const UNITS = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
];

/**
 * How long ago, as { value, unit } for Intl.RelativeTimeFormat, or null for
 * "just now" (under a minute). A time in the future (a clock ahead of the
 * server's) counts as now.
 */
export const ago = (ms, now = Date.now()) => {
  const seconds = Math.max(0, Math.round((now - Number(ms)) / 1000));
  for (const [unit, size] of UNITS) {
    if (seconds >= size) return { value: -Math.floor(seconds / size), unit };
  }
  return null;
};
