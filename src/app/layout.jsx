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
    'Full Stack Developer experienced in building scalable, multilingual web applications using React.js, Next.js, Django, NestJS, and PostgreSQL. View my projects, skills, and experience.',
  keywords: [
    'Belal Nagy',
    'Full Stack Developer',
    'React',
    'Next.js',
    'Django',
    'NestJS',
    'Portfolio',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer',
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
      'Passionate about building scalable, high-performance web applications and transforming complex ideas into intuitive user experiences.',
    siteName: 'Belal Nagy Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Belal Nagy | Full Stack Developer Portfolio',
    description:
      'Full Stack Developer building scalable web apps with React, Next.js, Django, and NestJS.',
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
