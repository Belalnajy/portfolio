import RootDocument from '../../components/RootDocument';
import { FONT_VARIABLES } from '../../lib/fonts-ar';
import JsonLd from '../../components/JsonLd';
import { SITE_URL, PERSON_ID, SAME_AS } from '../../lib/site';
import { FACTS } from '../../lib/facts';
import { pageMetadata, SITE_METADATA, SITE_VIEWPORT } from '../../lib/metadata';
import '../globals.css';

const SHARE_DESCRIPTION =
  `أبني منصات ويب من الصفر وأستلم المشاريع القائمة التي تحتاج إلى إصلاح. ${FACTS.projects} مشروعاً لـ ${FACTS.clients} عميلاً في مصر والخليج.`;

// Root layout of the Arabic tree: its own <html lang="ar" dir="rtl">, so the
// server HTML is already right-to-left and nothing has to be corrected after
// hydration. It does not inherit from the English root, hence SITE_METADATA.
export const metadata = {
  ...SITE_METADATA,
  ...pageMetadata({
    lang: 'ar',
    path: '/',
    // The template puts the Arabic name on every /ar/* page title, so the
    // Arabic SERP shows «… | بلال ناجي», not the Latin brand.
    title: {
      default: 'بلال ناجي | مطور ويب متكامل من الإسكندرية، مصر',
      template: '%s | بلال ناجي',
    },
    description:
      `بلال ناجي مهندس برمجيات ومطور ويب متكامل من الإسكندرية، مصر. أبني منصات ويب من الصفر وأستلم المشاريع القائمة التي تحتاج إلى إصلاح. ${FACTS.projects} مشروعاً لـ ${FACTS.clients} عميلاً في مصر والخليج: Next.js، Laravel، NestJS، Node.js، Django، PostgreSQL، مع دعم كامل للعربية والـ RTL في كل مشروع.`,
    shareDescription: SHARE_DESCRIPTION,
  }),
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
  ],
};

export const viewport = SITE_VIEWPORT;

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
  image: `${SITE_URL}/portrait.webp`,
  jobTitle: 'مهندس برمجيات ومطور ويب متكامل (Full-Stack)',
  description:
    `بلال ناجي مطور ويب متكامل من الإسكندرية، مصر. يعمل حالياً مهندس برمجيات في شركة ezSec Inc الكندية عن بُعد، وشارك في تأسيس منصة Indstrz. نفّذ ${FACTS.projects} مشروعاً لـ ${FACTS.clients} عميلاً في مصر والخليج بتقنيات Next.js، Laravel، NestJS، Node.js، Django، PostgreSQL، مع دعم العربية والـ RTL في كل مشروع، وتقييمات إيجابية 100% على منصة العمل الحر خمسات.`,
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
    <RootDocument lang="ar" fontVariables={FONT_VARIABLES}>
      <JsonLd data={ARABIC_PERSON_JSON_LD} />
      {children}
    </RootDocument>
  );
}
