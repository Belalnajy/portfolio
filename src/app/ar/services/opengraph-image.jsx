import { pageOgImage, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Services — Belal Nagy';

export default function Image() {
  return pageOgImage('Services', 'Full-stack builds, Arabic-first platforms, legacy takeover — with transparent packages.');
}
