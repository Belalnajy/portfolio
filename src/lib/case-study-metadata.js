import { SITE_URL, PERSON_REF, WEBSITE_ID } from './site';
import { CASE_STUDIES, CASE_STUDY_SLUGS } from './case-studies';

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
  const ar = lang === 'ar';
  const path = ar ? `/ar/case-study/${slug}` : `/case-study/${slug}`;
  const url = `${SITE_URL}${path}`;
  const project = CASE_STUDIES[slug];
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: copy.title,
      description: copy.summary,
      image: `${SITE_URL}${image}`,
      url,
      mainEntityOfPage: url,
      inLanguage: lang,
      dateModified: project.updated,
      keywords: project.stack.join(', '),
      isPartOf: { '@id': WEBSITE_ID },
      author: PERSON_REF,
      publisher: PERSON_REF,
      // The product the case study is about, so "who built X" questions
      // resolve to this page and its author.
      about: {
        '@type': 'CreativeWork',
        name: project.name,
        ...(project.liveUrl && { url: project.liveUrl }),
        creator: PERSON_REF,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: ar ? 'بلال ناجي' : 'Belal Nagy', item: `${SITE_URL}${ar ? '/ar' : ''}` },
        { '@type': 'ListItem', position: 2, name: ar ? 'أعمالي' : 'Work', item: `${SITE_URL}${ar ? '/ar' : ''}/work` },
        { '@type': 'ListItem', position: 3, name: copy.title, item: url },
      ],
    },
  ];
};

/**
 * CollectionPage + ItemList for /work and /ar/work: the archive as a list of
 * case-study URLs, so crawlers and answer engines see every project page from
 * one place instead of discovering them link by link.
 */
export const workJsonLd = (lang = 'en') => {
  const prefix = lang === 'ar' ? '/ar' : '';
  const url = `${SITE_URL}${prefix}/work`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    url,
    name: lang === 'ar' ? 'أعمال بلال ناجي' : 'Work by Belal Nagy',
    inLanguage: lang,
    isPartOf: { '@id': WEBSITE_ID },
    author: PERSON_REF,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: CASE_STUDY_SLUGS.length,
      itemListElement: CASE_STUDY_SLUGS.map((slug, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: CASE_STUDIES[slug].name,
        url: `${SITE_URL}${prefix}/case-study/${slug}`,
      })),
    },
  };
};
