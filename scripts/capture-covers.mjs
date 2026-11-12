/**
 * Captures project cover screenshots as WebP, 1920x1000.
 *
 *   node scripts/capture-covers.mjs                 # every project with a live URL, into a review folder
 *   node scripts/capture-covers.mjs bilqalam mada   # just these
 *   node scripts/capture-covers.mjs --out ~/covers mada   # review folder of your choice
 *   node scripts/capture-covers.mjs --write mada    # replace public/covers/mada.webp
 *   node scripts/capture-covers.mjs --list
 *
 * Nothing lands in public/ without --write. The default output is a review
 * folder under the OS temp directory (printed at the start), so a capture can
 * be looked at before it replaces a published cover.
 *
 * Every shot is written to <file>.tmp first and only renamed into place when
 * it passes three checks: the WebP is not suspiciously small, the frame is
 * not mostly one colour (a blank or still-loading page), and the page text
 * does not read as a parked domain, a maintenance page or a bot challenge.
 * A failed check leaves the existing cover alone.
 *
 * Covers live in public/covers/<slug>.webp. Browsers and the image optimiser
 * cache a file for a day under its URL (see "Replacing an image" in the
 * README), so when a published cover is replaced, give the new one a new
 * name (or folder) and update `image` in src/lib/case-studies.js, then run
 * `npm run cover-meta`.
 *
 * Needs puppeteer-core (a devDependency) and a Chrome or Chromium binary: set
 * CHROME_PATH, or have chromium / google-chrome on PATH. Pass --no-sandbox when
 * that browser cannot start its sandbox (containers, some CI images). WebP
 * encoding uses sharp, which ships with Next.
 *
 * Output is the top of the page at deviceScaleFactor 1, so the card reads as
 * a website. Covers should share that shape so the /work grid stays even. Look
 * at each capture before committing it: consent bars, chat bubbles, reCAPTCHA
 * badges and back-to-top buttons are hidden (HIDE_SELECTORS below), but a site
 * can change under us.
 *
 * Projects without a public website (mobile apps, internal tools, ITI and
 * learning projects whose demos are not worth a fresh screenshot) are listed
 * under MANUAL and keep their hand-made covers.
 */
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, rename, rm, stat } from 'node:fs/promises';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const COVERS_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'covers',
);
const REVIEW_DIR = path.join(os.tmpdir(), 'portfolio-covers');

const WIDTH = 1920;
const HEIGHT = 1000;
const QUALITY = 80;
const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';

/**
 * Site chrome that never belongs on a card: chat and WhatsApp widgets, the
 * reCAPTCHA badge, back-to-top buttons and consent bars. The gallery captures
 * hide the same list.
 */
const HIDE_SELECTORS = [
  '.grecaptcha-badge',
  '#chaty-widget', '.chaty', '[class*="chaty"]',
  '.joinchat', '[class*="joinchat"]',
  '#tawkchat-container', '.tawk-min-container', 'iframe[src*="tawk"]',
  '#crisp-chatbox', '.crisp-client',
  '#hubspot-messenger-iframe-container', '#hubspot-messages-iframe-container',
  '#tidio-chat', '.intercom-lightweight-app', 'iframe[title*="chat" i]',
  '.fb_dialog', '.fb-customerchat',
  '[class*="whatsapp" i]', '[id*="whatsapp" i]', '.wa-float', '#wa-widget',
  '[class*="back-to-top" i]', '[id*="back-to-top" i]', '[class*="backtotop" i]',
  '[class*="scroll-top" i]', '[class*="scrolltop" i]', '[class*="scroll-to-top" i]',
  '[aria-label*="back to top" i]', '[aria-label*="scroll to top" i]',
  '#cookie-notice', '.cookie-notice', '#CybotCookiebotDialog', '.cc-window',
  '.cky-consent-container', '#onetrust-banner-sdk', '[id*="cookie-banner" i]', '[class*="cookie-banner" i]',
];
const COMMON_CSS = `${HIDE_SELECTORS.join(',\n')} { display: none !important; visibility: hidden !important; }`;

/**
 * Pages that must never become a cover. PARKED is copied from
 * scripts/check-live-links.mjs; the rest catches maintenance pages, CDN bot
 * challenges and hosting error pages that still answer 200.
 */
const PARKED =
  /domain (?:name )?(?:is|may be) for sale|buy this domain|this domain has expired|domain has been registered|parked (?:free|domain)|sedoparking|afternic|hugedomains|dan\.com\/buy/i;
