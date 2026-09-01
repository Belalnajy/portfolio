/*
 * Conservative service worker, written by hand — no generator, no magic.
 *
 * Strategy:
 *  - Hashed build assets (/_next/static/) and images/fonts: cache-first.
 *    Their URLs change when their content does, so a cache hit is always right.
 *  - Page navigations: network-first with a cached fallback, so the site
 *    stays readable on a flaky connection or offline after a first visit.
 *  - Everything else (analytics, APIs, cross-origin): untouched.
 *
 * Bump VERSION whenever the caching logic changes; old caches are dropped on
 * activate.
 */
const VERSION = 'v1';
const STATIC_CACHE = `static-${VERSION}`;
const PAGE_CACHE = `pages-${VERSION}`;

const STATIC_DESTINATIONS = new Set(['style', 'script', 'font', 'image']);

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== PAGE_CACHE)
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

const cacheFirst = async (request) => {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, response.clone());
  }
  return response;
};

const networkFirst = async (request) => {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(PAGE_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    // No cached copy of this page: the cached home page beats a browser error.
    const home = await caches.match('/');
    if (home) return home;
    throw error;
  }
};

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (
    url.pathname.startsWith('/_next/static/') ||
    STATIC_DESTINATIONS.has(request.destination)
  ) {
    event.respondWith(cacheFirst(request));
  }
});
