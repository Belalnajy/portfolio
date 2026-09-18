"use client";
import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REVEAL_VIEWPORT, revealDelay, REVEAL_DURATION } from '../lib/motion';
import { FaLaptopCode, FaGraduationCap, FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

/** Period, location and employment, as one row of pills. */
const MetaPills = ({ exp, size = 'sm' }) => {
  const text = size === 'sm' ? 'text-xs' : 'text-sm';
  return (
    <div className={`flex flex-wrap gap-2 ${text} text-[rgb(var(--muted-foreground))]`}>
      <span className="flex items-center gap-1.5 bg-[rgb(var(--muted))]/50 px-3 py-1.5 rounded-full whitespace-nowrap">
        <FaCalendarAlt className="text-[rgb(var(--primary))]" /> {exp.period}
      </span>
      <span className="flex items-center gap-1.5 bg-[rgb(var(--muted))]/50 px-3 py-1.5 rounded-full whitespace-nowrap">
        <FaMapMarkerAlt className="text-[rgb(var(--primary))]" /> {exp.location}
      </span>
      {exp.employment && (
        <span className="flex items-center gap-1.5 bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
          {exp.employment}
        </span>
      )}
    </div>
  );
};

const TypeBadge = ({ exp, t }) => (
  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))] whitespace-nowrap flex items-center gap-1.5">
    {exp.type === 'work' ? (
      <>
        <FaBriefcase className="text-[rgb(var(--primary))]" /> {t('timeline.labels.work')}
      </>
    ) : (
      <>
        <FaGraduationCap className="text-[rgb(var(--primary))]" /> {t('timeline.labels.education')}
      </>
    )}
  </span>
);

const Logo = ({ exp, className }) =>
  exp.logo ? (
    <img
      src={exp.logo}
      alt={exp.company}
      loading="lazy"
      className={`logo-mark object-contain ${className}`}
    />
  ) : (
    <span className="text-[rgb(var(--primary))]">{exp.icon}</span>
  );

const Bullets = ({ exp, isArabic, size = 'sm' }) => (
  <ul className={`space-y-2.5 ${size === 'sm' ? 'text-sm' : 'text-[15px]'}`}>
    {exp.description.map((desc, i) => (
      <li
        key={i}
        className="flex items-start text-[rgb(var(--foreground))] leading-relaxed text-start">
        <FaChevronRight
          className={`text-[rgb(var(--primary))] ${isArabic ? 'ml-2.5 rotate-180' : 'mr-2.5'} mt-1.5 text-[10px] shrink-0`}
        />
        <span>{desc}</span>
      </li>
    ))}
  </ul>
);

