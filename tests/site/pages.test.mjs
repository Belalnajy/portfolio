// Checks the built site over HTTP: every sitemap URL renders, in the right
// language, with the head tags search engines and share cards rely on.
//
//   npm run build && npx next start -p 3000 &
//   npm run test:site                      # BASE_URL defaults to http://127.0.0.1:3000
//
// Without a server the tests are skipped on a developer machine, so a bare
// `node --test` stays green, but fail in CI: a suite that silently skips
// everything would report success for a server that never started.
import test from 'node:test';
import assert from 'node:assert/strict';

const BASE = (process.env.BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
const ORIGIN = 'https://www.belalnagy.com';

const up = await fetch(`${BASE}/robots.txt`).then((res) => res.ok, () => false);
if (!up && process.env.CI) throw new Error(`No server answering at ${BASE}; refusing to skip the site checks in CI.`);
const options = { skip: up ? false : `no server at ${BASE}` };

const get = async (path) => {
  const res = await fetch(`${BASE}${path}`, { redirect: 'manual' });
  return { status: res.status, headers: res.headers, body: await res.text() };
};

const inBatches = async (items, size, fn) => {
  const out = [];
  for (let i = 0; i < items.length; i += size) out.push(...(await Promise.all(items.slice(i, i + size).map(fn))));
  return out;
};

const attr = (html, pattern) => html.match(pattern)?.[1];
const ARABIC = /[؀-ۿ]/;

let pages = [];

test('the sitemap lists pages', options, async () => {
  const { status, body } = await get('/sitemap.xml');
  assert.equal(status, 200);
  const paths = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => {
    assert.ok(loc.startsWith(ORIGIN), `sitemap URL on the wrong origin: ${loc}`);
    return loc.slice(ORIGIN.length) || '/';
  });
  assert.ok(paths.length >= 20, `only ${paths.length} URLs in the sitemap`);
  assert.equal(new Set(paths).size, paths.length, 'duplicate sitemap URLs');
  pages = await inBatches(paths, 8, async (path) => ({ path, ...(await get(path)) }));
});

test('every sitemap URL returns 200', options, () => {
  assert.deepEqual(pages.filter((page) => page.status !== 200).map((page) => `${page.status} ${page.path}`), []);
});

test('each page is served in the language of its URL', options, () => {
  const problems = [];
  for (const { path, body } of pages) {
    const arabic = /^\/ar(\/|$)/.test(path);
    const html = body.match(/<html[^>]*>/)?.[0] ?? '';
    const want = arabic ? ['lang="ar"', 'dir="rtl"'] : ['lang="en"', 'dir="ltr"'];
    if (!want.every((token) => html.includes(token))) problems.push(`${path}: ${html}`);
    const description = attr(body, /<meta name="description" content="([^"]*)"/);
    if (!description) problems.push(`${path}: no description`);
    else if (arabic !== ARABIC.test(description)) problems.push(`${path}: description is in the wrong language`);
    const locale = attr(body, /<meta property="og:locale" content="([^"]*)"/);
    if (locale !== (arabic ? 'ar_SA' : 'en_US')) problems.push(`${path}: og:locale ${locale}`);
  }
  assert.deepEqual(problems, []);
});

