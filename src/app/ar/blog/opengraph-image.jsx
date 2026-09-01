import { pageOgImage, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/og';

export const alt = 'Blog — engineering write-ups by Belal Nagy';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return pageOgImage(
    'Blog',
    'Engineering write-ups from shipped projects: architecture, legacy takeovers and Arabic RTL.',
  );
}
