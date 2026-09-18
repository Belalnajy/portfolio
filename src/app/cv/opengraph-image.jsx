import { pageOgImage, OG_SIZE, OG_CONTENT_TYPE } from '../../lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'CV — Belal Nagy';

export default function Image() {
  return pageOgImage('CV', 'Experience, selected projects, skills and certifications.');
}
