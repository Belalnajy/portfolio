import { Inter, Cairo } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' });

export const metadata = {
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
  authors: [{ name: 'Belal Nagy', url: 'https://belalnajy.com' }],
  creator: 'Belal Nagy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
    title: 'Belal Nagy | Full Stack Developer Portfolio',
    description:
      'I build web platforms from zero, and take over existing codebases that need fixing. 31 projects for 27 clients across Egypt and the Gulf. Next.js, Laravel, NestJS, Node.js, Django, PostgreSQL.',
    siteName: 'Belal Nagy Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Belal Nagy | Full Stack Developer Portfolio',
    description:
      'I build web platforms from zero, and take over existing codebases that need fixing. Next.js, Laravel, NestJS, Node.js, Django, PostgreSQL.',
    creator: '@belalnajy',
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
    icon: '/favicon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#08080a',
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
