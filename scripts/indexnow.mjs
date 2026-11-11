#!/usr/bin/env node
/**
 * IndexNow ping: tells Bing (and through it ChatGPT Search and Copilot),
 * Yandex, Naver and Seznam that pages changed, instead of waiting for their
 * crawlers to come round. Google does not take IndexNow; it reads the sitemap
 * submitted in Search Console.
 *
 * Reads the live sitemap, so run it after a deploy, never before:
 *   node scripts/indexnow.mjs            # URLs whose lastmod is in the last 7 days
 *   node scripts/indexnow.mjs --days 30  # widen the window
 *   node scripts/indexnow.mjs --all      # every URL (first submission only)
 *   node scripts/indexnow.mjs --dry-run  # list what would be sent
 *
 * The key is public by design: the engines verify ownership by fetching
 * https://www.belalnagy.com/<key>.txt and comparing its contents.
 */
const SITE = 'https://www.belalnagy.com';
const KEY = '1b204111ec45dcfc9d6895d64d56a610';

const args = process.argv.slice(2);
const all = args.includes('--all');
const dryRun = args.includes('--dry-run');
const daysArg = args.indexOf('--days');
const days = daysArg >= 0 ? Number(args[daysArg + 1]) : 7;

const keyRes = await fetch(`${SITE}/${KEY}.txt`);
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
  console.error(`Key file ${SITE}/${KEY}.txt is not live yet. Deploy first.`);
  process.exit(1);
}

const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
const cutoff = Date.now() - days * 86_400_000;
const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
  .map(([, block]) => ({
    loc: block.match(/<loc>(.*?)<\/loc>/)?.[1],
    lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
  }))
  .filter(({ loc, lastmod }) => loc && (all || (lastmod && Date.parse(lastmod) >= cutoff)))
  .map(({ loc }) => loc);

if (!urls.length) {
  console.log(`No sitemap URLs changed in the last ${days} days; nothing to send.`);
  process.exit(0);
}

console.log(`${urls.length} URL(s)${all ? '' : ` changed in the last ${days} days`}:`);
for (const url of urls) console.log(`  ${url}`);
if (dryRun) process.exit(0);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  }),
});

// 200 = accepted, 202 = accepted, key validation pending.
console.log(`IndexNow: ${res.status} ${res.statusText}`);
if (res.status >= 300) {
  console.error(await res.text());
  process.exit(1);
}
