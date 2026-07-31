/**
 * Captures project cover screenshots straight into public/.
 *
 *   npx -y playwright@1.56 install chromium
 *   node scripts/capture-covers.mjs            # placeholders + the LMS suite
 *   node scripts/capture-covers.mjs --all      # every project with a live URL
 *   node scripts/capture-covers.mjs bilqalam mada
 *   node scripts/capture-covers.mjs --list
 *
 * Output is 1920x1000. That is the shape most of the existing covers already
 * have (27 of 35 sit at roughly 1908x996), so new captures drop in without
 * looking out of place next to the old ones.
 *
 * Cards render covers with object-contain, so a mismatched ratio will not break
 * the grid, it just reads as inconsistent.
 */
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const PUBLIC_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
);

const WIDTH = 1920;
const HEIGHT = 1000;

/**
 * `group` drives the default run:
 *   placeholder - currently a stylised stand-in, not a real screenshot
 *   suite       - the shared-engine LMS platforms, re-captured together
 *   refresh     - has a real screenshot already, capture only with --all
 */
const TARGETS = [
  // Never had a real screenshot.
  { slug: 'bilqalam', file: 'bilqalam.png', url: 'https://bilqalaminstitute.net/', group: 'placeholder' },
  { slug: 'mutlq', file: 'mutlq.png', url: 'https://mutlq.org/', group: 'placeholder' },

  // One engine, three brands. Worth capturing in one pass so they stay visually
  // consistent with each other.
  { slug: 'mada', file: 'mada.png', url: 'https://mada-education.com/', group: 'suite' },
  { slug: 'injaz', file: 'injaz.png', url: 'https://lms-injaz.com/', group: 'suite' },
  { slug: 'hcholding', file: 'hcholding.png', url: 'https://lms-hcholding.org/', group: 'suite' },

  // Existing covers are real; recapture only if the site has changed.
  { slug: 'toyo228', file: 'toyo228.png', url: 'http://toyo228.com/en', group: 'refresh' },
  { slug: 'motors', file: 'motors.png', url: 'https://motorksa.org/', group: 'refresh' },
  { slug: 'sonomedix', file: 'sonomedix.png', url: 'https://sonomedix.cloud/', group: 'refresh' },
  { slug: 'kmbc', file: 'kmbc.png', url: 'https://www.kmbc-kw.com/', group: 'refresh' },
  { slug: 'rabzan', file: 'rabzan.png', url: 'https://www.rabzan.com/', group: 'refresh' },
  { slug: 'manqla', file: 'manqla.png', url: 'https://www.manqla.com/', group: 'refresh' },
  { slug: 'uduipa', file: 'uduipa.png', url: 'https://uduipa.com', group: 'refresh' },
  { slug: 'waferlee', file: 'waferlee.png', url: 'https://waferlee.ae', group: 'refresh' },
  { slug: 'journal', file: 'journal.png', url: 'https://upafa-edu.net/', group: 'refresh' },
  { slug: 'cme', file: 'cme.png', url: 'https://cmehours.online/', group: 'refresh' },
  { slug: 'amarna', file: 'amarna.png', url: 'https://amarna-travel.trekksoft.com/ar', group: 'refresh' },
  { slug: 'sems', file: 'sems.png', url: 'https://sems-project.vercel.app/', group: 'refresh' },
  { slug: 'nextstop', file: 'nextstop.png', url: 'https://next-stop-project-nine.vercel.app/', group: 'refresh' },
  { slug: 'quotemate', file: 'quotemate.png', url: 'https://quote-mateapp.vercel.app/', group: 'refresh' },
  { slug: 'dmagni', file: 'dmagni.png', url: 'https://dmagni-project.vercel.app/', group: 'refresh' },
  { slug: 'dpms', file: 'dpms.png', url: 'https://dpms-rust.vercel.app/', group: 'refresh' },
  { slug: 'profleet', file: 'profleet.png', url: 'https://pro-fleet.vercel.app/', group: 'refresh' },
  { slug: 'clinic', file: 'clinic.png', url: 'https://clinic-project-2.vercel.app/', group: 'refresh' },
  { slug: 'cinemascore', file: 'cinemascore.png', url: 'https://movies-app-react-project-mocha.vercel.app/', group: 'refresh' },
  { slug: 'movieweb', file: 'movies.png', url: 'https://movieswebsiteproject.vercel.app/', group: 'refresh' },
  { slug: 'bookstore', file: 'book.png', url: 'https://bookstoredeploytest.vercel.app/', group: 'refresh' },
];

