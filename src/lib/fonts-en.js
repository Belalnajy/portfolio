import { Cairo, Space_Grotesk } from 'next/font/google';

/**
 * Fonts for the English document tree (and the shared 404 page).
 *
 * next/font preloads the `subsets` named here, per module, so each language
 * tree has its own module (see fonts-ar.js) and only asks for the files its
 * first paint needs:
 *
 * - Cairo is the body face in both languages (globals.css). English text is
 *   its Latin subset, so that is the one preloaded. The Arabic subset is still
 *   declared in the generated @font-face rules and loads on demand through
 *   `unicode-range` for the few Arabic words an English page carries (the
 *   language switch label, the Arabic name in the footer). Measured against
 *   preloading it here too: preloading made the two trees share one URL for
 *   that file (it is fetched twice, 30 KB, by someone who reads / and then
 *   /ar), but on the English home page it cost 0.037 CLS and about 120 ms of
 *   extra blocking time under applied throttling (0 / 50 ms without), so the
 *   English tree keeps loading it on demand.
 * - Space Grotesk is the display face for headlines and the hero wordmark.
 *   next/font's fallback face for it ("Space Grotesk Fallback") is local
 *   Arial with no unicode-range, and `--font-display` puts it before Cairo,
 *   so on Windows and macOS (whose Arial has Arabic) Arabic headings were
 *   drawn in Arial. `.font-display` in globals.css therefore names the family
 *   itself and a Latin-only copy of that fallback instead of using the
 *   variable. (`adjustFontFallback: false` would be the obvious switch, but
 *   the Turbopack build ignores it.) Declared identically in fonts-ar.js so
 *   both trees share one file.
 *
 * Both modules expose the same two CSS variables, each resolving to the face
 * plus next/font's metric-matched fallback, which is what keeps the text from
 * shifting when the web font swaps in.
 */
const cairo = Cairo({ subsets: ['latin'], variable: '--font-cairo' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const FONT_VARIABLES = `${cairo.variable} ${spaceGrotesk.variable}`;
