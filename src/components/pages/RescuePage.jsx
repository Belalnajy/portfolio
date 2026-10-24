'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaWrench,
  FaExclamationTriangle,
  FaWhatsapp,
  FaArrowRight,
  FaArrowLeft,
  FaBookOpen,
} from 'react-icons/fa';
import { REVEAL_VIEWPORT, revealDelay, REVEAL_DURATION } from '../../lib/motion';
import { useTranslation } from 'react-i18next';
import SiteShell from '../SiteShell';
import Contact from '../Contact';
import { whatsappUrl } from '../WhatsAppButton';

const asArray = (value) => (Array.isArray(value) ? value : []);

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
    <div className="container mx-auto px-6 max-w-4xl pt-36 pb-10 text-start">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16">
        <p className="inline-flex items-center gap-2 text-[rgb(var(--primary))] font-bold tracking-widest uppercase text-sm mb-5">
          <FaWrench />
          {t('rescue_page.badge')}
        </p>
        <h1 className="font-display text-display-lg font-bold text-[rgb(var(--foreground))] mb-5">
          {t('rescue_page.title')}
        </h1>
        <p className="text-lg text-[rgb(var(--foreground))]/90 leading-relaxed max-w-3xl mb-8">
          {t('rescue_page.subtitle')}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={whatsappUrl(t('rescue_page.whatsapp_message'))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-xl font-semibold bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] hover:from-[rgb(var(--accent-hover))] hover:to-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))] shadow-lg transition-all active:scale-[0.98]">
            <FaWhatsapp className="text-lg" />
            {t('rescue_page.cta_whatsapp')}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-xl font-semibold border border-[rgb(var(--border-control))] text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors">
            {t('rescue_page.cta_contact')}
          </a>
        </div>
      </motion.header>

      {/* Symptoms */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={REVEAL_VIEWPORT}
        transition={{ duration: REVEAL_DURATION }}
        className="glass-card rounded-2xl border border-[rgb(var(--border))]/60 p-6 sm:p-8 mb-14">
        <h2 className="flex items-center gap-3 font-display text-xl font-bold text-[rgb(var(--foreground))] mb-6">
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
      </motion.section>

      {/* Process */}
      <section className="mb-14">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[rgb(var(--foreground))] mb-8">
          {t('rescue_page.process_title')}
        </h2>
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL_VIEWPORT}
              transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
              className="flex items-start gap-5">
              <span
                className="font-display text-4xl sm:text-5xl font-bold text-outline leading-none select-none shrink-0"
                aria-hidden="true"
                dir="ltr">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[rgb(var(--foreground))] mb-2">
                  {step.title}
                </h3>
                <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Proof */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={REVEAL_VIEWPORT}
        transition={{ duration: REVEAL_DURATION }}
        className="glass-card rounded-2xl border border-[rgb(var(--primary))]/25 p-6 sm:p-8 mb-14">
        <h2 className="font-display text-xl font-bold text-[rgb(var(--primary))] mb-4">
          {t('rescue_page.proof_title')}
        </h2>
        <p className="text-[rgb(var(--foreground))] leading-relaxed mb-6">
          {t('rescue_page.proof_medicta')}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`${home}/case-study/medicta`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/30 hover:bg-[rgb(var(--primary))]/20 transition-colors">
            {t('rescue_page.proof_medicta_cta')}
            <Arrow className="text-xs" />
          </Link>
          <Link
            href={`${home}/blog/legacy-takeover-playbook`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border border-[rgb(var(--border-control))] text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors">
            <FaBookOpen className="text-xs" />
            {t('rescue_page.proof_article_cta')}
          </Link>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={REVEAL_VIEWPORT}
        transition={{ duration: REVEAL_DURATION }}
        className="text-center mb-4">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[rgb(var(--foreground))] mb-3">
          {t('rescue_page.cta_title')}
        </h2>
        <p className="text-[rgb(var(--muted-foreground))] leading-relaxed max-w-2xl mx-auto">
          {t('rescue_page.cta_body')}
        </p>
      </motion.section>
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
