'use client';

import BlogArticle from '../../../../components/BlogArticle';
import ar from '../../../../locales/ar';

export default function ArabicBlogPostPageClient({ slug, article, nextSlug }) {
  return (
    <div lang="ar" dir="rtl">
      <BlogArticle
        slug={slug}
        article={article}
        nextSlug={nextSlug}
        lang="ar"
        bundle={ar}
      />
    </div>
  );
}
