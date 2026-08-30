import { OG_IMAGE } from '../../layout';

export const metadata = {
  title: 'Pro Fleet — Case Study',
  description:
    'Pro Fleet: an intelligent fleet management platform for a Saudi startup — real-time GPS tracking on interactive maps, role-based dashboards, automated billing and live shipment tracking, with full Arabic RTL support.',
  alternates: {
    canonical: '/case-study/profleet',
  },
  openGraph: {
    type: 'article',
    url: '/case-study/profleet',
    title: 'Pro Fleet — Case Study',
    description:
      'An intelligent fleet management platform for a Saudi startup: real-time GPS tracking, role-based dashboards and automated billing.',
    // Declaring openGraph here replaces the root object outright, so the image
    // has to be repeated or this page ships without one.
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pro Fleet — Case Study',
    description:
      'An intelligent fleet management platform for a Saudi startup: real-time GPS tracking, role-based dashboards and automated billing.',
    images: [OG_IMAGE],
  },
};

export default function CaseStudyLayout({ children }) {
  return children;
}
