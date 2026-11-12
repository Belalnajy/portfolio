"use client";
import { useEffect, useRef, useState } from 'react';
import { track } from '@vercel/analytics';
import { I18nextProvider } from 'react-i18next';
import Reveal from './Reveal';
import { revealDelay } from '../lib/motion';
import { useTranslation } from 'react-i18next';
import {
  FaArrowLeft,
  FaArrowRight,
  FaExternalLinkAlt,
  FaExclamationTriangle,
  FaLightbulb,
  FaCubes,
  FaCheckCircle,
  FaCheck,
  FaLayerGroup,
  FaGooglePlay,
  FaApple,
  FaGithub,
  FaMoon,
  FaSun,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { getTechIcon } from './Projects';
import IconDefaults from './IconDefaults';
import LanguageToggle from './LanguageToggle';
import ProjectKindLabel from './ProjectKindLabel';
import DeviceFrame, { frameKind, hostOf } from './DeviceFrame';
import { asArray } from '../lib/as-array';
import { useTheme } from '../lib/useTheme';
import { CASE_STUDIES } from '../lib/case-studies';
import { createI18nInstance, DEFAULT_LANGUAGE } from '../i18n';

/**
 * The shared mobile card surface (.m-card in globals.css, phones only),
 * written out where a block needs its own padding: a max-md: utility cannot
 * override .m-card's, which is declared after Tailwind's utilities.
 */
const M_CARD =
  'max-md:bg-[rgb(var(--surface))] max-md:border max-md:border-[rgb(var(--border-subtle))] max-md:rounded-[var(--radius-card)] max-md:shadow-[var(--elev-1)]';

/**
 * Long-form write-up for a single project. The per-project copy comes in via
 * `narrative` ({ en, ar }) from src/content/case-studies/<slug>.js, so each
 * page ships only its own story; shared labels still come from the
 * translation bundle. Further case studies only need a content module plus an
 * entry in src/lib/case-studies.js.
 *
 * Renders outside <App/>, so it owns its own i18n instance: `lang` is the
 * language the route prerenders in and `bundle` its translations.
 */
const CaseStudy = ({ lang = DEFAULT_LANGUAGE, bundle, ...props }) => {
  const [i18nInstance] = useState(() => createI18nInstance(lang, bundle));
  return (
    <I18nextProvider i18n={i18nInstance}>
      <IconDefaults>
        <CaseStudyContent {...props} />
      </IconDefaults>
    </I18nextProvider>
  );
};

/**
 * Light or dark. The page stands outside the site shell, so it had no way to
 * change the theme; this is the same store the shell's toggles use.
 */
/** True when the visitor asked for less motion; false on the server. */
const useReducedMotion = () => {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduce(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  return reduce;
};

const ThemeButton = () => {
  const { t } = useTranslation();
  const { isDark, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('theme.toggle')}
      className="press inline-flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-[rgb(var(--muted))]/40 text-[rgb(var(--accent))] border border-[rgb(var(--border))] hover:bg-[rgb(var(--primary))]/20 transition-colors">
      {isDark ? <FaMoon aria-hidden="true" /> : <FaSun aria-hidden="true" />}
    </button>
  );
};

/**
 * The desktop screens on a phone: a swipeable rail of slides, 85% of the
 * screen wide so the next one peeks in, with a "2 / 4" counter. Each slide
 * still opens the full-size capture. The counter follows the slide that is
 * mostly in view (an IntersectionObserver on the rail, so it is the same in
 * both directions).
 */
const ScreenRail = ({ shots, host, mockups, name }) => {
  const { t } = useTranslation();
  const railRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const single = shots.length === 1;

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || single || typeof IntersectionObserver === 'undefined') return undefined;
    const slides = [...rail.children];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(slides.indexOf(entry.target));
        }
      },
      { root: rail, threshold: 0.6 },
    );
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [single]);

  return (
    <div>
      <div
        ref={railRef}
        className="m-rail items-start pb-1">
        {shots.map((src, i) => (
          <a
            key={src}
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className={`press block rounded-xl ${single ? 'w-full' : 'w-[85vw]'}`}>
            <DeviceFrame
              src={src}
              alt={t('case_studies.screen_alt', { name, n: i + 1 })}
              kind={frameKind(src, mockups)}
              host={host}
              ratio="natural"
              // A slide is 85vw; a lone screen spans the column.
              sizes={single ? 'calc(100vw - 40px)' : '85vw'}
            />
          </a>
        ))}
      </div>
      {!single && (
        <div className="mt-4 flex items-center justify-between gap-4" aria-hidden="true">
          <span className="flex items-center gap-1.5">
            {shots.map((src, i) => (
              <span
                key={src}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === current ? 'w-5 bg-[rgb(var(--accent))]' : 'w-1.5 bg-[rgb(var(--muted-foreground))]/35'
                }`}
              />
            ))}
          </span>
          <span dir="ltr" className="text-xs font-semibold tabular-nums text-[rgb(var(--muted-foreground))]">
            {current + 1} / {shots.length}
          </span>
        </div>
      )}
    </div>
  );
};

const CaseStudyContent = ({ slug, narrative, image, mockups = [], liveUrl, appStoreUrl, github, stack, gallery, nav, kind }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const Back = isArabic ? FaArrowRight : FaArrowLeft;
  const Forward = isArabic ? FaArrowLeft : FaArrowRight;
  const Chevron = isArabic ? FaChevronLeft : FaChevronRight;
  const copy = (isArabic && narrative.ar) || narrative.en;
  // Links back into the site follow the language being read. "Back to
  // projects" goes to the full archive on /work, where every case study is
  // listed, not to the four-card section on the home page.
  const home = isArabic ? '/ar' : '';
  const host = hostOf(appStoreUrl ? null : liveUrl);
  // Same event as the rows, cards and sheet (Projects.jsx), from this page.
  const trackLink = (type) => track('project_link', { project: slug, type, placement: 'case_study' });
  // The home page's contact section. `/ar#contact`, not `/ar/#contact`: the
  // trailing slash is redirected, which turned the jump into a full reload.
  const contactHref = home ? `${home}#contact` : '/#contact';

  // The sticky bar on phones repeats the closing card's two actions, so it
  // steps away once that card is on screen, and stays away below it.
  const ctaRef = useRef(null);
  const [ctaReached, setCtaReached] = useState(false);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const card = ctaRef.current;
    if (!card || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) =>
      setCtaReached(entry.isIntersecting || entry.boundingClientRect.top < 0),
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // The product's own links: the live site, or both stores for a mobile app,
  // and the source where it is published. In the header from 768 up; on a
  // phone they sit under the summary, where there is room to name them.
  const links = [
    ...(liveUrl && appStoreUrl
      ? [
          { href: liveUrl, label: 'Google Play', Icon: FaGooglePlay, type: 'google_play' },
          { href: appStoreUrl, label: 'App Store', Icon: FaApple, type: 'app_store' },
        ]
      : []),
    ...(liveUrl && !appStoreUrl ? [{ href: liveUrl, label: t('case_studies.visit'), Icon: FaExternalLinkAlt, type: 'live' }] : []),
    ...(github ? [{ href: github, label: 'GitHub', Icon: FaGithub, type: 'github', aria: `GitHub: ${t('projects.modal.source_code')}` }] : []),
  ];

  const blocks = [
    { key: 'challenge', icon: <FaExclamationTriangle />, accent: 'text-[rgb(var(--accent))]' },
    { key: 'approach', icon: <FaLightbulb />, accent: 'text-[rgb(var(--accent))]' },
    { key: 'delivered', icon: <FaCubes />, accent: 'text-[rgb(var(--accent-hover))]' },
    { key: 'outcome', icon: <FaCheckCircle />, accent: 'text-[rgb(var(--success))]' },
  ];

  const facts = (
    <>
      {['role', 'scope', 'audience'].map((fact) => (
        <div key={fact} className={`px-5 py-4 ${fact === 'audience' ? 'max-md:col-span-2' : ''}`}>
          <dt className="text-[11px] font-bold uppercase tracking-wider text-[rgb(var(--primary))] mb-1.5 max-md:text-xs max-md:font-semibold max-md:tracking-[0.14em]">
            {t(`case_studies.facts.${fact}`)}
          </dt>
          <dd className="text-sm font-medium leading-snug text-[rgb(var(--foreground))] max-md:leading-normal">
            {copy.facts[fact]}
          </dd>
        </div>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] overflow-x-clip">
      {/* Standalone page without SiteShell, so it carries its own skip link:
          the first focusable element, past the header to the story. */}
      <a href="#main" className="skip-link">
        {t('a11y.skip_to_content')}
      </a>
      {/* Header: a banner landmark of its own, outside <main>. */}
      <header className="sticky top-0 z-40 bg-[rgb(var(--background))]/90 backdrop-blur-xl max-md:backdrop-blur-md border-b border-[rgb(var(--border))]/50">
        <div className="container mx-auto px-5 sm:px-6 h-14 md:h-16 flex items-center justify-between gap-3">
          <a
            href={`${home}/work`}
            className="inline-flex items-center gap-2 min-h-[44px] min-w-0 px-3 -mx-3 rounded-lg text-sm font-medium text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
          >
            <Back className="text-xs shrink-0" />
            <span className="truncate">{t('case_studies.back')}</span>
          </a>
          <div className="flex items-center gap-2">
            {/* A mobile app lists both stores: one button each instead of
                "Visit Live Site". The source is here too, for the projects
                that publish it: rows, cards and the sheet offer one link
                besides the case study, so this page is where the source of
                a live project is found. */}
            {links.map(({ href, label, Icon, type, aria }) => (
              <a
                key={type}
                href={href}
                onClick={() => trackLink(type)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={aria ?? label}
                className="max-md:hidden inline-flex items-center gap-2 min-h-[44px] min-w-[44px] justify-center px-4 rounded-xl text-sm font-semibold bg-[rgb(var(--muted))]/40 text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))] hover:bg-[rgb(var(--primary))]/20 transition-colors"
              >
                <Icon className={type === 'live' ? 'text-xs' : 'text-sm'} />
                <span className="hidden sm:inline">{label}</span>
              </a>
            ))}
            {/* Standalone page, no site navbar: theme and language live here. */}
            <ThemeButton />
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* tabIndex -1 so the skip link moves focus here, not just the scroll.
          On a phone the bottom padding clears the sticky action bar. */}
      <main id="main" tabIndex={-1} className="focus:outline-none max-md:pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
      {/* Hero */}
      <section className="relative pt-12 pb-10 md:pt-20 md:pb-14 max-md:pt-8 max-md:pb-7 overflow-hidden">
        <div className="max-md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-72 bg-[rgb(var(--primary))]/8 blur-[120px] rounded-full pointer-events-none" />
        {/* The phone gets the same warm light as a gradient: a 120px blur
            is a full-screen paint on every scroll frame. */}
        <div aria-hidden="true" className="md:hidden absolute inset-x-0 top-0 h-80 pointer-events-none bg-[radial-gradient(70%_60%_at_50%_0%,rgb(var(--accent)/0.13),transparent_72%)]" />

        <div className="container mx-auto px-5 sm:px-6 relative z-10 max-w-4xl text-center max-md:text-start">
          {/* The hero animates with CSS from the first paint (see Reveal).
              The title, summary and cover move without fading: one of them
              is the page's largest paint and must not start transparent. */}
          <Reveal as="span" immediate y={12} duration={0.5}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[rgb(var(--muted))]/40 text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))] mb-5 max-md:mb-4 max-md:text-[rgb(var(--foreground))] max-md:bg-[rgb(var(--accent))]/10 max-md:border-[rgb(var(--accent))]/30"
          >
            <FaLayerGroup className="text-[10px] max-md:text-[rgb(var(--accent))]" />
            {t('case_studies.label')}
          </Reveal>

          {/* Not client work: said up front, under the eyebrow. */}
          {kind && (
            <Reveal immediate y={12} duration={0.5} className="mb-5 max-md:mb-4">
              <ProjectKindLabel kind={kind} />
            </Reveal>
          )}

          <Reveal as="h1" rise y={16} duration={0.6} delay={0.05}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 max-md:text-[2rem] max-md:leading-[1.12] max-md:rtl:leading-[1.45] max-md:text-balance"
          >
            {copy.title}
          </Reveal>

          <Reveal as="p" rise y={16} duration={0.6} delay={0.1}
            className="text-base sm:text-lg text-[rgb(var(--muted-foreground))] leading-relaxed max-md:text-base max-md:leading-[1.65] max-md:rtl:leading-[1.85]"
          >
            {copy.summary}
          </Reveal>

          {/* The product's links, on a phone (the header has them from 768 up). */}
          {links.length > 0 && (
            <Reveal immediate y={12} duration={0.5} delay={0.12} className="md:hidden mt-5 flex flex-wrap gap-2">
              {links.map(({ href, label, Icon, type, aria }) => (
                <a
                  key={type}
                  href={href}
                  onClick={() => trackLink(type)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={aria}
                  className="press inline-flex items-center gap-2 min-h-11 px-4 rounded-full text-sm font-semibold bg-[rgb(var(--surface))] border border-[rgb(var(--border-subtle))] text-[rgb(var(--foreground))] shadow-[var(--elev-1)]">
                  <Icon aria-hidden="true" className="text-xs text-[rgb(var(--accent))]" />
                  {label}
                </a>
              ))}
            </Reveal>
          )}

          {/* Fact strip: one panel split by hairlines rather than three
              floating cards of uneven height. A row from sm up; the dividers
              are logical, so they sit right in RTL. On a phone the facts
              follow the cover instead, as a two-column card. */}
          <Reveal as="dl" immediate y={16} duration={0.6} delay={0.15}
            className="max-md:hidden grid grid-cols-1 sm:grid-cols-3 mt-9 text-start glass-card rounded-2xl border border-[rgb(var(--border))]/60 divide-y sm:divide-y-0 sm:divide-x divide-[rgb(var(--border))]/60"
          >
            {facts}
          </Reveal>
        </div>
      </section>

      {/* Cover: the widest thing on the page, in the same frame as the
          project's row and card, and the same view-transition name, so the
          screen carries over from the row that linked here. */}
      <section className="container mx-auto px-5 sm:px-6 max-w-6xl">
        <Reveal rise y={24} duration={0.6} delay={0.2}>
          <DeviceFrame
            src={image}
            alt={copy.title}
            kind={frameKind(image, mockups)}
            host={host}
            // The 1152px column less its gutters, then the viewport less them.
            sizes="(min-width: 1152px) 1104px, (min-width: 640px) calc(100vw - 48px), calc(100vw - 40px)"
            // The page's LCP element (in the first viewport at desktop
            // widths, the first image on a phone): the one image this page
            // preloads.
            preload
            style={{ viewTransitionName: `cover-${slug}` }}
            className="rounded-2xl max-md:shadow-[var(--elev-2)]"
          />
        </Reveal>

        {/* The facts on a phone: Role and Scope side by side, the audience
            across the card under them. */}
        <Reveal as="dl" y={16} duration={0.5}
          className={`md:hidden mt-4 grid grid-cols-2 text-start ${M_CARD} [&>div]:px-5 [&>div]:py-4 [&>div:nth-child(2)]:border-s [&>div:nth-child(3)]:border-t [&>div]:border-[rgb(var(--border-subtle))]`}
        >
          {facts}
        </Reveal>
      </section>

      {/* Narrative blocks */}
      <section className="container mx-auto px-5 sm:px-6 max-w-4xl py-14 md:py-20 max-md:pt-12 max-md:pb-10 space-y-10 md:space-y-14 max-md:space-y-11">
        {blocks.map((block, index) => {
          const section = copy[block.key] || {};
          const points = asArray(section.points);
          return (
            <Reveal as="article" y={24} delay={revealDelay(index)}
              key={block.key}
              className="text-start"
            >
              {/* On a phone the outline numeral (faint on the light theme)
                  becomes an eyebrow over the heading. */}
              <p aria-hidden="true" dir="ltr" className="md:hidden mb-2 m-eyebrow rtl:text-end">
                {String(index + 1).padStart(2, '0')} / {String(blocks.length).padStart(2, '0')}
              </p>
              <div className="flex items-center gap-4 mb-4 max-md:gap-3">
                <span
                  className="max-md:hidden font-display text-4xl md:text-5xl font-bold text-outline leading-none select-none"
                  dir="ltr"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={`inline-flex shrink-0 items-center justify-center w-11 h-11 max-md:w-10 max-md:h-10 rounded-xl bg-[rgb(var(--muted))]/20 border border-[rgb(var(--border))]/50 ${block.accent}`}
                >
                  {block.icon}
                </span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight max-md:text-[1.5rem] max-md:leading-[1.2] max-md:rtl:leading-[1.5]">
                  {t(`case_studies.sections.${block.key}`)}
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[rgb(var(--muted-foreground))] leading-relaxed max-md:text-base max-md:leading-[1.7] max-md:rtl:leading-[1.85]">
                {section.body}
              </p>

              {/* From sm up, a grid of small cards; on a phone one card of
                  check rows split by hairlines. */}
              {points.length > 0 && (
                <ul className={`mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 max-md:gap-0 max-md:px-5 max-md:py-1 ${M_CARD}`}>
                  {points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 glass-card rounded-xl border border-[rgb(var(--border))]/50 p-4 text-sm text-[rgb(var(--muted-foreground))] max-md:bg-transparent! max-md:shadow-none! max-md:rounded-none! max-md:border-x-0! max-md:border-b-0! max-md:border-t! max-md:first:border-t-0! max-md:border-[rgb(var(--border-subtle))]! max-md:px-0 max-md:py-3.5 max-md:text-[0.9375rem] max-md:leading-normal max-md:text-[rgb(var(--foreground))]/85"
                    >
                      <FaCheckCircle className="max-md:hidden mt-0.5 text-[rgb(var(--muted-foreground))] shrink-0" />
                      <span aria-hidden="true" className="md:hidden mt-0.5 inline-flex shrink-0 items-center justify-center w-5 h-5 rounded-full bg-[rgb(var(--accent))]/12 text-[rgb(var(--accent))]">
                        <FaCheck className="text-[9px]" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          );
        })}

        {/* Stack */}
        {stack?.length > 0 && (
          <Reveal as="article" y={24} duration={0.5}
            className="text-start"
          >
            <p className="md:hidden m-eyebrow mb-2">{t('mPages.eyebrow.stack')}</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-5 max-md:font-display max-md:text-[1.5rem] max-md:mb-4">
              {t('case_studies.sections.stack')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[rgb(var(--muted))]/15 border border-[rgb(var(--border))]/50 text-sm font-medium max-md:rounded-full max-md:bg-[rgb(var(--surface))] max-md:border-[rgb(var(--border-subtle))]"
                >
                  {getTechIcon(tech)}
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        )}
      </section>

      {/* Screens from the live product. Desktop views run down the main
          column in the browser frame; the phone view sits beside them in a
          phone frame, so the responsive claim in the narrative is something
          you can see. Each opens the full-size capture.
          On a phone the phone view comes first, at a size that reads, then
          the desktop views as a swipeable rail (ScreenRail). */}
      {gallery?.length > 0 && (() => {
        const name = CASE_STUDIES[slug]?.name || copy.title;
        const desktop = gallery.filter((src) => !src.endsWith('-m.webp'));
        const phone = gallery.find((src) => src.endsWith('-m.webp'));
        const Shot = ({ src, alt, sizes, className = '' }) => (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block rounded-xl ${className}`}>
            <DeviceFrame
              src={src}
              alt={alt}
              kind={frameKind(src, mockups)}
              host={host}
              ratio="natural"
              sizes={sizes}
              className="transition-colors group-hover:border-[rgb(var(--primary))]/50"
            />
          </a>
        );
        return (
          <section className="container mx-auto px-5 sm:px-6 max-w-6xl pb-16 md:pb-20 max-md:pb-12">
            <p className="md:hidden m-eyebrow mb-2 text-start">{t('mPages.eyebrow.screens')}</p>
            <div className="flex items-end justify-between gap-4 mb-6 max-md:mb-5">
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-start max-md:text-[1.5rem]">
                {t('case_studies.screens_title')}
              </h2>
            </div>

            {/* Phone layout */}
            <div className="md:hidden space-y-8">
              {phone && (
                <div className="mx-auto w-[64vw] max-w-[270px]">
                  <Shot
                    src={phone}
                    alt={t('case_studies.screen_mobile_alt', { name })}
                    sizes="(max-width: 420px) 64vw, 270px"
                    className="press rounded-[1.75rem]"
                  />
                </div>
              )}
              {desktop.length > 0 && <ScreenRail shots={desktop} host={host} mockups={mockups} name={name} />}
            </div>

            {/* From 768 up */}
            <div className={`max-md:hidden grid gap-6 ${phone ? 'md:grid-cols-3' : ''} items-start`}>
              <div className={`grid gap-6 min-w-0 ${phone ? 'md:col-span-2' : 'sm:grid-cols-2'}`}>
                {desktop.map((src, i) => {
                  const alt = t('case_studies.screen_alt', { name, n: i + 1 });
                  const sizes = phone
                    ? '(min-width: 1152px) 731px, 66vw'
                    : '(min-width: 1152px) 544px, 50vw';
                  return <Shot key={src} src={src} alt={alt} sizes={sizes} />;
                })}
              </div>
              {phone && (
                <div className="md:sticky md:top-24 max-w-[280px] w-full mx-auto">
                  <Shot
                    src={phone}
                    alt={t('case_studies.screen_mobile_alt', { name })}
                    sizes="268px"
                    className="rounded-[1.75rem]"
                  />
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* Closing CTA */}
      <section ref={ctaRef} className="container mx-auto px-5 sm:px-6 max-w-4xl pb-20 max-md:pb-10">
        <Reveal y={24} duration={0.5}
          className={`glass-card rounded-2xl border border-[rgb(var(--border))]/50 p-6 sm:p-10 text-center m-card`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 max-md:font-display max-md:text-[1.5rem] max-md:leading-[1.2] max-md:rtl:leading-[1.5]">
            {t('case_studies.cta_title')}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] mb-7 leading-relaxed max-md:mb-6">
            {t('case_studies.cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={contactHref}
              className="press inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl font-semibold bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] hover:from-[rgb(var(--accent-hover))] hover:to-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))] shadow-lg transition-all active:scale-[0.98]"
            >
              {t('case_studies.cta_button')}
            </a>
            <a
              href={`${home}/work`}
              className="press inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl font-semibold glass-card border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))]/40 transition-colors"
            >
              <Back className="text-xs" />
              {t('case_studies.back')}
            </a>
          </div>
        </Reveal>
      </section>

      {/* Prev / next case study — the archive becomes a loop, not a dead end. */}
      {nav && (
        <nav className="container mx-auto px-5 sm:px-6 max-w-4xl pb-20 max-md:pb-8" aria-label={t('case_studies.label')}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-md:gap-3">
            <a
              href={`${home}/case-study/${nav.prev.slug}`}
              className={`press group glass-card rounded-2xl border border-[rgb(var(--border))]/50 p-5 hover:border-[rgb(var(--primary))]/40 transition-colors text-start m-card`}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))] mb-2 flex items-center gap-2 max-md:text-xs max-md:tracking-[0.14em]">
                <Back className="text-[10px]" />
                {t('case_studies.previous')}
              </p>
              <p className="font-display font-bold text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))] transition-colors">
                {nav.prev.name}
              </p>
            </a>
            <a
              href={`${home}/case-study/${nav.next.slug}`}
              className={`press group glass-card rounded-2xl border border-[rgb(var(--border))]/50 p-5 hover:border-[rgb(var(--primary))]/40 transition-colors text-start sm:text-end m-card`}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))] mb-2 flex items-center gap-2 sm:justify-end max-md:text-xs max-md:tracking-[0.14em]">
                {t('case_studies.next')}
                <Forward className="text-[10px]" />
              </p>
              <p className="font-display font-bold text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))] transition-colors">
                {nav.next.name}
              </p>
            </a>
          </div>
        </nav>
      )}
      </main>

      {/* Phones: the page has no tab bar, so the next step stays under the
          thumb: start a conversation, or go on to the next case study. The
          wrapper is what hides it from 768 up, whatever .m-sticky-actions
          sets. Hidden (and out of the tab order) once the closing card,
          which offers the same two actions, is on screen. */}
      <div className="md:hidden print:hidden">
        <div
          className="m-sticky-actions flex items-center gap-3"
          style={
            ctaReached
              ? {
                  transform: 'translateY(110%)',
                  visibility: 'hidden',
                  transition: reduceMotion
                    ? 'none'
                    : 'transform var(--dur-ui) var(--ease-out), visibility 0s linear var(--dur-ui)',
                }
              : reduceMotion
                ? { transition: 'none' }
                : undefined
          }>
          <a
            href={contactHref}
            className="press flex-1 inline-flex items-center justify-center min-h-12 px-4 rounded-[var(--radius-btn,0.875rem)] font-semibold bg-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))] shadow-[0_8px_20px_-10px_rgb(var(--accent)/0.6)]"
          >
            {t('case_studies.cta_button')}
          </a>
          {nav && (
            <a
              href={`${home}/case-study/${nav.next.slug}`}
              aria-label={`${t('case_studies.next')}: ${nav.next.name}`}
              className="press inline-flex items-center justify-center gap-1.5 min-h-12 px-4 rounded-[var(--radius-btn,0.875rem)] font-semibold text-sm border border-[rgb(var(--border-control))] text-[rgb(var(--foreground))]"
            >
              {t('mPages.next_short')}
              <Chevron aria-hidden="true" className="text-xs text-[rgb(var(--accent))]" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
