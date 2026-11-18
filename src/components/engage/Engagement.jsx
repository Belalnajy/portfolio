'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { REACTIONS, LIMITS } from '../../lib/engage/shared';
import { validateComment } from '../../lib/engage/validate';
import { MINE_STORAGE_KEY, ago, effectiveCount, mergeComments, postJson, readMine, sendReaction } from '../../lib/engage/client';

/**
 * Reactions and comments for one thread (`target`: case:<slug>,
 * post:<slug>, teach:<course>). See src/lib/engage/ for the server side.
 *
 * Nothing is requested until the block is within about a screen of the
 * viewport, and nothing is drawn until the API answers: when the feature is
 * off (no storage configured, or storage not answering: the API says 503)
 * the block stays an empty div, so pages look exactly as before. Because it
 * loads ahead of the reader, it is in place before it scrolls into view and
 * shifts nothing on screen.
 *
 * The thread itself is the same for everyone and cached by the CDN; this
 * browser's own reactions live in localStorage (and the anonymous visitor id
 * is only created on the first reaction).
 *
 * Comment names and text are only ever React text nodes, shown with
 * `white-space: pre-line`: nothing a visitor types is parsed as HTML or
 * turned into a link.
 */

const When = ({ ms }) => {
  const { t, i18n } = useTranslation();
  const span = ago(ms);
  const label = span
    ? new Intl.RelativeTimeFormat(i18n.language === 'ar' ? 'ar-EG-u-nu-latn' : 'en', { numeric: 'auto' }).format(span.value, span.unit)
    : t('engage.just_now');
  return (
    <time dateTime={new Date(ms).toISOString()} className="text-xs text-[rgb(var(--muted-foreground))]">
      {label}
    </time>
  );
};

const ReactionBar = ({ target, reactions, setReactions }) => {
  const { t, i18n } = useTranslation();
  const [notice, setNotice] = useState('');
  // Keys with a request in flight: further presses on them wait it out.
  const pending = useRef(new Set());
  const [busy, setBusy] = useState({});
  const comma = i18n.language === 'ar' ? '، ' : ', ';

  const toggle = async (key) => {
    if (pending.current.has(key)) return;
    pending.current.add(key);
    setBusy((all) => ({ ...all, [key]: true }));
    // `count` is the fetched count (maybe a stale CDN copy), `mine` this
    // browser's record { on, count, at }: what shows is effectiveCount().
    const before = reactions[key] ?? { count: 0, mine: undefined };
    const shown = effectiveCount(before.count, before.mine);
    const on = !before.mine?.on;
    // Optimistic: the press shows at once, and only this key is rolled back if refused.
    setReactions((all) => ({ ...all, [key]: { count: before.count, mine: { on, count: Math.max(0, shown + (on ? 1 : -1)), at: Date.now() } } }));
    setNotice('');
    try {
      const result = await sendReaction(target, key, on);
      setReactions((all) => ({ ...all, [key]: { count: result.count, mine: { on: result.mine, count: result.count, at: Date.now() } } }));
    } catch {
      setReactions((all) => ({ ...all, [key]: before }));
      setNotice(t('engage.reaction_error'));
    } finally {
      pending.current.delete(key);
      setBusy((all) => ({ ...all, [key]: false }));
    }
  };

  return (
    <div>
      {/* Phones: all five in one row. */}
      <div role="group" aria-label={t('engage.reactions_label')} className="grid grid-cols-5 gap-1.5 sm:flex sm:flex-wrap sm:gap-2">
        {REACTIONS.map(({ key, emoji }) => {
          const { count, mine: entry } = reactions[key] ?? { count: 0 };
          const shown = effectiveCount(count, entry);
          const mine = Boolean(entry?.on);
          return (
            <button
              key={key}
              type="button"
              aria-pressed={mine}
              aria-busy={busy[key] || undefined}
              aria-label={`${t(`engage.reactions.${key}`)}${comma}${shown}`}
              onClick={() => toggle(key)}
              className={`press inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-11 max-md:min-h-12 px-2 sm:px-4 rounded-full border text-sm font-semibold transition-colors ${
                mine
                  ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/12 text-[rgb(var(--foreground))]'
                  : 'border-[rgb(var(--border-control))] bg-[rgb(var(--muted))]/20 text-[rgb(var(--muted-foreground))] hover:border-[rgb(var(--primary))]/60'
              }`}>
              <span aria-hidden="true" className="text-base leading-none">{emoji}</span>
              <span aria-hidden="true" dir="ltr" className="tabular-nums">{shown}</span>
            </button>
          );
        })}
      </div>
      {/* One message, always in the page, so it is announced when it changes. */}
      <p role="status" className="mt-2 min-h-5 text-sm text-[rgb(var(--danger))]">{notice}</p>
    </div>
  );
};

