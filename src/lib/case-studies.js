/**
 * Route-level facts for each long-form case study. The narrative lives in the
 * translation bundles under `case_studies.<slug>`; this is only what the page
 * shell and the share image need. Both /case-study/<slug> and /ar/case-study/
 * <slug> read from here so the two never drift.
 */
export const CASE_STUDIES = {
  bilqalam: {
    name: 'Bilqalam Institute',
    image: '/bilqalam.webp',
    liveUrl: 'https://bilqalaminstitute.net/',
    stack: ['Next.js', 'React', 'Laravel', 'PHP', 'Tailwind'],
    updated: '2026-08-30',
  },
  indstrz: {
    name: 'Indstrz',
    image: '/indstrz.webp',
    liveUrl: 'https://indstrz.com/en',
    stack: ['Next.js', 'React', 'Flask', 'PostgreSQL', 'Socket.io', 'SQLAlchemy'],
    updated: '2026-08-30',
  },
  uduipa: {
    name: 'UDUIPA',
    image: '/uduipa.webp',
    liveUrl: 'https://uduipa.com',
    stack: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Turborepo', 'Puppeteer'],
    updated: '2026-08-30',
  },
  profleet: {
    name: 'Pro Fleet',
    image: '/profleet.webp',
    liveUrl: 'https://pro-fleet.vercel.app/',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io', 'PostgreSQL', 'Leaflet'],
    updated: '2026-08-30',
  },
};

export const CASE_STUDY_SLUGS = Object.keys(CASE_STUDIES);
