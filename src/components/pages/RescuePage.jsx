'use client';
import Link from 'next/link';
import Reveal from '../Reveal';
import {
  FaWrench,
  FaExclamationTriangle,
  FaWhatsapp,
  FaArrowRight,
  FaArrowLeft,
  FaBookOpen,
} from 'react-icons/fa';
import { revealDelay } from '../../lib/motion';
import { useTranslation } from 'react-i18next';
import SiteShell from '../SiteShell';
import Contact from '../Contact';
import { whatsappUrl } from '../WhatsAppButton';
import { asArray } from '../../lib/as-array';


/**
 * Dedicated landing page for the service with the most urgent buyers:
 * taking over stuck, inherited or abandoned codebases. Everything a panicked
 * owner needs on one page — the symptoms, the audit-first process, shipped
 * proof, and the two fastest ways to start talking.
 */
const RescueContent = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const home = isArabic ? '/ar' : '';
  const Arrow = isArabic ? FaArrowLeft : FaArrowRight;

  const signs = asArray(t('rescue_page.signs', { returnObjects: true }));
  const steps = asArray(t('rescue_page.steps', { returnObjects: true }));

  return (
    <div className="container mx-auto px-6 max-sm:px-5 max-w-4xl pt-36 m-page-top pb-10 max-md:pb-4 text-start">
      {/* Header */}
      {/* First viewport: a CSS animation that runs from the first paint and
          moves without fading, so the page's largest text is on screen before
          any JavaScript has loaded (see Reveal). */}
      <Reveal as="header" rise y={16} duration={0.5}
        className="mb-16 max-md:mb-10">
        <p className="inline-flex items-center gap-2 text-[rgb(var(--primary))] font-bold tracking-widest uppercase text-sm mb-5 max-md:text-xs max-md:font-semibold max-md:tracking-[0.14em] max-md:mb-3">
          <FaWrench />
          {t('rescue_page.badge')}
        </p>
        <h1 className="font-display text-display-lg type-h1 font-bold text-[rgb(var(--foreground))] mb-5 max-md:mb-4">
          {t('rescue_page.title')}
        </h1>
        <p className="text-lg text-[rgb(var(--foreground))]/90 leading-relaxed max-w-3xl mb-8 type-body max-md:mb-6">
          {t('rescue_page.subtitle')}
        </p>
        {/* On a phone both are full width, in the thumb zone. */}
        <div className="flex flex-wrap gap-3 max-md:flex-col">
          <a
            href={whatsappUrl(t('rescue_page.whatsapp_message'))}
            target="_blank"
            rel="noopener noreferrer"
            className="press max-md:justify-center max-md:min-h-[52px] max-md:rounded-[var(--radius-btn)] inline-flex items-center gap-2 min-h-[48px] px-7 rounded-xl font-semibold bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] hover:from-[rgb(var(--accent-hover))] hover:to-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))] shadow-lg transition-all active:scale-[0.98]">
            <FaWhatsapp className="text-lg" />
            {t('rescue_page.cta_whatsapp')}
          </a>
          <a
            href="#contact"
            className="press max-md:justify-center max-md:min-h-[52px] max-md:rounded-[var(--radius-btn)] inline-flex items-center gap-2 min-h-[48px] px-7 rounded-xl font-semibold border border-[rgb(var(--border-control))] text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors">
            {t('rescue_page.cta_contact')}
          </a>
        </div>
      </Reveal>

      {/* Symptoms */}
      <Reveal as="section" y={24}
        className="m-card glass-card rounded-2xl border border-[rgb(var(--border))]/60 p-6 sm:p-8 mb-14 max-md:mb-12">
        <h2 className="flex items-center gap-3 font-display text-xl font-bold text-[rgb(var(--foreground))] mb-6 max-md:mb-4">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[rgb(var(--accent))]/10 border border-[rgb(var(--accent))]/25 text-[rgb(var(--accent))]">
            <FaExclamationTriangle />
          </span>
          {t('rescue_page.signs_title')}
        </h2>
        <ul className="space-y-3.5">
          {signs.map((sign, i) => (
            <li key={i} className="flex items-start gap-3 text-[rgb(var(--foreground))] leading-relaxed">
              <span className="text-[rgb(var(--primary))] mt-1 shrink-0">✓</span>
              <span>{sign}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Process. On a phone a timeline: numbered stops on a rail at the
          start side, each step a card beside it. */}
      <section className="mb-14 max-md:mb-12">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[rgb(var(--foreground))] mb-8 type-h2 max-md:mb-6">
          {t('rescue_page.process_title')}
        </h2>
        <div className="space-y-8 relative max-md:space-y-3">
          <span aria-hidden="true" className="md:hidden absolute start-[19px] top-6 bottom-6 w-px bg-gradient-to-b from-[rgb(var(--accent))]/50 via-[rgb(var(--accent))]/25 to-transparent" />
          {steps.map((step, index) => (
            <Reveal y={24} delay={revealDelay(index)}
              key={index}
              className="flex items-start gap-5 max-md:gap-3">
              <span
                className="max-md:hidden font-display text-4xl sm:text-5xl font-bold text-outline leading-none select-none shrink-0"
                aria-hidden="true"
                dir="ltr">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className="md:hidden relative mt-4 inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full text-sm font-bold tabular-nums bg-[rgb(var(--surface))] border border-[rgb(var(--accent))]/35 text-[rgb(var(--accent))] ring-4 ring-[rgb(var(--background))]"
                aria-hidden="true"
                dir="ltr">
                {index + 1}
              </span>
              <div className="m-card max-md:flex-1 max-md:min-w-0">
                <h3 className="font-display text-lg sm:text-xl font-bold text-[rgb(var(--foreground))] mb-2 type-h3">
                  {step.title}
                </h3>
                <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Proof */}
      <Reveal as="section" y={24}
        className="m-card glass-card rounded-2xl border border-[rgb(var(--primary))]/25 p-6 sm:p-8 mb-14 max-md:mb-12 max-md:border-[rgb(var(--accent))]/30!">
        <h2 className="font-display text-xl font-bold text-[rgb(var(--primary))] mb-4">
          {t('rescue_page.proof_title')}
        </h2>
        <p className="text-[rgb(var(--foreground))] leading-relaxed mb-6">
          {t('rescue_page.proof_medicta')}
        </p>
        <div className="flex flex-wrap gap-3 max-md:flex-col">
          <Link
            href={`${home}/case-study/medicta`}
            className="press max-md:justify-center max-md:min-h-12 max-md:rounded-[var(--radius-btn)] inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-xl font-semibold text-sm bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/30 hover:bg-[rgb(var(--primary))]/20 transition-colors">
            {t('rescue_page.proof_medicta_cta')}
            <Arrow className="text-xs" />
          </Link>
          <Link
            href={`${home}/blog/legacy-takeover-playbook`}
            className="press max-md:justify-center max-md:min-h-12 max-md:rounded-[var(--radius-btn)] inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-xl font-semibold text-sm border border-[rgb(var(--border-control))] text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors">
            <FaBookOpen className="text-xs" />
            {t('rescue_page.proof_article_cta')}
          </Link>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" y={24}
        className="text-center mb-4">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[rgb(var(--foreground))] mb-3 type-h2">
          {t('rescue_page.cta_title')}
        </h2>
        <p className="text-[rgb(var(--muted-foreground))] leading-relaxed max-w-2xl mx-auto">
          {t('rescue_page.cta_body')}
        </p>
      </Reveal>
    </div>
  );
};

const RescuePage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    <RescueContent />
    {/* The form right on the page: a panicked owner should not need another click. */}
    <Contact />
  </SiteShell>
);

export default RescuePage;
