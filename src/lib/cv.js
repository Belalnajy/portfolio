// Explicit extensions: scripts/generate-cv.mjs loads this through plain Node
// ESM, which does not resolve extensionless paths the way the bundler does.
import { CASE_STUDIES } from './case-studies.js';
import { FACTS } from './facts.js';

/**
 * The CV, assembled from the site's own content.
 *
 * Both the printable /cv page and scripts/generate-cv.mjs import this, so the
 * page a recruiter reads and the PDF they download are the same document. The
 * PDF used to build its own copy of this and drifted: it was still citing 31
 * projects and 240 students, and crediting a freelance account that has since
 * closed.
 *
 * `bundle` is a locale module (src/locales/en.js or ar.js), so the CV exists
 * in both languages without a second set of strings.
 */

// <1>…</1> mark Trans-component islands in the site copy; the CV is plain text.
const strip = (value) => String(value).replace(/<\/?\d+>/g, '');

export const CV_CONTACT = {
  name: 'Belal Nagy',
  email: 'belalnajy9@gmail.com',
  site: 'belalnagy.com',
  github: 'github.com/Belalnajy',
  linkedin: 'linkedin.com/in/belalnajy',
};

// The projects worth a recruiter's minute, in the order they should be read.
export const CV_PROJECT_SLUGS = ['bilqalam', 'injaz', 'indstrz', 'medicta', 'toyo228', 'uduipa'];

// Keyed by the locale's own skills categories so the headings translate; the
// values are tool names, which stay Latin in both languages.
const SKILL_ROWS = [
  ['languages', 'Python · JavaScript · TypeScript · PHP · SQL · HTML · CSS'],
  ['frameworks', 'Django · Flask · Laravel · Next.js · React · Node.js · Express · NestJS · Tailwind CSS'],
  ['databases', 'PostgreSQL · MongoDB · MySQL · Redis · REST APIs · WebSockets'],
  ['devops', 'Docker · Git · Linux · Nginx · CI/CD · production deployment'],
];

export const buildCv = (bundle) => {
  const t = bundle.translation;
  const timeline = t.timeline.items;

  return {
    contact: { ...CV_CONTACT, role: t.hero.role_line, location: t.about.values.location },
    summary: [t.about.summary_p1, t.about.summary_p2, t.about.summary_p3].map(strip),

    // Derived, so a number can never be true on the site and stale here.
    highlights: [
      t.cv.highlights.delivered
        .replace('{{projects}}', FACTS.projects)
        .replace('{{clients}}', FACTS.clients),
      t.cv.highlights.reviews,
      t.cv.highlights.teaching.replace('{{students}}', FACTS.students),
      t.cv.highlights.rtl,
    ],

    // An entry with an employment type is a job; the rest is study.
    experience: timeline.filter((item) => item.employment),
    education: timeline.filter((item) => !item.employment),

    projects: CV_PROJECT_SLUGS.map((slug) => ({
      slug,
      ...CASE_STUDIES[slug],
      desc: t.projects.items[slug].desc,
    })),

    skills: [
      ...SKILL_ROWS.map(([key, value]) => [t.skills.categories[key], value]),
      [t.cv.spoken_languages_label, t.cv.spoken_languages],
    ],

    certifications: Object.values(t.certifications.items),
  };
};