test('canonical, hreflang and og:url point at the page and its twin', options, () => {
  const problems = [];
  const sameUrl = (a, b) => a?.replace(/\/$/, '') === b.replace(/\/$/, '');
  for (const { path, body } of pages) {
    const self = `${ORIGIN}${path}`;
    const english = `${ORIGIN}${path.replace(/^\/ar(?=\/|$)/, '') || '/'}`;
    const arabic = english === `${ORIGIN}/` ? `${ORIGIN}/ar` : english.replace(ORIGIN, `${ORIGIN}/ar`);
    if (!sameUrl(attr(body, /<link rel="canonical" href="([^"]*)"/), self)) problems.push(`${path}: canonical`);
    if (!sameUrl(attr(body, /<meta property="og:url" content="([^"]*)"/), self)) problems.push(`${path}: og:url`);
    const alternate = (lang) => attr(body, new RegExp(`<link rel="alternate" hrefLang="${lang}" href="([^"]*)"`, 'i'));
    if (!sameUrl(alternate('en'), english)) problems.push(`${path}: hreflang en`);
    if (!sameUrl(alternate('ar'), arabic)) problems.push(`${path}: hreflang ar`);
    if (!sameUrl(alternate('x-default'), english)) problems.push(`${path}: hreflang x-default`);
  }
  assert.deepEqual(problems, []);
});

test('no page loses the tags a nested metadata object used to drop', options, () => {
  const problems = [];
  const titles = new Map();
  for (const { path, body } of pages) {
    for (const [name, pattern] of [
      ['RSS autodiscovery', /<link rel="alternate" type="application\/rss\+xml"/],
      ['twitter:creator', /<meta name="twitter:creator" content="@/],
      ['twitter:card', /<meta name="twitter:card" content="summary_large_image"/],
      ['twitter:image', /<meta name="twitter:image" content="http/],
      ['og:image', /<meta property="og:image" content="http/],
      ['og:site_name', /<meta property="og:site_name"/],
      ['manifest', /<link rel="manifest"/],
    ]) {
      if (!pattern.test(body)) problems.push(`${path}: no ${name}`);
    }
    const title = attr(body, /<title>([^<]*)<\/title>/);
    if (!title) problems.push(`${path}: no title`);
    else if (titles.has(title)) problems.push(`${path}: same title as ${titles.get(title)}`);
    else titles.set(title, path);
  }
  assert.deepEqual(problems, []);
});

test('share images resolve to real images', options, async () => {
  const urls = new Set();
  for (const { body } of pages) {
    for (const [, url] of body.matchAll(/<meta (?:property="og:image"|name="twitter:image") content="([^"]*)"/g)) {
      urls.add(url.replace(/&amp;/g, '&').replace(ORIGIN, ''));
    }
  }
  const results = await inBatches([...urls], 8, async (path) => {
    const res = await fetch(`${BASE}${path}`);
    await res.arrayBuffer();
    return res.ok && res.headers.get('content-type')?.startsWith('image/') ? null : `${res.status} ${path}`;
  });
  assert.deepEqual(results.filter(Boolean), []);
});

test('structured data parses and cannot close its own script tag', options, () => {
  const problems = [];
  for (const { path, body } of pages) {
    const blocks = [...body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    if (blocks.length === 0) problems.push(`${path}: no JSON-LD`);
    for (const [, json] of blocks) {
      if (json.includes('<')) problems.push(`${path}: raw "<" in JSON-LD`);
      try {
        JSON.parse(json);
      } catch (error) {
        problems.push(`${path}: ${error.message}`);
      }
    }
  }
  assert.deepEqual(problems, []);
});

test('root-level routes still answer', options, async () => {
  const expected = {
    '/robots.txt': 'text/plain',
    '/llms.txt': 'text/plain',
    '/llms-full.txt': 'text/plain',
    '/feed.xml': 'application/rss+xml',
    '/og.png': 'image/png',
    '/site.webmanifest': 'application/manifest+json',
    '/sw.js': 'javascript',
  };
  const problems = [];
  for (const [path, type] of Object.entries(expected)) {
    const res = await fetch(`${BASE}${path}`);
    await res.arrayBuffer();
    if (res.status !== 200 || !res.headers.get('content-type')?.includes(type)) {
      problems.push(`${path}: ${res.status} ${res.headers.get('content-type')}`);
    }
  }
  assert.deepEqual(problems, []);
});

// The 404 is one prerendered document (src/app/global-not-found.jsx). A
// catch-all route calling notFound() also "works", but renders every probe on
// the server, uncacheably, into an empty shell; these keep that from coming back.
test('unknown URLs get the static 404 document', options, async () => {
  const count = (html, pattern) => [...html.matchAll(pattern)].length;
  for (const path of [
    '/no-such-page',
    '/ar/no-such-page',
    '/wp-login.php',
    '/.env',
    '/a/b/c',
    '/case-study/no-such-project',
    '/ar/blog/no-such-post',
  ]) {
    const { status, headers, body } = await get(path);
    // Vercel's firewall turns scanner paths (/wp-login.php) away before they
    // reach the site; that is a stricter answer than our 404, not a miss.
    if (status === 403 && headers.get('x-vercel-mitigated') === 'deny') continue;
    assert.equal(status, 404, path);
    // `next start` stamps no-store on every 404 response, prerendered or not,
    // so Cache-Control cannot tell the two apart; x-nextjs-prerender can.
    // Vercel drops that header and serves the prerendered file from its CDN,
    // which x-vercel-cache reports (MISS would mean a function rendered it).
    const prerendered =
      headers.get('x-nextjs-prerender')?.split(',')[0].trim() === '1' ||
      /^(HIT|STALE|PRERENDER)$/.test(headers.get('x-vercel-cache') ?? '');
    assert.ok(prerendered, `${path}: the 404 must be the prerendered document`);
    assert.match(headers.get('content-security-policy') ?? '', /frame-ancestors 'none'/, `${path}: document headers`);
    assert.match(body, /<html[^>]*\slang="(en|ar)"[^>]*>/, `${path}: <html lang>`);
    assert.match(body, /<h1[\s>]/, `${path}: the raw HTML has a heading`);
    assert.match(body, /<a [^>]*href="\/"/, `${path}: the raw HTML links home`);
    assert.equal(count(body, /<meta name="robots"/g), 1, `${path}: exactly one robots meta`);
    assert.match(body, /<meta name="robots" content="noindex"/, path);
    assert.equal(count(body, /<title>/g), 1, `${path}: one title`);
    assert.match(body, /<title>Page not found/, path);
    for (const [name, pattern] of [
      ['canonical', /<link rel="canonical"/],
      ['hreflang', /<link rel="alternate" hrefLang=/i],
      ['og:url', /<meta property="og:url"/],
    ]) {
      assert.doesNotMatch(body, pattern, `${path}: a 404 must not carry ${name}`);
    }
  }
});

test('security headers are sent', options, async () => {
  const { headers } = await get('/');
  assert.equal(headers.get('x-content-type-options'), 'nosniff');
  assert.equal(headers.get('x-frame-options'), 'DENY');
  assert.ok(headers.get('referrer-policy'));
  assert.ok(headers.get('permissions-policy'));
  assert.match(headers.get('content-security-policy') ?? '', /frame-ancestors 'none'/);
  assert.equal(headers.get('x-powered-by'), null);

  // The 404 document is a page too.
  const missing = await get('/no-such-page');
  assert.match(missing.headers.get('content-security-policy') ?? '', /frame-ancestors 'none'/);

  // Assets keep the two small headers and skip the document-only ones.
  for (const path of ['/portrait.webp', '/sw.js']) {
    const asset = await fetch(`${BASE}${path}`);
    await asset.arrayBuffer();
    assert.equal(asset.headers.get('x-content-type-options'), 'nosniff', path);
    assert.ok(asset.headers.get('strict-transport-security'), path);
    assert.equal(asset.headers.get('content-security-policy'), null, path);
  }
});

// Reactions and comments (src/lib/engage). Without storage configured the
// feature is off: every endpoint answers 503 and the pages are unchanged
// (the page checks above still pass). With it on, only invalid requests are
// sent here, so running this against production never posts anything.
test('the comments API is off cleanly, or refuses bad input, and never fails with a 500', options, async () => {
  const engage = await get('/api/engage?target=case:oxgym');
  const on = engage.status === 200;
  if (!on) {
    assert.equal(engage.status, 503, 'GET /api/engage');
    assert.deepEqual(JSON.parse(engage.body), { enabled: false });
  } else {
    const thread = JSON.parse(engage.body);
    assert.equal(thread.enabled, true);
    assert.deepEqual(Object.keys(thread.reactions).sort(), ['clap', 'fire', 'idea', 'like', 'love']);
    for (const comment of thread.comments) assert.deepEqual(Object.keys(comment).sort(), ['createdAt', 'id', 'name', 'text']);
  }
  // On, the thread is the same for everyone and the CDN keeps it briefly;
  // off, nothing is cached.
  assert.equal(engage.headers.get('cache-control'), on ? 'public, max-age=0, must-revalidate' : 'no-store');
  // Vercel's CDN consumes CDN-Cache-Control itself, so in production it may
  // not reach the client; when it does, it must be the 30 s rule.
  if (on && engage.headers.get('cdn-cache-control')) {
    assert.equal(engage.headers.get('cdn-cache-control'), 'public, s-maxage=30, stale-while-revalidate=300');
  }

  const expect = (status, onStatus, label) => assert.equal(status, on ? onStatus : 503, label);
  expect((await get('/api/engage?target=case:no-such-project')).status, 400, 'unknown target');
  expect((await get('/api/comment?target=case:no-such-project')).status, 400, 'no form token for an unknown thread');
  const post = (path, body, type = 'application/json') =>
    fetch(`${BASE}${path}`, { method: 'POST', headers: { 'Content-Type': type }, body }).then((res) => res.status);
  expect(await post('/api/comment', JSON.stringify({ target: 'case:oxgym', text: 'x'.repeat(2000) })), 413, 'body over 1 KB');
  expect(await post('/api/comment', '{not json'), 400, 'not JSON');
  expect(await post('/api/comment', 'name=a', 'application/x-www-form-urlencoded'), 415, 'not a JSON request');
  expect(await post('/api/react', JSON.stringify({ target: 'case:oxgym', emoji: 'poop', on: true, visitor: '0123456789abcdef' })), 400, 'unknown reaction');
  expect((await get('/api/comments/moderate?action=approve&id=abcdefgh&sig=forged')).status, 403, 'forged moderation link');

  const admin = await get('/admin/comments');
  assert.equal(admin.status, 200);
  assert.match(admin.body, /<meta name="robots" content="noindex, nofollow/);
  assert.doesNotMatch(admin.body, /Waiting for approval/, 'nothing listed without signing in');
});
