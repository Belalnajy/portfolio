import { OG_IMAGE } from '../../layout';

export const metadata = {
  title: 'UDUIPA — Case Study',
  description:
    'UDUIPA: the official digital platform of a university union — centralized membership management, automated verification workflows, and PDF/QR document pipelines in a Turborepo monorepo, localized in Arabic, English and French.',
  alternates: {
    canonical: '/case-study/uduipa',
  },
  openGraph: {
    type: 'article',
    url: '/case-study/uduipa',
    title: 'UDUIPA — Case Study',
    description:
      'The official digital platform of a university union: membership management, automated verification, and document pipelines in three languages.',
    // Declaring openGraph here replaces the root object outright, so the image
    // has to be repeated or this page ships without one.
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UDUIPA — Case Study',
    description:
      'The official digital platform of a university union: membership management, automated verification, and document pipelines in three languages.',
    images: [OG_IMAGE],
  },
};

export default function CaseStudyLayout({ children }) {
  return children;
}
