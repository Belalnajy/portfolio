"use client";
import { useEffect, useRef, useState } from 'react';
import SectionHeading from './SectionHeading';
import { useTranslation } from 'react-i18next';
import { FaPause, FaPlay } from 'react-icons/fa';
import { CASE_STUDIES } from '../lib/case-studies';

// [file, intrinsic width, intrinsic height, flag?]. 'white': a white mark,
// drawn as a dark silhouette on the light tiles (both themes); 'dim': a navy
// or purple mark, which the old dark slate tiles had to lift and the light
// tiles no longer do (see .logo-white in globals.css). The size goes on the <img> so the
// browser knows each logo's shape before the file arrives; the CSS box still
// decides how large it is drawn. The files are sized for the largest box they
// are drawn in (192x80 CSS px on desktop at 2x with the hover zoom, 112x64 on
// phones at 3x), so a 400px master is not sent to draw an 80px mark.
const logos = [
  ['toyo228-logo.webp', 329, 223],
  ['motors-logo.webp', 112, 118],
  ['injaz-logo.webp', 192, 192, 'dim'],
  ['hcholding-logo.webp', 200, 188],
  ['mutlq-logo.webp', 192, 192, 'dim'],
  ['mada-logo.webp', 182, 192],
  ['bilqalam-logo.webp', 400, 151],
  ['medicta-logo.webp', 400, 45],
  ['21-secondary-logo.webp', 192, 192],
  ['CME-logo.webp', 314, 236],
  ['DiaMonitor-logo.webp', 194, 59],
  ['KMBC-logo.webp', 243, 192],
  ['amarna-logo.webp', 400, 118],
  ['baserah-logo.webp', 400, 111, 'white'],
  ['dmagni-logo.webp', 192, 192, 'dim'],
  ['indstrz-logo.webp', 384, 154],
  ['manqla-logo.webp', 166, 46, 'white'],
  ['nextstop-logo.webp', 192, 192, 'dim'],
  ['opptmakers-logo.webp', 120, 120],
  ['profleet-logo.webp', 192, 192, 'dim'],
  ['quotemate-logo.webp', 256, 103],
  ['rabzan-logo.svg', 1920, 1080],
  ['sf-logo.webp', 288, 91],
  ['sonomedix-logo.webp', 195, 192],
  ['uduipa-logo.webp', 100, 100],
  ['upafa-edu-logo.webp', 192, 192],
  ['waferlee.webp', 261, 80, 'white'],
];

const half = Math.ceil(logos.length / 2);
const row1 = logos.slice(0, half);
const row2 = logos.slice(half);

// Logo file -> case-study slug, so the alt text is the client's real name
// from the registry ("Itimad Tibbi", not "CME"). Files with no case study
// fall back to a tidied file name.
const LOGO_SLUG = {
  'toyo228-logo.webp': 'toyo228',
  'motors-logo.webp': 'motors',
  'injaz-logo.webp': 'injaz',
  'hcholding-logo.webp': 'hcholding',
  'mutlq-logo.webp': 'mutlq',
  'mada-logo.webp': 'mada',
  'bilqalam-logo.webp': 'bilqalam',
  'medicta-logo.webp': 'medicta',
  'CME-logo.webp': 'cme',
  'DiaMonitor-logo.webp': 'dpms',
  'KMBC-logo.webp': 'kmbc',
  'amarna-logo.webp': 'amarna',
  'baserah-logo.webp': 'baserah',
  'dmagni-logo.webp': 'dmagni',
  'indstrz-logo.webp': 'indstrz',
  'manqla-logo.webp': 'manqla',
  'nextstop-logo.webp': 'nextstop',
  'opptmakers-logo.webp': 'opptmakers',
  'profleet-logo.webp': 'profleet',
  'quotemate-logo.webp': 'quotemate',
  'rabzan-logo.svg': 'rabzan',
  'sf-logo.webp': 'sf_portal',
  'sonomedix-logo.webp': 'sonomedix',
  'uduipa-logo.webp': 'uduipa',
  'waferlee.webp': 'waferlee',
};

