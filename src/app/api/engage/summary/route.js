import { engageConfig, getSummary } from '../../../../lib/engage/server';
import { guarded, json, off } from '../../../../lib/engage/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Neon's free plan wakes from idle in up to a few seconds: room for that.
export const maxDuration = 30;

/**
 * GET /api/engage/summary: reaction and approved-comment counts for every
 * case study, for the project lists on the home page and /work. One SQL
 * query (a GROUP BY over reactions and approved comments), cached by the
 * CDN like GET /api/engage. Takes no parameters: any query string would be
 * a CDN cache miss, so it is refused.
 */
export async function GET(request) {
  const config = engageConfig();
  if (!config) return off();
  if (new URL(request.url).search) return json({ error: 'params' }, 400);
  return guarded(async () =>
    json({ enabled: true, threads: await getSummary(config) }, 200, {
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'CDN-Cache-Control': 'public, s-maxage=30, stale-while-revalidate=300',
      'X-Engage-Store': config.store.kind,
    }),
  );
}
