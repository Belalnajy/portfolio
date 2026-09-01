import { OG_IMAGE } from '../../layout';

export const metadata = {
  title: 'أعمالي',
  description:
    'الأرشيف الكامل: ٣٥ مشروعاً لعملاء في مصر والخليج — منصات وأسواق وأنظمة LMS وأكثر، مع المهارات والشهادات.',
  alternates: {
    canonical: '/ar/work',
    languages: { en: '/work', ar: '/ar/work', 'x-default': '/work' },
  },
  openGraph: {
    type: 'website',
    url: '/ar/work',
    locale: 'ar_SA',
    title: 'أعمالي — بلال ناجي',
    description: 'الأرشيف الكامل: ٣٥ مشروعاً لعملاء في مصر والخليج.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'أعمالي — بلال ناجي',
    description: 'الأرشيف الكامل: ٣٥ مشروعاً لعملاء في مصر والخليج.',
    images: [OG_IMAGE],
  },
};

export default function WorkLayout({ children }) {
  return children;
}
