"use client";
import { m } from 'framer-motion';
import Reveal from './Reveal';
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
import { homeAnchor } from '../lib/home-anchor';

// Column headings. Phones: the eyebrow style (12px, semibold, uppercase,
// tracked, accent), no underline bar. From md: as before.
const FOOTER_HEADING =
  "max-md:text-xs max-md:font-semibold max-md:tracking-[0.14em] max-md:text-[rgb(var(--accent))] max-md:mb-3 max-md:after:hidden md:text-xl font-bold md:mb-8 text-[rgb(var(--foreground))] uppercase md:tracking-wider relative inline-block after:content-[''] after:absolute after:-bottom-2 after:start-0 after:w-12 after:h-1 after:bg-[rgb(var(--primary))] after:rounded-full";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  // Anchors live on the home page; routes are their own pages. `home` keeps
  // every link inside the language being read.
  const home = isArabic ? '/ar' : '';
  const quickLinks = useMemo(
    () => [
      { name: t('nav.home'), href: `${home}/` },
      { name: t('nav.about'), href: homeAnchor(isArabic, 'about') },
      // The timeline and the platform suite moved off the home page to /cv.
      { name: t('nav.timeline'), href: `${home}/cv#experience` },
      { name: t('nav.suite'), href: `${home}/cv#platform-suite` },
      { name: t('nav.projects'), href: `${home}/work` },
      { name: t('nav.services'), href: `${home}/services` },
      { name: t('nav.now'), href: `${home}/now` },
      { name: t('nav.blog'), href: `${home}/blog` },
      { name: t('nav.rescue'), href: `${home}/rescue` },
      { name: t('nav.testimonials'), href: `${home}/testimonials` },
      { name: t('nav.cv'), href: `${home}/cv` },
      { name: t('nav.uses'), href: `${home}/uses` },
      { name: t('nav.privacy'), href: `${home}/privacy` },
      { name: t('nav.contact'), href: homeAnchor(isArabic, 'contact') },
    ],
    [t, home, isArabic],
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
      label: t('contact.info.email'),
      color: 'hover:text-[rgb(var(--destructive))]',
    },
  ];

  // Back to the top for the eye, and for the keyboard: focus moves to the
  // page content, so the next Tab is not still at the bottom of the footer.
  const scrollToTop = () => {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    document.getElementById('main')?.focus({ preventScroll: true });
  };

  return (
    <footer
      className={`relative bg-[rgb(var(--card))] text-[rgb(var(--foreground))] pt-12 md:pt-16 pb-[calc(var(--tabbar-total)+1.5rem)] md:pb-12 overflow-hidden border-t border-[rgb(var(--border))] text-start`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] bg-[size:20px_20px] opacity-5" />

      <div className="container mx-auto px-[var(--m-gutter)] sm:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16 md:mb-16">
          {/* About Section */}
          <Reveal y={20} duration={0.5}>
            {/* Brand row: on phones it ends with the back-to-top button. */}
            <div className="flex items-center justify-between gap-4 mb-4 md:mb-6">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] bg-clip-text text-transparent">
                {t('footer.about_title')}
              </h3>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label={t('footer.back_to_top')}
                className="press md:hidden shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-[rgb(var(--text))]/[0.06] border border-[rgb(var(--border-subtle))] text-[rgb(var(--foreground))]">
                <FaArrowUp aria-hidden="true" size={14} />
              </button>
            </div>
            <p className="text-[rgb(var(--muted-foreground))] mb-6 md:mb-8 leading-relaxed text-base md:text-lg">
              {t('footer.about_text')}
            </p>
            {/* Social Links */}
            <div className="flex gap-4 flex-wrap">
              {socialLinks.map((social, index) => (
                <m.a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3.5 rounded-xl bg-[rgb(var(--muted))]/50 text-[rgb(var(--foreground))] ${social.color} transition-all border border-[rgb(var(--border))]/50 shadow-lg hover:shadow-[rgb(var(--accent))]/10`}
                  aria-label={social.label}>
                  <div className="text-xl">{social.icon}</div>
                </m.a>
              ))}
            </div>
          </Reveal>

          {/* Quick Links */}
          <Reveal y={20} duration={0.5} delay={0.1}>
            <h3 className={FOOTER_HEADING}>
              {t('footer.quick_links')}
            </h3>
            <ul className="grid grid-cols-2 gap-y-0 md:gap-y-4 gap-x-6 md:gap-x-8">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`press-tint rounded-lg text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-all cursor-pointer flex items-center gap-2.5 group min-h-[44px] md:-my-1`}>
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
          </Reveal>

          {/* Contact Info */}
          <Reveal y={20} duration={0.5} delay={0.2}>
            <h3 className={FOOTER_HEADING}>
              {t('footer.get_in_touch')}
            </h3>
            <ul className="space-y-4 md:space-y-6">
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
                      dir="ltr"
                      className="inline-flex items-center min-h-[44px] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors text-base font-medium break-all">
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

            {/* Phones: where to follow, in the same block as the ways to
                write (from md it has its own band below). */}
            <div className="mt-6 md:hidden">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[rgb(var(--accent))] mb-1">
                {t('footer.follow_me')}
              </p>
              <PlatformLinks variant="footer" align="start" />
            </div>

            {/* Phones already have the tab bar's contact button. */}
            <div className="mt-10 hidden md:block">
              {/* The contact section lives on the home page; a bare #contact was
                  a dead link everywhere else the footer renders. */}
              <m.a
                href={homeAnchor(isArabic, 'contact')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full text-center bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] text-[rgb(var(--accent-contrast))] px-6 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-[rgb(var(--accent))]/20">
                {t('contact.title')}
              </m.a>
            </div>
          </Reveal>
        </div>

        {/* Platform Links Section (from md; phones have it in the contact
            block above) */}
        <Reveal y={20} duration={0.5} delay={0.3}
          className="hidden md:block py-12 border-t border-[rgb(var(--border))]/30">
          <div className="text-center mb-10">
            <span className="text-[rgb(var(--primary))] font-bold text-sm tracking-widest uppercase mb-2 block">
              {t('footer.connect')}
            </span>
            <h4 className="text-2xl font-bold text-[rgb(var(--foreground))]">
              {t('footer.follow_me')}
            </h4>
          </div>
          <PlatformLinks variant="footer" />
        </Reveal>

        {/* Bottom Footer Section (from md; phones have it in the brand row) */}
        <div className="hidden md:block pt-8 border-t border-[rgb(var(--border))]/30">
          <div className="flex justify-center items-center">
            {/* Back to Top Button */}
            <m.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="group flex items-center gap-3 bg-[rgb(var(--foreground))] text-[rgb(var(--background))] px-6 py-3 rounded-full transition-all shadow-xl hover:shadow-2xl active:scale-95">
              <span className="text-sm font-black uppercase tracking-widest ps-1">
                {t('footer.back_to_top')}
              </span>
              <div className="w-8 h-8 rounded-full bg-[rgb(var(--background))] text-[rgb(var(--foreground))] flex items-center justify-center transition-transform group-hover:-translate-y-1">
                <FaArrowUp size={14} />
              </div>
            </m.button>
          </div>
        </div>
      </div>
      
      {/* Decorative pulse circles */}
      
      
    </footer>
  );
};

export default Footer;
