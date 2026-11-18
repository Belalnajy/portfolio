// Reactions and comments (src/lib/engage): input rules, keys and signatures,
// rate limits and caps, the target allowlist, the email, and the whole flow,
// on the in-memory store.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStore, createSqlStore, getStore } from '../../src/lib/engage/store.js';
import { validateComment, normaliseName, normaliseText, countLinks, isReactionKey, cleanVisitorId } from '../../src/lib/engage/validate.js';
import {
  deriveKeys, signAction, verifyAction, hashIp, voterKey, signSession, verifySession, safeEqual, signFormToken, formTokenAge,
} from '../../src/lib/engage/crypto.js';
import {
  TARGETS, TEACHING_THREADS, isTarget, engageConfig, getThread, react, submitComment, moderate, listPending, listRecent,
  overLimit, emailAllowed, RATE_LIMITS, VOTERS_PER_NETWORK, PENDING_MAX, DEV_SECRET, getSummary, threadInfo,
} from '../../src/lib/engage/server.js';
import { networkOf, buildEmail } from '../../src/lib/engage/http.js';
import { adminError } from '../../src/lib/engage/admin.js';
import { mergeComments, displayCount, ago } from '../../src/lib/engage/client.js';
import { SITE_URL } from '../../src/lib/site.js';
import { CASE_STUDIES, CASE_STUDY_SLUGS } from '../../src/lib/case-studies.js';
import { BLOG_POSTS, BLOG_SLUGS } from '../../src/lib/blog.js';

const SECRET = 'test-secret-that-is-long-enough';
const KEYS = deriveKeys(SECRET);
const config = () => ({ store: createMemoryStore(), secret: SECRET, keys: KEYS });
const ch = (code) => String.fromCharCode(code);
/** A form token issued `ms` ago. */
const tokenAged = (target, ms, now = Date.now()) => signFormToken(KEYS, target, now - ms);

test('names and comments are cleaned and bounded', () => {
  assert.equal(normaliseName(`  Be${ch(0x202e)}lal${ch(0x200b)}\n\t Nagy `), 'Belal Nagy');
  assert.equal(normaliseText(`line one  \r\n\r\n\r\n\r\nline two${ch(0)}`), 'line one\n\nline two');
  assert.equal(validateComment({ name: 'A', text: 'hello' }).error, 'name');
  assert.equal(validateComment({ name: 'x'.repeat(41), text: 'hello' }).error, 'name');
  assert.equal(validateComment({ name: 'Visit http://spam', text: 'hello' }).error, 'name');
  assert.equal(validateComment({ name: 'Sara', text: 'hi' }).error, 'text');
  assert.equal(validateComment({ name: 'Sara', text: 'x'.repeat(1001) }).error, 'text');
  assert.equal(validateComment({ name: 'Sara', text: 'a http://a.b b https://c.d c www.e.f' }).error, 'links');
  assert.equal(countLinks('http://a and https://b'), 2);
  assert.deepEqual(validateComment({ name: ' سارة ', text: ' شرح ممتاز ' }), { ok: true, name: 'سارة', text: 'شرح ممتاز' });
  assert.ok(isReactionKey('fire') && !isReactionKey('poop') && !isReactionKey('__proto__'));
  assert.equal(cleanVisitorId('<script>'), '');
  assert.equal(cleanVisitorId('3F2504E0-4F89-11D3-9A0C-0305E82C3301'), '3f2504e0-4f89-11d3-9a0c-0305e82c3301');
});

test('the target allowlist is every case study and article, plus the courses while /teaching is public', () => {
  for (const slug of CASE_STUDY_SLUGS) assert.ok(isTarget(`case:${slug}`), slug);
  for (const slug of BLOG_SLUGS) assert.ok(isTarget(`post:${slug}`), slug);
  for (const thread of TEACHING_THREADS) assert.ok(isTarget(thread), thread);
  assert.ok([0, 2].includes(TEACHING_THREADS.length));
  assert.equal(TARGETS.size, CASE_STUDY_SLUGS.length + BLOG_SLUGS.length + TEACHING_THREADS.length);
  for (const bad of ['case:nope', 'post:', 'teach:x', 'case:oxgym ', 'CASE:oxgym', '__proto__', '', null, 42, { toString: () => 'case:oxgym' }]) {
    assert.equal(isTarget(bad), false, String(bad));
  }
});

