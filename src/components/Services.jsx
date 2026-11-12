"use client";
import { m } from "framer-motion";
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { revealDelay } from '../lib/motion';
import { useMemo } from "react";
import {
  FaLaptopCode,
  FaServer,
  FaGlobe,
  FaShieldAlt,
  FaWrench,
} from "react-icons/fa";
import ProcessSteps from './ProcessSteps';
import { useTranslation } from 'react-i18next';
import { asArray } from '../lib/as-array';

const Services = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const services = useMemo(() => {
    const list = asArray(t('services.list', { returnObjects: true }));
    const config = [
      { icon: <FaLaptopCode /> },
      { icon: <FaServer /> },
      { icon: <FaGlobe /> },
      { icon: <FaShieldAlt /> },
      // The takeover service has its own landing page selling it properly.
      { icon: <FaWrench />, href: '/rescue' },
    ];

    return list.map((item, index) => ({
      ...item,
      ...config[index]
    }));
  }, [t]);

  return (
    <section id="services" className="py-20 max-md:pt-0 max-md:pb-14 relative text-start">
      <div className="container mx-auto px-6 max-sm:px-5 relative z-10">
        {/* First viewport of /services: animated by CSS from the first paint,
            and moved rather than faded, so the heading never waits for
            JavaScript (see Reveal). Only rendered on /services, where this
            is the page heading. */}
        <SectionHeading
          as="h1"
          rise
          className="max-w-6xl mx-auto"
          eyebrow={t('mPages.eyebrow.services')}
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        {/* A plain card grid: equal-height cards, nothing that pretends to be
            clickable unless it is. Five services fill two rows on large
            screens, the rescue card (the one with a page of its own) taking
            the wider slot at the end. */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-md:gap-3 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Reveal
              as="li"
              y={20}
              delay={revealDelay(index)}
              key={service.title}
              className={`m-card glass-card rounded-2xl border border-[rgb(var(--border))]/60 p-6 flex flex-col h-full text-start transition-colors hover:border-[rgb(var(--primary))]/40 ${
                service.href ? 'md:col-span-2 lg:col-span-2' : ''
              }`}>
              <div className="flex items-center gap-4 mb-4 max-md:gap-3 max-md:mb-3">
                <span
                  aria-hidden="true"
                  className="inline-flex shrink-0 items-center justify-center w-12 h-12 max-md:w-11 max-md:h-11 max-md:text-lg rounded-xl bg-[rgb(var(--muted))]/50 border border-[rgb(var(--border))] text-[rgb(var(--primary))] text-xl">
                  {service.icon}
                </span>
                <h2 className="text-lg sm:text-xl font-bold leading-snug text-[rgb(var(--foreground))] max-md:font-display max-md:text-xl max-md:leading-[1.3] max-md:rtl:leading-[1.6]">
                  {service.title}
                </h2>
              </div>

              <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed mb-5 max-md:mb-4 max-md:text-[0.9375rem]">
                {service.desc}
              </p>

              <ul className={`grid gap-2 mt-auto ${service.href ? 'sm:grid-cols-2 sm:gap-x-6' : ''}`}>
                {service.features.map((feature, i) => (
                  <li key={i} className="text-sm text-[rgb(var(--foreground))] flex items-start gap-2">
                    <span aria-hidden="true" className="text-[rgb(var(--primary))] mt-0.5">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {service.href && (
                <a
                  href={`${isArabic ? '/ar' : ''}${service.href}`}
                  className="press inline-flex items-center gap-2 min-h-11 mt-4 self-start text-sm font-semibold text-[rgb(var(--primary))] hover:underline underline-offset-4 max-md:self-stretch max-md:justify-center max-md:min-h-12 max-md:rounded-[var(--radius-btn)] max-md:bg-[rgb(var(--accent))]/10 max-md:border max-md:border-[rgb(var(--accent))]/30 max-md:hover:no-underline">
                  {t('services.rescue_cta')}
                </a>
              )}
            </Reveal>
          ))}
        </ul>

        {/* How I work — six steps, one line each. #process keeps old links
            working. */}
        <div id="process" className="mt-20 max-md:mt-14 scroll-mt-24 max-w-6xl mx-auto">
          <SectionHeading
            eyebrow={t('mPages.eyebrow.process')}
            title={t('process.title')}
            subtitle={t('process.subtitle')}
          />
          <ProcessSteps />
        </div>

        {/* CTA Section */}
        <Reveal y={20} duration={0.5} delay={0.2}
          className="mt-16 max-md:mt-10 text-center max-w-6xl mx-auto">
          <p className="text-[rgb(var(--muted-foreground))] text-lg mb-6 max-md:mb-4">
            {t('services.ready')}
          </p>
          <m.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] text-[rgb(var(--accent-contrast))] px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all max-md:flex max-md:w-full max-md:items-center max-md:justify-center max-md:min-h-[52px] max-md:py-0 max-md:rounded-[var(--radius-btn)]">
            {t('services.get_in_touch')}
          </m.a>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