const NOT_A_SITE =
  /under maintenance|maintenance mode|be right back|temporarily unavailable|site is currently unavailable|checking your browser|verify you are human|just a moment\.\.\.|attention required|enable javascript and cookies to continue|ddos protection by|merchant not found|deployment not found|application error|404: not found|this page could not be found/i;

/** Below this a 1920x1000 WebP is almost certainly a blank or broken page. */
const MIN_BYTES = 15_000;
/** Share of the frame one colour may cover before it reads as blank. */
const MAX_FLAT = 0.9;

/**
 * Hides small fixed widgets parked in a bottom corner: WhatsApp and phone
 * bubbles, chat launchers, back-to-top buttons. They are not part of the design
 * and read as noise on a card.
 */
const hideFloatingWidgets = () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  for (const el of document.querySelectorAll('body *')) {
    const style = getComputedStyle(el);
    if (style.position !== 'fixed' && style.position !== 'sticky') continue;
    const r = el.getBoundingClientRect();
    const small = r.width > 0 && r.width < 360 && r.height < 360;
    const inCorner = r.top > vh * 0.5 && (r.left < vw * 0.25 || r.right > vw * 0.75);
    if (small && inCorner) el.style.setProperty('display', 'none', 'important');
  }
};

/**
 * slug: the case-studies.js key; the cover is public/covers/<slug>.webp.
 * Optional per target:
 *   css         extra CSS, usually to hide something
 *   wait        settle time in ms before the shot (default 4000)
 *   colorScheme 'dark' or 'light' for prefers-color-scheme (default light)
 *   clickText   exact text (or aria-label or title) of a button or link to click
 *               first, e.g. a language switch when the site has no
 *               per-language URL
 *   ready       CSS selector that must appear, so a page stuck on its loading
 *               spinner fails instead of overwriting a good cover
 *   heroBottom  function run in the page that returns where the hero ends
 *               (document y, px). When that is above the bottom of the
 *               frame, the page is captured at a smaller viewport and a
 *               higher deviceScaleFactor, so the hero fills all 1000 rows
 *               instead of leaving a strip of the next section
 */
const TARGETS = [
  { slug: 'oxgym', url: 'https://oxgym-eg.com/' },
  { slug: 'opptmakers', url: 'https://opptmakers.cloud/login' },
  { slug: 'opptmakers-platforms', url: 'https://platforms.opptmakers.cloud/login' },
  { slug: 'bilqalam', url: 'https://bilqalaminstitute.net/' },
  {
    slug: 'indstrz',
    url: 'https://indstrz.com/ar',
    wait: 7000,
    // The "LIVE" activity ticker above the header ("User logged in via Google")
    // and the toast stack are live site chrome, not the design.
    css: 'header div[class*="bg-[#111]"][class*="overflow-hidden"], #_rht_toaster { display: none !important; }',
    heroBottom: () => {
      const hero = document.querySelector('main section, section');
      return hero ? hero.getBoundingClientRect().bottom + window.scrollY : 0;
    },
  },
  { slug: 'profleet', url: 'https://pro-fleet.vercel.app/ar' },
  { slug: 'toyo228', url: 'https://toyo228.com/en' },
  { slug: 'injaz', url: 'https://lms-injaz.com/' },
  { slug: 'hcholding', url: 'https://lms-hcholding.org/' },
  { slug: 'mada', url: 'https://mada-education.com/' },
  { slug: 'mutlq', url: 'https://mutlq.org/' },
  {
    slug: 'waferlee',
    url: 'https://waferlee.ae',
    colorScheme: 'dark',
    css: 'canvas { display: none !important; }',
    // The deal cards under the search bar are test listings, so the frame
    // ends just above them: welcome hero, search and filters only.
    heroBottom: () => {
      const label = [...document.querySelectorAll('body *')].find(
        (el) => el.children.length === 0 && /^Showing \d+ deals?$/.test(el.textContent.trim()),
      );
      return label ? label.getBoundingClientRect().top + window.scrollY - 16 : 0;
    },
  },
  { slug: 'baserah', url: 'https://baserah.ai/', clickText: 'العربية' },
  { slug: 'sf_portal', url: 'https://smart-fast.com/' },
  { slug: 'journal', url: 'https://upafa-edu.net/', wait: 6000 },
  { slug: 'manqla', url: 'https://www.manqla.com/' },
  { slug: 'orca', url: 'https://orcastore.vercel.app/', ready: 'main img' },
  // The Arabic site: the case study is about the RTL build.
  {
    slug: 'amarna',
    url: 'https://amarnatravel.com/ar/',
    locale: 'ar',
    heroBottom: () => {
      const title = [...document.querySelectorAll('h1, h2')].find((h) => h.textContent.includes('Amarna Group'));
      const hero = title?.closest('.elementor-top-section, .e-con.e-parent, section');
      return hero ? hero.getBoundingClientRect().bottom + window.scrollY : 0;
    },
  },
  { slug: 'sonomedix', url: 'https://sonomedix.cloud/' },
  { slug: 'nextstop', url: 'https://next-stop-project-nine.vercel.app/' },
  { slug: 'kmbc', url: 'https://www.kmbc-kw.com/' },
  { slug: 'rabzan', url: 'https://www.rabzan.com/' },
  { slug: 'sems', url: 'https://sems-project.vercel.app/' },
  { slug: 'quotemate', url: 'https://quote-mateapp.vercel.app/', clickText: 'العربية' },
  // Arabic, dark: the same look as its gallery.
  { slug: 'dmagni', url: 'https://dmagni-project.vercel.app/', colorScheme: 'dark', clickText: 'العربية' },
  { slug: 'cme', url: 'https://cmehours.online/' },
  { slug: 'dpms', url: 'https://dpms-rust.vercel.app/' },
];

