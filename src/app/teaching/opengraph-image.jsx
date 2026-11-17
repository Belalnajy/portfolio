import { pageOgImage, OG_SIZE, OG_CONTENT_TYPE } from '../../lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Teaching at ITI | Belal Nagy';

export default function Image() {
  return pageOgImage('Teaching at ITI', 'Recorded lectures, slides and class code from the front-end courses Belal Nagy teaches at ITI.');
}
