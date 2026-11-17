import { engageConfig, moderate } from '../../../../lib/engage/server';
import { off, sameOrigin } from '../../../../lib/engage/http';
import { backToAdmin, isAdmin, readCookie } from '../../../../lib/engage/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** POST /api/admin/moderate (form: action, id), from /admin/comments. */
export async function POST(request) {
  const config = engageConfig();
  if (!config) return off();
  // SameSite=Strict already keeps the cookie off cross-site posts; the
  // Origin check is the second lock.
  if (!sameOrigin(request, { required: true }) || !isAdmin(config.secret, readCookie(request))) return backToAdmin(request, null, '?error=session');
  const form = await request.formData().catch(() => null);
  const action = form?.get('action');
  if (action !== 'approve' && action !== 'delete') return backToAdmin(request, null, '?error=action');
  await moderate(config, action, form?.get('id'));
  return backToAdmin(request, null, `?done=${action}`);
}
