import { OG_IMAGE } from '../../layout';

export const metadata = {
  title: 'المقالات',
  description:
    'مقالات هندسية من مشاريع حقيقية: بنية Django متعددة العملاء، واستلام المشاريع القديمة بدون إعادة كتابة، وواجهات عربية RTL تصمد أمام لوحات التحكم والفواتير.',
  alternates: {
    canonical: '/ar/blog',
    languages: { en: '/blog', ar: '/ar/blog', 'x-default': '/blog' },
  },
  openGraph: {
    type: 'website',
    url: '/ar/blog',
    locale: 'ar_SA',
    title: 'المقالات — بلال ناجي',
    description:
      'مقالات هندسية من مشاريع حقيقية: البنية، واستلام المشاريع القديمة، والعربية RTL.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'المقالات — بلال ناجي',
    description:
      'مقالات هندسية من مشاريع حقيقية: البنية، واستلام المشاريع القديمة، والعربية RTL.',
    images: [OG_IMAGE],
  },
};

export default function BlogLayout({ children }) {
  return children;
}
