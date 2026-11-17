/**
 * Pure helpers for the reactions-and-comments block (Engagement.jsx), kept
 * apart so the unit tests can run them.
 */

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