/**
 * No public URL to capture. These need a screenshot taken by hand from a local
 * run or a staging environment, saved to public/<file>.
 *   medicta is an Android app: the Play Store listing is mostly Google's own
 *   interface, so export the app's own screenshots instead.
 */
const MANUAL = [
  { slug: 'medicta', file: 'medicta.png', note: 'Android app, currently a placeholder' },
  { slug: 'indstrz', file: 'indstrz.png', note: 'no public URL' },
  { slug: 'baserah', file: 'baserah.png', note: 'no public URL' },
  { slug: 'sf_portal', file: 'smartfast.png', note: 'no public URL' },
  { slug: 'orca', file: 'orca.png', note: 'no public URL' },
  { slug: 'inventory', file: 'inventory.png', note: 'no public URL' },
  { slug: 'hms_odoo', file: 'HMS.png', note: 'no public URL' },
  { slug: 'library', file: 'library.png', note: 'no public URL' },
  { slug: 'alva_ai', file: 'alva.png', note: 'no public URL' },
];

const args = process.argv.slice(2);

if (args.includes('--list')) {
  const width = 14;
  for (const group of ['placeholder', 'suite', 'refresh']) {
    console.log(`\n${group.toUpperCase()}`);
    TARGETS.filter((t) => t.group === group).forEach((t) =>
      console.log(`  ${t.slug.padEnd(width)}${t.url}`),
    );
  }
  console.log('\nMANUAL (no public URL, capture by hand)');
  MANUAL.forEach((t) => console.log(`  ${t.slug.padEnd(width)}${t.note}`));
  process.exit(0);
}

const slugs = args.filter((a) => !a.startsWith('--'));
const queue = slugs.length
  ? TARGETS.filter((t) => slugs.includes(t.slug))
  : args.includes('--all')
    ? TARGETS
    : TARGETS.filter((t) => t.group !== 'refresh');

if (!queue.length) {
  console.error('Nothing matched. Run with --list to see available slugs.');
  process.exit(1);
}

console.log(`Capturing ${queue.length} cover(s) at ${WIDTH}x${HEIGHT}\n`);

// Imported here so --list works before playwright is installed.
const { chromium } = await import('playwright').catch(() => {
  console.error(
    'playwright is not installed. Run:\n  npx -y playwright@1.56 install chromium\n  npm i -D playwright',
  );
  process.exit(1);
});

const browser = await chromium.launch();
let failures = 0;

for (const target of queue) {
  const out = path.join(PUBLIC_DIR, target.file);
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    locale: 'ar',
  });
  const page = await context.newPage();

  try {
    await page.goto(target.url, { waitUntil: 'networkidle', timeout: 60_000 });
    // Let webfonts and any entrance animation settle before capturing.
    await page.waitForTimeout(4000);
    // Clear a cookie or consent bar if one is covering the hero.
    await page
      .getByRole('button', { name: /accept|agree|موافق|قبول/i })
      .first()
      .click({ timeout: 2500 })
      .catch(() => {});
    await page.waitForTimeout(500);
    await page.screenshot({ path: out });
    console.log(`  ok      ${target.slug.padEnd(14)} -> public/${target.file}`);
  } catch (error) {
    failures += 1;
    console.error(
      `  FAILED  ${target.slug.padEnd(14)} ${error.message.split('\n')[0]}`,
    );
  } finally {
    await context.close();
  }
}

await browser.close();
console.log(`\nDone. ${queue.length - failures} captured, ${failures} failed.`);
process.exit(failures ? 1 : 0);