test('each use gets its own key derived from the one secret', () => {
  const keys = Object.values(KEYS).map((key) => key.toString('hex'));
  assert.equal(new Set(keys).size, keys.length, 'all different');
  assert.ok(keys.every((key) => !key.includes(Buffer.from(SECRET).toString('hex'))));
  // A signature for one purpose is not valid for another.
  const session = signSession(KEYS, Date.now() + 60_000);
  const [expires, signature] = session.split('.');
  assert.equal(verifyAction(KEYS, 'admin', expires, signature), false, 'a session signature is not a link signature');
  assert.equal(formTokenAge(KEYS, 'admin', session), null, 'nor a form token');
  assert.notEqual(hashIp(KEYS, 'x'), voterKey(KEYS, 'x'), 'the IP and voter hashes use different keys');
  assert.deepEqual(Object.keys(deriveKeys('another secret, long enough')), Object.keys(KEYS));
  assert.notEqual(deriveKeys('another secret, long enough').link.toString('hex'), KEYS.link.toString('hex'));
});

test('moderation links, admin sessions and form tokens are signed and checked', () => {
  const sig = signAction(KEYS, 'approve', 'abc12345');
  assert.ok(verifyAction(KEYS, 'approve', 'abc12345', sig));
  assert.equal(verifyAction(KEYS, 'delete', 'abc12345', sig), false, 'an approve link cannot delete');
  assert.equal(verifyAction(KEYS, 'approve', 'abc12346', sig), false, 'nor act on another comment');
  assert.equal(verifyAction(deriveKeys('another secret, long enough'), 'approve', 'abc12345', sig), false);
  assert.equal(verifyAction(KEYS, 'approve', 'abc12345', undefined), false);
  assert.equal(verifyAction(KEYS, 'approve', 'abc12345', sig.slice(0, -1)), false);
  const now = Date.now();
  const cookie = signSession(KEYS, now + 60_000);
  assert.ok(verifySession(KEYS, cookie, now));
  assert.equal(verifySession(KEYS, cookie, now + 120_000), false, 'expired');
  assert.equal(verifySession(KEYS, `${now + 999_999}.${cookie.split('.')[1]}`, now), false, 'expiry tampered');
  assert.equal(verifySession(KEYS, 'garbage', now), false);
  const token = signFormToken(KEYS, 'case:oxgym', now - 5000);
  assert.equal(formTokenAge(KEYS, 'case:oxgym', token, now), 5000);
  assert.equal(formTokenAge(KEYS, 'case:motors', token, now), null, 'a token is for one thread');
  assert.equal(formTokenAge(KEYS, 'case:oxgym', `${now - 60_000}.${token.split('.')[1]}`, now), null, 'backdated');
  assert.ok(safeEqual('same', 'same') && !safeEqual('same', 'Same') && !safeEqual('short', 'longer value'));
});

test('IPv6 addresses count by their /64; IPv4 as they are', () => {
  assert.equal(networkOf('203.0.113.7'), '203.0.113.7');
  assert.equal(networkOf('::ffff:203.0.113.7'), '203.0.113.7');
  const net = networkOf('2001:db8:85a3:1:abcd:ef01:2345:6789');
  assert.equal(net, '2001:db8:85a3:1::/64');
  assert.equal(networkOf('2001:0db8:85a3:0001:ffff::1'), net, 'same /64, another address');
  assert.equal(networkOf('2001:db8:85a3:1::'), net);
  assert.notEqual(networkOf('2001:db8:85a3:2::1'), net, 'next /64');
  assert.equal(networkOf('2001:db8::1'), '2001:db8:0:0::/64', 'compressed zeros');
  assert.equal(networkOf('[2001:DB8:85A3:1::9]'), net, 'brackets and case');
  assert.notEqual(hashIp(KEYS, net), net);
  assert.notEqual(hashIp(KEYS, net), hashIp(deriveKeys('another secret, long enough'), net));
});

test('rate limits cap comments, reactions, sign-ins and email', async () => {
  const { store } = config();
  assert.deepEqual(RATE_LIMITS, { comment: 10, react: 60, login: 10, email: 20 });
  for (const kind of ['comment', 'react', 'login']) {
    const results = [];
    for (let i = 0; i < RATE_LIMITS[kind] + 2; i += 1) results.push(await overLimit(store, kind, 'ip-a'));
    assert.equal(results.filter((over) => !over).length, RATE_LIMITS[kind], kind);
    assert.equal(await overLimit(store, kind, 'ip-b'), false, `${kind}: another connection has its own budget`);
  }
  const sent = [];
  for (let i = 0; i < 25; i += 1) sent.push(await emailAllowed(store));
  assert.equal(sent.filter(Boolean).length, 20, 'twenty emails an hour, site-wide');
});

