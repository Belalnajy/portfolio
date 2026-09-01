'use client';

import BlogArticle from '../../../components/BlogArticle';
import en from '../../../locales/en';

// The locale is imported statically so it stays one shared, cached chunk
// across every article page instead of being serialized into each one.
export default function BlogPostPageClient({ slug, article, nextSlug }) {
  return (
    <BlogArticle
      slug={slug}
      article={article}
      nextSlug={nextSlug}
      lang="en"
      bundle={en}
    />
  );
}
