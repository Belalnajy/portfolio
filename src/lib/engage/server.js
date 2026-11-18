import { CASE_STUDIES, CASE_STUDY_SLUGS } from '../case-studies.js';
import { BLOG_POSTS, BLOG_SLUGS } from '../blog.js';
import en from '../../locales/en.js';
import ar from '../../locales/ar.js';
import { COURSES, TEACHING_PUBLIC } from '../teaching.js';
import { LIMITS, REACTION_KEYS, caseTarget, postTarget, teachTarget } from './shared.js';
import { validateComment, isReactionKey } from './validate.js';
import { deriveKeys, formTokenAge, newCommentId, voterKey } from './crypto.js';
import { getStore, databaseUrl } from './store.js';

/**
 * Reactions and comments, server side. Everything here works on a store
 * (src/lib/engage/store.js: Postgres, or memory in development and tests)
 * and on keys derived from the secret, both passed in, so the unit tests run
 * it on the memory store.
 *
 * Rate-limit buckets (engage_limits): `rl:<kind>:<ip hash>` per connection
 * and `rl:email:all` for the whole site, each an hourly window.
 */

/**
 * Every thread that may receive reactions or comments. The teaching courses
 * count only while the Teaching page is public (`TEACHING_PUBLIC` in
 * src/lib/teaching.js): a hidden page takes no comments.
 */
export const TEACHING_THREADS = TEACHING_PUBLIC === false ? [] : COURSES.map((course) => teachTarget(course.id));
export const TARGETS = new Set([...CASE_STUDY_SLUGS.map(caseTarget), ...BLOG_SLUGS.map(postTarget), ...TEACHING_THREADS]);
export const isTarget = (value) => typeof value === 'string' && TARGETS.has(value);

/** Hourly budgets: per connection for comments, reactions and sign-ins; for the whole site for email. */
export const RATE_LIMITS = { comment: 10, react: 60, login: 10, email: 20 };
/** Distinct new reaction voters one connection may add to one thread in a day. */
export const VOTERS_PER_NETWORK = 10;
/** Past this many comments waiting for approval, new ones are refused. */
export const PENDING_MAX = 500;
/** The furthest page of comments anyone can ask for (the API refuses beyond it). */
export const MAX_PAGE = 50;
const HOUR = 3600;
const DAY = 86400;

/** Stands in for COMMENTS_SECRET in `next dev` and the tests, never next to real storage. */
export const DEV_SECRET = 'development-only-comments-secret';

/**
 * The feature's configuration for this environment, or null when it is off.
 * Off in a production build without a database URL; off wherever a database
 * is configured without a COMMENTS_SECRET (the development secret is never
 * used next to real data); off with a secret shorter than 16 characters.
 */
export const engageConfig = (env = process.env) => {
  const store = getStore(env);
  if (!store) return null;
  const secret = env.COMMENTS_SECRET || (databaseUrl(env) || env.NODE_ENV === 'production' ? '' : DEV_SECRET);
  if (secret.length < 16) return null;
  return {
    store,
    secret,
    keys: deriveKeys(secret),
    resendKey: env.RESEND_API_KEY || '',
    ownerEmail: env.OWNER_EMAIL || 'belalnajy9@gmail.com',
  };
};

/** Counts one action against an hourly budget; true when over it. */
export const overLimit = async (store, kind, who) => (await store.hit(`rl:${kind}:${who}`, HOUR)) > RATE_LIMITS[kind];

/** One email more this hour, site-wide; false once the hour's budget is spent. */
export const emailAllowed = async (store) => !(await overLimit(store, 'email', 'all'));

const publicComment = (c) => ({ id: c.id, name: c.name, text: c.text, createdAt: Number(c.createdAt) });

/**
 * Reaction counts and a page of approved comments, newest first. The same
 * for every visitor (nothing personal), so the response can be cached by the
 * CDN; each browser remembers its own reactions.
 */
export const getThread = async ({ store }, { target, page = 1 }) => {
  const wanted = Math.min(MAX_PAGE, Math.max(1, Math.floor(Number(page)) || 1));
  // One round trip, whatever the page: past the end there are simply no
  // comments on it (never a second query for the last page).
  const result = await store.thread(target, (wanted - 1) * LIMITS.pageSize, LIMITS.pageSize);
  const pages = Math.max(1, Math.ceil(result.total / LIMITS.pageSize));
  const reactions = Object.fromEntries(REACTION_KEYS.map((key) => [key, { count: Number(result.reactions[key] ?? 0) }]));
  return { reactions, comments: result.comments.map(publicComment), total: result.total, page: wanted, pages };
};

