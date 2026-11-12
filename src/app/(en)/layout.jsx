import RootDocument from '../../components/RootDocument';
import { FONT_VARIABLES } from '../../lib/fonts-en';
import { FACTS } from '../../lib/facts';
import { pageMetadata, SITE_METADATA, SITE_VIEWPORT } from '../../lib/metadata';
import '../globals.css';

// Root layout of the English tree. The Arabic tree has its own
// (src/app/ar/layout.jsx) so each can render its own <html lang dir>; the
// `(en)` folder is a route group and adds nothing to the URLs.
export const metadata = {
  ...SITE_METADATA,
  ...pageMetadata({
    lang: 'en',
    path: '/',
    title: {
      // The city lives in the title on purpose: it is the strongest signal for
      // "developer in Alexandria/Egypt" queries, which is where clients search.
      default: 'Belal Nagy | Full-Stack Developer in Alexandria, Egypt',
      template: '%s | Belal Nagy',
    },
    description:
      `Full-stack developer based in Alexandria, Egypt. I build web platforms from zero, and take over existing codebases that need fixing: ${FACTS.projects} projects for ${FACTS.clients} clients across Egypt and the Gulf, in Next.js, Laravel, NestJS, Node.js, Django and PostgreSQL, with Arabic and RTL across every project.`,
    shareDescription:
      `Full-stack developer based in Alexandria, Egypt. I build web platforms from zero, and take over existing codebases that need fixing: ${FACTS.projects} projects for ${FACTS.clients} clients across Egypt and the Gulf.`,
    twitter: {
      description:
        'Full-stack developer based in Alexandria, Egypt. I build web platforms from zero, and take over existing codebases that need fixing.',
    },
  }),
  keywords: [
    'Belal Nagy',
    'Full Stack Developer',
    'React',
    'Next.js',
    'Laravel',
    'Django',
    'NestJS',
    'Node.js',
    'PostgreSQL',
    'legacy code',
    'technical audit',
    'LMS',
    'multi-tenant',
    'RTL',
    'Arabic',
    'Portfolio',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer',
    'Alexandria',
    'Egypt',
    'Saudi Arabia',
  ],
};

export const viewport = SITE_VIEWPORT;

export default function RootLayout({ children }) {
  return <RootDocument lang="en" fontVariables={FONT_VARIABLES}>{children}</RootDocument>;
}
