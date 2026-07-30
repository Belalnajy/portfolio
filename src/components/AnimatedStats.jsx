"use client";
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaProjectDiagram,
  FaCode,
  FaClock,
  FaAward,
  FaLaptopCode,
  FaHandshake,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

/**
 * Coding hours accrue on their own so the number never goes stale.
 * Baseline is anchored to the last portfolio update; every day after that adds
 * HOURS_PER_DAY. Bump the baseline (and its date) only if the real total shifts.
 */
const HOURS_BASELINE = 10000;
const HOURS_BASELINE_DATE = '2026-05-18T00:00:00Z';
const HOURS_PER_DAY = 17;

const getCodingHours = () => {
  const elapsedDays = Math.max(
    0,
    Math.floor(
      (Date.now() - new Date(HOURS_BASELINE_DATE).getTime()) / 86_400_000,
    ),
  );
  // Round to the nearest hundred so it reads as an estimate, not a fake precision.
  return Math.round((HOURS_BASELINE + elapsedDays * HOURS_PER_DAY) / 100) * 100;
};

const Counter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  // Fixed locale keeps the digits Latin in both languages, matching the design.
  return <span ref={ref}>{count.toLocaleString('en-US')}</span>;
};

const AnimatedStats = () => {
  const { t } = useTranslation();
  // The page is statically prerendered, so the accrued total is resolved after
  // mount — the baseline keeps server and client markup identical.
  const [codingHours, setCodingHours] = useState(HOURS_BASELINE);

  useEffect(() => {
    setCodingHours(getCodingHours());
  }, []);

  const stats = useMemo(
    () => [
      {
        icon: <FaProjectDiagram className="text-4xl" />,
        value: 35,
        suffix: '+',
        label: t('stats.projects'),
        color: 'from-blue-500 to-cyan-500',
      },
      {
        icon: <FaHandshake className="text-4xl" />,
        value: 25,
        suffix: '+',
        label: t('stats.clients'),
        color: 'from-amber-500 to-yellow-500',
      },
      {
        icon: <FaLaptopCode className="text-4xl" />,
        value: codingHours,
        suffix: '+',
        label: t('stats.hours'),
        color: 'from-indigo-500 to-blue-500',
      },
      {
        icon: <FaCode className="text-4xl" />,
        value: 35,
        suffix: '+',
        label: t('stats.technologies'),
        color: 'from-purple-500 to-pink-500',
      },
      {
        icon: <FaClock className="text-4xl" />,
        value: 3,
        suffix: '+',
        label: t('stats.years'),
        color: 'from-orange-500 to-red-500',
      },
      {
        icon: <FaAward className="text-4xl" />,
        value: 240,
        suffix: '+',
        label: t('stats.students'),
        color: 'from-green-500 to-emerald-500',
      },
    ],
    [t, codingHours],
  );

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card glass-hover p-8 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/20 mb-4">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold mb-2 text-[rgb(var(--foreground))]">
                <Counter end={stat.value} />
                {stat.suffix}
              </h3>
              <p className="text-[rgb(var(--muted-foreground))]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
