import { OG_IMAGE, SITE_URL } from '../../layout';

export const metadata = {
  title: 'الخدمات والباكدجات',
  description:
    'خدمات تطوير Full-Stack: بناء من الصفر، هندسة AI وباك إند، تعريب و RTL، واستلام الأكواد القائمة، بعملية واضحة وباكدجات شفافة.',
  alternates: {
    canonical: '/ar/services',
    languages: { en: '/services', ar: '/ar/services', 'x-default': '/services' },
  },
  openGraph: {
    type: 'website',
    url: '/ar/services',
    locale: 'ar_SA',
    title: 'الخدمات والباكدجات | بلال ناجي',
    description: 'خدمات تطوير Full-Stack بعملية واضحة وباكدجات شفافة.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الخدمات والباكدجات | بلال ناجي',
    description: 'خدمات تطوير Full-Stack بعملية واضحة وباكدجات شفافة.',
    images: [OG_IMAGE],
  },
};

// The Arabic twin of the ProfessionalService entity on /services, so Arabic
// queries like «مبرمج مواقع في الإسكندرية» resolve to a hireable service.
const PROFESSIONAL_SERVICE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'بلال ناجي | خدمات تطوير الويب المتكاملة',
  alternateName: 'Belal Nagy | Full-Stack Development Services',
  url: `${SITE_URL}/ar/services`,
  image: `${SITE_URL}/hero.webp`,
  description:
    'خدمات تطوير ويب متكاملة من بلال ناجي: بناء منصات من الصفر (SaaS ومنصات تعليمية ومتاجر إلكترونية)، هندسة باك إند وذكاء اصطناعي، تعريب وواجهات RTL، استلام وإصلاح المشاريع المتوقفة، وأمان و DevOps.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'الإسكندرية',
    addressCountry: 'EG',
  },
  areaServed: ['مصر', 'السعودية', 'الإمارات', 'الكويت', 'قطر', 'عن بُعد لأي مكان'],
  priceRange: '$$',
  founder: {
    '@type': 'Person',
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
      'أمان و DevOps',
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
