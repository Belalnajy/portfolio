import { engageConfig, react } from '../../../lib/engage/server';
import { cleanVisitorId } from '../../../lib/engage/validate';
import { ipHashOf, json, off, readJson, sameOrigin } from '../../../lib/engage/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** POST /api/react {target, emoji, on, visitor}: `emoji` is a reaction key (like, love, fire, clap, idea). */
export async function POST(request) {
  const config = engageConfig();
  if (!config) return off();
  if (!sameOrigin(request)) return json({ error: 'origin' }, 403);
  const body = await readJson(request);
  if (body instanceof Response) return body;
  const result = await react(config, {
    target: body.target,
    key: body.emoji,
    on: body.on,
    visitorId: cleanVisitorId(body.visitor),
    ipHash: ipHashOf(request, config.secret),
  });
  if (result.error === 'rate') return json(result, 429);
  if (result.error) return json(result, 400);
  return json(result);
}
