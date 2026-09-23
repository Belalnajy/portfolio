import { FAQ_ITEMS } from '../content/faq';
import { SITE_URL } from '../lib/site';

/**
 * Page-level structured data for the home routes: a ProfilePage wrapper
 * pointing at the site-wide Person, and a FAQPage built from the curated
 * question/answer pairs in src/content/faq.js — the format answer engines
 * quote from directly. Rendered per language so /ar carries Arabic Q&A.
 */
const HomeJsonLd = ({ lang = 'en' }) => {
  const url = lang === 'ar' ? `${SITE_URL}/ar` : SITE_URL;

  const profilePage = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    inLanguage: lang,
    // The Arabic page names the entity in Arabic; alternateName ties both
    // pages to the same person for engines answering «من هو بلال ناجي».
    mainEntity: {
      '@type': 'Person',
      name: lang === 'ar' ? 'بلال ناجي' : 'Belal Nagy',
      alternateName: lang === 'ar' ? 'Belal Nagy' : 'بلال ناجي',
      url: SITE_URL,
    },
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: FAQ_ITEMS[lang].map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
};

export default HomeJsonLd;
