"use client";
import { motion } from "framer-motion";
import { REVEAL_VIEWPORT, revealDelay, REVEAL_DURATION } from '../lib/motion';
import { useMemo } from "react";
import {
  FaLaptopCode,
  FaServer,
  FaGlobe,
  FaShieldAlt,
  FaWrench,
  FaComments,
  FaDraftingCompass,
  FaCode,
  FaVial,
  FaRocket,
  FaLifeRing,
} from "react-icons/fa";
import { useTranslation } from 'react-i18next';

// "How I work" lives inside Services as a compact strip rather than a
// section of its own; #process keeps old links working.
const PROCESS_STEPS = [
  { key: 'discovery', icon: <FaComments /> },
  { key: 'blueprint', icon: <FaDraftingCompass /> },
  { key: 'build', icon: <FaCode /> },
  { key: 'review', icon: <FaVial /> },
  { key: 'launch', icon: <FaRocket /> },
  { key: 'support', icon: <FaLifeRing /> },
];

const Services = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const services = useMemo(() => {
    const list = t('services.list', { returnObjects: true });
    const config = [
      { icon: <FaLaptopCode />, color: "from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))]" },
      { icon: <FaServer />, color: "from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))]" },
      { icon: <FaGlobe />, color: "from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))]" },
      { icon: <FaShieldAlt />, color: "from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))]" },
      { icon: <FaWrench />, color: "from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))]" },
    ];

    return list.map((item, index) => ({
      ...item,
      ...config[index]
    }));
  }, [t]);

  return (
    <section id="services" className="py-20 relative text-start">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            {t('services.title')}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg leading-relaxed">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL_VIEWPORT}
              transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card glass-hover p-6 rounded-xl cursor-pointer group">
              {/* Icon */}
              <div className="mb-6 flex justify-start">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} text-[rgb(var(--on-scrim))] text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))] transition-colors text-start">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[rgb(var(--muted-foreground))] mb-4 leading-relaxed text-start">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="text-sm text-[rgb(var(--foreground))] flex items-start text-start">
                    <span className={`text-[rgb(var(--primary))] ${isArabic ? 'ml-2' : 'mr-2'} mt-1`}>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover Effect Line */}
              <div
                className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${service.color} rounded-full transition-all duration-500`}
              />
            </motion.div>
          ))}
        </div>

        {/* How I work — six steps, one line each */}
        <motion.div
          id="process"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5 }}
          className="mt-20 scroll-mt-24">
          <div className="text-center mb-10">
            <span className="text-[rgb(var(--primary))] font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 block">
              {t('process.label')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--foreground))] tracking-tight mb-3">
              {t('process.title')}
            </h3>
            <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-base leading-relaxed">
              {t('process.subtitle')}
            </p>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROCESS_STEPS.map((step, index) => (
              <motion.li
                key={step.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
                className="relative flex gap-4 p-5 rounded-xl bg-[rgb(var(--muted))]/10 border border-[rgb(var(--border))]/50 hover:border-[rgb(var(--primary))]/40 transition-colors">
                <span className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/20 text-lg">
                  {step.icon}
                </span>
                <div className="min-w-0">
                  <h4 className="font-bold text-[rgb(var(--foreground))] leading-snug mb-1">
                    {t(`process.steps.${step.key}.title`)}
                  </h4>
                  <p className="text-xs text-[rgb(var(--muted-foreground))] leading-relaxed mb-2">
                    {t(`process.steps.${step.key}.desc`)}
                  </p>
                  <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
                    {t(`process.steps.${step.key}.deliverable`)}
                  </span>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center">
          <p className="text-[rgb(var(--muted-foreground))] text-lg mb-6">
            {t('services.ready')}
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] text-[rgb(var(--accent-contrast))] px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
            {t('services.get_in_touch')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
