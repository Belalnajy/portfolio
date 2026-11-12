"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import Reveal from './Reveal';
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
} from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { useTranslation } from 'react-i18next';

const SERVICE_TITLE = "تصميم وتطوير موقع ويب كامل واحترافي | Full Stack Web";
const KHAMSAT_CATEGORIES = ["جودة الخدمة", "التواصل والمتابعة", "التسليم بالموعد"];

// The rating chips come from the freelance platforms in Arabic; the English UI shows
// their meaning rather than a script most visitors there cannot read.
const CATEGORY_EN = {
  'جودة الخدمة': 'Service quality',
  'التواصل والمتابعة': 'Communication & follow-up',
  'التسليم بالموعد': 'On-time delivery',
  'التسليم في الموعد': 'On-time delivery',
  'الاحترافية بالتعامل': 'Professionalism',
  'جودة العمل المسلّم': 'Quality of delivered work',
  'الخبرة بمجال المشروع': 'Domain expertise',
  'التعامل معه مرّة أخرى': 'Would hire again',
};
const KHAMSAT_PROFILE = "https://khamsat.com/user/belalnajy/reviews";

// Names and the Khamsat service title are typed in whichever script the
// reviewer used, whatever the page language: each sits in a <bdi> marked with
// its own language, so "Salman A." cannot render as ".Salman A" on an Arabic
// page, and an Arabic name is not read with an English voice.
const scriptLang = (text) => (/[\u0600-\u06FF]/.test(text) ? "ar" : "en");

/**
 * `key` maps each entry to its `testimonials.items.<key>` translation, so the
 * order here is free to change without silently re-pairing names and quotes.
 * `date` is an ISO day — the relative label is derived at render time so it
 * never goes stale.
 */
const TESTIMONIALS_CONFIG = [
  { key: 'salman_a', name: "Salman A.", date: '2026-07-14', platform: "Khamsat", link: KHAMSAT_PROFILE },
  { key: 'amsb_a', name: "Amsb A.", date: '2026-06-27', platform: "Khamsat", link: KHAMSAT_PROFILE },
  { key: 'abu_w', name: "Abu W.", date: '2026-05-05', platform: "Khamsat", link: KHAMSAT_PROFILE },
  { key: 'abo_m', name: "Abo M.", date: '2026-04-21', platform: "Khamsat", link: "https://khamsat.com/user/belalnajy/reviews/1095137" },
  { key: 'ahmed_y', name: "Ahmed Y.", date: '2026-04-18', platform: "Khamsat", link: "https://khamsat.com/user/belalnajy/reviews/1094120" },
  {
    key: 'aseel_a',
    name: "أصيل ا.",
    date: '2026-04-18',
    // The Mostaql account is closed, so this one keeps the review and drops
    // the profile link rather than pointing at a dead page.
    platform: null,
    link: null,
    categories: ["الاحترافية بالتعامل", "التواصل والمتابعة", "جودة العمل المسلّم", "الخبرة بمجال المشروع", "التسليم في الموعد", "التعامل معه مرّة أخرى"],
  },
  { key: 'amal_a', name: "أمل ا.", date: '2026-03-18', platform: "Khamsat", link: "https://khamsat.com/user/belalnajy/reviews/1087342" },
  { key: 'ahmed_a', name: "احمد ا.", date: '2026-03-18', platform: "Khamsat", link: "https://khamsat.com/user/belalnajy/reviews/1118973" },
  { key: 'royal_eagles', name: "Royal Eagles L", date: '2026-03-16', platform: "Khamsat", link: "https://khamsat.com/user/belalnajy/reviews/1125347" },
  { key: 'nouf_a', name: "نوف ع.", date: '2026-02-28', platform: "Khamsat", link: "https://khamsat.com/user/belalnajy/reviews/1122834" },
  { key: 'ahmed_e', name: "Ahmed E.", date: '2026-01-18', platform: "Khamsat", link: "https://khamsat.com/user/belalnajy/reviews/1072456" },
];

