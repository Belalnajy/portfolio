import { emailAllowed, engageConfig, isTarget, submitComment, threadInfo } from '../../../lib/engage/server';
import { signFormToken } from '../../../lib/engage/crypto';
import { guarded, ipHashOf, json, notifyOwner, off, readJson, sameOrigin } from '../../../lib/engage/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Neon's free plan wakes from idle in up to a few seconds: room for that.
export const maxDuration = 30;

/**
 * GET /api/comment?target=…: a signed timing token, fetched when someone
 * starts writing. A comment sent less than three seconds after its token was
 * issued is dropped (see submitComment). Touches no storage.
 */
export async function GET(request) {
  const config = engageConfig();
  if (!config) return off();
  const target = new URL(request.url).searchParams.get('target');
  if (!isTarget(target)) return json({ error: 'target' }, 400);
  return json({ token: signFormToken(config.keys, target, Date.now()) });
}

/**
 * POST /api/comment {target, name, text, website, token, lang}: stores the comment
 * as pending and emails the owner (at most 20 emails an hour site-wide; past
 * that comments are still stored and wait on /admin/comments). `website` is
 * the honeypot.
 */
export async function POST(request) {
  const config = engageConfig();
  if (!config) return off();
  if (!sameOrigin(request)) return json({ error: 'origin' }, 403);
  return guarded(async () => {
    const body = await readJson(request);
    if (body instanceof Response) return body;
    const result = await submitComment(config, {
      target: body.target,
      name: body.name,
      text: body.text,
      website: typeof body.website === 'string' ? body.website.trim() : body.website,
      token: body.token,
      ipHash: ipHashOf(request, config.keys),
      lang: body.lang,
    });
    if (result.error === 'rate') return json({ error: 'rate' }, 429);
    if (result.error) return json({ error: result.error }, 400);
    // The comment is already stored: a failing email step must not turn into
    // an error the visitor retries (which would store a duplicate).
    if (result.comment) {
      try {
        if (await emailAllowed(config.store)) await notifyOwner(config, result.comment, threadInfo(result.comment.target, result.comment.lang));
      } catch {
        // It still waits on /admin/comments.
      }
    }
    // Kept and dropped submissions get the same answer.
    return json({ ok: true, pending: true }, 202);
  });
}
