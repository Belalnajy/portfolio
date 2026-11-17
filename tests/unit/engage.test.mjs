// Reactions and comments (src/lib/engage): input rules, signed moderation
// links, rate limits, the target allowlist and the whole flow, on the
// in-memory store.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStore, getStore } from '../../src/lib/engage/store.js';
import { validateComment, normaliseName, normaliseText, countLinks, isReactionKey, cleanVisitorId } from '../../src/lib/engage/validate.js';
import { signAction, verifyAction, hashIp, signSession, verifySession, safeEqual } from '../../src/lib/engage/crypto.js';
import {
  TARGETS, TEACHING_THREADS, isTarget, engageConfig, getThread, react, submitComment, moderate, listPending, listRecent, overLimit, RATE_LIMITS,
} from '../../src/lib/engage/server.js';
import { CASE_STUDY_SLUGS } from '../../src/lib/case-studies.js';
import { BLOG_SLUGS } from '../../src/lib/blog.js';

const SECRET = 'test-secret-that-is-long-enough';
const config = () => ({ store: createMemoryStore(), secret: SECRET });
const ch = (code) => String.fromCharCode(code);

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

test('the target allowlist is every case study, article and course, and nothing else', () => {
  for (const slug of CASE_STUDY_SLUGS) assert.ok(isTarget(`case:${slug}`), slug);
  for (const slug of BLOG_SLUGS) assert.ok(isTarget(`post:${slug}`), slug);
  // The two courses, unless the Teaching page is hidden (TEACHING_PUBLIC).
  for (const thread of TEACHING_THREADS) assert.ok(isTarget(thread), thread);
  assert.ok([0, 2].includes(TEACHING_THREADS.length));
  assert.equal(TARGETS.size, CASE_STUDY_SLUGS.length + BLOG_SLUGS.length + TEACHING_THREADS.length);
  for (const bad of ['case:nope', 'post:', 'teach:x', 'case:oxgym ', 'CASE:oxgym', '', null, 42, { toString: () => 'case:oxgym' }]) {
    assert.equal(isTarget(bad), false, String(bad));
  }
});

test('moderation links and admin sessions are signed and checked', () => {
  const sig = signAction(SECRET, 'approve', 'abc12345');
  assert.ok(verifyAction(SECRET, 'approve', 'abc12345', sig));
  assert.equal(verifyAction(SECRET, 'delete', 'abc12345', sig), false, 'an approve link cannot delete');
  assert.equal(verifyAction(SECRET, 'approve', 'abc12346', sig), false, 'nor act on another comment');
  assert.equal(verifyAction('another-secret-of-length', 'approve', 'abc12345', sig), false);
  assert.equal(verifyAction(SECRET, 'approve', 'abc12345', undefined), false);
  assert.equal(verifyAction(SECRET, 'approve', 'abc12345', sig.slice(0, -1)), false);
  const now = Date.now();
  const cookie = signSession(SECRET, now + 60_000);
  assert.ok(verifySession(SECRET, cookie, now));
  assert.equal(verifySession(SECRET, cookie, now + 120_000), false, 'expired');
  assert.equal(verifySession(SECRET, `${now + 999_999}.${cookie.split('.')[1]}`, now), false, 'expiry tampered');
  assert.equal(verifySession(SECRET, 'garbage', now), false);
  assert.ok(safeEqual('same', 'same') && !safeEqual('same', 'Same') && !safeEqual('short', 'longer value'));
});

test('IPs are only kept as salted hashes', () => {
  const hash = hashIp(SECRET, '203.0.113.7');
  assert.notEqual(hash, hashIp('another-secret-of-length', '203.0.113.7'));
  assert.ok(!hash.includes('203'));
});

test('rate limits cap comments, reactions and logins per connection', async () => {
  const { store } = config();
  for (const kind of ['comment', 'react', 'login']) {
    const results = [];
    for (let i = 0; i < RATE_LIMITS[kind] + 2; i += 1) results.push(await overLimit(store, kind, 'ip-a'));
    assert.equal(results.filter((over) => !over).length, RATE_LIMITS[kind], kind);
    assert.equal(await overLimit(store, kind, 'ip-b'), false, `${kind}: another connection has its own budget`);
  }
});

