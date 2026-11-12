'use client';
import { LazyMotion, MotionConfig } from 'framer-motion';

// The animation engine is its own chunk. Its download starts as soon as this
// module runs in the browser (in parallel with hydration, never blocking it)
// rather than from LazyMotion's effect after hydration, so the few `m.*`
// elements that animate on load (the menu and action-button icons) start
// about when they used to. Until it arrives the `m.*` elements simply render
// their markup; the first-viewport entrances of the page content are CSS
// (see Reveal) and do not wait for it.
let features;
const loadFeatures = () => {
  features ??= import('../lib/motion-features').then((module) => module.default);
  return features;
};
if (typeof window !== 'undefined') loadFeatures();

/**
 * Framer Motion, lazily. Components use the lightweight `m.*` elements, and
 * the animation engine behind them (gestures, exit animations, layout, drag)
 * is downloaded separately instead of sitting in the bundle every page needs
 * before it can hydrate. `strict` makes a stray full `motion.*` element throw
 * in development rather than silently pull the whole engine back in.
 *
 * reducedMotion="user" drops transform and layout animations for anyone who
 * has asked their OS to reduce motion, without touching opacity fades.
 */
const MotionProvider = ({ children }) => (
  <LazyMotion features={loadFeatures} strict>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LazyMotion>
);

export default MotionProvider;
