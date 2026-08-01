/**
 * Reads identity tokens at runtime for the few places that need a real colour
 * value rather than a CSS declaration: Three.js materials and the particles
 * canvas, neither of which can consume a custom property.
 *
 * Falls back to the dark-theme value so server rendering and the first paint
 * still get something sensible.
 */
const FALLBACK = {
  '--bg': '#0B0F14',
  '--surface': '#121821',
  '--surface-raised': '#18202B',
  '--accent': '#E0A03C',
  '--accent-hover': '#E6B15F',
  '--muted-text': '#93A1B0',
  '--border-subtle': '#1F2933',
};

export const readToken = (name) => {
  if (typeof window === 'undefined') return FALLBACK[name] ?? '#000000';
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  if (!raw) return FALLBACK[name] ?? '#000000';
  // Tokens are stored as "r g b" channels.
  const parts = raw.split(/[\s,]+/).map(Number);
  if (parts.length < 3 || parts.some(Number.isNaN)) return raw;
  return (
    '#' + parts.slice(0, 3).map((c) => c.toString(16).padStart(2, '0')).join('')
  );
};
