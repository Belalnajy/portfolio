import ArabicBlogPostPageClient from './page-client';
import { BLOG_SLUGS, loadPost } from '../../../../lib/blog';
import {
  blogPostMetadata,
  blogPostJsonLd,
} from '../../../../lib/blog-metadata';
import JsonLd from '../../../../components/JsonLd';

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
        <JsonLd key={i} data={block} />
      ))}
      <ArabicBlogPostPageClient
        slug={slug}
        article={article}
        nextSlug={nextOf(slug)}
      />
    </>
  );
}
