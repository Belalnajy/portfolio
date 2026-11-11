/**
 * The canonical origin, in one place.
 *
 * It must match the primary domain configured in Vercel: belalnagy.com
 * 308-redirects to www.belalnagy.com, so canonical tags, hreflang alternates,
 * Open Graph URLs and the sitemap all have to name the www host. Pointing
 * them at the redirecting apex made every indexed URL a redirect hop.
 */
export const SITE_URL = 'https://www.belalnagy.com';

/**
 * One identity for the knowledge graph. Every JSON-LD block on the site (the
 * English and Arabic Person, ProfilePage, article authors, the services
 * founder) points at these @ids, so search and answer engines resolve them to
 * a single entity instead of four unrelated "Belal Nagy" nodes.
 */
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// Compact reference for author/founder/publisher fields.
export const PERSON_REF = { '@type': 'Person', '@id': PERSON_ID, name: 'Belal Nagy', url: SITE_URL };

// Every public profile that is the same person. Kept in one list so the
// English and Arabic Person entities can never disagree.
export const SAME_AS = [
  'https://github.com/Belalnajy',
  'https://linkedin.com/in/belalnajy',
  'https://khamsat.com/user/belalnajy',
  'https://mostaql.com/u/belalnagy',
  'https://www.nafezly.com/u/belalnajy',
];

// Bump when the home page content changes. Read by the sitemap and the home
// ProfilePage, so both tell crawlers the same "last changed" date; a fixed
// date beats `new Date()`, which claimed every page changed on every deploy.
export const HOME_UPDATED = '2026-10-24';
