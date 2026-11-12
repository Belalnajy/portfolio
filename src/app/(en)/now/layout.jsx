import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
  lang: 'en',
  path: '/now',
  title: 'Now',
  description:
    'What Belal Nagy is focused on right now: engineering at ezSec Inc, building Indstrz, and freelance work for Egypt and the Gulf. Updated regularly.',
  shareTitle: 'Now | Belal Nagy',
  shareDescription:
    'What Belal Nagy is focused on right now. Updated regularly.',
  card: true,
});

export default function NowLayout({ children }) {
  return children;
}