test('reactions toggle once per visitor, whatever the network', async () => {
  const c = config();
  const on = { target: 'case:oxgym', key: 'fire', on: true, visitorId: 'visitor-1', ipHash: 'wifi' };
  assert.deepEqual(await react(c, on), { ok: true, count: 1, mine: true });
  assert.equal((await react(c, on)).count, 1, 'pressing again does not count twice');
  assert.equal((await react(c, { ...on, ipHash: '4g' })).count, 1, 'the same browser on another network counts once');
  assert.equal((await react(c, { ...on, visitorId: 'visitor-2' })).count, 2);
  const thread = await getThread(c, { target: 'case:oxgym' });
  assert.deepEqual(thread.reactions.fire, { count: 2 }, 'the thread is the same for everyone: no "mine" in it');
  assert.equal((await react(c, { ...on, on: false })).count, 1);
  assert.equal((await react(c, { ...on, key: 'poop' })).error, 'invalid');
  assert.equal((await react(c, { ...on, target: 'case:nope' })).error, 'invalid');
  assert.equal((await react(c, { ...on, on: 'yes' })).error, 'invalid');
});

test('one connection adds at most ten new voters to a thread a day', async () => {
  const c = config();
  const results = [];
  for (let i = 0; i < VOTERS_PER_NETWORK + 3; i += 1) {
    results.push(await react(c, { target: 'case:oxgym', key: 'like', on: true, visitorId: `id-${i}`, ipHash: 'lab' }));
  }
  assert.equal(results.filter((r) => r.ok).length, VOTERS_PER_NETWORK);
  assert.ok(results.slice(VOTERS_PER_NETWORK).every((r) => r.error === 'rate'));
  assert.equal((await react(c, { target: 'case:oxgym', key: 'love', on: true, visitorId: 'id-0', ipHash: 'lab' })).ok, true, 'a voter already counted can still react');
  assert.equal((await react(c, { target: 'case:motors', key: 'like', on: true, visitorId: 'id-99', ipHash: 'lab' })).ok, true, 'another thread has its own cap');
  assert.equal((await react(c, { target: 'case:oxgym', key: 'like', on: true, visitorId: 'id-99', ipHash: 'home' })).ok, true, 'another connection too');
  assert.equal((await getThread(c, { target: 'case:oxgym' })).reactions.like.count, VOTERS_PER_NETWORK + 1);
});

test('a parallel burst of new voters cannot overshoot the cap', async () => {
  const c = config();
  const burst = await Promise.all(
    Array.from({ length: VOTERS_PER_NETWORK * 3 }, (_, i) =>
      react(c, { target: 'case:oxgym', key: 'fire', on: true, visitorId: `burst-${i}`, ipHash: 'bot' })),
  );
  assert.ok(burst.filter((r) => r.ok).length <= VOTERS_PER_NETWORK);
  assert.ok((await getThread(c, { target: 'case:oxgym' })).reactions.fire.count <= VOTERS_PER_NETWORK);
});

test('comments wait for approval; bots are dropped silently', async () => {
  const c = config();
  const target = `post:${BLOG_SLUGS[0]}`;
  const base = { target, name: 'Sara', text: 'Great write-up <img src=x onerror=alert(1)>', website: '', token: tokenAged(target, 9000), ipHash: 'ip-a' };
  const drops = [
    await submitComment(c, { ...base, website: 'http://spam.example' }),
    await submitComment(c, { ...base, token: tokenAged(target, 1200) }),
    await submitComment(c, { ...base, token: undefined }),
    await submitComment(c, { ...base, token: 'forged.token' }),
    await submitComment(c, { ...base, token: tokenAged('case:oxgym', 9000) }),
    await submitComment(c, { ...base, token: tokenAged(target, 2 * 86_400_000) }),
  ];
  for (const result of drops) assert.deepEqual(result, { ok: true, dropped: true });
  assert.equal((await listPending(c)).length, 0, 'nothing stored for bots');

  const stored = await submitComment(c, base);
  assert.ok(stored.ok && stored.comment.status === 'pending');
  assert.equal(stored.comment.text, base.text, 'stored as typed: rendering keeps it plain text');
  assert.equal((await getThread(c, { target })).comments.length, 0, 'pending is not public');
  assert.equal((await listPending(c)).length, 1);

  await moderate(c, 'approve', stored.comment.id);
  const thread = await getThread(c, { target });
  assert.equal(thread.total, 1);
  assert.deepEqual(Object.keys(thread.comments[0]).sort(), ['createdAt', 'id', 'name', 'text'], 'no IP hash or status in public data');
  assert.equal((await listRecent(c)).length, 1);

  await moderate(c, 'delete', stored.comment.id);
  assert.equal((await getThread(c, { target })).total, 0);
  assert.equal(await moderate(c, 'approve', stored.comment.id), null, 'gone');
  assert.equal(await moderate(c, 'approve', '../../etc'), null);
});

