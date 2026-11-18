'use client';
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineAddReaction } from 'react-icons/md';
import { REACTIONS, caseTarget } from '../../lib/engage/shared';
import { displayCount, readMine, sendReaction } from '../../lib/engage/client';
import { useEscapeLayer } from '../../lib/useEscapeLayer';

/**
 * The reaction strip on the project lists (home rows, /work rows and cards,
 * the project sheet): a pill for each reaction someone has used, an "add
 * reaction" button that opens the five, and a link to the case study's
 * comments. It shares POST /api/react and this browser's "mine" record with
 * the case-study page (src/lib/engage/client.js), so the two always agree.
 *
 * Counts come from one GET /api/engage/summary per page, fetched when the
 * first strip nears the viewport (on the home page only after the visitor
 * has scrolled). The strip's row is reserved in the prerendered HTML when
 * the build has the feature configured (NEXT_PUBLIC_ENGAGE), so filling it
 * in moves nothing; without it, the strip renders nothing at all.
 */

export const ENGAGE_ON = process.env.NEXT_PUBLIC_ENGAGE === '1';

// One summary for the whole page, shared by every strip.
let summary = { status: 'idle', threads: {} };
const listeners = new Set();
const emit = () => listeners.forEach((listener) => listener());
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const SERVER_SNAPSHOT = { status: 'idle', threads: {} };

const loadSummary = () => {
  if (summary.status !== 'idle') return;
  summary = { ...summary, status: 'loading' };
  fetch('/api/engage/summary')
    .then((response) => (response.ok ? response.json() : null))
    .then((body) => {
      summary = body?.enabled ? { status: 'ready', threads: body.threads ?? {} } : { status: 'off', threads: {} };
      emit();
    })
    .catch(() => {
      summary = { status: 'off', threads: {} };
      emit();
    });
};

const setCount = (slug, key, count) => {
  summary = { ...summary, threads: { ...summary.threads, [slug]: { ...(summary.threads[slug] ?? {}), [key]: count } } };
  emit();
};

/** Starts the summary when `element` nears the viewport; on the home page, not before a scroll. */
const useLazySummary = (ref, waitForScroll) => {
  useEffect(() => {
    const element = ref.current;
    if (!ENGAGE_ON || !element || summary.status !== 'idle') return undefined;
    let observer;
    const observe = () => {
      if (typeof IntersectionObserver === 'undefined') return loadSummary();
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          loadSummary();
        },
        { rootMargin: '300px 0px' },
      );
      observer.observe(element);
      return undefined;
    };
    if (waitForScroll && window.scrollY === 0) {
      const onScroll = () => {
        window.removeEventListener('scroll', onScroll);
        observe();
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', onScroll);
        observer?.disconnect();
      };
    }
    observe();
    return () => observer?.disconnect();
  }, [ref, waitForScroll]);
};

const pill =
  'press inline-flex shrink-0 items-center justify-center gap-1.5 min-h-11 max-md:min-h-12 min-w-11 px-3 rounded-full border text-sm font-semibold transition-colors';

/**
 * Props: `slug` (the case study), `waitForScroll` (the home page), `opens` ('up' inside a card that clips its
 * overflow, 'down' elsewhere), `className`.
 */
