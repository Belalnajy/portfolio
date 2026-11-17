import { engageConfig, moderate } from '../../../../lib/engage/server';
import { verifyAction } from '../../../../lib/engage/crypto';
import { escapeHtml, htmlPage, off } from '../../../../lib/engage/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ACTIONS = new Set(['approve', 'delete']);

const checked = (config, action, id, sig) => ACTIONS.has(action) && typeof id === 'string' && verifyAction(config.secret, action, id, sig);

/**
 * The links in the notification email. GET only shows what the link will do
 * and asks for a press: mail scanners and link previews follow links, and a
 * GET that approved or deleted would let them moderate. The press POSTs the
 * same signed fields back here.
 */
export async function GET(request) {
  const config = engageConfig();
  if (!config) return off();
  const params = new URL(request.url).searchParams;
  const action = params.get('action');
  const id = params.get('id');
  const sig = params.get('sig');
  if (!checked(config, action, id, sig)) return htmlPage('Invalid link', '<h1>This link is not valid.</h1>', 403);
  return htmlPage(
    `${action === 'approve' ? 'Approve' : 'Delete'} comment`,
    `<h1>${action === 'approve' ? 'Approve' : 'Delete'} this comment?</h1>
<form method="post"><input type="hidden" name="action" value="${escapeHtml(action)}"><input type="hidden" name="id" value="${escapeHtml(id)}"><input type="hidden" name="sig" value="${escapeHtml(sig)}"><button type="submit">${action === 'approve' ? 'Approve' : 'Delete'}</button></form>
<p><a href="/admin/comments">All pending comments</a></p>`,
  );
}

export async function POST(request) {
  const config = engageConfig();
  if (!config) return off();
  const form = await request.formData().catch(() => null);
  const action = form?.get('action');
  const id = form?.get('id');
  const sig = form?.get('sig');
  if (!checked(config, action, id, sig)) return htmlPage('Invalid link', '<h1>This link is not valid.</h1>', 403);
  const comment = await moderate(config, action, id);
  if (!comment) return htmlPage('Not found', '<h1>That comment no longer exists.</h1><p><a href="/admin/comments">All comments</a></p>', 404);
  return htmlPage(
    'Done',
    `<h1>${action === 'approve' ? 'Approved' : 'Deleted'}.</h1><p>${escapeHtml(comment.name)} on ${escapeHtml(comment.target)}:</p><blockquote>${escapeHtml(comment.text)}</blockquote><p><a href="/admin/comments">All comments</a></p>`,
  );
}
