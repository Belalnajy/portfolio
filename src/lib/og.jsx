import { ImageResponse } from 'next/og';
import { BLOG_POSTS } from './blog';
import { FACTS } from './facts';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

// Ink + copper, same as the site. Latin copy only: the default OG font has no
// Arabic glyphs. The case-study cards (og-case-study.jsx) set their Arabic
// text with sharp instead.
export const INK = '#0B0F14';
export const SURFACE = '#121821';
export const COPPER = '#C87F1E';
export const TEXT = '#E8EDF2';
export const MUTED = '#93A1B0';

/**
 * The site-wide share card served at /og.png (used by every page that has no
 * card of its own). Rendered at build time from FACTS, so the numbers on it
 * move with the site; the old static PNG was still saying 31 projects.
 */
export const siteOgImage = () =>
  new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 86px',
          background: `linear-gradient(135deg, ${SURFACE} 0%, ${INK} 60%)`,
          borderTop: `8px solid ${COPPER}`,
          color: TEXT,
          fontFamily: 'sans-serif',
        }}>
        <div style={{ width: 96, height: 12, borderRadius: 6, background: COPPER, display: 'flex', marginBottom: 44 }} />
        <div style={{ display: 'flex', fontSize: 128, fontWeight: 800, lineHeight: 1, letterSpacing: -2 }}>
          <span style={{ color: '#FFFFFF' }}>Belal</span>
          <span style={{ color: '#EFC88E', marginLeft: 32 }}>Nagy</span>
        </div>
        <div style={{ display: 'flex', fontSize: 58, fontWeight: 700, color: MUTED, marginTop: 30 }}>
          Full-Stack Developer
        </div>
        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            marginTop: 52,
            padding: '20px 40px',
            borderRadius: 26,
            border: `2px solid ${COPPER}88`,
            background: '#1E1B17',
            fontSize: 52,
            fontWeight: 800,
          }}>
          <span style={{ color: COPPER }}>{FACTS.projects}</span>
          <span style={{ marginLeft: 18 }}>projects for</span>
          <span style={{ color: COPPER, marginLeft: 18 }}>{FACTS.clients}</span>
          <span style={{ marginLeft: 18 }}>clients</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );

/**
 * Share card for a top-level page: same ink-and-copper frame as the case
 * studies, with the page title doing the talking. Latin copy only — the
 * default OG font carries no Arabic glyphs, so /ar pages reuse these cards.
 */
export const pageOgImage = (title, subtitle, { eyebrow = 'BELALNAGY.COM', titleSize = 96 } = {}) =>
  new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: `linear-gradient(135deg, ${INK} 0%, ${SURFACE} 100%)`,
          color: TEXT,
          fontFamily: 'sans-serif',
        }}>
        <div style={{ width: 18, height: '100%', background: COPPER, display: 'flex' }} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px 72px',
          }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 22,
                letterSpacing: 6,
                color: COPPER,
                fontWeight: 700,
                marginBottom: 28,
                display: 'flex',
              }}>
              {eyebrow}
            </div>
            <div style={{ fontSize: titleSize, fontWeight: 800, lineHeight: 1.05, display: 'flex' }}>
              {title}
            </div>
            <div
              style={{
                fontSize: 32,
                color: MUTED,
                marginTop: 26,
                lineHeight: 1.35,
                display: 'flex',
                maxWidth: 980,
              }}>
              {subtitle}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ fontSize: 30, fontWeight: 700, display: 'flex' }}>Belal Nagy</div>
              <div style={{ fontSize: 22, color: MUTED, display: 'flex' }}>
                Software Engineer · Full-Stack Developer
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );

/**
 * Share card for an article: its English title (the card font has no Arabic
 * glyphs, so /ar articles share it), reading time and tags.
 */
export const blogPostOgImage = (slug) => {
  const post = BLOG_POSTS[slug];
  return pageOgImage(post.en.title, `${post.minutes} min read · ${post.tags.join(' · ')}`, {
    eyebrow: 'ARTICLE · BELALNAGY.COM',
    titleSize: 68,
  });
};
