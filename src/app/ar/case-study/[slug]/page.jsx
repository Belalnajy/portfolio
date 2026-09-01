import CaseStudyPageClient from './page-client';
import { CASE_STUDIES, CASE_STUDY_SLUGS } from '../../../../lib/case-studies';
import {
  caseStudyMetadata,
  caseStudyJsonLd,
  loadNarrative,
} from '../../../../lib/case-study-metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return caseStudyMetadata(slug, 'ar');
}

export default async function ArabicPage({ params }) {
  const { slug } = await params;
  const narrative = await loadNarrative(slug);
  const jsonLd = caseStudyJsonLd(slug, narrative.ar, CASE_STUDIES[slug].image, 'ar');

  return (
    <div lang="ar" dir="rtl">
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <CaseStudyPageClient slug={slug} narrative={narrative} />
    </div>
  );
}
