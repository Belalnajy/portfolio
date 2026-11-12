import path from 'node:path';
import sharp from 'sharp';
import { ImageResponse } from 'next/og';
import { CASE_STUDIES } from './case-studies';
import { loadNarrative } from './case-study-metadata';
import { OG_SIZE, INK, SURFACE, COPPER, TEXT, MUTED } from './og';
import { COVER_RATIO, fitFor, frameKind, hostOf } from './device-frame';
import { coverMeta } from './cover-meta';
import en from '../locales/en';
import ar from '../locales/ar';

/**
 * Share card for a case study: the title on one side, the project's own
 * cover in the site's browser frame on the other. Rendered once per slug and
 * language at build time (see generateStaticParams in the route files).
 *
 * Two things Satori (next/og) cannot do, and how this gets round them:
 * - It cannot read WebP. The cover is resized with sharp to exactly the
 *   frame's width and embedded as a small JPEG data URL.
 * - It joins Arabic letters but lays words out left to right and wraps them
 *   wrongly. The Arabic text block is set by sharp instead (Pango, which does
 *   real bidi and line breaking) in Cairo, the site's Arabic face, and placed
 *   as an image. If that ever fails (no Pango in a build image), the Arabic
 *   card falls back to the English one rather than failing the build.
 *
 * The PNG is palette-quantised by sharp on the way out: a screenshot inside
 * the card made the full-colour PNG several hundred kilobytes; 256 colours
 * keep the card sharp at a fraction of that.
 */

const PUBLIC = path.join(process.cwd(), 'public');
// Cairo Bold, SIL Open Font License (src/assets/og/OFL.txt).
const CAIRO = path.join(process.cwd(), 'src/assets/og/Cairo-Bold.ttf');

const FRAME_W = 560;
const SCREEN_H = Math.round(FRAME_W / COVER_RATIO);
const BAR_H = 30;
const TEXT_W = 440;

const BAR = '#1A222D';
const EDGE = '#26303C';

/** The cover, cut to the frame's screen exactly as the site shows it. */
const coverDataUrl = async (image) => {
  const fit = fitFor(coverMeta(image));
  const jpeg = await sharp(path.join(PUBLIC, image))
    .resize(FRAME_W, SCREEN_H, { fit, position: fit === 'cover' ? 'top' : 'centre', background: SURFACE })
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();
  return `data:image/jpeg;base64,${jpeg.toString('base64')}`;
};

/**
 * "OX GYM" and "A complete gym package…" from "OX GYM, a Complete Gym
 * Package…". Titles without the comma are kept whole.
 */
const splitTitle = (title, separator) => {
  const at = title.indexOf(separator);
  if (at === -1) return { name: title, tagline: '' };
  const tagline = title.slice(at + separator.length).trim();
  return { name: title.slice(0, at).trim(), tagline: tagline.charAt(0).toUpperCase() + tagline.slice(1) };
};

const clip = (text, max) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

const titleSize = (name) => (name.length <= 14 ? 64 : name.length <= 22 ? 54 : name.length <= 34 ? 44 : 38);

const escapeMarkup = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** The Arabic text block, set by Pango, as a PNG data URL. */
const arabicBlock = async ({ eyebrow, name, tagline, kind }) => {
  const pt = (size) => size * 1024;
  // Cairo's own line height is close to 1.9em, which spreads a two-line
  // title over half the card; 0.8 of it reads like the English card.
  const span = (size, colour, text) =>
    `<span size="${pt(size)}" line_height="0.8" foreground="${colour}">${escapeMarkup(text)}</span>`;
  const gap = (size) => `<span size="${pt(size)}" line_height="0.8"> </span>`;
  const lines = [
    span(22, COPPER, eyebrow),
    gap(12),
    span(Math.min(titleSize(name), 56), '#FFFFFF', name),
    tagline && gap(8),
    tagline && span(28, MUTED, tagline),
    kind && gap(10),
    kind && span(20, MUTED, kind),
  ].filter(Boolean);
  const png = await sharp({
    text: {
      text: lines.join('\n'),
      font: 'Cairo Bold 28',
      fontfile: CAIRO,
      width: TEXT_W,
      dpi: 72,
      rgba: true,
      wrap: 'word',
      // Pango mirrors alignment for a right-to-left paragraph: "left" here
      // is the start edge, which is the right in Arabic.
      align: 'left',
    },
  })
    .png()
    .toBuffer({ resolveWithObject: true });
  return { src: `data:image/png;base64,${png.data.toString('base64')}`, width: png.info.width, height: png.info.height };
};

