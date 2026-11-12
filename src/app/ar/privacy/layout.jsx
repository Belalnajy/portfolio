import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
  lang: 'ar',
  path: '/privacy',
  title: 'الخصوصية',
  description:
    'إيه اللي بيتجمع على belalnagy.com: رسائل فورم التواصل، وأحداث تحليلات من غير كوكيز، واختيارك للغة والوضع. مفيش كوكيز تتبع ولا إعلانات ولا بيانات بتتباع.',
  shareTitle: 'الخصوصية | بلال ناجي',
});

export default function ArabicPrivacyLayout({ children }) {
  return children;
}
