import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
  lang: 'en',
  path: '/cv',
  title: 'CV',
  description:
    'The CV of Belal Nagy, full-stack developer in Alexandria: experience, selected projects, skills and certifications. Readable in the browser or downloadable as a PDF.',
  shareTitle: 'CV | Belal Nagy',
  shareDescription:
    'Experience, selected projects, skills and certifications on one page.',
  type: 'profile',
  card: true,
});

export default function CvLayout({ children }) {
  return children;
}
