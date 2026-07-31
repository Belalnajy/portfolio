/**
 * Captures project cover screenshots straight into public/.
 *
 * The four covers listed below are currently stylised placeholders, not real
 * screenshots: the environment they were authored in cannot reach these hosts.
 * Run this from a machine that can, and the placeholders are replaced in place,
 * no code changes needed.
 *
 *   npx -y playwright@1.56 install chromium
 *   node scripts/capture-covers.mjs
 *
 * Capture one at a time by passing slugs:
 *
 *   node scripts/capture-covers.mjs bilqalam mada
 *
 * 1564x639 matches the existing covers. Keep it: the project grid and the 3D
 * showcase both assume every cover shares one aspect ratio.
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const PUBLIC_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
);

const WIDTH = 1564;
const HEIGHT = 639;

const TARGETS = [
  { slug: 'bilqalam', url: 'https://bilqalaminstitute.net/' },
  { slug: 'mada', url: 'https://mada-education.com/' },
  { slug: 'mutlq', url: 'https://mutlq.org/' },
  // Medicta is an Android app. The Play Store listing is mostly Google's own
  // interface, so a screenshot of it makes a poor cover. Prefer exporting a
  // couple of the app's own screenshots from the listing and composing those,
  // or capture the app on a device. Left here so the slug is not forgotten.
  // { slug: 'medicta', url: 'https://play.google.com/store/apps/details?id=com.medicta' },
];

const wanted = process.argv.slice(2);
const queue = wanted.length
  ? TARGETS.filter((t) => wanted.includes(t.slug))
  : TARGETS;

if (!queue.length) {
  console.error(
    `No matching slugs. Available: ${TARGETS.map((t) => t.slug).join(', ')}`,
  );
  process.exit(1);
}

const browser = await chromium.launch();
let failures = 0;

for (const target of queue) {
  const out = path.join(PUBLIC_DIR, `${target.slug}.png`);
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    locale: 'ar',
  });
  const page = await context.newPage();

  try {
    await page.goto(target.url, {
      waitUntil: 'networkidle',
      timeout: 60_000,
    });
    // Let fonts settle and any entrance animation finish before capturing.
    await page.waitForTimeout(4000);
    // Dismiss whatever cookie or consent bar is in the way, if there is one.
    await page
      .getByRole('button', { name: /accept|موافق|قبول/i })
      .first()
      .click({ timeout: 2500 })
      .catch(() => {});
    await page.screenshot({ path: out });
    console.log(`captured ${target.slug} -> public/${target.slug}.png`);
  } catch (error) {
    failures += 1;
    console.error(`FAILED ${target.slug}: ${error.message.split('\n')[0]}`);
  } finally {
    await context.close();
  }
}

await browser.close();
process.exit(failures ? 1 : 0);
