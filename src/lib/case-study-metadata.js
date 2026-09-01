import { SITE_URL } from './site';

/**
 * Route metadata for /case-study/<slug> (en) and /ar/case-study/<slug> (ar),
 * read from the same content module as the page so the page and its share
 * card always say the same thing. Server-only: imported by the [slug] routes.
 *
 * The share image comes from the opengraph-image file in each route folder,
 * so no `images` are declared here.
 */
export const loadNarrative = (slug) =>
  import(`../content/case-studies/${slug}.js`).then((mod) => mod.default);

export const caseStudyMetadata = async (slug, lang = 'en') => {
  const copy = (await loadNarrative(slug))[lang];
  const enPath = `/case-study/${slug}`;
  const arPath = `/ar/case-study/${slug}`;
  const path = lang === 'ar' ? arPath : enPath;

  return {
    title: copy.title,
    description: copy.summary,
    alternates: {
      canonical: path,
      languages: { en: enPath, ar: arPath, 'x-default': enPath },
    },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}${path}`,
      locale: lang === 'ar' ? 'ar_SA' : 'en_US',
      alternateLocale: lang === 'ar' ? 'en_US' : 'ar_SA',
      title: copy.title,
      description: copy.summary,
      siteName: 'Belal Nagy Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.summary,
      creator: '@belalnajy',
    },
  };
};

/**
 * Article + BreadcrumbList structured data for a case-study page, so answer
 * engines can cite it with its author, image and place in the site.
 */
export const caseStudyJsonLd = (slug, copy, image, lang = 'en') => {
  const path = lang === 'ar' ? `/ar/case-study/${slug}` : `/case-study/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: copy.title,
      description: copy.summary,
      image: `${SITE_URL}${image}`,
      url: `${SITE_URL}${path}`,
      inLanguage: lang,
      author: {
        '@type': 'Person',
        name: 'Belal Nagy',
        url: SITE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Belal Nagy', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: lang === 'ar' ? 'المشاريع' : 'Projects',
          item: `${SITE_URL}${lang === 'ar' ? '/ar' : ''}/#projects`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: copy.title,
          item: `${SITE_URL}${path}`,
        },
      ],
    },
  ];
};
