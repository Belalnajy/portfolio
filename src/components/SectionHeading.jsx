'use client';
import Reveal from './Reveal';

/**
 * The one heading style every section uses: the title in the display face and
 * a muted subtitle, aligned to the start side like the hero. No eyebrow
 * labels: they were on some sections and not others, and none of them said
 * anything the title did not. Sections used to set their own (centred 5xl, black 6xl,
 * start-aligned display), so the page read as several sites stitched
 * together.
 *
 * - `as`: the heading element. h2 under the hero; h1 where the section is
 *   the page's own heading (/work, /services).
 * - `rise`: for a heading in the first viewport (see Reveal): it moves
 *   without fading, so the largest text is painted before JavaScript runs.
 * - `className`: width and alignment of the block, e.g. `max-w-6xl mx-auto`
 *   to line up with a centred grid below it.
 */
const SectionHeading = ({ as: Tag = 'h2', title, subtitle, rise = false, className = '', children }) => (
  <Reveal y={20} duration={0.5} rise={rise} className={`mb-12 md:mb-14 text-start ${className}`}>
    <Tag className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-[rgb(var(--foreground))] mb-4">
      {title}
    </Tag>
    {subtitle && (
      <p className="text-[rgb(var(--muted-foreground))] text-base sm:text-lg leading-relaxed max-w-2xl">
        {subtitle}
      </p>
    )}
    {children}
  </Reveal>
);

export default SectionHeading;
