import { OG_IMAGE, SITE_URL } from '../../layout';

export const metadata = {
  title: 'إنقاذ المشاريع المتوقفة: بستلم المشاريع الواقفة',
  description:
    'المبرمج اختفى؟ ورثت كود مكسور؟ بستلم المشاريع المتوقفة والمهجورة، أفحصها الأول، أثبّتها، وأرجّعها تتحرك تاني، من غير إعادة كتابة مكلفة. من الإسكندرية، مصر لعملاء مصر والخليج.',
  alternates: {
    canonical: '/ar/rescue',
    languages: { en: '/rescue', ar: '/ar/rescue', 'x-default': '/rescue' },
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/ar/rescue`,
    locale: 'ar_SA',
    title: 'إنقاذ المشاريع المتوقفة | بلال ناجي',
    description:
      'بستلم المشاريع المتوقفة والمهجورة، أفحصها الأول، أثبّتها، وأرجّعها تتحرك تاني، من غير إعادة كتابة مكلفة.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'إنقاذ المشاريع المتوقفة | بلال ناجي',
    description:
      'بستلم المشاريع المتوقفة والمهجورة، أفحصها الأول، أثبّتها، وأرجّعها تتحرك تاني، من غير إعادة كتابة مكلفة.',
    images: [OG_IMAGE],
  },
};

export default function ArabicRescueLayout({ children }) {
  return children;
}
