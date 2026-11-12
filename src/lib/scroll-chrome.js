"use client";
/**
 * The floating chrome's reaction to scrolling, in one place: one passive
 * scroll listener, at most one update per frame, for both the header (which
 * slides away on phones) and the tab bar (which shrinks to a compact pill).
 *
 * Writes two attributes on <html>, each only while it is really true, so
 * anything that moves with the chrome (the /work filter rail) can trust it:
 * - data-header="hidden": past HIDE_AFTER, after a downward move of more than
 *   DELTA. Never on wider screens, under reduced motion, while the menu or a
 *   sheet is open, or while focus is inside the header.
 * - data-tabbar="compact": same trigger, same exceptions (focus inside the
 *   bar instead of the header), and the bar expands again at the bottom of
 *   the page, where there is nothing more to read under it.
 * Any upward move of more than DELTA, or a stop near the top, shows both.
 * The components register their elements and a callback for the `scrolled`
 * flag (the header's fill); the listener runs while anything is registered.
 */
const HIDE_AFTER = 120;
const DELTA = 8;
const BOTTOM_SLACK = 32;

const parts = { header: null, tabbar: null };
const scrolledListeners = new Set();
let installed = null;

const root = () => document.documentElement;
// Attribute writes only on a change: most frames then touch nothing.
const set = (el, name, value) => {
  if (el.getAttribute(name) !== value) el.setAttribute(name, value);
};

export const showHeader = () => root().removeAttribute('data-header');
export const expandTabbar = () => root().removeAttribute('data-tabbar');
/** Both back to their full state (a menu or sheet opening, a media change). */
export const showChrome = () => {
  showHeader();
  expandTabbar();
};

const install = () => {
  const html = root();
  const phone = window.matchMedia('(max-width: 767.98px)');
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  const free = () =>
    phone.matches && !calm.matches && !html.hasAttribute('data-menu-open') && !html.hasAttribute('data-sheet-open');
  const holdsFocus = (el) => Boolean(el && el.contains(document.activeElement));

  let anchor = window.scrollY;
  let frame = 0;
  let scrolled = null;
  const update = () => {
    frame = 0;
    const y = window.scrollY;
    const isScrolled = y > 8;
    if (isScrolled !== scrolled) {
      scrolled = isScrolled;
      scrolledListeners.forEach((listener) => listener(isScrolled));
    }
    if (y < HIDE_AFTER) {
      showChrome();
      anchor = y;
      return;
    }
    const atBottom = y + window.innerHeight >= document.documentElement.scrollHeight - BOTTOM_SLACK;
    const delta = y - anchor;
    if (delta > DELTA) {
      if (free() && !holdsFocus(parts.header)) set(html, 'data-header', 'hidden');
      if (free() && !holdsFocus(parts.tabbar) && !atBottom) set(html, 'data-tabbar', 'compact');
      else expandTabbar();
      anchor = y;
    } else if (delta < -DELTA) {
      showChrome();
      anchor = y;
    } else if (atBottom) {
      expandTabbar();
    }
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  phone.addEventListener('change', showChrome);
  calm.addEventListener('change', showChrome);
  return {
    // A newly registered component gets the current flag at once.
    current: () => Boolean(scrolled),
    stop: () => {
      window.removeEventListener('scroll', onScroll);
      phone.removeEventListener('change', showChrome);
      calm.removeEventListener('change', showChrome);
      cancelAnimationFrame(frame);
      showChrome();
    },
  };
};

/**
 * Register the header ('header') or the tab bar ('tabbar'). Focus arriving
 * inside it brings it back. Returns the cleanup.
 */
export const registerChrome = (kind, element, onScrolled) => {
  parts[kind] = element;
  if (onScrolled) scrolledListeners.add(onScrolled);
  installed ??= install();
  if (onScrolled) onScrolled(installed.current());
  const reveal = kind === 'header' ? showHeader : expandTabbar;
  element?.addEventListener('focusin', reveal);
  return () => {
    element?.removeEventListener('focusin', reveal);
    if (onScrolled) scrolledListeners.delete(onScrolled);
    if (parts[kind] === element) parts[kind] = null;
    if (!parts.header && !parts.tabbar && scrolledListeners.size === 0) {
      installed?.stop();
      installed = null;
    }
  };
};
