"use client";
import { useSyncExternalStore } from 'react';

/**
 * Light/dark preference, shared by the desktop floating toggle and the phone
 * header button.
 *
 * The <html data-theme> attribute is the single source of truth: dark is the
 * default and carries no attribute, only light is stamped, which matches the
 * pre-paint script in the root document. Every useTheme() caller subscribes
 * to the same store, so the two buttons can never disagree (they used to
 * hold separate state, and the second one's first click did nothing).
 */
const listeners = new Set();

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const isDarkNow = () => document.documentElement.getAttribute('data-theme') !== 'light';
// The server render and the first client render both assume dark; the real
// value is read straight after hydration.
const isDarkOnServer = () => true;

const toggle = () => {
  const next = !isDarkNow();
  const root = document.documentElement;
  if (next) root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', 'light');
  try {
    localStorage.setItem('mode', next ? 'dark' : 'light');
  } catch {
    // Storage blocked (private mode, cookies off): the choice still applies
    // for this page view. Reading it is guarded the same way in the root
    // document's pre-paint script; an unguarded read here used to throw and
    // take the whole page down with it.
  }
  listeners.forEach((listener) => listener());
};

export const useTheme = () => {
  const isDark = useSyncExternalStore(subscribe, isDarkNow, isDarkOnServer);
  return { isDark, toggle };
};
