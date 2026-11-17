import { engageConfig, submitComment } from '../../../lib/engage/server';
import { ipHashOf, json, notifyOwner, off, readJson, sameOrigin } from '../../../lib/engage/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/comment {target, name, text, website, elapsed}: stores the
 * comment as pending and emails the owner. `website` is the honeypot and
 * `elapsed` the time the form was on screen, in ms.
 */
export async function POST(request) {
  const config = engageConfig();
  if (!config) return off();
  if (!sameOrigin(request)) return json({ error: 'origin' }, 403);
  const body = await readJson(request);
  if (body instanceof Response) return body;
  const result = await submitComment(config, {
    target: body.target,
    name: body.name,
    text: body.text,
    website: typeof body.website === 'string' ? body.website.trim() : body.website,
    elapsedMs: body.elapsed,
    ipHash: ipHashOf(request, config.secret),
  });
  if (result.error === 'rate') return json({ error: 'rate' }, 429);
  if (result.error) return json({ error: result.error }, 400);
  if (result.comment) await notifyOwner(config, result.comment, new URL(request.url).origin);
  // Kept and dropped submissions get the same answer.
  return json({ ok: true, pending: true }, 202);
}
