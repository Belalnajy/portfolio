const isProduction = process.env.NODE_ENV === 'production';

// The contact form posts to EmailJS from the browser; these three are public
// by design but must exist at build time (NEXT_PUBLIC_* is inlined then).
// A build without them still succeeds — CI has none — but says so here, and
// the form shows a clear "not configured" message instead of failing blind.
const missingEmailJs = [
  'NEXT_PUBLIC_EMAILJS_SERVICE_ID',
  'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID',
  'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY',
].filter((name) => !process.env[name]);
if (isProduction && missingEmailJs.length) {
  console.warn(
    `\n[contact form] ${missingEmailJs.join(', ')} not set: the contact form in this build cannot send and will tell visitors to use email or WhatsApp.\n`,
  );
}

/**
 * Content-Security-Policy.
 *
 * Not a strict (nonce-based) policy, on purpose: every page is prerendered to
 * static HTML, and Next's inline bootstrap scripts can only be nonced when a
 * page is rendered per request, which would give up static hosting. So
 * inline scripts and inline styles (Framer Motion writes style attributes)
 * stay allowed, and the policy does the rest of the job: no third-party
 * script, frame, plugin or form target, no <base> hijack, no framing of this
 * site, and network calls only to this origin and EmailJS.
 *
 * - script-src: own chunks, the inline theme/bootstrap scripts, and Vercel
 *   Analytics (same-origin /_vercel/insights on Vercel).
 * - connect-src: EmailJS is the contact form's only cross-origin call.
 * - img-src: own files plus the inline blur placeholders (data:).
 *
 * Production only: `next dev` needs eval and a websocket for fast refresh.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.emailjs.com",
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

// Sent with everything, assets included: both are a few bytes.
const GLOBAL_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Same value Vercel sends by default; stated here so it does not depend on the host.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
];

// Only meaningful on an HTML document, and close to a kilobyte together, so
// they are kept off every chunk, image and font.
const DOCUMENT_HEADERS = [
  // Older browsers that do not read frame-ancestors.
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Nothing on the site uses these; deny them to any script that tries.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  ...(isProduction ? [{ key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY }] : []),
];

// Unhashed files in public/ (client logos, case-study galleries, certificate
// scans, project covers). Their names do not change when their content does,
// so not `immutable`: a day fresh, then served from cache for up to a week
// while the browser or CDN revalidates in the background. Without this they
// were revalidated on every visit.
const PUBLIC_ASSET_CACHE = [
  { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // One prerendered 404 for the whole app; see src/app/global-not-found.jsx.
    globalNotFound: true,
  },
  // The case-study share cards read their cover from public/ with sharp at
  // build time, and the path is only known per slug, so the file tracer
  // copies all of public/ (8 MB, mostly gallery screens) into both functions.
  // They need the covers and nothing else: everything else is left out.
  outputFileTracingExcludes: Object.fromEntries(
    // Keys are picomatch globs, where "[slug]" would be a character class:
    // "*" stands in for the slug segment.
    ['/case-study/*/opengraph-image', '/ar/case-study/*/opengraph-image'].map((route) => [
      route,
      [
        'public/gallery/**',
        'public/logos/**',
        'public/certificates/**',
        'public/portrait.webp',
        'public/*.{pdf,txt,png,ico,svg,js,webmanifest}',
      ],
    ]),
  ),
  images: {
    // AVIF first for browsers that take it (smaller than WebP at the same
    // look), WebP for the rest.
    formats: ['image/avif', 'image/webp'],
    // One day, matching the Cache-Control on the source files below. Covers
    // and gallery screens are regenerated under the same names
    // (scripts/capture-covers.mjs), so a longer cache would keep serving the
    // old picture; see "Replacing an image" in the README.
    minimumCacheTTL: 86400,
  },
  async headers() {
    return [
      { source: '/:path*', headers: GLOBAL_HEADERS },
      { source: '/:dir(logos|gallery|certificates|covers)/:file*', headers: PUBLIC_ASSET_CACHE },
      { source: '/:file([^/]+\\.webp)', headers: PUBLIC_ASSET_CACHE },
      // Pages: anything that is not under /_next/ and is not a static file.
      // Unknown URLs are pages too (the 404 document), whatever they end in,
      // so the list names asset extensions instead of excluding every dot.
      {
        source:
          '/((?!_next/|.*\\.(?:js|css|map|json|txt|xml|pdf|ico|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|webmanifest)$).*)',
        headers: DOCUMENT_HEADERS,
      },
    ];
  },
};

export default nextConfig;
