import { OG_IMAGE } from '../../layout';

export const metadata = {
  title: 'أدواتي',
  description: 'المحرر والاستاك والبنية التحتية وأدوات الشغل اللي بيستخدمها بلال ناجي كل يوم.',
  alternates: {
    canonical: '/ar/uses',
    languages: { en: '/uses', ar: '/ar/uses', 'x-default': '/uses' },
  },
  openGraph: { type: 'website', url: '/ar/uses', locale: 'ar_SA', title: 'أدواتي — بلال ناجي', description: 'المحرر والاستاك والبنية التحتية وأدوات الشغل اللي بيستخدمها بلال ناجي كل يوم.', images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: 'أدواتي — بلال ناجي', description: 'المحرر والاستاك والبنية التحتية وأدوات الشغل اللي بيستخدمها بلال ناجي كل يوم.', images: [OG_IMAGE] },
};

export default function ArabicLayout({ children }) {
  return children;
}
