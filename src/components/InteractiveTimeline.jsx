"use client";
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { REVEAL_VIEWPORT, revealDelay, REVEAL_DURATION } from '../lib/motion';
import { FaLaptopCode, FaGraduationCap, FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

/** Period, location and employment, as one row of pills. */
const MetaPills = ({ exp, compact = false }) => (
  <div className="flex flex-wrap gap-2 text-xs text-[rgb(var(--muted-foreground))]">
    <span className="flex items-center gap-1.5 bg-[rgb(var(--muted))]/50 px-3 py-1.5 rounded-full whitespace-nowrap">
      <FaCalendarAlt className="text-[rgb(var(--primary))]" /> {exp.period}
    </span>
    {!compact && (
      <span className="flex items-center gap-1.5 bg-[rgb(var(--muted))]/50 px-3 py-1.5 rounded-full whitespace-nowrap">
        <FaMapMarkerAlt className="text-[rgb(var(--primary))]" /> {exp.location}
      </span>
    )}
    {exp.employment && (
      <span className="flex items-center gap-1.5 bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
        {exp.employment}
      </span>
    )}
  </div>
);

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

const Bullets = ({ exp, isArabic }) => (
  <ul className="space-y-2.5 text-sm">
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

/** A green pulse on the roles that are still running. */
const LiveDot = () => (
  <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
    <span className="absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--success))] opacity-75 animate-ping" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-[rgb(var(--success))]" />
  </span>
);

const RoleHeader = ({ exp, t, size = 'md' }) => (
  <div className="flex items-start justify-between gap-3 mb-4">
    <div className="flex items-start gap-3 min-w-0">
      <span
        className={`shrink-0 rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))]/50 flex items-center justify-center overflow-hidden shadow-sm ${
          size === 'lg' ? 'w-14 h-14 p-2.5' : 'w-11 h-11 p-2'
        }`}>
        <Logo exp={exp} className="w-full h-full" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          {exp.current && <LiveDot />}
          <h3
            className={`font-bold text-[rgb(var(--foreground))] leading-tight ${
              size === 'lg' ? 'text-xl' : 'text-base'
            }`}>
            {exp.title}
          </h3>
        </span>
        <p className="text-[rgb(var(--primary))] text-sm font-semibold mt-0.5">
          {exp.company}
        </p>
      </span>
    </div>
    <TypeBadge exp={exp} t={t} />
  </div>
);

const InteractiveTimeline = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const experiences = useMemo(() => {
    const items = t('timeline.items', { returnObjects: true });
    /**
     * Language-neutral metadata, matched to i18n items by their `key` field so
     * reordering or inserting entries can never mis-assign a logo.
     *
     * `span` is the tile's width in the desktop bento grid — written out in
     * full because Tailwind only keeps classes it can see as literal strings.
     * Every tile is at least half the width, so long role titles and the meta
     * pills never have to wrap into a column of their own. `current` marks a role that
     * is still running, which is a fact about the role rather than a string we
     * would otherwise have to parse out of a translated date range.
     */
    const metadata = {
      ezsec: { type: 'work', icon: <FaBriefcase />, logo: '/logos/ezsec-logo.webp', span: 'lg:col-span-7', current: true },
      opptmakers: { type: 'work', icon: <FaBriefcase />, logo: '/logos/opptmakers-logo.webp', span: 'lg:col-span-5', current: true },
      indstrz: { type: 'work', icon: <FaBriefcase />, logo: '/logos/indstrz-logo.webp', span: 'lg:col-span-6', current: true },
      sf: { type: 'work', icon: <FaBriefcase />, logo: '/logos/sf-logo.webp', span: 'lg:col-span-6', current: true },
      iti_instructor: { type: 'work', icon: <FaLaptopCode />, logo: '/logos/iti-logo.webp', span: 'lg:col-span-6', current: true },
      freelance: { type: 'work', icon: <FaLaptopCode />, span: 'lg:col-span-6', current: true },
      iti_intern: { type: 'education', icon: <FaGraduationCap />, logo: '/logos/iti-logo.webp', span: 'lg:col-span-6' },
      ezdk: { type: 'work', icon: <FaBriefcase />, logo: '/logos/ezzsteel-logo.webp', span: 'lg:col-span-6' },
      // The degree closes the career, so it runs the full width as a band.
      alexu: { type: 'education', icon: <FaGraduationCap />, logo: '/logos/alex-uni-logo.webp', span: 'lg:col-span-12' },
    };

    return items.map((item) => ({
      ...item,
      span: 'lg:col-span-6',
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

        {/* Desktop: a bento grid, so the whole career is legible at a glance
            and tile size carries the weight of each role. Tabs hid eight of
            nine roles at a time; a stack of full-width cards ignored the
            width and ran for thousands of pixels. */}
        <ol className="hidden lg:grid lg:grid-cols-12 gap-5 max-w-6xl mx-auto list-none">
          {experiences.map((exp, index) => (
            <motion.li
              key={exp.key || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL_VIEWPORT}
              transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
              className={`${exp.span} group relative glass-card rounded-2xl border p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                exp.current
                  ? 'border-[rgb(var(--primary))]/30 hover:border-[rgb(var(--primary))]/60'
                  : 'border-[rgb(var(--border))]/50 hover:border-[rgb(var(--primary))]/40'
              }`}>
              {/* Accent wash on the roles still running */}
              {exp.current && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgb(var(--primary))]/[0.06] to-transparent"
                />
              )}

              <div className="relative z-10 flex flex-col h-full">
                <RoleHeader exp={exp} t={t} size="lg" />
                <div className="mb-4">
                  <MetaPills exp={exp} />
                </div>
                <Bullets exp={exp} isArabic={isArabic} />
              </div>
            </motion.li>
          ))}
        </ol>

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
                  <RoleHeader exp={exp} t={t} />
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
