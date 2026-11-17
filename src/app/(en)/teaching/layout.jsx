import { pageMetadata } from '../../../lib/metadata';
import { teachingJsonLd } from '../../../lib/teaching-jsonld';
import JsonLd from '../../../components/JsonLd';

export const metadata = pageMetadata({
  lang: 'en',
  path: '/teaching',
  title: 'Teaching at ITI',
  description:
    'Recorded lectures, slides and class code from the front-end courses Belal Nagy teaches at ITI: HTML, CSS and JavaScript, from the first tag to the DOM and events.',
  shareTitle: 'Teaching at ITI | Belal Nagy',
  card: true,
});

export default function Layout({ children }) {
  return (
    <>
      <JsonLd data={teachingJsonLd('en')} />
      {children}
    </>
  );
}
