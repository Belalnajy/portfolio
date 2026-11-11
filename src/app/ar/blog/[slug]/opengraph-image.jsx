import { blogPostOgImage, OG_SIZE, OG_CONTENT_TYPE } from '../../../../lib/og';
import { BLOG_SLUGS } from '../../../../lib/blog';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const alt = 'An article by Belal Nagy';

// Every slug is known at build time, so these render once during the build.
// Without this file articles shipped with no og:image at all: their metadata
// declares its own openGraph, which replaces the root's image.
export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  return blogPostOgImage(slug);
}
