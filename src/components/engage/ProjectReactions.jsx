'use client';
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineAddReaction } from 'react-icons/md';
import { REACTIONS } from '../../lib/engage/shared';
import { useEscapeLayer } from '../../lib/useEscapeLayer';
import { getServerSnapshot, getSnapshot, loadMine, reactionView, subscribe, toggleReaction, watch } from './reactionsStore';

/**
 * The reaction strip on the project lists (home rows, /work rows and cards,
 * the project sheet): a quiet line of metadata, not a third button row. A
 * small chip for each reaction someone has used, an "add reaction" button
 * that opens the five, and a link to the case study's comments when there
 * are any. Every strip on the page reads one shared state
 * (reactionsStore.js), and shares POST /api/react and this browser's record
 * with the case-study page, so they always agree.
 *
 * The row is reserved in the prerendered HTML when the build has the
 * feature configured (NEXT_PUBLIC_ENGAGE), so filling it in moves nothing;
 * without it, the strip renders nothing at all.
 */

export const ENGAGE_ON = process.env.NEXT_PUBLIC_ENGAGE === '1';

/** A 44px hit area around a small visual chip. */
const hit = 'press relative inline-flex shrink-0 items-center justify-center min-h-11 min-w-11 px-0.5';
const chip = 'inline-flex items-center gap-1 rounded-full px-2 h-7 text-xs font-medium transition-colors';

/**
 * Props: `slug` (the case study), `title` (the project's name, for the
 * comments link), `describedBy` (the id of the project's heading, so each
 * button says which project it is about), `waitForScroll` (the home page),
 * `className`.
 */
