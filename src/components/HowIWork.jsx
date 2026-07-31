"use client";
import { motion } from 'framer-motion';
import { REVEAL_VIEWPORT, revealDelay, REVEAL_DURATION } from '../lib/motion';
import { useTranslation } from 'react-i18next';
import {
  FaComments,
  FaDraftingCompass,
  FaCode,
  FaVial,
  FaRocket,
  FaLifeRing,
} from 'react-icons/fa';

const STEPS = [
  { key: 'discovery', icon: <FaComments /> },
  { key: 'blueprint', icon: <FaDraftingCompass /> },
  { key: 'build', icon: <FaCode /> },
  { key: 'review', icon: <FaVial /> },
  { key: 'launch', icon: <FaRocket /> },
  { key: 'support', icon: <FaLifeRing /> },
];

const HowIWork = () => {
  const { t } = useTranslation();

  return (
    <section id="process" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-80 bg-[rgb(var(--primary))]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[rgb(var(--primary))] font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 block">
            {t('process.label')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[rgb(var(--foreground))] tracking-tight">
            {t('process.title')}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {t('process.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL_VIEWPORT}
              transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
              className="group relative glass-card rounded-2xl border border-[rgb(var(--border))]/50 p-6 hover:border-[rgb(var(--primary))]/40 transition-colors text-start overflow-hidden"
            >
              {/* Step number watermark */}
              <span className="absolute top-3 end-4 text-5xl font-black text-[rgb(var(--foreground))]/[0.04] leading-none select-none">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="relative z-10">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/20 text-xl mb-4 group-hover:scale-105 transition-transform">
                  {step.icon}
                </span>
                <h3 className="text-lg font-bold text-[rgb(var(--foreground))] mb-2">
                  {t(`process.steps.${step.key}.title`)}
                </h3>
                <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed mb-4">
                  {t(`process.steps.${step.key}.desc`)}
                </p>
                <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-[rgb(var(--muted))]/25 text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))]/50">
                  {t(`process.steps.${step.key}.deliverable`)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
