import { OG_SIZE, OG_CONTENT_TYPE } from '../../../../lib/og';
import { caseStudyOgImage } from '../../../../lib/og-case-study';
import { CASE_STUDY_SLUGS } from '../../../../lib/case-studies';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const alt = 'دراسة حالة من أعمال بلال ناجي';

// Every slug is known at build time, so these render once during the build
// instead of on demand each time somebody shares a link. Any other slug is a
// plain 404, not an attempt to render a card for a project that is not there.
export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  return caseStudyOgImage(slug, 'ar');
}
