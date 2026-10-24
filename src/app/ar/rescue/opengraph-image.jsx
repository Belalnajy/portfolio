import { pageOgImage, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/og';

export const alt = 'Legacy Code Rescue | Belal Nagy takes over stuck projects';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return pageOgImage(
    'Legacy Code Rescue',
    'Stuck project? Developer gone? Audit first, stabilize, ship. No costly rewrite.',
  );
}
