"use client";
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  FaProjectDiagram,
  FaCode,
  FaClock,
  FaAward,
  FaHandshake,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

/**
 * Renders the final value on the server and counts up only as an enhancement.
 *
 * Previously this started at 0 and relied on the client to animate, so the
 * prerendered HTML shipped `0+` for every stat. Any client-side failure —
 * a hydration error, a third-party asset that throws — left those zeros on
 * screen permanently. Now a broken page shows the right number instead.
 */
const Counter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(end);
  const [animating, setAnimating] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();

  // After mount, drop back to zero so the count-up has somewhere to travel
  // from. The section sits well below the fold, so this is never visible.
  useEffect(() => {
    if (prefersReducedMotion) return;
    setCount(0);
    setAnimating(true);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!animating || !isInView) return;

    let startTime;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView, animating]);

  // Fixed locale keeps the digits Latin in both languages, matching the design.
  return <span ref={ref}>{count.toLocaleString('en-US')}</span>;
};

const AnimatedStats = () => {
  const { t } = useTranslation();

  const stats = useMemo(
    () => [
      {
        icon: <FaProjectDiagram className="text-4xl" />,
        value: 31,
        suffix: '+',
        label: t('stats.projects'),
      },
      {
        icon: <FaHandshake className="text-4xl" />,
        value: 27,
        suffix: '+',
        label: t('stats.clients'),
      },
      {
        icon: <FaCode className="text-4xl" />,
        value: 20,
        suffix: '+',
        label: t('stats.technologies'),
      },
      {
        icon: <FaClock className="text-4xl" />,
        value: 2,
        suffix: '+',
        label: t('stats.years'),
      },
      {
        icon: <FaAward className="text-4xl" />,
        value: 240,
        suffix: '+',
        label: t('stats.students'),
      },
    ],
    [t],
  );

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
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
