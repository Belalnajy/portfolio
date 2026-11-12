"use client";
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { revealDelay } from '../lib/motion';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaClock, FaStar, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

/**
 * Deliverables and timelines are concrete; the price is intentionally quoted per
 * project. Fill `packages.tiers.<key>.price` in the translations to show a
 * figure instead of the "request a quote" label.
 */
const TIERS = [
  { key: 'landing', featured: false },
  { key: 'platform', featured: true },
  { key: 'retainer', featured: false },
];

const Packages = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const Arrow = isArabic ? FaArrowLeft : FaArrowRight;

  return (
    <section id="packages" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[rgb(var(--primary))]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          className="max-w-6xl mx-auto"
          title={t('packages.title')}
          subtitle={t('packages.subtitle')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
          {TIERS.map((tier, index) => {
            const features = t(`packages.tiers.${tier.key}.features`, {
              returnObjects: true,
            });
            const price = t(`packages.tiers.${tier.key}.price`);
            // An empty string in the translations means "quote on request".
            const hasPrice = Boolean(price && price.trim());

            return (
              <Reveal y={26} delay={revealDelay(index)}
                key={tier.key}
                className={`relative glass-card rounded-2xl p-6 sm:p-8 flex flex-col h-full text-start transition-colors ${
                  tier.featured
                    ? 'border-2 border-[rgb(var(--primary))] shadow-2xl lg:-translate-y-3'
                    : 'border border-[rgb(var(--border))]/50 hover:border-[rgb(var(--primary))]/40'
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 start-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))] shadow-lg">
                    <FaStar className="text-[10px]" />
                    {t('packages.most_popular')}
                  </span>
                )}

                <h3 className="text-xl sm:text-2xl font-bold text-[rgb(var(--foreground))] mb-2">
                  {t(`packages.tiers.${tier.key}.name`)}
                </h3>
                <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed mb-5">
                  {t(`packages.tiers.${tier.key}.tagline`)}
                </p>

                {/* Price and timeline as one quiet line: the price is quoted
                    per project, so it should not shout like a number would. */}
                <div className="mb-5 pb-5 border-b border-[rgb(var(--border))]/50 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                  <span className="font-semibold text-[rgb(var(--foreground))]">
                    {hasPrice ? price : t('packages.on_request')}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs text-[rgb(var(--muted-foreground))]">
                    <FaClock aria-hidden="true" className="text-[rgb(var(--primary))]" />
                    {t(`packages.tiers.${tier.key}.timeline`)}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {(Array.isArray(features) ? features : []).map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-[rgb(var(--muted-foreground))]"
                    >
                      <FaCheck className="mt-1 text-[rgb(var(--muted-foreground))] shrink-0 text-xs" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a href="#contact" className="block">
                  <span
                    className={`w-full min-h-[48px] rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                      tier.featured
                        ? 'bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] hover:from-[rgb(var(--accent-hover))] hover:to-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))] shadow-lg'
                        : 'glass-card border border-[rgb(var(--border))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]/40'
                    }`}
                  >
                    {t('packages.cta')}
                    <Arrow className="text-xs" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal as="p" duration={0.5} delay={0.3}
          className="text-center text-sm text-[rgb(var(--muted-foreground))] mt-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t('packages.footnote')}
        </Reveal>
      </div>
    </section>
  );
};

export default Packages;
