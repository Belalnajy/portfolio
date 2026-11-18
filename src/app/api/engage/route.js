import { engageConfig, getThread, isTarget } from '../../../lib/engage/server';
import { guarded, json, off } from '../../../lib/engage/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Neon's free plan wakes from idle in up to a few seconds: room for that.
export const maxDuration = 30;

/**
 * GET /api/engage?target=case:oxgym&page=1: reaction counts and approved
 * comments. The same answer for everyone (each browser remembers its own
 * reactions), so Vercel's CDN keeps it for 30 seconds and serves it stale
 * for up to 5 minutes while it refreshes: repeated loads cost the Redis
 * budget almost nothing.
 */
export async function GET(request) {
  const config = engageConfig();
  if (!config) return off();
  return guarded(async () => {
    const params = new URL(request.url).searchParams;
    const target = params.get('target');
    const page = params.get('page') ?? '1';
    // Only the exact shape the page sends: a random extra parameter would
    // miss the CDN cache on every request and spend the Redis budget.
    const names = [...params.keys()];
    const extra = names.length > 2 || new Set(names).size !== names.length || names.some((name) => name !== 'target' && name !== 'page');
    if (extra || !isTarget(target) || !/^[1-9]\d{0,2}$/.test(page)) return json({ error: 'target' }, 400);
    const thread = await getThread(config, { target, page });
    return json({ enabled: true, ...thread }, 200, {
      // The CDN caches; browsers do not. With stale-while-revalidate in the
      // plain Cache-Control, Chrome also served its own copy stale for five
      // minutes, so an approved comment or a new count stayed hidden on
      // reload. CDN-Cache-Control (RFC 9213, honoured by Vercel) keeps the
      // shared caching and leaves browsers asking every time.
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'CDN-Cache-Control': 'public, s-maxage=30, stale-while-revalidate=300',
      // Which backend answered: the browser tests only write to a memory store.
      'X-Engage-Store': config.store.kind,
    });
  });
}
