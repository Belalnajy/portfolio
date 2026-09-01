import { caseStudyOgImage, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const alt = 'A case study by Belal Nagy';


export default async function Image({ params }) {
  const { slug } = await params;
  return caseStudyOgImage(slug);
}
