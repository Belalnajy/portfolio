/**
 * Lighthouse run against a locally served production build.
 *
 *   npm run build && npx next start -p 4310
 *   node scripts/lighthouse.mjs http://127.0.0.1:4310/ "label" [--desktop]
 *     [--min-perf 80] [--min-a11y 95] [--min-seo 100] [--min-bp 100]
 *
 * Reports the four category scores plus CLS/LCP/FCP/TBT and the color-contrast
 * audit, which is the one that regresses first when the palette changes.
 * Any --min-* threshold that is not met exits non-zero, so CI can use it as a
 * budget. Set CHROME_PATH to point at a specific browser; otherwise
 * chrome-launcher looks for an installed Chrome/Chromium.
 */
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const args = process.argv.slice(2);
const url = args[0];
const label = args[1] && !args[1].startsWith('--') ? args[1] : 'run';
const flag = (name) => { const i = args.indexOf(name); return i === -1 ? undefined : Number(args[i + 1]); };
const desktop = args.includes('--desktop');
const minimums = { performance: flag('--min-perf'), accessibility: flag('--min-a11y'), seo: flag('--min-seo'), 'best-practices': flag('--min-bp') };

const chrome = await launch({
  chromePath: process.env.CHROME_PATH || undefined,
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
});
const res = await lighthouse(url, {
  port: chrome.port,
  output: 'json',
  logLevel: 'error',
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  formFactor: desktop ? 'desktop' : 'mobile',
  screenEmulation: desktop
    ? { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false }
    : { mobile: true, width: 390, height: 844, deviceScaleFactor: 2, disabled: false },
  ...(desktop ? { throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 } } : {}),
});
const c = res.lhr.categories;
const a = res.lhr.audits;
let failed = false;
console.log(`\n=== ${label} (${desktop ? 'desktop' : 'mobile'}) ===`);
for (const k of ['performance', 'accessibility', 'best-practices', 'seo']) {
  const score = Math.round(c[k].score * 100);
  const min = minimums[k];
  const verdict = min === undefined ? '' : score >= min ? '  ok' : `  FAIL (< ${min})`;
  if (min !== undefined && score < min) failed = true;
  console.log(`  ${k.padEnd(16)} ${score}${verdict}`);
}
console.log(`  --- key metrics ---`);
for (const k of ['cumulative-layout-shift', 'largest-contentful-paint', 'first-contentful-paint', 'total-blocking-time'])
  if (a[k]) console.log(`  ${k.padEnd(28)} ${a[k].displayValue}`);
const contrast = a['color-contrast'];
if (contrast) console.log(`  color-contrast audit         ${contrast.score === 1 ? 'PASS' : 'FAIL (' + (contrast.details?.items?.length || 0) + ' nodes)'}`);
await chrome.kill();
if (failed) { console.error('\nLighthouse budget not met.'); process.exit(1); }
