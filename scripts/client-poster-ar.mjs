/**
 * One-off generator for an Arabic LinkedIn poster: the real client logos on
 * cards, under a headline. Not part of the site build; nothing imports this.
 *
 *   node scripts/client-poster-ar.mjs            # -> public/og/client-poster-ar.png
 *   node scripts/client-poster-ar.mjs --en       # English variant
 *
 * Output: 1200x1200.
 *
 * Two things make a logo wall look designed rather than pasted. First, every
 * mark is cropped to its real artwork: most of these files carry a baked-in
 * background plate and a wide transparent margin, so fitting the raw file to a
 * card leaves each logo at a different apparent size. Second, they are scaled
 * by ink area rather than by width or height, so a long wordmark and a square
 * icon carry the same visual weight instead of the wordmark dominating.
 */
import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOGO_DIR = path.join(ROOT, 'public', 'logos');
const OUT_DIR = path.join(ROOT, 'public', 'og');

const EN = process.argv.includes('--en');
const OUT = path.join(OUT_DIR, EN ? 'client-poster-en.png' : 'client-poster-ar.png');

// ── canvas geometry ────────────────────────────────────────────────────────
const SIZE = 1200;
const MARGIN = 56;
const COLS = 6;
const ROWS = 4;
const GUTTER = 14;
const FRAME_PAD = 18; // the copper frame's inset around the card block
const CARD_W = (SIZE - MARGIN * 2 - FRAME_PAD * 2 - GUTTER * (COLS - 1)) / COLS;
const CARD_H = 106;
const CARD_PAD_X = 18;
const CARD_PAD_Y = 15;
const INNER_W = CARD_W - CARD_PAD_X * 2;
const INNER_H = CARD_H - CARD_PAD_Y * 2;

const BG = '#0E151D';
const COPPER = '#E0A03C';
const MUTED = '#8194A5';

/**
 * Excluded: places Belal studied, interned, was employed, or co-founded.
 * None of them hired him, so none belong in a client wall.
 */
const NOT_CLIENTS = {
  'alex-uni-logo.png': 'his university',
  'iti-logo.png': 'training institute / employer',
  'ezzsteel-logo.png': 'internship employer',
  'sf-logo.png': 'employer',
  'indstrz-logo.png': 'his own co-founded startup',
};

/** Order drives placement; the first twelve fill the top two rows. */
const SELECTED = [
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

if (process.argv.includes('--list')) {
  console.log(`\nSELECTED (${SELECTED.length})\n`);
  SELECTED.forEach((f, i) => console.log(`  ${String(i + 1).padStart(2)}. ${f}`));
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

// The site's own font files, so the poster matches the site's typography.
const fontFile = (rel) => {
  const p = path.join(ROOT, '.next/static/media', rel);
  return existsSync(p) ? `data:font/woff2;base64,${readFileSync(p).toString('base64')}` : null;
};
const CAIRO_AR = fontFile('9ff27b8a0a8f3dc0-s.p.170gfl_1xpie6.woff2');
const CAIRO_LAT = fontFile('d41831e24743a3c1-s.02r-fjhi~6g_a.woff2');
const INTER = fontFile('83afe278b6a6bb3c-s.p.0q-301v4kxxnr.woff2');
if (!CAIRO_AR || !INTER) {
  console.warn('Font subsets not found (run `npm run build` first); falling back to system fonts.');
}

const { chromium } = await import('playwright').catch(async () => {
  // Fall back to a globally installed playwright when one is not a dependency.
  return import('/opt/node22/lib/node_modules/playwright/index.js').then((m) => m.default ?? m);
});

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ['--no-sandbox'],
});
const page = await browser.newPage({
  viewport: { width: SIZE, height: SIZE },
  deviceScaleFactor: 1,
});

