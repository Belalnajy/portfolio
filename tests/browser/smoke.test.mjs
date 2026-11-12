// Headless-Chrome smoke test against a running production server. Covers the
// failures that only show up in a real browser: hydration errors under a
// non-UTC timezone, a browser that blocks storage, and the language switch.
//
//   npm run build && npx next start -p 3000 &
//   npm run test:browser          # BASE_URL (default http://127.0.0.1:3000), CHROME_PATH
//
// Skipped on a developer machine when there is no server or no Chrome to
// drive, but a failure in CI, where skipping everything would pass vacuously.
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

const BASE = (process.env.BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
const CHROME = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find((candidate) => candidate && existsSync(candidate));

const puppeteer = await import('puppeteer-core').then((mod) => mod.default, () => null);
const up = await fetch(`${BASE}/robots.txt`).then((res) => res.ok, () => false);
const skip = !up ? `no server at ${BASE}` : !puppeteer ? 'puppeteer-core not installed' : !CHROME ? 'no Chrome found' : false;

if (skip && process.env.CI) throw new Error(`Browser smoke test cannot run in CI: ${skip}.`);

const browser = skip ? null : await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
test.after(() => browser?.close());

const settle = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Opens `path` in a fresh profile. `errors` collects uncaught exceptions and
 * console errors (hydration mismatches surface as both).
 */
const open = async (path, { timezone, language, storage = {}, blockStorage = false, mobile = false } = {}) => {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  if (mobile) await page.setViewport({ width: 390, height: 800, isMobile: true });
  const errors = [];
  // Nothing is ignored. The analytics script is only rendered on Vercel, so
  // the console is clean here, and an abandoned cross-document view
  // transition ("Transition was aborted") is handled by the page itself
  // (VIEW_TRANSITION_GUARD in src/components/RootDocument.jsx).
  const record = (text) => errors.push(text);
  page.on('pageerror', (error) => record(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') record(message.text());
  });
  if (timezone) await page.emulateTimezone(timezone);
  await page.evaluateOnNewDocument(
    (language, storage, blockStorage) => {
      if (language) Object.defineProperty(navigator, 'language', { get: () => language });
      if (blockStorage) {
        Object.defineProperty(window, 'localStorage', {
          get() {
            throw new DOMException('The operation is insecure.', 'SecurityError');
          },
        });
        return;
      }
      // Seed once per tab, so a value the page writes later is not overwritten.
      if (!sessionStorage.getItem('__seeded')) {
        for (const [key, value] of Object.entries(storage)) localStorage.setItem(key, value);
        sessionStorage.setItem('__seeded', '1');
      }
    },
    language,
    storage,
    blockStorage,
  );
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle2' });
  await settle();
  return { page, errors, close: () => context.close() };
};

const state = (page) =>
  page.evaluate(() => ({
    url: location.pathname + location.search + location.hash,
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    title: document.title,
    canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href') ?? null,
    h1: document.querySelector('h1')?.innerText ?? null,
    choice: (() => {
      try {
        return localStorage.getItem('lang-choice');
      } catch {
        return 'blocked';
      }
    })(),
  }));

const ARABIC = /[؀-ۿ]/;

/** Asserts the whole document is in one language: URL, <html>, title, canonical, heading. */
const assertLanguage = (snapshot, language, label) => {
  const arabic = language === 'ar';
  assert.equal(/^\/ar(\/|$|\?|#)/.test(snapshot.url), arabic, `${label}: URL ${snapshot.url}`);
  assert.equal(snapshot.lang, language, `${label}: <html lang>`);
  assert.equal(snapshot.dir, arabic ? 'rtl' : 'ltr', `${label}: <html dir>`);
  assert.equal(ARABIC.test(snapshot.title), arabic, `${label}: title "${snapshot.title}"`);
  assert.equal(/\/ar(\/|$)/.test(snapshot.canonical ?? ''), arabic, `${label}: canonical ${snapshot.canonical}`);
  assert.equal(ARABIC.test(snapshot.h1 ?? ''), arabic, `${label}: h1 "${snapshot.h1}"`);
};

const pressLanguageSwitch = async (page, target) => {
  // LanguageToggle marks the button with the language it switches TO.
  const button = await page.$(`button[lang="${target}"]`);
  assert.ok(button, `no switch to ${target} on ${page.url()}`);
  await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), button.evaluate((el) => el.click())]);
  await settle();
};

test('blog dates hydrate cleanly west of UTC', { skip }, async () => {
  for (const path of ['/blog', '/ar/blog', '/blog/legacy-takeover-playbook', '/cv', '/testimonials']) {
    const { errors, close } = await open(path, { timezone: 'America/Los_Angeles' });
    await close();
    assert.deepEqual(errors, [], path);
  }
});