test('past five hundred waiting comments, new ones are refused', async () => {
  const c = config();
  for (let i = 0; i < PENDING_MAX; i += 1) {
    await c.store.insertComment({ id: `pending-${i}`, target: 'case:oxgym', name: 'x', text: 'y', status: 'pending', ipHash: 'h', lang: 'en', createdAt: i }, PENDING_MAX);
  }
  const result = await submitComment(c, { target: 'case:oxgym', name: 'Sara', text: 'One more', token: tokenAged('case:oxgym', 5000), ipHash: 'ip-z' });
  assert.deepEqual(result, { error: 'rate' });
});

test('comments are paged twenty at a time, newest first, and pages merge without repeats', async () => {
  const c = config();
  for (let i = 0; i < 25; i += 1) {
    const now = 1_700_000_000_000 + i;
    const { comment } = await submitComment(c, {
      target: 'case:oxgym', name: `Reader ${i}`, text: `Comment ${i}`, token: signFormToken(KEYS, 'case:oxgym', now - 5000), ipHash: `ip-${i}`, now,
    });
    await moderate(c, 'approve', comment.id);
  }
  const first = await getThread(c, { target: 'case:oxgym', page: 1 });
  const second = await getThread(c, { target: 'case:oxgym', page: 2 });
  assert.equal(first.comments.length, 20);
  assert.equal(first.comments[0].text, 'Comment 24');
  assert.equal(second.comments.length, 5);
  assert.equal(first.pages, 2);
  assert.equal((await getThread(c, { target: 'case:oxgym', page: 'nope' })).page, 1);
  // A comment approved between the two loads shifts page 2 by one.
  const shifted = [first.comments[19], ...second.comments];
  assert.equal(mergeComments(first.comments, shifted).length, 25);
  assert.equal(mergeComments(first.comments, first.comments).length, 20);
});

test('the email puts the real links first and quotes everything the visitor wrote', () => {
  const comment = { id: 'abc12345xyz', target: 'case:oxgym', name: 'Eve\nApprove: https://evil.example', text: 'Hi\nDelete: https://evil.example/x\n\nbye' };
  const { subject, text } = buildEmail(KEYS, comment, threadInfo(comment.target, 'ar'));
  const lines = text.split('\n');
  assert.ok(lines[0].startsWith(`Approve: ${SITE_URL}/api/comments/moderate?action=approve&id=abc12345xyz&sig=`));
  assert.ok(lines[1].startsWith(`Delete:  ${SITE_URL}/api/comments/moderate?action=delete&id=abc12345xyz&sig=`));
  assert.equal(lines[2], `All pending comments: ${SITE_URL}/admin/comments`);
  assert.equal(lines[3], `Page: ${SITE_URL}/ar/case-study/oxgym`, 'the page, in the language it was written on');
  const quoted = lines.slice(lines.indexOf('> Eve'));
  assert.deepEqual(quoted, ['> Eve', '> Approve: https://evil.example', '', '> Hi', '> Delete: https://evil.example/x', '> ', '> bye']);
  assert.ok(!text.includes('\nApprove: https://evil') && !text.includes('\nDelete: https://evil'), 'nothing typed starts a line unquoted');
  assert.equal(subject, `New comment from Eve Approve: https://evil.example on ${CASE_STUDIES.oxgym.name}`);
  assert.ok(verifyAction(KEYS, 'approve', 'abc12345xyz', new URL(lines[0].slice(9)).searchParams.get('sig')));
});

