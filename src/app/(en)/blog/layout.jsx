import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
  lang: 'en',
  path: '/blog',
  // A plain-string title here would break the template chain and leave the
  // article pages without the name suffix; the object re-declares it.
  title: {
    absolute: 'Blog | Belal Nagy',
    default: 'Blog | Belal Nagy',
    template: '%s | Belal Nagy',
  },
  description:
    'Engineering write-ups from shipped projects: multi-tenant Django architecture, taking over legacy codebases, and Arabic RTL that survives real dashboards and invoices.',
  shareTitle: 'Blog | Belal Nagy',
  shareDescription:
    'Engineering write-ups from shipped projects: architecture, legacy takeovers and Arabic RTL.',
  card: true,
});

export default function BlogLayout({ children }) {
  return children;
}
