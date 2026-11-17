import { LIMITS } from './shared.js';
import { hashIp, signAction } from './crypto.js';

/** Helpers shared by the /api routes of the comments feature. Server-only. */

const NO_STORE = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' };

export const json = (body, status = 200, headers = {}) =>
  Response.json(body, { status, headers: { ...NO_STORE, ...headers } });

/** The feature is off in this environment (no storage or no secret). */
export const off = () => json({ enabled: false }, 503);

/** The client IP as Vercel reports it. Only ever used hashed. */
export const clientIp = (request) =>
  request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

export const ipHashOf = (request, secret) => hashIp(secret, clientIp(request));

/**
 * Reads a small JSON body. Anything over the limit, or not JSON, is refused
 * before it is parsed. Returns the object or a Response to send back.
 */
export const readJson = async (request) => {
  const declared = Number(request.headers.get('content-length') ?? 0);
  if (declared > LIMITS.bodyBytes) return json({ error: 'too_large' }, 413);
  if (!/^application\/json\b/i.test(request.headers.get('content-type') ?? '')) return json({ error: 'json' }, 415);
  const raw = await request.text();
  if (Buffer.byteLength(raw) > LIMITS.bodyBytes) return json({ error: 'too_large' }, 413);
  try {
    const body = JSON.parse(raw);
    return body && typeof body === 'object' && !Array.isArray(body) ? body : json({ error: 'json' }, 400);
  } catch {
    return json({ error: 'json' }, 400);
  }
};

/**
 * A cross-site POST is refused: browsers send Origin on POST. `required`
 * also refuses a request with no Origin at all (the admin forms).
 */
export const sameOrigin = (request, { required = false } = {}) => {
  const origin = request.headers.get('origin');
  if (!origin) return !required;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
};

export const moderationLink = (origin, secret, action, id) =>
  `${origin}/api/comments/moderate?action=${action}&id=${encodeURIComponent(id)}&sig=${signAction(secret, action, id)}`;

/**
 * Emails the owner about a new comment through Resend's REST API. Plain
 * text, so nothing in the comment can become markup. Never throws: a failed
 * email leaves the comment pending, visible on /admin/comments.
 */
export const notifyOwner = async ({ resendKey, ownerEmail, secret }, comment, origin) => {
  if (!resendKey) return false;
  const oneLine = (value) => String(value).replace(/\s+/g, ' ').slice(0, 60);
  const text = [
    `New comment on ${comment.target}, waiting for your approval.`,
    '',
    `From: ${comment.name}`,
    '',
    comment.text,
    '',
    `Approve: ${moderationLink(origin, secret, 'approve', comment.id)}`,
    `Delete:  ${moderationLink(origin, secret, 'delete', comment.id)}`,
    '',
    `All pending comments: ${origin}/admin/comments`,
  ].join('\n');
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Portfolio comments <onboarding@resend.dev>',
        to: [ownerEmail],
        subject: `New comment from ${oneLine(comment.name)} on ${comment.target}`,
        text,
      }),
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
export { escapeHtml };

/** A minimal HTML page for the moderation links (no script, noindex). */
export const htmlPage = (title, body, status = 200) =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escapeHtml(title)}</title><style>body{font:16px/1.6 system-ui,sans-serif;max-width:40rem;margin:3rem auto;padding:0 1rem;background:#0b0f14;color:#e8edf2}blockquote{white-space:pre-line;border-left:3px solid #c87f1e;margin:1rem 0;padding:.5rem 1rem;background:#121821}button{font:inherit;padding:.6rem 1.2rem;border-radius:.6rem;border:0;background:#c87f1e;color:#10171f;cursor:pointer}a{color:#e0a03c}</style></head><body>${body}</body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } },
  );
