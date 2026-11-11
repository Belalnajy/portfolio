import { OG_IMAGE } from '../layout';
import { FACTS } from '../../lib/facts';
import { workJsonLd } from '../../lib/case-study-metadata';

export const metadata = {
  title: 'Work',
  description:
    `The complete archive: ${FACTS.projects} projects for clients across Egypt and the Gulf: platforms, marketplaces, LMS systems and more, with skills and certifications.`,
  alternates: {
    canonical: '/work',
    languages: { en: '/work', ar: '/ar/work', 'x-default': '/work' },
  },
  openGraph: {
    type: 'website',
    url: '/work',
    title: 'Work | Belal Nagy',
    description:
      `The complete archive: ${FACTS.projects} projects for clients across Egypt and the Gulf.`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work | Belal Nagy',
    description:
      `The complete archive: ${FACTS.projects} projects for clients across Egypt and the Gulf.`,
    images: [OG_IMAGE],
  },
};

export default function WorkLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workJsonLd('en')) }}
      />
      {children}
    </>
  );
}
