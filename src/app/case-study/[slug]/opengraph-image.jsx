import { caseStudyOgImage, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/og';
import { CASE_STUDY_SLUGS } from '../../../lib/case-studies';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const alt = 'A case study by Belal Nagy';

// Every slug is known at build time, so these render once during the build
// instead of on demand each time somebody shares a link.
export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}


export default async function Image({ params }) {
  const { slug } = await params;
  return caseStudyOgImage(slug);
}
