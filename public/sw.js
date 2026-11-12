/*
 * Conservative service worker, written by hand — no generator, no magic.
 *
 * Strategy:
 *  - Hashed build assets (/_next/static/): cache-first. Their URLs change
 *    when their content does, so a cache hit is always right.
 *  - Every other same-origin style, script, font or image (covers under
 *    /public, /_next/image output, the analytics script): stale-while-
 *    revalidate. Those URLs do NOT change when the file does, so a cached
 *    copy is served at once and refreshed in the background; a replaced
 *    cover reaches a returning visitor on their next view instead of never.
 *  - Page navigations: network-first with a cached fallback, so the site
 *    stays readable on a flaky connection or offline after a first visit.
 *    Pages are stored by path alone: `/?utm_source=x` and `/` are the same
 *    HTML, so a campaign link neither adds a copy nor misses offline.
 *    A server error (5xx) or a network that has not answered within
 *    NAVIGATION_TIMEOUT_MS falls back to the cached copy when there is one.
 *    Accepted risk of the timeout: on a connection slower than that, a
 *    returning visitor is shown the previously cached HTML (the fresh
 *    response still lands in the cache for the next view). The alternative
 *    is a blank tab for as long as the connection takes.
 *  - Everything else (analytics beacons, APIs, cross-origin): untouched.
 *
 * Bump VERSION whenever the caching logic changes; old caches are dropped on
 * activate.
 */
const VERSION = 'v3';
const STATIC_CACHE = `static-${VERSION}`;
const ASSET_CACHE = `assets-${VERSION}`;
const PAGE_CACHE = `pages-${VERSION}`;
const CURRENT_CACHES = new Set([STATIC_CACHE, ASSET_CACHE, PAGE_CACHE]);

const ASSET_DESTINATIONS = new Set(['style', 'script', 'font', 'image']);
// Unhashed assets have no natural bound (every /_next/image width is its own
// entry), so the oldest are dropped past this many.
const ASSET_CACHE_LIMIT = 150;
// The site has about a hundred pages at up to ~450 KB of HTML each.
const PAGE_CACHE_LIMIT = 40;
const NAVIGATION_TIMEOUT_MS = 4000;

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => !CURRENT_CACHES.has(key)).map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

const trim = async (cacheName, limit) => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  // Cache keys come back in insertion order: the first ones are the oldest.
  await Promise.all(keys.slice(0, Math.max(0, keys.length - limit)).map((key) => cache.delete(key)));
};

const cacheFirst = async (request) => {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
};

const staleWhileRevalidate = async (event) => {
  const { request } = event;
  const cache = await caches.open(ASSET_CACHE);
  const cached = await cache.match(request);
  const refresh = fetch(request).then(async (response) => {
    if (response.ok) {
      await cache.put(request, response.clone());
      await trim(ASSET_CACHE, ASSET_CACHE_LIMIT);
    }
    return response;
  });
  if (!cached) return refresh;
  // Keep the worker alive until the background refresh has been stored; a
  // failed refresh just leaves the cached copy in place.
  event.waitUntil(refresh.catch(() => {}));
  return cached;
};

const networkFirst = async (event) => {
  const { request } = event;
  const cache = await caches.open(PAGE_CACHE);
  // Query strings do not change the HTML of a prerendered page.
  const url = new URL(request.url);
  const key = url.origin + url.pathname;
  const cached = await cache.match(key);

  const network = fetch(request).then(async (response) => {
    if (response.ok) {
      await cache.put(key, response.clone());
      await trim(PAGE_CACHE, PAGE_CACHE_LIMIT);
    }
    return response;
  });
  // Keeps the worker alive until the copy is stored, including when a slow
  // answer arrives after the timeout below has already replied.
  event.waitUntil(network.catch(() => {}));

  if (!cached) {
    // Nothing stored for this page: wait for the network, and if it fails let
    // the browser show its own offline page. Answering with some other
    // page's HTML under this URL would only mislead.
    return network;
  }

  let timer;
  const timeout = new Promise((resolve) => {
    timer = setTimeout(() => resolve(cached), NAVIGATION_TIMEOUT_MS);
  });
  try {
    const response = await Promise.race([network, timeout]);
    // A failing origin: the last good copy beats an error page.
    return response.status >= 500 ? cached : response;
  } catch {
    return cached;
  } finally {
    clearTimeout(timer);
  }
};

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(event));
    return;
  }

  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (ASSET_DESTINATIONS.has(request.destination)) {
    event.respondWith(staleWhileRevalidate(event));
  }
});
