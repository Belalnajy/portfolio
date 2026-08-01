"use client";
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { REVEAL_VIEWPORT, revealDelay, REVEAL_DURATION } from '../lib/motion';
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
} from 'react-icons/fa';
import { getTechIcon } from './Projects';
import { resolvePreferredLanguage } from '../i18n';

/**
 * Long-form write-up for a single project. `slug` selects the
 * `case_studies.<slug>` translation block, so further case studies only need
 * translations plus an entry in the route.
 */
const CaseStudy = ({ slug, image, liveUrl, stack }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const Back = isArabic ? FaArrowRight : FaArrowLeft;
  const base = `case_studies.${slug}`;

  // This page renders outside <App/>, which is what normally applies the
  // language and direction, so do it here too.
  useEffect(() => {
    const preferred = resolvePreferredLanguage();
    if (preferred !== i18n.language) i18n.changeLanguage(preferred);
  }, [i18n]);

  useEffect(() => {
    document.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language, i18n]);

  const asArray = (key) => {
    const value = t(`${base}.${key}`, { returnObjects: true });
    return Array.isArray(value) ? value : [];
  };

  const blocks = [
    { key: 'challenge', icon: <FaExclamationTriangle />, accent: 'text-[rgb(var(--accent))]' },
    { key: 'approach', icon: <FaLightbulb />, accent: 'text-[rgb(var(--accent))]' },
    { key: 'delivered', icon: <FaCubes />, accent: 'text-[rgb(var(--accent-hover))]' },
    { key: 'outcome', icon: <FaCheckCircle />, accent: 'text-[rgb(var(--success))]' },
  ];

  return (
    <main className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] overflow-x-clip">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[rgb(var(--background))]/90 backdrop-blur-xl border-b border-[rgb(var(--border))]/50">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <a
            href="/#projects"
            className="inline-flex items-center gap-2 min-h-[44px] px-3 -mx-3 rounded-lg text-sm font-medium text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
          >
            <Back className="text-xs" />
            {t('case_studies.back')}
          </a>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl text-sm font-semibold bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/25 hover:bg-[rgb(var(--primary))]/20 transition-colors"
            >
              <FaExternalLinkAlt className="text-xs" />
              <span className="hidden sm:inline">{t('case_studies.visit')}</span>
            </a>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-12 pb-10 md:pt-20 md:pb-14 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-72 bg-[rgb(var(--primary))]/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/25 mb-5"
          >
            <FaLayerGroup className="text-[10px]" />
            {t('case_studies.label')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4"
          >
            {t(`${base}.title`)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-[rgb(var(--muted-foreground))] leading-relaxed"
          >
            {t(`${base}.summary`)}
          </motion.p>

          {/* Fact strip */}
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-9 text-start"
          >
            {['role', 'scope', 'audience'].map((fact) => (
              <div
                key={fact}
                className="glass-card rounded-xl border border-[rgb(var(--border))]/50 p-4"
              >
                <dt className="text-[11px] font-bold uppercase tracking-wider text-[rgb(var(--muted-foreground))] mb-1">
                  {t(`case_studies.facts.${fact}`)}
                </dt>
                <dd className="text-sm font-semibold text-[rgb(var(--foreground))]">
                  {t(`${base}.facts.${fact}`)}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* Cover */}
      <section className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl overflow-hidden border border-[rgb(var(--border))]/50 bg-[rgb(var(--scrim))] p-3 sm:p-5"
        >
          <img
            src={image}
            alt={t(`${base}.title`)}
            className="w-full h-auto rounded-lg"
          />
        </motion.div>
      </section>

      {/* Narrative blocks */}
      <section className="container mx-auto px-4 sm:px-6 max-w-4xl py-14 md:py-20 space-y-10 md:space-y-14">
        {blocks.map((block, index) => {
          const points = asArray(`${block.key}.points`);
          return (
            <motion.article
              key={block.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL_VIEWPORT}
              transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
              className="text-start"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[rgb(var(--muted))]/20 border border-[rgb(var(--border))]/50 ${block.accent}`}
                >
                  {block.icon}
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                  {t(`case_studies.sections.${block.key}`)}
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[rgb(var(--muted-foreground))] leading-relaxed">
                {t(`${base}.${block.key}.body`)}
              </p>

              {points.length > 0 && (
                <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 glass-card rounded-xl border border-[rgb(var(--border))]/50 p-4 text-sm text-[rgb(var(--muted-foreground))]"
                    >
                      <FaCheckCircle className="mt-0.5 text-[rgb(var(--primary))] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          );
        })}

        {/* Stack */}
        {stack?.length > 0 && (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.5 }}
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
          </motion.article>
        )}
      </section>

      {/* Closing CTA */}
      <section className="container mx-auto px-4 sm:px-6 max-w-4xl pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5 }}
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
              href="/#contact"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl font-semibold bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] hover:from-[rgb(var(--accent-hover))] hover:to-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))] shadow-lg transition-all active:scale-[0.98]"
            >
              {t('case_studies.cta_button')}
            </a>
            <a
              href="/#projects"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl font-semibold glass-card border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))]/40 transition-colors"
            >
              <Back className="text-xs" />
              {t('case_studies.back')}
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default CaseStudy;
