import { pageOgImage, OG_SIZE, OG_CONTENT_TYPE } from '../../lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Uses — Belal Nagy';

export default function Image() {
  return pageOgImage('Uses', 'The editor, stack, infrastructure and working tools Belal Nagy actually uses every day.');
}
