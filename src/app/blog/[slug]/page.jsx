import BlogPostPageClient from './page-client';
import { BLOG_SLUGS, loadPost } from '../../../lib/blog';
import { blogPostMetadata, blogPostJsonLd } from '../../../lib/blog-metadata';

// Every article slug is known at build time; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return blogPostMetadata(slug, 'en');
}

// The article after this one in registry order, wrapping, so every article
// ends by offering another.
const nextOf = (slug) =>
  BLOG_SLUGS[(BLOG_SLUGS.indexOf(slug) + 1) % BLOG_SLUGS.length];

export default async function Page({ params }) {
  const { slug } = await params;
  // Only this article's body rides in the page payload; the shared labels
  // come from the locale chunk the client wrapper imports.
  const article = await loadPost(slug);
  const jsonLd = blogPostJsonLd(slug, 'en');

  return (
    <>
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <BlogPostPageClient slug={slug} article={article} nextSlug={nextOf(slug)} />
    </>
  );
}
