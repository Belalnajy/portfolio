import { OG_IMAGE } from '../layout';

export const metadata = {
  title: 'Blog',
  description:
    'Engineering write-ups from shipped projects: multi-tenant Django architecture, taking over legacy codebases, and Arabic RTL that survives real dashboards and invoices.',
  alternates: {
    canonical: '/blog',
    languages: { en: '/blog', ar: '/ar/blog', 'x-default': '/blog' },
  },
  openGraph: {
    type: 'website',
    url: '/blog',
    title: 'Blog — Belal Nagy',
    description:
      'Engineering write-ups from shipped projects: architecture, legacy takeovers and Arabic RTL.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Belal Nagy',
    description:
      'Engineering write-ups from shipped projects: architecture, legacy takeovers and Arabic RTL.',
    images: [OG_IMAGE],
  },
};

export default function BlogLayout({ children }) {
  return children;
}