// How far (px) or how fast (px/s) a horizontal swipe on the review card has
// to go before it changes the review; anything less springs back.
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 500;

const Stars = ({ className = '' }) => (
  <span className="flex items-center gap-0.5" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => (
      <FaStar key={i} className={`text-[rgb(var(--accent-vivid))] ${className}`} />
    ))}
  </span>
);

/**
 * One review as a plain card: the phone layout of /testimonials, where every
 * review is listed instead of picked one at a time.
 */
const ReviewCard = ({ item, t }) => (
  <li className="m-card text-start">
    <div className="flex items-center justify-between gap-3 mb-3">
      <span role="img" aria-label={`${item.rating}/5`}>
        <Stars className="text-sm" />
      </span>
      <span className="text-xs text-[rgb(var(--muted-foreground))] whitespace-nowrap">{item.date}</span>
    </div>
    <p className="type-body text-[rgb(var(--foreground))]">{item.text}</p>
    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[rgb(var(--border-subtle))]">
      <span aria-hidden="true" className="shrink-0 w-10 h-10 rounded-full bg-[rgb(var(--primary))]/12 text-[rgb(var(--primary))] flex items-center justify-center font-bold">
        {item.name.charAt(0)}
      </span>
      <div className="min-w-0 flex-1">
        <p dir="auto" className="font-semibold text-[rgb(var(--foreground))] leading-tight text-start">
          <bdi dir="auto" lang={scriptLang(item.name)}>{item.name}</bdi>
        </p>
        {item.role && <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5 truncate">{item.role}</p>}
      </div>
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('testimonials.view_review', { platform: item.platform })}
          className="press shrink-0 inline-flex items-center gap-1.5 min-h-[44px] px-3 -me-3 text-xs font-semibold text-[rgb(var(--primary))]">
          <span lang="en" className="uppercase tracking-wide">{item.platform}</span>
          <FaExternalLinkAlt aria-hidden="true" className="text-[10px]" />
        </a>
      )}
    </div>
  </li>
);

/**
 * `variant="page"`: on /testimonials the page's own h1 and subtitle introduce
 * the reviews, so the section heading is left out (it used to say the same
 * thing twice, one under the other); the rating summary stays. Below md the
 * page lists every review as a card instead of the one-at-a-time picker.
 */
