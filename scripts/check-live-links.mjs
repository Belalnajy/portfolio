/*
 * Checks that every client site and store page the portfolio links to is
 * still up, so a lapsed domain, an expired certificate or a deleted Vercel
 * deployment is caught before a visitor finds it.
 *
 *   npm run links
 *
 * Reads the project registry (src/lib/case-studies.js) and checks each
 * project's `liveUrl`, plus its App Store / Play Store and GitHub links when
 * present. GitHub turns away bursts of anonymous requests (403/429), so a
 * `github` link that is only rate-limited is a warning, never a failure.
 * Each link gets a browser-like GET (redirects followed, 20 s timeout), six at
 * a time. Timeouts, connection errors and 5xx are retried twice (after 5 s,
 * then 15 s) so a blip does not fail the weekly run; a link that only passed
 * on a retry shows its attempt number. DNS and certificate errors and redirect
 * loops fail at once. A registry URL that does not parse is a FAIL row, not a
 * crash.
 *
 * OK      2xx, after any redirects.
 * WARN    401/403/406/429 with an HTML page (a real server turning bots away),
 *         a redirect to a different host (domain lapsed, sold or moved), or a
 *         page that reads like a domain-parking page.
 * FAIL    DNS failure, connection refused or reset, timeout, TLS/certificate
 *         error, 404/410, 5xx, any other 4xx, or a block with no page behind it.
 *
 * Prints a table (and appends it to $GITHUB_STEP_SUMMARY in Actions), then
 * exits 1 if any link failed. Warnings alone exit 0. No dependencies.
 */
import tls from 'node:tls';
import { appendFileSync } from 'node:fs';
import { CASE_STUDIES } from '../src/lib/case-studies.js';

const TIMEOUT_MS = 20_000;
const CONCURRENCY = 6;
// Waits before the 2nd and 3rd attempt at a link that timed out, failed to
// connect or answered 5xx. DNS and certificate errors fail at once.
const RETRY_DELAYS_MS = [5_000, 15_000];
const LINK_FIELDS = ['liveUrl', 'appStoreUrl', 'playStoreUrl', 'playStore', 'github'];

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8',
  'Upgrade-Insecure-Requests': '1',
};

const BOT_BLOCK_STATUSES = new Set([401, 403, 406, 429]);
const PARKED =
  /domain (?:name )?(?:is|may be) for sale|buy this domain|this domain has expired|domain has been registered|parked (?:free|domain)|sedoparking|afternic|hugedomains|dan\.com\/buy/i;

const DNS_CODES = new Set(['ENOTFOUND', 'EAI_AGAIN', 'EAI_NONAME', 'EAI_NODATA', 'ENODATA']);
const REFUSED_CODES = new Set(['ECONNREFUSED', 'ECONNRESET', 'EHOSTUNREACH', 'ENETUNREACH', 'EPIPE', 'UND_ERR_SOCKET']);
const TIMEOUT_CODES = new Set(['ETIMEDOUT', 'UND_ERR_CONNECT_TIMEOUT', 'UND_ERR_HEADERS_TIMEOUT', 'UND_ERR_BODY_TIMEOUT']);
const TLS_CODES = new Set([
  'CERT_HAS_EXPIRED',
  'CERT_NOT_YET_VALID',
  'DEPTH_ZERO_SELF_SIGNED_CERT',
  'SELF_SIGNED_CERT_IN_CHAIN',
  'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
  'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',
  'UNABLE_TO_GET_ISSUER_CERT',
  'ERR_TLS_CERT_ALTNAME_INVALID',
  'CERT_REVOKED',
  'CERT_UNTRUSTED',
  'ERR_SSL_WRONG_VERSION_NUMBER',
  'EPROTO',
]);

// Matched on the error code only: a message can contain a hostname such as "badssl.com".
const isCertError = (code) => TLS_CODES.has(code) || /^ERR_(SSL|TLS)_/.test(code ?? '');
const isRedirectLoop = (err) => /redirect/i.test(innermostMessage(err));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** The URL, if it is an absolute http(s) URL; otherwise null. */
function parseUrl(url) {
  try {
    const parsed = new URL(url);
    return /^https?:$/.test(parsed.protocol) ? parsed : null;
  } catch {
    return null;
  }
}
const bareHost = (url) => new URL(url).hostname.toLowerCase().replace(/^www\./, '');

