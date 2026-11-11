import { OG_IMAGE, SITE_URL } from '../layout';
import { PERSON_ID, SAME_AS } from '../../lib/site';

export const metadata = {
  // The template puts the Arabic name on every /ar/* page title, so the Arabic
  // SERP shows «… | بلال ناجي», not the Latin brand inherited from the root.
  title: {
    // absolute keeps the root's '%s | Belal Nagy' template off this page.
    absolute: 'بلال ناجي | مطور ويب متكامل من الإسكندرية، مصر',
    default: 'بلال ناجي | مطور ويب متكامل من الإسكندرية، مصر',
    template: '%s | بلال ناجي',
  },
  description:
    'بلال ناجي مهندس برمجيات ومطور ويب متكامل من الإسكندرية، مصر. أبني منصات ويب من الصفر وأستلم الأكواد القائمة اللي محتاجة إصلاح. ٣٦ مشروعاً لـ ٢٧ عميلاً في مصر والخليج: Next.js و Laravel و NestJS و Node.js و Django و PostgreSQL، مع دعم كامل للعربية و RTL في كل مشروع.',
  keywords: [
    'بلال ناجي',
    'بلال ناجى',
    'Belal Nagy',
    'مطور ويب',
    'مبرمج مواقع',
    'مطور فول ستاك',
    'مهندس برمجيات',
    'مطور مواقع الإسكندرية',
    'مبرمج مصري',
    'برمجة منصات تعليمية',
    'مستقل',
    'خمسات',
    'نفذلي',
  ],
  alternates: {
    canonical: '/ar',
    languages: {
      en: '/',
      ar: '/ar',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/ar`,
    locale: 'ar_SA',
    alternateLocale: 'en_US',
    title: 'بلال ناجي | مطور ويب متكامل من الإسكندرية، مصر',
    description:
      'أبني منصات ويب من الصفر وأستلم الأكواد القائمة اللي محتاجة إصلاح. ٣٦ مشروعاً لـ ٢٧ عميلاً في مصر والخليج.',
    siteName: 'Belal Nagy Portfolio',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'بلال ناجي | مطور ويب متكامل من الإسكندرية، مصر',
    description:
      'أبني منصات ويب من الصفر وأستلم الأكواد القائمة اللي محتاجة إصلاح. ٣٦ مشروعاً لـ ٢٧ عميلاً في مصر والخليج.',
    creator: '@belalnajy',
    images: [OG_IMAGE],
  },
};

// The Arabic twin of the root Person entity: same profiles (so search engines
// merge the two into one identity), but named and described in Arabic. This is
// what lets an Arabic query like «بلال ناجي مطور» resolve to this site instead
// of namesakes. Covers both common spellings of the surname (ناجي / ناجى).
const ARABIC_PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  // Same @id as the English entity in the root layout: one person, two names.
  '@id': PERSON_ID,
  name: 'بلال ناجي',
  alternateName: ['بلال ناجى', 'Belal Nagy', 'Belal Najy'],
  url: `${SITE_URL}/ar`,
  image: `${SITE_URL}/hero.webp`,
  jobTitle: 'مهندس برمجيات ومطور ويب متكامل (Full-Stack)',
  description:
    'بلال ناجي مطور ويب متكامل من الإسكندرية، مصر. يعمل حالياً مهندس برمجيات في شركة ezSec Inc الكندية عن بُعد، وشارك في تأسيس منصة Indstrz. نفّذ ٣٦ مشروعاً لـ ٢٧ عميلاً في مصر والخليج بتقنيات Next.js و Laravel و NestJS و Node.js و Django و PostgreSQL، مع دعم العربية و RTL في كل مشروع، وتقييمات إيجابية ١٠٠٪ على منصات العمل الحر خمسات ونفذلي.',
  worksFor: {
    '@type': 'Organization',
    name: 'ezSec Inc',
    url: 'https://web.ezsec.org/',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'جامعة الإسكندرية',
    alternateName: 'Alexandria University',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'الإسكندرية',
    addressCountry: 'EG',
  },
  knowsLanguage: ['ar', 'en'],
  sameAs: SAME_AS,
};

export default function ArabicLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARABIC_PERSON_JSON_LD) }}
      />
      {children}
    </>
  );
}