/* ── pass 1: crop each mark to its real artwork and measure its ink ───────── */
const measured = await page.evaluate(async ({ logos, INNER_W, INNER_H }) => {
  const load = (uri) =>
    new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = () => rej(new Error('decode failed'));
      img.src = uri;
    });

  const out = [];
  for (const { file, uri } of logos) {
    let img;
    try {
      img = await load(uri);
    } catch {
      out.push({ file, error: 'decode failed' });
      continue;
    }
    // SVGs report 0 intrinsic size in some cases; fall back to a working box.
    const w = img.naturalWidth || 512;
    const h = img.naturalHeight || 512;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);
    const px = ctx.getImageData(0, 0, w, h).data;

    const at = (x, y) => {
      const i = (y * w + x) * 4;
      return [px[i], px[i + 1], px[i + 2], px[i + 3]];
    };

    /* Many of these files ship with an opaque background plate. If all four
       corners agree on one opaque colour, that colour is the plate, not the
       mark, so it is excluded from the ink and the card adopts it instead. */
    const corners = [at(0, 0), at(w - 1, 0), at(0, h - 1), at(w - 1, h - 1)];
    const opaque = corners.every((c) => c[3] > 240);
    const agree =
      opaque &&
      corners.every((c) =>
        corners.every((d) => Math.abs(c[0] - d[0]) + Math.abs(c[1] - d[1]) + Math.abs(c[2] - d[2]) < 24),
      );
    const plate = agree ? corners[0].slice(0, 3) : null;

    let minX = w, minY = h, maxX = -1, maxY = -1, ink = 0, lumSum = 0;
    let opaquePx = 0, opaqueLum = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const [r, g, b, a] = at(x, y);
        if (a > 200) {
          opaquePx++;
          opaqueLum += (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        }
        if (a < 24) continue;
        // Distance from the plate colour decides whether this pixel is artwork.
        if (plate) {
          const d = Math.abs(r - plate[0]) + Math.abs(g - plate[1]) + Math.abs(b - plate[2]);
          if (d < 30) continue;
        }
        const wgt = a / 255;
        ink += wgt;
        lumSum += ((0.2126 * r + 0.7152 * g + 0.0722 * b) / 255) * wgt;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
    const inkLum = ink ? lumSum / ink : 0;
    if (maxX < 0) {
      out.push({ file, error: 'no visible artwork' });
      continue;
    }

    /* Some files carry a white box that the corner test misses, because the
       box does not reach the file's edge. Sample the border of the artwork's
       own bounding box: on a boxed logo that ring is opaque and light, while a
       mark drawn in white on transparency has a ring that is mostly empty. */
    let ringLight = 0, ringTotal = 0;
    for (let s = 0; s < 40; s++) {
      const f = s / 39;
      const pts = [
        [Math.round(minX + (maxX - minX) * f), minY],
        [Math.round(minX + (maxX - minX) * f), maxY],
        [minX, Math.round(minY + (maxY - minY) * f)],
        [maxX, Math.round(minY + (maxY - minY) * f)],
      ];
      for (const [x, y] of pts) {
        const [r, g, b, a] = at(x, y);
        ringTotal++;
        if (a > 200 && (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.88) ringLight++;
      }
    }
    /* And some sit on a light plaque inside a dark frame, so the ring reads
       dark. Those fill their box almost completely with light pixels, which a
       mark drawn in white on transparency never does. */
    const bboxArea = (maxX - minX + 1) * (maxY - minY + 1);
    const opaqueFill = opaquePx / bboxArea;
    const opaqueMeanLum = opaquePx ? opaqueLum / opaquePx : 0;
    const boxedOnWhite =
      (ringTotal > 0 && ringLight / ringTotal > 0.6) ||
      (opaqueFill > 0.85 && opaqueMeanLum > 0.55);

    // Give a plate a little breathing room so the crop does not shave the mark.
    const pad = plate ? Math.round(Math.min(w, h) * 0.02) : 0;
    const x0 = Math.max(0, minX - pad);
    const y0 = Math.max(0, minY - pad);
    const tw = Math.min(w - x0, maxX - minX + 1 + pad * 2);
    const th = Math.min(h - y0, maxY - minY + 1 + pad * 2);

    const crop = document.createElement('canvas');
    crop.width = tw;
    crop.height = th;
    crop.getContext('2d').drawImage(c, x0, y0, tw, th, 0, 0, tw, th);

    const plateLum = plate
      ? (0.2126 * plate[0] + 0.7152 * plate[1] + 0.0722 * plate[2]) / 255
      : 1;
    const contain = Math.min(INNER_W / tw, INNER_H / th);
    out.push({
      file,
      uri: crop.toDataURL('image/png'),
      w: tw,
      h: th,
      contain,
      inkAtContain: ink * contain * contain,
      /* A card is white by default, because that is what most of these marks
         were drawn for. A dark baked-in plate cannot be hidden, so the card
         adopts it. A mark drawn in white on transparency would vanish, so it
         gets a dark card. A mark sitting on its own white box stays on white
         even when its ink reads light, or the box shows as a rectangle. */
      card:
        plate && plateLum < 0.45
          ? `rgb(${plate[0]},${plate[1]},${plate[2]})`
          : inkLum > 0.62 && !boxedOnWhite
            ? '#18222E'
            : '#FFFFFF',
      inkLum,
      boxedOnWhite,
      plate: plate ? `rgb(${plate[0]},${plate[1]},${plate[2]})` : null,
    });
  }
  return out;
}, { logos, INNER_W, INNER_H });