const Frame = ({ cover, host, bare }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: FRAME_W + 4,
      borderRadius: 16,
      overflow: 'hidden',
      border: `2px solid ${EDGE}`,
      background: SURFACE,
      boxShadow: '0 30px 60px rgba(0,0,0,0.45)',
    }}>
    {!bare && (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: BAR_H,
          padding: '0 14px',
          background: BAR,
          borderBottom: `1px solid ${EDGE}`,
        }}>
        <div style={{ display: 'flex', width: 52 }}>
          {[0, 1, 2].map((dot) => (
            <div key={dot} style={{ width: 10, height: 10, borderRadius: 5, background: '#3A4552', marginRight: 7 }} />
          ))}
        </div>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: 280,
              height: 18,
              borderRadius: 9,
              background: INK,
              color: MUTED,
              fontSize: 12,
              lineHeight: 1.5,
            }}>
            {host}
          </div>
        </div>
        <div style={{ display: 'flex', width: 52 }} />
      </div>
    )}
    <img src={cover} width={FRAME_W} height={SCREEN_H} style={{ width: FRAME_W, height: SCREEN_H }} />
  </div>
);

const Footer = ({ rtl }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: rtl ? 'flex-end' : 'flex-start' }}>
    <div style={{ fontSize: 28, fontWeight: 700, display: 'flex', color: TEXT }}>Belal Nagy</div>
    <div style={{ fontSize: 20, color: MUTED, display: 'flex' }}>belalnagy.com</div>
  </div>
);

const englishText = ({ eyebrow, name, tagline, kind }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', fontSize: 16, letterSpacing: 2, color: COPPER, fontWeight: 700, marginBottom: 22 }}>
      {eyebrow.toUpperCase()}
    </div>
    <div style={{ display: 'flex', fontSize: titleSize(name), fontWeight: 800, lineHeight: 1.05, color: '#FFFFFF' }}>
      {name}
    </div>
    {tagline && (
      <div style={{ display: 'flex', fontSize: 26, color: MUTED, marginTop: 20, lineHeight: 1.35 }}>{tagline}</div>
    )}
    {kind && (
      <div
        style={{
          display: 'flex',
          alignSelf: 'flex-start',
          marginTop: 22,
          padding: '6px 14px',
          borderRadius: 999,
          border: `2px solid ${EDGE}`,
          color: MUTED,
          fontSize: 18,
        }}>
        {kind}
      </div>
    )}
  </div>
);

const render = async (slug, lang) => {
  const project = CASE_STUDIES[slug];
  const bundle = (lang === 'ar' ? ar : en).translation;
  const narrative = (await loadNarrative(slug))[lang];
  const { name, tagline } = splitTitle(narrative.title, lang === 'ar' ? '،' : ',');
  const copy = {
    eyebrow: `${bundle.case_studies.label} · ${bundle.projects.industries[project.industry]}`,
    name,
    tagline: clip(tagline || narrative.facts.scope, lang === 'ar' ? 80 : 110),
    kind: project.kind ? bundle.projects.kinds[project.kind] : '',
  };
  const rtl = lang === 'ar';
  const [cover, block] = await Promise.all([
    coverDataUrl(project.image),
    rtl ? arabicBlock(copy) : null,
  ]);
  const host = hostOf(project.appStoreUrl ? null : project.liveUrl);
  const bare = frameKind(project.image, project.mockups) !== 'browser';

  const response = new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: rtl ? 'row-reverse' : 'row',
          background: `linear-gradient(135deg, ${INK} 0%, ${SURFACE} 100%)`,
          color: TEXT,
          fontFamily: 'sans-serif',
        }}>
        <div style={{ width: 14, height: '100%', background: COPPER, display: 'flex' }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: TEXT_W + 112,
            padding: '60px 56px',
            alignItems: rtl ? 'flex-end' : 'flex-start',
          }}>
          {rtl ? (
            <img src={block.src} width={block.width} height={block.height} style={{ width: block.width, height: block.height }} />
          ) : (
            englishText(copy)
          )}
          <Footer rtl={rtl} />
        </div>
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Frame cover={cover} host={host} bare={bare} />
        </div>
      </div>
    ),
    OG_SIZE,
  );

  const png = await sharp(Buffer.from(await response.arrayBuffer()))
    .png({ palette: true, colours: 256, dither: 0.6, effort: 8 })
    .toBuffer();
  return new Response(png, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': response.headers.get('Cache-Control') ?? 'public, max-age=0' },
  });
};

export const caseStudyOgImage = async (slug, lang = 'en') => {
  if (lang !== 'ar') return render(slug, 'en');
  try {
    return await render(slug, 'ar');
  } catch (error) {
    console.warn(`[og] Arabic share card for ${slug} fell back to English: ${error.message}`);
    return render(slug, 'en');
  }
};

