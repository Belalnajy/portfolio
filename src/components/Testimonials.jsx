"use client";
import { useState, useMemo, useEffect } from "react";
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

/**
 * `variant="page"`: on /testimonials the page's own h1 and subtitle introduce
 * the reviews, so the section heading is left out (it used to say the same
 * thing twice, one under the other); the rating summary stays.
 */
const Testimonials = ({ variant = 'section' }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);
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

  const nextTestimonial = () => {
    setActiveIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    );
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

  return (
    <section id="testimonials" className={`${variant === 'page' ? 'pt-8 pb-20' : 'py-20'} relative text-start`}>
      <div className="container mx-auto px-6 relative z-10">
        {variant !== 'page' && (
          <SectionHeading
            className="max-w-6xl mx-auto mb-6 md:mb-8"
            title={t('testimonials.title')}
            subtitle={t('testimonials.subtitle')}
          />
        )}
        <Reveal y={20} duration={0.5}
          className="max-w-6xl mx-auto">
          <div className="flex items-center gap-x-6 gap-y-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) =>
                  <FaStar key={i} className="text-[rgb(var(--accent))] text-xl" />
                )}
              </div>
              <span className="text-[rgb(var(--foreground))] font-bold text-lg">
                5.0
              </span>
            </div>
            <div className="h-6 w-px bg-[rgb(var(--border))]" />
            <div className="text-[rgb(var(--muted-foreground))]">
              <span className="font-semibold text-[rgb(var(--foreground))]">100%</span> {t('testimonials.positive_reviews')}
            </div>
            <div className="h-6 w-px bg-[rgb(var(--border))]" />
            <div className="text-[rgb(var(--muted-foreground))]">
              <span className="font-semibold text-[rgb(var(--foreground))]">{testimonials.length}</span> {t('testimonials.reviews_count')}
            </div>
          </div>
        </Reveal>

        <Reveal y={20} duration={0.5} delay={0.3}
          className="mt-10 max-w-6xl mx-auto">
          <div className="relative">
            {/* initial={false}: the first card is simply there in the server
                HTML (it used to slide in at page load, far below the fold,
                and stayed invisible without JavaScript); switching cards
                still slides. */}
            {/* Polite live region: the review that replaces the current one
                is read out after a press of previous, next or a dot. */}
            <div aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={activeIndex}
                initial={{ opacity: 0, x: isArabic ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isArabic ? 100 : -100 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-5 sm:p-8 md:p-12 rounded-2xl relative overflow-hidden">
                <div aria-hidden="true" className={`absolute top-6 start-6 ${isArabic ? '-scale-x-100' : ''} text-[rgb(var(--primary))]/10`}>
                  <FaQuoteLeft className="text-7xl lg:text-9xl" />
                </div>

                <div className="relative z-10">
                  <div
                    role="img"
                    aria-label={`${testimonials[activeIndex].rating}/5`}
                    className="flex items-center gap-1 mb-6 justify-center md:justify-start">
                    {renderStars(testimonials[activeIndex].rating)}
                  </div>

                  <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-[rgb(var(--foreground))] leading-relaxed mb-6 sm:mb-8 italic font-medium text-center md:text-start`}>
                    "{testimonials[activeIndex].text}"
                  </p>

                  {testimonials[activeIndex].categories &&
                    <div className={`flex flex-wrap gap-2 mb-8 justify-center md:justify-start`}>
                      {testimonials[activeIndex].categories.map((category, idx) =>
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-[rgb(var(--primary))]/5 text-[rgb(var(--foreground))] text-xs border border-[rgb(var(--border))]">
                          <span aria-hidden="true">⭐</span> {category}
                        </span>
                      )}
                    </div>
                  }

                  {testimonials[activeIndex].link && testimonials[activeIndex].link !== "#" &&
                    <m.a
                      href={testimonials[activeIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      // An outline button: the page's filled copper is for
                      // its one primary action, getting in touch.
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] px-5 mb-10 rounded-xl border border-[rgb(var(--primary))]/40 text-[rgb(var(--primary))] text-sm font-semibold hover:bg-[rgb(var(--primary))]/10 transition-colors">
                      <FaExternalLinkAlt aria-hidden="true" className="text-xs" />
                      <span>
                        {t('testimonials.view_review', { platform: testimonials[activeIndex].platform })}
                      </span>
                    </m.a>
                  }

                  <div className={`flex items-center gap-6 flex-col md:flex-row md:justify-between border-t border-[rgb(var(--border))]/50 pt-8`}>
                    <div className="flex items-center gap-4 text-start">
                      <div aria-hidden="true" className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--primary))]/60 flex items-center justify-center text-[rgb(var(--accent-contrast))] text-2xl font-bold shadow-lg shadow-[rgb(var(--primary))]/20">
                        {testimonials[activeIndex].name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-[rgb(var(--foreground))] text-xl mb-1">
                          <bdi lang={scriptLang(testimonials[activeIndex].name)}>
                            {testimonials[activeIndex].name}
                          </bdi>
                        </p>
                        <p className="text-[rgb(var(--muted-foreground))] text-sm font-medium">
                          {testimonials[activeIndex].role}
                        </p>
                        <p className="text-[rgb(var(--muted-foreground))] text-xs mt-1">
                          <bdi lang={scriptLang(testimonials[activeIndex].company)}>
                            {testimonials[activeIndex].company}
                          </bdi>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {testimonials[activeIndex].platform && (
                        <span lang="en" className="px-5 py-2 rounded-xl bg-[rgb(var(--card))]/5 text-[rgb(var(--primary))] text-sm font-bold border border-[rgb(var(--border))] tracking-wide uppercase">
                          {testimonials[activeIndex].platform}
                        </span>
                      )}
                      <span className="text-[rgb(var(--muted-foreground))] text-sm font-medium whitespace-nowrap">
                        {testimonials[activeIndex].date}
                      </span>
                    </div>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
            </div>

            {/* The row follows the document direction: in Arabic "previous"
                is on the right and points right. */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-10">
              <m.button
                whileHover={{ scale: 1.1, x: isArabic ? 5 : -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                type="button"
                className="shrink-0 w-14 h-14 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] flex items-center justify-center text-[rgb(var(--foreground))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--accent-contrast))] transition-all shadow-xl"
                aria-label={t('a11y.review_prev')}>
                <FaChevronLeft className={isArabic ? 'rotate-180' : ''} />
              </m.button>

              {/* Dots from sm up. Eleven of them do not fit beside the arrows
                  on a phone (they squeezed the arrows off-screen), and the
                  reviewer cards below already jump to any review. */}
              <div className="hidden sm:flex items-center gap-1">
                {testimonials.map((_, index) =>
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
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
                className="shrink-0 w-14 h-14 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] flex items-center justify-center text-[rgb(var(--foreground))] hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--accent-contrast))] transition-all shadow-xl"
                aria-label={t('a11y.review_next')}>
                <FaChevronRight className={isArabic ? 'rotate-180' : ''} />
              </m.button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-16">
            {testimonials.map((testimonial, index) =>
              <m.button
                key={testimonial.id}
                type="button"
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => setActiveIndex(index)}
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
                  <bdi lang={scriptLang(testimonial.name)}>{testimonial.name}</bdi>
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
