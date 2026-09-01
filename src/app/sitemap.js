import { CASE_STUDIES } from '../lib/case-studies';
import { SITE_URL } from '../lib/site';

// Bump when the home page content changes. A fixed date tells crawlers what
// actually changed, where `new Date()` claimed every page changed on every deploy.
const HOME_UPDATED = '2026-08-30';

const entry = (path, lastModified, priority, alternates) => ({
  url: `${SITE_URL}${path}`,
  lastModified: new Date(lastModified),
  changeFrequency: 'monthly',
  priority,
  alternates: {
    languages: Object.fromEntries(
      Object.entries(alternates).map(([lang, p]) => [lang, `${SITE_URL}${p}`]),
    ),
  },
});

const STATIC_PAGES = [
  { path: '/work', priority: 0.9 },
  { path: '/services', priority: 0.9 },
  { path: '/now', priority: 0.6 },
];

export default function sitemap() {
  const home = { en: '/', ar: '/ar' };
  const entries = [entry('/', HOME_UPDATED, 1, home), entry('/ar', HOME_UPDATED, 1, home)];

  for (const { path, priority } of STATIC_PAGES) {
    const paths = { en: path, ar: `/ar${path}` };
    entries.push(
      entry(paths.en, HOME_UPDATED, priority, paths),
      entry(paths.ar, HOME_UPDATED, priority, paths),
    );
  }

  for (const [slug, { updated }] of Object.entries(CASE_STUDIES)) {
    const paths = { en: `/case-study/${slug}`, ar: `/ar/case-study/${slug}` };
    entries.push(entry(paths.en, updated, 0.8, paths), entry(paths.ar, updated, 0.8, paths));
  }

  return entries;
}
