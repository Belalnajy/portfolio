import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
  lang: 'ar',
  path: '/testimonials',
  title: 'آراء العملاء',
  description:
    'كل تقييمات عملاء بلال ناجي كاملة كما كُتبت على منصات العمل الحر: تقييم 5 من 5 وإيجابية بنسبة 100% من عملاء في مصر والخليج.',
  shareTitle: 'آراء العملاء | بلال ناجي',
  card: true,
});

export default function ArabicLayout({ children }) {
  return children;
}
