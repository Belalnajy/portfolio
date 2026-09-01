"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { REVEAL_VIEWPORT, revealDelay, REVEAL_DURATION } from '../lib/motion';
import {
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaUserCog,
  FaLayerGroup,
  FaLanguage,
} from 'react-icons/fa';
import { useTranslation, Trans } from 'react-i18next';
import { getTechIcon } from './Projects';
import { coverMeta } from '../lib/cover-meta';

const PORTRAIT = '/hero.webp';

/**
 * Renders the final value on the server and counts up only as an enhancement,
 * so the prerendered HTML never ships zeros (see the old AnimatedStats notes).
 */
const Counter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(end);
  const [animating, setAnimating] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    setCount(0);
    setAnimating(true);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!animating || !isInView) return;
    let startTime;
    let frame;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);
      if (progress < 1) {
        setCount(Math.floor(end * progress));
        frame = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, isInView, animating]);

  // Fixed locale keeps the digits Latin in both languages, matching the design.
  return <span ref={ref}>{count.toLocaleString('en-US')}</span>;
};

const CORE_STACK = ['Next.js', 'React', 'NestJS', 'Laravel', 'Django', 'PostgreSQL', 'TypeScript', 'Tailwind'];

/** One cell of the bento. `span` carries the lg grid classes. */
const Cell = ({ span = '', index = 0, className = '', children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={REVEAL_VIEWPORT}
    transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
    className={`glass-card rounded-2xl border border-[rgb(var(--border))]/60 p-6 text-start ${span} ${className}`}>
    {children}
  </motion.div>
);

const CellLabel = ({ icon, children }) => (
  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))] mb-3">
    <span className="text-[rgb(var(--primary))]">{icon}</span>
    {children}
  </div>
);

const About = () => {
  const { t } = useTranslation();
  const portrait = coverMeta(PORTRAIT);

  const stats = [
    { value: 31, label: t('stats.projects') },
    { value: 27, label: t('stats.clients') },
    { value: 240, label: t('stats.students') },
    { value: 20, label: t('stats.technologies') },
  ];

  const highlights = [
    { icon: <FaUserCog />, title: t('about.highlights.sole_developer.title'), desc: t('about.highlights.sole_developer.desc') },
    { icon: <FaLayerGroup />, title: t('about.highlights.multi_tenant.title'), desc: t('about.highlights.multi_tenant.desc') },
    { icon: <FaLanguage />, title: t('about.highlights.arabic_first.title'), desc: t('about.highlights.arabic_first.desc') },
  ];

  const emphasis = {
    1: <span className="text-[rgb(var(--primary))] font-semibold" />,
    3: <span className="text-[rgb(var(--primary))] font-semibold" />,
  };

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5 }}
          className="mb-14 text-start">
          <h2 className="font-display text-display-lg font-bold text-[rgb(var(--foreground))] mb-3">
            {t('about.title')}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl text-lg">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
          {/* Portrait */}
          <Cell span="sm:col-span-1 lg:col-span-4 lg:row-span-2" index={0} className="p-0 overflow-hidden relative min-h-[320px]">
            <Image
              src={PORTRAIT}
              alt={t('about.values.name')}
              width={portrait.w}
              height={portrait.h}
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              placeholder={portrait.blur ? 'blur' : 'empty'}
              blurDataURL={portrait.blur}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 scrim-b p-5 pt-16">
              <p className="text-[rgb(var(--on-scrim))] font-display font-bold text-2xl">
                {t('about.values.name')}
              </p>
              <p className="text-[rgb(var(--on-scrim-muted))] text-sm">{t('about.values.role')}</p>
            </div>
          </Cell>

          {/* Professional summary */}
          <Cell span="sm:col-span-1 lg:col-span-8 lg:row-span-2" index={1} className="space-y-4">
            <CellLabel icon={<FaBriefcase />}>{t('about.professional_summary')}</CellLabel>
            <p className="text-[rgb(var(--foreground))] leading-relaxed">
              <Trans i18nKey="about.summary_p1" components={emphasis} />
            </p>
            <p className="text-[rgb(var(--foreground))] leading-relaxed">
              <Trans i18nKey="about.summary_p2" components={emphasis} />
            </p>
            <p className="text-[rgb(var(--foreground))] leading-relaxed">
              <Trans i18nKey="about.summary_p3" components={emphasis} />
            </p>
          </Cell>

          {/* Now */}
          <Cell span="sm:col-span-1 lg:col-span-4" index={2}>
            <CellLabel icon={<FaBriefcase />}>{t('about.bento.now')}</CellLabel>
            <p className="font-semibold text-[rgb(var(--foreground))] flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--success))] opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[rgb(var(--success))]" />
              </span>
              {t('about.bento.now_value')}
            </p>
            <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">{t('about.bento.now_meta')}</p>
          </Cell>

          {/* Based in */}
          <Cell span="sm:col-span-1 lg:col-span-4" index={3}>
            <CellLabel icon={<FaMapMarkerAlt />}>{t('about.bento.base')}</CellLabel>
            <p className="font-semibold text-[rgb(var(--foreground))]">{t('about.bento.base_value')}</p>
            <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1 font-mono" dir="ltr">
              {t('about.bento.base_meta')}
            </p>
          </Cell>

          {/* Education */}
          <Cell span="sm:col-span-2 lg:col-span-4" index={4}>
            <CellLabel icon={<FaGraduationCap />}>{t('about.labels.education')}</CellLabel>
            <p className="font-semibold text-[rgb(var(--foreground))]">{t('about.values.education')}</p>
            <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">{t('about.bento.langs_value')}</p>
          </Cell>

          {/* Stats */}
          {stats.map((stat, i) => (
            <Cell key={stat.label} span="sm:col-span-1 lg:col-span-3" index={i} className="text-center sm:text-start">
              <p className="font-display text-4xl md:text-5xl font-bold text-[rgb(var(--foreground))]">
                <Counter end={stat.value} />
                <span className="text-[rgb(var(--primary))]">+</span>
              </p>
              <p className="text-sm text-[rgb(var(--muted-foreground))] mt-2">{stat.label}</p>
            </Cell>
          ))}

          {/* Core stack */}
          <Cell span="sm:col-span-2 lg:col-span-12" index={2}>
            <CellLabel icon={<FaLayerGroup />}>{t('about.bento.stack_title')}</CellLabel>
            <div className="flex flex-wrap gap-2">
              {CORE_STACK.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgb(var(--muted))]/30 border border-[rgb(var(--border))]/60 text-sm font-medium text-[rgb(var(--foreground))]">
                  {getTechIcon(tech)}
                  {tech}
                </span>
              ))}
            </div>
          </Cell>

          {/* Highlights */}
          {highlights.map((item, i) => (
            <Cell key={item.title} span="sm:col-span-2 lg:col-span-4" index={i}>
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/25 text-[rgb(var(--primary))] text-lg mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-[rgb(var(--foreground))] mb-1.5">{item.title}</h3>
              <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed">{item.desc}</p>
            </Cell>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
