"use client";
import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { revealDelay } from '../lib/motion';
import { FaDownload, FaGlobe } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../lib/useTheme';
import MagneticButton from './MagneticButton';
import Logo from './Logo';
import LanguageToggle from './LanguageToggle';
import { useTranslation } from 'react-i18next';
import { switchLanguage, LANGUAGE_SWITCH_LABEL } from '../lib/language';
import { useSite } from './SiteShell';
import { useEscapeLayer } from '../lib/useEscapeLayer';

const Navbar = () => {
  const { isDark, toggle: toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { downloadCV } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const isArabic = i18n.language === 'ar';
  const reduceMotion = useReducedMotion();
  const menuButtonRef = useRef(null);

  const headerRef = useRef(null);

  // While the phone menu is open the floating contact dock steps aside (see
  // .floating-dock in globals.css) so it cannot sit on top of the menu's last
  // items.
  useEffect(() => {
    if (!isOpen) return undefined;
    const root = document.documentElement;
    root.setAttribute('data-menu-open', '');
    return () => root.removeAttribute('data-menu-open');
  }, [isOpen]);

  // Escape closes the menu and puts focus back on its button, unless a layer
  // opened on top of it (the command palette) takes the key first.
  useEscapeLayer(isOpen, () => {
    setIsOpen(false);
    menuButtonRef.current?.focus();
  });

  // A disclosure, not a modal: once Tab carries focus out of the header (past
  // the last menu item, into the page the menu covers) the menu closes, so
  // focus never walks behind it. A tap on empty space moves focus to nothing
  // (relatedTarget null) and is left alone, as is a move within the header
  // or into a modal dialog opened on top of the menu (the command palette),
  // which hands focus back to the header when it closes. A non-modal one,
  // like the FAQ panel, is just somewhere else on the page: the menu closes.
  useEffect(() => {
    const header = headerRef.current;
    if (!isOpen || !header) return undefined;
    const onFocusOut = (event) => {
      const next = event.relatedTarget;
      if (!next || header.contains(next) || next.closest('[role="dialog"][aria-modal="true"]')) return;
      setIsOpen(false);
    };
    header.addEventListener('focusout', onFocusOut);
    return () => header.removeEventListener('focusout', onFocusOut);
  }, [isOpen]);

  // The phone menu is display:none from xl up, but would stay "open" (and
  // keep its Escape layer and data-menu-open) if the window grew past it.
  // Something else may also ask it to close: the command palette, after
  // jumping to a section of this same page (no reload to close it).
  useEffect(() => {
    if (!isOpen) return undefined;
    const desktop = window.matchMedia('(min-width: 1280px)');
    const close = () => setIsOpen(false);
    const onChange = () => {
      if (desktop.matches) close();
    };
    onChange();
    desktop.addEventListener('change', onChange);
    window.addEventListener('menu:close', close);
    return () => {
      desktop.removeEventListener('change', onChange);
      window.removeEventListener('menu:close', close);
    };
  }, [isOpen]);

  const toggleLanguage = () => {
    // A real navigation to the same page in the other language.
    switchLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    // Passive: the handler never calls preventDefault, so the browser need not
    // wait for it before scrolling. React skips the re-render when the flag
    // has not changed, so most scroll events cost one comparison.
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section detection. Without one the nav
  // simply never highlights a section; the page itself must not break.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
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
      'projects',
      'platform-suite',
      'skills',
      'experience',
      'services',
      'packages',
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

  // Multi-page navigation: anchors live on the home page, routes are their
  // own pages. `home` keeps every link inside the language being read.
  const home = isArabic ? '/ar' : '';
  const [pathname, setPathname] = useState('');
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);
  const onHome = pathname === '/' || pathname === '/ar';

  const navItems = [
    { label: t('nav.home'), href: `${home}/`, route: '/' },
    { label: t('nav.about'), href: `${home}/#about`, anchor: 'about' },
    { label: t('nav.timeline'), href: `${home}/#experience`, anchor: 'experience' },
    { label: t('nav.projects'), href: `${home}/work`, route: '/work' },
    { label: t('nav.services'), href: `${home}/services`, route: '/services' },
    { label: t('nav.now'), href: `${home}/now`, route: '/now' },
    { label: t('nav.blog'), href: `${home}/blog`, route: '/blog' },
    { label: t('nav.suite'), href: `${home}/#platform-suite`, anchor: 'platform-suite', mobileOnly: true },
    { label: t('nav.testimonials'), href: `${home}/#testimonials`, anchor: 'testimonials', mobileOnly: true },
    { label: t('nav.contact'), href: `${home}/#contact`, anchor: 'contact' },
  ];

  const desktopNavItems = navItems.filter((item) => !item.mobileOnly);

  // A route item lights up on its page; anchors light up while scrolling home.
  const isActive = (item) => {
    if (item.route) {
      const current = pathname.replace(/^\/ar(?=\/|$)/, '') || '/';
      return item.route === '/' ? current === '/' && activeSection === 'home' : current === item.route;
    }
    return onHome && activeSection === item.anchor;
  };

  return (
    // <header> is the page's banner landmark; the link lists inside it are
    // the navigation landmarks (desktop bar, phone menu).
    <header
      ref={headerRef}
      className={`fixed w-full z-50 transition-all duration-500 animate-fadeInDown ${
        scrolled
          ? 'bg-[rgb(var(--card))]/90 backdrop-blur-3xl shadow-2xl border-b border-[rgb(var(--border))]'
          : 'bg-transparent'
      }`}>
      {/* Gradient line on top. It breathes forever, so under reduced motion
          it is simply shown, still (MotionConfig only drops the transform,
          not the looping opacity). */}
      <m.div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgb(var(--primary))] to-transparent"
        animate={
          reduceMotion
            ? { opacity: scrolled ? 0.5 : 0, scaleX: 1 }
            : {
                opacity: scrolled ? [0.3, 0.6, 0.3] : 0,
                scaleX: scrolled ? [0.8, 1, 0.8] : 0,
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with enhanced animation */}
          <m.a
            href={`${home}/`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={t('a11y.home_link')}
            className="flex items-center gap-3 min-h-11 cursor-pointer group relative">
              {/* The mark spells B at rest and rearranges into N on hover. */}
              <Logo size={34} className="shrink-0" />
              <div className="relative">
                <span className="relative text-2xl font-bold text-[rgb(var(--foreground))] tracking-tight flex items-center">
                  <span className="bg-gradient-to-r from-[rgb(var(--foreground))] via-[rgb(var(--primary))] to-[rgb(var(--foreground))] bg-clip-text text-transparent">
                    Belal Nagy
                  </span>
                </span>

                {/* Animated underline */}
                <m.div
                  className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[rgb(var(--primary))] via-[rgb(var(--accent-hover))] to-[rgb(var(--primary))] rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
          </m.a>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-4">
            <nav aria-label={t('a11y.main_nav')}>
            <m.div
              className="relative flex items-center gap-1 px-3 py-2 rounded-full bg-[rgb(var(--card))]/80 backdrop-blur-xl border border-[rgb(var(--border))] shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}>
              {desktopNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={isActive(item) ? (item.route ? 'page' : 'location') : undefined}
                  className="cursor-pointer relative rounded-full">
                  {/* A plain div: framer-motion gives any element with a tap
                      gesture tabindex=0, which made every link two tab stops. */}
                  <div
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-105 motion-safe:active:scale-95 ${
                      isActive(item)
                        ? 'text-[rgb(var(--primary))] font-semibold'
                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                    }`}>
                    {isActive(item) && (
                      <m.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--primary))]/10 to-[rgb(var(--primary))]/5 rounded-full border border-[rgb(var(--border))]"
                        transition={{
                          type: 'spring',
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </div>
                </a>
              ))}
            </m.div>
            </nav>

            {/* Language Switcher Toggle */}
            {/* Same label as the phone toggle: the target language, written
                in that language, and an accessible name that starts with the
                visible word (WCAG 2.5.3). */}
            <m.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              lang={isArabic ? 'en' : 'ar'}
              aria-label={isArabic ? LANGUAGE_SWITCH_LABEL.en : LANGUAGE_SWITCH_LABEL.ar}
              className="flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full bg-[rgb(var(--card))]/80 border border-[rgb(var(--border))] text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))]/50 transition-all font-bold text-sm shadow-sm group">
              <FaGlobe aria-hidden="true" className="text-[rgb(var(--primary))] group-hover:rotate-12 transition-transform duration-300" />
              <span>{isArabic ? 'EN' : 'عربي'}</span>
            </m.button>

            {/* Resume Button */}
            <MagneticButton
              type="button"
              onClick={downloadCV}
              className="group relative min-h-[44px] px-6 py-2 rounded-full bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))] font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl flex items-center gap-2">
              <span className="relative z-10 flex items-center gap-2">
                <FaDownload className="text-sm" />
                {t('nav.download_cv')}
              </span>
            </MagneticButton>
          </div>

          {/* Mobile Navigation Button - Enhanced */}
          <div className="xl:hidden flex items-center gap-2">
            {/* The desktop AR/EN pill is xl-only; without this, phones and
                tablets had no way to switch language at all. */}
            <LanguageToggle />
            {/* Theme lives here on phones; the floating toggle is desktop only. */}
            <m.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-[rgb(var(--card))]/80 border border-[rgb(var(--border))] text-[rgb(var(--accent))] hover:bg-[rgb(var(--muted))] transition-all duration-200"
              aria-label={t('theme.toggle')}>
              {isDark ? <FaMoon size={18} /> : <FaSun size={18} />}
            </m.button>

            <m.button
              ref={menuButtonRef}
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-[rgb(var(--card))]/80 border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] transition-all duration-200 overflow-hidden group"
              id="site-menu-button"
              aria-expanded={isOpen}
              // Only while the menu exists: it is unmounted when closed.
              aria-controls={isOpen ? 'site-menu' : undefined}
              aria-label={isOpen ? t('a11y.menu_close') : t('a11y.menu_open')}>
              {/* Glow effect on hover */}
              <m.div
                className="absolute inset-0 bg-[rgb(var(--accent))]/8 blur-md opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              <AnimatePresence mode="wait">
                {isOpen ? (
                  <m.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <FiX
                      size={24}
                      className="text-[rgb(var(--foreground))] relative z-10"
                    />
                  </m.div>
                ) : (
                  <m.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <FiMenu
                      size={24}
                      className="text-[rgb(var(--foreground))] relative z-10"
                    />
                  </m.div>
                )}
              </AnimatePresence>
            </m.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Enhanced with modern design */}
      <AnimatePresence>
        {isOpen && (
          <m.nav
            aria-label={t('a11y.main_nav')}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            id="site-menu"
            // Scrolls inside itself: on a phone held sideways (or zoomed) the
            // list is taller than the screen, and the bar it hangs from is
            // fixed, so page scrolling could never reach the last items.
            className="xl:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] shadow-2xl max-h-[calc(100dvh-6.5rem)] overflow-y-auto overscroll-contain">
            {/* Gradient accent on top */}
            <div className="h-1 bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-hover))] to-[rgb(var(--accent))]" />

            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-xl"
                  onClick={() => setIsOpen(false)}>
                  {/* Entrance only, no tap gesture: see the desktop links. */}
                  <m.div
                    initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: revealDelay(index), duration: 0.3 }}
                    className="group relative block px-5 py-3 rounded-xl text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-all duration-200 cursor-pointer font-medium overflow-hidden text-start motion-safe:active:scale-95">
                    {/* Hover gradient background */}
                    <m.div
                      className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--accent))]/10 to-[rgb(var(--accent-hover))]/10 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.2 }}
                    />

                    {/* Border glow on hover */}
                    <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[rgb(var(--accent))]/30 transition-all duration-200" />

                    {/* Number indicator */}
                    {/* Inline order follows the document direction, so in RTL
                        the number sits at the right, before the label. */}
                    <span className="relative z-10 flex items-center gap-3">
                      <span aria-hidden="true" className="text-xs text-[rgb(var(--accent))] font-mono">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </span>

                    {/* Arrow indicator */}
                    <m.span
                      aria-hidden="true"
                      className={`absolute end-4 ${isArabic ? 'rotate-180' : ''} top-1/2 -translate-y-1/2 text-[rgb(var(--accent))] opacity-0 group-hover:opacity-100`}
                      initial={{ x: isArabic ? 10 : -10 }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.2 }}>
                      →
                    </m.span>
                  </m.div>
                </a>
              ))}

              {/* Divider */}
              <m.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{
                  delay: navItems.length * 0.05 + 0.1,
                  duration: 0.3,
                }}
                className="h-px bg-gradient-to-r from-transparent via-[rgb(var(--foreground))]/20 to-transparent my-4"
              />

              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: navItems.length * 0.05 + 0.2,
                  duration: 0.3,
                }}
                className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    downloadCV();
                    setIsOpen(false);
                    // The button unmounts with the menu; without this a
                    // keyboard user is dropped onto <body>. Links are left
                    // alone: they navigate, or the browser follows the hash.
                    menuButtonRef.current?.focus();
                  }}
                  className="relative w-full px-5 py-3 rounded-xl bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))] font-semibold overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 group">
                  {/* Animated gradient on hover */}
                  <m.div
                    className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  {/* Shimmer effect */}
                  <m.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgb(var(--foreground))]/30 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  <span className="relative z-10 flex items-center gap-2 group-hover:text-[rgb(var(--on-scrim))] transition-colors">
                    <FaDownload className="text-sm" />
                    {t('nav.download_cv')}
                  </span>
                </button>
              </m.div>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
