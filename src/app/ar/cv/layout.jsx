import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
  lang: 'ar',
  path: '/cv',
  title: 'السيرة الذاتية',
  description:
    'السيرة الذاتية لبلال ناجي، مطور Full-Stack من الإسكندرية: الخبرات والمشاريع المختارة والمهارات والشهادات. تُقرأ في المتصفح أو تُحمَّل كملف PDF.',
  shareTitle: 'السيرة الذاتية | بلال ناجي',
  shareDescription:
    'الخبرات والمشاريع المختارة والمهارات والشهادات في صفحة واحدة.',
  type: 'profile',
  card: true,
});

export default function ArabicCvLayout({ children }) {
  return children;
}