const CommentList = ({ comments }) => (
  <ol className="space-y-3">
    {comments.map((comment) => (
      <li key={comment.id} className="m-card rounded-xl border border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]/50 p-4">
        <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
          <span dir="auto" className="font-semibold text-[rgb(var(--foreground))] break-words">{comment.name}</span>
          <When ms={comment.createdAt} />
        </p>
        {/* dir="auto": each comment reads in its own language's direction. */}
        <p dir="auto" className="mt-1.5 text-start text-[rgb(var(--foreground))]/90 leading-relaxed whitespace-pre-line break-words">{comment.text}</p>
      </li>
    ))}
  </ol>
);

const CommentForm = ({ target }) => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [state, setState] = useState({ status: 'idle', error: '' });
  const nameRef = useRef(null);
  const textRef = useRef(null);
  const token = useRef(null);
  const ids = `engage-${target.replace(/[^\w-]/g, '-')}`;

  // The timing token is fetched when someone starts writing (no request
  // before that); the server drops comments sent too soon after it.
  const getToken = () => {
    token.current ??= fetch(`/api/comment?${new URLSearchParams({ target })}`)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((body) => body.token)
      .catch((error) => {
        token.current = null;
        throw error;
      });
    return token.current;
  };
  const warmToken = () => getToken().catch(() => {});

  const fail = (error) => {
    setState({ status: 'error', error });
    (error === 'name' ? nameRef : textRef).current?.focus();
  };

  const submit = async (event) => {
    event.preventDefault();
    if (state.status === 'sending') return;
    const form = event.currentTarget;
    const checked = validateComment({ name, text });
    if (!checked.ok) return fail(checked.error);
    setState({ status: 'sending', error: '' });
    try {
      const response = await postJson('/api/comment', {
        target,
        name: checked.name,
        text: checked.text,
        website: form.elements.website?.value ?? '',
        token: await getToken(),
        lang: i18n.language === 'ar' ? 'ar' : 'en',
      });
      if (response.status === 202) {
        setText('');
        token.current = null;
        setState({ status: 'sent', error: '' });
        return;
      }
      const body = await response.json().catch(() => ({}));
      if (['name', 'text', 'links'].includes(body.error)) return fail(body.error);
      setState({ status: 'error', error: body.error === 'rate' ? 'rate' : 'generic' });
    } catch {
      setState({ status: 'error', error: 'generic' });
    }
  };

  const field =
    'w-full rounded-xl max-md:rounded-[0.875rem] border border-[rgb(var(--border-control))] bg-[rgb(var(--background))] px-4 py-2.5 text-base text-[rgb(var(--foreground))] focus:border-[rgb(var(--primary))]';
  const invalid = (...which) => state.status === 'error' && which.includes(state.error);
  const sending = state.status === 'sending';

  return (
    <form onSubmit={submit} noValidate className="relative space-y-3">
      {/* Honeypot: invisible to people and to assistive tech; bots fill it. */}
      <div aria-hidden="true" className="absolute -start-[10000px] top-0 w-px h-px overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <div>
        <label htmlFor={`${ids}-name`} className="block text-sm font-semibold mb-1.5 text-[rgb(var(--foreground))]">
          {t('engage.name')}
        </label>
        <input
          ref={nameRef}
          id={`${ids}-name`}
          name="name"
          type="text"
          dir="auto"
          autoComplete="name"
          maxLength={LIMITS.nameMax}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={warmToken}
          aria-invalid={invalid('name') || undefined}
          aria-describedby={invalid('name') ? `${ids}-error` : undefined}
          className={`${field} min-h-11 max-md:min-h-12`}
        />
      </div>
      <div>
        <label htmlFor={`${ids}-text`} className="block text-sm font-semibold mb-1.5 text-[rgb(var(--foreground))]">
          {t('engage.comment')}
        </label>
        <textarea
          ref={textRef}
          id={`${ids}-text`}
          name="text"
          dir="auto"
          rows={4}
          maxLength={LIMITS.textMax}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={warmToken}
          aria-invalid={invalid('text', 'links') || undefined}
          aria-describedby={`${ids}-note${invalid('text', 'links') ? ` ${ids}-error` : ''}`}
          className={`${field} resize-y`}
        />
      </div>
      <p id={`${ids}-note`} className="text-xs text-[rgb(var(--muted-foreground))]">{t('engage.privacy')}</p>
      {/* aria-disabled, not disabled: focus stays on the button while it sends. */}
      <button
        type="submit"
        aria-disabled={sending || undefined}
        className={`press inline-flex items-center justify-center min-h-11 max-md:min-h-12 px-6 rounded-xl max-md:rounded-[var(--radius-btn)] font-semibold bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))] ${sending ? 'opacity-60 cursor-wait' : ''}`}>
        {sending ? t('engage.sending') : t('engage.submit')}
      </button>
      <p role="status" className="text-sm font-semibold text-[rgb(var(--success))]">
        {state.status === 'sent' ? t('engage.sent') : ''}
      </p>
      <p id={`${ids}-error`} role="alert" className="text-sm text-[rgb(var(--danger))]">
        {state.status === 'error' ? t(`engage.errors.${state.error}`) : ''}
      </p>
    </form>
  );
};

