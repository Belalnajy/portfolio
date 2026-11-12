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
 *
 * Below md it is a timeline whatever `className` asks for: one column, the
 * icon tile on the inline-start rail with a line running from tile to tile,
 * and each step's text in an .m-card beside it.
 */
const ProcessSteps = ({ count = PROCESS_STEPS.length, className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' }) => {
  const { t } = useTranslation();
  return (
    <ol className={`${className} max-md:grid-cols-1! max-md:gap-3!`}>
      {PROCESS_STEPS.slice(0, count).map((step, index) => (
        <Reveal as="li" y={16} delay={revealDelay(index)}
          key={step.key}
          className="relative flex gap-4 p-5 rounded-xl bg-[rgb(var(--muted))]/10 border border-[rgb(var(--border))]/50 hover:border-[rgb(var(--primary))]/40 transition-colors text-start max-md:gap-3 max-md:p-0 max-md:rounded-none max-md:bg-transparent max-md:border-0 max-md:after:absolute max-md:after:start-[1.375rem] max-md:after:top-8 max-md:after:-bottom-11 max-md:after:w-px max-md:after:bg-[rgb(var(--border-control))]/45 max-md:last:after:hidden">
          <span aria-hidden="true" className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[rgb(var(--muted))]/40 text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))] text-lg relative z-10 max-md:mt-2.5 max-md:rounded-xl max-md:text-base max-md:bg-[rgb(var(--surface))] max-md:text-[rgb(var(--primary))] max-md:border-[rgb(var(--primary))]/35 max-md:shadow-[var(--elev-1)]">
            {step.icon}
          </span>
          <div className="min-w-0 max-md:flex-1 m-card">
            <h3 className="font-bold text-[rgb(var(--foreground))] leading-snug mb-1 max-md:mb-2 max-md:text-lg max-md:leading-[1.3] rtl:max-md:leading-[1.6]">
              {t(`process.steps.${step.key}.title`)}
            </h3>
            <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed mb-2 max-md:mb-3 type-small">
              {t(`process.steps.${step.key}.desc`)}
            </p>
            <span className="inline-block text-[11px] max-md:text-xs font-semibold px-2.5 py-0.5 max-md:py-1 rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
              {t(`process.steps.${step.key}.deliverable`)}
            </span>
          </div>
        </Reveal>
      ))}
    </ol>
  );
};

export default ProcessSteps;
