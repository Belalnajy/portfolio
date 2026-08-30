'use client';

import CaseStudy from '../../../components/CaseStudy';

const STACK = ['Next.js', 'React', 'Flask', 'PostgreSQL', 'Socket.io', 'SQLAlchemy'];

export default function IndstrzCaseStudyPage() {
  return (
    <CaseStudy
      slug="indstrz"
      image="/indstrz.webp"
      stack={STACK}
    />
  );
}
