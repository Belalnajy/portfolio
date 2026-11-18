import { LIMITS } from './shared.js';
import { hashIp, signAction } from './crypto.js';
import { SITE_URL } from '../site.js';

/** Helpers shared by the /api routes of the comments feature. Server-only. */

const NO_STORE = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' };

export const json = (body, status = 200, headers = {}) =>
  Response.json(body, { status, headers: { ...NO_STORE, ...headers } });

/** The feature is off in this environment, or its storage is not answering. */
export const off = () => json({ enabled: false }, 503);

/**
 * Runs a route body; any database failure (Neon unreachable or still waking,
 * the free plan's limits reached) becomes the "off" answer, never a 500.
 * Only the error's name or code is logged: a driver message can quote the
 * connection string.
 */
export const guarded = async (handler) => {
  try {
    return await handler();
  } catch (error) {
    console.error('[engage] storage error:', error?.code ?? error?.name ?? 'unknown');
    return off();
  }
};

/** The client IP as Vercel reports it. Only ever used hashed. */
export const clientIp = (request) =>
  request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

/**
 * The network an IP belongs to, for rate limits: an IPv4 address as it is,
 * an IPv6 address by its /64 (one household or phone usually has a whole
 * /64, and can pick any address in it). IPv4-mapped IPv6 counts as IPv4.
 */
export const networkOf = (ip) => {
  const value = String(ip).trim().toLowerCase().replace(/^\[|\]$/g, '').replace(/%.*$/, '');
  if (!value.includes(':')) return value;
  const mapped = value.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return mapped[1];
  const [head, tail = ''] = value.split('::');
  const left = head ? head.split(':') : [];
  const right = value.includes('::') && tail ? tail.split(':') : [];
  const groups = value.includes('::') ? [...left, ...Array(Math.max(0, 8 - left.length - right.length)).fill('0'), ...right] : left;
  return `${groups.slice(0, 4).map((group) => (parseInt(group, 16) || 0).toString(16)).join(':')}::/64`;
};

export const ipHashOf = (request, keys) => hashIp(keys, networkOf(clientIp(request)));

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

/** Always on the canonical site (src/lib/site.js), never on a host taken from the request. */
export const moderationLink = (keys, action, id) =>
  `${SITE_URL}/api/comments/moderate?action=${action}&id=${encodeURIComponent(id)}&sig=${signAction(keys, action, id)}`;

/**
 * The notification email, as plain text: the real links first, then the
 * comment with every line quoted ("> "), so nothing a visitor typed can pass
 * for a link or an instruction from the site.
 */
export const buildEmail = (keys, comment, info = { title: comment.target, path: '/' }) => {
  const oneLine = (value) => String(value).replace(/\s+/g, ' ').trim().slice(0, 60);
  const quote = (value) => String(value).split('\n').map((line) => `> ${line}`).join('\n');
  return {
    subject: `New comment from ${oneLine(comment.name)} on ${oneLine(info.title)}`,
    text: [
      `Approve: ${moderationLink(keys, 'approve', comment.id)}`,
      `Delete:  ${moderationLink(keys, 'delete', comment.id)}`,
      `All pending comments: ${SITE_URL}/admin/comments`,
      `Page: ${SITE_URL}${info.path}`,
      '',
      `New comment on ${info.title} (${comment.target}), waiting for your approval. Name and text as sent:`,
      '',
      quote(comment.name),
      '',
      quote(comment.text),
    ].join('\n'),
  };
};

/**
 * Emails the owner about a new comment through Resend's REST API. Never
 * throws: a failed email leaves the comment pending, visible on
 * /admin/comments.
 */
export const notifyOwner = async ({ resendKey, ownerEmail, keys }, comment, info) => {
  if (!resendKey) return false;
  const { subject, text } = buildEmail(keys, comment, info);
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'Portfolio comments <onboarding@resend.dev>', to: [ownerEmail], subject, text }),
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
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escapeHtml(title)}</title><style>body{font:16px/1.6 system-ui,sans-serif;max-width:40rem;margin:3rem auto;padding:0 1rem;background:#0b0f14;color:#e8edf2}blockquote{white-space:pre-line;border-left:3px solid #c87f1e;margin:1rem 0;padding:.5rem 1rem;background:#121821}button{font:inherit;padding:.6rem 1.2rem;border-radius:.6rem;border:0;background:#c87f1e;color:#10171f;cursor:pointer;min-height:44px}a{color:#e0a03c}</style></head><body>${body}</body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } },
  );
