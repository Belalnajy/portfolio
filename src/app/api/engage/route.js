import { engageConfig, getThread, isTarget } from '../../../lib/engage/server';
import { cleanVisitorId } from '../../../lib/engage/validate';
import { ipHashOf, json, off } from '../../../lib/engage/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GET /api/engage?target=case:oxgym&v=<visitor id>&page=1: reactions and approved comments. */
export async function GET(request) {
  const config = engageConfig();
  if (!config) return off();
  const params = new URL(request.url).searchParams;
  const target = params.get('target');
  if (!isTarget(target)) return json({ error: 'target' }, 400);
  const thread = await getThread(config, {
    target,
    visitorId: cleanVisitorId(params.get('v')),
    ipHash: ipHashOf(request, config.secret),
    page: params.get('page'),
  });
  // Which backend answered: the browser tests only write to a memory store.
  return json({ enabled: true, ...thread }, 200, { 'X-Engage-Store': config.store.kind });
}
