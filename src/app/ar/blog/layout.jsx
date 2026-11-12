import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
  lang: 'ar',
  path: '/blog',
  // A plain-string title here would break the template chain and leave the
  // article pages without the Arabic name suffix; the object re-declares it.
  title: {
    absolute: 'المقالات | بلال ناجي',
    default: 'المقالات | بلال ناجي',
    template: '%s | بلال ناجي',
  },
  description:
    'مقالات هندسية من مشاريع حقيقية: بنية Django متعددة العملاء، واستلام المشاريع القديمة بدون إعادة كتابة، وواجهات عربية RTL تصمد أمام لوحات التحكم والفواتير.',
  shareTitle: 'المقالات | بلال ناجي',
  shareDescription:
    'مقالات هندسية من مشاريع حقيقية: البنية، واستلام المشاريع القديمة، والعربية RTL.',
  card: true,
});

export default function BlogLayout({ children }) {
  return children;
}
