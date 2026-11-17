/**
 * Reactions and comments: the parts both the browser and the server read.
 * Nothing secret lives here; the server side is in src/lib/engage/server.js.
 */

/** The reaction set, in display order. The API takes the key, never the emoji. */
export const REACTIONS = [
  { key: 'like', emoji: '👍' },
  { key: 'love', emoji: '❤️' },
  { key: 'fire', emoji: '🔥' },
  { key: 'clap', emoji: '👏' },
  { key: 'idea', emoji: '💡' },
];
export const REACTION_KEYS = REACTIONS.map((r) => r.key);

export const LIMITS = {
  nameMin: 2,
  nameMax: 40,
  textMin: 3,
  textMax: 1000,
  linksMax: 2,
  /** Request bodies above this are refused before parsing. */
  bodyBytes: 1024,
  /** A form sent sooner than this after it appeared is a bot: accepted and dropped. */
  minFormMs: 3000,
  pageSize: 20,
};

/** Thread ids: `case:<slug>`, `post:<slug>`, `teach:<course>`. */
export const caseTarget = (slug) => `case:${slug}`;
export const postTarget = (slug) => `post:${slug}`;
export const teachTarget = (course) => `teach:${course}`;
