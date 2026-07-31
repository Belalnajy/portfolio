import { OG_IMAGE } from '../../layout';

export const metadata = {
  title: 'Bilqalam Institute — Case Study',
  description:
    'Bilqalam Institute: a production learning platform serving thousands of students, built and maintained by one developer in Next.js and Laravel. Enrollment, billing and invoicing, and admin reporting, fully Arabic and RTL.',
  alternates: {
    canonical: '/case-study/bilqalam',
  },
  openGraph: {
    type: 'article',
    url: '/case-study/bilqalam',
    title: 'Bilqalam Institute — Case Study',
    description:
      'A production learning platform serving thousands of students, built and maintained by one developer.',
    // Declaring openGraph here replaces the root object outright, so the image
    // has to be repeated or this page ships without one.
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bilqalam Institute — Case Study',
    description:
      'A production learning platform serving thousands of students, built and maintained by one developer.',
    images: [OG_IMAGE],
  },
};

export default function CaseStudyLayout({ children }) {
  return children;
}
