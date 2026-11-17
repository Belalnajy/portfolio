import { LIMITS, REACTION_KEYS } from './shared.js';

/**
 * Input clean-up and checks for reactions and comments. Pure functions, used
 * by the API routes and the unit tests; the browser uses the same rules for
 * its inline messages.
 *
 * Comments are stored and shown as plain text (React text nodes), so nothing
 * here is about HTML escaping: it is about keeping names and text readable
 * and honest. Control characters, bidi overrides and invisible joiners are
 * removed, because they can make a name or a comment display differently
 * from what was typed (an RTL override can reverse a URL, for instance).
 */

// C0/C1 controls except newline and tab, the bidi embedding/override/isolate
// controls, zero-width characters, and the BOM. Built from code points so
// the source stays plain ASCII.
const INVISIBLE_RANGES = [[0x00, 0x08], [0x0b, 0x1f], [0x7f, 0x9f], [0x200b, 0x200f], [0x202a, 0x202e], [0x2060, 0x2069], [0xfeff, 0xfeff]];
const INVISIBLE = new RegExp(
  `[${INVISIBLE_RANGES.map(([from, to]) => `${String.fromCharCode(from)}-${String.fromCharCode(to)}`).join('')}]`,
  'g',
);
const LINK = /\bhttps?:\/\/|\bwww\./gi;

const length = (text) => [...text].length;

/** A display name: one line, single spaces, no invisible characters. */
export const normaliseName = (value) =>
  String(value ?? '')
    .normalize('NFC')
    .replace(INVISIBLE, '')
    .replace(/\s+/g, ' ')
    .trim();

/** A comment: lines kept, trailing spaces and runs of blank lines trimmed. */
export const normaliseText = (value) =>
  String(value ?? '')
    .normalize('NFC')
    .replace(/\r\n?/g, '\n')
    .replace(/\t/g, ' ')
    .replace(INVISIBLE, '')
    .split('\n')
    .map((line) => line.replace(/[ \xA0]+/g, ' ').trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

export const countLinks = (text) => (String(text).match(LINK) ?? []).length;

/**
 * Checks a comment. Returns `{ ok: true, name, text }` with the cleaned
 * values, or `{ ok: false, error }` where error is one of: name, text, links.
 */
export const validateComment = ({ name, text }) => {
  const cleanName = normaliseName(name);
  const cleanText = normaliseText(text);
  if (length(cleanName) < LIMITS.nameMin || length(cleanName) > LIMITS.nameMax) return { ok: false, error: 'name' };
  if (countLinks(cleanName) > 0) return { ok: false, error: 'name' };
  if (length(cleanText) < LIMITS.textMin || length(cleanText) > LIMITS.textMax) return { ok: false, error: 'text' };
  if (countLinks(cleanText) > LIMITS.linksMax) return { ok: false, error: 'links' };
  return { ok: true, name: cleanName, text: cleanText };
};

export const isReactionKey = (key) => typeof key === 'string' && REACTION_KEYS.includes(key);

/** An anonymous visitor id from the browser: a UUID, or nothing. */
export const cleanVisitorId = (value) =>
  typeof value === 'string' && /^[0-9a-f-]{16,64}$/i.test(value) ? value.toLowerCase() : '';
