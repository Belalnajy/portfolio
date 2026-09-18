import { OG_IMAGE } from '../layout';

export const metadata = {
  title: 'CV',
  description:
    'The CV of Belal Nagy, full-stack developer in Alexandria: experience, selected projects, skills and certifications. Readable in the browser or downloadable as a PDF.',
  alternates: {
    canonical: '/cv',
    languages: { en: '/cv', ar: '/ar/cv', 'x-default': '/cv' },
  },
  openGraph: {
    type: 'profile',
    url: '/cv',
    title: 'CV — Belal Nagy',
    description: 'Experience, selected projects, skills and certifications on one page.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV — Belal Nagy',
    description: 'Experience, selected projects, skills and certifications on one page.',
    images: [OG_IMAGE],
  },
};

export default function CvLayout({ children }) {
  return children;
}
