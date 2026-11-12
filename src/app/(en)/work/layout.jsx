import { pageMetadata } from '../../../lib/metadata';
import { FACTS } from '../../../lib/facts';
import { workJsonLd } from '../../../lib/case-study-metadata';
import JsonLd from '../../../components/JsonLd';

export const metadata = pageMetadata({
  lang: 'en',
  path: '/work',
  title: 'Work',
  description:
    `The complete archive: ${FACTS.archive} projects, ${FACTS.projects} of them for clients across Egypt and the Gulf: platforms, marketplaces, LMS systems and more, with skills and certifications.`,
  shareTitle: 'Work | Belal Nagy',
  shareDescription:
    `The complete archive: ${FACTS.archive} projects, ${FACTS.projects} of them for clients across Egypt and the Gulf.`,
  card: true,
});

export default function WorkLayout({ children }) {
  return (
    <>
      <JsonLd data={workJsonLd('en')} />
      {children}
    </>
  );
}
