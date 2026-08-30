import { OG_IMAGE, SITE_URL } from '../layout';

export const metadata = {
  title: 'بلال ناجي | مطور ويب متكامل (Full Stack)',
  description:
    'أبني منصات ويب من الصفر وأستلم الأكواد القائمة اللي محتاجة إصلاح. ٣١ مشروعاً لـ ٢٧ عميلاً في مصر والخليج. مطور Full-Stack من الإسكندرية: Next.js و Laravel و NestJS و Node.js و Django و PostgreSQL، مع دعم كامل للعربية و RTL في كل مشروع.',
  alternates: {
    canonical: '/ar',
    languages: {
      en: '/',
      ar: '/ar',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/ar`,
    locale: 'ar_SA',
    alternateLocale: 'en_US',
    title: 'بلال ناجي | مطور ويب متكامل (Full Stack)',
    description:
      'أبني منصات ويب من الصفر وأستلم الأكواد القائمة اللي محتاجة إصلاح. ٣١ مشروعاً لـ ٢٧ عميلاً في مصر والخليج.',
    siteName: 'Belal Nagy Portfolio',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'بلال ناجي | مطور ويب متكامل (Full Stack)',
    description:
      'أبني منصات ويب من الصفر وأستلم الأكواد القائمة اللي محتاجة إصلاح. ٣١ مشروعاً لـ ٢٧ عميلاً في مصر والخليج.',
    creator: '@belalnajy',
    images: [OG_IMAGE],
  },
};

export default function ArabicLayout({ children }) {
  return children;
}
