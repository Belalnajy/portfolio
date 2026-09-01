'use client';
import { FaGithub, FaLinkedin, FaDownload, FaArrowDown, FaStar, FaCheckCircle } from 'react-icons/fa';
import MagneticButton from './MagneticButton';
import PlatformLinks from './PlatformLinks';
import { useTranslation } from 'react-i18next';

/**
 * Type-first hero with a freelance proof panel. The name is the artwork
 * (uppercase display type, so no descenders to clip); the panel answers the
 * first question a visitor from Khamsat/Mostaql asks — can I trust this
 * freelancer? Everything animates with CSS keyframes rather than framer
 * `initial` props so the server markup ships visible and the LCP (the
 * headline text) never waits for hydration.
 */
const Hero = ({ onDownloadCV }) => {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="min-h-[100svh] flex flex-col relative overflow-hidden bg-[rgb(var(--background))]">
      {/* Backdrop: quiet dot grid + two fixed copper glows. No canvas, no JS. */}
      <div className="absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" aria-hidden="true" />
      <div className="absolute -top-40 start-1/4 w-[36rem] h-[36rem] bg-[rgb(var(--accent))]/8 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 end-0 w-[28rem] h-[28rem] bg-[rgb(var(--accent))]/6 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center pt-28 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* ============ Type column ============ */}
          <div className="lg:col-span-8 text-start">
            {/* Status row */}
            <div className="animate-fadeInUp flex flex-wrap items-center gap-3 mb-8" style={{ animationDelay: '0.05s' }}>
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[rgb(var(--success))]/10 border border-[rgb(var(--success))]/30 text-[rgb(var(--foreground))] text-sm font-medium">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--success))] opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[rgb(var(--success))]" />
                </span>
                {t('hero.available')}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--muted))]/40 border border-[rgb(var(--border))] text-sm text-[rgb(var(--muted-foreground))]">
                <span className="font-semibold text-[rgb(var(--primary))]">{t('hero.now_label')}</span>
                {t('hero.now_value')}
              </span>
            </div>

            {/* The wordmark. Uppercase Latin display type carries no
                descenders, so nothing can clip; Arabic keeps its case and
                gets its own scale/leading from the CSS. */}
            <h1 className="font-display text-display-xl font-bold uppercase mb-8">
              <span className="block text-[rgb(var(--foreground))]">{t('hero.greeting_start')}</span>
              <span className="block text-gradient-copper">{t('hero.name')}</span>
            </h1>

            {/* Role line */}
            <p
              className="animate-fadeInUp text-sm sm:text-base font-semibold tracking-[0.25em] uppercase text-[rgb(var(--primary))] mb-6"
              style={{ animationDelay: '0.18s' }}>
              {t('hero.role_line')}
            </p>

            {/* Value proposition */}
            <p
              className="animate-fadeInUp text-lg sm:text-xl text-[rgb(var(--foreground))] leading-relaxed max-w-2xl mb-10"
              style={{ animationDelay: '0.24s' }}>
              {t('hero.description_1')}
              <span className="text-[rgb(var(--primary))] font-semibold">{t('hero.description_2')}</span>
              {t('hero.description_3')}
              <span className="text-[rgb(var(--primary))] font-semibold">{t('hero.description_4')}</span>
              {t('hero.description_5')}
            </p>

            {/* CTAs + socials */}
            <div
              className="animate-fadeInUp flex flex-wrap items-center gap-4"
              style={{ animationDelay: '0.3s' }}>
              <MagneticButton
                href="#projects"
                className="bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))] px-8 py-3.5 rounded-xl font-semibold hover:bg-[rgb(var(--primary))]/90 transition-all inline-flex items-center">
                {t('hero.view_projects')}
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="border border-[rgb(var(--border-control))] text-[rgb(var(--foreground))] px-8 py-3.5 rounded-xl font-semibold hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-all inline-flex items-center">
                {t('hero.contact_me')}
              </MagneticButton>
              <MagneticButton
                onClick={onDownloadCV}
                className="text-[rgb(var(--muted-foreground))] px-4 py-3.5 rounded-xl font-semibold hover:text-[rgb(var(--foreground))] transition-all inline-flex items-center gap-2">
                <FaDownload className="text-sm" />
                {t('hero.download_cv')}
              </MagneticButton>

              <span className="hidden sm:block w-px h-8 bg-[rgb(var(--border))]" aria-hidden="true" />

              <a
                href="https://github.com/Belalnajy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-xl border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))] transition-all">
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/belalnajy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-xl border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))] hover:text-[#0A66C2] hover:border-[rgb(var(--primary))] transition-all">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* ============ Freelance proof panel ============ */}
          <aside
            className="lg:col-span-4 animate-fadeInUp"
            style={{ animationDelay: '0.2s' }}
            aria-label={t('hero.freelance_title')}>
            <div className="relative glass-card rounded-2xl border border-[rgb(var(--primary))]/25 p-6 sm:p-7 text-start overflow-hidden">
              {/* Copper wash in the corner */}
              <div className="absolute -top-16 -end-16 w-48 h-48 bg-[rgb(var(--accent))]/12 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

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
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-xl bg-[rgb(var(--muted))]/30 border border-[rgb(var(--border))]/60 p-3">
                  <p className="font-display text-2xl font-bold text-[rgb(var(--foreground))]" dir="ltr">
                    31<span className="text-[rgb(var(--primary))]">+</span>
                  </p>
                  <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">{t('stats.projects')}</p>
                </div>
                <div className="rounded-xl bg-[rgb(var(--muted))]/30 border border-[rgb(var(--border))]/60 p-3">
                  <p className="font-display text-2xl font-bold text-[rgb(var(--foreground))]" dir="ltr">
                    27<span className="text-[rgb(var(--primary))]">+</span>
                  </p>
                  <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">{t('stats.clients')}</p>
                </div>
              </div>

              <a
                href="#contact"
                className="flex items-center justify-center w-full min-h-[48px] px-5 rounded-xl font-semibold bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] hover:from-[rgb(var(--accent-hover))] hover:to-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))] shadow-lg transition-all active:scale-[0.98] mb-5">
                {t('hero.hire_me')}
              </a>

              {/* The platforms themselves, tappable */}
              <p className="text-[rgb(var(--muted-foreground))] text-xs mb-2">{t('hero.follow_me')}</p>
              <PlatformLinks variant="compact" />
            </div>
          </aside>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="relative z-10 mx-auto mb-6 flex flex-col items-center gap-2 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors animate-fadeInUp"
        style={{ animationDelay: '0.5s' }}
        aria-label={t('hero.scroll')}>
        <span className="text-[11px] tracking-[0.3em] uppercase">{t('hero.scroll')}</span>
        <FaArrowDown className="text-xs animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
