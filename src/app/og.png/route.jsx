import { siteOgImage } from '../../lib/og';

// Prerendered once per build: the default share image, at the same /og.png
// URL the metadata has always pointed at.
export const dynamic = 'force-static';

export function GET() {
  return siteOgImage();
}
