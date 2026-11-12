import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
  lang: 'ar',
  path: '/now',
  title: 'الآن',
  description:
    'اللي بلال ناجي مركّز فيه دلوقتي: الهندسة في ezSec Inc، وبناء Indstrz، وشغل الفريلانس لمصر والخليج. بيتحدث باستمرار.',
  shareTitle: 'الآن | بلال ناجي',
  shareDescription:
    'اللي بلال ناجي مركّز فيه دلوقتي. بيتحدث باستمرار.',
  card: true,
});

export default function NowLayout({ children }) {
  return children;
}
