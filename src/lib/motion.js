/**
 * Shared scroll-reveal settings.
 *
 * Two things made reveals feel late on phones:
 *
 * 1. `viewport={{ once: true }}` alone fires only once an element is already
 *    on screen, so you scroll to a section and watch empty space fade in.
 *    A positive bottom root margin starts the animation before the element
 *    reaches the fold, so it has finished by the time you look at it.
 *
 * 2. `delay: index * 0.1` was applied to every list. The projects grid renders
 *    35 cards, which put the last one 3.4s behind the first. Delay is now
 *    capped: the first few items still cascade, the rest start immediately.
 */

/**
 * How far below the fold an element starts animating.
 *
 * A flick on a phone covers well over a thousand pixels, so a small pre-trigger
 * still lands you on content that is mid-fade. Phones get roughly a screen and
 * a half of lead time, which means anything you flick to has already finished.
 * Desktop scrolls more slowly and has a taller viewport, so it needs less.
 *
 * Read once at module load. This only configures an IntersectionObserver, it
 * does not affect rendered markup, so there is no hydration concern.
 */
const isSmallScreen =
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 767px)').matches;

export const REVEAL_VIEWPORT = {
  once: true,
  margin: isSmallScreen ? '0px 0px 1200px 0px' : '0px 0px 700px 0px',
};

export const REVEAL_DURATION = isSmallScreen ? 0.3 : 0.45;

/**
 * For grids tall enough to outrun the normal lead time. The projects grid is
 * roughly 14,000px, so flicking through it arrives at cards that only just
 * started fading. Three screens of lead keeps them ahead of the scroll.
 */
export const LONG_LIST_VIEWPORT = {
  once: true,
  margin: isSmallScreen ? '0px 0px 2400px 0px' : '0px 0px 1400px 0px',
};

const MAX_STAGGERED_ITEMS = 4;
const STAGGER_STEP = 0.06;

/**
 * Cascade the first few items of a list, then stop adding delay. Keeps the
 * effect on whatever is on screen together without penalising long grids.
 */
export const revealDelay = (index = 0, step = STAGGER_STEP) =>
  Math.min(index, MAX_STAGGERED_ITEMS) * step;

/** Standard fade-and-rise transition for a list item. */
export const revealTransition = (index = 0) => ({
  duration: REVEAL_DURATION,
  delay: revealDelay(index),
  ease: 'easeOut',
});