test('a browser that blocks localStorage still gets the page', { skip }, async () => {
  for (const path of ['/', '/ar', '/work', '/case-study/oxgym']) {
    const { page, errors, close } = await open(path, { blockStorage: true });
    const snapshot = await state(page);
    await close();
    assert.deepEqual(errors, [], path);
    assert.ok(snapshot.h1 && !/couldn.t load|went wrong/i.test(snapshot.h1), `${path}: h1 "${snapshot.h1}"`);
  }
});

test('the language switch navigates to the twin page, keeping query and hash', { skip }, async () => {
  const cases = [
    ['/', '/ar'],
    ['/services', '/ar/services'],
    ['/work?utm_source=x#projects', '/ar/work?utm_source=x#projects'],
    ['/case-study/oxgym', '/ar/case-study/oxgym'],
    ['/blog/legacy-takeover-playbook', '/ar/blog/legacy-takeover-playbook'],
    ['/cv', '/ar/cv'],
  ];
  for (const [english, arabic] of cases) {
    const { page, errors, close } = await open(english, { mobile: true });
    assertLanguage(await state(page), 'en', english);

    await pressLanguageSwitch(page, 'ar');
    let snapshot = await state(page);
    assert.equal(snapshot.url, arabic, `${english} -> ar`);
    assertLanguage(snapshot, 'ar', `${english} -> ar`);
    assert.equal(snapshot.choice, 'ar');

    await pressLanguageSwitch(page, 'en');
    snapshot = await state(page);
    assert.equal(snapshot.url, english, `${arabic} -> en`);
    assertLanguage(snapshot, 'en', `${arabic} -> en`);
    assert.equal(snapshot.choice, 'en');

    // Two real navigations, so Back walks through them.
    await page.goBack({ waitUntil: 'networkidle2' });
    await settle();
    assert.equal((await state(page)).url, arabic, `back from ${english}`);
    await close();
    assert.deepEqual(errors, [], english);
  }
});

test('sections that used to stay in the route language switch too', { skip }, async () => {
  const { page, close } = await open('/ar', { mobile: true });
  await pressLanguageSwitch(page, 'en');
  assert.equal(ARABIC.test(await page.$eval('#faq', (el) => el.innerText)), false, 'home FAQ is English after switching');
  await close();

  const cv = await open('/cv', { mobile: true });
  await pressLanguageSwitch(cv.page, 'ar');
  const text = await cv.page.$eval('article', (el) => el.innerText);
  const arabicLetters = (text.match(/[؀-ۿ]/g) ?? []).length;
  const latinLetters = (text.match(/[A-Za-z]/g) ?? []).length;
  await cv.close();
  assert.ok(arabicLetters > latinLetters, `CV body after switching: ${arabicLetters} Arabic vs ${latinLetters} Latin letters`);
});

test('the URL decides the language; preferences never override a followed link', { skip }, async () => {
  // A leftover value from the old auto-detecting code, and an explicit English choice.
  for (const storage of [{ i18nextLng: 'en' }, { 'lang-choice': 'en' }]) {
    const { page, close } = await open('/ar/case-study/oxgym?ref=li', { storage });
    const snapshot = await state(page);
    await close();
    assert.equal(snapshot.url, '/ar/case-study/oxgym?ref=li');
    assertLanguage(snapshot, 'ar', JSON.stringify(storage));
  }
  // An explicit Arabic choice does not touch an English deep link either.
  const deep = await open('/work?utm_source=x', { storage: { 'lang-choice': 'ar' } });
  const deepState = await state(deep.page);
  await deep.close();
  assert.equal(deepState.url, '/work?utm_source=x');
  assertLanguage(deepState, 'en', 'stored ar on /work');
});

test('an Arabic browser on the home page is not redirected and nothing is stored', { skip }, async () => {
  const { page, close } = await open('/', { language: 'ar-EG' });
  const snapshot = await state(page);
  await close();
  assert.equal(snapshot.url, '/');
  assertLanguage(snapshot, 'en', 'ar-EG on /');
  assert.equal(snapshot.choice, null);
});

test('only an explicit Arabic choice takes the bare home page to /ar', { skip }, async () => {
  const { page, close } = await open('/?utm_source=x#contact', { storage: { 'lang-choice': 'ar' } });
  const snapshot = await state(page);
  await close();
  assert.equal(snapshot.url, '/ar?utm_source=x#contact');
  assertLanguage(snapshot, 'ar', 'stored ar on /');
});