/** No public website to capture; these keep their hand-made covers. */
const MANUAL = [
  { slug: 'medicta', note: 'Android app: cover composed from emulator screens' },
  { slug: 'uduipa', note: 'no public URL' },
  { slug: 'motors', note: 'no public URL' },
  { slug: 'alva_ai', note: 'no public URL' },
  { slug: 'clinic', note: 'ITI project' },
  { slug: 'inventory', note: 'ITI project, no public URL' },
  { slug: 'cinemascore', note: 'ITI project' },
  { slug: 'movieweb', note: 'learning project' },
  { slug: 'hms_odoo', note: 'ITI project, no public URL' },
  { slug: 'bookstore', note: 'ITI project' },
  { slug: 'library', note: 'learning project, no public URL' },
];

const args = process.argv.slice(2);

if (args.includes('--list')) {
  const width = 22;
  console.log('LIVE');
  TARGETS.forEach((t) => console.log(`  ${t.slug.padEnd(width)}${t.url}`));
  console.log('\nMANUAL (no public website, keep the existing cover)');
  MANUAL.forEach((t) => console.log(`  ${t.slug.padEnd(width)}${t.note}`));
  process.exit(0);
}

const outIndex = args.indexOf('--out');
const write = args.includes('--write');
if (write && outIndex !== -1) {
  console.error('Pass either --write (public/covers/) or --out <dir>, not both.');
  process.exit(1);
}
const outDir = write ? COVERS_DIR : outIndex === -1 ? REVIEW_DIR : path.resolve(args[outIndex + 1]);
const slugs = args.filter(
  (a, i) => !a.startsWith('--') && !(outIndex !== -1 && i === outIndex + 1),
);
const queue = slugs.length ? TARGETS.filter((t) => slugs.includes(t.slug)) : TARGETS;

if (!queue.length) {
  console.error('Nothing matched. Run with --list to see available slugs.');
  process.exit(1);
}

const findChrome = () => {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  for (const bin of ['chromium', 'chromium-browser', 'google-chrome']) {
    try {
      return execSync(`command -v ${bin}`, { encoding: 'utf8' }).trim();
    } catch {
      /* keep looking */
    }
  }
  return null;
};

const executablePath = findChrome();
if (!executablePath) {
  console.error('No browser found. Set CHROME_PATH to a Chrome or Chromium binary.');
  process.exit(1);
}

const { default: puppeteer } = await import('puppeteer-core');
const { default: sharp } = await import('sharp');

/** Throws when a finished capture looks like anything but a real page. */
const checkCapture = async (file, pageText) => {
  if (PARKED.test(pageText)) throw new Error('page reads as a parked or for-sale domain');
  const notASite = pageText.match(NOT_A_SITE);
  if (notASite) throw new Error(`page reads as an error, maintenance or bot-check page ("${notASite[0]}")`);

  const { size } = await stat(file);
  if (size < MIN_BYTES) throw new Error(`only ${size} bytes, probably blank`);

  // Bucket a thumbnail's pixels by colour; one bucket covering most of the
  // frame means a blank page, a full-screen loader or an error splash.
  const { data, info } = await sharp(file).resize(96, 50, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const buckets = new Map();
  for (let i = 0; i < data.length; i += info.channels) {
    const key = `${data[i] >> 4},${data[i + 1] >> 4},${data[i + 2] >> 4}`;
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  const flat = Math.max(...buckets.values()) / (info.width * info.height);
  if (flat > MAX_FLAT) throw new Error(`${Math.round(flat * 100)}% of the frame is one colour, probably blank`);
};

await mkdir(outDir, { recursive: true });
console.log(`Capturing ${queue.length} cover(s) at ${WIDTH}x${HEIGHT} into ${outDir}`);
if (!write) console.log('Review them there; rerun with --write to replace the files in public/covers/.');
console.log('');

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: [...(args.includes('--no-sandbox') ? ['--no-sandbox'] : []), '--hide-scrollbars'],
});
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let failures = 0;

