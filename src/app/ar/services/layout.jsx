import { OG_IMAGE } from '../../layout';

export const metadata = {
  title: 'الخدمات والباكدجات',
  description:
    'خدمات تطوير Full-Stack: بناء من الصفر، هندسة AI وباك إند، تعريب و RTL، واستلام الأكواد القائمة — بعملية واضحة وباكدجات شفافة.',
  alternates: {
    canonical: '/ar/services',
    languages: { en: '/services', ar: '/ar/services', 'x-default': '/services' },
  },
  openGraph: {
    type: 'website',
    url: '/ar/services',
    locale: 'ar_SA',
    title: 'الخدمات والباكدجات — بلال ناجي',
    description: 'خدمات تطوير Full-Stack بعملية واضحة وباكدجات شفافة.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الخدمات والباكدجات — بلال ناجي',
    description: 'خدمات تطوير Full-Stack بعملية واضحة وباكدجات شفافة.',
    images: [OG_IMAGE],
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