test('a miss under /ar ends up as an Arabic document, an English miss stays English', { skip }, async () => {
  // The document 404 itself logs a console error; only uncaught exceptions count here.
  const arabic = await open('/ar/no-such-page', { storage: { mode: 'light' } });
  const snapshot = await state(arabic.page);
  const details = await arabic.page.evaluate(() => ({
    theme: document.documentElement.getAttribute('data-theme'),
    home: document.querySelector('main a')?.getAttribute('href'),
  }));
  await arabic.close();
  assert.equal(snapshot.lang, 'ar');
  assert.equal(snapshot.dir, 'rtl');
  assert.ok(snapshot.h1, 'the 404 renders a heading');
  assert.match(snapshot.title, /^Page not found/, 'the title does not change after hydration');
  assert.equal(details.theme, 'light', 'the stored theme applies on the 404 too');
  assert.equal(details.home, '/ar/', 'links point into the Arabic tree');

  const english = await open('/no-such-page');
  const englishState = await state(english.page);
  const englishHome = await english.page.evaluate(() => document.querySelector('main a')?.getAttribute('href'));
  await english.close();
  assert.equal(englishState.lang, 'en');
  assert.equal(englishState.dir, 'ltr');
  assert.equal(englishHome, '/');
});

test('coming home from inside the site never changes the language', { skip }, async () => {
  // Explicit Arabic choice, then reading an English page and clicking "Home".
  const { page, close } = await open('/work', { storage: { 'lang-choice': 'ar' }, mobile: true });
  const home = await page.$('nav a[href="/"]');
  assert.ok(home, 'a home link in the navigation');
  await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), home.evaluate((el) => el.click())]);
  await settle();
  const snapshot = await state(page);
  await close();
  assert.equal(snapshot.url, '/');
  assertLanguage(snapshot, 'en', 'home from /work with stored ar');
});

test('no page violates the Content-Security-Policy', { skip }, async () => {
  for (const path of ['/', '/ar/work', '/services', '/case-study/medicta', '/blog/legacy-takeover-playbook']) {
    const { errors, close } = await open(path);
    await close();
    assert.deepEqual(errors.filter((error) => /Content Security Policy/i.test(error)), [], path);
  }
});

test('a view transition the browser abandons is not an uncaught error', { skip }, async () => {
  // When the browser abandons the cross-document fade (the viewport resizes
  // mid-fade, as a phone's address bar does; the tab is hidden), the
  // transition's promises reject. Unhandled, that surfaces as an uncaught
  // "Transition was aborted"/"skipped" error. A real resize only sometimes
  // lands inside the fade, so the test abandons the transition itself: in the
  // new page's `pagereveal` it skips the transition, which rejects `ready`
  // every time. Its listener is registered before the page's own, as early as
  // anything can be; the page's guard runs next in the same event and handles
  // the rejection. Without VIEW_TRANSITION_GUARD (RootDocument.jsx) this test
  // fails with "AbortError: Transition was skipped" (checked: 3/3 red with the
  // guard's listeners removed, 3/3 green with them).
  const { page, errors, close } = await open('/work');
  await page.evaluateOnNewDocument(() => {
    window.addEventListener('pagereveal', (event) => {
      const transition = event.viewTransition;
      if (!transition) return;
      transition.skipTransition();
      window.__skipped = true;
    });
  });
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle2' }),
    page.evaluate(() => [...document.querySelectorAll('a')].find((a) => a.getAttribute('href') === '/services').click()),
  ]);
  await settle();
  const skipped = await page.evaluate(() => window.__skipped === true);
  await close();
  assert.ok(skipped, 'the navigation ran a view transition, and the test skipped it');
  assert.deepEqual(errors, []);
});

// Keyboard paths that broke silently before (stage 4 of the accessibility
// fixes): they look fine with a mouse, so only a keyboard walk catches them.

test('the skip link is the first stop and moves focus to the page content', { skip }, async () => {
  const { page, errors, close } = await open('/');
  await page.keyboard.press('Tab');
  const first = await page.evaluate(() => document.activeElement.getAttribute('href'));
  await page.keyboard.press('Enter');
  await settle(300);
  const focused = await page.evaluate(() => document.activeElement.id);
  await close();
  assert.equal(first, '#main', 'first Tab stop');
  assert.equal(focused, 'main', 'focus after the skip link');
  assert.deepEqual(errors, []);
});

