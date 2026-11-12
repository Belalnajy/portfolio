import { CASE_STUDY_SLUGS, CLIENT_PROJECT_SLUGS } from './case-studies.js';

/**
 * The headline numbers, in one place.
 *
 * They are claimed in the hero, the About stats, the footer, the CV, the
 * page metadata and structured data, llms.txt, the FAQ and the share image.
 * They used to be typed out in each of those, which is how the site ended up
 * saying 36 projects in one sentence and 38 in the card beside it, and how
 * og.png kept advertising 31.
 *
 * `projects` is counted, not typed: it is the client projects in
 * src/lib/case-studies.js (entries without a `kind`, plus the co-founded
 * venture, which is labelled but counted), so adding client work there
 * raises the number everywhere. Training, event and learning projects stay
 * in the archive but are not client work, so they are not counted; the
 * archive's full size is `archive`, for sentences about the archive itself.
 * The rest have no data in the repo to count from; change them here and only
 * here.
 */
export const FACTS = {
  projects: CLIENT_PROJECT_SLUGS.length,
  archive: CASE_STUDY_SLUGS.length,
  clients: 27,
  students: 440,
  technologies: 20,
};

/**
 * The facts as translation variables (`{{projects}}`, `{{clients}}` …),
 * installed as i18next's defaultVariables (src/i18n.js), so any locale string
 * can use them without its call site passing anything. Both languages use
 * Western digits, not Arabic-Indic ones: the audience is Egypt and the Gulf, and the
 * tech names, prices and dates around these numbers are Latin already.
 */
export const FACT_VARIABLES = { ...FACTS };

/** Fills fact placeholders in a raw locale string, for code that reads bundles without i18next (the CV). */
export const fillFacts = (text) =>
  text.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => (key in FACT_VARIABLES ? FACT_VARIABLES[key] : match));
