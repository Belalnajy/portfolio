import { OG_IMAGE } from '../../layout';
import { FACTS } from '../../../lib/facts';
import { workJsonLd } from '../../../lib/case-study-metadata';

const toArabicDigits = (n) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);

export const metadata = {
  title: 'أعمالي',
  description:
    `الأرشيف الكامل: ${toArabicDigits(FACTS.projects)} مشروعاً لعملاء في مصر والخليج: منصات وأسواق وأنظمة LMS وأكثر، مع المهارات والشهادات.`,
  alternates: {
    canonical: '/ar/work',
    languages: { en: '/work', ar: '/ar/work', 'x-default': '/work' },
  },
  openGraph: {
    type: 'website',
    url: '/ar/work',
    locale: 'ar_SA',
    title: 'أعمالي | بلال ناجي',
    description: `الأرشيف الكامل: ${toArabicDigits(FACTS.projects)} مشروعاً لعملاء في مصر والخليج.`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'أعمالي | بلال ناجي',
    description: `الأرشيف الكامل: ${toArabicDigits(FACTS.projects)} مشروعاً لعملاء في مصر والخليج.`,
    images: [OG_IMAGE],
  },
};

export default function WorkLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workJsonLd('ar')) }}
      />
      {children}
    </>
  );
}
