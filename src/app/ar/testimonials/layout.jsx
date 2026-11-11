import { OG_IMAGE } from '../../layout';

export const metadata = {
  title: 'آراء العملاء',
  description: 'كل تقييمات عملاء بلال ناجي كاملة كما كُتبت على خمسات ونفذلي: تقييم ٥ من ٥ وإيجابية بنسبة ١٠٠٪ من عملاء في مصر والخليج.',
  alternates: {
    canonical: '/ar/testimonials',
    languages: { en: '/testimonials', ar: '/ar/testimonials', 'x-default': '/testimonials' },
  },
  openGraph: { type: 'website', url: '/ar/testimonials', locale: 'ar_SA', title: 'آراء العملاء | بلال ناجي', description: 'كل تقييمات عملاء بلال ناجي كاملة كما كُتبت على خمسات ونفذلي: تقييم ٥ من ٥ وإيجابية بنسبة ١٠٠٪ من عملاء في مصر والخليج.', images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: 'آراء العملاء | بلال ناجي', description: 'كل تقييمات عملاء بلال ناجي كاملة كما كُتبت على خمسات ونفذلي: تقييم ٥ من ٥ وإيجابية بنسبة ١٠٠٪ من عملاء في مصر والخليج.', images: [OG_IMAGE] },
};

export default function ArabicLayout({ children }) {
  return children;
}
