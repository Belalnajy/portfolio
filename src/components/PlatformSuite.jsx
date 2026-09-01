"use client";
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { REVEAL_VIEWPORT, revealDelay, REVEAL_DURATION } from '../lib/motion';
import { useTranslation } from 'react-i18next';
import {
  FaLayerGroup,
  FaPalette,
  FaExternalLinkAlt,
  FaServer,
  FaCertificate,
  FaCreditCard,
  FaLanguage,
  FaShieldAlt,
} from 'react-icons/fa';
import { LMS_SUITE } from './Projects';
import { coverMeta } from '../lib/cover-meta';

const SHARED_CAPABILITIES = [
  { key: 'engine', icon: <FaServer /> },
  { key: 'accreditation', icon: <FaCertificate /> },
  { key: 'payments', icon: <FaCreditCard /> },
  { key: 'rtl', icon: <FaLanguage /> },
  { key: 'roles', icon: <FaShieldAlt /> },
  { key: 'branding', icon: <FaPalette /> },
];

/**
 * Scroll-driven diagram of the suite's whole story: one hardened core, three
 * connector lines drawing themselves as the section scrolls in, three brands
 * lighting up in turn. Falls back to a fully-drawn static diagram for
 * visitors who prefer reduced motion.
 */
const EngineStory = () => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.35'],
  });

  const still = (value) => (prefersReducedMotion ? 1 : value);
  const coreOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const coreScale = useTransform(scrollYProgress, [0, 0.25], [0.85, 1]);
  const lineProgress = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const brandOpacities = [
    useTransform(scrollYProgress, [0.45, 0.65], [0, 1]),
    useTransform(scrollYProgress, [0.55, 0.75], [0, 1]),
    useTransform(scrollYProgress, [0.65, 0.85], [0, 1]),
  ];
  const brandLifts = [
    useTransform(scrollYProgress, [0.45, 0.65], [14, 0]),
    useTransform(scrollYProgress, [0.55, 0.75], [14, 0]),
    useTransform(scrollYProgress, [0.65, 0.85], [14, 0]),
  ];

  return (
    <div ref={ref} className="max-w-2xl mx-auto mb-14 select-none" aria-hidden="true" dir="ltr">
      {/* The core */}
      <motion.div
        style={{ opacity: still(coreOpacity), scale: still(coreScale) }}
        className="mx-auto w-fit px-5 py-2.5 rounded-xl bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/35 text-[rgb(var(--primary))] font-mono text-sm font-semibold shadow-[0_0_30px_rgb(var(--accent)/0.15)]">
        Django + PostgreSQL core
      </motion.div>

      {/* Connectors */}
      <svg viewBox="0 0 400 72" className="w-full h-16 sm:h-[72px]" fill="none">
        {[
          'M200 0 C 200 40, 66 32, 66 72',
          'M200 0 L 200 72',
          'M200 0 C 200 40, 334 32, 334 72',
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="rgb(var(--accent) / 0.55)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{ pathLength: still(lineProgress) }}
          />
        ))}
      </svg>

      {/* The three brands */}
      <div className="grid grid-cols-3 gap-3">
        {LMS_SUITE.members.map((member, i) => (
          <motion.div
            key={member.slug}
            style={{ opacity: still(brandOpacities[i]), y: prefersReducedMotion ? 0 : brandLifts[i] }}
            className="text-center px-2 py-2.5 rounded-xl bg-[rgb(var(--muted))]/25 border border-[rgb(var(--border))]/60 text-xs sm:text-sm font-semibold text-[rgb(var(--foreground))] truncate"
          >
            <span className="inline-block w-2 h-2 rounded-full me-2" style={{ backgroundColor: member.accent }} />
            {member.name}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const PlatformSuite = () => {
  const { t } = useTranslation();

  return (
    <section id="platform-suite" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background ambiance */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[rgb(var(--primary))]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[rgb(var(--primary))] font-bold tracking-widest uppercase text-sm mb-4">
            <FaLayerGroup />
            {t('platform_suite.label')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[rgb(var(--foreground))] tracking-tight">
            {t('platform_suite.title')}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-3xl mx-auto text-lg leading-relaxed">
            {t('platform_suite.subtitle')}
          </p>
        </motion.div>

        {/* One engine → three brands, told by the scroll */}
        <EngineStory />

        {/* Shared engine capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl border border-[rgb(var(--border))]/50 p-6 md:p-8 mb-12"
        >
          <h3 className="text-lg font-bold text-[rgb(var(--foreground))] mb-6 text-center">
            {t('platform_suite.shared_title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SHARED_CAPABILITIES.map((cap, index) => (
              <motion.div
                key={cap.key}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
                className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-[rgb(var(--muted))]/10 border border-[rgb(var(--border))]/40"
              >
                <span className="w-10 h-10 rounded-lg flex items-center justify-center bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/20">
                  {cap.icon}
                </span>
                <span className="text-xs font-semibold text-[rgb(var(--foreground))] leading-snug">
                  {t(`platform_suite.capabilities.${cap.key}`)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Branded deployments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LMS_SUITE.members.map((member, index) => (
            <motion.a
              key={member.slug}
              href={member.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL_VIEWPORT}
              transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
              whileHover={{ y: -6 }}
              className="group glass-card rounded-2xl overflow-hidden border border-[rgb(var(--border))]/50 hover:border-[rgb(var(--primary))]/40 transition-colors flex flex-col"
            >
              <div className="relative aspect-video bg-[rgb(var(--scrim))] overflow-hidden border-b border-[rgb(var(--border))]/30 flex items-center justify-center p-4">
                <div
                  className="absolute inset-x-0 top-0 h-1 z-10"
                  style={{ backgroundColor: member.accent }}
                />
                <Image
                  src={member.image}
                  alt={member.name}
                  width={coverMeta(member.image).w}
                  height={coverMeta(member.image).h}
                  sizes="(min-width: 768px) 30vw, 90vw"
                  placeholder={coverMeta(member.image).blur ? 'blur' : 'empty'}
                  blurDataURL={coverMeta(member.image).blur}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                />
              </div>

              <div className="p-5 flex flex-col gap-2 flex-grow text-start">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-lg font-bold text-[rgb(var(--foreground))]">
                    {member.name}
                  </h4>
                  <FaExternalLinkAlt className="text-[rgb(var(--muted-foreground))] group-hover:text-[rgb(var(--primary))] transition-colors shrink-0" />
                </div>
                <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed flex-grow">
                  {t(`platform_suite.members.${member.slug}`)}
                </p>
                <span className="text-xs text-[rgb(var(--primary))] font-medium break-all mt-2">
                  {member.url.replace(/^https?:\/\/|\/$/g, '')}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-[rgb(var(--muted-foreground))] mt-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t('platform_suite.footnote')}
        </motion.p>
      </div>
    </section>
  );
};

export default PlatformSuite;
