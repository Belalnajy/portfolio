import { OG_IMAGE } from '../layout';

export const metadata = {
  title: 'Now',
  description:
    'What Belal Nagy is focused on right now: engineering at ezSec Inc, building Indstrz, and freelance work for Egypt and the Gulf. Updated regularly.',
  alternates: {
    canonical: '/now',
    languages: { en: '/now', ar: '/ar/now', 'x-default': '/now' },
  },
  openGraph: {
    type: 'website',
    url: '/now',
    title: 'Now — Belal Nagy',
    description: 'What Belal Nagy is focused on right now. Updated regularly.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Now — Belal Nagy',
    description: 'What Belal Nagy is focused on right now. Updated regularly.',
    images: [OG_IMAGE],
  },
};

export default function NowLayout({ children }) {
  return children;
}
