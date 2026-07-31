"use client";
import { motion } from 'framer-motion';
import { REVEAL_VIEWPORT, revealDelay, REVEAL_DURATION } from '../lib/motion';
import { Link } from 'react-scroll';
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

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[rgb(var(--primary))] font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 block">
            {t('packages.label')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[rgb(var(--foreground))] tracking-tight">
            {t('packages.title')}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {t('packages.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
          {TIERS.map((tier, index) => {
            const features = t(`packages.tiers.${tier.key}.features`, {
              returnObjects: true,
            });
            const price = t(`packages.tiers.${tier.key}.price`);
            // An empty string in the translations means "quote on request".
            const hasPrice = Boolean(price && price.trim());

            return (
              <motion.div
                key={tier.key}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
                className={`relative glass-card rounded-2xl p-6 sm:p-8 flex flex-col h-full text-start transition-colors ${
                  tier.featured
                    ? 'border-2 border-[rgb(var(--primary))] shadow-2xl shadow-[rgb(var(--primary))]/10 lg:-translate-y-3'
                    : 'border border-[rgb(var(--border))]/50 hover:border-[rgb(var(--primary))]/40'
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 start-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[rgb(var(--primary))] text-white shadow-lg">
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

                <div className="mb-5 pb-5 border-b border-[rgb(var(--border))]/50">
                  <div className="text-2xl sm:text-3xl font-bold text-[rgb(var(--foreground))]">
                    {hasPrice ? price : t('packages.on_request')}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-[rgb(var(--muted-foreground))]">
                    <FaClock className="text-[rgb(var(--primary))]" />
                    {t(`packages.tiers.${tier.key}.timeline`)}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {(Array.isArray(features) ? features : []).map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-[rgb(var(--muted-foreground))]"
                    >
                      <FaCheck className="mt-1 text-[rgb(var(--primary))] shrink-0 text-xs" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="contact" smooth={true} duration={500} offset={-80}>
                  <button
                    className={`w-full min-h-[48px] rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                      tier.featured
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg'
                        : 'glass-card border border-[rgb(var(--border))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]/40'
                    }`}
                  >
                    {t('packages.cta')}
                    <Arrow className="text-xs" />
                  </button>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-[rgb(var(--muted-foreground))] mt-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t('packages.footnote')}
        </motion.p>
      </div>
    </section>
  );
};

export default Packages;
