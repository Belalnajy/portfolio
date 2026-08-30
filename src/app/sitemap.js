import { CASE_STUDIES } from '../lib/case-studies';

const SITE_URL = 'https://belalnagy.com';

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

export default function sitemap() {
  const home = { en: '/', ar: '/ar' };
  const entries = [entry('/', HOME_UPDATED, 1, home), entry('/ar', HOME_UPDATED, 1, home)];

  for (const [slug, { updated }] of Object.entries(CASE_STUDIES)) {
    const paths = { en: `/case-study/${slug}`, ar: `/ar/case-study/${slug}` };
    entries.push(entry(paths.en, updated, 0.8, paths), entry(paths.ar, updated, 0.8, paths));
  }

  return entries;
}