/** Walks fetch's error chain (TypeError -> cause -> AggregateError.errors) for the first error code. */
function errorCode(err) {
  const seen = new Set();
  const queue = [err];
  while (queue.length) {
    const e = queue.shift();
    if (!e || typeof e !== 'object' || seen.has(e)) continue;
    seen.add(e);
    if (e.name === 'TimeoutError' || e.name === 'AbortError') return 'TIMEOUT';
    if (typeof e.code === 'string') return e.code;
    if (e.cause) queue.push(e.cause);
    if (Array.isArray(e.errors)) queue.push(...e.errors);
  }
  return null;
}

function innermostMessage(err) {
  let e = err;
  while (e?.cause) e = e.cause;
  if (Array.isArray(e?.errors) && e.errors[0]) e = e.errors[0];
  return e?.message || String(err);
}

/** On a TLS failure, connects once more without verification to say what is wrong with the certificate. */
function describeCertificate(url) {
  const { hostname, port } = new URL(url);
  return new Promise((resolve) => {
    const socket = tls.connect({ host: hostname, port: Number(port) || 443, servername: hostname, rejectUnauthorized: false });
    const done = (text) => {
      socket.destroy();
      resolve(text);
    };
    socket.setTimeout(10_000, () => done(''));
    socket.once('error', () => done(''));
    socket.once('secureConnect', () => {
      const cert = socket.getPeerCertificate();
      if (!cert || !cert.valid_to) return done('');
      const cn = cert.subject?.CN ?? '?';
      const issuer = cert.issuer?.O ?? cert.issuer?.CN ?? '?';
      const expired = new Date(cert.valid_to) < new Date();
      done(`cert CN=${cn}, issuer ${issuer}, ${expired ? 'EXPIRED' : 'valid until'} ${new Date(cert.valid_to).toISOString().slice(0, 10)}`);
    });
  });
}

async function fetchOnce(url) {
  const res = await fetch(url, { method: 'GET', redirect: 'follow', headers: HEADERS, signal: AbortSignal.timeout(TIMEOUT_MS) });
  const body = await res.text();
  return { status: res.status, finalUrl: res.url || url, redirected: res.redirected, contentType: res.headers.get('content-type') ?? '', body };
}

async function check(link) {
  const { url } = link;
  if (!parseUrl(url)) return { ...link, level: 'FAIL', result: 'Malformed URL', detail: 'not an absolute http(s) URL; fix it in src/lib/case-studies.js' };
  let attempt = 0;
  let response;
  let error;
  while (true) {
    attempt += 1;
    error = undefined;
    response = undefined;
    try {
      response = await fetchOnce(url);
    } catch (err) {
      error = err;
    }
    const code = error ? errorCode(error) : null;
    // A redirect loop is a misconfiguration, not a blip: retrying only adds 20 s.
    const transient = error ? !DNS_CODES.has(code) && !isCertError(code) && !isRedirectLoop(error) : response.status >= 500;
    if (!transient || attempt > RETRY_DELAYS_MS.length) break;
    await sleep(RETRY_DELAYS_MS[attempt - 1]);
  }
  const result = await classify(link, response, error);
  // A link that only came good on a retry says so, so a flaky host is visible before it dies.
  if (attempt > 1 && result.level !== 'FAIL') result.result += ` (attempt ${attempt})`;
  if (attempt > 1 && result.level === 'FAIL') result.detail = `${result.detail}${result.detail ? '; ' : ''}failed all ${attempt} attempts`;
  return result;
}

