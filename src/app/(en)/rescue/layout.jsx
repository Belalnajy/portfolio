import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
  lang: 'en',
  path: '/rescue',
  title: 'Legacy Code Rescue: I Take Over Stuck Projects',
  description:
    'Developer disappeared? Inherited a broken codebase? I take over stuck and abandoned web projects, audit them first, stabilize them, and get them moving again, without a costly rewrite. Based in Alexandria, Egypt; serving clients across Egypt and the Gulf.',
  shareTitle: 'Legacy Code Rescue | Belal Nagy',
  shareDescription:
    'I take over stuck and abandoned web projects, audit them first, stabilize them, and get them moving again, without a costly rewrite.',
  card: true,
});

export default function RescueLayout({ children }) {
  return children;
}
