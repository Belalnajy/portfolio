import { pageMetadata } from '../../../lib/metadata';
import { SITE_URL, PERSON_ID } from '../../../lib/site';
import JsonLd from '../../../components/JsonLd';

export const metadata = pageMetadata({
  lang: 'ar',
  path: '/services',
  title: 'الخدمات والباقات',
  description:
    'خدمات تطوير Full-Stack: بناء من الصفر، هندسة AI وباك إند، تعريب ودعم RTL، واستلام المشاريع القائمة، بعملية واضحة وباقات محددة.',
  shareTitle: 'الخدمات والباقات | بلال ناجي',
  shareDescription:
    'خدمات تطوير Full-Stack بعملية واضحة وباقات محددة.',
  card: true,
});

// The Arabic twin of the ProfessionalService entity on /services, so Arabic
// queries like «مبرمج مواقع في الإسكندرية» resolve to a hireable service.
const PROFESSIONAL_SERVICE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  // Shared by /services and /ar/services: one business, two languages.
  '@id': `${SITE_URL}/#service`,
  name: 'بلال ناجي | خدمات تطوير الويب المتكاملة',
  alternateName: 'Belal Nagy | Full-Stack Development Services',
  url: `${SITE_URL}/ar/services`,
  image: `${SITE_URL}/hero.webp`,
  description:
    'خدمات تطوير ويب متكاملة من بلال ناجي: بناء منصات من الصفر (SaaS ومنصات تعليمية ومتاجر إلكترونية)، هندسة باك إند وذكاء اصطناعي، تعريب وواجهات RTL، استلام وإصلاح المشاريع المتوقفة، والأمان والـ DevOps.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'الإسكندرية',
    addressCountry: 'EG',
  },
  areaServed: ['مصر', 'السعودية', 'الإمارات', 'الكويت', 'قطر', 'عن بُعد لأي مكان'],
  priceRange: '$$',
  founder: {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'بلال ناجي',
    alternateName: 'Belal Nagy',
    url: SITE_URL,
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'خدمات التطوير',
    itemListElement: [
      'تطوير متكامل مخصص (SaaS، منصات تعليمية، متاجر إلكترونية)',
      'هندسة باك إند وذكاء اصطناعي',
      'تعريب وواجهات RTL ومواقع متعددة اللغات',
      'الأمان والـ DevOps',
      'استلام المشاريع المتوقفة والفحص الفني',
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
