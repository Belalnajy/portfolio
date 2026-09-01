import { Inter, Cairo, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SITE_URL } from '../lib/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' });
// Display face for headlines and the hero wordmark; Cairo covers Arabic
// display duty since Space Grotesk has no Arabic glyphs.
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export { SITE_URL } from '../lib/site';

// Shared by the root metadata and by every child route that declares its own
// `openGraph`. Next overwrites nested metadata fields rather than merging them,
// so a child that sets openGraph without images silently drops og:image.
export const OG_IMAGE = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Belal Nagy, Full-Stack Developer. 31 projects for 27 clients.',
  type: 'image/png',
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      ar: '/ar',
      'x-default': '/',
    },
  },
  title: {
    default: 'Belal Nagy | Full Stack Developer Portfolio',
    template: '%s | Belal Nagy',
  },
  description:
    'I build web platforms from zero, and take over existing codebases that need fixing. 31 projects for 27 clients across Egypt and the Gulf. Full-stack developer in Alexandria: Next.js, Laravel, NestJS, Node.js, Django, PostgreSQL, with Arabic and RTL across every project.',
  keywords: [
    'Belal Nagy',
    'Full Stack Developer',
    'React',
    'Next.js',
    'Laravel',
    'Django',
    'NestJS',
    'Node.js',
    'PostgreSQL',
    'legacy code',
    'technical audit',
    'LMS',
    'multi-tenant',
    'RTL',
    'Arabic',
    'Portfolio',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer',
    'Alexandria',
    'Egypt',
    'Saudi Arabia',
  ],
  authors: [{ name: 'Belal Nagy', url: SITE_URL }],
  creator: 'Belal Nagy',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    locale: 'en_US',
    alternateLocale: 'ar_SA',
    title: 'Belal Nagy | Full Stack Developer Portfolio',
    description:
      'I build web platforms from zero, and take over existing codebases that need fixing. 31 projects for 27 clients across Egypt and the Gulf. Next.js, Laravel, NestJS, Node.js, Django, PostgreSQL.',
    siteName: 'Belal Nagy Portfolio',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Belal Nagy | Full Stack Developer Portfolio',
    description:
      'I build web platforms from zero, and take over existing codebases that need fixing. Next.js, Laravel, NestJS, Node.js, Django, PostgreSQL.',
    creator: '@belalnajy',
    images: [OG_IMAGE],
  },
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
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F6F8' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0F14' },
  ],
};

// Structured data so search engines can attach name, photo, role and profiles
// to the site. Person and WebSite are stable facts, safe to serve on every route.
const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Belal Nagy',
  alternateName: 'بلال ناجي',
  url: SITE_URL,
  image: `${SITE_URL}/hero.webp`,
  jobTitle: 'Software Engineer & Full-Stack Developer',
  description:
    'Full-stack developer in Alexandria, Egypt. Software Engineer at ezSec Inc (Canada, remote) and co-founder of Indstrz. 31 projects for 27 clients across Egypt and the Gulf: Next.js, Laravel, NestJS, Node.js, Django, PostgreSQL, with Arabic and RTL support in every project.',
  worksFor: {
    '@type': 'Organization',
    name: 'ezSec Inc',
    url: 'https://web.ezsec.org/',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Alexandria University',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Alexandria',
    addressCountry: 'EG',
  },
  knowsLanguage: ['en', 'ar'],
  knowsAbout: [
    'Next.js',
    'React',
    'Laravel',
    'NestJS',
    'Node.js',
    'Django',
    'Flask',
    'PostgreSQL',
    'TypeScript',
    'Python',
    'Multi-tenant architecture',
    'Learning management systems',
    'Arabic RTL web development',
    'Legacy code takeover',
    'DevOps deployment',
  ],
  sameAs: [
    'https://github.com/Belalnajy',
    'https://linkedin.com/in/belalnajy',
    'https://khamsat.com/user/belalnajy',
    'https://mostaql.com/u/belalnagy',
    'https://www.nafezly.com/u/belalnajy',
  ],
};

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Belal Nagy Portfolio',
  url: SITE_URL,
  inLanguage: ['en', 'ar'],
  author: { '@type': 'Person', name: 'Belal Nagy' },
};

// Runs before first paint so a visitor who chose light mode never sees a dark
// flash. Dark is the default (no attribute); only light needs stamping.
const THEME_INIT = `try{if(localStorage.getItem('mode')==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cairo.variable} ${spaceGrotesk.variable} antialiased`}
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
