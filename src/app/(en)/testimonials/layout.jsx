import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
  lang: 'en',
  path: '/testimonials',
  title: 'Client Reviews',
  description:
    'Every client review in full, from the freelance platforms Belal Nagy works through.',
  shareTitle: 'Client Reviews | Belal Nagy',
  card: true,
});

export default function Layout({ children }) {
  return children;
}
