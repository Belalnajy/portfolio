'use client';
import { useTranslation } from 'react-i18next';
import { FaLifeRing, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import ProcessSteps from './ProcessSteps';

/**
 * "How we start", on the home page: the first three steps of the delivery
 * process (the full six are on /services), and beside them a way in for the
 * visitor whose project already exists and is stuck: the /rescue page.
 */
const HowWeStart = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const home = isArabic ? '/ar' : '';
  const Arrow = isArabic ? FaArrowLeft : FaArrowRight;

  return (
    <section id="how-we-start" className="m-section relative text-start">
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow={t('mHome.eyebrow.process')}
          title={t('start.title')}
          subtitle={t('start.subtitle')}
        />

        <ProcessSteps count={3} className="grid grid-cols-1 md:grid-cols-3 gap-4" />
        <a
          href={`${home}/services#process`}
          className="inline-flex items-center gap-2 min-h-[44px] mt-3 max-md:mt-2 max-md:ms-14 text-sm font-semibold text-[rgb(var(--primary))] hover:underline underline-offset-4">
          {t('start.full_process')}
          <Arrow aria-hidden="true" className="text-xs" />
        </a>

        {/* The rescue teaser: a different starting point, so a card of its own. */}
        <Reveal y={20} delay={0.15}
          className="mt-8 max-md:mt-6 glass-card m-card max-md:border-[rgb(var(--primary))]/30! max-md:shadow-[var(--elev-2)]! rounded-2xl border border-[rgb(var(--primary))]/30 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 max-md:gap-4 md:gap-10">
          <div className="flex-1 min-w-0">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] max-md:tracking-[0.14em] text-[rgb(var(--primary))] mb-3">
              <FaLifeRing aria-hidden="true" />
              {t('rescue_page.badge')}
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug text-[rgb(var(--foreground))] mb-2 type-h3">
              {t('start.rescue_title')}
            </h3>
            <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed max-w-2xl type-small">
              {t('start.rescue_body')}
            </p>
          </div>
          <a
            href={`${home}/rescue`}
            className="press shrink-0 self-start md:self-auto max-md:self-stretch inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl max-md:rounded-[var(--radius-btn)] font-semibold border border-[rgb(var(--primary))]/40 text-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))]/10 transition-colors">
            {t('start.rescue_cta')}
            <Arrow aria-hidden="true" className="text-xs" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default HowWeStart;
