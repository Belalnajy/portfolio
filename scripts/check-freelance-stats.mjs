/*
 * Best-effort checker for the freelance-platform claims the site makes
 * ("100% positive client reviews", the 5.0 rating in the hero, the review
 * quotes in Testimonials). Run it locally now and then:
 *
 *   node scripts/check-freelance-stats.mjs
 *
 * It fetches the public profile pages on Khamsat, Mostaql and Nafezly and
 * greps them for rating/review signals, then prints what it found next to
 * what the site currently claims — a reminder to update the copy when the
 * numbers move, not an automation that edits anything.
 *
 * Honest caveats: these platforms render some stats client-side and change
 * markup without notice, so any pattern here can silently stop matching.
 * The script treats every failure as "couldn't verify" and exits 0 — it
 * must never break a build. It performs three plain GET requests to public
 * profile pages, nothing more.
 */

const PROFILES = [
  {
    name: 'Khamsat',
    url: 'https://khamsat.com/user/belalnajy',
    // e.g. "التقييمات (27)" and percentage blocks on the profile card.
    patterns: [/التقييم[^<]{0,40}?(\d{1,3})\s*%/, /(\d{1,3})\s*%\s*<\/?/],
  },
  {
    name: 'Mostaql',
    url: 'https://mostaql.com/u/belalnagy',
    // Profile shows a x.x/5 average when reviews exist.
    patterns: [/([0-5](?:\.\d)?)\s*\/\s*5/, /rating[^0-9]{0,20}([0-5](?:\.\d)?)/i],
  },
  {
    name: 'Nafezly',
    url: 'https://www.nafezly.com/u/belalnajy',
    patterns: [/([0-5](?:\.\d)?)\s*\/\s*5/, /(\d{1,3})\s*%/],
  },
];

const SITE_CLAIMS = {
  rating: '5.0 (hero panel)',
  positive: '100% positive client reviews (hero + testimonials)',
};

const fetchProfile = async ({ name, url, patterns }) => {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (profile-stats check, belalnagy.com)' },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return { name, url, status: `HTTP ${res.status}` };
    const html = await res.text();
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) return { name, url, status: 'ok', found: match[1] };
    }
    return { name, url, status: 'page fetched, no rating pattern matched' };
  } catch (error) {
    return { name, url, status: `unreachable (${error.name})` };
  }
};

const results = await Promise.all(PROFILES.map(fetchProfile));

console.log('Site currently claims:');
for (const claim of Object.values(SITE_CLAIMS)) console.log(`  - ${claim}`);
console.log('\nLive profiles:');
for (const { name, url, status, found } of results) {
  console.log(
    `  - ${name}: ${found !== undefined ? `found "${found}"` : status}  (${url})`,
  );
}
console.log(
  '\nIf the live numbers moved, update hero.freelance_rating in both locales' +
    '\nand the Testimonials section, then regenerate the CV (scripts/generate-cv.mjs).',
);
