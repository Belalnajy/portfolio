'use client';

import CaseStudy from '../../../components/CaseStudy';

const STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Django',
  'PostgreSQL',
  'Tailwind',
  'Celery',
  'Redis',
];

export default function BilqalamCaseStudyPage() {
  return (
    <CaseStudy
      slug="bilqalam"
      image="/bilqalam.png"
      liveUrl="https://bilqalaminstitute.net/"
      stack={STACK}
    />
  );
}
