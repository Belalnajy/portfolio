export const metadata = {
  title: 'Bilqalam Institute — Case Study',
  description:
    'Bilqalam Institute: a production learning platform serving thousands of students, built and maintained by one developer in Next.js and Laravel. Enrollment, billing and invoicing, and admin reporting, fully Arabic and RTL.',
  alternates: {
    canonical: '/case-study/bilqalam',
  },
  openGraph: {
    type: 'article',
    title: 'Bilqalam Institute — Case Study',
    description:
      'A production learning platform serving thousands of students, built and maintained by one developer.',
  },
};

export default function CaseStudyLayout({ children }) {
  return children;
}
