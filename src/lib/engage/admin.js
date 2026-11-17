import { signSession, verifySession } from './crypto.js';

/**
 * The /admin/comments session: an httpOnly, SameSite=Strict cookie holding
 * an expiry and its HMAC under COMMENTS_SECRET. Nothing about it is readable
 * by page scripts, and it is never sent on a cross-site request.
 */
export const ADMIN_COOKIE = 'engage_admin';
const SESSION_MS = 12 * 60 * 60 * 1000;

export const isAdmin = (secret, cookieValue) => verifySession(secret, cookieValue);

const secureFlag = (request) => (new URL(request.url).protocol === 'https:' || process.env.NODE_ENV === 'production' ? '; Secure' : '');

export const sessionCookie = (request, secret, now = Date.now()) =>
  `${ADMIN_COOKIE}=${signSession(secret, now + SESSION_MS)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_MS / 1000}${secureFlag(request)}`;

export const clearCookie = (request) => `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secureFlag(request)}`;

export const readCookie = (request, name = ADMIN_COOKIE) =>
  (request.headers.get('cookie') ?? '')
    .split(/;\s*/)
    .map((pair) => pair.split('='))
    .find(([key]) => key === name)?.[1];

/** 303 back to the admin page, optionally with a cookie. */
export const backToAdmin = (request, cookie, query = '') =>
  new Response(null, {
    status: 303,
    headers: { Location: `${new URL(request.url).origin}/admin/comments${query}`, 'Cache-Control': 'no-store', ...(cookie && { 'Set-Cookie': cookie }) },
  });
