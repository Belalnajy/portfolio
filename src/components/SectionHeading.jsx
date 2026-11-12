'use client';
import Reveal from './Reveal';

/**
 * The one heading style every section uses: an optional eyebrow, the title in
 * the display face and a muted subtitle, aligned to the start side like the
 * hero. Sections used to set their own (centred 5xl, black 6xl, start-aligned
 * display), so the page read as several sites stitched together.
 *
 * - `as`: the heading element. h2 under the hero; h1 where the section is
 *   the page's own heading (/work, /services). On phones an h2 takes the h2
 *   token (28px) and an h1 the page-h1 token (32px); from md the sizes are
 *   as they always were.
 * - `eyebrow`: a short copper label above the title (.m-eyebrow).
 * - `rise`: for a heading in the first viewport (see Reveal): it moves
 *   without fading, so the largest text is painted before JavaScript runs.
 * - `className`: width and alignment of the block, e.g. `max-w-6xl mx-auto`
 *   to line up with a centred grid below it.
 */
const SectionHeading = ({ as: Tag = 'h2', eyebrow, title, subtitle, rise = false, className = '', children }) => (
  <Reveal y={20} duration={0.5} rise={rise} className={`mb-7 md:mb-14 text-start ${className}`}>
    {eyebrow && <p className="m-eyebrow mb-2.5 md:mb-3">{eyebrow}</p>}
    <Tag
      className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-[rgb(var(--foreground))] mb-3 md:mb-4 ${
        Tag === 'h1' ? 'type-h1' : 'type-h2'
      }`}>
      {title}
    </Tag>
    {subtitle && (
      <p className="type-body text-[rgb(var(--muted-foreground))] text-base sm:text-lg leading-relaxed max-w-2xl">
        {subtitle}
      </p>
    )}
    {children}
  </Reveal>
);

export default SectionHeading;
