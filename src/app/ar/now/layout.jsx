import { OG_IMAGE } from '../../layout';

export const metadata = {
  title: 'الآن',
  description:
    'اللي بلال ناجي مركّز فيه دلوقتي: الهندسة في ezSec Inc، وبناء Indstrz، وشغل الفريلانس لمصر والخليج. بيتحدث باستمرار.',
  alternates: {
    canonical: '/ar/now',
    languages: { en: '/now', ar: '/ar/now', 'x-default': '/now' },
  },
  openGraph: {
    type: 'website',
    url: '/ar/now',
    locale: 'ar_SA',
    title: 'الآن — بلال ناجي',
    description: 'اللي بلال ناجي مركّز فيه دلوقتي. بيتحدث باستمرار.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الآن — بلال ناجي',
    description: 'اللي بلال ناجي مركّز فيه دلوقتي. بيتحدث باستمرار.',
    images: [OG_IMAGE],
  },
};

export default function NowLayout({ children }) {
  return children;
}
