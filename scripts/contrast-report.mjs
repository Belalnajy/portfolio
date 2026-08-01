/**
 * Reads the identity tokens straight out of globals.css and reports the WCAG
 * contrast ratio of every pair the UI actually renders, for both themes.
 *
 *   node scripts/contrast-report.mjs
 *
 * Exits non-zero if any pair falls below its threshold, so it can gate a build.
 * Thresholds follow WCAG 2.2:
 *   4.5:1  body text
 *   3.0:1  large text (18px bold / 24px), icons, and the boundary of any
 *          control you need to see to operate it (1.4.11)
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const CSS = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'src',
  'app',
  'globals.css',
);

const src = readFileSync(CSS, 'utf8');

/** Pull `--name: r g b;` declarations out of a given selector block. */
const readTokens = (selector) => {
  const start = src.indexOf(selector);
  if (start === -1) throw new Error(`selector not found: ${selector}`);
  const open = src.indexOf('{', start);
  let depth = 0, i = open;
  for (; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}' && --depth === 0) break;
  }
  const block = src.slice(open, i);
  const out = {};
  for (const m of block.matchAll(/--([a-z0-9-]+):\s*(\d+)\s+(\d+)\s+(\d+)\s*;/g)) {
    out[m[1]] = [Number(m[2]), Number(m[3]), Number(m[4])];
  }
  return out;
};

const dark = readTokens(':root {');
const light = { ...dark, ...readTokens(":root[data-theme='light'] {") };

if (Object.keys(light).length === Object.keys(dark).length &&
    light.bg?.join() === dark.bg?.join()) {
  throw new Error('light theme tokens did not parse: selector matched the wrong block');
}

const srgb = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const lum = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
const hex = ([r, g, b]) =>
  '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();

/** Composite a translucent foreground over an opaque backdrop. */
const over = (fg, bg, alpha) =>
  fg.map((c, i) => Math.round(c * alpha + bg[i] * (1 - alpha)));

/** [label, foreground token, background token, threshold, alpha?] */
const PAIRS = [
  ['Body text on page', 'text', 'bg', 4.5],
  ['Body text on card', 'text', 'surface', 4.5],
  ['Body text on raised surface', 'text', 'surface-raised', 4.5],
  ['Muted text on page', 'muted-text', 'bg', 4.5],
  ['Muted text on card', 'muted-text', 'surface', 4.5],
  ['Muted text on raised surface', 'muted-text', 'surface-raised', 4.5],
  ['Accent text/link on page', 'accent', 'bg', 4.5],
  ['Accent text/link on card', 'accent', 'surface', 4.5],
  ['Stat numbers (accent, large) on page', 'accent', 'bg', 3.0],
  ['Text on accent fill (primary CTA)', 'accent-contrast', 'accent', 4.5],
  ['Text on accent hover fill', 'accent-contrast', 'accent-hover', 4.5],
  ['Accent text on accent-subtle chip', 'accent', 'accent-subtle', 4.5],
  ['Body text on accent-subtle chip', 'text', 'accent-subtle', 4.5],
  ['Success text on page', 'success', 'bg', 4.5],
  ['Danger / error text on page', 'danger', 'bg', 4.5],
  ['Control border on page (1.4.11)', 'border-control', 'bg', 3.0],
  ['Control border on card (1.4.11)', 'border-control', 'surface', 3.0],
  ['Focus ring on page', 'accent', 'bg', 3.0],
  ['Focus ring on card', 'accent', 'surface', 3.0],
  ['Icon (accent) on card', 'accent', 'surface', 3.0],
  ['Text over image scrim (88%)', 'on-scrim', 'scrim', 4.5, null, 0.88],
  ['Muted over image scrim (88%)', 'on-scrim-muted', 'scrim', 4.5, null, 0.88],
  // Decorative only: a divider is not required to operate anything, so it is
  // reported for visibility but held to a separation floor rather than 3:1.
  ['Divider / card edge on page (decorative)', 'border-subtle', 'bg', 1.15],
  ['Card surface vs page (separation)', 'surface', 'bg', 1.05],
];

let failures = 0;

for (const [themeName, T] of [['LIGHT', light], ['DARK', dark]]) {
  console.log(`\n${'='.repeat(86)}\n  ${themeName}\n${'='.repeat(86)}`);
  console.log(
    `  ${'pair'.padEnd(44)}${'fg'.padEnd(9)}${'bg'.padEnd(9)}${'ratio'.padStart(8)}${'need'.padStart(7)}   `,
  );
  console.log('  ' + '-'.repeat(82));
  for (const [label, fgKey, bgKey, need, , alpha] of PAIRS) {
    const bg = T[bgKey];
    let fg = T[fgKey];
    if (!fg || !bg) {
      console.log(`  ${label.padEnd(44)}MISSING TOKEN (${fgKey} / ${bgKey})`);
      failures++;
      continue;
    }
    // A scrim sits over arbitrary imagery; assume the worst case behind it.
    const effectiveBg = alpha ? over(bg, [255, 255, 255], alpha) : bg;
    const r = ratio(fg, effectiveBg);
    const ok = r >= need;
    if (!ok) failures++;
    console.log(
      `  ${label.padEnd(44)}${hex(fg).padEnd(9)}${hex(effectiveBg).padEnd(9)}` +
        `${r.toFixed(2).padStart(7)}:1${String(need).padStart(6)}   ${ok ? 'pass' : 'FAIL'}`,
    );
  }
}

console.log(
  `\n${failures === 0 ? 'All pairs meet their threshold.' : `${failures} pair(s) BELOW threshold.`}\n`,
);
process.exit(failures === 0 ? 0 : 1);
