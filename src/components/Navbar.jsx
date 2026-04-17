import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaGlobe } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import MagneticButton from './MagneticButton';
import { useTranslation } from 'react-i18next';

const Navbar = ({ onDownloadCV }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    // Observe all sections
    const sections = [
      'home',
      'about',
      'experience',
      'projects',
      'skills',
      'services',
      'testimonials',
      'contact',
    ];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const navItems = [
    { label: t('nav.home'), to: 'home' },
    { label: t('nav.about'), to: 'about' },
    { label: t('nav.timeline'), to: 'experience' },
    { label: t('nav.projects'), to: 'projects' },
    { label: t('nav.skills'), to: 'skills' },
    { label: t('nav.services'), to: 'services' },
    { label: t('nav.testimonials'), to: 'testimonials' },
    { label: t('nav.contact'), to: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgb(var(--card))]/90 backdrop-blur-3xl shadow-2xl border-b border-[rgb(var(--border))]'
          : 'bg-transparent'
      }`}>
      {/* Animated gradient line on top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgb(var(--primary))] to-transparent"
        animate={{
          opacity: scrolled ? [0.3, 0.6, 0.3] : 0,
          scaleX: scrolled ? [0.8, 1, 0.8] : 0,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with enhanced animation */}
          <Link to="home" smooth={true} duration={500}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer group relative">
              <div className="relative">
                {/* Glow effect behind logo */}
                <motion.div
                  className="absolute -inset-2 bg-[rgb(var(--primary))]/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <span className="relative text-2xl font-bold text-[rgb(var(--foreground))] tracking-tight flex items-center gap-2">
                  <span className="bg-gradient-to-r from-[rgb(var(--foreground))] via-[rgb(var(--primary))] to-[rgb(var(--foreground))] bg-clip-text text-transparent">
                    Belal Nagy
                  </span>
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="text-[rgb(var(--primary))] opacity-0 group-hover:opacity-100 transition-opacity">
                    <HiSparkles className="w-4 h-4" />
                  </motion.span>
                </span>

                {/* Animated underline */}
                <motion.div
                  className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[rgb(var(--primary))] via-purple-500 to-[rgb(var(--primary))] rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <motion.div
              className="relative flex items-center gap-1 px-3 py-2 rounded-full bg-[rgb(var(--card))]/80 backdrop-blur-xl border border-[rgb(var(--border))] shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}>
              {navItems.map((item, index) => (
                <Link
                  key={item.to}
                  to={item.to}
                  spy={false}
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="cursor-pointer relative">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeSection === item.to
                        ? 'text-[rgb(var(--primary))] font-semibold'
                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                    }`}>
                    {activeSection === item.to && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--primary))]/10 to-[rgb(var(--primary))]/5 rounded-full border border-[rgb(var(--primary))]/20"
                        transition={{
                          type: 'spring',
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </motion.div>
                </Link>
              ))}
            </motion.div>

            {/* Language Switcher Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--card))]/80 border border-[rgb(var(--border))] text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))]/50 transition-all font-bold text-sm shadow-sm group">
              <FaGlobe className="text-[rgb(var(--primary))] group-hover:rotate-12 transition-transform duration-300" />
              <span>{i18n.language === 'en' ? 'AR' : 'EN'}</span>
            </motion.button>

            {/* Resume Button */}
            <MagneticButton
              onClick={onDownloadCV}
              className="group relative px-6 py-2 rounded-full bg-[rgb(var(--primary))] text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[rgb(var(--primary))]/30 flex items-center gap-2">
              <span className="relative z-10 flex items-center gap-2">
                <FaDownload className="text-sm" />
                {t('nav.download_cv')}
              </span>
            </MagneticButton>
          </div>

          {/* Mobile Navigation Button - Enhanced */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2.5 rounded-xl bg-[rgb(var(--card))]/80 border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] transition-all duration-200 overflow-hidden group"
              aria-label="Toggle menu">
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <FiX
                      size={24}
                      className="text-[rgb(var(--foreground))] relative z-10"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <FiMenu
                      size={24}
                      className="text-[rgb(var(--foreground))] relative z-10"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Enhanced with modern design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl bg-[rgb(var(--card))]/95 backdrop-blur-2xl border border-[rgb(var(--border))] shadow-2xl overflow-hidden">
            {/* Gradient accent on top */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />

            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.to}
                  spy={false}
                  smooth={true}
                  duration={500}
                  offset={-100}
                  onClick={() => setIsOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative block px-5 py-3 rounded-xl text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-all duration-200 cursor-pointer font-medium overflow-hidden ${isArabic ? 'text-right' : 'text-left'}`}>
                    {/* Hover gradient background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.2 }}
                    />

                    {/* Border glow on hover */}
                    <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-500/30 transition-all duration-200" />

                    {/* Number indicator */}
                    <span
                      className={`relative z-10 flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xs text-blue-500 font-mono opacity-50 group-hover:opacity-100 transition-opacity">
                        0{index + 1}
                      </span>
                      {item.label}
                    </span>

                    {/* Arrow indicator */}
                    <motion.span
                      className={`absolute ${isArabic ? 'left-4 rotate-180' : 'right-4'} top-1/2 -translate-y-1/2 text-blue-500 opacity-0 group-hover:opacity-100`}
                      initial={{ x: isArabic ? 10 : -10 }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.2 }}>
                      →
                    </motion.span>
                  </motion.div>
                </Link>
              ))}

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{
                  delay: navItems.length * 0.05 + 0.1,
                  duration: 0.3,
                }}
                className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: navItems.length * 0.05 + 0.2,
                  duration: 0.3,
                }}
                className="pt-2">
                <button
                  onClick={() => {
                    onDownloadCV();
                    setIsOpen(false);
                  }}
                  className="relative w-full px-5 py-3 rounded-xl bg-[rgb(var(--primary))] text-white font-semibold overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 group">
                  {/* Animated gradient on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                    <FaDownload className="text-sm" />
                    {t('nav.download_cv')}
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
