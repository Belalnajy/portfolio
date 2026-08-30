'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import { brandColor } from '../lib/brand-colors';
import { coverMeta } from '../lib/cover-meta';

const HERO_IMAGE = '/hero.webp';
import MagneticButton from './MagneticButton';
import PlatformLinks from './PlatformLinks';
import { useTranslation } from 'react-i18next';

const Hero = ({ onDownloadCV }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const hero = coverMeta(HERO_IMAGE);

  const typingSequence = isArabic
    ? [
        'مطور Full Stack',
        2000,
        'مهندس برمجيات',
        2000,
        'مطور ويب',
        2000,
        'محلل مشكلات وبرمجيات',
        2000,
      ]
    : [
        'Full Stack Developer',
        2000,
        'Software Engineer',
        2000,
        'Web Developer',
        2000,
        'Problem Solver',
        2000,
      ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[rgb(var(--background))] py-16 sm:py-24">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[rgb(var(--accent))] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[rgb(var(--accent))] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[rgb(var(--accent))] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] bg-[size:20px_20px] opacity-10" />
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          {/* Entrances are CSS keyframes, not framer `initial` props: the
              server markup would otherwise ship this column at opacity 0 and
              the LCP would wait for the whole bundle to hydrate. */}
          <div className="text-center lg:text-start">
            <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              {/* Availability is the first thing a prospective client checks. */}
              <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[rgb(var(--success))]/10 border border-[rgb(var(--success))]/30 text-[rgb(var(--foreground))] text-sm font-medium mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--success))] opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[rgb(var(--success))]" />
                </span>
                {t('hero.available')}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[rgb(var(--foreground))] animate-fadeInUp">
              {t('hero.greeting_start')}
              {t('hero.name')}
            </h1>

            <div
              className={`text-2xl md:text-3xl mb-8 h-12 flex items-center justify-center lg:justify-start`}>
              <span className="text-[rgb(var(--muted-foreground))] mx-2">
                {t('hero.i_am_a')}
              </span>
              <span className="text-[rgb(var(--primary))] font-bold">
                <TypeAnimation
                  key={i18n.language}
                  sequence={typingSequence}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </div>

            <p className="text-lg text-[rgb(var(--foreground))] mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t('hero.description_1')}
              <span className="text-[rgb(var(--primary))] font-semibold">
                {t('hero.description_2')}
              </span>
              {t('hero.description_3')}
              <span className="text-[rgb(var(--primary))] font-semibold">
                {t('hero.description_4')}
              </span>
              {t('hero.description_5')}
            </p>

            {/* Social Links */}
            <div
              className="flex items-center justify-center lg:justify-start gap-4 mb-8 animate-fadeInUp"
              style={{ animationDelay: '0.25s' }}>
              <motion.a
                href="https://github.com/Belalnajy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] text-[rgb(var(--accent-contrast))] hover:from-[rgb(var(--accent-hover))] hover:to-[rgb(var(--accent))] transition-all shadow-lg hover:shadow-[rgb(var(--accent))]/50">
                <FaGithub className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/belalnajy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: `linear-gradient(to right, ${brandColor('LinkedIn')}, ${brandColor('LinkedIn Dark')})`,
                }}
                className="p-3 rounded-full text-[rgb(var(--on-scrim))] hover:shadow-lg hover:shadow-[rgb(var(--accent))]/50 transition-all">
                <FaLinkedin className="w-6 h-6" />
              </motion.a>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fadeInUp"
              style={{ animationDelay: '0.35s' }}>
              <MagneticButton
                href="#projects"
                className="bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))] px-8 py-3 rounded-lg font-semibold hover:bg-[rgb(var(--primary))]/90 transition-all inline-flex items-center">
                {t('hero.view_projects')}
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] px-8 py-3 rounded-lg font-semibold hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--accent-contrast))] transition-all inline-flex items-center">
                {t('hero.contact_me')}
              </MagneticButton>
              <MagneticButton
                onClick={onDownloadCV}
                className="bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] px-6 py-3 rounded-lg font-semibold hover:bg-[rgb(var(--muted))]/80 transition-all inline-flex items-center gap-2">
                <FaDownload className="text-sm" />
                {t('hero.download_cv')}
              </MagneticButton>
            </div>

            {/* Platform Links */}
            <div className="mt-8 animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
              <p className="text-[rgb(var(--muted-foreground))] text-sm mb-3">
                {t('hero.follow_me')}
              </p>
              <div className="flex justify-center lg:justify-start">
                <PlatformLinks variant="compact" />
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
            <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md mx-auto lg:max-w-full">
              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-[rgb(var(--accent))]/6 rounded-full blur-3xl" />

              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative">
                <div className="w-full aspect-square rounded-full border-4 border-[rgb(var(--accent))]/30 overflow-hidden">
                  {/* LCP element: `priority` preloads it and `sizes` keeps
                      phones from downloading the desktop rendition. */}
                  <Image
                    src={HERO_IMAGE}
                    alt="Belal Nagy"
                    width={hero.w}
                    height={hero.h}
                    priority
                    sizes="(min-width: 1024px) 45vw, (min-width: 640px) 384px, 280px"
                    placeholder={hero.blur ? 'blur' : 'empty'}
                    blurDataURL={hero.blur}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-4 -right-4 bg-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))] p-4 rounded-full shadow-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
