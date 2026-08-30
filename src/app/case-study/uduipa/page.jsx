'use client';

import CaseStudy from '../../../components/CaseStudy';

const STACK = ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Turborepo', 'Puppeteer'];

export default function UduipaCaseStudyPage() {
  return (
    <CaseStudy
      slug="uduipa"
      image="/uduipa.webp"
      liveUrl="https://uduipa.com"
      stack={STACK}
    />
  );
}