const failed = measured.filter((m) => m.error);
failed.forEach((f) => console.warn(`  ! ${f.file}: ${f.error}`));

const ok = measured.filter((m) => !m.error);
const areas = ok.map((m) => m.inkAtContain).sort((a, b) => a - b);
const target = areas[Math.floor(areas.length / 2)]; // median

/* Area grows with the square of scale, so correct by the square root of the
   ratio. Clamped so nothing overflows its card or shrinks out of sight. */
const MIN_REL = 0.68;
const MAX_REL = 1.0;
for (const m of ok) {
  const rel = Math.max(MIN_REL, Math.min(MAX_REL, Math.sqrt(target / m.inkAtContain)));
  m.rel = rel;
  m.drawW = m.w * m.contain * rel;
  m.drawH = m.h * m.contain * rel;
  m.finalInk = m.inkAtContain * rel * rel;
}

console.log(`\n  ${'logo'.padEnd(26)}${'aspect'.padStart(8)}${'fit%'.padStart(7)}${'ink px²'.padStart(10)}  card`);
console.log('  ' + '-'.repeat(62));
for (const m of ok) {
  console.log(
    `  ${m.file.padEnd(26)}${(m.w / m.h).toFixed(2).padStart(8)}` +
      `${Math.round(m.rel * 100).toString().padStart(6)}%${Math.round(m.finalInk).toString().padStart(10)}` +
      `  ${
        m.card === '#FFFFFF'
          ? `white${m.plate ? ' (plate trimmed)' : m.boxedOnWhite ? ' (boxed art)' : ''}`
          : `dark ${m.card}`
      }`,
  );
}
const fin = ok.map((m) => m.finalInk);
console.log(
  `\n  ink area spread before: ${Math.round(Math.min(...areas))}–${Math.round(Math.max(...areas))} px²` +
    `   after: ${Math.round(Math.min(...fin))}–${Math.round(Math.max(...fin))} px²`,
);

/* ── pass 2: compose and shoot ───────────────────────────────────────────── */
const COPY = EN
  ? {
      dir: 'ltr',
      font: 'Inter',
      h1: `Production work for <span class="c">real clients</span>`,
      // No figures here: the stat bar owns them, so repeating them reads as filler.
      sub: `Products running in Egypt, Saudi Arabia and the Gulf`,
      features: ['Accredited LMS', 'Billing and invoicing', 'B2B dashboards', 'Mobile apps'],
      label: 'The teams behind the work',
      stats: [
        ['24', 'clients'],
        ['31', 'projects'],
      ],
      foot: ['Belal Nagy', 'Full-Stack Developer', '<span class="site">belalnagy.com</span>'],
    }
  : {
      dir: 'rtl',
      font: 'Cairo',
      h1: `شغل حقيقي مع <span class="c">عملاء حقيقيين</span>`,
      sub: `منتجات شغالة في مصر والسعودية والخليج`,
      features: ['منصات تعليم معتمدة', 'فوترة وحسابات', 'لوحات تحكم B2B', 'تطبيقات موبايل'],
      label: 'الشركات اللي ورا الشغل ده',
      stats: [
        ['24', 'عميل'],
        ['31', 'مشروع'],
      ],
      foot: ['بلال ناجي', 'Full-Stack Developer', '<span class="site">belalnagy.com</span>'],
    };

