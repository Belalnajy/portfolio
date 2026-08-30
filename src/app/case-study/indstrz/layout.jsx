import { OG_IMAGE } from '../../layout';

export const metadata = {
  title: 'Indstrz — Case Study',
  description:
    'Indstrz: a B2B industrial procurement platform with digital RFQ workflows and a real-time negotiation engine, co-founded and technically led by Belal Nagy. Selected for the Venture Ready Program by Plug and Play with GIZ Egypt and ITIDA support.',
  alternates: {
    canonical: '/case-study/indstrz',
  },
  openGraph: {
    type: 'article',
    url: '/case-study/indstrz',
    title: 'Indstrz — Case Study',
    description:
      'A B2B industrial procurement platform with digital RFQ workflows and real-time negotiation, selected for the Venture Ready Program.',
    // Declaring openGraph here replaces the root object outright, so the image
    // has to be repeated or this page ships without one.
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indstrz — Case Study',
    description:
      'A B2B industrial procurement platform with digital RFQ workflows and real-time negotiation, selected for the Venture Ready Program.',
    images: [OG_IMAGE],
  },
};

export default function CaseStudyLayout({ children }) {
  return children;
}
