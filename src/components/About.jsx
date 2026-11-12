"use client";
import Image from 'next/image';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { revealDelay } from '../lib/motion';
import { FaBriefcase, FaMapMarkerAlt, FaLayerGroup, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useTranslation, Trans } from 'react-i18next';
import { getTechIcon } from './Projects';
import { coverMeta } from '../lib/cover-meta';

// A black-and-white studio portrait on a dark backdrop. It sits on a mat (the
// cell's padding) with a hairline ring, so on the light theme's white cards it
// reads as a framed photo rather than a dark hole in the page.
const PORTRAIT = '/portrait.webp';

const CORE_STACK = ['Next.js', 'React', 'NestJS', 'Laravel', 'Django', 'PostgreSQL', 'TypeScript', 'Tailwind'];

/**
 * One cell of the bento. `span` carries the grid classes. On phones each cell
 * is an .m-card (`flush` for the portrait: no mat, the photo to the edge).
 */
const Cell = ({ span = '', index = 0, pad = 'p-6', flush = false, className = '', children }) => (
  <Reveal y={20} delay={revealDelay(index)}
    className={`glass-card ${flush ? 'm-card-flush' : 'm-card'} max-md:shadow-[var(--elev-1)]! rounded-2xl border border-[rgb(var(--border))]/60 ${pad} text-start ${span} ${className}`}>
    {children}
  </Reveal>
);

const CellLabel = ({ icon, children }) => (
  <div className="flex items-center gap-2 text-[11px] max-md:text-xs font-bold uppercase tracking-[0.2em] max-md:tracking-[0.14em] text-[rgb(var(--muted-foreground))] mb-3">
    <span className="text-[rgb(var(--primary))]">{icon}</span>
    {children}
  </div>
);

