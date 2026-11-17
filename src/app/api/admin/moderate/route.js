import { engageConfig, moderate } from '../../../../lib/engage/server';
import { off, sameOrigin } from '../../../../lib/engage/http';
import { backToAdmin, commentId, isAdmin, requestCookies, sessionFrom } from '../../../../lib/engage/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/moderate (form: action, id, confirm), from
 * /admin/comments. Deleting takes two presses: the first comes back to the
 * page asking to confirm, the second (confirm=yes) deletes.
 */
export async function POST(request) {
  const config = engageConfig();
  if (!config) return off();
  // SameSite=Strict already keeps the cookie off cross-site posts; the
  // Origin check is the second lock.
  if (!sameOrigin(request, { required: true }) || !isAdmin(config.keys, sessionFrom(requestCookies(request)))) {
    return backToAdmin(request, null, '?error=session');
  }
  const form = await request.formData().catch(() => null);
  const action = form?.get('action');
  const id = commentId(form?.get('id'));
  if ((action !== 'approve' && action !== 'delete') || !id) return backToAdmin(request, null, '?error=action');
  if (action === 'delete' && form.get('confirm') !== 'yes') return backToAdmin(request, null, `?confirm=${id}#c-${id}`);
  try {
    await moderate(config, action, id);
  } catch {
    return backToAdmin(request, null, '?error=storage');
  }
  return backToAdmin(request, null, `?done=${action}`);
}