const InteractiveTimeline = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);

  const experiences = useMemo(() => {
    const items = t('timeline.items', { returnObjects: true });
    // Language-neutral metadata, matched to i18n items by their `key` field so
    // reordering or inserting entries can never mis-assign a logo.
    const metadata = {
      ezsec: { type: 'work', icon: <FaBriefcase />, logo: '/logos/ezsec-logo.webp' },
      opptmakers: { type: 'work', icon: <FaBriefcase />, logo: '/logos/opptmakers-logo.webp' },
      indstrz: { type: 'work', icon: <FaBriefcase />, logo: '/logos/indstrz-logo.webp' },
      sf: { type: 'work', icon: <FaBriefcase />, logo: '/logos/sf-logo.webp' },
      iti_instructor: { type: 'work', icon: <FaLaptopCode />, logo: '/logos/iti-logo.webp' },
      freelance: { type: 'work', icon: <FaLaptopCode /> },
      iti_intern: { type: 'education', icon: <FaGraduationCap />, logo: '/logos/iti-logo.webp' },
      ezdk: { type: 'work', icon: <FaBriefcase />, logo: '/logos/ezzsteel-logo.webp' },
      alexu: { type: 'education', icon: <FaGraduationCap />, logo: '/logos/alex-uni-logo.webp' },
    };

    return items.map((item) => ({
      ...item,
      ...(metadata[item.key] || { type: 'work', icon: <FaBriefcase /> })
    }));
  }, [t]);

  const active = experiences[activeIndex] ?? experiences[0];

  // Arrow keys move between roles, as a vertical tablist should.
  const onTabKeyDown = (event) => {
    const last = experiences.length - 1;
    const move = (next) => {
      event.preventDefault();
      setActiveIndex(next);
      tabRefs.current[next]?.focus();
    };
    if (event.key === 'ArrowDown') move(activeIndex === last ? 0 : activeIndex + 1);
    else if (event.key === 'ArrowUp') move(activeIndex === 0 ? last : activeIndex - 1);
    else if (event.key === 'Home') move(0);
    else if (event.key === 'End') move(last);
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden text-start">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            {t('timeline.title')}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg leading-relaxed">
            {t('timeline.subtitle')}
          </p>
        </motion.div>

        {/* Desktop: pick a role on the left, read it on the right. A stack of
            nine full-width cards wasted the width and made the section a very
            long scroll; this keeps every role one click away. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5 }}
          className="hidden lg:grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
          {/* Role list */}
          <div className="lg:col-span-5">
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label={t('timeline.title')}
              onKeyDown={onTabKeyDown}
              className="sticky top-24 flex flex-col gap-2 max-h-[calc(100vh-8rem)] overflow-y-auto pe-1">
              {experiences.map((exp, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={exp.key || index}
                    ref={(node) => { tabRefs.current[index] = node; }}
                    role="tab"
                    id={`role-tab-${index}`}
                    aria-selected={isActive}
                    aria-controls="role-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`group relative text-start rounded-xl border p-4 transition-all duration-200 ${
                      isActive
                        ? 'bg-[rgb(var(--primary))]/8 border-[rgb(var(--primary))]/40 shadow-lg shadow-[rgb(var(--primary))]/5'
                        : 'bg-transparent border-[rgb(var(--border))]/50 hover:border-[rgb(var(--primary))]/30 hover:bg-[rgb(var(--muted))]/20'
                    }`}>
                    {/* Active marker on the start edge */}
                    <span
                      className={`absolute start-0 top-1/2 -translate-y-1/2 w-1 rounded-full bg-[rgb(var(--primary))] transition-all duration-200 ${
                        isActive ? 'h-10 opacity-100' : 'h-0 opacity-0'
                      }`}
                    />
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 shrink-0 rounded-lg bg-[rgb(var(--card))] border border-[rgb(var(--border))]/50 flex items-center justify-center overflow-hidden p-1.5">
                        <Logo exp={exp} className="w-full h-full" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block font-bold leading-tight truncate transition-colors ${
                            isActive ? 'text-[rgb(var(--primary))]' : 'text-[rgb(var(--foreground))]'
                          }`}>
                          {exp.title}
                        </span>
                        <span className="block text-xs text-[rgb(var(--muted-foreground))] truncate mt-0.5">
                          {exp.company}
                        </span>
                      </span>
                      <span className="text-[11px] font-medium text-[rgb(var(--muted-foreground))] whitespace-nowrap shrink-0">
                        {exp.period}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key || activeIndex}
                id="role-panel"
                role="tabpanel"
                aria-labelledby={`role-tab-${activeIndex}`}
                tabIndex={0}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="glass-card rounded-2xl border border-[rgb(var(--border))]/50 p-8 lg:sticky lg:top-24 lg:min-h-[26rem]">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-start gap-4 min-w-0">
                    <span className="w-16 h-16 shrink-0 rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))]/50 flex items-center justify-center overflow-hidden p-2.5 shadow-sm">
                      <Logo exp={active} className="w-full h-full" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-2xl font-bold text-[rgb(var(--foreground))] leading-tight mb-1">
                        {active.title}
                      </h3>
                      <p className="text-[rgb(var(--primary))] font-semibold">
                        {active.company}
                      </p>
                    </div>
                  </div>
                  <TypeBadge exp={active} t={t} />
                </div>

                <div className="mb-6">
                  <MetaPills exp={active} />
                </div>

                <Bullets exp={active} isArabic={isArabic} size="md" />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Phones and tablets: one rail, cards full width. */}
        <div className="lg:hidden relative max-w-3xl mx-auto">
          <div className="absolute top-2 bottom-2 start-5 w-px bg-gradient-to-b from-[rgb(var(--primary))]/50 via-[rgb(var(--primary))]/20 to-transparent" />

          <ol className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.li
                key={exp.key || index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
                className="relative ps-14">
                {/* Rail marker */}
                <div className="absolute start-0 top-4 w-10 h-10 rounded-full flex items-center justify-center text-base ring-4 ring-[rgb(var(--background))] bg-[rgb(var(--card))] text-[rgb(var(--primary))] border border-[rgb(var(--border))]">
                  {exp.icon}
                </div>

                <div className="glass-card p-6 rounded-xl relative">
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div className="flex items-start flex-1 min-w-0">
                      <span className={`w-14 h-14 rounded-xl bg-[rgb(var(--card))] flex items-center justify-center ${isArabic ? 'ml-4' : 'mr-4'} border border-[rgb(var(--border))]/50 flex-shrink-0 overflow-hidden p-2 shadow-sm`}>
                        <Logo exp={exp} className="w-full h-full" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-[rgb(var(--foreground))] mb-1 leading-tight text-start">
                          {exp.title}
                        </h3>
                        <p className="text-[rgb(var(--primary))] text-sm font-semibold text-start">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <TypeBadge exp={exp} t={t} />
                    </div>
                  </div>

                  <div className="mb-4">
                    <MetaPills exp={exp} />
                  </div>

                  <Bullets exp={exp} isArabic={isArabic} />
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTimeline;
