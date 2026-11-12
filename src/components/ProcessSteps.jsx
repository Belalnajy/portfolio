'use client';
import { useTranslation } from 'react-i18next';
import {
  FaComments,
  FaDraftingCompass,
  FaCode,
  FaVial,
  FaRocket,
  FaLifeRing,
} from 'react-icons/fa';
import Reveal from './Reveal';
import { revealDelay } from '../lib/motion';

const PROCESS_STEPS = [
  { key: 'discovery', icon: <FaComments /> },
  { key: 'blueprint', icon: <FaDraftingCompass /> },
  { key: 'build', icon: <FaCode /> },
  { key: 'review', icon: <FaVial /> },
  { key: 'launch', icon: <FaRocket /> },
  { key: 'support', icon: <FaLifeRing /> },
];

/**
 * The delivery process as a grid of steps, each with its deliverable. One
 * implementation for /services (all six steps) and the home page's "how we
 * start" strip (the first few, `count`).
 */
const ProcessSteps = ({ count = PROCESS_STEPS.length, className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' }) => {
  const { t } = useTranslation();
  return (
    <ol className={className}>
      {PROCESS_STEPS.slice(0, count).map((step, index) => (
        <Reveal as="li" y={16} delay={revealDelay(index)}
          key={step.key}
          className="relative flex gap-4 p-5 rounded-xl bg-[rgb(var(--muted))]/10 border border-[rgb(var(--border))]/50 hover:border-[rgb(var(--primary))]/40 transition-colors text-start">
          <span aria-hidden="true" className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[rgb(var(--muted))]/40 text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))] text-lg">
            {step.icon}
          </span>
          <div className="min-w-0">
            <h3 className="font-bold text-[rgb(var(--foreground))] leading-snug mb-1">
              {t(`process.steps.${step.key}.title`)}
            </h3>
            <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed mb-2">
              {t(`process.steps.${step.key}.desc`)}
            </p>
            <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
              {t(`process.steps.${step.key}.deliverable`)}
            </span>
          </div>
        </Reveal>
      ))}
    </ol>
  );
};

export default ProcessSteps;