const About = () => {
  const { t, i18n } = useTranslation();
  const portrait = coverMeta(PORTRAIT);
  const home = i18n.language === 'ar' ? '/ar' : '';
  const Arrow = i18n.language === 'ar' ? FaArrowLeft : FaArrowRight;

  const emphasis = {
    1: <span className="text-[rgb(var(--primary))] font-semibold" />,
    3: <span className="text-[rgb(var(--primary))] font-semibold" />,
  };

  // The short version for the home page: who, where, now, the core stack.
  // The full story (every role, the platform suite, education) is on /cv.
  return (
    // Phones: one of the two proof sections on the alternate band.
    <section id="about" className="py-20 max-md:py-14 md:py-24 m-band relative">
      <div className="shell relative z-10">
        <SectionHeading eyebrow={t('mHome.eyebrow.about')} title={t('about.title')} subtitle={t('about.subtitle')} />

        {/* Phones (below sm): two columns, so Now and Based in sit side by
            side as mini-cards; everything else spans both. */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-4 max-md:gap-3">
          {/* Portrait. The crop favours the top of the frame: a centred crop
              cut the hair off in the short phone cell. Phones show it 4:5,
              edge to edge in its card, with the caption over it. */}
          <Cell span="col-span-2 sm:col-span-1 lg:col-span-4 lg:row-span-2" index={0} pad="p-2" flush>
            <div className="relative h-full min-h-[304px] rounded-xl overflow-hidden ring-1 ring-[rgb(var(--border-control))]/25 max-md:h-auto max-md:min-h-0 max-md:aspect-[4/5] max-md:rounded-none max-md:ring-0">
              <Image
                src={PORTRAIT}
                alt={t('about.portrait_alt')}
                width={portrait.w}
                height={portrait.h}
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                placeholder={portrait.blur ? 'blur' : 'empty'}
                blurDataURL={portrait.blur}
                className="absolute inset-0 w-full h-full object-cover object-[50%_15%]"
              />
              <div className="absolute inset-x-0 bottom-0 scrim-b p-5 pt-16 max-md:pt-24">
                <p className="text-[rgb(var(--on-scrim))] font-display font-bold text-2xl max-md:text-[1.75rem] max-md:leading-tight">
                  {t('about.values.name')}
                </p>
                <p className="text-[rgb(var(--on-scrim-muted))] text-sm">{t('about.values.role')}</p>
              </div>
            </div>
          </Cell>

          {/* Professional summary */}
          <Cell span="col-span-2 sm:col-span-1 lg:col-span-8" index={1} className="space-y-4 max-md:space-y-3">
            <CellLabel icon={<FaBriefcase />}>{t('about.professional_summary')}</CellLabel>
            <p className="text-[rgb(var(--foreground))] leading-relaxed type-body">
              <Trans i18nKey="about.summary_p1" components={emphasis} />
            </p>
            <p className="text-[rgb(var(--foreground))] leading-relaxed type-body">
              <Trans i18nKey="about.summary_p2" components={emphasis} />
            </p>
            <a
              href={`${home}/cv#experience`}
              className="inline-flex items-center gap-2 min-h-[44px] text-sm font-semibold text-[rgb(var(--primary))] hover:underline underline-offset-4">
              {t('about.cv_link')}
              <Arrow aria-hidden="true" className="text-xs" />
            </a>
          </Cell>

          {/* Now */}
          <Cell span="col-span-1 lg:col-span-4" index={2} className="max-md:p-4!">
            <CellLabel icon={<FaBriefcase />}>{t('about.bento.now')}</CellLabel>
            <p className="font-semibold text-[rgb(var(--foreground))] flex items-center max-md:items-baseline gap-2 max-md:text-[15px] max-md:leading-snug">
              {/* The ping loops forever; on phones the hero's is the only one. */}
              <span className="relative flex h-2 w-2 shrink-0 max-md:translate-y-[-1px]">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--success))] opacity-75 animate-ping max-md:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[rgb(var(--success))]" />
              </span>
              {t('about.bento.now_value')}
            </p>
            <p className="text-sm max-md:text-xs text-[rgb(var(--muted-foreground))] mt-1">{t('about.bento.now_meta')}</p>
          </Cell>

          {/* Based in */}
          <Cell span="col-span-1 lg:col-span-4" index={3} className="max-md:p-4!">
            <CellLabel icon={<FaMapMarkerAlt />}>{t('about.bento.base')}</CellLabel>
            <p className="font-semibold text-[rgb(var(--foreground))] max-md:text-[15px] max-md:leading-snug">{t('about.bento.base_value')}</p>
            {/* Only the coordinates are monospace and left-to-right; the
                sentence after them follows the page's language and face. */}
            <p className="text-sm max-md:text-xs text-[rgb(var(--muted-foreground))] mt-1">
              <span className="font-mono max-md:block" dir="ltr">31.2°N 29.9°E</span>
              {' · '}
              {t('about.bento.base_meta')}
            </p>
          </Cell>

          {/* Core stack */}
          <Cell span="col-span-2 lg:col-span-12" index={4} className="max-md:px-0!">
            <div className="max-md:px-5">
              <CellLabel icon={<FaLayerGroup />}>{t('about.bento.stack_title')}</CellLabel>
            </div>
            {/* Phones: one row of chips that scrolls sideways (.m-rail),
                running to the card's edges. */}
            <div className="flex flex-wrap gap-2 m-rail max-md:flex-nowrap max-md:mx-0! max-md:px-5! max-md:scroll-px-5! max-md:gap-2!">
              {CORE_STACK.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 px-3 py-1.5 max-md:min-h-[38px] max-md:rounded-full rounded-lg bg-[rgb(var(--muted))]/30 border border-[rgb(var(--border))]/60 text-sm font-medium text-[rgb(var(--foreground))]">
                  {getTechIcon(tech)}
                  {tech}
                </span>
              ))}
            </div>
          </Cell>
        </div>
      </div>
    </section>
  );
};

export default About;
