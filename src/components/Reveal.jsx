'use client';
import { useEffect, useRef, useState } from 'react';
import { REVEAL_VIEWPORT, LONG_LIST_VIEWPORT } from '../lib/motion';

/**
 * Fade-and-rise reveal without an animation library.
 *
 * The plain scroll reveals (start transparent and a few pixels low, settle
 * when the element nears the viewport) used to be Framer Motion elements, one
 * animation controller per card. They are a CSS animation now (`.reveal` in
 * globals.css) switched on by one shared IntersectionObserver, with the same
 * lead distance (src/lib/motion.js), duration, easing and stagger as before.
 * Anything that needs more than that (hover springs, exit animations, shared
 * layout) is still a Framer `m.*` element.
 *
 * Props
 * - `as`: the element to render (default div).
 * - `y`, `x`, `scale`: where the element starts from, like Framer's `initial`.
 * - `delay`, `duration`: seconds. Duration defaults to the site's reveal
 *   duration (shorter on phones), set in CSS.
 * - `long`: use the longer lead distance meant for very tall grids.
 * - `immediate`: do not wait for scrolling (or for JavaScript): the animation
 *   runs from the first paint. For content in the first viewport.
 * - `rise`: like `immediate`, but move without fading. An element at opacity 0 is
 *   not painted as far as the browser's Largest Contentful Paint is concerned,
 *   so the page's main heading or cover must not start transparent.
 */

// One observer per lead distance, shared by every Reveal on the page.
const observers = new Map();
const callbacks = new WeakMap();

/** Returns a cleanup, or null when no observer can be made (then reveal now). */
const observe = (element, margin, onVisible) => {
  let observer = observers.get(margin);
  if (!observer) {
    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            observer.unobserve(entry.target);
            callbacks.get(entry.target)?.();
            callbacks.delete(entry.target);
          }
        },
        { rootMargin: margin },
      );
    } catch {
      return null;
    }
    observers.set(margin, observer);
  }
  callbacks.set(element, onVisible);
  observer.observe(element);
  return () => {
    callbacks.delete(element);
    observer.unobserve(element);
  };
};

// Tells the CSS failsafe in globals.css that the reveal code is running, so
// it must not force hidden content visible on its own clock.
let announced = false;
const announceReady = () => {
  if (announced) return;
  announced = true;
  document.documentElement.setAttribute('data-reveal-ready', '');
};

const Reveal = ({
  as: Tag = 'div',
  y,
  x,
  scale,
  delay,
  duration,
  long = false,
  immediate = false,
  rise = false,
  className = '',
  style,
  children,
  ...rest
}) => {
  const ref = useRef(null);
  // 'in' while the animation runs, 'done' once it has finished; see the note
  // on `.reveal` in globals.css for why the two are separate states.
  // `rise` only makes sense from the first paint, so it implies `immediate`.
  const fromFirstPaint = immediate || rise;
  const [phase, setPhase] = useState(fromFirstPaint ? 'in' : undefined);

  useEffect(() => {
    announceReady();
    if (fromFirstPaint) return undefined;
    const element = ref.current;
    if (!element) return undefined;
    const { margin } = long ? LONG_LIST_VIEWPORT : REVEAL_VIEWPORT;
    const stop =
      typeof IntersectionObserver === 'undefined'
        ? null
        : observe(element, margin, () => setPhase((current) => current ?? 'in'));
    // No observer (very old browser, or construction failed): show it now.
    if (!stop) setPhase('done');
    return stop ?? undefined;
  }, [fromFirstPaint, long]);

  // Keyboard focus can land inside a block the scroll has not revealed yet
  // (tabbing moves faster than the observer's lead): show it at once, no
  // animation, so the focused control is never invisible.
  const { onFocus } = rest;
  const handleFocus = (event) => {
    setPhase((current) => current ?? 'done');
    onFocus?.(event);
  };

  const vars = { ...style };
  if (y !== undefined) vars['--reveal-y'] = `${y}px`;
  if (x !== undefined) vars['--reveal-x'] = `${x}px`;
  if (scale !== undefined) vars['--reveal-scale'] = scale;
  if (delay) vars['--reveal-delay'] = `${delay}s`;
  if (duration !== undefined) vars['--reveal-d'] = `${duration}s`;

  return (
    <Tag
      ref={ref}
      className={`${rise ? 'reveal-rise' : 'reveal'} ${className}`}
      data-visible={rise ? undefined : phase}
      style={vars}
      // Bubbles from descendants too; only this element's own animation counts.
      onAnimationEnd={
        rise ? undefined : (event) => event.target === event.currentTarget && setPhase('done')
      }
      {...rest}
      onFocus={handleFocus}>
      {children}
    </Tag>
  );
};

export default Reveal;
