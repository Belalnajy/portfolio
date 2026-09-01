import CaseStudyPageClient from './page-client';
import { CASE_STUDIES, CASE_STUDY_SLUGS } from '../../../lib/case-studies';
import {
  caseStudyMetadata,
  caseStudyJsonLd,
  loadNarrative,
} from '../../../lib/case-study-metadata';

// Every slug is known at build time; anything else 404s instead of rendering
// an empty shell.
export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return caseStudyMetadata(slug, 'en');
}

export default async function Page({ params }) {
  const { slug } = await params;
  // Only this project's story rides in the page payload; the shared labels
  // come from the locale chunk the client wrapper imports.
  const narrative = await loadNarrative(slug);
  const jsonLd = caseStudyJsonLd(slug, narrative.en, CASE_STUDIES[slug].image, 'en');

  return (
    <>
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <CaseStudyPageClient slug={slug} narrative={narrative} />
    </>
  );
}
