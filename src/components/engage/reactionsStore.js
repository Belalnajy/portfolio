'use client';
import { MINE_STORAGE_KEY, effectiveCount, mergeSummary, readMine, sendReaction } from '../../lib/engage/client';

/**
 * One state for every reaction strip on a page (home and /work rows, the
 * archive cards, the project sheet): the summary of counts, this browser's
 * own reactions and the requests in flight, all keyed by case study. A card
 * and the sheet opened from it read the same entries and share one lock per
 * reaction, so they can never disagree or double-send.
 *
 * Read it with useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot).
 */

const SUMMARY_MAX_AGE_MS = 60 * 1000;

let state = { status: 'idle', threads: {}, fetchedAt: 0, mine: {}, busy: {} };
const listeners = new Set();
const set = (next) => {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
};

export const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
export const getSnapshot = () => state;
const SERVER_SNAPSHOT = state;
export const getServerSnapshot = () => SERVER_SNAPSHOT;

/** This browser's records, read after hydration (the prerendered page has none). */
export const loadMine = () => set({ mine: readMine() });

let wired = false;
/** Once per page: other tabs' reactions, and a fresh summary when the page comes back after a while. */
const wire = () => {
  if (wired || typeof window === 'undefined') return;
  wired = true;
  window.addEventListener('storage', (event) => {
    if (event.key === MINE_STORAGE_KEY) loadMine();
  });
  const refresh = () => {
    if (document.visibilityState === 'visible' && state.status === 'ready' && Date.now() - state.fetchedAt > SUMMARY_MAX_AGE_MS) fetchSummary();
  };
  document.addEventListener('visibilitychange', refresh);
  window.addEventListener('pageshow', refresh);
  window.addEventListener('popstate', refresh);
};

const fetchSummary = () =>
  fetch('/api/engage/summary')
    .then((response) => (response.ok ? response.json() : null))
    .then((body) => {
      if (body?.enabled) set({ status: 'ready', threads: mergeSummary(state.threads, body.threads), fetchedAt: Date.now() });
      else if (state.status !== 'ready') set({ status: 'off' });
    })
    .catch(() => {
      if (state.status !== 'ready') set({ status: 'off' });
    });

/** Fetches the summary the first time it is asked for. */
export const loadSummary = () => {
  if (state.status !== 'idle') return;
  set({ status: 'loading' });
  stopWatching();
  wire();
  fetchSummary();
};

// One trigger for the whole page: a single IntersectionObserver over every
// strip, and (on the home page) a single scroll listener that waits for the
// visitor's first scroll. Both go away as soon as the summary is asked for.
let observer = null;
let waitingForScroll = false;
const watched = new Set();
const onScroll = () => {
  window.removeEventListener('scroll', onScroll);
  waitingForScroll = false;
  watched.forEach(observe);
};
const observe = (element) => {
  if (typeof IntersectionObserver === 'undefined') return loadSummary();
  observer ??= new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) loadSummary();
  }, { rootMargin: '300px 0px' });
  observer.observe(element);
  return undefined;
};
const stopWatching = () => {
  observer?.disconnect();
  observer = null;
  watched.clear();
  if (waitingForScroll) window.removeEventListener('scroll', onScroll);
  waitingForScroll = false;
};

/** Registers a strip with the page's one trigger; returns its cleanup. */
export const watch = (element, waitForScroll) => {
  if (state.status !== 'idle' || !element) return () => {};
  watched.add(element);
  if (waitForScroll && window.scrollY === 0) {
    if (!waitingForScroll) {
      waitingForScroll = true;
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  } else if (!waitingForScroll) {
    observe(element);
  }
  return () => {
    watched.delete(element);
    observer?.unobserve(element);
  };
};

/** What one reaction shows: { count, on, busy }. */
export const reactionView = (snapshot, slug, key) => {
  const target = `case:${slug}`;
  const entry = snapshot.mine[target]?.[key];
  return {
    count: effectiveCount(snapshot.threads[slug]?.[key], entry),
    on: Boolean(entry?.on),
    busy: Boolean(snapshot.busy[target]?.[key]),
  };
};

const patch = (target, slug, key, { entry, count, busy }) => {
  const next = {};
  if (entry !== undefined) next.mine = { ...state.mine, [target]: { ...(state.mine[target] ?? {}), [key]: entry } };
  if (count !== undefined) next.threads = { ...state.threads, [slug]: { ...(state.threads[slug] ?? {}), [key]: count } };
  if (busy !== undefined) next.busy = { ...state.busy, [target]: { ...(state.busy[target] ?? {}), [key]: busy } };
  set(next);
};

/**
 * Turns one reaction on or off. One request per reaction at a time (a press
 * while it is in flight is ignored), shown at once and put back if refused.
 * Resolves true when it went through.
 */
export const toggleReaction = async (slug, key) => {
  const target = `case:${slug}`;
  if (state.busy[target]?.[key]) return false;
  const before = { entry: state.mine[target]?.[key], count: state.threads[slug]?.[key] ?? 0 };
  const shown = effectiveCount(before.count, before.entry);
  const on = !before.entry?.on;
  patch(target, slug, key, { busy: true, entry: { on, count: Math.max(0, shown + (on ? 1 : -1)), at: Date.now() } });
  try {
    const result = await sendReaction(target, key, on);
    patch(target, slug, key, { busy: false, entry: { on: result.mine, count: result.count, at: Date.now() }, count: result.count });
    return true;
  } catch {
    patch(target, slug, key, { busy: false, entry: before.entry ?? { on: false, count: 0, at: 0 }, count: before.count });
    return false;
  }
};
