'use client';

import BlogArticle from '../../../../components/BlogArticle';
import ar from '../../../../locales/ar';

export default function ArabicBlogPostPageClient({ slug, article, nextSlug }) {
  return (
    <BlogArticle
      slug={slug}
      article={article}
      nextSlug={nextSlug}
      lang="ar"
      bundle={ar}
    />
  );
}
