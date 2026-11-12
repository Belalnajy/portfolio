import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
  lang: 'en',
  path: '/uses',
  title: 'Uses',
  description:
    'The editor, stack, infrastructure and working tools Belal Nagy actually uses every day.',
  shareTitle: 'Uses | Belal Nagy',
  card: true,
});

export default function Layout({ children }) {
  return children;
}