const Testimonials = ({ variant = 'section' }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);
  // +1 when the last move went forward, -1 back: the cards slide that way.
  const [direction, setDirection] = useState(1);
  // Swiping the card is for touch screens; a mouse keeps the arrows and dots
  // (and can still select the review's text).
  const [canSwipe, setCanSwipe] = useState(false);
  useEffect(() => {
    setCanSwipe(window.matchMedia('(pointer: coarse)').matches);
  }, []);
  // The page is statically prerendered, so "x days ago" can only be resolved on
  // the client. Until then we show the absolute month, which is identical in
  // both renders and never wrong.
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  const testimonials = useMemo(() => {
    const formatAbsolute = (isoDate) =>
      new Date(`${isoDate}T00:00:00Z`).toLocaleDateString(
        // Western digits in Arabic too (`-u-nu-latn`), as everywhere on the site.
        isArabic ? 'ar-EG-u-nu-latn' : 'en-US',
        { month: 'short', year: 'numeric', timeZone: 'UTC' },
      );

    const formatRelative = (isoDate) => {
      if (now === null) return formatAbsolute(isoDate);

      const days = Math.max(
        1,
        Math.floor((now - new Date(`${isoDate}T00:00:00Z`).getTime()) / 86_400_000),
      );
      if (days < 30) return t('testimonials.time.days', { count: days });

      const months = Math.floor(days / 30);
      if (months < 12) {
        if (months === 1) return t('testimonials.time.month_one');
        // Arabic switches from "أشهر" to "شهراً" at 11.
        return months >= 11
          ? t('testimonials.time.months_many', { count: months })
          : t('testimonials.time.months', { count: months });
      }

      const years = Math.floor(months / 12);
      return years === 1
        ? t('testimonials.time.year_one')
        : t('testimonials.time.years', { count: years });
    };

    const items = t('testimonials.items', { returnObjects: true });

    return TESTIMONIALS_CONFIG.map((conf, index) => ({
      id: index + 1,
      rating: 5,
      company: SERVICE_TITLE,
      categories: KHAMSAT_CATEGORIES,
      ...conf,
      ...(items[conf.key] || {}),
      date: formatRelative(conf.date),
    })).map((item) => ({
      ...item,
      categories: isArabic
        ? item.categories
        : item.categories.map((c) => CATEGORY_EN[c] || c),
    }));
  }, [t, now, isArabic]);

  const goTo = (index, dir) => {
    setDirection(dir ?? (index >= activeIndex ? 1 : -1));
    setActiveIndex(index);
  };

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // A swipe toward the start of the reading direction moves forward: left in
  // English, right in Arabic.
  const handleDragEnd = (_, { offset, velocity }) => {
    const forward = isArabic ? 1 : -1;
    if (offset.x * forward > SWIPE_DISTANCE || velocity.x * forward > SWIPE_VELOCITY) nextTestimonial();
    else if (offset.x * forward < -SWIPE_DISTANCE || velocity.x * forward < -SWIPE_VELOCITY) prevTestimonial();
  };

  // Keep the phone's reviewer rail on the current review: after a swipe or an
  // arrow the matching chip is scrolled into the middle of the rail. The rail
  // alone moves (never the page), and not on the first render.
  const railRef = useRef(null);
  const railMoved = useRef(false);
  useEffect(() => {
    const rail = railRef.current;
    if (!railMoved.current) {
      railMoved.current = true;
      return;
    }
    if (!rail || rail.offsetParent === null) return;
    const chip = rail.children[activeIndex];
    if (!chip) return;
    const railBox = rail.getBoundingClientRect();
    const chipBox = chip.getBoundingClientRect();
    const delta = chipBox.left + chipBox.width / 2 - (railBox.left + railBox.width / 2);
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    rail.scrollBy({ left: delta, behavior: smooth ? 'smooth' : 'auto' });
  }, [activeIndex]);

  // Forward slides toward the reading start: the next card comes in from the
  // end side (right in English, left in Arabic) and the old one leaves the
  // other way; going back mirrors it.
  const side = isArabic ? -1 : 1;
  const slide = {
    enter: (dir) => ({ opacity: 0, x: 80 * dir * side }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: -80 * dir * side }),
  };

  const renderStars = rating => {
    return [...Array(5)].map((_, index) =>
      <FaStar
        key={index}
        className={`${index < rating
          ? "text-[rgb(var(--accent))]"
          : "text-[rgb(var(--muted-foreground))]"} transition-colors`}
      />
    );
  };

  const active = testimonials[activeIndex];
  const isPage = variant === 'page';

  return (
    <section
      id="testimonials"
      className={`${isPage ? 'pt-8 pb-20 max-md:pb-10' : 'm-section m-band'} relative text-start`}>
      <div className="shell relative z-10">
        {!isPage && (
          <SectionHeading
            className="max-w-6xl mx-auto mb-6 md:mb-8"
            eyebrow={t('mHome.eyebrow.testimonials')}
            title={t('testimonials.title')}
            subtitle={t('testimonials.subtitle')}
          />
        )}
        <Reveal y={20} duration={0.5}
          className="max-w-6xl mx-auto">
          <div className="flex items-center gap-x-6 gap-y-3 max-md:gap-x-3 flex-wrap max-md:text-sm">
            <div className="flex items-center gap-2">
              {/* Phones: one star and the score, so the summary fits one line;
                  the card below shows all five. */}
              <div className="flex gap-1 max-md:gap-0.5">
                {[...Array(5)].map((_, i) =>
                  <FaStar key={i} className={`text-[rgb(var(--accent))] text-xl max-md:text-base ${i > 0 ? 'max-md:hidden' : ''}`} />
                )}
              </div>
              <span className="text-[rgb(var(--foreground))] font-bold text-lg max-md:text-base">
                5.0
              </span>
            </div>
            <div className="h-6 max-md:h-4 w-px bg-[rgb(var(--border))]" />
            <div className="text-[rgb(var(--muted-foreground))]">
              <span className="font-semibold text-[rgb(var(--foreground))]">100%</span> {t('testimonials.positive_reviews')}
            </div>
            <div className="h-6 max-md:h-4 w-px bg-[rgb(var(--border))]" />
            <div className="text-[rgb(var(--muted-foreground))]">
              <span className="font-semibold text-[rgb(var(--foreground))]">{testimonials.length}</span> {t('testimonials.reviews_count')}
            </div>
          </div>
        </Reveal>

        {/* /testimonials on a phone: every review, one under the other. */}
        {isPage && (
          <ul className="md:hidden mt-6 space-y-3">
            {testimonials.map((item) => (
              <ReviewCard key={item.key} item={item} t={t} />
            ))}
          </ul>
        )}

        <Reveal y={20} duration={0.5} delay={0.3}
          className={`mt-10 max-md:mt-6 max-w-6xl mx-auto ${isPage ? 'max-md:hidden' : ''}`}>
          <div className="relative">
            {/* initial={false}: the first card is simply there in the server
                HTML (it used to slide in at page load, far below the fold,
                and stayed invisible without JavaScript); switching cards
                still slides. */}
            {/* Polite live region: the review that replaces the current one
                is read out after a press of previous, next or a dot. */}
            <div aria-live="polite">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <m.div
                key={activeIndex}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                // Phones: the card follows the finger and springs back unless
                // the swipe went far or fast enough (handleDragEnd).
                drag={canSwipe ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.22}
                onDragEnd={handleDragEnd}
                className="glass-card m-card max-md:shadow-[var(--elev-2)]! p-5 sm:p-8 md:p-12 rounded-2xl relative overflow-hidden">
                <div aria-hidden="true" className={`absolute top-6 start-6 max-md:top-4 max-md:end-4 max-md:start-auto ${isArabic ? '-scale-x-100' : ''} text-[rgb(var(--primary))]/10`}>
                  <FaQuoteLeft className="text-7xl lg:text-9xl max-md:text-4xl" />
                </div>

                <div className="relative z-10">
                  <div
                    role="img"
                    aria-label={`${active.rating}/5`}
                    className="flex items-center gap-1 mb-6 max-md:mb-7 justify-start">
                    {renderStars(active.rating)}
                  </div>

                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[rgb(var(--foreground))] leading-relaxed mb-6 sm:mb-8 max-md:mb-5 md:italic font-medium max-md:font-normal text-start max-md:text-[1.0625rem] max-md:leading-[1.65] rtl:max-md:leading-[1.85]">
                    "{active.text}"
                  </p>

                  {active.categories &&
                    // Phones skip the rating chips: the same three on nearly
                    // every review, three rows tall at 390px.
                    <div className="flex flex-wrap gap-2 mb-8 max-md:hidden justify-start">
                      {active.categories.map((category, idx) =>
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgb(var(--primary))]/5 text-[rgb(var(--foreground))] text-xs border border-[rgb(var(--border))]">
                          <FaStar aria-hidden="true" className="text-[10px] text-[rgb(var(--accent-vivid))]" /> {category}
                        </span>
                      )}
                    </div>
                  }

                  {active.link && active.link !== "#" &&
                    <m.a
                      href={active.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      // An outline button: the page's filled copper is for
                      // its one primary action, getting in touch.
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] px-5 mb-10 max-md:mb-5 rounded-xl border border-[rgb(var(--primary))]/40 text-[rgb(var(--primary))] text-sm font-semibold hover:bg-[rgb(var(--primary))]/10 transition-colors">
                      <FaExternalLinkAlt aria-hidden="true" className="text-xs" />
                      <span>
                        {t('testimonials.view_review', { platform: active.platform })}
                      </span>
                    </m.a>
                  }

                  <div className="flex items-center gap-6 max-md:gap-3 flex-col max-md:items-stretch md:flex-row md:justify-between border-t border-[rgb(var(--border))]/50 pt-8 max-md:pt-4">
                    <div className="flex items-center gap-4 max-md:gap-3 text-start">
                      <div aria-hidden="true" className="w-16 h-16 max-md:w-11 max-md:h-11 shrink-0 rounded-2xl max-md:rounded-full bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--primary))]/60 flex items-center justify-center text-[rgb(var(--accent-contrast))] text-2xl max-md:text-lg font-bold shadow-lg max-md:shadow-none shadow-[rgb(var(--primary))]/20">
                        {active.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[rgb(var(--foreground))] text-xl max-md:text-base mb-1 max-md:mb-0">
                          <bdi dir="auto" lang={scriptLang(active.name)}>
                            {active.name}
                          </bdi>
                        </p>
                        <p className="text-[rgb(var(--muted-foreground))] text-sm max-md:text-xs font-medium">
                          {active.role}
                        </p>
                        <p className="text-[rgb(var(--muted-foreground))] text-xs mt-1 max-md:hidden">
                          <bdi dir="auto" lang={scriptLang(active.company)}>
                            {active.company}
                          </bdi>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 max-md:gap-2 max-md:ps-14">
                      {active.platform && (
                        <span lang="en" className="px-5 py-2 max-md:px-2.5 max-md:py-0.5 rounded-xl max-md:rounded-full bg-[rgb(var(--card))]/5 text-[rgb(var(--primary))] text-sm max-md:text-xs font-bold border border-[rgb(var(--border))] tracking-wide uppercase">
                          {active.platform}
                        </span>
                      )}
                      <span className="text-[rgb(var(--muted-foreground))] text-sm max-md:text-xs font-medium whitespace-nowrap">
                        {active.date}
                      </span>
                    </div>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
            </div>

            {/* The row follows the document direction: in Arabic "previous"
                is on the right and points right. Phones show the position
                ("3 / 11") between the arrows instead of the dots. */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-10 max-md:mt-4 max-md:justify-between">
              <m.button
                whileHover={{ scale: 1.1, x: isArabic ? 5 : -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                type="button"
                className="shrink-0 w-14 h-14 max-md:w-12 max-md:h-12 rounded-2xl max-md:rounded-full bg-[rgb(var(--card))] border border-[rgb(var(--border))] flex items-center justify-center text-[rgb(var(--foreground))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--accent-contrast))] transition-all shadow-xl max-md:shadow-[var(--elev-1)]"
                aria-label={t('a11y.review_prev')}>
                <FaChevronLeft className={isArabic ? 'rotate-180' : ''} />
              </m.button>

              <p className="sm:hidden font-display text-sm font-semibold tabular-nums text-[rgb(var(--muted-foreground))]" dir="ltr" aria-hidden="true">
                <span className="text-[rgb(var(--foreground))]">{activeIndex + 1}</span>
                {' / '}
                {testimonials.length}
              </p>

              {/* Dots from sm up. Eleven of them do not fit beside the arrows
                  on a phone (they squeezed the arrows off-screen), and the
                  reviewer cards below already jump to any review. */}
              <div className="hidden sm:flex items-center gap-1">
                {testimonials.map((_, index) =>
                  <button
                    key={index}
                    type="button"
                    onClick={() => goTo(index)}
                    className="group/dot h-11 min-w-6 px-2 flex items-center justify-center"
                    aria-current={index === activeIndex ? 'true' : undefined}
                    aria-label={t('a11y.review_n', { n: index + 1, count: testimonials.length })}
                  >
                    <span
                      className={`block h-2 rounded-full transition-all duration-300 ${index === activeIndex
                        ? "bg-[rgb(var(--primary))] w-10 shadow-lg"
                        : "bg-[rgb(var(--muted))] w-2 group-hover/dot:bg-[rgb(var(--muted-foreground))]"}`}
                    />
                  </button>
                )}
              </div>

              <m.button
                whileHover={{ scale: 1.1, x: isArabic ? -5 : 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                type="button"
                className="shrink-0 w-14 h-14 max-md:w-12 max-md:h-12 rounded-2xl max-md:rounded-full bg-[rgb(var(--card))] border border-[rgb(var(--border))] flex items-center justify-center text-[rgb(var(--foreground))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--accent-contrast))] transition-all shadow-xl max-md:shadow-[var(--elev-1)]"
                aria-label={t('a11y.review_next')}>
                <FaChevronRight className={isArabic ? 'rotate-180' : ''} />
              </m.button>
            </div>
          </div>

          {/* Phones: the reviewers as a rail of avatar chips, one row that
              scrolls sideways, instead of an eleven-card grid that filled a
              screen and a half. */}
          <div
            ref={railRef}
            role="group"
            aria-label={t('mHome.reviewers')}
            className="md:hidden m-rail mt-5 pt-1 pb-1">
            {testimonials.map((testimonial, index) => {
              const current = index === activeIndex;
              return (
                <button
                  key={testimonial.id}
                  type="button"
                  aria-current={current ? 'true' : undefined}
                  onClick={() => goTo(index)}
                  className="press w-16 flex flex-col items-center gap-1.5 py-1 rounded-xl">
                  <span
                    aria-hidden="true"
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold transition-colors duration-200 ${current
                      ? 'bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))] ring-2 ring-[rgb(var(--primary))]/35 ring-offset-2 ring-offset-[rgb(var(--background))]'
                      : 'bg-[rgb(var(--surface))] text-[rgb(var(--primary))] border border-[rgb(var(--border-subtle))]'}`}>
                    {testimonial.name.charAt(0)}
                  </span>
                  <span dir="auto" className={`w-full text-xs text-center truncate ${current ? 'font-semibold text-[rgb(var(--foreground))]' : 'text-[rgb(var(--muted-foreground))]'}`}>
                    <bdi dir="auto" lang={scriptLang(testimonial.name)}>{testimonial.name}</bdi>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="max-md:hidden grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-16">
            {testimonials.map((testimonial, index) =>
              <m.button
                key={testimonial.id}
                type="button"
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => goTo(index)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-2xl transition-all duration-300 group ${index === activeIndex
                  ? "bg-[rgb(var(--primary))]/10 border-2 border-[rgb(var(--primary))] shadow-lg shadow-[rgb(var(--primary))]/10"
                  : "glass-card border border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/30 hover:bg-[rgb(var(--primary))]/5"}`}>
                <div aria-hidden="true" className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-lg font-bold mb-3 transition-colors ${index === activeIndex 
                  ? 'bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))]' 
                  : 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] group-hover:bg-[rgb(var(--primary))]/20'}`}>
                  {testimonial.name.charAt(0)}
                </div>
                <p className="text-xs text-[rgb(var(--foreground))] font-bold text-center truncate mb-1">
                  <bdi dir="auto" lang={scriptLang(testimonial.name)}>{testimonial.name}</bdi>
                </p>
                <p lang="en" className="text-[11px] text-[rgb(var(--muted-foreground))] text-center truncate uppercase">
                  {testimonial.platform || '\u00A0'}
                </p>
              </m.button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;