const logoName = (file) =>
  CASE_STUDIES[LOGO_SLUG[file]]?.name ??
  file
    .replace(/([-_]?logo)?\.(webp|svg|png)$/i, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

const MarqueeRow = ({ items, direction }) => {
  // The array runs twice so the loop is seamless. The second copy is only
  // there for the eye: hidden from assistive tech, with empty alts, so each
  // client is announced once and not under two names.
  const duplicatedItems = [...items, ...items];
  const animationClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';
  
  return (
    <div className="marquee-container flex overflow-hidden w-full select-none py-3 max-md:py-1.5 relative" dir="ltr">
      {/* Fading gradient masks for the edges */}
      <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-[rgb(var(--background))] to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-[rgb(var(--background))] to-transparent z-20 pointer-events-none"></div>

      <div className={`flex w-max gap-3 md:gap-8 px-1.5 md:px-4 ${animationClass}`}>
        {duplicatedItems.map(([logo, width, height, flag], index) => (
          <div
            key={index}
            aria-hidden={index >= items.length ? 'true' : undefined}
            className={`logo-tile ${flag ? `logo-${flag}` : ''} w-36 md:w-64 h-24 md:h-36 flex-shrink-0 relative group glass-card p-4 md:p-7 rounded-2xl max-md:rounded-[1.125rem] flex justify-center items-center transition-[background-color,opacity] duration-300`}>
            <img
              src={`/logos/${logo}`}
              alt={index >= items.length ? '' : logoName(logo)}
              width={width}
              height={height}
              // w-auto/h-auto: the width/height attributes only describe the
              // file; the CSS box decides the drawn size. In dark mode the
              // tile itself is the plate (.logo-tile in globals.css).
              className="logo-mark w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const BrandLogos = () => {
  const { t } = useTranslation();

  // The two rows loop forever. Nobody sees them while the section is off
  // screen, so they are paused there instead of being animated (and keeping
  // the compositor awake) for the whole visit. A paused row resumes from
  // where it stopped, so the pause itself is never visible.
  const sectionRef = useRef(null);
  const [offscreen, setOffscreen] = useState(false);
  // Moving content that lasts more than five seconds needs a way to stop it
  // (WCAG 2.2.2): hover pauses it for a mouse, this button for everyone else.
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { rootMargin: '200px 0px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-offscreen={offscreen || undefined}
      data-paused={paused || undefined}
      className="m-section relative overflow-hidden"
      id="brands">
      {/* Injecting CSS Keyframes directly for the Marquee */}
      <style>
        {`
          @keyframes marquee-left {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
          .animate-marquee-left {
            animation: marquee-left 40s linear infinite;
          }
          .animate-marquee-right {
            animation: marquee-right 40s linear infinite;
          }
          .marquee-container:hover .animate-marquee-left,
          .marquee-container:hover .animate-marquee-right,
          [data-offscreen] .animate-marquee-left,
          [data-offscreen] .animate-marquee-right,
          [data-paused] .animate-marquee-left,
          [data-paused] .animate-marquee-right {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-marquee-left,
            .animate-marquee-right {
              animation: none;
            }
          }
        `}
      </style>

      {/* The heading shares the page column; the marquee below runs wider. */}
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow={t('mHome.eyebrow.brands')}
          title={t('brands.title')}
          subtitle={t('brands.subtitle')}
        />
      </div>

      <div className="bleed container mx-auto px-0 md:px-4 relative z-10 w-full max-w-[100vw]">

        {/* The Marquee Display */}
        <div className="flex flex-col gap-4 max-md:gap-1.5 w-full">
          <MarqueeRow items={row1} direction="left" />
          <MarqueeRow items={row2} direction="right" />
        </div>

        {/* Hidden when the rows do not move anyway (reduced motion). A
            Tailwind variant, so it sits in the same layer as `flex` and is
            ordered after it, instead of racing it from the inline <style>. */}
        <div className="mt-6 max-md:mt-4 flex motion-reduce:hidden justify-center px-4">
          <button
            type="button"
            onClick={() => setPaused((was) => !was)}
            className="press inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full border border-[rgb(var(--border-control))] text-sm font-semibold text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))] transition-colors">
            {paused ? <FaPlay aria-hidden="true" className="text-xs" /> : <FaPause aria-hidden="true" className="text-xs" />}
            {paused ? t('a11y.logos_play') : t('a11y.logos_pause')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;
