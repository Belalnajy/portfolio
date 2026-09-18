import { OG_IMAGE } from '../layout';

export const metadata = {
  title: 'Uses',
  description: 'The editor, stack, infrastructure and working tools Belal Nagy actually uses every day.',
  alternates: {
    canonical: '/uses',
    languages: { en: '/uses', ar: '/ar/uses', 'x-default': '/uses' },
  },
  openGraph: { type: 'website', url: '/uses', title: 'Uses — Belal Nagy', description: 'The editor, stack, infrastructure and working tools Belal Nagy actually uses every day.', images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: 'Uses — Belal Nagy', description: 'The editor, stack, infrastructure and working tools Belal Nagy actually uses every day.', images: [OG_IMAGE] },
};

export default function Layout({ children }) {
  return children;
}
