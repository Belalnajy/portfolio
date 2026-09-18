import { OG_IMAGE } from '../layout';

export const metadata = {
  title: 'Client Reviews',
  description: 'Every client review in full, from the freelance platforms Belal Nagy works through.',
  alternates: {
    canonical: '/testimonials',
    languages: { en: '/testimonials', ar: '/ar/testimonials', 'x-default': '/testimonials' },
  },
  openGraph: { type: 'website', url: '/testimonials', title: 'Client Reviews — Belal Nagy', description: 'Every client review in full, from the freelance platforms Belal Nagy works through.', images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: 'Client Reviews — Belal Nagy', description: 'Every client review in full, from the freelance platforms Belal Nagy works through.', images: [OG_IMAGE] },
};

export default function Layout({ children }) {
  return children;
}
