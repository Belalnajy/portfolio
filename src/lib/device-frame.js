/**
 * The rules behind DeviceFrame (src/components/DeviceFrame.jsx), kept free of
 * React so the share-card renderer (og-case-study.jsx) frames covers the
 * same way the pages do.
 */

export const COVER_RATIO = 96 / 50;

/** "lms-injaz.com" from "https://www.lms-injaz.com/". Empty when there is no URL. */
export const hostOf = (url) => {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

/** The frame a project's picture gets: a phone for `-m` captures, none for its mockups, else a browser. */
export const frameKind = (src, mockups = []) =>
  src.endsWith('-m.webp') ? 'phone' : mockups.includes(src) ? 'bare' : 'browser';

/** How far a picture's ratio may stray from its box before it is shown whole rather than filled. */
const FILL_TOLERANCE = 0.15;

/** 'cover' when the picture is close enough to the box to fill it, else 'contain'. */
export const fitFor = ({ w, h }, ratio = COVER_RATIO) =>
  Math.abs(w / h - ratio) / ratio <= FILL_TOLERANCE ? 'cover' : 'contain';
