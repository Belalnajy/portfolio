/**
 * One-off generator for a LinkedIn client-logo grid.
 * Not part of the site build; nothing imports this.
 *
 *   node scripts/clients-grid.mjs                 # -> public/og/clients-grid.png
 *   node scripts/clients-grid.mjs --list          # show the selection and why
 *
 * Output: 1200x1200, six columns by four rows, on #111A23.
 *
 * The thing that makes a logo grid look professional is normalisation, so this
 * does two passes. First it flattens every mark to a single white silhouette
 * and measures its actual ink area. Then it scales each one so every cell
 * carries roughly the same visual weight, rather than the same width or height:
 * a wide wordmark and a square icon fitted to the same box read as wildly
 * different weights, which is the usual giveaway.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOGO_DIR = path.join(ROOT, 'public', 'logos');
const OUT_DIR = path.join(ROOT, 'public', 'og');
const OUT = path.join(OUT_DIR, 'clients-grid.png');

const POSTER = process.argv.includes('--poster');

// ── canvas geometry ────────────────────────────────────────────────────────
const SIZE = 1200;
const TEXT_BLOCK = 180; // reserved at the bottom
const MARGIN = 72; // outer margin, and the text's left edge
/* Both variants carry the same 24 marks. The plain grid leads with the logos,
   so it gets the square 6x4 block. The poster leads with a headline and uses
   the logos as evidence, so it lays them out wider and shorter to leave the
   top half of the canvas to the claim. */
const COLS = POSTER ? 8 : 6;
const ROWS = POSTER ? 3 : 4;
const GUTTER = POSTER ? 20 : 24;
const CELL = (SIZE - MARGIN * 2 - GUTTER * (COLS - 1)) / COLS; // 156 | 114.5
const CLEAR = POSTER ? 17 : 24; // minimum clear space inside every cell
const INNER = CELL - CLEAR * 2; // 108 | 80.5, the box a logo must fit inside

const BG = '#111A23';
const COPPER = '#E0A03C';
const INK = 'rgba(255, 255, 255, 0.85)';
const MUTED = '#8194A5';

/**
 * Excluded: these are places Belal studied, interned, was employed, or
 * co-founded. None of them hired him, so none belong in a client grid.
 * (The partner and backer logos named in the brief — Plug and Play, GIZ,
 * ITIDA, Microsoft for Startups — are not in public/logos at all.)
 */
const NOT_CLIENTS = {
  'alex-uni-logo.png': 'his university',
  'iti-logo.png': 'training institute / employer',
  'ezzsteel-logo.png': 'internship employer',
  'sf-logo.png': 'employer',
  'indstrz-logo.png': 'his own co-founded startup',
};

/**
 * Order drives placement. The first twelve fill the top two rows, so the most
 * recognisable work is what someone sees before they stop scrolling.
 */
const FEATURED = [
  'bilqalam-logo.png',
  'injaz-logo.png',
  'hcholding-logo.png',
  'mada-logo.png',
  'mutlq-logo.png',
  'toyo228-logo.png',
  'motors-logo.png',
  'medicta-logo.png',
  'uduipa-logo.png',
  'waferlee.png',
  'KMBC-logo.png',
  'rabzan-logo.svg',
];

const REST = [
  'CME-logo.png',
  'DiaMonitor-logo.png',
  'sonomedix-logo.png',
  'profleet-logo.png',
  'baserah-logo.png',
  'quotemate-logo.png',
  'dmagni-logo.png',
  'nextstop-logo.png',
  'manqla-logo.png',
  'amarna-logo.png',
  'upafa-edu-logo.png',
  '21-secondary-logo.png',
];

const SELECTED = [...FEATURED, ...REST];

if (process.argv.includes('--list')) {
  console.log(`\nSELECTED (${SELECTED.length}) — rows 1-2 are the featured twelve\n`);
  SELECTED.forEach((f, i) =>
    console.log(`  ${String(i + 1).padStart(2)}. ${f}${i === 11 ? '\n  ---- rows 3-4 ----' : ''}`),
  );
  console.log(`\nEXCLUDED (${Object.keys(NOT_CLIENTS).length})\n`);
  for (const [f, why] of Object.entries(NOT_CLIENTS)) console.log(`  ${f.padEnd(26)}${why}`);
  process.exit(0);
}

