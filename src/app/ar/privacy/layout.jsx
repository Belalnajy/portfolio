export const metadata = {
  title: 'الخصوصية',
  description:
    'إيه اللي بيتجمع على belalnagy.com: رسائل فورم التواصل، وأحداث تحليلات من غير كوكيز، واختيارك للغة والوضع. مفيش كوكيز تتبع ولا إعلانات ولا بيانات بتتباع.',
  alternates: {
    canonical: '/ar/privacy',
    languages: { en: '/privacy', ar: '/ar/privacy', 'x-default': '/privacy' },
  },
  robots: { index: true, follow: true },
};

export default function ArabicPrivacyLayout({ children }) {
  return children;
}
