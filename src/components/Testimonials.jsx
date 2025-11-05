import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
} from "react-icons/fa";
import PlatformLinks from "./PlatformLinks";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Ahmed E.",
      role: "Client - Khamsat",
      company: "تصميم وتطوير موقع ويب كامل واحترافي | Full Stack Web",
      image: null,
      rating: 5,
      text:
        "الشغل زي ما كنت عايزة بالظبط في وقت مناسب مع آخر تعامل مش بالمهندس بلال إن شاء الله",
      platform: "Khamsat",
      date: "منذ 4 أشهر و9 أيام",
      categories: ["جودة الخدمة", "التواصل والمتابعة", "التسليم بالموعد"],
      link: "https://khamsat.com/user/belalnajy/reviews/1072456", // ضع لينك التقييم هنا
    },
    {
      id: 2,
      name: "أمل ا.",
      role: "Client - Khamsat",
      company: "تصميم وتطوير موقع ويب كامل واحترافي | Full Stack Web",
      image: null,
      rating: 5,
      text:
        "ما شاء الله على السرعة والاستجابة السريعة وسويت المطلوب وأكثر شكراً لك",
      platform: "Khamsat",
      date: "منذ شهرين ويوم",
      categories: ["جودة الخدمة", "التواصل والمتابعة", "التسليم بالموعد"],
      link: "https://khamsat.com/user/belalnajy/reviews/1087342", // ضع لينك التقييم هنا
    },
    {
      id: 3,
      name: "Ahmed Y.",
      role: "Client - Khamsat",
      company: "تصميم وتطوير موقع ويب كامل واحترافي | Full Stack Web",
      image: null,
      rating: 5,
      text: "ممتاز",
      platform: "Khamsat",
      date: "منذ شهر ويوم",
      categories: ["جودة الخدمة", "التواصل والمتابعة", "التسليم بالموعد"],
      link: "https://khamsat.com/user/belalnajy/reviews/1094120", // ضع لينك التقييم هنا
    },
    {
      id: 4,
      name: "أصيل ا.",
      role: "Project Owner - Mostaql",
      company: "تصميم وتطوير موقع ويب كامل واحترافي | Full Stack Web",
      image: null,
      rating: 5,
      text:
        "أخي بلال على مجهودك المبذول، أتشرف بالعمل معك خلال مشاريع مستقبلية أخرى لحسن تعاملك وأنصح كل شخص بالتعامل معك. عمله متقن وممتاز وأشكرك.",
      platform: "Mostaql",
      date: "منذ شهر و9 أيام",
      categories: [
        "الاحترافية بالتعامل",
        "التواصل والمتابعة",
        "جودة العمل المسلّم",
        "الخبرة بمجال المشروع",
        "التسليم في الموعد",
        "التعامل معه مرّة أخرى",
      ],
      link: "https://mostaql.com/u/Belalnagy/reviews/9112354", // ضع لينك التقييم هنا
    },
    {
      id: 5,
      name: "Abo M.",
      role: "Client - Khamsat",
      company: "تصميم وتطوير موقع ويب كامل واحترافي | Full Stack Web",
      text: "شكرا لكم على جهودكم",
      image: null,
      rating: 5,
      platform: "Khamsat",
      date: "منذ 27 يوم وساعة",
      categories: ["جودة الخدمة", "التواصل والمتابعة", "التسليم بالموعد"],
      link: "https://khamsat.com/user/belalnajy/reviews/1095137", // ضع لينك التقييم هنا
    },
    // {
    //   id: 6,
    //   name: "Sara Ahmed",
    //   role: "Student - ITI",
    //   company: "Information Technology Institute",
    //   image: null,
    //   rating: 5,
    //   text:
    //     "Best instructor I've ever had! His teaching style is clear and practical. He made complex topics easy to understand and always encouraged us to ask questions.",
    //   platform: "ITI",
    //   date: "2024",
    //   categories: ["جودة التعليم", "التواصل والمتابعة", "التسليم بالموعد"],
    // },
    // {
    //   id: 7,
    //   name: "Fatima Hassan",
    //   role: "Student - ITI",
    //   company: "Front-End Development Course",
    //   image: null,
    //   rating: 5,
    //   text:
    //     "Very patient and knowledgeable instructor. He explained everything step by step and provided real-world examples. I learned so much in his course!",
    //   platform: "ITI",
    //   date: "2024",
    //   categories: ["جودة التعليم", "التواصل والمتابعة", "التسليم بالموعد"],
    // },
    // {
    //   id: 8,
    //   name: "Omar Ibrahim",
    //   role: "Student - ITI",
    //   company: "Full Stack Development",
    //   image: null,
    //   rating: 5,
    //   text:
    //     "One of the best teachers! He doesn't just teach theory, but shows us how to apply it in real projects. His feedback was always helpful and constructive.",
    //   platform: "ITI",
    //   date: "2024",
    //   categories: ["جودة التعليم", "التواصل والمتابعة", "التسليم بالموعد"],
    // },
  ];

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
    <section id="testimonials" className="py-20 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            What People Say
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg mb-4">
            Feedback from clients, students, and colleagues I've worked with
          </p>
          {/* Rating Summary */}
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
              <span className="font-semibold text-[rgb(var(--foreground))]">100%</span> Positive Reviews
            </div>
            <div className="h-6 w-px bg-[rgb(var(--border))]" />
            <div className="text-[rgb(var(--muted-foreground))]">
              <span className="font-semibold text-[rgb(var(--foreground))]">{testimonials.length}</span> Reviews
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center">
          {/* Main Testimonial Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-8 md:p-12 rounded-2xl relative">
                {/* Quote Icon */}
                <div className="absolute top-6 left-6 text-[rgb(var(--primary))]/20">
                  <FaQuoteLeft className="text-5xl" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6 justify-center md:justify-start">
                    {renderStars(testimonials[activeIndex].rating)}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-lg md:text-xl text-[rgb(var(--foreground))] leading-relaxed mb-6 text-center md:text-left">
                    "{testimonials[activeIndex].text}"
                  </p>

                  {/* Rating Categories (if available) */}
                  {testimonials[activeIndex].categories &&
                    <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                      {testimonials[
                        activeIndex
                      ].categories.map((category, idx) =>
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-[rgb(var(--muted))]/50 text-[rgb(var(--foreground))] text-xs border border-[rgb(var(--border))]">
                          ⭐ {category}
                        </span>
                      )}
                    </div>
                    }


                  {/* View Review Link - Themed */}
                  {testimonials[activeIndex].link &&
                    testimonials[activeIndex].link !== "#" &&
                    <motion.a
                      href={testimonials[activeIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 mb-6 rounded-xl bg-[rgb(var(--primary))] text-white font-semibold hover:shadow-xl hover:shadow-[rgb(var(--primary))]/40 transition-all">
                      <FaExternalLinkAlt />
                      <span>
                        View Full Review on{" "}
                        {testimonials[activeIndex].platform}
                      </span>
                    </motion.a>}

                  {/* Author Info */}
                  <div className="flex items-center gap-4 flex-col md:flex-row md:justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-full bg-[rgb(var(--primary))]/10 flex items-center justify-center text-[rgb(var(--primary))] text-xl font-bold border-2 border-[rgb(var(--primary))]/20">
                        {testimonials[activeIndex].name.charAt(0)}
                      </div>

                      {/* Details */}
                      <div className="text-center md:text-left">
                        <h4 className="font-bold text-[rgb(var(--foreground))] text-lg">
                          {testimonials[activeIndex].name}
                        </h4>
                        <p className="text-[rgb(var(--muted-foreground))] text-sm">
                          {testimonials[activeIndex].role}
                        </p>
                        <p className="text-[rgb(var(--muted-foreground))] text-xs">
                          {testimonials[activeIndex].company}
                        </p>
                      </div>
                    </div>

                    {/* Platform Badge */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-4 py-2 rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] text-sm font-medium border border-[rgb(var(--primary))]/20">
                        {testimonials[activeIndex].platform}
                      </span>
                      <span className="text-[rgb(var(--muted-foreground))] text-sm">
                        {testimonials[activeIndex].date}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-[rgb(var(--card))] border border-[rgb(var(--border))] flex items-center justify-center text-[rgb(var(--foreground))] hover:bg-[rgb(var(--primary))] hover:text-white transition-all shadow-lg"
                aria-label="Previous testimonial">
                <FaChevronLeft />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) =>
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index ===
                    activeIndex
                      ? "bg-[rgb(var(--primary))] w-8"
                      : "bg-[rgb(var(--muted))]"}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-[rgb(var(--card))] border border-[rgb(var(--border))] flex items-center justify-center text-[rgb(var(--foreground))] hover:bg-[rgb(var(--primary))] hover:text-white transition-all shadow-lg"
                aria-label="Next testimonial">
                <FaChevronRight />
              </motion.button>
            </div>
          </div>

          {/* Thumbnails Grid (Optional - shows all testimonials) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
            {testimonials.map((testimonial, index) =>
              <motion.button
                key={testimonial.id}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl transition-all ${index ===
                activeIndex
                  ? "bg-[rgb(var(--primary))]/10 border-2 border-[rgb(var(--primary))]"
                  : "glass-card border border-[rgb(var(--border))]"}`}>
                <div className="w-12 h-12 mx-auto rounded-full bg-[rgb(var(--primary))]/10 flex items-center justify-center text-[rgb(var(--primary))] text-lg font-bold border-2 border-[rgb(var(--primary))]/20 mb-2">
                  {testimonial.name.charAt(0)}
                </div>
                <p className="text-xs text-[rgb(var(--foreground))] font-medium text-center truncate">
                  {testimonial.name}
                </p>
                <p className="text-xs text-[rgb(var(--muted-foreground))] text-center truncate">
                  {testimonial.platform}
                </p>
              </motion.button>
            )}
          </div>

          {/* Platform Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6 text-[rgb(var(--foreground))]">
              Follow me on platforms
            </h3>
            <PlatformLinks variant="default" />
          </motion.div>
        </motion.div>
      </div>
      
    </section>
    
  );
};

export default Testimonials;
