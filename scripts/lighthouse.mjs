/**
 * Lighthouse run against a locally served production build.
 *
 *   npm run build && npx next start -p 4310
 *   CHROME_PATH=<chromium> node scripts/lighthouse.mjs http://127.0.0.1:4310/ "label"
 *
 * Reports the four category scores plus CLS/LCP/FCP/TBT and the color-contrast
 * audit, which is the one that regresses first when the palette changes.
 */
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const url = process.argv[2];
const label = process.argv[3] || 'run';
const chrome = await launch({
  chromePath: '/opt/pw-browsers/chromium',
  chromeFlags: ['--headless=new','--no-sandbox','--disable-gpu'],
});
const res = await lighthouse(url, {
  port: chrome.port,
  output: 'json',
  logLevel: 'error',
  onlyCategories: ['performance','accessibility','best-practices','seo'],
  formFactor: 'mobile',
  screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 2, disabled: false },
});
const c = res.lhr.categories;
const a = res.lhr.audits;
console.log(`\n=== ${label} ===`);
for (const k of ['performance','accessibility','best-practices','seo'])
  console.log(`  ${k.padEnd(16)} ${Math.round(c[k].score*100)}`);
console.log(`  --- key metrics ---`);
for (const k of ['cumulative-layout-shift','largest-contentful-paint','first-contentful-paint','total-blocking-time'])
  if (a[k]) console.log(`  ${k.padEnd(28)} ${a[k].displayValue}`);
const contrast = a['color-contrast'];
if (contrast) console.log(`  color-contrast audit         ${contrast.score === 1 ? 'PASS' : 'FAIL ('+(contrast.details?.items?.length||0)+' nodes)'}`);
await chrome.kill();
