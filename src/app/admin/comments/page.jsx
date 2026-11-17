import { cookies } from 'next/headers';
import { engageConfig, listPending, listRecent } from '../../../lib/engage/server';
import { ADMIN_COOKIE, isAdmin } from '../../../lib/engage/admin';

export const dynamic = 'force-dynamic';

const box = { maxWidth: '48rem', margin: '0 auto', padding: '2rem 1rem 4rem' };
const card = { background: '#121821', border: '1px solid #1f2933', borderRadius: '0.75rem', padding: '1rem', margin: '0 0 0.75rem' };
const button = { font: 'inherit', padding: '0.4rem 0.9rem', borderRadius: '0.5rem', border: '1px solid #5e656c', background: 'transparent', color: 'inherit', cursor: 'pointer', minHeight: '44px' };
const primary = { ...button, background: '#c87f1e', borderColor: '#c87f1e', color: '#10171f' };
const muted = { color: '#93a1b0', fontSize: '0.85rem' };

const ERRORS = {
  password: 'Wrong password.',
  rate: 'Too many attempts from this connection. Try again in an hour.',
  session: 'Your session expired. Sign in again.',
  origin: 'Refused: the request did not come from this page.',
  action: 'Unknown action.',
};

const when = (ms) => new Date(Number(ms)).toISOString().replace('T', ' ').slice(0, 16) + ' UTC';

// Every value from a comment is a React text node: nothing a visitor typed
// is ever parsed as HTML here.
const Comment = ({ comment, actions }) => (
  <article style={card}>
    <p style={{ margin: 0 }}>
      <strong>{comment.name}</strong> <span style={muted}>on {comment.target} · {when(comment.createdAt)} · ip {String(comment.ipHash).slice(0, 8)}</span>
    </p>
    <p style={{ whiteSpace: 'pre-line', margin: '0.5rem 0 0.75rem' }}>{comment.text}</p>
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {actions.map((action) => (
        <form key={action} method="post" action="/api/admin/moderate">
          <input type="hidden" name="action" value={action} />
          <input type="hidden" name="id" value={comment.id} />
          <button type="submit" style={action === 'approve' ? primary : button}>
            {action === 'approve' ? 'Approve' : 'Delete'}
          </button>
        </form>
      ))}
    </div>
  </article>
);

export default async function AdminComments({ searchParams }) {
  const config = engageConfig();
  const params = await searchParams;
  if (!config) {
    return (
      <main style={box}>
        <h1>Comments are off</h1>
        <p>Storage (Upstash Redis) or COMMENTS_SECRET is not configured for this deployment. See the README.</p>
      </main>
    );
  }
  const jar = await cookies();
  const error = ERRORS[params?.error];
  if (!isAdmin(config.secret, jar.get(ADMIN_COOKIE)?.value)) {
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
  const [pending, recent] = await Promise.all([listPending(config), listRecent(config)]);
  return (
    <main style={box}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Comments</h1>
        <form method="post" action="/api/admin/logout">
          <button type="submit" style={button}>Sign out</button>
        </form>
      </div>
      {error && <p role="alert" style={{ color: '#f97066' }}>{error}</p>}
      {params?.done && <p role="status">Done: {params.done === 'approve' ? 'approved' : 'deleted'}.</p>}
      <h2>Waiting for approval ({pending.length})</h2>
      {pending.length === 0 && <p style={muted}>Nothing waiting.</p>}
      {pending.map((comment) => <Comment key={comment.id} comment={comment} actions={['approve', 'delete']} />)}
      <h2>Recently approved</h2>
      {recent.length === 0 && <p style={muted}>None yet.</p>}
      {recent.map((comment) => <Comment key={comment.id} comment={comment} actions={['delete']} />)}
    </main>
  );
}
