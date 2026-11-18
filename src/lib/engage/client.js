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

/** This browser's reactions: { [target]: { [key]: true } }. */
export const readMine = () => {
  try {
    return JSON.parse(localStorage.getItem(MINE_KEY) ?? '{}') ?? {};
  } catch {
    return sessionMine;
  }
};

export const writeMine = (target, key, on) => {
  const all = readMine();
  const forTarget = { ...(all[target] ?? {}) };
  if (on) forTarget[key] = true;
  else delete forTarget[key];
  const next = { ...all, [target]: forTarget };
  try {
    localStorage.setItem(MINE_KEY, JSON.stringify(next));
  } catch {
    sessionMine = next;
  }
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
  writeMine(target, key, result.mine);
  return { count: result.count, mine: result.mine };
};

/** Appends a page of comments, skipping any already shown (a new comment can shift the pages). */
export const mergeComments = (shown, incoming) => {
  const seen = new Set(shown.map((comment) => comment.id));
  return [...shown, ...incoming.filter((comment) => !seen.has(comment.id))];
};

/**
 * The count to show for a reaction. The counts come through a CDN cache up
 * to a few minutes old, while this browser's own reaction is known at once:
 * if it reacted, the count is at least 1.
 */
export const displayCount = (count, mine) => Math.max(Number(count) || 0, mine ? 1 : 0);

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
