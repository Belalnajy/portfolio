import { pageOgImage, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Client Reviews — Belal Nagy';

export default function Image() {
  return pageOgImage('Client Reviews', 'Every client review in full, from the freelance platforms Belal Nagy works through.');
}
