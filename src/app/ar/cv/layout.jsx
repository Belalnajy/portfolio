import { OG_IMAGE } from '../../layout';

export const metadata = {
  title: 'السيرة الذاتية',
  description:
    'السيرة الذاتية لبلال ناجي، مطور Full-Stack من الإسكندرية: الخبرات والمشاريع المختارة والمهارات والشهادات. تُقرأ في المتصفح أو تُحمَّل كملف PDF.',
  alternates: {
    canonical: '/ar/cv',
    languages: { en: '/cv', ar: '/ar/cv', 'x-default': '/cv' },
  },
  openGraph: {
    type: 'profile',
    url: '/ar/cv',
    locale: 'ar_SA',
    title: 'السيرة الذاتية — بلال ناجي',
    description: 'الخبرات والمشاريع المختارة والمهارات والشهادات في صفحة واحدة.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'السيرة الذاتية — بلال ناجي',
    description: 'الخبرات والمشاريع المختارة والمهارات والشهادات في صفحة واحدة.',
    images: [OG_IMAGE],
  },
};

export default function ArabicCvLayout({ children }) {
  return children;
}
