import { cookies } from 'next/headers';
import { engageConfig, listPending, listRecent } from '../../../lib/engage/server';
import { adminError, commentId, isAdmin, sessionFrom } from '../../../lib/engage/admin';

export const dynamic = 'force-dynamic';

const box = { maxWidth: '48rem', margin: '0 auto', padding: '2rem 1rem 4rem' };
const card = { background: '#121821', border: '1px solid #1f2933', borderRadius: '0.75rem', padding: '1rem', margin: '0 0 0.75rem' };
const button = { font: 'inherit', padding: '0.4rem 0.9rem', borderRadius: '0.5rem', border: '1px solid #5e656c', background: 'transparent', color: 'inherit', cursor: 'pointer', minHeight: '44px' };
const primary = { ...button, background: '#c87f1e', borderColor: '#c87f1e', color: '#10171f' };
const danger = { ...button, background: '#b42318', borderColor: '#b42318', color: '#fff' };
const muted = { color: '#93a1b0', fontSize: '0.85rem' };

const when = (ms) => new Date(Number(ms)).toISOString().replace('T', ' ').slice(0, 16) + ' UTC';

const ActionForm = ({ comment, action, confirm = false, style, children }) => (
  <form method="post" action="/api/admin/moderate">
    <input type="hidden" name="action" value={action} />
    <input type="hidden" name="id" value={comment.id} />
    {confirm && <input type="hidden" name="confirm" value="yes" />}
    <button
      type="submit"
      style={style}
      aria-label={`${confirm ? 'Yes, delete' : action === 'approve' ? 'Approve' : 'Delete'} comment by ${comment.name}`}>
      {children}
    </button>
  </form>
);

// Every value from a comment is a React text node: nothing a visitor typed
// is ever parsed as HTML here.
const Comment = ({ comment, canApprove, confirming }) => (
  <article id={`c-${comment.id}`} style={card}>
    <p style={{ margin: 0 }}>
      <strong dir="auto">{comment.name}</strong>{' '}
      <span style={muted}>on {comment.target} · {when(comment.createdAt)} · network {String(comment.ipHash).slice(0, 8)}</span>
    </p>
    <p dir="auto" style={{ whiteSpace: 'pre-line', margin: '0.5rem 0 0.75rem' }}>{comment.text}</p>
    {confirming ? (
      // Delete is two presses: this is the second, with a way back.
      <div role="group" aria-label="Confirm delete" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <span>Delete this comment for good?</span>
        <ActionForm comment={comment} action="delete" confirm style={danger}>Yes, delete</ActionForm>
        <a href="/admin/comments" style={{ ...button, display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>Cancel</a>
      </div>
    ) : (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {canApprove && <ActionForm comment={comment} action="approve" style={primary}>Approve</ActionForm>}
        <ActionForm comment={comment} action="delete" style={button}>Delete</ActionForm>
      </div>
    )}
  </article>
);

export default async function AdminComments({ searchParams }) {
  const config = engageConfig();
  const params = (await searchParams) ?? {};
  if (!config) {
    return (
      <main style={box}>
        <h1>Comments are off</h1>
        <p>Storage (Upstash Redis) or COMMENTS_SECRET is not configured for this deployment. See the README.</p>
      </main>
    );
  }
  const error = adminError(params.error);
  if (!isAdmin(config.keys, sessionFrom(await cookies()))) {
    return (
      <main style={box}>
        <h1>Comments</h1>
        {error && <p role="alert" style={{ color: '#f97066' }}>{error}</p>}
        <form method="post" action="/api/admin/login" style={{ display: 'grid', gap: '0.75rem', maxWidth: '22rem' }}>
          <label htmlFor="password">Password (COMMENTS_SECRET)</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required
            style={{ font: 'inherit', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid #5e656c', background: '#121821', color: 'inherit' }} />
          <button type="submit" style={primary}>Sign in</button>
        </form>
      </main>
    );
  }
  let pending;
  let recent;
  try {
    [pending, recent] = await Promise.all([listPending(config), listRecent(config)]);
  } catch {
    return (
      <main style={box}>
        <h1>Comments</h1>
        <p role="alert" style={{ color: '#f97066' }}>{adminError('storage')}</p>
      </main>
    );
  }
  const confirming = commentId(params.confirm);
  return (
    <main style={box}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Comments</h1>
        <form method="post" action="/api/admin/logout">
          <button type="submit" style={button}>Sign out</button>
        </form>
      </div>
      {error && <p role="alert" style={{ color: '#f97066' }}>{error}</p>}
      {(params.done === 'approve' || params.done === 'delete') && (
        <p role="status">Done: {params.done === 'approve' ? 'approved' : 'deleted'}.</p>
      )}
      <h2>Waiting for approval ({pending.length})</h2>
      {pending.length === 0 && <p style={muted}>Nothing waiting.</p>}
      {pending.map((comment) => (
        <Comment key={comment.id} comment={comment} canApprove confirming={confirming === comment.id} />
      ))}
      <h2>Recently approved</h2>
      {recent.length === 0 && <p style={muted}>None yet.</p>}
      {recent.map((comment) => (
        <Comment key={comment.id} comment={comment} canApprove={false} confirming={confirming === comment.id} />
      ))}
    </main>
  );
}
