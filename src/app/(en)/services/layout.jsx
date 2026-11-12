import { pageMetadata } from '../../../lib/metadata';
import { SITE_URL, PERSON_ID } from '../../../lib/site';
import JsonLd from '../../../components/JsonLd';

export const metadata = pageMetadata({
  lang: 'en',
  path: '/services',
  title: 'Services & Packages',
  description:
    'Full-stack development services: builds from zero, AI and backend engineering, Arabic/RTL localization, legacy-code takeover, with a clear process and defined packages.',
  shareTitle: 'Services & Packages | Belal Nagy',
  shareDescription:
    'Full-stack development services with a clear process and defined packages.',
  card: true,
});

// ProfessionalService entity: tells search and answer engines this is a
// hireable service with a real location and a concrete catalog, not just a
// personal page. Mirrors the service cards rendered below.
const PROFESSIONAL_SERVICE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  // Shared by /services and /ar/services: one business, two languages.
  '@id': `${SITE_URL}/#service`,
  name: 'Belal Nagy | Full-Stack Development Services',
  url: `${SITE_URL}/services`,
  image: `${SITE_URL}/hero.webp`,
  description:
    'Full-stack web development services by Belal Nagy: platforms built from zero, backend and AI engineering, Arabic/RTL localization, legacy-code takeover and technical audits, security and DevOps.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Alexandria',
    addressCountry: 'EG',
  },
  areaServed: ['Egypt', 'Saudi Arabia', 'United Arab Emirates', 'Kuwait', 'Qatar', 'Worldwide (remote)'],
  priceRange: '$$',
  founder: {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Belal Nagy',
    alternateName: 'بلال ناجي',
    url: SITE_URL,
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Development services',
    itemListElement: [
      'Full-stack custom development (SaaS, LMS, e-commerce)',
      'AI & backend engineering',
      'Arabic/RTL localization and multilingual interfaces',
      'Security & DevOps',
      'Legacy code takeover & technical audit',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  },
};

export default function ServicesLayout({ children }) {
  return (
    <>
      <JsonLd data={PROFESSIONAL_SERVICE_JSON_LD} />
      {children}
    </>
  );
}
