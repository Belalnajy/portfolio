import { pageOgImage, OG_SIZE, OG_CONTENT_TYPE } from '../../lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Work — Belal Nagy';

export default function Image() {
  return pageOgImage('Work', '35 projects for 27 clients across Egypt and the Gulf — the complete archive.');
}