async function classify(link, response, error) {
  const { url, field } = link;

  if (error) {
    const code = errorCode(error) ?? 'UNKNOWN';
    const message = innermostMessage(error);
    if (DNS_CODES.has(code)) return { ...link, level: 'FAIL', result: 'DNS failure', detail: `${code}: host does not resolve` };
    if (code === 'TIMEOUT' || TIMEOUT_CODES.has(code)) return { ...link, level: 'FAIL', result: 'Timeout', detail: code === 'UND_ERR_CONNECT_TIMEOUT' ? `${code}: could not open a connection` : `no complete response in ${TIMEOUT_MS / 1000} s (${code})` };
    if (REFUSED_CODES.has(code)) return { ...link, level: 'FAIL', result: 'Connection failed', detail: `${code}: ${message}` };
    if (isCertError(code)) {
      const cert = await describeCertificate(url);
      return { ...link, level: 'FAIL', result: 'TLS/certificate', detail: `${code}: ${message}${cert ? `; ${cert}` : ''}` };
    }
    if (/redirect/i.test(message)) return { ...link, level: 'FAIL', result: 'Redirect loop', detail: message };
    return { ...link, level: 'FAIL', result: 'Network error', detail: `${code}: ${message}` };
  }

  const { status, finalUrl, redirected, contentType, body } = response;
  const hops = redirected ? ` -> ${finalUrl}` : '';
  const isHtml = /html/i.test(contentType) || /<html|<!doctype html/i.test(body.slice(0, 2000));
  const notes = [];
  // Store links legitimately bounce between store hosts; only a project's own site is checked for a host change.
  if (field === 'liveUrl' && bareHost(finalUrl) !== bareHost(url)) notes.push(`redirects to another host: ${new URL(finalUrl).hostname}`);
  if (status < 400 && PARKED.test(body)) notes.push('page looks like a domain-parking / for-sale page');

  if (status >= 200 && status < 300) {
    if (notes.length) return { ...link, level: 'WARN', result: `${status} OK, check`, detail: notes.join('; ') + hops };
    return { ...link, level: 'OK', result: `${status} OK`, detail: hops.trim() };
  }
  if (BOT_BLOCK_STATUSES.has(status)) {
    if (field === 'github' && (status === 403 || status === 429)) {
      return { ...link, level: 'WARN', result: `${status} rate-limited`, detail: 'GitHub turned the request away; not a sign the repository is gone' + hops };
    }
    if (isHtml && body.trim().length > 0) {
      return { ...link, level: 'WARN', result: `${status} blocked bots`, detail: [`server answered with an HTML page (${body.length} bytes)`, ...notes].join('; ') + hops };
    }
    return { ...link, level: 'FAIL', result: `${status} empty`, detail: `HTTP ${status} with no page behind it` + hops };
  }
  if (status === 404 || status === 410) return { ...link, level: 'FAIL', result: `${status} ${status === 404 ? 'Not Found' : 'Gone'}`, detail: [...notes].join('; ') + hops };
  if (status >= 500) return { ...link, level: 'FAIL', result: `${status} server error`, detail: hops.trim() };
  return { ...link, level: 'FAIL', result: `HTTP ${status}`, detail: [...notes].join('; ') + hops };
}

async function pool(items, size, worker) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await worker(items[i]);
      }
    }),
  );
  return results;
}

function collectLinks() {
  const links = [];
  const seen = new Set();
  for (const [slug, project] of Object.entries(CASE_STUDIES)) {
    for (const field of LINK_FIELDS) {
      const url = project[field];
      if (typeof url !== 'string' || !url || seen.has(url)) continue;
      seen.add(url);
      links.push({ slug, field, url });
    }
  }
  return links;
}

function textTable(rows) {
  const head = ['', 'Project', 'Field', 'URL', 'Result', 'Detail'];
  const body = rows.map((r) => [r.level, r.slug, r.field, r.url, r.result, r.detail]);
  const widths = head.map((_, c) => Math.max(...[head, ...body].map((row) => (c === 5 ? 0 : String(row[c]).length))));
  const line = (row) => row.map((cell, c) => (c === 5 ? cell : String(cell).padEnd(widths[c]))).join('  ').trimEnd();
  return [line(head), line(head.map((_, c) => '-'.repeat(c === 5 ? 6 : widths[c]))), ...body.map(line)].join('\n');
}

function markdownTable(rows, summary) {
  const esc = (s) => String(s).replace(/\|/g, '\\|');
  const icon = { OK: 'OK', WARN: ':warning: WARN', FAIL: ':x: FAIL' };
  return [
    '## Live links',
    '',
    summary,
    '',
    '| | Project | Field | URL | Result | Detail |',
    '|---|---|---|---|---|---|',
    ...rows.map((r) => `| ${icon[r.level]} | ${esc(r.slug)} | ${r.field} | ${esc(r.url)} | ${esc(r.result)} | ${esc(r.detail)} |`),
    '',
  ].join('\n');
}

const links = collectLinks();
console.log(`Checking ${links.length} links (${CONCURRENCY} at a time, ${TIMEOUT_MS / 1000} s timeout)...\n`);
const order = { FAIL: 0, WARN: 1, OK: 2 };
const rows = (await pool(links, CONCURRENCY, check)).sort((a, b) => order[a.level] - order[b.level] || a.slug.localeCompare(b.slug));
const count = (level) => rows.filter((r) => r.level === level).length;
const summary = `${count('OK')} ok, ${count('WARN')} warning(s), ${count('FAIL')} failed, of ${rows.length} links.`;

console.log(textTable(rows));
console.log(`\n${summary}`);

if (process.env.GITHUB_STEP_SUMMARY) {
  try {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdownTable(rows, summary));
  } catch (err) {
    console.error(`Could not write the step summary: ${err.message}`);
  }
}

if (count('FAIL') > 0) {
  console.error(`\n${count('FAIL')} link(s) are down. Fix the site or update its liveUrl in src/lib/case-studies.js.`);
  process.exitCode = 1;
}