/**
 * Turns one reaction on or off for this visitor. Keyed on the browser's
 * anonymous id alone, so the same person on Wi-Fi and then 4G counts once,
 * and idempotent: pressing twice does not count twice. Against a script that
 * invents new ids, one connection can add at most VOTERS_PER_NETWORK new
 * voters to a thread a day. Returns the new count and state for that key.
 */
export const react = async ({ store, keys }, { target, key, on, visitorId, ipHash }) => {
  if (!isTarget(target) || !isReactionKey(key) || typeof on !== 'boolean' || !visitorId) return { error: 'invalid' };
  if (await overLimit(store, 'react', ipHash)) return { error: 'rate' };
  const voter = voterKey(keys, visitorId);
  // A network may bring at most VOTERS_PER_NETWORK new voters to a thread a
  // day (checked and recorded in one locked step: no burst overshoot).
  if (on && !(await store.admitVoter(target, ipHash, voter, VOTERS_PER_NETWORK, DAY))) return { error: 'rate' };
  const { count } = await store.react(target, key, voter, on);
  return { ok: true, count, mine: on };
};

/**
 * Stores a comment as pending. Bots get the same answer as people: a
 * honeypot hit, or a form sent without a valid timing token or less than
 * LIMITS.minFormMs after the token was issued, is "accepted" and dropped.
 * Returns { ok, comment } (comment only when one was stored) or { error }.
 */
export const submitComment = async ({ store, keys }, { target, name, text, website, token, ipHash, lang, now = Date.now() }) => {
  if (!isTarget(target)) return { error: 'invalid' };
  const age = formTokenAge(keys, target, token, now);
  if (website || age === null || age < LIMITS.minFormMs || age > DAY * 1000) return { ok: true, dropped: true };
  const checked = validateComment({ name, text });
  if (!checked.ok) return { error: checked.error };
  if (await overLimit(store, 'comment', ipHash)) return { error: 'rate' };
  const comment = {
    id: newCommentId(),
    target,
    name: checked.name,
    text: checked.text,
    createdAt: now,
    status: 'pending',
    ipHash,
    // The language of the page it was written on, for the link in the email.
    lang: lang === 'ar' ? 'ar' : 'en',
  };
  // Refused once PENDING_MAX comments are waiting.
  if (!(await store.insertComment(comment, PENDING_MAX))) return { error: 'rate' };
  return { ok: true, comment };
};

/** Approves or deletes a comment. Returns the comment as it was, or null when there is none. */
export const moderate = async ({ store }, action, id) => {
  if (typeof id !== 'string' || !/^[\w-]{8,32}$/.test(id)) return null;
  if (action === 'approve') return store.approve(id);
  if (action === 'delete') return store.remove(id);
  return null;
};

export const listPending = ({ store }, limit = 100) => store.list('pending', limit);
export const listRecent = ({ store }, limit = 30) => store.list('approved', limit);

/**
 * Reaction and approved-comment counts for every case study, for the
 * project lists: { [slug]: { like, love, fire, clap, idea, comments } },
 * only for case studies with something to show. One query.
 */
export const getSummary = async ({ store }) => {
  const threads = {};
  for (const { target, key, count } of await store.summary()) {
    const slug = target.slice('case:'.length);
    if (!target.startsWith('case:') || !CASE_STUDY_SLUGS.includes(slug)) continue;
    if (key !== 'comments' && !REACTION_KEYS.includes(key)) continue;
    if (count > 0) (threads[slug] ??= {})[key] = count;
  }
  return threads;
};

/**
 * What a thread is, for the notification email: the human title (the
 * project's name, the article's or course's title in the page's language)
 * and the public path of its page, with /ar for an Arabic page.
 */
export const threadInfo = (target, lang = 'en') => {
  const [kind, id] = String(target).split(':');
  const arabic = lang === 'ar';
  const prefix = arabic ? '/ar' : '';
  if (kind === 'case' && CASE_STUDIES[id]) return { title: CASE_STUDIES[id].name, path: `${prefix}/case-study/${id}` };
  if (kind === 'post' && BLOG_POSTS[id]) return { title: BLOG_POSTS[id][arabic ? 'ar' : 'en']?.title ?? BLOG_POSTS[id].en.title, path: `${prefix}/blog/${id}` };
  if (kind === 'teach') {
    const course = (arabic ? ar : en).translation.teaching?.courses?.[id]?.title;
    if (course) return { title: course, path: `${prefix}/teaching` };
  }
  return { title: String(target), path: prefix || '/' };
};

