import { OG_IMAGE, SITE_URL } from '../layout';

export const metadata = {
  title: 'Services & Packages',
  description:
    'Full-stack development services: builds from zero, AI and backend engineering, Arabic/RTL localization, legacy-code takeover — with a clear process and transparent packages.',
  alternates: {
    canonical: '/services',
    languages: { en: '/services', ar: '/ar/services', 'x-default': '/services' },
  },
  openGraph: {
    type: 'website',
    url: '/services',
    title: 'Services & Packages — Belal Nagy',
    description:
      'Full-stack development services with a clear process and transparent packages.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services & Packages — Belal Nagy',
    description:
      'Full-stack development services with a clear process and transparent packages.',
    images: [OG_IMAGE],
  },
};

// ProfessionalService entity: tells search and answer engines this is a
// hireable service with a real location and a concrete catalog, not just a
// personal page. Mirrors the service cards rendered below.
const PROFESSIONAL_SERVICE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Belal Nagy — Full-Stack Development Services',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PROFESSIONAL_SERVICE_JSON_LD),
        }}
      />
      {children}
    </>
  );
}
