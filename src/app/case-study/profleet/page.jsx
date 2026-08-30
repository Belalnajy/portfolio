'use client';

import CaseStudy from '../../../components/CaseStudy';

const STACK = ['Next.js', 'TypeScript', 'Prisma', 'Socket.io', 'PostgreSQL', 'Leaflet'];

export default function ProFleetCaseStudyPage() {
  return (
    <CaseStudy
      slug="profleet"
      image="/profleet.webp"
      liveUrl="https://pro-fleet.vercel.app/"
      stack={STACK}
    />
  );
}