const ProjectReactions = ({ slug, title, describedBy, waitForScroll = false, className = '' }) => {
  const { t, i18n } = useTranslation();
  const root = useRef(null);
  const trigger = useRef(null);
  const popover = useRef(null);
  const id = useId();
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const [notice, setNotice] = useState('');
  const comma = i18n.language === 'ar' ? '، ' : ', ';

  useEffect(() => {
    if (!ENGAGE_ON) return undefined;
    loadMine();
    return watch(root.current, waitForScroll);
  }, [waitForScroll]);

  const close = useCallback((refocus) => {
    setOpen(false);
    if (refocus) trigger.current?.focus();
  }, []);
  useEscapeLayer(open, () => close(true));

  // Opens downward when there is room below (inside the viewport and inside
  // a card that clips its overflow), upward only when there is not. Measured
  // before paint, so it never visibly jumps.
  useLayoutEffect(() => {
    if (!open || !popover.current || !trigger.current) return;
    const below = trigger.current.getBoundingClientRect().bottom;
    let limit = window.innerHeight;
    for (let node = trigger.current.parentElement; node; node = node.parentElement) {
      if (getComputedStyle(node).overflow !== 'visible') {
        limit = Math.min(limit, node.getBoundingClientRect().bottom);
        break;
      }
    }
    setUp(limit - below < popover.current.offsetHeight + 12);
  }, [open]);

  // An outside press closes the picker (without taking focus anywhere).
  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event) => {
      if (!root.current?.contains(event.target)) close(false);
    };
    document.addEventListener('pointerdown', onPointer);
    popover.current?.querySelector('button')?.focus();
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open, close]);

  if (!ENGAGE_ON) return null;
  const off = snapshot.status === 'off';

  const views = Object.fromEntries(REACTIONS.map(({ key }) => [key, reactionView(snapshot, slug, key)]));
  const comments = snapshot.threads[slug]?.comments ?? 0;
  const label = (key) => `${t(`engage.reactions.${key}`)}${comma}${views[key].count}`;

  const toggle = async (key, fromPicker) => {
    const view = views[key];
    if (view.busy) return;
    // Taking back the last one removes this chip: keep focus in the strip.
    if (!fromPicker && view.on && view.count <= 1) trigger.current?.focus();
    setNotice('');
    if (!(await toggleReaction(slug, key))) setNotice(t('engage.reaction_error'));
  };

  const used = REACTIONS.filter(({ key }) => views[key].count > 0);

  return (
    <div
      ref={root}
      className={`relative z-40 flex items-center h-11 ${className}`}
      // Focus leaving the strip closes the picker.
      onBlur={(event) => {
        if (open && event.relatedTarget && !root.current?.contains(event.relatedTarget)) close(false);
      }}>
      <div className="relative shrink-0">
        <button
          ref={trigger}
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-pick`}
          aria-label={t('engage.add_reaction')}
          aria-describedby={describedBy}
          aria-disabled={off || undefined}
          title={off ? t('engage.reactions_unavailable') : t('engage.add_reaction')}
          onClick={() => !off && setOpen((value) => !value)}
          className={`${hit} text-[rgb(var(--muted-foreground))] ${off ? 'opacity-40 cursor-not-allowed' : 'hover:text-[rgb(var(--foreground))]'}`}>
          <span className={`${chip} px-1.5 ${open ? 'bg-[rgb(var(--muted))]/50 text-[rgb(var(--foreground))]' : ''}`}>
            <MdOutlineAddReaction aria-hidden="true" className="text-base" />
          </span>
        </button>
        {/* Right after its button in the DOM, so Tab goes straight into it. */}
        {open && (
          <div
            ref={popover}
            id={`${id}-pick`}
            role="group"
            aria-labelledby={`${id}-label`}
            className={`absolute start-0 z-50 ${up ? 'bottom-full mb-1' : 'top-full mt-1'} rounded-2xl border border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))] shadow-xl p-2`}>
            <p id={`${id}-label`} className="px-1 pb-1.5 text-xs font-semibold text-[rgb(var(--muted-foreground))]">
              {t('engage.reactions_label')}
            </p>
            <div className="flex gap-1">
              {REACTIONS.map(({ key, emoji }) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={views[key].on}
                  aria-busy={views[key].busy || undefined}
                  aria-label={label(key)}
                  aria-describedby={describedBy}
                  onClick={() => {
                    toggle(key, true);
                    close(true);
                  }}
                  className={`press inline-flex items-center justify-center size-11 rounded-xl text-xl transition-colors ${
                    views[key].on ? 'bg-[rgb(var(--primary))]/15 ring-1 ring-[rgb(var(--primary))]' : 'hover:bg-[rgb(var(--muted))]/40'
                  }`}>
                  <span aria-hidden="true">{emoji}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* The used reactions and the comments link; extra chips scroll
          sideways rather than wrap, so the row never grows. */}
      <div className="flex items-center min-w-0 overflow-x-auto overflow-y-hidden [scrollbar-width:none]">
        {used.map(({ key, emoji }) => (
          <button
            key={key}
            type="button"
            aria-pressed={views[key].on}
            aria-busy={views[key].busy || undefined}
            aria-label={label(key)}
            aria-describedby={describedBy}
            onClick={() => toggle(key, false)}
            className={`${hit} ${views[key].on ? 'text-[rgb(var(--foreground))]' : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'}`}>
            <span className={`${chip} ${views[key].on ? 'bg-[rgb(var(--primary))]/12' : 'bg-[rgb(var(--muted))]/25'}`}>
              <span aria-hidden="true" className="leading-none">{emoji}</span>
              <span aria-hidden="true" dir="ltr" className="tabular-nums">{views[key].count}</span>
            </span>
          </button>
        ))}
        {comments > 0 && (
          <a
            href={`${i18n.language === 'ar' ? '/ar' : ''}/case-study/${slug}#comments`}
            aria-label={t('engage.comments_on', { count: comments, title })}
            className={`${hit} text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))]`}>
            <span className={chip}>
              <span aria-hidden="true" className="leading-none">💬</span>
              <span aria-hidden="true" dir="ltr" className="tabular-nums">{comments}</span>
            </span>
          </a>
        )}
      </div>

      {/* Always in the page, so it is announced; drawn over the row's edge
          when there is a message, so it never changes the row's height. */}
      <p
        role="status"
        className={
          notice
            ? 'absolute start-0 bottom-full mb-1 z-50 rounded-lg bg-[rgb(var(--surface))] border border-[rgb(var(--border-subtle))] px-2 py-1 text-xs text-[rgb(var(--danger))] shadow'
            : 'sr-only'
        }>
        {notice}
      </p>
    </div>
  );
};

export default ProjectReactions;
