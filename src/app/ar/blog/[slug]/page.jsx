import ArabicBlogPostPageClient from './page-client';
import { BLOG_SLUGS, loadPost } from '../../../../lib/blog';
import {
  blogPostMetadata,
  blogPostJsonLd,
} from '../../../../lib/blog-metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return blogPostMetadata(slug, 'ar');
}

const nextOf = (slug) =>
  BLOG_SLUGS[(BLOG_SLUGS.indexOf(slug) + 1) % BLOG_SLUGS.length];

export default async function Page({ params }) {
  const { slug } = await params;
  const article = await loadPost(slug);
  const jsonLd = blogPostJsonLd(slug, 'ar');

  return (
    <>
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <ArabicBlogPostPageClient
        slug={slug}
        article={article}
        nextSlug={nextOf(slug)}
      />
    </>
  );
}
