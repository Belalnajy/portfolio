import en from '../locales/en';
import ar from '../locales/ar';
import { SITE_URL } from '../app/layout';

const BUNDLES = { en, ar };

/**
 * Route metadata for /case-study/<slug> (en) and /ar/case-study/<slug> (ar),
 * read straight from the translation bundle so the page and its share card
 * always say the same thing. Server-only: imported by layouts.
 *
 * The share image comes from the opengraph-image file in each route folder,
 * so no `images` are declared here.
 */
export const caseStudyMetadata = (slug, lang = 'en') => {
  const copy = BUNDLES[lang].translation.case_studies[slug];
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
