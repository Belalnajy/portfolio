import { caseStudyOgImage, ogAlt, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/og';

export const alt = ogAlt('indstrz');
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return caseStudyOgImage('indstrz');
}
