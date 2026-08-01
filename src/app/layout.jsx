import { Inter, Cairo } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' });

export const SITE_URL = 'https://belalnagy.com';

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cairo.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