if (SELECTED.length !== COLS * ROWS) {
  console.error(`Need exactly ${COLS * ROWS} logos, got ${SELECTED.length}.`);
  process.exit(1);
}

const missing = SELECTED.filter((f) => !existsSync(path.join(LOGO_DIR, f)));
if (missing.length) {
  console.error('Missing from public/logos:', missing.join(', '));
  process.exit(1);
}

const mime = (f) => (f.endsWith('.svg') ? 'image/svg+xml' : 'image/png');
const dataUri = (f) =>
  `data:${mime(f)};base64,${readFileSync(path.join(LOGO_DIR, f)).toString('base64')}`;

const logos = SELECTED.map((file) => ({ file, uri: dataUri(file) }));

// The site's own Inter subset, so the poster matches the site's typography.
const FONT = path.join(ROOT, '.next/static/media/83afe278b6a6bb3c-s.p.0q-301v4kxxnr.woff2');
const fontUri = existsSync(FONT)
  ? `data:font/woff2;base64,${readFileSync(FONT).toString('base64')}`
  : null;
if (!fontUri) {
  console.warn('Inter subset not found (run `npm run build` first); falling back to system sans.');
}

const { chromium } = await import('playwright').catch(async () => {
  // Fall back to a globally installed playwright when one is not a dependency.
  return import('/opt/node22/lib/node_modules/playwright/index.js').then((m) => m.default ?? m);
});

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ['--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE } });

/* ── pass 1: flatten to a white silhouette and measure ink area ───────────── */
const measured = await page.evaluate(async ({ logos, INNER }) => {
  const load = (src) =>
    new Promise((res, rej) => {
      const im = new Image();
      im.onload = () => res(im);
      im.onerror = () => rej(new Error('load failed'));
      im.src = src;
    });

  const out = [];
  for (const { file, uri } of logos) {
    let im;
    try {
      im = await load(uri);
    } catch {
      out.push({ file, error: 'could not decode' });
      continue;
    }
    const w = im.naturalWidth || 300;
    const h = im.naturalHeight || 300;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(im, 0, 0, w, h);
    const px = ctx.getImageData(0, 0, w, h).data;

    /**
     * Decide what actually carries the artwork.
     *
     * A mark drawn on transparency has its shape in the alpha channel. But
     * plenty of logos are a filled disc or plate that is opaque edge to edge,
     * and there the alpha channel is a featureless blob: every internal detail
     * lives in colour. Masking those by alpha yields a solid circle, which is
     * the classic logo-grid failure.
     *
     * The test is how densely the mark fills its own bounding box, not how
     * opaque it is. Crisp text on transparency is fully opaque too, but it only
     * covers a fraction of its box; a plate covers nearly all of it.
     */
    let bx0 = w, by0 = h, bx1 = -1, by1 = -1;
    let visiblePx = 0;
    let lumSum = 0;
    let lumSqSum = 0;
    for (let i = 0; i < px.length; i += 4) {
      if (px[i + 3] < 24) continue;
      visiblePx++;
      const lv = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
      lumSum += lv;
      lumSqSum += lv * lv;
      const p = i / 4;
      const x = p % w;
      const y = (p / w) | 0;
      if (x < bx0) bx0 = x;
      if (x > bx1) bx1 = x;
      if (y < by0) by0 = y;
      if (y > by1) by1 = y;
    }
    if (bx1 < 0) {
      out.push({ file, error: 'fully transparent' });
      continue;
    }
    const boxArea = (bx1 - bx0 + 1) * (by1 - by0 + 1);
    const coverage = visiblePx / boxArea;
    const meanLum = visiblePx ? lumSum / visiblePx : 0;
    // Spread of luminance inside the mark: a plate carrying artwork varies a
    // lot, a genuinely flat shape does not (and has nothing to recover).
    const lumSd = Math.sqrt(Math.max(0, lumSqSum / Math.max(1, visiblePx) - meanLum * meanLum));
    /* A filled circle covers only pi/4 (0.785) of its bounding box even when
       completely solid, so the coverage bar sits below that. Pairing it with
       the variance test keeps dense wordmarks from being misread as plates. */
    const filled = coverage > 0.72 && lumSd > 0.06;
    // A light plate carries dark artwork, and vice versa.
    const inkIsDark = meanLum > 0.5;

    const sil = document.createElement('canvas');
    sil.width = w;
    sil.height = h;
    const sctx = sil.getContext('2d');
    const img = sctx.createImageData(w, h);
    let ink = 0;
    let minX = w, minY = h, maxX = -1, maxY = -1;
    for (let i = 0; i < px.length; i += 4) {
      const srcA = px[i + 3] / 255;
      let a = srcA;
      if (filled && srcA > 0.09) {
        const l = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
        // Normalised around the plate's own mean, so low-contrast marks survive.
        const signed = inkIsDark ? meanLum - l : l - meanLum;
        a = Math.min(1, Math.max(0, signed / 0.30)) * srcA;
      }
      img.data[i] = 255;
      img.data[i + 1] = 255;
      img.data[i + 2] = 255;
      img.data[i + 3] = Math.round(a * 255);
      if (a > 0.12) {
        ink += a;
        const p = i / 4;
        const x = p % w;
        const y = (p / w) | 0;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
    sctx.putImageData(img, 0, 0);

    if (maxX < 0) {
      out.push({ file, error: 'no visible pixels' });
      continue;
    }

    // Trim the transparent padding so cell fitting uses the real artwork.
    const tw = maxX - minX + 1;
    const th = maxY - minY + 1;
    const trimmed = document.createElement('canvas');
    trimmed.width = tw;
    trimmed.height = th;
    trimmed.getContext('2d').drawImage(sil, minX, minY, tw, th, 0, 0, tw, th);

    // Ink area once fitted to the cell's inner box, in final pixels.
    const contain = Math.min(INNER / tw, INNER / th);
    out.push({
      file,
      uri: trimmed.toDataURL('image/png'),
      w: tw,
      h: th,
      contain,
      inkAtContain: ink * contain * contain,
      filled,
      coverage,
      lumSd,
    });
  }
  return out;
}, { logos, INNER });

const failed = measured.filter((m) => m.error);
if (failed.length) failed.forEach((f) => console.warn(`  ! ${f.file}: ${f.error}`));

const ok = measured.filter((m) => !m.error);
const areas = ok.map((m) => m.inkAtContain).sort((a, b) => a - b);
const target = areas[Math.floor(areas.length / 2)]; // median

/**
 * Scale by the square root of the area ratio, since area grows with the square
 * of scale. Clamped: never larger than the cell allows, and never so small a
 * light mark disappears.
 */
const MIN_REL = 0.62;
const MAX_REL = 1.0;
for (const m of ok) {
  const rel = Math.sqrt(target / m.inkAtContain);
  m.rel = Math.max(MIN_REL, Math.min(MAX_REL, rel));
  m.drawW = m.w * m.contain * m.rel;
  m.drawH = m.h * m.contain * m.rel;
  m.finalInk = m.inkAtContain * m.rel * m.rel;
}

console.log(`\n  ${'logo'.padEnd(26)}${'aspect'.padStart(8)}${'fit%'.padStart(7)}${'ink px²'.padStart(10)}`);
console.log('  ' + '-'.repeat(52));
for (const m of ok) {
  console.log(
    `  ${m.file.padEnd(26)}${(m.w / m.h).toFixed(2).padStart(8)}` +
      `${Math.round(m.rel * 100).toString().padStart(6)}%${Math.round(m.finalInk).toString().padStart(10)}` +
      (m.filled ? `   (plate cov ${m.coverage.toFixed(2)} sd ${m.lumSd.toFixed(2)})` : ''),
  );
}
const fin = ok.map((m) => m.finalInk);
console.log(
  `\n  ink area spread before: ${Math.round(Math.min(...areas))}–${Math.round(Math.max(...areas))} px²` +
    `   after: ${Math.round(Math.min(...fin))}–${Math.round(Math.max(...fin))} px²`,
);

/* ── pass 2: compose and shoot ───────────────────────────────────────────── */
const gridH = ROWS * CELL + (ROWS - 1) * GUTTER;
/* Plain grid centres the block above the text. The poster fixes the grid's top
   edge below the headline block, which measures ~479px tall, plus the rule and
   its label. Leaves ~93px between the last row and the footer. */
const POSTER_RULE_TOP = 560;
const gridTop = POSTER ? 640 : Math.round((SIZE - TEXT_BLOCK - gridH) / 2);

const cells = ok
  .map((m, i) => {
    const col = i % COLS;
    const row = (i / COLS) | 0;
    const x = MARGIN + col * (CELL + GUTTER);
    const y = gridTop + row * (CELL + GUTTER);
    return `<img src="${m.uri}" style="left:${x + (CELL - m.drawW) / 2}px;top:${
      y + (CELL - m.drawH) / 2
    }px;width:${m.drawW}px;height:${m.drawH}px">`;
  })
  .join('\n');

const plainText = `
<div class="txt">
  <h1>24 clients. 31 projects.</h1>
  <p>Egypt &middot; Saudi Arabia &middot; Gulf</p>
</div>`;

/* The poster leads with the claim and uses the grid as evidence underneath it,
   which is what stops a thumb on a feed. The plain grid leads with the logos. */
const posterText = `
<div class="hero">
  <div class="eyebrow">Selected client work</div>
  <h1><span class="n">24</span> clients.<br><span class="n">31</span> projects.</h1>
  <p>Production platforms across Egypt, Saudi Arabia and the Gulf.<br>
     Accredited LMS, billing and invoicing, B2B dashboards.</p>
</div>
<div class="rule"></div>
<div class="rule-label">The teams behind them</div>
<div class="foot"><span>Belal Nagy</span><span class="dot">&middot;</span><span>Full-Stack Developer</span><span class="dot">&middot;</span><span class="site">belalnagy.com</span></div>`;

const html = `<style>
  ${fontUri ? `@font-face{font-family:Inter;src:url(${fontUri}) format('woff2');font-weight:100 900;}` : ''}
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${SIZE}px;height:${SIZE}px;overflow:hidden;background:${BG};
       font-family:Inter,system-ui,sans-serif;position:relative}
  img{position:absolute;opacity:${POSTER ? 0.8 : 0.85};object-fit:contain}

  .txt{position:absolute;left:${MARGIN}px;bottom:${MARGIN}px}
  .txt h1{font-size:64px;line-height:1.05;font-weight:700;color:#fff;letter-spacing:-1.5px}
  .txt p{font-size:30px;line-height:1.3;font-weight:500;color:${MUTED};margin-top:16px;letter-spacing:.2px}

  .hero{position:absolute;left:${MARGIN}px;top:104px;right:${MARGIN}px}
  .eyebrow{font-size:22px;font-weight:700;letter-spacing:5px;text-transform:uppercase;
           color:${COPPER};margin-bottom:26px}
  .hero h1{font-size:104px;line-height:1.02;font-weight:800;color:#fff;letter-spacing:-3.5px}
  .hero .n{color:${COPPER}}
  .hero p{font-size:26px;line-height:1.5;font-weight:500;color:${MUTED};margin-top:26px}

  .rule{position:absolute;left:${MARGIN}px;right:${MARGIN}px;top:${POSTER_RULE_TOP}px;
        height:1px;background:rgba(255,255,255,.14)}
  .rule-label{position:absolute;left:${MARGIN}px;top:${POSTER_RULE_TOP + 24}px;
              font-size:19px;font-weight:700;letter-spacing:3.5px;text-transform:uppercase;
              color:${MUTED}}

  .foot{position:absolute;left:${MARGIN}px;bottom:56px;display:flex;align-items:center;gap:14px;
        font-size:22px;font-weight:600;color:${MUTED};letter-spacing:.2px}
  .foot .dot{opacity:.5}
  .foot .site{color:${COPPER}}
</style>
${cells}
${POSTER ? posterText : plainText}`;

await page.setContent(html);
if (fontUri) await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);
mkdirSync(OUT_DIR, { recursive: true });
await page.screenshot({ path: POSTER ? OUT.replace('.png', '-poster.png') : OUT });
await browser.close();

console.log(`\n  wrote ${path.relative(ROOT, POSTER ? OUT.replace('.png','-poster.png') : OUT)}  ${SIZE}x${SIZE}\n`);
