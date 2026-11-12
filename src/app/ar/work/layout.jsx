import { pageMetadata } from '../../../lib/metadata';
import { FACTS } from '../../../lib/facts';
import { workJsonLd } from '../../../lib/case-study-metadata';
import JsonLd from '../../../components/JsonLd';
import IndustryLinkGuard from '../../../components/IndustryLinkGuard';

export const metadata = pageMetadata({
  lang: 'ar',
  path: '/work',
  title: 'أعمالي',
  description:
    `الأرشيف الكامل: ${FACTS.archive} مشروعاً، منها ${FACTS.projects} لعملاء في مصر والخليج: منصات وأسواق وأنظمة LMS وأكثر، مع المهارات والشهادات.`,
  shareTitle: 'أعمالي | بلال ناجي',
  shareDescription:
    `الأرشيف الكامل: ${FACTS.archive} مشروعاً، منها ${FACTS.projects} لعملاء في مصر والخليج.`,
  card: true,
});

export default function WorkLayout({ children }) {
  return (
    <>
      <IndustryLinkGuard />
      <JsonLd data={workJsonLd('ar')} />
      {children}
    </>
  );
}
