import { pageMetadata } from '../../../lib/metadata';
import { teachingJsonLd } from '../../../lib/teaching-jsonld';
import JsonLd from '../../../components/JsonLd';
import { notFound } from 'next/navigation';
import { TEACHING_PUBLIC } from '../../../lib/teaching';

export const metadata = pageMetadata({
  lang: 'ar',
  path: '/teaching',
  title: 'التدريس في ITI',
  description:
    'محاضرات مسجّلة وسلايدز وكود من كورسات الـ Front-End اللي بيدرّسها بلال ناجي في ITI: HTML و CSS و JavaScript، من أول tag لحد الـ DOM والـ Events.',
  shareTitle: 'التدريس في ITI | بلال ناجي',
  card: true,
});

export default function ArabicLayout({ children }) {
  if (!TEACHING_PUBLIC) notFound();
  return (
    <>
      <JsonLd data={teachingJsonLd('ar')} />
      {children}
    </>
  );
}