const GRID_TOP = 382;
const STATS_BOTTOM = 104;
const gridW = COLS * CARD_W + (COLS - 1) * GUTTER;
const gridH = ROWS * CARD_H + (ROWS - 1) * GUTTER;

const cards = ok
  .map((m, i) => {
    const col = i % COLS;
    const row = (i / COLS) | 0;
    // Reading order follows the copy direction, so RTL fills right to left.
    const c = COPY.dir === 'rtl' ? COLS - 1 - col : col;
    const x = MARGIN + FRAME_PAD + c * (CARD_W + GUTTER);
    const y = GRID_TOP + FRAME_PAD + row * (CARD_H + GUTTER);
    return `<div class="card" style="left:${x}px;top:${y}px;background:${m.card}">
      <img src="${m.uri}" style="width:${m.drawW}px;height:${m.drawH}px">
    </div>`;
  })
  .join('\n');

const html = `<style>
  ${CAIRO_AR ? `@font-face{font-family:Cairo;src:url(${CAIRO_AR}) format('woff2');font-weight:200 1000;unicode-range:U+0600-06FF,U+0750-077F,U+FB50-FDFF,U+FE70-FEFF;}` : ''}
  ${CAIRO_LAT ? `@font-face{font-family:Cairo;src:url(${CAIRO_LAT}) format('woff2');font-weight:200 1000;}` : ''}
  ${INTER ? `@font-face{font-family:Inter;src:url(${INTER}) format('woff2');font-weight:100 900;}` : ''}
  *{margin:0;padding:0;box-sizing:border-box}
  /* Pin the root too. Without this, any overflowing child grows the scroll box,
     and in RTL the scroll origin flips, which shifts the whole painted page. */
  html{width:${SIZE}px;height:${SIZE}px;overflow:hidden}
  body{width:${SIZE}px;height:${SIZE}px;overflow:hidden;background:${BG};position:relative;
       font-family:${COPY.font},Inter,system-ui,sans-serif;color:#fff}

  /* Two soft copper washes in opposite corners, so the dark field is not flat. */
  .glow{position:absolute;border-radius:50%;pointer-events:none}
  .g1{width:640px;height:640px;left:-220px;top:-260px;
      background:radial-gradient(circle,rgba(224,160,60,.20),transparent 68%)}
  .g2{width:720px;height:720px;right:-280px;bottom:-320px;
      background:radial-gradient(circle,rgba(224,160,60,.14),transparent 68%)}

  .head{position:absolute;left:${MARGIN}px;right:${MARGIN}px;top:84px;text-align:center}
  .head h1{font-size:${EN ? 68 : 62}px;line-height:1.22;font-weight:800;
           letter-spacing:${EN ? '-2.5px' : '0'}}
  .c{color:${COPPER}}
  .sub{margin-top:20px;font-size:28px;font-weight:600;color:#D6DEE6}
  .sub .c{font-weight:800}

  .feats{position:absolute;left:${MARGIN}px;right:${MARGIN}px;top:306px;
         display:flex;justify-content:center;align-items:center;gap:16px;
         font-size:19px;font-weight:600;color:#C3CED8}
  .feats span{display:flex;align-items:center;gap:8px;white-space:nowrap}
  .feats i{width:6px;height:6px;border-radius:50%;background:${COPPER};display:block;flex:none}
  .feats .sep{width:1px;height:18px;background:rgba(255,255,255,.16);flex:none}

  /* The frame reads as one wall of clients rather than 24 loose tiles. */
  .frame{position:absolute;left:${MARGIN}px;top:${GRID_TOP}px;
         width:${gridW + FRAME_PAD * 2}px;height:${gridH + FRAME_PAD * 2}px;
         border:2px solid rgba(224,160,60,.45);border-radius:22px;
         background:rgba(255,255,255,.03)}
  .card{position:absolute;width:${CARD_W}px;height:${CARD_H}px;border-radius:12px;
        display:flex;align-items:center;justify-content:center;
        border:1px solid rgba(255,255,255,.09);box-shadow:0 2px 10px rgba(0,0,0,.28)}
  .card img{object-fit:contain}

  .label{position:absolute;left:${MARGIN}px;right:${MARGIN}px;top:${GRID_TOP + gridH + FRAME_PAD * 2 + 24}px;
         text-align:center;font-size:19px;font-weight:700;line-height:1.25;
         letter-spacing:${COPY.dir === 'rtl' ? '0' : '3px'};
         ${COPY.dir === 'rtl' ? '' : 'text-transform:uppercase;'}color:${MUTED}}

  /* Two figures do not fill a full-width bar, so the bar becomes a centred
     pill sized to its contents and the numbers grow to carry the space. */
  .stats-wrap{position:absolute;left:0;right:0;bottom:${STATS_BOTTOM}px;text-align:center}
  .stats{display:inline-flex;align-items:stretch;
         border:1px solid rgba(224,160,60,.35);border-radius:20px;
         background:rgba(255,255,255,.04);padding:16px 0}
  .stat{padding:0 56px;text-align:center}
  .stat + .stat{border-inline-start:1px solid rgba(255,255,255,.12)}
  .stat b{display:block;font-size:52px;font-weight:800;color:${COPPER};line-height:1.05}
  .stat span{display:block;margin-top:4px;font-size:20px;font-weight:600;color:#C3CED8;line-height:1.3}

  /* Flex rather than one run of text: a line mixing Arabic and Latin gets
     reordered by bidi, and the name has to come first in both languages. */
  .foot{position:absolute;left:0;right:0;bottom:42px;display:flex;justify-content:center;
        align-items:center;gap:12px;font-size:21px;font-weight:600;color:${MUTED}}
  .foot .dot{opacity:.55}
  .foot .site{color:${COPPER};font-weight:700}
</style>
<div class="glow g1"></div>
<div class="glow g2"></div>

<div class="head">
  <h1>${COPY.h1}</h1>
  <div class="sub">${COPY.sub}</div>
</div>

<div class="feats">
  ${COPY.features
    .map((f) => `<span><i></i>${f}</span>`)
    .join('<div class="sep"></div>')}
</div>

<div class="frame"></div>
${cards}

<div class="label">${COPY.label}</div>

<div class="stats-wrap"><div class="stats">
  ${COPY.stats.map(([n, l]) => `<div class="stat"><b>${n}</b><span>${l}</span></div>`).join('')}
</div></div>

<div class="foot">${COPY.foot.join('<span class="dot">&middot;</span>')}</div>`;

