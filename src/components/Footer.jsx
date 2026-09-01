"use client";
import { motion } from 'framer-motion';
import { REVEAL_VIEWPORT } from '../lib/motion';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaArrowUp,
  FaChevronRight,
  FaChevronLeft,
} from 'react-icons/fa';
import PlatformLinks from './PlatformLinks';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const currentYear = new Date().getFullYear();

  // Anchors live on the home page; routes are their own pages. `home` keeps
  // every link inside the language being read.
  const home = isArabic ? '/ar' : '';
  const quickLinks = useMemo(
    () => [
      { name: t('nav.home'), href: `${home}/` },
      { name: t('nav.about'), href: `${home}/#about` },
      { name: t('nav.timeline'), href: `${home}/#experience` },
      { name: t('nav.suite'), href: `${home}/#platform-suite` },
      { name: t('nav.projects'), href: `${home}/work` },
      { name: t('nav.services'), href: `${home}/services` },
      { name: t('nav.now'), href: `${home}/now` },
      { name: t('nav.testimonials'), href: `${home}/#testimonials` },
      { name: t('nav.contact'), href: `${home}/#contact` },
    ],
    [t, home],
  );

  const contactInfo = useMemo(
    () => [
      {
        icon: <FaEnvelope />,
        text: 'belalnajy9@gmail.com',
        href: 'mailto:belalnajy9@gmail.com',
      },
      {
        icon: <FaMapMarkerAlt />,
        text: t('contact.info.alexandria'),
        href: null,
      },
    ],
    [t],
  );

  const socialLinks = [
    {
      icon: <FaGithub />,
      href: 'https://github.com/Belalnajy',
      label: 'GitHub',
      color: 'hover:text-[rgb(var(--muted-foreground))]',
    },
    {
      icon: <FaLinkedin />,
      href: 'https://linkedin.com/in/belalnajy',
      label: 'LinkedIn',
      color: 'hover:text-[rgb(var(--accent))]',
    },
    {
      icon: <FaEnvelope />,
      href: 'mailto:belalnajy9@gmail.com',
      label: 'Email',
      color: 'hover:text-[rgb(var(--destructive))]',
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`relative bg-[rgb(var(--card))] text-[rgb(var(--foreground))] pt-16 pb-12 overflow-hidden border-t border-[rgb(var(--border))] ${isArabic ? 'text-right' : 'text-left'}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] bg-[size:20px_20px] opacity-5" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-16">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.5 }}>
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] bg-clip-text text-transparent">
              {t('footer.about_title')}
            </h3>
            <p className="text-[rgb(var(--muted-foreground))] mb-8 leading-relaxed text-lg">
              {t('footer.about_text')}
            </p>
            {/* Social Links */}
            <div className="flex gap-4 flex-wrap">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3.5 rounded-xl bg-[rgb(var(--muted))]/50 text-[rgb(var(--foreground))] ${social.color} transition-all border border-[rgb(var(--border))]/50 shadow-lg hover:shadow-[rgb(var(--accent))]/10`}
                  aria-label={social.label}>
                  <div className="text-xl">{social.icon}</div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.5, delay: 0.1 }}>
            <h3 className={`text-xl font-bold mb-8 text-[rgb(var(--foreground))] uppercase tracking-wider relative inline-block after:content-[''] after:absolute after:-bottom-2 ${isArabic ? 'after:right-0' : 'after:left-0'} after:w-12 after:h-1 after:bg-[rgb(var(--primary))] after:rounded-full`}>
              {t('footer.quick_links')}
            </h3>
            <ul className="grid grid-cols-2 gap-y-4 gap-x-8">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-all cursor-pointer flex items-center gap-2.5 group min-h-[40px] -my-1`}>
                    <div className="transition-transform duration-300 group-hover:scale-125">
                      {isArabic ? (
                        <FaChevronLeft className="text-[10px]" />
                      ) : (
                        <FaChevronRight className="text-[10px]" />
                      )}
                    </div>
                    <span className="text-base font-medium">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className={`text-xl font-bold mb-8 text-[rgb(var(--foreground))] uppercase tracking-wider relative inline-block after:content-[''] after:absolute after:-bottom-2 ${isArabic ? 'after:right-0' : 'after:left-0'} after:w-12 after:h-1 after:bg-[rgb(var(--primary))] after:rounded-full`}>
              {t('footer.get_in_touch')}
            </h3>
            <ul className="space-y-6">
              {contactInfo.map((info, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] flex items-center justify-center text-xl transition-all group-hover:bg-[rgb(var(--primary))] group-hover:text-[rgb(var(--accent-contrast))] group-hover:scale-110">
                    {info.icon}
                  </div>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors text-base font-medium break-all">
                      {info.text}
                    </a>
                  ) : (
                    <span className="text-[rgb(var(--muted-foreground))] text-base font-medium">
                      {info.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full text-center bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] text-[rgb(var(--accent-contrast))] px-6 py-4 rounded-xl font-bold transition-all shadow-lg shadow-[rgb(var(--accent))]/10 hover:shadow-[rgb(var(--accent))]/20">
                {t('contact.title')}
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Platform Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="py-12 border-t border-[rgb(var(--border))]/30">
          <div className="text-center mb-10">
            <span className="text-[rgb(var(--primary))] font-bold text-sm tracking-widest uppercase mb-2 block">
              {t('footer.connect')}
            </span>
            <h4 className="text-2xl font-bold text-[rgb(var(--foreground))]">
              {t('footer.follow_me')}
            </h4>
          </div>
          <PlatformLinks variant="footer" />
        </motion.div>

        {/* Bottom Footer Section */}
        <div className="pt-8 border-t border-[rgb(var(--border))]/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={REVEAL_VIEWPORT}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-[rgb(var(--muted-foreground))] text-sm font-medium">
              <p>{t('footer.freelance_notice')}</p>
              <p className="mt-2 font-mono text-xs text-[rgb(var(--muted-foreground))]/70" dir="ltr">
                {t('footer.build_line')}
              </p>
            </motion.div>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 bg-[rgb(var(--foreground))] text-[rgb(var(--background))] px-6 py-3 rounded-full transition-all shadow-xl hover:shadow-2xl active:scale-95"
              aria-label="Back to top">
              <span className="text-sm font-black uppercase tracking-widest pl-1">
                {t('footer.back_to_top')}
              </span>
              <div className="w-8 h-8 rounded-full bg-[rgb(var(--background))] text-[rgb(var(--foreground))] flex items-center justify-center transition-transform group-hover:-translate-y-1">
                <FaArrowUp size={14} />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Decorative pulse circles */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[rgb(var(--primary))]/5 rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[rgb(var(--accent-hover))]/5 rounded-full blur-[100px]" />
    </footer>
  );
};

export default Footer;