const Engagement = ({ target, headingAs: Heading = 'h2', className = '' }) => {
  const { t } = useTranslation();
  const root = useRef(null);
  const [state, setState] = useState({ status: 'idle' });
  const [reactions, setReactions] = useState({});
  const [comments, setComments] = useState([]);
  const [paging, setPaging] = useState({ page: 1, pages: 1, total: 0 });
  const [more, setMore] = useState({ loading: false, error: false });
  const loadingMore = useRef(false);

  const fetchPage = useCallback(async (page) => {
    const response = await fetch(`/api/engage?${new URLSearchParams({ target, page: String(page) })}`);
    if (response.status === 503) return null;
    if (!response.ok) throw new Error(String(response.status));
    return response.json();
  }, [target]);

  const loadFirst = useCallback(async () => {
    const thread = await fetchPage(1);
    if (!thread) return setState({ status: 'off' });
    const mine = readMine()[target] ?? {};
    setReactions(Object.fromEntries(Object.entries(thread.reactions).map(([key, { count }]) => [key, { count, mine: mine[key] }])));
    setComments(thread.comments);
    setPaging({ page: thread.page, pages: thread.pages, total: thread.total });
    setState({ status: 'ready' });
  }, [fetchPage, target]);

  // "Show more": one request at a time; reactions are left alone, a page the
  // server clamped (the thread shrank) is not appended twice, and comments
  // already shown are skipped.
  const loadMore = async () => {
    if (loadingMore.current) return;
    loadingMore.current = true;
    const wanted = paging.page + 1;
    setMore({ loading: true, error: false });
    try {
      const thread = await fetchPage(wanted);
      if (!thread) throw new Error('off');
      if (thread.page === wanted) setComments((shown) => mergeComments(shown, thread.comments));
      setPaging({ page: thread.page, pages: thread.pages, total: thread.total });
      setMore({ loading: false, error: false });
    } catch {
      setMore({ loading: false, error: true });
    } finally {
      loadingMore.current = false;
    }
  };

  // A reaction made in another tab (or on a project list there) shows here too.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key !== MINE_STORAGE_KEY) return;
      const mine = readMine()[target] ?? {};
      setReactions((all) => Object.fromEntries(Object.entries(all).map(([key, value]) => [key, { ...value, mine: mine[key] }])));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [target]);

  useEffect(() => {
    const element = root.current;
    if (!element) return undefined;
    const start = () => loadFirst().catch(() => setState({ status: 'off' }));
    if (typeof IntersectionObserver === 'undefined') {
      start();
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        start();
      },
      { rootMargin: '900px 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [loadFirst]);

  if (state.status !== 'ready') return <div ref={root} data-engage={target} />;

  return (
    <section ref={root} data-engage={target} aria-labelledby={`engage-${target}-title`} className={`text-start ${className}`}>
      <Heading id={`engage-${target}-title`} className="font-display text-xl sm:text-2xl font-bold text-[rgb(var(--foreground))] mb-4 type-h3">
        {t('engage.title')}
      </Heading>
      <ReactionBar target={target} reactions={reactions} setReactions={setReactions} />

      <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-10 items-start">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[rgb(var(--muted-foreground))] mb-3">
            {t('engage.comments_count', { count: paging.total })}
          </p>
          {comments.length === 0 ? (
            <p className="text-sm text-[rgb(var(--muted-foreground))]">{t('engage.empty')}</p>
          ) : (
            <CommentList comments={comments} />
          )}
          {paging.page < paging.pages && (
            <button
              type="button"
              onClick={loadMore}
              aria-disabled={more.loading || undefined}
              className={`press mt-3 inline-flex items-center min-h-11 max-md:min-h-12 px-4 rounded-xl max-md:rounded-[var(--radius-btn)] border border-[rgb(var(--border-control))] text-sm font-semibold text-[rgb(var(--foreground))] ${more.loading ? 'opacity-60 cursor-wait' : ''}`}>
              {t('engage.more')}
            </button>
          )}
          <p role="status" className="mt-2 text-sm text-[rgb(var(--danger))]">{more.error ? t('engage.load_error') : ''}</p>
        </div>
        <CommentForm target={target} />
      </div>
    </section>
  );
};

export default Engagement;