const ProjectReactions = ({ slug, waitForScroll = false, opens = 'up', className = '' }) => {
  const { t, i18n } = useTranslation();
  const target = caseTarget(slug);
  const root = useRef(null);
  const trigger = useRef(null);
  const popover = useRef(null);
  const id = useId();
  const state = useSyncExternalStore(subscribe, () => summary, () => SERVER_SNAPSHOT);
  const [mine, setMine] = useState({});
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const pending = useRef(new Set());
  const [busy, setBusy] = useState({});
  const comma = i18n.language === 'ar' ? '، ' : ', ';

  useLazySummary(root, waitForScroll);
  // This browser's own reactions, after hydration (the prerendered page has none).
  useEffect(() => setMine(readMine()[target] ?? {}), [target]);

  const close = useCallback((refocus) => {
    setOpen(false);
    if (refocus) trigger.current?.focus();
  }, []);
  useEscapeLayer(open, () => close(true));

  // An outside press closes the popover (without taking focus anywhere).
  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event) => {
      if (!root.current?.contains(event.target)) close(false);
    };
    document.addEventListener('pointerdown', onPointer);
    popover.current?.querySelector('button')?.focus();
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open, close]);

  if (!ENGAGE_ON || state.status === 'off') {
    // Configured but not answering (storage down): keep the reserved row
    // empty rather than collapse it under the reader.
    return ENGAGE_ON ? <div className={`h-11 max-md:h-12 ${className}`} aria-hidden="true" /> : null;
  }

  const counts = state.threads[slug] ?? {};
  const countOf = (key) => displayCount(counts[key], mine[key]);
  const comments = counts.comments ?? 0;

  const toggle = async (key) => {
    if (pending.current.has(key)) return;
    pending.current.add(key);
    setBusy((all) => ({ ...all, [key]: true }));
    const before = { count: counts[key] ?? 0, mine: Boolean(mine[key]) };
    const on = !before.mine;
    // Optimistic: shown at once, and only this key is put back if refused.
    setMine((all) => ({ ...all, [key]: on }));
    setCount(slug, key, Math.max(0, before.count + (on ? 1 : -1)));
    setNotice('');
    try {
      const result = await sendReaction(target, key, on);
      setMine((all) => ({ ...all, [key]: result.mine }));
      setCount(slug, key, result.count);
    } catch {
      setMine((all) => ({ ...all, [key]: before.mine }));
      setCount(slug, key, before.count);
      setNotice(t('engage.reaction_error'));
    } finally {
      pending.current.delete(key);
      setBusy((all) => ({ ...all, [key]: false }));
    }
  };

  const label = (key) => `${t(`engage.reactions.${key}`)}${comma}${countOf(key)}`;
  const used = REACTIONS.filter(({ key }) => countOf(key) > 0);

  return (
    <div ref={root} className={`relative z-40 ${className}`}>
      {/* One row, never taller: extra pills scroll sideways instead of wrapping. */}
      <div className="flex items-center gap-1.5 h-11 max-md:h-12 overflow-x-auto overflow-y-hidden [scrollbar-width:none]">
        {/* The add button comes first and never moves: pills arriving with
            the counts are added after it, so nothing on screen shifts. */}
        <button
          ref={trigger}
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-pick`}
          aria-label={t('engage.add_reaction')}
          title={t('engage.add_reaction')}
          onClick={() => setOpen((value) => !value)}
          className={`${pill} px-0 border-[rgb(var(--border-control))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))]/60 ${open ? 'border-[rgb(var(--primary))] text-[rgb(var(--foreground))]' : ''}`}>
          <MdOutlineAddReaction aria-hidden="true" className="text-lg" />
        </button>
        {used.map(({ key, emoji }) => (
          <button
            key={key}
            type="button"
            aria-pressed={Boolean(mine[key])}
            aria-busy={busy[key] || undefined}
            aria-label={label(key)}
            onClick={() => toggle(key)}
            className={`${pill} ${
              mine[key]
                ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/12 text-[rgb(var(--foreground))]'
                : 'border-[rgb(var(--border-control))] text-[rgb(var(--muted-foreground))] hover:border-[rgb(var(--primary))]/60'
            }`}>
            <span aria-hidden="true" className="leading-none">{emoji}</span>
            <span aria-hidden="true" dir="ltr" className="tabular-nums">{countOf(key)}</span>
          </button>
        ))}
        {state.status === 'ready' && (
          <a
            href={`${i18n.language === 'ar' ? '/ar' : ''}/case-study/${slug}#comments`}
            aria-label={t('engage.comments_count', { count: comments })}
            className="press inline-flex shrink-0 items-center gap-1.5 min-h-11 max-md:min-h-12 px-3 rounded-full text-sm font-semibold text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors">
            <span aria-hidden="true" className="leading-none">💬</span>
            <span aria-hidden="true" dir="ltr" className="tabular-nums">{comments}</span>
          </a>
        )}
      </div>

      {open && (
        <div
          ref={popover}
          id={`${id}-pick`}
          role="group"
          aria-labelledby={`${id}-label`}
          className={`absolute start-0 z-50 ${opens === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'} rounded-2xl border border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))] shadow-xl p-2`}>
          <p id={`${id}-label`} className="px-1 pb-1.5 text-xs font-semibold text-[rgb(var(--muted-foreground))]">
            {t('engage.reactions_label')}
          </p>
          <div className="flex gap-1">
            {REACTIONS.map(({ key, emoji }) => (
              <button
                key={key}
                type="button"
                aria-pressed={Boolean(mine[key])}
                aria-busy={busy[key] || undefined}
                aria-label={label(key)}
                onClick={() => {
                  toggle(key);
                  close(true);
                }}
                className={`press inline-flex items-center justify-center size-11 rounded-xl text-xl transition-colors ${
                  mine[key] ? 'bg-[rgb(var(--primary))]/15 ring-1 ring-[rgb(var(--primary))]' : 'hover:bg-[rgb(var(--muted))]/40'
                }`}>
                <span aria-hidden="true">{emoji}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Always in the page, so it is announced; drawn over the row's edge
          when there is a message, so it never changes the row's height. */}
      <p
        role="status"
        className={
          notice
            ? `absolute start-0 ${opens === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'} z-50 rounded-lg bg-[rgb(var(--surface))] border border-[rgb(var(--border-subtle))] px-2 py-1 text-xs text-[rgb(var(--danger))] shadow`
            : 'sr-only'
        }>
        {notice}
      </p>
    </div>
  );
};

export default ProjectReactions;
