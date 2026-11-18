// Reactions and comments in a real browser, end to end: a reaction toggles
// and survives a reload, a comment is accepted as pending, the owner approves
// it on /admin/comments, and the approved comment shows as inert plain text.
//
// These write data, so they only run against a server on the in-memory store
// (`next dev` with no Redis configured), never against production:
//
//   npx next dev -p 3000 &
//   BASE_URL=http://localhost:3000 node --test tests/browser/engage.test.mjs
//
// (localhost, not 127.0.0.1: `next dev` refuses its scripts to other hosts.)
//
// Against any other server (feature off, or real Redis) they are skipped.
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

const BASE = (process.env.BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
const PASSWORD = process.env.COMMENTS_SECRET || 'development-only-comments-secret';
const CHROME = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find((candidate) => candidate && existsSync(candidate));

const puppeteer = await import('puppeteer-core').then((mod) => mod.default, () => null);
const store = await fetch(`${BASE}/api/engage?target=case:oxgym`).then((res) => res.headers.get('x-engage-store'), () => null);
const skip = store !== 'memory' ? `no in-memory comments backend at ${BASE}` : !puppeteer || !CHROME ? 'no Chrome' : false;

const browser = skip ? null : await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
test.after(() => browser?.close());

const settle = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const TARGET = 'case:oxgym';

/** Opens the case study and scrolls until the block has loaded. */
const openThread = async (page) => {
  await page.goto(`${BASE}/case-study/oxgym`, { waitUntil: 'networkidle2' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForSelector(`section[data-engage="${TARGET}"]`, { timeout: 15000 });
};

const fire = (page) =>
  page.evaluate((target) => {
    const button = [...document.querySelectorAll(`section[data-engage="${target}"] [role=group] button`)].find((b) =>
      b.getAttribute('aria-label').startsWith('Fire'),
    );
    return { pressed: button.getAttribute('aria-pressed'), label: button.getAttribute('aria-label') };
  }, TARGET);

test('a reaction toggles, and is still on after a reload', { skip }, async () => {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await openThread(page);
  const before = await fire(page);
  await page.evaluate((target) => {
    [...document.querySelectorAll(`section[data-engage="${target}"] [role=group] button`)]
      .find((b) => b.getAttribute('aria-label').startsWith('Fire'))
      .click();
  }, TARGET);
  await settle(800);
  const after = await fire(page);
  await openThread(page);
  const reloaded = await fire(page);
  await context.close();
  const count = (state) => Number(state.label.split(', ')[1]);
  assert.equal(before.pressed, 'false');
  assert.equal(after.pressed, 'true');
  assert.equal(count(after), count(before) + 1);
  assert.deepEqual(reloaded, after, 'the same visitor sees the same state after a reload');
});

test('a double tap on one reaction counts once', { skip }, async () => {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await openThread(page);
  const label = (key) => `section[data-engage="${TARGET}"] [role=group] button:nth-child(${key})`;
  const read = () => page.$eval(label(1), (b) => ({ pressed: b.getAttribute('aria-pressed'), label: b.getAttribute('aria-label') }));
  const before = await read();
  // Two presses inside one request: the second waits out the first, so the
  // button ends pressed with one more, not toggled back.
  await page.$eval(label(1), (b) => {
    b.click();
    b.click();
  });
  await settle(1200);
  const after = await read();
  await openThread(page);
  const reloaded = await read();
  await context.close();
  const count = (state) => Number(state.label.split(', ')[1]);
  assert.equal(before.pressed, 'false');
  assert.equal(after.pressed, 'true');
  assert.equal(count(after), count(before) + 1);
  assert.deepEqual(reloaded, after);
});

test('a comment waits for approval, then shows as plain text', { skip }, async () => {
  const payload = `Nice <img src=x onerror="window.__xss=1"> work ${Date.now()}`;
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await openThread(page);
  await page.type(`section[data-engage="${TARGET}"] input[name=name]`, 'Test Reader');
  await page.type(`section[data-engage="${TARGET}"] textarea[name=text]`, payload);
  await settle(3200); // the form refuses (silently) anything sent in under 3 s
  await page.click(`section[data-engage="${TARGET}"] button[type=submit]`);
  await page.waitForFunction(
    (target) => /appear after review/.test(document.querySelector(`section[data-engage="${target}"] form [role=status]`)?.textContent ?? ''),
    { timeout: 8000 },
    TARGET,
  );
  // Not public yet: ask the API itself (the page would only show what it already had).
  const before = await fetch(`${BASE}/api/engage?target=${TARGET}&page=1`).then((res) => res.json());
  const pendingShown = before.comments.some((comment) => comment.text === payload);

  // The owner approves it.
  await page.goto(`${BASE}/admin/comments`, { waitUntil: 'networkidle2' });
  await page.type('#password', PASSWORD);
  await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.click('button[type=submit]')]);
  const approved = await page.evaluate((text) => {
    const card = [...document.querySelectorAll('article')].find((a) => a.textContent.includes(text));
    card?.querySelector('button[type=submit]').click();
    return Boolean(card);
  }, payload);
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  await openThread(page);
  await page.waitForFunction((text) => document.body.innerText.includes(text), { timeout: 8000 }, payload);
  const shown = await page.evaluate((target) => {
    const section = document.querySelector(`section[data-engage="${target}"]`);
    return { images: section.querySelectorAll('img').length, xss: window.__xss === 1 };
  }, TARGET);
  await context.close();
  assert.equal(pendingShown, false, 'not shown before approval');
  assert.ok(approved, 'listed on /admin/comments');
  assert.deepEqual(shown, { images: 0, xss: false }, 'the markup in the comment is text, not an element');
});

test('a reaction from a /work row is the same reaction on the case study', { skip }, async () => {
  const SLUG = 'toyo228';
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/work`, { waitUntil: 'networkidle2' });
  // The row's strip: the article that links to the case study.
  const strip = `article:has(a[href="/case-study/${SLUG}"]) [aria-expanded]`;
  await page.$eval(strip, (el) => el.scrollIntoView({ block: 'center' }));
  // The counts have arrived when the comments link shows.
  await page.waitForSelector(`article:has(a[href="/case-study/${SLUG}"]) a[href="/case-study/${SLUG}#comments"]`, { timeout: 15000 });

  // The picker is a disclosure: it opens, Escape closes it, focus comes back.
  await page.click(strip);
  const opened = await page.$eval(strip, (trigger) => ({
    expanded: trigger.getAttribute('aria-expanded'),
    picker: Boolean(document.getElementById(trigger.getAttribute('aria-controls'))),
    focusInside: Boolean(document.activeElement.closest(`#${CSS.escape(trigger.getAttribute('aria-controls'))}`)),
  }));
  await page.keyboard.press('Escape');
  await settle(200);
  const closed = await page.$eval(strip, (trigger) => ({
    expanded: trigger.getAttribute('aria-expanded'),
    picker: Boolean(document.getElementById(trigger.getAttribute('aria-controls'))),
    focusOnTrigger: document.activeElement === trigger,
  }));

  // Fire, from the picker.
  await page.click(strip);
  await page.$eval(strip, (trigger) => {
    const picker = document.getElementById(trigger.getAttribute('aria-controls'));
    [...picker.querySelectorAll('button')].find((b) => b.getAttribute('aria-label').startsWith('Fire')).click();
  });
  await settle(1200);
  const onCard = await page.$eval(`article:has(a[href="/case-study/${SLUG}"])`, (article) => {
    const pill = [...article.querySelectorAll('button[aria-pressed]')].find((b) => b.getAttribute('aria-label').startsWith('Fire'));
    return pill && { pressed: pill.getAttribute('aria-pressed'), label: pill.getAttribute('aria-label') };
  });

  await page.goto(`${BASE}/case-study/${SLUG}`, { waitUntil: 'networkidle2' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForSelector(`section[data-engage="case:${SLUG}"]`, { timeout: 15000 });
  const onPage = await page.evaluate((slug) => {
    const button = [...document.querySelectorAll(`section[data-engage="case:${slug}"] [role=group] button`)].find((b) =>
      b.getAttribute('aria-label').startsWith('Fire'),
    );
    return { pressed: button.getAttribute('aria-pressed'), label: button.getAttribute('aria-label') };
  }, SLUG);
  await context.close();

  assert.deepEqual(opened, { expanded: 'true', picker: true, focusInside: true });
  assert.deepEqual(closed, { expanded: 'false', picker: false, focusOnTrigger: true });
  assert.equal(onCard?.pressed, 'true', 'the row shows the reaction');
  assert.deepEqual(onPage, onCard, 'the case study shows the same reaction and count');
});
