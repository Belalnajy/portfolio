import { OG_IMAGE } from '../layout';

export const metadata = {
  title: 'Services & Packages',
  description:
    'Full-stack development services: builds from zero, AI and backend engineering, Arabic/RTL localization, legacy-code takeover — with a clear process and transparent packages.',
  alternates: {
    canonical: '/services',
    languages: { en: '/services', ar: '/ar/services', 'x-default': '/services' },
  },
  openGraph: {
    type: 'website',
    url: '/services',
    title: 'Services & Packages — Belal Nagy',
    description:
      'Full-stack development services with a clear process and transparent packages.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services & Packages — Belal Nagy',
    description:
      'Full-stack development services with a clear process and transparent packages.',
    images: [OG_IMAGE],
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
