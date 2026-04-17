import { motion } from 'framer-motion';
import {
  FaUser,
  FaCode,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaRocket,
  FaHeart,
  FaLightbulb,
} from 'react-icons/fa';
import { useTranslation, Trans } from 'react-i18next';

const About = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const highlights = [
    {
      icon: <FaRocket />,
      title: t('about.highlights.fast_learner.title'),
      description: t('about.highlights.fast_learner.desc'),
    },
    {
      icon: <FaHeart />,
      title: t('about.highlights.passionate.title'),
      description: t('about.highlights.passionate.desc'),
    },
    {
      icon: <FaLightbulb />,
      title: t('about.highlights.creative.title'),
      description: t('about.highlights.creative.desc'),
    },
  ];

  const infoItems = [
    {
      icon: <FaUser />,
      label: t('about.labels.name'),
      value: t('about.values.name'),
      color: 'blue',
    },
    {
      icon: <FaCode />,
      label: t('about.labels.role'),
      value: t('about.values.role'),
      color: 'purple',
    },
    {
      icon: <FaGraduationCap />,
      label: t('about.labels.education'),
      value: t('about.values.education'),
      color: 'pink',
    },
    {
      icon: <FaMapMarkerAlt />,
      label: t('about.labels.location'),
      value: t('about.values.location'),
      color: 'cyan',
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            {t('about.title')}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6">
            <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('about.personal_info')}
            </h3>
            <div className="space-y-4">
              {infoItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: isArabic ? -10 : 10, scale: 1.02 }}
                  className="flex items-center gap-6 glass-card glass-hover p-4 rounded-xl cursor-pointer">
                  <div
                    className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 p-3 rounded-lg shrink-0`}>
                    <div className="text-white text-xl">{item.icon}</div>
                  </div>
                  <div className="flex-1 text-start">
                    <h4 className="text-[rgb(var(--foreground))] font-semibold">
                      {item.label}
                    </h4>
                    <p className="text-[rgb(var(--muted-foreground))]">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6">
            <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('about.professional_summary')}
            </h3>
            <div className="glass-card p-6 rounded-xl space-y-4">
              <p className="text-[rgb(var(--foreground))] leading-relaxed">
                <Trans i18nKey="about.summary_p1" components={{ 1: <span className="text-[rgb(var(--primary))] font-semibold" />, 3: <span className="text-[rgb(var(--primary))] font-semibold" /> }} />
              </p>
              <p className="text-[rgb(var(--foreground))] leading-relaxed">
                <Trans i18nKey="about.summary_p2" components={{ 1: <span className="text-[rgb(var(--primary))] font-semibold" />, 3: <span className="text-[rgb(var(--primary))] font-semibold" /> }} />
              </p>
              <p className="text-[rgb(var(--foreground))] leading-relaxed">
                {t('about.summary_p3')}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="glass-card glass-hover p-6 rounded-xl text-center cursor-pointer">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl mb-4">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold mb-2 text-[rgb(var(--foreground))]">
                {item.title}
              </h4>
              <p className="text-[rgb(var(--muted-foreground))]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