test('reactions toggle once per visitor and survive a reload', async () => {
  const c = config();
  const on = { target: 'case:oxgym', key: 'fire', on: true, visitorId: 'visitor-1', ipHash: 'ip-a' };
  assert.equal((await react(c, on)).count, 1);
  assert.equal((await react(c, on)).count, 1, 'pressing again does not count twice');
  assert.equal((await react(c, { ...on, visitorId: 'visitor-2' })).count, 2);
  const thread = await getThread(c, { target: 'case:oxgym', visitorId: 'visitor-1', ipHash: 'ip-a' });
  assert.deepEqual(thread.reactions.fire, { count: 2, mine: true });
  assert.deepEqual(thread.reactions.like, { count: 0, mine: false });
  assert.equal((await react(c, { ...on, on: false })).count, 1);
  assert.equal((await react(c, { ...on, key: 'poop' })).error, 'invalid');
  assert.equal((await react(c, { ...on, target: 'case:nope' })).error, 'invalid');
  assert.equal((await react(c, { ...on, on: 'yes' })).error, 'invalid');
});

test('comments wait for approval; bots are dropped silently', async () => {
  const c = config();
  const base = { target: 'post:' + BLOG_SLUGS[0], name: 'Sara', text: 'Great write-up <img src=x onerror=alert(1)>', website: '', elapsedMs: 9000, ipHash: 'ip-a' };
  const honeypot = await submitComment(c, { ...base, website: 'http://spam.example' });
  const tooFast = await submitComment(c, { ...base, elapsedMs: 1200 });
  const noTimer = await submitComment(c, { ...base, elapsedMs: undefined });
  for (const result of [honeypot, tooFast, noTimer]) assert.deepEqual(result, { ok: true, dropped: true });
  assert.equal((await listPending(c)).length, 0, 'nothing stored for bots');

  const stored = await submitComment(c, base);
  assert.ok(stored.ok && stored.comment.status === 'pending');
  assert.equal(stored.comment.text, base.text, 'stored as typed: rendering keeps it plain text');
  assert.equal((await getThread(c, { target: base.target, ipHash: 'ip-a' })).comments.length, 0, 'pending is not public');
  assert.equal((await listPending(c)).length, 1);

  await moderate(c, 'approve', stored.comment.id);
  const thread = await getThread(c, { target: base.target, ipHash: 'ip-a' });
  assert.equal(thread.total, 1);
  assert.deepEqual(Object.keys(thread.comments[0]).sort(), ['createdAt', 'id', 'name', 'text'], 'no IP hash or status in public data');
  assert.equal((await listRecent(c)).length, 1);

  await moderate(c, 'delete', stored.comment.id);
  assert.equal((await getThread(c, { target: base.target, ipHash: 'ip-a' })).total, 0);
  assert.equal(await moderate(c, 'approve', stored.comment.id), null, 'gone');
  assert.equal(await moderate(c, 'approve', '../../etc'), null);
});

test('comments are paged twenty at a time, newest first', async () => {
  const c = config();
  for (let i = 0; i < 25; i += 1) {
    const { comment } = await submitComment(c, { target: 'case:oxgym', name: `Reader ${i}`, text: `Comment ${i}`, elapsedMs: 5000, ipHash: `ip-${i}`, now: 1_000_000 + i });
    await moderate(c, 'approve', comment.id);
  }
  const first = await getThread(c, { target: 'case:oxgym', ipHash: 'x', page: 1 });
  const second = await getThread(c, { target: 'case:oxgym', ipHash: 'x', page: 2 });
  assert.equal(first.comments.length, 20);
  assert.equal(first.comments[0].text, 'Comment 24');
  assert.equal(second.comments.length, 5);
  assert.equal(first.pages, 2);
  assert.equal((await getThread(c, { target: 'case:oxgym', ipHash: 'x', page: 'nope' })).page, 1);
});

test('production without storage or secret turns the feature off', () => {
  assert.equal(getStore({ NODE_ENV: 'production' }), null);
  assert.equal(engageConfig({ NODE_ENV: 'production' }), null);
  assert.equal(engageConfig({ NODE_ENV: 'production', KV_REST_API_URL: 'https://x.upstash.io', KV_REST_API_TOKEN: 't' }), null, 'no secret');
  assert.equal(engageConfig({ NODE_ENV: 'production', KV_REST_API_URL: 'https://x.upstash.io', KV_REST_API_TOKEN: 't', COMMENTS_SECRET: 'short' }), null);
  assert.equal(engageConfig({ NODE_ENV: 'production', UPSTASH_REDIS_REST_URL: 'https://x.upstash.io', UPSTASH_REDIS_REST_TOKEN: 't', COMMENTS_SECRET: SECRET }).store.kind, 'redis');
  assert.equal(engageConfig({ NODE_ENV: 'development' }).store.kind, 'memory');
  assert.equal(engageConfig({ NODE_ENV: 'test' }).store.kind, 'memory');
});
