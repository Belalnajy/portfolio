import { createHash, createHmac, hkdfSync, randomBytes, timingSafeEqual } from 'node:crypto';

/**
 * Signing and hashing for the comments feature. Server-only: this module
 * must never be imported by a client component.
 *
 * COMMENTS_SECRET is the one value the owner sets (it is also the admin
 * password). Each use gets its own key derived from it with HKDF-SHA256 and a
 * label, so a signature made for one purpose (an email link, the admin
 * session, a form token) can never be replayed as another, and the IP and
 * voter hashes are salted with keys that sign nothing.
 */

const LABELS = ['session', 'link', 'ip', 'voter', 'form'];

/** { session, link, ip, voter, form }: 32-byte keys derived from the secret. */
export const deriveKeys = (secret) =>
  Object.fromEntries(
    LABELS.map((label) => [label, Buffer.from(hkdfSync('sha256', secret, 'belalnagy.com/engage', `engage:${label}`, 32))]),
  );

const hmac = (key, message) => createHmac('sha256', key).update(message).digest('base64url');

/** Constant-time comparison of two strings of any length. */
export const safeEqual = (a, b) => {
  // Hash first so the lengths match and timingSafeEqual cannot throw or leak
  // the expected length.
  const ha = createHash('sha256').update(String(a)).digest();
  const hb = createHash('sha256').update(String(b)).digest();
  return timingSafeEqual(ha, hb);
};

/** The signature on an email moderation link: HMAC-SHA256 of `<action>:<commentId>` under the link key. */
export const signAction = (keys, action, id) => hmac(keys.link, `${action}:${id}`);
export const verifyAction = (keys, action, id, signature) =>
  typeof signature === 'string' && safeEqual(signAction(keys, action, id), signature);

/** A keyed hash of the client network (see networkOf in http.js). The raw IP is never stored. */
export const hashIp = (keys, network) => hmac(keys.ip, network).slice(0, 32);

/** The reaction identity: the browser's anonymous id only, so changing networks does not count twice. */
export const voterKey = (keys, visitorId) => hmac(keys.voter, visitorId).slice(0, 32);

export const newCommentId = () => randomBytes(12).toString('base64url');

/** The admin session cookie: `<expiry ms>.<signature>`. */
export const signSession = (keys, expires) => `${expires}.${hmac(keys.session, `admin:${expires}`)}`;
export const verifySession = (keys, value, now = Date.now()) => {
  if (typeof value !== 'string') return false;
  const [expires, signature] = value.split('.');
  if (!/^\d{13}$/.test(expires ?? '') || Number(expires) < now) return false;
  return safeEqual(hmac(keys.session, `admin:${expires}`), signature ?? '');
};

/**
 * The comment form's timing token: when the form was opened, signed for one
 * thread. The server refuses (silently) a comment sent less than the minimum
 * time after its token was issued, or with a token older than a day.
 */
export const signFormToken = (keys, target, issued) => `${issued}.${hmac(keys.form, `${target}:${issued}`)}`;
export const formTokenAge = (keys, target, token, now = Date.now()) => {
  if (typeof token !== 'string') return null;
  const [issued, signature] = token.split('.');
  if (!/^\d{13}$/.test(issued ?? '') || !safeEqual(hmac(keys.form, `${target}:${issued}`), signature ?? '')) return null;
  return now - Number(issued);
};
