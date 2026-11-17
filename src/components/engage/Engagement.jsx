'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { REACTIONS, LIMITS } from '../../lib/engage/shared';
import { validateComment } from '../../lib/engage/validate';

/**
 * Reactions and comments for one thread (`target`: case:<slug>,
 * post:<slug>, teach:<course>). See src/lib/engage/ for the server side.
 *
 * Nothing is requested until the block is within about a screen of the
 * viewport, and nothing is drawn until the API answers: when the feature is
 * off (no storage configured, the API answers 503) the block stays an empty
 * div, so pages without it look exactly as before. Because it loads ahead of
 * the reader, it is in place before it scrolls into view and shifts nothing
 * on screen.
 *
 * Comment names and text are only ever React text nodes, shown with
 * `white-space: pre-line`: nothing a visitor types is parsed as HTML or
 * turned into a link.
 */

const VISITOR_KEY = 'engage-visitor';
let sessionVisitor = '';

/** An anonymous id for this browser, kept in localStorage when allowed. */
const visitorId = () => {
  const fresh = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`);
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = fresh();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    sessionVisitor ||= fresh();
    return sessionVisitor;
  }
};

const postJson = (url, body) =>
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

const relativeTime = (ms, lang) => {
  const seconds = Math.round((ms - Date.now()) / 1000);
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  const format = new Intl.RelativeTimeFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en', { numeric: 'auto' });
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return format.format(Math.round(seconds / size), unit);
  }
  return format.format(0, 'minute');
};

const ReactionBar = ({ target, reactions, setReactions, visitor }) => {
  const { t, i18n } = useTranslation();
  const [notice, setNotice] = useState('');
  const comma = i18n.language === 'ar' ? '، ' : ', ';

  const toggle = async (key) => {
    const before = reactions[key];
    const on = !before.mine;
    // Optimistic: the press shows at once, and is rolled back if refused.
    setReactions((all) => ({ ...all, [key]: { mine: on, count: Math.max(0, before.count + (on ? 1 : -1)) } }));
    setNotice('');
    try {
      const response = await postJson('/api/react', { target, emoji: key, on, visitor });
      if (!response.ok) throw new Error(String(response.status));
      const result = await response.json();
      setReactions((all) => ({ ...all, [key]: { mine: result.mine, count: result.count } }));
    } catch {
      setReactions((all) => ({ ...all, [key]: before }));
      setNotice(t('engage.reaction_error'));
    }
  };

  return (
    <div>
      <div role="group" aria-label={t('engage.reactions_label')} className="flex flex-wrap gap-2">
        {REACTIONS.map(({ key, emoji }) => {
          const { count, mine } = reactions[key] ?? { count: 0, mine: false };
          return (
            <button
              key={key}
              type="button"
              aria-pressed={mine}
              aria-label={`${t(`engage.reactions.${key}`)}${comma}${count}`}
              onClick={() => toggle(key)}
              className={`press inline-flex items-center gap-2 min-h-11 px-4 rounded-full border text-sm font-semibold transition-colors ${
                mine
                  ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/12 text-[rgb(var(--foreground))]'
                  : 'border-[rgb(var(--border-subtle))] bg-[rgb(var(--muted))]/20 text-[rgb(var(--muted-foreground))] hover:border-[rgb(var(--border-control))]'
              }`}>
              <span aria-hidden="true" className="text-base leading-none">{emoji}</span>
              <span aria-hidden="true" dir="ltr" className="tabular-nums">{count}</span>
            </button>
          );
        })}
      </div>
      <p role="status" className="sr-only">{notice}</p>
      {notice && <p className="mt-2 text-sm text-[rgb(var(--danger))]">{notice}</p>}
    </div>
  );
};

const CommentList = ({ comments }) => {
  const { i18n } = useTranslation();
  return (
    <ol className="space-y-3">
      {comments.map((comment) => (
        <li key={comment.id} className="rounded-xl border border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]/50 p-4">
          <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
            <span dir="auto" className="font-semibold text-[rgb(var(--foreground))] break-words">{comment.name}</span>
            <time dateTime={new Date(comment.createdAt).toISOString()} className="text-xs text-[rgb(var(--muted-foreground))]">
              {relativeTime(comment.createdAt, i18n.language)}
            </time>
          </p>
          {/* dir="auto": each comment reads in its own language's direction. */}
          <p dir="auto" className="mt-1.5 text-start text-[rgb(var(--foreground))]/90 leading-relaxed whitespace-pre-line break-words">{comment.text}</p>
        </li>
      ))}
    </ol>
  );
};

const CommentForm = ({ target, shownAt }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [state, setState] = useState({ status: 'idle', error: '' });
  const ids = `engage-${target.replace(/[^\w-]/g, '-')}`;

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const checked = validateComment({ name, text });
    if (!checked.ok) {
      setState({ status: 'error', error: checked.error });
      return;
    }
    setState({ status: 'sending', error: '' });
    try {
      const response = await postJson('/api/comment', {
        target,
        name: checked.name,
        text: checked.text,
        website: form.elements.website?.value ?? '',
        elapsed: Date.now() - shownAt,
      });
      if (response.status === 202) {
        setText('');
        setState({ status: 'sent', error: '' });
        return;
      }
      const body = await response.json().catch(() => ({}));
      setState({ status: 'error', error: ['name', 'text', 'links', 'rate'].includes(body.error) ? body.error : 'generic' });
    } catch {
      setState({ status: 'error', error: 'generic' });
    }
  };

  const field =
    'w-full rounded-xl border border-[rgb(var(--border-control))] bg-[rgb(var(--background))] px-4 py-2.5 text-base text-[rgb(var(--foreground))] focus:border-[rgb(var(--primary))]';
  const invalid = (which) => state.status === 'error' && state.error === which;

  return (
    <form onSubmit={submit} noValidate className="relative space-y-3" aria-describedby={`${ids}-note`}>
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
          id={`${ids}-name`}
          name="name"
          type="text"
          autoComplete="name"
          maxLength={LIMITS.nameMax}
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={invalid('name') || undefined}
          aria-describedby={invalid('name') ? `${ids}-error` : undefined}
          className={`${field} min-h-11`}
        />
      </div>
      <div>
        <label htmlFor={`${ids}-text`} className="block text-sm font-semibold mb-1.5 text-[rgb(var(--foreground))]">
          {t('engage.comment')}
        </label>
        <textarea
          id={`${ids}-text`}
          name="text"
          rows={4}
          maxLength={LIMITS.textMax}
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-invalid={invalid('text') || invalid('links') || undefined}
          aria-describedby={invalid('text') || invalid('links') ? `${ids}-error` : undefined}
          className={`${field} resize-y`}
        />
      </div>
      <p id={`${ids}-note`} className="text-xs text-[rgb(var(--muted-foreground))]">{t('engage.privacy')}</p>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={state.status === 'sending'}
          className="press inline-flex items-center justify-center min-h-11 px-6 rounded-xl font-semibold bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))] disabled:opacity-60">
          {state.status === 'sending' ? t('engage.sending') : t('engage.submit')}
        </button>
      </div>
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
  const [visitor, setVisitor] = useState('');

  const load = useCallback(
    async (page = 1) => {
      const id = visitorId();
      setVisitor(id);
      const query = new URLSearchParams({ target, v: id, page: String(page) });
      const response = await fetch(`/api/engage?${query}`);
      if (response.status === 503) return setState({ status: 'off' });
      if (!response.ok) throw new Error(String(response.status));
      const thread = await response.json();
      setReactions(thread.reactions);
      setComments((previous) => (page === 1 ? thread.comments : [...previous, ...thread.comments]));
      setPaging({ page: thread.page, pages: thread.pages, total: thread.total });
      setState((previous) => (previous.status === 'ready' ? previous : { status: 'ready', shownAt: Date.now() }));
    },
    [target],
  );

  useEffect(() => {
    const element = root.current;
    if (!element) return undefined;
    const start = () => load().catch(() => setState({ status: 'off' }));
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
  }, [load]);

  if (state.status !== 'ready') return <div ref={root} data-engage={target} />;

  return (
    <section ref={root} data-engage={target} aria-labelledby={`engage-${target}-title`} className={`text-start ${className}`}>
      <Heading id={`engage-${target}-title`} className="font-display text-xl sm:text-2xl font-bold text-[rgb(var(--foreground))] mb-4 type-h3">
        {t('engage.title')}
      </Heading>
      <ReactionBar target={target} reactions={reactions} setReactions={setReactions} visitor={visitor} />

      <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10 items-start">
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
              onClick={() => load(paging.page + 1).catch(() => {})}
              className="press mt-3 inline-flex items-center min-h-11 px-4 rounded-xl border border-[rgb(var(--border-control))] text-sm font-semibold text-[rgb(var(--foreground))]">
              {t('engage.more')}
            </button>
          )}
        </div>
        <CommentForm target={target} shownAt={state.shownAt} />
      </div>
    </section>
  );
};

export default Engagement;
