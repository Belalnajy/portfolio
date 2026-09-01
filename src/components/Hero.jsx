'use client';
import { FaGithub, FaLinkedin, FaDownload, FaArrowDown } from 'react-icons/fa';
import { brandColor } from '../lib/brand-colors';
import MagneticButton from './MagneticButton';
import PlatformLinks from './PlatformLinks';
import { useTranslation } from 'react-i18next';

/**
 * Type-first hero: the name is the artwork. Everything animates with CSS
 * keyframes rather than framer `initial` props so the server markup ships
 * visible and the LCP (the headline text) never waits for hydration.
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

      <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center pt-28 pb-16">
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
            <span className="hidden sm:inline text-[rgb(var(--muted-foreground))]/70">· {t('hero.now_meta')}</span>
          </span>
        </div>

        {/* The wordmark */}
        <h1 className="font-display text-display-xl font-bold text-start mb-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <span className="block text-[rgb(var(--foreground))]">{t('hero.greeting_start')}</span>
          <span className="block text-gradient-copper">{t('hero.name')}</span>
        </h1>

        {/* Role line */}
        <p
          className="animate-fadeInUp text-sm sm:text-base font-semibold tracking-[0.3em] uppercase text-[rgb(var(--primary))] mb-8 text-start"
          style={{ animationDelay: '0.18s' }}>
          {t('hero.role_line')}
        </p>

        {/* Value proposition */}
        <p
          className="animate-fadeInUp text-lg sm:text-xl text-[rgb(var(--foreground))] leading-relaxed max-w-2xl text-start mb-10"
          style={{ animationDelay: '0.24s' }}>
          {t('hero.description_1')}
          <span className="text-[rgb(var(--primary))] font-semibold">{t('hero.description_2')}</span>
          {t('hero.description_3')}
          <span className="text-[rgb(var(--primary))] font-semibold">{t('hero.description_4')}</span>
          {t('hero.description_5')}
        </p>

        {/* CTAs + socials on one line */}
        <div
          className="animate-fadeInUp flex flex-wrap items-center gap-4 mb-10"
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
            className="p-3 rounded-xl border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))] hover:border-[rgb(var(--primary))] transition-all"
            style={{ '--tw-text-opacity': 1 }}
            onMouseOver={(e) => (e.currentTarget.style.color = brandColor('LinkedIn'))}
            onMouseOut={(e) => (e.currentTarget.style.color = '')}>
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>

        {/* Freelance platforms */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.36s' }}>
          <p className="text-[rgb(var(--muted-foreground))] text-sm mb-3 text-start">
            {t('hero.follow_me')}
          </p>
          <div className="flex justify-start">
            <PlatformLinks variant="compact" />
          </div>
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
