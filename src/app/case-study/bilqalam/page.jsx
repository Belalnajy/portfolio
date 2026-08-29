'use client';

import CaseStudy from '../../../components/CaseStudy';

const STACK = ['Next.js', 'React', 'Laravel', 'PHP', 'Tailwind'];

export default function BilqalamCaseStudyPage() {
  return (
    <CaseStudy
      slug="bilqalam"
      image="/bilqalam.webp"
      liveUrl="https://bilqalaminstitute.net/"
      stack={STACK}
    />
  );
}
