import { OG_IMAGE } from '../layout';

export const metadata = {
  title: 'Legacy Code Rescue — I Take Over Stuck Projects',
  description:
    'Developer disappeared? Inherited a broken codebase? I take over stuck and abandoned web projects, audit them first, stabilize them, and get them moving again — without a costly rewrite. Based in Alexandria, Egypt; serving clients across Egypt and the Gulf.',
  alternates: {
    canonical: '/rescue',
    languages: { en: '/rescue', ar: '/ar/rescue', 'x-default': '/rescue' },
  },
  openGraph: {
    type: 'website',
    url: '/rescue',
    title: 'Legacy Code Rescue — Belal Nagy',
    description:
      'I take over stuck and abandoned web projects, audit them first, stabilize them, and get them moving again — without a costly rewrite.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legacy Code Rescue — Belal Nagy',
    description:
      'I take over stuck and abandoned web projects, audit them first, stabilize them, and get them moving again — without a costly rewrite.',
    images: [OG_IMAGE],
  },
};

export default function RescueLayout({ children }) {
  return children;
}