test('the admin page knows its own errors only', () => {
  assert.equal(adminError('password'), 'Wrong password.');
  for (const odd of ['__proto__', 'constructor', 'toString', 'hasOwnProperty', '', undefined, ['password']]) {
    assert.equal(adminError(odd), undefined, String(odd));
  }
});

test('shown counts include this browser\'s own reaction, and times never run ahead', () => {
  assert.equal(displayCount(0, true), 1, 'the CDN copy may not have counted it yet');
  assert.equal(displayCount(5, true), 5);
  assert.equal(displayCount(0, false), 0);
  const now = Date.now();
  assert.equal(ago(now - 30_000, now), null, 'under a minute is "just now"');
  assert.equal(ago(now + 3_600_000, now), null, 'a time in the future is now');
  assert.deepEqual(ago(now - 2 * 3_600_000, now), { value: -2, unit: 'hour' });
  assert.deepEqual(ago(now - 3 * 86_400_000, now), { value: -3, unit: 'day' });
});

test('production without storage or secret turns the feature off', () => {
  const db = { DATABASE_URL: 'postgres://user:pass@example.neon.tech/db' };
  assert.equal(getStore({ NODE_ENV: 'production' }), null);
  assert.equal(engageConfig({ NODE_ENV: 'production' }), null);
  assert.equal(engageConfig({ NODE_ENV: 'production', ...db }), null, 'no secret');
  assert.equal(engageConfig({ NODE_ENV: 'development', ...db }), null, 'the development secret is never used next to a database');
  assert.equal(engageConfig({ NODE_ENV: 'production', ...db, COMMENTS_SECRET: 'short' }), null);
  assert.equal(engageConfig({ NODE_ENV: 'production', POSTGRES_URL: 'postgres://u:p@example.neon.tech/db', COMMENTS_SECRET: SECRET }).store.kind, 'postgres');
  assert.equal(engageConfig({ NODE_ENV: 'production', ...db, COMMENTS_SECRET: SECRET }).store.kind, 'postgres');
  for (const old of ['KV_REST_API_URL', 'UPSTASH_REDIS_REST_URL']) {
    assert.equal(engageConfig({ NODE_ENV: 'production', [old]: 'https://x.upstash.io', COMMENTS_SECRET: SECRET }), null, `${old} is no longer read`);
  }
  assert.equal(engageConfig({ NODE_ENV: 'development' }).secret, DEV_SECRET);
  assert.equal(engageConfig({ NODE_ENV: 'test' }).store.kind, 'memory');
});

test('the email names the thread by its title and links its page', () => {
  const post = BLOG_SLUGS[0];
  assert.deepEqual(threadInfo('case:oxgym', 'en'), { title: CASE_STUDIES.oxgym.name, path: '/case-study/oxgym' });
  assert.deepEqual(threadInfo(`post:${post}`, 'ar'), { title: BLOG_POSTS[post].ar.title, path: `/ar/blog/${post}` });
  assert.deepEqual(threadInfo(`post:${post}`, 'en'), { title: BLOG_POSTS[post].en.title, path: `/blog/${post}` });
  assert.equal(threadInfo('teach:cst', 'en').path, '/teaching');
  assert.ok(threadInfo('teach:cst', 'ar').title.includes('CST'));
  const { subject } = buildEmail(KEYS, { id: 'abc12345xyz', target: 'case:oxgym', name: 'اختبار من Claude', text: 'x' }, threadInfo('case:oxgym', 'ar'));
  assert.equal(subject, `New comment from اختبار من Claude on ${CASE_STUDIES.oxgym.name}`);
});

