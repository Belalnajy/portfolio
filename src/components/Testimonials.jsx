import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
} from "react-icons/fa";
import PlatformLinks from "./PlatformLinks";
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = useMemo(() => {
    const items = t('testimonials.items', { returnObjects: true });
    const config = [
      { id: 1, name: "Ahmed E.", company: "تصميم وتطوير موقع ويب كامل واحترافي | Full Stack Web", platform: "Khamsat", rating: 5, link: "https://khamsat.com/user/belalnajy/reviews/1072456", categories: ["جودة الخدمة", "التواصل والمتابعة", "التسليم بالموعد"] },
      { id: 2, name: "أمل ا.", company: "تصميم وتطوير موقع ويب كامل واحترافي | Full Stack Web", platform: "Khamsat", rating: 5, link: "https://khamsat.com/user/belalnajy/reviews/1087342", categories: ["جودة الخدمة", "التواصل والمتابعة", "التسليم بالموعد"] },
      { id: 3, name: "Ahmed Y.", company: "تصميم وتطوير موقع ويب كامل واحترافي | Full Stack Web", platform: "Khamsat", rating: 5, link: "https://khamsat.com/user/belalnajy/reviews/1094120", categories: ["جودة الخدمة", "التواصل والمتابعة", "التسليم بالموعد"] },
      { id: 4, name: "أصيل ا.", company: "تصميم وتطوير موقع ويب كامل واحترافي | Full Stack Web", platform: "Mostaql", rating: 5, link: "https://mostaql.com/u/Belalnagy/reviews/9112354", categories: ["الاحترافية بالتعامل", "التواصل والمتابعة", "جودة العمل المسلّم", "الخبرة بمجال المشروع", "التسليم في الموعد", "التعامل معه مرّة أخرى"] },
      { id: 5, name: "Abo M.", company: "تصميم وتطوير موقع ويب كامل واحترافي | Full Stack Web", platform: "Khamsat", rating: 5, link: "https://khamsat.com/user/belalnajy/reviews/1095137", categories: ["جودة الخدمة", "التواصل والمتابعة", "التسليم بالموعد"] },
      { id: 6, name: "Royal Eagles L", company: "تصميم وتطوير موقع ويب كامل واحترافي | Full Stack Web", platform: "Khamsat", rating: 5, link: "https://khamsat.com/user/belalnajy/reviews/1125347", categories: ["جودة الخدمة", "التواصل والمتابعة", "التسليم بالموعد"] },
      { id: 7, name: "نوف ع.", company: "تصميم وتطوير موقع ويب كامل واحترافي | Full Stack Web", platform: "Khamsat", rating: 5, link: "https://khamsat.com/user/belalnajy/reviews/1122834", categories: ["جودة الخدمة", "التواصل والمتابعة", "التسليم بالموعد"] },
      { id: 8, name: "احمد ا.", company: "تصميم وتطوير موقع ويب كامل واحترافي | Full Stack Web", platform: "Khamsat", rating: 5, link: "https://khamsat.com/user/belalnajy/reviews/1118973", categories: ["جودة الخدمة", "التواصل والمتابعة", "التسليم بالموعد"] },
    ];

    const keys = Object.keys(items);
    return config.map((conf, index) => ({
      ...conf,
      ...items[keys[index]]
    }));
  }, [t]);

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
          ? "text-yellow-400"
          : "text-gray-400"} transition-colors`}
      />
    );
  };

  return (
    <section id="testimonials" className="py-20 relative text-start">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            {t('testimonials.title')}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg mb-4 leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) =>
                  <FaStar key={i} className="text-yellow-400 text-xl" />
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: isArabic ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isArabic ? 100 : -100 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-8 md:p-12 rounded-2xl relative overflow-hidden">
                <div className={`absolute top-6 ${isArabic ? 'right-6 rotate-180' : 'left-6'} text-[rgb(var(--primary))]/10`}>
                  <FaQuoteLeft className="text-7xl lg:text-9xl" />
                </div>

                <div className="relative z-10">
                  <div className={`flex items-center gap-1 mb-6 justify-center md:justify-start`}>
                    {renderStars(testimonials[activeIndex].rating)}
                  </div>

                  <p className={`text-lg md:text-xl lg:text-2xl text-[rgb(var(--foreground))] leading-relaxed mb-8 italic font-medium text-center md:text-start`}>
                    "{testimonials[activeIndex].text}"
                  </p>

                  {testimonials[activeIndex].categories &&
                    <div className={`flex flex-wrap gap-2 mb-8 justify-center md:justify-start`}>
                      {testimonials[activeIndex].categories.map((category, idx) =>
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-[rgb(var(--primary))]/5 text-[rgb(var(--foreground))] text-xs border border-[rgb(var(--primary))]/10">
                          ⭐ {category}
                        </span>
                      )}
                    </div>
                  }

                  {testimonials[activeIndex].link && testimonials[activeIndex].link !== "#" &&
                    <motion.a
                      href={testimonials[activeIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 mb-10 rounded-xl bg-[rgb(var(--primary))] text-white font-semibold hover:shadow-xl hover:shadow-[rgb(var(--primary))]/40 transition-all`}>
                      <FaExternalLinkAlt />
                      <span>
                        {t('testimonials.view_review', { platform: testimonials[activeIndex].platform })}
                      </span>
                    </motion.a>
                  }

                  <div className={`flex items-center gap-6 flex-col md:flex-row md:justify-between border-t border-[rgb(var(--border))]/50 pt-8`}>
                    <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--primary))]/60 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[rgb(var(--primary))]/20">
                        {testimonials[activeIndex].name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-[rgb(var(--foreground))] text-xl mb-1">
                          {testimonials[activeIndex].name}
                        </h4>
                        <p className="text-[rgb(var(--muted-foreground))] text-sm font-medium">
                          {testimonials[activeIndex].role}
                        </p>
                        <p className="text-[rgb(var(--muted-foreground))]/70 text-xs mt-1">
                          {testimonials[activeIndex].company}
                        </p>
                      </div>
                    </div>

                    <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
                      <span className="px-5 py-2 rounded-xl bg-white/5 text-[rgb(var(--primary))] text-sm font-bold border border-[rgb(var(--primary))]/20 tracking-wide uppercase">
                        {testimonials[activeIndex].platform}
                      </span>
                      <span className="text-[rgb(var(--muted-foreground))] text-sm font-medium whitespace-nowrap">
                        {testimonials[activeIndex].date}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className={`flex items-center justify-center gap-6 mt-10 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <motion.button
                whileHover={{ scale: 1.1, x: isArabic ? 5 : -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="w-14 h-14 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] flex items-center justify-center text-[rgb(var(--foreground))] hover:bg-[rgb(var(--primary))] hover:text-white transition-all shadow-xl"
                aria-label="Previous testimonial">
                <FaChevronLeft className={isArabic ? 'rotate-180' : ''} />
              </motion.button>

              <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                {testimonials.map((_, index) =>
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                      ? "bg-[rgb(var(--primary))] w-10 shadow-lg shadow-[rgb(var(--primary))]/40"
                      : "bg-[rgb(var(--muted))] w-2 hover:bg-[rgb(var(--muted-foreground))]"}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.1, x: isArabic ? -5 : 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="w-14 h-14 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] flex items-center justify-center text-[rgb(var(--foreground))] hover:bg-[rgb(var(--primary))] hover:text-white transition-all shadow-xl"
                aria-label="Next testimonial">
                <FaChevronRight className={isArabic ? 'rotate-180' : ''} />
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-16">
            {testimonials.map((testimonial, index) =>
              <motion.button
                key={testimonial.id}
                onClick={() => setActiveIndex(index)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-2xl transition-all duration-300 group ${index === activeIndex
                  ? "bg-[rgb(var(--primary))]/10 border-2 border-[rgb(var(--primary))] shadow-lg shadow-[rgb(var(--primary))]/10"
                  : "glass-card border border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/30 hover:bg-[rgb(var(--primary))]/5"}`}>
                <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-lg font-bold mb-3 transition-colors ${index === activeIndex 
                  ? 'bg-[rgb(var(--primary))] text-white' 
                  : 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] group-hover:bg-[rgb(var(--primary))]/20'}`}>
                  {testimonial.name.charAt(0)}
                </div>
                <p className={`text-xs text-[rgb(var(--foreground))] font-bold text-center truncate mb-1`}>
                  {testimonial.name}
                </p>
                <p className="text-[10px] text-[rgb(var(--muted-foreground))] text-center truncate uppercase tracking-tighter">
                  {testimonial.platform}
                </p>
              </motion.button>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-24 text-center">
            <h3 className="text-3xl font-bold mb-8 text-[rgb(var(--foreground))] tracking-tight">
              {t('testimonials.follow_me')}
            </h3>
            <PlatformLinks variant="default" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
