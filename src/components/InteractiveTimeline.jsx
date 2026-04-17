import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaGraduationCap, FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const InteractiveTimeline = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);

  const experiences = useMemo(() => {
    const items = t('timeline.items', { returnObjects: true });
    const metadata = [
      { type: 'work', icon: <FaBriefcase />, logo: '/logos/indstrz-logo.png', color: 'from-blue-600 to-purple-600' },
      { type: 'work', icon: <FaBriefcase />, logo: '/logos/sf-logo.png', color: 'from-blue-500 to-cyan-500' },
      { type: 'work', icon: <FaLaptopCode />, logo: '/logos/iti-logo.png', color: 'from-purple-500 to-pink-500' },
      { type: 'work', icon: <FaLaptopCode />, color: 'from-green-500 to-emerald-500' },
      { type: 'education', icon: <FaGraduationCap />, logo: '/logos/iti-logo.png', color: 'from-orange-500 to-red-500' },
      { type: 'work', icon: <FaBriefcase />, logo: '/logos/ezzsteel-logo.png', color: 'from-yellow-500 to-amber-500' },
      { type: 'education', icon: <FaGraduationCap />, logo: '/logos/alex-uni-logo.png', color: 'from-indigo-500 to-purple-500' },
    ];

    return items.map((item, index) => ({
      ...item,
      ...metadata[index]
    }));
  }, [t]);

  return (
    <section id="experience" className="py-20 relative overflow-hidden text-start">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            {t('timeline.title')}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg leading-relaxed">
            {t('timeline.subtitle')}
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[rgb(var(--primary))]/40 via-[rgb(var(--primary))]/20 to-[rgb(var(--primary))]/40 hidden md:block" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}>
                
                {/* Content */}
                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 
                      ? 'md:pr-8 rtl:md:pr-0 rtl:md:pl-8' 
                      : 'md:pl-8 rtl:md:pl-0 rtl:md:pr-8'
                  }`}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className={`glass-card glass-hover p-6 rounded-xl cursor-pointer relative ${
                      activeIndex === index
                        ? 'ring-2 ring-[rgb(var(--primary))] shadow-xl shadow-[rgb(var(--primary))]/20'
                        : ''
                    }`}>
                    <div className="flex items-start justify-between mb-4 gap-3">
                      <div className="flex items-start flex-1 min-w-0">
                        <div className={`w-14 h-14 rounded-xl bg-white flex items-center justify-center ${isArabic ? 'ml-4' : 'mr-4'} border border-[rgb(var(--border))]/50 flex-shrink-0 overflow-hidden p-2 shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                          {exp.logo ? (
                            <img 
                              src={exp.logo} 
                              alt={exp.company} 
                              className="w-full h-full object-contain"
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
                    </div>

                    <ul className="space-y-2.5 relative">
                      {exp.description.map((desc, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: isArabic ? 10 : -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="text-sm flex items-start text-[rgb(var(--foreground))] leading-relaxed text-start">
                          <FaChevronRight className={`text-[rgb(var(--primary))] ${isArabic ? 'ml-2 rotate-180' : 'mr-2'} mt-1 text-[10px] shrink-0`} />
                          <span>{desc}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Center Dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 items-center justify-center">
                  <motion.div
                    animate={{
                      scale: activeIndex === index ? 1.3 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-6 h-6 rounded-full ${
                      activeIndex === index
                        ? 'bg-[rgb(var(--primary))] ring-4 ring-[rgb(var(--primary))]/30 shadow-xl shadow-[rgb(var(--primary))]/50'
                        : 'bg-[rgb(var(--foreground))] ring-4 ring-[rgb(var(--background))] shadow-lg'
                    }`}
                  />
                </div>

                {/* Spacer */}
                <div className="w-full md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTimeline;
