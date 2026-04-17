import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import {
  FaCode,
  FaGraduationCap,
  FaMobile,
  FaAndroid,
  FaDocker,
  FaTimes,
} from 'react-icons/fa';
import { SiRedhat, SiUdemy } from 'react-icons/si';
import { useTranslation } from 'react-i18next';

const Certifications = () => {
  const { t } = useTranslation();
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = useMemo(
    () => [
      {
        id: 1,
        title: t('certifications.items.python_django'),
        issuer: 'Udemy',
        date: '2023',
        icon: <SiUdemy className="text-2xl" />,
        platform: 'Udemy',
        color: 'rose',
        image: '/certificates/python-django.png',
      },
      {
        id: 2,
        title: t('certifications.items.intro_python'),
        issuer: '365 Data Science',
        date: '2023',
        icon: <FaCode className="text-2xl" />,
        platform: '365 Data Science',
        color: 'blue',
        image: '/certificates/intro-python.png',
      },
      {
        id: 3,
        title: t('certifications.items.docker'),
        issuer: 'KodeKloud',
        date: '2023',
        icon: <FaDocker className="text-2xl" />,
        platform: 'KodeKloud',
        color: 'cyan',
        image: '/certificates/docker.jpg',
      },
      {
        id: 4,
        title: t('certifications.items.git_github'),
        issuer: '365 Data Science',
        date: '2023',
        icon: <FaCode className="text-2xl" />,
        platform: '365 Data Science',
        color: 'blue',
        image: '/certificates/git-github.png',
      },
      {
        id: 5,
        title: t('certifications.items.web_dev'),
        issuer: 'Ministry of Communications and Information Technology',
        date: '2023',
        icon: <FaGraduationCap className="text-2xl" />,
        platform: 'MCIT',
        color: 'green',
        image: '/certificates/web-dev.png',
      },
      {
        id: 6,
        title: t('certifications.items.ui_ux'),
        issuer: 'Udemy',
        date: '2023',
        icon: <SiUdemy className="text-2xl" />,
        platform: 'Udemy',
        color: 'rose',
        image: '/certificates/ui-ux.png',
      },
      {
        id: 7,
        title: t('certifications.items.redhat'),
        issuer: 'Mahara Tech',
        date: '2023',
        icon: <SiRedhat className="text-2xl" />,
        platform: 'Mahara Tech',
        color: 'red',
        image: '/certificates/redhat.png',
      },
      {
        id: 8,
        title: t('certifications.items.android'),
        issuer: 'SkillsDynamix',
        date: '2023',
        icon: <FaAndroid className="text-2xl" />,
        platform: 'SkillsDynamix',
        color: 'emerald',
        image: '/certificates/android.png',
      },
    ],
    [t],
  );

  const getColorClasses = (color) => {
    const colorMap = {
      rose: 'bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white',
      blue: 'bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white',
      cyan: 'bg-cyan-500/10 text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white',
      green:
        'bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white',
      red: 'bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white',
      emerald:
        'bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white',
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section id="certifications" className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            {t('certifications.title')}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] text-lg max-w-2xl mx-auto">
            {t('certifications.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => cert.image && setSelectedCert(cert)}
              className="group relative glass-card glass-hover rounded-xl p-6 cursor-pointer">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 ${getColorClasses(
                  cert.color,
                )}`}>
                {cert.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[3.5rem] text-start">
                {cert.title}
              </h3>
              <div className="text-[rgb(var(--muted-foreground))] text-sm space-y-1 text-start">
                <p>{cert.issuer}</p>
                <p>{cert.platform}</p>
                <p>{cert.date}</p>
              </div>
              {cert.image && (
                <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 text-[rgb(var(--primary))] opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[rgb(var(--primary))]/0 to-[rgb(var(--primary))]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-[rgb(var(--background))] rounded-xl p-2">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors">
                  <FaTimes className="w-6 h-6" />
                </button>
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Certifications;