test('archive cards on /work open by keyboard, and focus comes back on Escape', { skip }, async () => {
  const { page, errors, close } = await open('/work');
  // The archive toggle (the industry buttons are aria-pressed, not aria-expanded).
  const toggle = 'button[aria-expanded][aria-controls="project-results"]';
  await page.focus(toggle);
  await page.keyboard.press('Enter');
  await settle(1200);
  const card = await page.evaluate(() => {
    const el = document.activeElement;
    return { tag: el.tagName, inGrid: Boolean(el.closest('#project-results')), name: el.textContent.trim() };
  });
  await page.keyboard.press('Enter');
  await settle(900);
  const dialog = await page.evaluate(() => ({
    open: Boolean(document.querySelector('[role="dialog"]')),
    focusInside: Boolean(document.activeElement.closest('[role="dialog"]')),
    pageInert: Boolean(document.querySelector('main')?.closest('[inert]')),
  }));
  await page.keyboard.press('Escape');
  await settle(900);
  const back = await page.evaluate(() => ({
    name: document.activeElement.textContent.trim(),
    pageInert: Boolean(document.querySelector('main')?.closest('[inert]')),
    anyInert: document.querySelectorAll('[inert]').length,
  }));
  await close();
  assert.equal(card.tag, 'BUTTON', 'expanding the archive focuses the first card');
  assert.ok(card.inGrid && card.name, 'a named card button inside the results');
  assert.deepEqual(dialog, { open: true, focusInside: true, pageInert: true });
  assert.equal(back.name, card.name, 'focus returns to the card that opened the sheet');
  assert.equal(back.pageInert, false, 'the page is live again after Escape');
  assert.equal(back.anyInert, 0, 'nothing is left inert after Escape');
  assert.deepEqual(errors, []);
});

// The menu button names the menu in aria-controls only while it is mounted.
const MENU_BUTTON = '#site-menu-button';

const openPhoneMenu = async (page) => {
  await page.focus(MENU_BUTTON);
  await page.keyboard.press('Enter');
  await settle(800);
};

test('the phone menu reports its state, closes on Escape and returns focus', { skip }, async () => {
  const { page, errors, close } = await open('/ar', { mobile: true });
  const before = await page.$eval(MENU_BUTTON, (el) => el.getAttribute('aria-controls'));
  await openPhoneMenu(page);
  const opened = await page.$eval(MENU_BUTTON, (el) => ({
    expanded: el.getAttribute('aria-expanded'),
    controls: el.getAttribute('aria-controls'),
  }));
  const menu = Boolean(await page.$('#site-menu'));
  await page.keyboard.press('Escape');
  await settle(600);
  const after = await page.evaluate((selector) => ({
    expanded: document.querySelector(selector).getAttribute('aria-expanded'),
    controls: document.querySelector(selector).getAttribute('aria-controls'),
    menu: Boolean(document.querySelector('#site-menu')),
    focusOnButton: document.activeElement === document.querySelector(selector),
  }), MENU_BUTTON);
  await close();
  assert.equal(before, null, 'no aria-controls while the menu is not mounted');
  assert.deepEqual(opened, { expanded: 'true', controls: 'site-menu' });
  assert.ok(menu, 'the menu rendered');
  assert.deepEqual(after, { expanded: 'false', controls: null, menu: false, focusOnButton: true });
  assert.deepEqual(errors, []);
});

test('Tab past the last item of the phone menu closes it instead of walking behind it', { skip }, async () => {
  const { page, errors, close } = await open('/', { mobile: true });
  await openPhoneMenu(page);
  // Focus the menu's last control, then Tab once more.
  await page.$eval('#site-menu', (menu) => {
    const controls = menu.querySelectorAll('a[href], button');
    controls[controls.length - 1].focus();
  });
  await page.keyboard.press('Tab');
  await settle(600);
  const after = await page.evaluate((selector) => ({
    menu: Boolean(document.querySelector('#site-menu')),
    expanded: document.querySelector(selector).getAttribute('aria-expanded'),
    focusInHeader: Boolean(document.activeElement.closest('header')),
  }), MENU_BUTTON);
  await close();
  assert.deepEqual(after, { menu: false, expanded: 'false', focusInHeader: false });
  assert.deepEqual(errors, []);
});

test('one Escape closes only the topmost layer: the palette, not the menu under it', { skip }, async () => {
  const { page, errors, close } = await open('/', { mobile: true });
  await openPhoneMenu(page);
  await page.keyboard.down('Control');
  await page.keyboard.press('k');
  await page.keyboard.up('Control');
  await settle(600);
  const palette = await page.evaluate(() => Boolean(document.querySelector('[aria-controls="cmdk-results"]')));
  await page.keyboard.press('Escape');
  await settle(600);
  const once = await page.evaluate(() => ({
    palette: Boolean(document.querySelector('[aria-controls="cmdk-results"]')),
    menu: Boolean(document.querySelector('#site-menu')),
    // The menu button had focus before Ctrl+K; it must get it back.
    focusInHeader: Boolean(document.activeElement.closest('header')),
  }));
  await page.keyboard.press('Escape');
  await settle(600);
  const twice = await page.evaluate(() => Boolean(document.querySelector('#site-menu')));
  await close();
  assert.ok(palette, 'the palette opened over the menu');
  assert.deepEqual(once, { palette: false, menu: true, focusInHeader: true }, 'first Escape closes the palette only and focus returns to the header');
  assert.equal(twice, false, 'second Escape closes the menu');
  assert.deepEqual(errors, []);
});
