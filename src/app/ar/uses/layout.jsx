import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
  lang: 'ar',
  path: '/uses',
  title: 'أدواتي',
  description:
    'المحرر والاستاك والبنية التحتية وأدوات الشغل اللي بيستخدمها بلال ناجي كل يوم.',
  shareTitle: 'أدواتي | بلال ناجي',
  card: true,
});

export default function ArabicLayout({ children }) {
  return children;
}
