import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
  lang: 'ar',
  path: '/rescue',
  title: 'إنقاذ المشاريع المتوقفة: بستلم المشاريع الواقفة',
  description:
    'المبرمج اختفى؟ ورثت كود مكسور؟ بستلم المشاريع المتوقفة والمهجورة، أفحصها الأول، أثبّتها، وأرجّعها تتحرك تاني، من غير إعادة كتابة مكلفة. من الإسكندرية، مصر لعملاء مصر والخليج.',
  shareTitle: 'إنقاذ المشاريع المتوقفة | بلال ناجي',
  shareDescription:
    'بستلم المشاريع المتوقفة والمهجورة، أفحصها الأول، أثبّتها، وأرجّعها تتحرك تاني، من غير إعادة كتابة مكلفة.',
  card: true,
});

export default function ArabicRescueLayout({ children }) {
  return children;
}