await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.evaluate((dir) => document.documentElement.setAttribute('dir', dir), COPY.dir);
await page.waitForTimeout(400);

/* The blocks are absolutely positioned, so a copy change in either language can
   silently push two of them into each other. Check rather than eyeball it. */
const layout = await page.evaluate(() => {
  const box = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { sel, top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right) };
  };
  const order = ['.head', '.feats', '.frame', '.label', '.stats', '.foot'].map(box).filter(Boolean);
  const clashes = [];
  for (let i = 0; i < order.length - 1; i++) {
    const gap = order[i + 1].top - order[i].bottom;
    if (gap < 0) clashes.push(`${order[i].sel} overlaps ${order[i + 1].sel} by ${-gap}px`);
  }
  const spill = order.filter((b) => b.top < 0 || b.bottom > 1200 || b.left < 0 || b.right > 1200);
  return { order, clashes, spill: spill.map((b) => b.sel) };
});

console.log(`\n  ${'block'.padEnd(10)}${'top'.padStart(6)}${'bottom'.padStart(8)}${'gap below'.padStart(11)}`);
console.log('  ' + '-'.repeat(35));
layout.order.forEach((b, i) => {
  const next = layout.order[i + 1];
  console.log(
    `  ${b.sel.padEnd(10)}${String(b.top).padStart(6)}${String(b.bottom).padStart(8)}` +
      (next ? String(next.top - b.bottom).padStart(11) : ''),
  );
});
if (layout.clashes.length || layout.spill.length) {
  layout.clashes.forEach((c) => console.error(`  ! ${c}`));
  layout.spill.forEach((s) => console.error(`  ! ${s} falls outside the canvas`));
}

mkdirSync(OUT_DIR, { recursive: true });
await page.screenshot({ path: OUT });
await browser.close();

if (layout.clashes.length || layout.spill.length) process.exitCode = 1;

console.log(`\n  wrote ${path.relative(ROOT, OUT)}  ${SIZE}x${SIZE}\n`);
