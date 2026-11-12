"use client";
import { useState } from 'react';
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
  FaLayerGroup,
  FaGooglePlay,
  FaApple,
  FaGithub,
} from 'react-icons/fa';
import { getTechIcon } from './Projects';
import IconDefaults from './IconDefaults';
import LanguageToggle from './LanguageToggle';
import ProjectKindLabel from './ProjectKindLabel';
import DeviceFrame, { frameKind, hostOf } from './DeviceFrame';
import { asArray } from '../lib/as-array';
import { CASE_STUDIES } from '../lib/case-studies';
import { createI18nInstance, DEFAULT_LANGUAGE } from '../i18n';

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

const CaseStudyContent = ({ slug, narrative, image, mockups = [], liveUrl, appStoreUrl, github, stack, gallery, nav, kind }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const Back = isArabic ? FaArrowRight : FaArrowLeft;
  const Forward = isArabic ? FaArrowLeft : FaArrowRight;
  const copy = (isArabic && narrative.ar) || narrative.en;
  // Links back into the site follow the language being read. "Back to
  // projects" goes to the full archive on /work, where every case study is
  // listed, not to the four-card section on the home page.
  const home = isArabic ? '/ar' : '';
  const host = hostOf(appStoreUrl ? null : liveUrl);
  // Same event as the rows, cards and sheet (Projects.jsx), from this page.
  const trackLink = (type) => track('project_link', { project: slug, type, placement: 'case_study' });

  const blocks = [
    { key: 'challenge', icon: <FaExclamationTriangle />, accent: 'text-[rgb(var(--accent))]' },
    { key: 'approach', icon: <FaLightbulb />, accent: 'text-[rgb(var(--accent))]' },
    { key: 'delivered', icon: <FaCubes />, accent: 'text-[rgb(var(--accent-hover))]' },
    { key: 'outcome', icon: <FaCheckCircle />, accent: 'text-[rgb(var(--success))]' },
  ];

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] overflow-x-clip">
      {/* Standalone page without SiteShell, so it carries its own skip link:
          the first focusable element, past the header to the story. */}
      <a href="#main" className="skip-link">
        {t('a11y.skip_to_content')}
      </a>
      {/* Header: a banner landmark of its own, outside <main>. */}
      <header className="sticky top-0 z-40 bg-[rgb(var(--background))]/90 backdrop-blur-xl border-b border-[rgb(var(--border))]/50">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <a
            href={`${home}/work`}
            className="inline-flex items-center gap-2 min-h-[44px] px-3 -mx-3 rounded-lg text-sm font-medium text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
          >
            <Back className="text-xs" />
            {t('case_studies.back')}
          </a>
          <div className="flex items-center gap-2">
          {/* A mobile app lists both stores: one button each instead of "Visit Live Site". */}
          {liveUrl && appStoreUrl && (
            <div className="flex items-center gap-2">
              {[
                { href: liveUrl, label: 'Google Play', Icon: FaGooglePlay, type: 'google_play' },
                { href: appStoreUrl, label: 'App Store', Icon: FaApple, type: 'app_store' },
              ].map(({ href, label, Icon, type }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => trackLink(type)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl text-sm font-semibold bg-[rgb(var(--muted))]/40 text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))] hover:bg-[rgb(var(--primary))]/20 transition-colors"
                >
                  <Icon className="text-sm" />
                  <span className="hidden sm:inline">{label}</span>
                </a>
              ))}
            </div>
          )}
          {liveUrl && !appStoreUrl && (
            <a
              href={liveUrl}
              onClick={() => trackLink('live')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('case_studies.visit')}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl text-sm font-semibold bg-[rgb(var(--muted))]/40 text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))] hover:bg-[rgb(var(--primary))]/20 transition-colors"
            >
              <FaExternalLinkAlt className="text-xs" />
              <span className="hidden sm:inline">{t('case_studies.visit')}</span>
            </a>
          )}
          {/* The source, for the training projects that publish it. Rows,
              cards and the sheet offer one link besides the case study, so
              this page is where the source of a live project is found. */}
          {github && (
            <a
              href={github}
              onClick={() => trackLink('github')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub: ${t('projects.modal.source_code')}`}
              className="inline-flex items-center gap-2 min-h-[44px] min-w-[44px] justify-center px-3 sm:px-4 rounded-xl text-sm font-semibold bg-[rgb(var(--muted))]/40 text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))] hover:bg-[rgb(var(--primary))]/20 transition-colors"
            >
              <FaGithub className="text-sm" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          )}
          {/* Standalone page, no site navbar: the language switch lives here. */}
          <LanguageToggle />
          </div>
        </div>
      </header>

      {/* tabIndex -1 so the skip link moves focus here, not just the scroll. */}
      <main id="main" tabIndex={-1} className="focus:outline-none">
      {/* Hero */}
      <section className="relative pt-12 pb-10 md:pt-20 md:pb-14 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-72 bg-[rgb(var(--primary))]/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl text-center">
          {/* The hero animates with CSS from the first paint (see Reveal).
              The title, summary and cover move without fading: one of them
              is the page's largest paint and must not start transparent. */}
          <Reveal as="span" immediate y={12} duration={0.5}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[rgb(var(--muted))]/40 text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))] mb-5"
          >
            <FaLayerGroup className="text-[10px]" />
            {t('case_studies.label')}
          </Reveal>

          {/* Not client work: said up front, under the eyebrow. */}
          {kind && (
            <Reveal immediate y={12} duration={0.5} className="mb-5">
              <ProjectKindLabel kind={kind} />
            </Reveal>
          )}

          <Reveal as="h1" rise y={16} duration={0.6} delay={0.05}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4"
          >
            {copy.title}
          </Reveal>

          <Reveal as="p" rise y={16} duration={0.6} delay={0.1}
            className="text-base sm:text-lg text-[rgb(var(--muted-foreground))] leading-relaxed"
          >
            {copy.summary}
          </Reveal>

          {/* Fact strip: one panel split by hairlines rather than three
              floating cards of uneven height. Stacked on phones, a row from
              sm up; the dividers are logical, so they sit right in RTL. */}
          <Reveal as="dl" immediate y={16} duration={0.6} delay={0.15}
            className="grid grid-cols-1 sm:grid-cols-3 mt-9 text-start glass-card rounded-2xl border border-[rgb(var(--border))]/60 divide-y sm:divide-y-0 sm:divide-x divide-[rgb(var(--border))]/60"
          >
            {['role', 'scope', 'audience'].map((fact) => (
              <div key={fact} className="px-5 py-4">
                <dt className="text-[11px] font-bold uppercase tracking-wider text-[rgb(var(--primary))] mb-1.5">
                  {t(`case_studies.facts.${fact}`)}
                </dt>
                <dd className="text-sm font-medium leading-snug text-[rgb(var(--foreground))]">
                  {copy.facts[fact]}
                </dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Cover: the widest thing on the page, in the same frame as the
          project's row and card, and the same view-transition name, so the
          screen carries over from the row that linked here. */}
      <section className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <Reveal rise y={24} duration={0.6} delay={0.2}>
          <DeviceFrame
            src={image}
            alt={copy.title}
            kind={frameKind(image, mockups)}
            host={host}
            // The 1152px column less its gutters, then the viewport less them.
            sizes="(min-width: 1152px) 1104px, (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
            // In the first viewport at desktop widths, where it is the
            // page's LCP element: the one image this page preloads.
            preload
            style={{ viewTransitionName: `cover-${slug}` }}
            className="rounded-2xl"
          />
        </Reveal>
      </section>

      {/* Narrative blocks */}
      <section className="container mx-auto px-4 sm:px-6 max-w-4xl py-14 md:py-20 space-y-10 md:space-y-14">
        {blocks.map((block, index) => {
          const section = copy[block.key] || {};
          const points = asArray(section.points);
          return (
            <Reveal as="article" y={24} delay={revealDelay(index)}
              key={block.key}
              className="text-start"
            >
              <div className="flex items-center gap-4 mb-4">
                <span
                  className="font-display text-4xl md:text-5xl font-bold text-outline leading-none select-none"
                  dir="ltr"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[rgb(var(--muted))]/20 border border-[rgb(var(--border))]/50 ${block.accent}`}
                >
                  {block.icon}
                </span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                  {t(`case_studies.sections.${block.key}`)}
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[rgb(var(--muted-foreground))] leading-relaxed">
                {section.body}
              </p>

              {points.length > 0 && (
                <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 glass-card rounded-xl border border-[rgb(var(--border))]/50 p-4 text-sm text-[rgb(var(--muted-foreground))]"
                    >
                      <FaCheckCircle className="mt-0.5 text-[rgb(var(--muted-foreground))] shrink-0" />
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
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-5">
              {t('case_studies.sections.stack')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[rgb(var(--muted))]/15 border border-[rgb(var(--border))]/50 text-sm font-medium"
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
          On a phone the phone view comes first. A composed mockup board (a
          row of app screens, the registry's `mockups`) would shrink each
          screen to a thumbnail at phone width, so below 768px it keeps a
          readable 720px and scrolls sideways instead. */}
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
          <section className="container mx-auto px-4 sm:px-6 max-w-6xl pb-16 md:pb-20">
            <div className="flex items-end justify-between gap-4 mb-6">
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-start">
                {t('case_studies.screens_title')}
              </h2>
            </div>
            <div className={`grid gap-6 ${phone ? 'md:grid-cols-3' : ''} items-start`}>
              <div className={`grid gap-6 min-w-0 ${phone ? 'md:col-span-2' : 'sm:grid-cols-2'}`}>
                {desktop.map((src, i) => {
                  const alt = t('case_studies.screen_alt', { name, n: i + 1 });
                  const sizes = phone
                    ? '(min-width: 1152px) 731px, (min-width: 768px) 66vw'
                    : '(min-width: 1152px) 544px, (min-width: 640px) 50vw';
                  if (!mockups.includes(src)) {
                    return <Shot key={src} src={src} alt={alt} sizes={`${sizes}, calc(100vw - 32px)`} />;
                  }
                  return (
                    <div key={src} className="-mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                      <Shot src={src} alt={alt} sizes={`${sizes}, 720px`} className="w-[720px] md:w-auto" />
                    </div>
                  );
                })}
              </div>
              {phone && (
                <div className="order-first md:order-none md:sticky md:top-24 max-w-[280px] w-full mx-auto">
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
      <section className="container mx-auto px-4 sm:px-6 max-w-4xl pb-20">
        <Reveal y={24} duration={0.5}
          className="glass-card rounded-2xl border border-[rgb(var(--border))]/50 p-6 sm:p-10 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            {t('case_studies.cta_title')}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] mb-7 leading-relaxed">
            {t('case_studies.cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`${home}/#contact`}
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl font-semibold bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] hover:from-[rgb(var(--accent-hover))] hover:to-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))] shadow-lg transition-all active:scale-[0.98]"
            >
              {t('case_studies.cta_button')}
            </a>
            <a
              href={`${home}/work`}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl font-semibold glass-card border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))]/40 transition-colors"
            >
              <Back className="text-xs" />
              {t('case_studies.back')}
            </a>
          </div>
        </Reveal>
      </section>

      {/* Prev / next case study — the archive becomes a loop, not a dead end. */}
      {nav && (
        <nav className="container mx-auto px-4 sm:px-6 max-w-4xl pb-20" aria-label={t('case_studies.label')}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={`${home}/case-study/${nav.prev.slug}`}
              className="group glass-card rounded-2xl border border-[rgb(var(--border))]/50 p-5 hover:border-[rgb(var(--primary))]/40 transition-colors text-start"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))] mb-2 flex items-center gap-2">
                <Back className="text-[10px]" />
                {t('case_studies.previous')}
              </p>
              <p className="font-display font-bold text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))] transition-colors">
                {nav.prev.name}
              </p>
            </a>
            <a
              href={`${home}/case-study/${nav.next.slug}`}
              className="group glass-card rounded-2xl border border-[rgb(var(--border))]/50 p-5 hover:border-[rgb(var(--primary))]/40 transition-colors text-start sm:text-end"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))] mb-2 flex items-center gap-2 sm:justify-end">
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
    </div>
  );
};

export default CaseStudy;