test('the summary follows every real change, and nothing else', async () => {
  const c = config();
  const summary = async () => (await getSummary(c)).oxgym ?? {};
  const like = (on, visitorId = 'v1', ipHash = 'ip') => react(c, { target: 'case:oxgym', key: 'like', on, visitorId, ipHash });
  assert.deepEqual(await summary(), {}, 'empty');
  await like(true);
  await like(true); // the same voter again: no change
  assert.deepEqual(await summary(), { like: 1 });
  await like(false);
  await like(false); // already off: no change
  assert.deepEqual(await summary(), {});
  await like(true);
  await like(true, 'v2');
  assert.deepEqual(await summary(), { like: 2 });

  const token = signFormToken(KEYS, 'case:oxgym', Date.now() - 5000);
  const first = await submitComment(c, { target: 'case:oxgym', name: 'Sara', text: 'Nice work', token, ipHash: 'ip' });
  const second = await submitComment(c, { target: 'case:oxgym', name: 'Omar', text: 'Agreed', token, ipHash: 'ip' });
  assert.equal((await summary()).comments, undefined, 'pending comments are not counted');
  await moderate(c, 'approve', first.comment.id);
  await moderate(c, 'approve', first.comment.id); // approving twice counts once
  assert.equal((await summary()).comments, 1);
  await moderate(c, 'delete', second.comment.id); // a pending one: no change
  assert.equal((await summary()).comments, 1);
  await moderate(c, 'delete', first.comment.id); // an approved one
  assert.equal((await summary()).comments, undefined);
  // Only case studies are summarised.
  await react(c, { target: `post:${BLOG_SLUGS[0]}`, key: 'fire', on: true, visitorId: 'v1', ipHash: 'ip' });
  assert.deepEqual(Object.keys(await getSummary(c)), ['oxgym']);
});

test('the SQL store sends every value as a parameter', async () => {
  // A stand-in for Neon's `sql` tag: records each query's text and values,
  // and answers with rows shaped like Postgres (counts as numbers, bigint
  // created_at as strings).
  const queries = [];
  const answer = (text) => {
    if (/RETURNING count/.test(text)) return [{ count: 1 }];
    if (/AS ok/.test(text)) return [{ ok: true }];
    if (/RETURNING 1 AS done/.test(text)) return [{ done: 1 }];
    if (/json_object_agg/.test(text)) return [{ reactions: { like: 2 }, total: 1 }];
    if (/count\(\*\)::int AS n FROM engage_reactions/.test(text)) return [{ n: 3 }];
    if (/UNION ALL/.test(text)) return [{ target: 'case:oxgym', key: 'like', count: 2 }];
    if (/FROM engage_comments/.test(text) || /RETURNING id/.test(text)) {
      return [{ id: 'abc12345xyz', target: 'case:oxgym', name: 'Sara', text: 'Hi', status: 'approved', ip_hash: 'h', lang: 'ar', created_at: '1794930084709' }];
    }
    return [];
  };
  const sql = (strings, ...values) => {
    const query = { text: strings.join('$?'), values };
    queries.push(query);
    return { query, then: (resolve, reject) => Promise.resolve(answer(query.text)).then(resolve, reject) };
  };
  sql.transaction = async (list) => list.map(({ query }) => answer(query.text));
  const store = createSqlStore({ sql });

  const evil = "x'); DROP TABLE engage_comments; --";
  assert.deepEqual(await store.react(`case:${evil}`, evil, evil, true), { changed: true, count: 3 });
  assert.equal(await store.admitVoter(evil, evil, evil, 10, 86400), true);
  assert.equal(await store.hit(evil, 3600), 1);
  const thread = await store.thread(evil, 20, 20);
  assert.deepEqual(thread.reactions, { like: 2 });
  assert.equal(thread.comments[0].createdAt, 1794930084709, 'bigint read back as a number');
  assert.equal(thread.comments[0].ipHash, 'h');
  assert.deepEqual(await store.summary(), [{ target: 'case:oxgym', key: 'like', count: 2 }]);
  assert.equal(await store.insertComment({ id: evil, target: evil, name: evil, text: evil, status: 'pending', ipHash: evil, lang: 'en', createdAt: 1 }, 500), true);
  assert.equal((await store.getComment(evil)).lang, 'ar');
  assert.equal((await store.approve(evil)).id, 'abc12345xyz');
  assert.equal((await store.remove(evil)).target, 'case:oxgym');
  assert.equal((await store.list('pending', 5)).length, 1);

  assert.ok(queries.length > 10);
  for (const { text, values } of queries) {
    assert.ok(!text.includes('DROP TABLE'), `nothing interpolated into: ${text.slice(0, 60)}`);
    assert.ok(!/engage_comments; --/.test(text));
    for (const value of values) assert.ok(['string', 'number', 'boolean'].includes(typeof value), 'only plain values travel');
  }
  assert.ok(queries.some(({ values }) => values.includes(evil)), 'the hostile value went as a parameter');
  assert.ok(queries.some(({ text }) => /CREATE TABLE IF NOT EXISTS engage_comments/.test(text)), 'the tables are created on first use');
  assert.equal(queries.filter(({ text }) => /CREATE TABLE IF NOT EXISTS engage_comments/.test(text)).length, 1, 'once per process');
});
