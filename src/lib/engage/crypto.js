import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

/**
 * Signing and hashing for the comments feature, all keyed by
 * COMMENTS_SECRET. Server-only: this module must never be imported by a
 * client component.
 */

const hmac = (secret, message) => createHmac('sha256', secret).update(message).digest('base64url');

/** Constant-time comparison of two strings of any length. */
export const safeEqual = (a, b) => {
  // Hash first so the lengths match and timingSafeEqual cannot throw or leak
  // the expected length.
  const ha = createHash('sha256').update(String(a)).digest();
  const hb = createHash('sha256').update(String(b)).digest();
  return timingSafeEqual(ha, hb);
};

/** The signature on an email moderation link: HMAC-SHA256 of `<action>:<commentId>`. */
export const signAction = (secret, action, id) => hmac(secret, `${action}:${id}`);
export const verifyAction = (secret, action, id, signature) =>
  typeof signature === 'string' && safeEqual(signAction(secret, action, id), signature);

/** A salted hash of the client IP. The raw IP is never stored. */
export const hashIp = (secret, ip) => createHash('sha256').update(`${ip}|${secret}`).digest('base64url').slice(0, 32);

/** The reaction identity: the browser's anonymous id combined with the IP hash. */
export const voterKey = (secret, visitorId, ipHash) =>
  createHash('sha256').update(`${visitorId}|${ipHash}|${secret}`).digest('base64url').slice(0, 32);

export const newCommentId = () => randomBytes(12).toString('base64url');

/** The admin session cookie: `<expiry ms>.<signature>`. */
export const signSession = (secret, expires) => `${expires}.${hmac(secret, `admin:${expires}`)}`;
export const verifySession = (secret, value, now = Date.now()) => {
  if (typeof value !== 'string') return false;
  const [expires, signature] = value.split('.');
  if (!/^\d{13}$/.test(expires ?? '') || Number(expires) < now) return false;
  return safeEqual(hmac(secret, `admin:${expires}`), signature ?? '');
};
