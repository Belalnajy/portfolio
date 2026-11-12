import { Cairo, Space_Grotesk } from 'next/font/google';

/**
 * Fonts for the Arabic document tree; see fonts-en.js for how the split works.
 *
 * - Cairo: Arabic pages are Arabic text with Latin product and technology
 *   names throughout, so both subsets are preloaded. (Asking for the Arabic
 *   subset alone does not save the Latin file: the build preloads the English
 *   tree's copy of it anyway, and the page then fetches it twice.) The Arabic
 *   file is preloaded here under a different URL from the copy English pages
 *   load on demand, so a visitor who reads both languages downloads it once
 *   per tree; fonts-en.js has the measurement behind keeping it that way.
 * - Space Grotesk has no Arabic glyphs: on Arabic pages Cairo does display
 *   duty and Space Grotesk draws the Latin words and numerals in headlines.
 *   Declared exactly as in fonts-en.js (see there for why headings do not
 *   use its generated fallback face). With `preload: false` here the build
 *   still preloaded the English tree's copy of the file on Arabic pages while
 *   this tree's CSS pointed at a differently named copy, so the font was
 *   fetched twice and arrived late; one shared declaration means one file.
 */
const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-cairo' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const FONT_VARIABLES = `${cairo.variable} ${spaceGrotesk.variable}`;
