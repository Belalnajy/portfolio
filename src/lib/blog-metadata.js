import { BLOG_POSTS } from './blog';
import { SITE_URL, PERSON_REF, WEBSITE_ID } from './site';
import { pageMetadata } from './metadata';

/**
 * Metadata + structured data for the article routes. Mirrors
 * case-study-metadata.js so both content types describe themselves to search
 * and AI crawlers the same way.
 */
export const blogPostMetadata = (slug, lang) => {
  const post = BLOG_POSTS[slug];
  const copy = lang === 'ar' ? post.ar : post.en;

  return pageMetadata({
    lang,
    path: `/blog/${slug}`,
    title: copy.title,
    description: copy.description,
    type: 'article',
    card: true,
    cardAlt: 'An article by Belal Nagy',
    openGraph: {
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [SITE_URL],
      tags: post.tags,
    },
  });
};

export const blogPostJsonLd = (slug, lang) => {
  const post = BLOG_POSTS[slug];
  const ar = lang === 'ar';
  const copy = ar ? post.ar : post.en;
  const prefix = ar ? '/ar' : '';
  const url = `${SITE_URL}${prefix}/blog/${slug}`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: copy.title,
      description: copy.description,
      // The share card rendered by blog/[slug]/opengraph-image.
      image: `${SITE_URL}/blog/${slug}/opengraph-image`,
      inLanguage: lang,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      url,
      keywords: post.tags.join(', '),
      timeRequired: `PT${post.minutes}M`,
      isPartOf: { '@id': WEBSITE_ID },
      author: PERSON_REF,
      publisher: PERSON_REF,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: ar ? 'بلال ناجي' : 'Belal Nagy', item: `${SITE_URL}${prefix}` },
        { '@type': 'ListItem', position: 2, name: ar ? 'المدونة' : 'Blog', item: `${SITE_URL}${prefix}/blog` },
        { '@type': 'ListItem', position: 3, name: copy.title, item: url },
      ],
    },
  ];
};
