"use client";
import { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { revealDelay, REVEAL_DURATION } from '../lib/motion';
import { useTranslation } from 'react-i18next';
import {
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
  // The preference only counts after mount: the server renders the
  // scroll-driven version, hydration has to match it, and only then can the
  // keyed remount below swap in the static diagram.
  const wantsReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const prefersReducedMotion = mounted && wantsReducedMotion;
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
      {/* Keyed on the motion preference: the server renders the scroll-driven
          version (opacity 0 before any scrolling), and switching an element's
          style from motion values to plain numbers does not write them to
          the DOM (neither in hydration nor in an update). A remount does, so
          the static diagram really shows. */}
      <Fragment key={prefersReducedMotion ? 'still' : 'scroll'}>
      {/* The core */}
      <m.div
        style={{ opacity: still(coreOpacity), scale: still(coreScale) }}
        className="mx-auto w-fit px-5 py-2.5 rounded-xl bg-[rgb(var(--primary))]/10 border border-[rgb(var(--border))] text-[rgb(var(--primary))] font-mono text-sm font-semibold shadow-[0_0_30px_rgb(var(--accent)/0.15)]">
        Django + PostgreSQL core
      </m.div>

      {/* Connectors */}
      <svg viewBox="0 0 400 72" className="w-full h-16 sm:h-[72px]" fill="none">
        {[
          'M200 0 C 200 40, 66 32, 66 72',
          'M200 0 L 200 72',
          'M200 0 C 200 40, 334 32, 334 72',
        ].map((d, i) => (
          <m.path
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
          <m.div
            key={member.slug}
            style={{ opacity: still(brandOpacities[i]), y: prefersReducedMotion ? 0 : brandLifts[i] }}
            className="text-center px-2 py-2.5 rounded-xl bg-[rgb(var(--muted))]/25 border border-[rgb(var(--border))]/60 text-xs sm:text-sm font-semibold text-[rgb(var(--foreground))] truncate"
          >
            <span className="inline-block w-2 h-2 rounded-full me-2" style={{ backgroundColor: member.accent }} />
            {member.name}
          </m.div>
        ))}
      </div>
      </Fragment>
    </div>
  );
};

const PlatformSuite = () => {
  const { t } = useTranslation();

  return (
    <section id="platform-suite" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          className="max-w-6xl mx-auto"
          title={t('platform_suite.title')}
          subtitle={t('platform_suite.subtitle')}
        />

        {/* One engine → three brands, told by the scroll */}
        <EngineStory />

        {/* Shared engine capabilities */}
        <Reveal y={20} duration={0.5} delay={0.1}
          className="glass-card rounded-2xl border border-[rgb(var(--border))]/50 p-6 md:p-8 mb-12"
        >
          <h3 className="text-lg font-bold text-[rgb(var(--foreground))] mb-6 text-center">
            {t('platform_suite.shared_title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SHARED_CAPABILITIES.map((cap, index) => (
              <Reveal scale={0.95} delay={revealDelay(index)}
                key={cap.key}
                className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-[rgb(var(--muted))]/10 border border-[rgb(var(--border))]/40"
              >
                <span className="w-10 h-10 rounded-lg flex items-center justify-center bg-[rgb(var(--muted))]/40 text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))]">
                  {cap.icon}
                </span>
                <span className="text-xs font-semibold text-[rgb(var(--foreground))] leading-snug">
                  {t(`platform_suite.capabilities.${cap.key}`)}
                </span>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Branded deployments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LMS_SUITE.members.map((member, index) => (
            <Reveal
              as={m.a}
              y={24}
              delay={revealDelay(index)}
              key={member.slug}
              href={member.url}
              target="_blank"
              rel="noopener noreferrer"
              // Still read by Framer for the hover animation below.
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
            </Reveal>
          ))}
        </div>

        <Reveal as="p" duration={0.5} delay={0.3}
          className="text-center text-sm text-[rgb(var(--muted-foreground))] mt-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t('platform_suite.footnote')}
        </Reveal>
      </div>
    </section>
  );
};

export default PlatformSuite;
