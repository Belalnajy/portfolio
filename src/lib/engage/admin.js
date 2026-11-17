import { signSession, verifySession } from './crypto.js';

/**
 * The /admin/comments session: an httpOnly, SameSite=Strict cookie holding
 * an expiry and its HMAC under the session key. Nothing about it is readable
 * by page scripts, and it is never sent on a cross-site request.
 *
 * On https (production) the cookie is `__Host-engage_admin`: the browser
 * then insists on Secure, Path=/ and no Domain, so no subdomain can set or
 * overwrite it. Plain-http `next dev` cannot set a __Host- cookie, so there
 * it is `engage_admin`, which production never accepts.
 */
export const SECURE_COOKIE = '__Host-engage_admin';
export const DEV_COOKIE = 'engage_admin';
const SESSION_MS = 12 * 60 * 60 * 1000;

const production = () => process.env.NODE_ENV === 'production';
const isHttps = (request) => new URL(request.url).protocol === 'https:' || production();

/** The cookie name this request uses. */
export const cookieName = (request) => (isHttps(request) ? SECURE_COOKIE : DEV_COOKIE);

/** The session value from a cookie jar (anything with get(name)?.value). */
export const sessionFrom = (jar) => jar.get(SECURE_COOKIE)?.value ?? (production() ? undefined : jar.get(DEV_COOKIE)?.value);

export const isAdmin = (keys, cookieValue) => verifySession(keys, cookieValue);

const attributes = (request) => `Path=/; HttpOnly; SameSite=Strict${isHttps(request) ? '; Secure' : ''}`;

export const sessionCookie = (request, keys, now = Date.now()) =>
  `${cookieName(request)}=${signSession(keys, now + SESSION_MS)}; ${attributes(request)}; Max-Age=${SESSION_MS / 1000}`;

export const clearCookie = (request) => `${cookieName(request)}=; ${attributes(request)}; Max-Age=0`;

/** A cookie jar over a Request's Cookie header, for route handlers. */
export const requestCookies = (request) => {
  const pairs = (request.headers.get('cookie') ?? '').split(/;\s*/).map((pair) => {
    const at = pair.indexOf('=');
    return at === -1 ? [pair, ''] : [pair.slice(0, at), pair.slice(at + 1)];
  });
  return { get: (name) => {
    const found = pairs.find(([key]) => key === name);
    return found ? { value: found[1] } : undefined;
  } };
};

/** 303 back to the admin page, optionally with a cookie. */
export const backToAdmin = (request, cookie, query = '') =>
  new Response(null, {
    status: 303,
    headers: { Location: `${new URL(request.url).origin}/admin/comments${query}`, 'Cache-Control': 'no-store', ...(cookie && { 'Set-Cookie': cookie }) },
  });

export const ADMIN_ERRORS = {
  password: 'Wrong password.',
  rate: 'Too many attempts from this connection. Try again in an hour.',
  session: 'Your session expired. Sign in again.',
  origin: 'Refused: the request did not come from this page.',
  action: 'Unknown action.',
  storage: 'The comments storage is not answering. Try again in a moment.',
};

/** The message for an ?error= value, or undefined. Own keys only: "__proto__" is not an error. */
export const adminError = (value) =>
  typeof value === 'string' && Object.hasOwn(ADMIN_ERRORS, value) ? ADMIN_ERRORS[value] : undefined;

/** A comment id as the admin forms send it, or null. */
export const commentId = (value) => (typeof value === 'string' && /^[\w-]{8,32}$/.test(value) ? value : null);
