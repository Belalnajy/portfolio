import { pageMetadata } from '../../../lib/metadata';
import { teachingJsonLd } from '../../../lib/teaching-jsonld';
import JsonLd from '../../../components/JsonLd';

export const metadata = pageMetadata({
  lang: 'ar',
  path: '/teaching',
  title: 'التدريس في ITI',
  description:
    'محاضرات مسجّلة وشرائح وأكواد من مقررات تطوير الواجهات التي يدرّسها بلال ناجي في ITI: HTML و CSS و JavaScript، من أول وسم حتى DOM والأحداث.',
  shareTitle: 'التدريس في ITI | بلال ناجي',
  card: true,
});

export default function ArabicLayout({ children }) {
  return (
    <>
      <JsonLd data={teachingJsonLd('ar')} />
      {children}
    </>
  );
}
