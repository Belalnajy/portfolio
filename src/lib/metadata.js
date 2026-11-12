// Explicit extensions so the unit tests can import this through plain Node ESM.
import { FACTS } from './facts.js';
import { SITE_URL } from './site.js';

/**
 * Page metadata, built in one place.
 *
 * Next replaces nested metadata objects instead of merging them: a route that
 * declares its own `alternates`, `openGraph` or `twitter` loses everything the
 * root put there. Hand-written per-route blocks had already dropped the RSS
 * autodiscovery link from every page but the home page, twitter:creator from
 * 22 pages and og:locale from 9. Every route now goes through pageMetadata(),
 * which re-states those fields each time.
 */

// The default share image, used wherever a route has no opengraph-image file.
export const OG_IMAGE = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: `Belal Nagy, Full-Stack Developer. ${FACTS.projects} projects for ${FACTS.clients} clients.`,
  type: 'image/png',
};

const SITE_NAME = 'Belal Nagy Portfolio';
const TWITTER_HANDLE = '@belalnajy';
const RSS = { 'application/rss+xml': [{ url: '/feed.xml', title: 'Belal Nagy | Writing' }] };

/** The Arabic twin of an English path: `/` -> `/ar`, `/work` -> `/ar/work`. */
export const arabicPath = (path) => (path === '/' ? '/ar' : `/ar${path}`);

// The generated share card of a route: the opengraph-image file beside it.
// The English cards live outside the `(en)` route group (src/app/work/…, not
// src/app/(en)/work/…) because Next appends a hash to metadata image URLs
// inside a group; out here they keep the plain /work/opengraph-image address
// that structured data and already-shared links point at. That also means
// Next no longer attaches them to the page by itself, so they are named here.
const routeCard = (self, alt) => ({
  url: `${self === '/' ? '' : self}/opengraph-image`,
  width: 1200,
  height: 630,
  alt,
  type: 'image/png',
});

/**
 * `path` is always the English path; the Arabic URL is derived from it.
 * `shareTitle` / `shareDescription` are the Open Graph and Twitter wording
 * (they fall back to the page's own). `card: true` is for routes that have
 * an opengraph-image file: it shares that card instead of the site-wide
 * /og.png (`cardAlt` describes it). `openGraph` adds or
 * overrides Open Graph fields (article dates, tags, …); `twitter` does the
 * same for the Twitter card.
 */
export const pageMetadata = ({
  lang = 'en',
  path,
  title,
  description,
  shareTitle = typeof title === 'string' ? title : title?.absolute ?? title?.default,
  shareDescription = description,
  type = 'website',
  card = false,
  cardAlt = shareTitle,
  openGraph,
  twitter,
  ...rest
}) => {
  const ar = lang === 'ar';
  const arPath = arabicPath(path);
  const self = ar ? arPath : path;
  const images = [card ? routeCard(self, cardAlt) : OG_IMAGE];

  return {
    title,
    description,
    alternates: {
      canonical: self,
      languages: { en: path, ar: arPath, 'x-default': path },
      types: RSS,
    },
    openGraph: {
      type,
      url: self,
      locale: ar ? 'ar_SA' : 'en_US',
      alternateLocale: ar ? 'en_US' : 'ar_SA',
      siteName: SITE_NAME,
      title: shareTitle,
      description: shareDescription,
      images,
      ...openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: TWITTER_HANDLE,
      title: shareTitle,
      description: shareDescription,
      images,
      ...twitter,
    },
    ...rest,
  };
};

// Search Console / Bing Webmaster ownership tokens, read from Vercel env vars
// so they never need a code change. Unset vars render nothing.
const SITE_VERIFICATION = {
  ...(process.env.GOOGLE_SITE_VERIFICATION && { google: process.env.GOOGLE_SITE_VERIFICATION }),
  ...(process.env.YANDEX_SITE_VERIFICATION && { yandex: process.env.YANDEX_SITE_VERIFICATION }),
  ...(process.env.BING_SITE_VERIFICATION && {
    other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION },
  }),
};

/**
 * Site-wide fields that do not depend on the page. The English and Arabic
 * trees each have their own root layout (so each can own its <html lang dir>),
 * and both spread this in: neither inherits from the other.
 */
export const SITE_METADATA = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: 'Belal Nagy', url: SITE_URL }],
  creator: 'Belal Nagy',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  verification: SITE_VERIFICATION,
};

export const SITE_VIEWPORT = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F6F8' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0F14' },
  ],
};
