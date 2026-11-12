'use client';
import { useEffect, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import SectionHeading from './SectionHeading';
import { FAQ_ITEMS } from '../content/faq';

const HEADINGS = {
  en: { title: 'Frequently asked questions', subtitle: 'The short answers clients ask for most.', eyebrow: 'Before you start' },
  ar: { title: 'أسئلة شائعة', subtitle: 'إجابات مختصرة لأكتر الأسئلة اللي بتوصلني من العملاء.', eyebrow: 'قبل أن تبدأ' },
};

// Matches --dur-ui in globals.css.
const OPEN_MS = 220;

/**
 * One question. Still a native <details>, so every answer is in the server
 * HTML, works without JavaScript and opens for the browser's find-in-page.
 * With JavaScript the summary click is taken over only to animate: the
 * answer's row grows from 0fr to 1fr when it opens, and the element closes
 * once the row has shrunk back.
 */
const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const timer = useRef(0);
  const frame = useRef(0);
  // What the click handler last asked for, read by the toggle handler (its
  // event arrives a task later, possibly before a re-render).
  const wantOpen = useRef(false);

  useEffect(
    () => () => {
      clearTimeout(timer.current);
      cancelAnimationFrame(frame.current);
    },
    [],
  );

  const handleClick = (event) => {
    event.preventDefault();
    clearTimeout(timer.current);
    cancelAnimationFrame(frame.current);
    if (!open || !expanded) {
      wantOpen.current = true;
      setOpen(true);
      // One frame at 0fr with the element open, then grow.
      frame.current = requestAnimationFrame(() => {
        frame.current = requestAnimationFrame(() => setExpanded(true));
      });
    } else {
      wantOpen.current = false;
      setExpanded(false);
      timer.current = setTimeout(() => setOpen(false), OPEN_MS);
    }
  };

  // Opened or closed by the browser itself (find-in-page, no click).
  const handleToggle = (event) => {
    const isOpen = event.currentTarget.open;
    if (isOpen && !wantOpen.current) {
      wantOpen.current = true;
      setOpen(true);
      setExpanded(true);
    }
  };

  return (
    <details
      open={open}
      onToggle={handleToggle}
      className={`group glass-card m-card-flush max-md:shadow-[var(--elev-1)]! rounded-2xl border border-[rgb(var(--border))]/50 transition-colors ${
        expanded ? 'border-[rgb(var(--primary))]/40 max-md:border-[rgb(var(--primary))]/40!' : ''
      }`}>
      <summary
        onClick={handleClick}
        className="press-tint flex items-center justify-between gap-4 cursor-pointer list-none p-5 sm:p-6 max-md:min-h-[60px] rounded-2xl font-semibold text-[rgb(var(--foreground))] [&::-webkit-details-marker]:hidden">
        <h3 className="text-base sm:text-lg max-md:leading-snug rtl:max-md:leading-[1.6]">{question}</h3>
        <span
          aria-hidden="true"
          className={`shrink-0 inline-flex items-center justify-center w-8 h-8 -my-1 rounded-full transition-[rotate,background-color] duration-[220ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
            expanded
              ? 'rotate-45 bg-[rgb(var(--primary))]/12'
              : 'max-md:bg-[rgb(var(--primary))]/8'
          }`}>
          <FaPlus className="text-sm text-[rgb(var(--primary))]" />
        </span>
      </summary>
      <div
        className={`grid transition-[grid-template-rows] duration-[220ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}>
        <div className="overflow-hidden min-h-0">
          <p className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 text-[rgb(var(--muted-foreground))] leading-relaxed type-body">
            {answer}
          </p>
        </div>
      </div>
    </details>
  );
};

/**
 * The visible twin of the FAQPage structured data in HomeJsonLd: both read
 * src/content/faq.js, so what search and answer engines are told is exactly
 * what a visitor can read.
 */
const HomeFaq = ({ lang = 'en' }) => {
  const { title, subtitle, eyebrow } = HEADINGS[lang];

  return (
    <section id="faq" className="m-section relative text-start">
      <div className="shell relative z-10">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <div className="space-y-3 max-md:space-y-2.5 max-w-3xl">
          {FAQ_ITEMS[lang].map(({ question, answer }) => (
            <FaqItem key={question} question={question} answer={answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFaq;