/** Loads the page and gets it ready for the shot; returns the page's visible text. */
const prepare = async (page, target) => {
  const response = await page.goto(target.url, { waitUntil: 'networkidle2', timeout: 60_000 });
  if (response && response.status() >= 400) {
    throw new Error(`HTTP ${response.status()}`);
  }

  if (target.ready) {
    await page
      .waitForSelector(target.ready, { visible: true, timeout: 30_000 })
      .catch(() => {
        throw new Error(`never showed "${target.ready}" (still loading?)`);
      });
  }

  if (target.clickText) {
    const clicked = await page.evaluate((text) => {
      const el = [...document.querySelectorAll('button, a')].find(
        (node) =>
          [node.textContent.trim(), node.getAttribute('aria-label'), node.getAttribute('title')].includes(text) &&
          node.getBoundingClientRect().width > 0,
      );
      el?.click();
      return Boolean(el);
    }, target.clickText);
    if (!clicked) throw new Error(`nothing to click labelled "${target.clickText}"`);
    await page.waitForNetworkIdle({ idleTime: 800, timeout: 20_000 }).catch(() => {});
    await sleep(1500);
  }

  // Nudge lazy images and scroll-triggered animations, then come back up.
  await page.evaluate(() => window.scrollTo(0, 600));
  await sleep(800);
  await page.evaluate(() => window.scrollTo(0, 0));

  // Clear a cookie or consent bar if one is covering the hero.
  await page.evaluate(() => {
    const label = /^(accept|accept all|agree|i agree|got it|ok|allow all|موافق|قبول|أوافق)$/i;
    const button = [...document.querySelectorAll('button, a[role="button"]')].find((el) =>
      label.test(el.textContent.trim()),
    );
    button?.click();
  });
  await page.addStyleTag({ content: COMMON_CSS + (target.css ?? '') });

  // Let webfonts, sliders and entrance animations settle.
  await sleep(target.wait ?? 4000);
  await page.evaluate(hideFloatingWidgets);
  await sleep(300);
  return page.evaluate(() => document.body?.innerText ?? '');
};

for (const target of queue) {
  const out = path.join(outDir, `${target.slug}.webp`);
  const tmp = `${out}.tmp`;
  const context = await browser.createBrowserContext();
  const page = await context.newPage();

  try {
    await page.setUserAgent(USER_AGENT);
    await page.setExtraHTTPHeaders({ 'Accept-Language': target.locale ?? 'ar,en;q=0.8' });
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
    await page.emulateMediaFeatures([
      { name: 'prefers-color-scheme', value: target.colorScheme ?? 'light' },
    ]);

    let text = await prepare(page, target);

    if (target.heroBottom) {
      // A narrower, shorter viewport at a higher pixel ratio, so the hero
      // fills the frame and the output is still 1920 pixels wide. The layout
      // reflows at the new width, so measure again until the hero fits.
      for (let pass = 0; pass < 3; pass += 1) {
        const bottom = await page.evaluate(target.heroBottom);
        const { height } = page.viewport();
        if (bottom < 400 || Math.abs(bottom - height) < 8) break;
        const width = Math.round((bottom * WIDTH) / HEIGHT);
        await page.setViewport({ width, height: Math.round(bottom), deviceScaleFactor: WIDTH / width });
        text = await prepare(page, target);
      }
    }

    const png = await page.screenshot({ type: 'png' });
    await sharp(png).resize(WIDTH, HEIGHT, { fit: 'cover', position: 'top' }).webp({ quality: QUALITY }).toFile(tmp);
    await checkCapture(tmp, text);
    await rename(tmp, out);
    console.log(`  ok      ${target.slug.padEnd(22)} -> ${out}`);
  } catch (error) {
    failures += 1;
    await rm(tmp, { force: true });
    console.error(`  FAILED  ${target.slug.padEnd(22)} ${error.message.split('\n')[0]}`);
  } finally {
    await context.close();
  }
}

await browser.close();
console.log(`\nDone. ${queue.length - failures} captured, ${failures} failed.`);
process.exit(failures ? 1 : 0);
