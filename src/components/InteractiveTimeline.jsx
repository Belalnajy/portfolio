"use client";
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { REVEAL_VIEWPORT, revealDelay, REVEAL_DURATION } from '../lib/motion';
import { FaLaptopCode, FaGraduationCap, FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const InteractiveTimeline = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);

  const experiences = useMemo(() => {
    const items = t('timeline.items', { returnObjects: true });
    // Language-neutral metadata, matched to i18n items by their `key` field so
    // reordering or inserting entries can never mis-assign a logo.
    const metadata = {
      ezsec: { type: 'work', icon: <FaBriefcase />, logo: '/logos/ezsec-logo.webp' },
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

        {/* One rail on the start side, cards full width. The old two-column
            zigzag left every other row empty and took ~2900px on desktop. */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute top-2 bottom-2 start-5 w-px bg-gradient-to-b from-[rgb(var(--primary))]/50 via-[rgb(var(--primary))]/20 to-transparent" />

          <ol className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.li
                key={exp.key || index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
                className="relative ps-14"
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}>
                {/* Rail marker */}
                <motion.div
                  animate={{ scale: activeIndex === index ? 1.15 : 1 }}
                  transition={{ duration: 0.25 }}
                  className={`absolute start-0 top-4 w-10 h-10 rounded-full flex items-center justify-center text-base ring-4 ring-[rgb(var(--background))] transition-colors ${
                    activeIndex === index
                      ? 'bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))] shadow-lg shadow-[rgb(var(--primary))]/40'
                      : 'bg-[rgb(var(--card))] text-[rgb(var(--primary))] border border-[rgb(var(--border))]'
                  }`}>
                  {exp.icon}
                </motion.div>

                <div
                  className={`glass-card glass-hover p-6 rounded-xl cursor-pointer relative ${
                    activeIndex === index
                      ? 'ring-2 ring-[rgb(var(--primary))] shadow-xl shadow-[rgb(var(--primary))]/20'
                      : ''
                  }`}>
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div className="flex items-start flex-1 min-w-0">
                      <div className={`w-14 h-14 rounded-xl bg-[rgb(var(--card))] flex items-center justify-center ${isArabic ? 'ml-4' : 'mr-4'} border border-[rgb(var(--border))]/50 flex-shrink-0 overflow-hidden p-2 shadow-sm`}>
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            loading="lazy"
                            className="logo-mark w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-[rgb(var(--primary))] text-xl">
                            {exp.icon}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-[rgb(var(--foreground))] mb-1 leading-tight text-start">
                          {exp.title}
                        </h3>
                        <p className="text-[rgb(var(--primary))] text-sm font-semibold text-start">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    {/* Type badge */}
                    <div className="flex-shrink-0">
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
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 text-xs text-[rgb(var(--muted-foreground))] mb-4 relative">
                    <span className="flex items-center gap-1 bg-[rgb(var(--muted))]/50 px-3 py-1.5 rounded-full whitespace-nowrap">
                      <FaCalendarAlt className="text-[rgb(var(--primary))]" /> {exp.period}
                    </span>
                    <span className="flex items-center gap-1 bg-[rgb(var(--muted))]/50 px-3 py-1.5 rounded-full whitespace-nowrap">
                      <FaMapMarkerAlt className="text-[rgb(var(--primary))]" /> {exp.location}
                    </span>
                    {exp.employment && (
                      <span className="flex items-center gap-1 bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
                        {exp.employment}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2.5 relative">
                    {exp.description.map((desc, i) => (
                      <li
                        key={i}
                        className="text-sm flex items-start text-[rgb(var(--foreground))] leading-relaxed text-start">
                        <FaChevronRight className={`text-[rgb(var(--primary))] ${isArabic ? 'ml-2 rotate-180' : 'mr-2'} mt-1 text-[10px] shrink-0`} />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
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
