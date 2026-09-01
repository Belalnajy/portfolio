import { ImageResponse } from 'next/og';
import { CASE_STUDIES } from './case-studies';
import { loadNarrative } from './case-study-metadata';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

// Ink + copper, same as the site. Latin copy only: the default OG font has no
// Arabic glyphs, and every project name and stack is already Latin.
const INK = '#0B0F14';
const SURFACE = '#121821';
const COPPER = '#C87F1E';
const TEXT = '#E8EDF2';
const MUTED = '#93A1B0';

/**
 * Share card for a top-level page: same ink-and-copper frame as the case
 * studies, with the page title doing the talking. Latin copy only — the
 * default OG font carries no Arabic glyphs, so /ar pages reuse these cards.
 */
export const pageOgImage = (title, subtitle) =>
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
              BELALNAGY.COM
            </div>
            <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05, display: 'flex' }}>
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
                Software Engineer — Full-Stack Developer
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );

export const caseStudyOgImage = async (slug) => {
  const project = CASE_STUDIES[slug];
  const copy = (await loadNarrative(slug)).en;

  return new ImageResponse(
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
              CASE STUDY
            </div>
            <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, display: 'flex' }}>
              {project.name}
            </div>
            <div
              style={{
                fontSize: 30,
                color: MUTED,
                marginTop: 24,
                lineHeight: 1.35,
                display: 'flex',
                maxWidth: 980,
              }}>
              {copy.facts.scope}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', maxWidth: 760 }}>
              {project.stack.map((tech) => (
                <div
                  key={tech}
                  style={{
                    display: 'flex',
                    padding: '10px 18px',
                    borderRadius: 999,
                    border: `2px solid ${COPPER}55`,
                    background: `${COPPER}1A`,
                    color: TEXT,
                    fontSize: 22,
                    fontWeight: 600,
                  }}>
                  {tech}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ fontSize: 30, fontWeight: 700, display: 'flex' }}>Belal Nagy</div>
              <div style={{ fontSize: 22, color: MUTED, display: 'flex' }}>belalnagy.com</div>
            </div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
};
