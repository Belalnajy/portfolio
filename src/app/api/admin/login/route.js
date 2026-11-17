import { engageConfig, overLimit } from '../../../../lib/engage/server';
import { safeEqual } from '../../../../lib/engage/crypto';
import { ipHashOf, off, sameOrigin } from '../../../../lib/engage/http';
import { backToAdmin, sessionCookie } from '../../../../lib/engage/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** POST /api/admin/login (form: password). The password is COMMENTS_SECRET. */
export async function POST(request) {
  const config = engageConfig();
  if (!config) return off();
  if (!sameOrigin(request, { required: true })) return backToAdmin(request, null, '?error=origin');
  // Ten tries an hour per connection, right or wrong.
  if (await overLimit(config.store, 'login', ipHashOf(request, config.secret))) return backToAdmin(request, null, '?error=rate');
  const form = await request.formData().catch(() => null);
  const password = form?.get('password');
  if (typeof password !== 'string' || !safeEqual(password, config.secret)) return backToAdmin(request, null, '?error=password');
  return backToAdmin(request, sessionCookie(request, config.secret));
}
