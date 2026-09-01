import { pageOgImage, OG_SIZE, OG_CONTENT_TYPE } from '../../lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Now — Belal Nagy';

export default function Image() {
  return pageOgImage('Now', 'What Belal is focused on right now. Updated regularly.');
}
