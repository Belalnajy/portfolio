import { BLOG_POSTS } from './blog';
import { SITE_URL } from './site';

/**
 * Metadata + structured data for the article routes. Mirrors
 * case-study-metadata.js so both content types describe themselves to search
 * and AI crawlers the same way.
 */
export const blogPostMetadata = (slug, lang) => {
  const post = BLOG_POSTS[slug];
  const copy = lang === 'ar' ? post.ar : post.en;
  const path = `/blog/${slug}`;

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: lang === 'ar' ? `/ar${path}` : path,
      languages: {
        en: path,
        ar: `/ar${path}`,
        'x-default': path,
      },
    },
    openGraph: {
      type: 'article',
      url: lang === 'ar' ? `/ar${path}` : path,
      title: copy.title,
      description: copy.description,
      publishedTime: post.date,
      authors: [`${SITE_URL}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
    },
  };
};

export const blogPostJsonLd = (slug, lang) => {
  const post = BLOG_POSTS[slug];
  const copy = lang === 'ar' ? post.ar : post.en;
  const url = `${SITE_URL}${lang === 'ar' ? '/ar' : ''}/blog/${slug}`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: copy.title,
      description: copy.description,
      inLanguage: lang,
      datePublished: post.date,
      dateModified: post.date,
      url,
      keywords: post.tags.join(', '),
      author: {
        '@type': 'Person',
        name: 'Belal Nagy',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Person',
        name: 'Belal Nagy',
        url: SITE_URL,
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Blog',
          item: `${SITE_URL}${lang === 'ar' ? '/ar' : ''}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: copy.title,
          item: url,
        },
      ],
    },
  ];
};
