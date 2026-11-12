'use client';
import { FaGithub, FaLinkedin, FaArrowDown, FaStar, FaCheckCircle, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';
import MagneticButton from './MagneticButton';
import { useTranslation } from 'react-i18next';
import { useCtaVariant } from '../lib/use-cta-variant';
import { FACTS } from '../lib/facts';

/**
 * Type-first hero with a freelance proof panel. The H1 is the offer, not the
 * name: a visitor (and a search engine) reads what Belal does before who he
 * is. There is one primary action, getting in touch, with the reply-time
 * promise beside it; everything else is a quieter link. The panel answers the
 * first question a visitor from a freelance platform asks — can I trust this
 * freelancer? Everything animates with CSS keyframes rather than framer
 * `initial` props so the server markup ships visible and the LCP (the
 * headline text) never waits for hydration.
 */
const Hero = () => {
  const { t } = useTranslation();
  const { ctaVariant, trackCtaClick } = useCtaVariant();

  return (
    <section
      id="home"
      className="md:min-h-[100svh] flex flex-col relative overflow-hidden bg-[rgb(var(--background))]">
      {/* Backdrop: quiet dot grid + one copper glow. No canvas, no JS. */}
      <div className="absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" aria-hidden="true" />
      <div className="max-md:hidden absolute -top-40 start-1/4 w-[36rem] h-[36rem] bg-[rgb(var(--accent))]/8 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />
      {/* Phones: the same warm light as a plain gradient. A 140px blur over a
          36rem box is one of the most expensive things a phone can be asked
          to paint, and it sat behind the LCP text. */}
      <div
        className="md:hidden absolute inset-x-0 top-0 h-[40rem] pointer-events-none bg-[radial-gradient(70%_55%_at_15%_12%,rgb(var(--accent)/0.14),transparent_72%)] rtl:bg-[radial-gradient(70%_55%_at_85%_12%,rgb(var(--accent)/0.14),transparent_72%)]"
        aria-hidden="true"
      />

      {/* Phones: no full-height hero. It left a scroll cue floating in
          ~300px of empty ink under the proof panel. */}
      <div className="shell relative z-10 flex-1 flex flex-col justify-center pt-[calc(var(--header-h,56px)+1.75rem)] pb-6 md:pt-28 md:pb-24">
        {/* pb-24: the floating controls sit in the bottom corners (the FAQ
            launcher at the end from md, the theme toggle at the start from
            xl), and at 1024px the launcher covered the panel's corner. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-md:gap-7 lg:gap-8 items-center">
          {/* ============ Type column ============ */}
          <div className="lg:col-span-8 text-start">
            {/* Status row. On phones only "open to freelance" stays a pill;
                Now and the city drop to one quiet line under it (three
                stacked pills took ~150px before the heading). */}
            <div className="animate-fadeInUp flex flex-wrap items-center gap-3 max-md:gap-x-3 max-md:gap-y-1 mb-7 max-md:mb-6" style={{ animationDelay: '0.05s' }}>
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[rgb(var(--success))]/10 border border-[rgb(var(--success))]/30 text-[rgb(var(--foreground))] text-sm font-medium">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--success))] opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[rgb(var(--success))]" />
                </span>
                {t('hero.available')}
              </span>
              <span className="md:hidden basis-full h-2" aria-hidden="true" />
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--muted))]/40 border border-[rgb(var(--border))] text-sm text-[rgb(var(--muted-foreground))] max-md:gap-1.5 max-md:p-0 max-md:rounded-none max-md:bg-transparent max-md:border-0 max-md:text-[13px]">
                <span className="font-semibold text-[rgb(var(--primary))]">{t('hero.now_label')}</span>
                {t('hero.now_value')}
              </span>
              {/* The city in visible text, not only metadata: local-intent
                  searches weigh what the page says above the fold. */}
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--muted))]/40 border border-[rgb(var(--border))] text-sm text-[rgb(var(--muted-foreground))] max-md:gap-1.5 max-md:p-0 max-md:rounded-none max-md:bg-transparent max-md:border-0 max-md:text-[13px]">
                <FaMapMarkerAlt className="text-[rgb(var(--primary))] text-xs" />
                {t('hero.location')}
              </span>
            </div>

            {/* Who, as a quiet line above the offer. */}
            <p className="animate-riseIn font-display text-xl sm:text-2xl font-bold text-[rgb(var(--foreground))] mb-4 max-md:mb-3" style={{ animationDelay: '0.1s' }}>
              {t('hero.greeting_start')}
              <span className="text-gradient-copper">{t('hero.name')}</span>
            </p>

            {/* The offer is the page's heading. On phones .type-display (the
                mobile display size) takes over from text-display-lg. */}
            <h1 className="font-display text-display-lg type-display font-bold text-[rgb(var(--foreground))] mb-6 max-md:mb-5 max-w-3xl">
              {t('hero.headline')}
            </h1>

            {/* Role line. The proof (projects, clients) is the stat card in
                the panel beside it, so it is not repeated here. */}
            <p
              className="animate-riseIn text-sm sm:text-base font-semibold tracking-[0.25em] uppercase text-[rgb(var(--primary))] mb-8 max-md:text-xs max-md:tracking-[0.14em] max-md:mb-7 max-md:text-balance"
              style={{ animationDelay: '0.18s' }}>
              {t('hero.role_line')}
            </p>

            {/* One primary action, then quieter links on the same row. The CV
                download lives in the nav and the drawer. */}
            {/* data-hero-cta: while this row is on screen the floating
                contact dock stays hidden (FloatingActions), so it never
                covers the hero's own call to action. */}
            <div
              data-hero-cta
              className="animate-fadeInUp flex flex-wrap items-center gap-x-3 gap-y-2 max-md:gap-y-3"
              style={{ animationDelay: '0.3s' }}>
              {/* A/B-tested wording: which framing gets a freelance visitor to
                  reach out — direct hire vs. project outcome. The cta_click
                  placement was 'hero_panel' until 2026-11-12, when this button
                  replaced the panel's; from then on it is 'hero_main'. Compare
                  the two periods with that in mind. */}
              <MagneticButton
                href="#contact"
                onClick={() => trackCtaClick('hero_main')}
                className="press bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] hover:from-[rgb(var(--accent-hover))] hover:to-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))] px-8 py-2 min-h-[52px] rounded-xl max-md:rounded-[var(--radius-btn,0.875rem)] font-semibold leading-snug shadow-lg max-md:shadow-[0_10px_28px_-12px_rgb(var(--accent)/0.7)] transition-all inline-flex items-center justify-center me-3 max-md:me-0 max-md:w-full max-md:text-[17px]">
                {/* Both wordings share one grid cell, the inactive one
                    invisible, so the button is as wide as the longer wording
                    in either language. The server renders A and the stored
                    arm swaps in after hydration; nothing on the row moves. */}
                <span className="grid w-full place-items-center text-center">
                  <span className="col-start-1 row-start-1">
                    {t(ctaVariant === 'b' ? 'hero.hire_me_b' : 'hero.hire_me')}
                  </span>
                  <span aria-hidden="true" className="col-start-1 row-start-1 invisible">
                    {t(ctaVariant === 'b' ? 'hero.hire_me' : 'hero.hire_me_b')}
                  </span>
                </span>
              </MagneticButton>
              <a
                href="#projects"
                className="max-md:order-2 max-md:-ms-2 inline-flex items-center min-h-[44px] px-2 text-sm font-semibold text-[rgb(var(--foreground))] underline decoration-[rgb(var(--border-control))] underline-offset-4 hover:text-[rgb(var(--primary))] hover:decoration-[rgb(var(--primary))] transition-colors">
                {t('hero.view_projects')}
              </a>

              {/* The profiles stay together: they never wrap apart. */}
              <span className="inline-flex items-center gap-1 whitespace-nowrap max-md:order-2 max-md:ms-auto">
                <span className="hidden sm:block w-px h-6 me-2 bg-[rgb(var(--border))]" aria-hidden="true" />
                <a
                  href="https://github.com/Belalnajy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors">
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/belalnajy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl text-[rgb(var(--muted-foreground))] hover:text-[#0A66C2] transition-colors">
                  <FaLinkedin className="w-5 h-5" />
                </a>
              </span>

              {/* The reply-time promise. On phones it sits right under the
                  full-width button (order-1); from md it takes its own line
                  under the row, as before. */}
              <p className="basis-full max-md:order-1 mt-1 max-md:mt-0 inline-flex items-center max-md:justify-center gap-2 text-sm text-[rgb(var(--muted-foreground))]">
                <FaRegClock aria-hidden="true" className="text-[rgb(var(--primary))]" />
                {t('contact.reply_time')}
              </p>
            </div>
          </div>

          {/* ============ Freelance proof, phones ============ */}
          {/* One compact card instead of the tall panel: the rating and the
              two counts side by side, so the proof is still in the first
              screen without pushing the projects a screen further down. */}
          <aside
            className="md:hidden animate-fadeInUp"
            style={{ animationDelay: '0.2s' }}
            aria-label={t('hero.freelance_title')}>
            <div className="rounded-[var(--radius-card,1.25rem)] border border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]/80 shadow-[var(--elev-1)] px-4 pt-3.5 pb-4 text-start">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] rtl:tracking-normal text-[rgb(var(--primary))]">
                  <FaCheckCircle aria-hidden="true" />
                  {t('hero.freelance_title')}
                </p>
                <span className="flex items-center gap-0.5" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <FaStar key={i} className="text-[rgb(var(--accent-vivid))] text-[11px]" />
                  ))}
                </span>
              </div>
              {/* divide-x is logical in Tailwind 4, so the rules sit
                  between the columns in Arabic too. */}
              <div className="grid grid-cols-3 divide-x divide-[rgb(var(--border-subtle))]">
                {[
                  { value: '5.0', label: t('hero.freelance_platforms') },
                  { value: FACTS.projects, plus: true, label: t('stats.projects') },
                  { value: FACTS.clients, plus: true, label: t('stats.clients') },
                ].map(({ value, plus, label }) => (
                  <div key={label} className="px-3 first:ps-0 last:pe-0">
                    <p className="w-fit font-display text-2xl font-bold leading-none text-[rgb(var(--foreground))]" dir="ltr">
                      {value}
                      {plus && <span className="text-[rgb(var(--accent-vivid))]">+</span>}
                    </p>
                    <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1.5 leading-snug">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ============ Freelance proof panel ============ */}
          <aside
            className="max-md:hidden lg:col-span-4 animate-fadeInUp"
            style={{ animationDelay: '0.2s' }}
            aria-label={t('hero.freelance_title')}>
            <div className="relative glass-card rounded-2xl border border-[rgb(var(--border))] p-6 sm:p-7 text-start overflow-hidden">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[rgb(var(--primary))] mb-4 flex items-center gap-2">
                <FaCheckCircle />
                {t('hero.freelance_title')}
              </p>

              {/* Stars + the claim the testimonials section backs up */}
              <div className="flex items-center gap-1.5 mb-2" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <FaStar key={i} className="text-[rgb(var(--accent))] text-lg" />
                ))}
                <span className="font-display font-bold text-[rgb(var(--foreground))] text-lg ms-2" dir="ltr">
                  5.0
                </span>
              </div>
              <p className="font-semibold text-[rgb(var(--foreground))] mb-1">
                {t('hero.freelance_rating')}
              </p>
              <p className="text-sm text-[rgb(var(--muted-foreground))] mb-5">
                {t('hero.freelance_platforms')}
              </p>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[rgb(var(--muted))]/30 border border-[rgb(var(--border))]/60 p-3">
                  <p className="font-display text-2xl font-bold text-[rgb(var(--foreground))]" dir="ltr">
                    {FACTS.projects}<span className="text-[rgb(var(--accent-vivid))]">+</span>
                  </p>
                  <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">{t('stats.projects')}</p>
                </div>
                <div className="rounded-xl bg-[rgb(var(--muted))]/30 border border-[rgb(var(--border))]/60 p-3">
                  <p className="font-display text-2xl font-bold text-[rgb(var(--foreground))]" dir="ltr">
                    {FACTS.clients}<span className="text-[rgb(var(--accent-vivid))]">+</span>
                  </p>
                  <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">{t('stats.clients')}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#projects"
        className="max-md:hidden relative z-10 mx-auto mb-6 flex flex-col items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-2 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors animate-fadeInUp"
        style={{ animationDelay: '0.5s' }}
        aria-label={t('hero.scroll')}>
        <span className="text-[11px] tracking-[0.3em] uppercase">{t('hero.scroll')}</span>
        <FaArrowDown className="text-xs animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
