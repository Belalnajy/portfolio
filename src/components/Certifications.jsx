"use client";
import { m, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { revealDelay, REVEAL_DURATION } from '../lib/motion';
import { useState, useMemo, useRef } from 'react';
import { useFocusTrap } from '../lib/useFocusTrap';
import { useEscapeLayer } from '../lib/useEscapeLayer';
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
  const lightboxRef = useRef(null);
  useFocusTrap(lightboxRef, !!selectedCert);

  useEscapeLayer(!!selectedCert, () => setSelectedCert(null));

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
        image: '/certificates/python-django.webp',
        imageSize: [900, 669],
      },
      {
        id: 2,
        title: t('certifications.items.intro_python'),
        issuer: '365 Data Science',
        date: '2023',
        icon: <FaCode className="text-2xl" />,
        platform: '365 Data Science',
        color: 'blue',
        image: '/certificates/intro-python.webp',
        imageSize: [800, 565],
      },
      {
        id: 3,
        title: t('certifications.items.docker'),
        issuer: 'KodeKloud',
        date: '2023',
        icon: <FaDocker className="text-2xl" />,
        platform: 'KodeKloud',
        color: 'cyan',
        image: '/certificates/docker.webp',
        imageSize: [900, 636],
      },
      {
        id: 4,
        title: t('certifications.items.git_github'),
        issuer: '365 Data Science',
        date: '2023',
        icon: <FaCode className="text-2xl" />,
        platform: '365 Data Science',
        color: 'blue',
        image: '/certificates/git-github.webp',
        imageSize: [800, 565],
      },
      {
        id: 5,
        title: t('certifications.items.web_dev'),
        issuer: 'Ministry of Communications and Information Technology',
        date: '2023',
        icon: <FaGraduationCap className="text-2xl" />,
        platform: 'MCIT',
        color: 'green',
        image: '/certificates/web-dev.webp',
        imageSize: [802, 618],
      },
      {
        id: 6,
        title: t('certifications.items.ui_ux'),
        issuer: 'Udemy',
        date: '2023',
        icon: <SiUdemy className="text-2xl" />,
        platform: 'Udemy',
        color: 'rose',
        image: '/certificates/ui-ux.webp',
        imageSize: [900, 669],
      },
      {
        id: 7,
        title: t('certifications.items.redhat'),
        issuer: 'Mahara Tech',
        date: '2023',
        icon: <SiRedhat className="text-2xl" />,
        platform: 'Mahara Tech',
        color: 'red',
        image: '/certificates/redhat.webp',
        imageSize: [668, 472],
      },
      {
        id: 8,
        title: t('certifications.items.android'),
        issuer: 'SkillsDynamix',
        date: '2023',
        icon: <FaAndroid className="text-2xl" />,
        platform: 'SkillsDynamix',
        color: 'emerald',
        image: '/certificates/android.webp',
        imageSize: [802, 562],
      },
    ],
    [t],
  );

  const getColorClasses = (color) => {
    const colorMap = {
      rose: 'bg-[rgb(var(--accent))]/10 text-[rgb(var(--destructive))] group-hover:bg-[rgb(var(--accent))] group-hover:text-[rgb(var(--accent-contrast))]',
      blue: 'bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] group-hover:bg-[rgb(var(--accent))] group-hover:text-[rgb(var(--accent-contrast))]',
      cyan: 'bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] group-hover:bg-[rgb(var(--accent))] group-hover:text-[rgb(var(--accent-contrast))]',
      green:
        'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))] group-hover:bg-[rgb(var(--success))] group-hover:text-[rgb(var(--on-scrim))]',
      red: 'bg-[rgb(var(--destructive))]/10 text-[rgb(var(--destructive))] group-hover:bg-[rgb(var(--destructive))] group-hover:text-[rgb(var(--on-scrim))]',
      emerald:
        'bg-[rgb(var(--accent))]/10 text-[rgb(var(--success))] group-hover:bg-[rgb(var(--accent))] group-hover:text-[rgb(var(--accent-contrast))]',
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section id="certifications" className="py-20 relative">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading className="max-w-6xl mx-auto" title={t('certifications.title')} subtitle={t('certifications.subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <Reveal
              as={m.div}
              y={20}
              delay={revealDelay(index)}
              key={cert.id}
              // Still read by Framer for the hover animation below.
              transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
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
            </Reveal>
          ))}
        </div>

        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCert && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-[rgb(var(--scrim))]/80 z-50 flex items-center justify-center p-4">
              <m.div
                ref={lightboxRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label={selectedCert.title}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-[rgb(var(--background))] rounded-xl p-2">
                <button
                  onClick={() => setSelectedCert(null)}
                  aria-label={t('projects.modal.close')}
                  className="absolute -top-12 right-0 text-[rgb(var(--on-scrim))] hover:text-[rgb(var(--muted-foreground))] transition-colors">
                  <FaTimes className="w-6 h-6" />
                </button>
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  width={selectedCert.imageSize[0]}
                  height={selectedCert.imageSize[1]}
                  loading="lazy"
                  className="w-full h-auto rounded-lg"
                />
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Certifications;
