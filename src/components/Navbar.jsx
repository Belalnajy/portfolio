"use client";
import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaDownload, FaGlobe } from 'react-icons/fa';
import {
  FiHome,
  FiUser,
  FiLayers,
  FiPackage,
  FiLifeBuoy,
  FiMail,
  FiClock,
  FiBookOpen,
  FiMessageSquare,
  FiTrendingUp,
  FiBox,
  FiSearch,
  FiChevronRight,
  FiMoon,
  FiSun,
  FiDownload,
  FiArrowRight,
} from 'react-icons/fi';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../lib/useTheme';
import MagneticButton from './MagneticButton';
import Logo from './Logo';
import LanguageToggle from './LanguageToggle';
import { useTranslation } from 'react-i18next';
import { switchLanguage, twinPath, LANGUAGE_SWITCH_LABEL } from '../lib/language';
import { useSite } from './SiteShell';
import { useEscapeLayer } from '../lib/useEscapeLayer';
import { homeAnchor } from '../lib/home-anchor';
import { registerChrome, showChrome } from '../lib/scroll-chrome';

// Hide-on-scroll (phones) lives in src/lib/scroll-chrome.js, shared with
// the tab bar's compact state: one scroll listener for both.

// Sheet rows enter one after another, 20ms apart, the first eight only.
const rowDelay = (index) => Math.min(index, 8) * 0.02;

/** One row of the phone navigation sheet. */
const SheetRow = ({ item, active, index, reduceMotion, isArabic, onNavigate, last }) => (
  <m.li
    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.22, delay: reduceMotion ? 0 : rowDelay(index), ease: [0.22, 1, 0.36, 1] }}>
    <a
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? (item.route ? 'page' : 'location') : undefined}
      className="press-tint group relative flex items-center gap-3.5 h-[52px] ps-3 pe-3 rounded-[14px] transition-colors hover:bg-[rgb(var(--text))]/[0.04]">
      {/* Current page: a copper bar on the inline-start edge. */}
      {active && (
        <span aria-hidden="true" className="absolute start-0 top-3.5 bottom-3.5 w-[3px] rounded-full bg-[rgb(var(--accent))]" />
      )}
      <span
        aria-hidden="true"
        className={`shrink-0 w-9 h-9 rounded-[11px] flex items-center justify-center text-[18px] transition-colors ${
          active
            ? 'bg-[rgb(var(--accent))]/15 text-[rgb(var(--accent-vivid))]'
            : 'bg-[rgb(var(--text))]/[0.06] text-[rgb(var(--muted-foreground))] group-hover:text-[rgb(var(--foreground))]'
        }`}>
        {item.icon}
      </span>
      <span
        className={`flex-1 min-w-0 truncate text-[17px] font-semibold ${
          active ? 'text-[rgb(var(--accent))]' : 'text-[rgb(var(--foreground))]'
        }`}>
        {item.menuLabel ?? item.label}
      </span>
      <FiChevronRight
        aria-hidden="true"
        className={`shrink-0 text-base text-[rgb(var(--muted-foreground))]/70 ${isArabic ? '-scale-x-100' : ''}`}
      />
      {/* Hairline between rows, inset past the icon tile like a native list. */}
      {!last && (
        <span aria-hidden="true" className="absolute bottom-0 end-3 start-[3.75rem] h-px bg-[rgb(var(--border-subtle))]" />
      )}
    </a>
  </m.li>
);

/** A labelled, rounded group of rows. */
const SheetGroup = ({ id, title, items, offset, isActive, reduceMotion, isArabic, onNavigate }) => (
  <section aria-labelledby={id} className="mt-5 first:mt-0">
    <h2 id={id} className="px-1 mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[rgb(var(--muted-foreground))]">
      {title}
    </h2>
    <ul className="rounded-[var(--radius-card)] bg-[rgb(var(--surface))] border border-[rgb(var(--border-subtle))] shadow-[var(--elev-1)] p-1">
      {items.map((item, index) => (
        <SheetRow
          key={item.href}
          item={item}
          active={isActive(item)}
          index={offset + index}
          last={index === items.length - 1}
          reduceMotion={reduceMotion}
          isArabic={isArabic}
          onNavigate={onNavigate}
        />
      ))}
    </ul>
  </section>
);

/** Two-option segmented control (theme, language). */
const Segmented = ({ label, children }) => (
  <div role="group" aria-label={label} className="flex-1 min-w-0 flex p-[3px] rounded-full bg-[rgb(var(--text))]/[0.06] border border-[rgb(var(--border-subtle))]">
    {children}
  </div>
);
const segmentClass = (on) =>
  `flex-1 min-w-0 min-h-11 px-2 inline-flex items-center justify-center gap-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
    on
      ? 'bg-[rgb(var(--surface))] text-[rgb(var(--foreground))] shadow-[var(--elev-2)]'
      : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
  }`;

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

  // While the menu is open the page under it is locked and the header cannot
  // slide away (both in globals.css, keyed on this attribute).
  useEffect(() => {
    if (!isOpen) return undefined;
    const root = document.documentElement;
    root.setAttribute('data-menu-open', '');
    showChrome();
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

  // The header's fill follows the scroll position, and on phones it slides
  // away on the way down (html[data-header], set by the shared scroll
  // controller only when it really hides).
  useEffect(() => registerChrome('header', headerRef.current, setScrolled), []);

  // Intersection Observer for active section detection. Without one the nav
  // simply never highlights a section; the page itself must not break.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    // The sections of the home page, in order. The experience timeline and
    // the platform suite live on /cv now, so they are not observed here.
    const sections = ['home', 'projects', 'testimonials', 'how-we-start', 'about', 'faq', 'contact'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  // Multi-page navigation: anchors live on the home page, routes are their
  // own pages. `home` keeps every link inside the language being read.
  const home = isArabic ? '/ar' : '';
  const [pathname, setPathname] = useState('');
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);
  const onHome = pathname === '/' || pathname === '/ar';

  // `group` places an item in the phone sheet ('main' or 'more'); `desktop`
  // marks the short list the desktop bar shows. `menuLabel` is the sheet's
  // longer wording, where the bar has no room for it.
  const navItems = [
    { label: t('nav.home'), href: `${home}/`, route: '/', icon: <FiHome />, group: 'main', desktop: true },
    { label: t('nav.about'), href: homeAnchor(isArabic, 'about'), anchor: 'about', icon: <FiUser />, group: 'main', desktop: true },
    { label: t('nav.projects'), href: `${home}/work`, route: '/work', icon: <FiLayers />, group: 'main', desktop: true },
    { label: t('nav.services'), href: `${home}/services`, route: '/services', icon: <FiPackage />, group: 'main', desktop: true },
    { label: t('nav.rescue_short'), menuLabel: t('nav.rescue'), href: `${home}/rescue`, route: '/rescue', icon: <FiLifeBuoy />, group: 'main', desktop: true },
    { label: t('nav.now'), href: `${home}/now`, route: '/now', icon: <FiClock />, group: 'more', desktop: true },
    { label: t('nav.blog'), href: `${home}/blog`, route: '/blog', icon: <FiBookOpen />, group: 'more', desktop: true },
    { label: t('nav.testimonials'), href: `${home}/testimonials`, route: '/testimonials', icon: <FiMessageSquare />, group: 'more' },
    { label: t('nav.timeline'), href: `${home}/cv#experience`, icon: <FiTrendingUp />, group: 'more' },
    { label: t('nav.suite'), href: `${home}/cv#platform-suite`, icon: <FiBox />, group: 'more' },
    { label: t('nav.contact'), href: homeAnchor(isArabic, 'contact'), anchor: 'contact', icon: <FiMail />, group: 'main', desktop: true },
  ];

  const desktopNavItems = navItems.filter((item) => item.desktop);
  const mainItems = navItems.filter((item) => item.group === 'main');
  const moreItems = navItems.filter((item) => item.group === 'more');

  // A route item lights up on its page; anchors light up while scrolling home.
  const isActive = (item) => {
    if (item.route) {
      const current = pathname.replace(/^\/ar(?=\/|$)/, '') || '/';
      if (item.route === '/') return current === '/' && (activeSection === 'home' || !['about', 'contact'].includes(activeSection));
      return current === item.route || current.startsWith(`${item.route}/`);
    }
    return Boolean(item.anchor) && onHome && activeSection === item.anchor;
  };
  // The desktop bar keeps its original rule: Home only while the hero shows.
  const isActiveDesktop = (item) =>
    item.route === '/' ? (pathname.replace(/^\/ar(?=\/|$)/, '') || '/') === '/' && activeSection === 'home' : isActive(item);

  const closeMenu = () => setIsOpen(false);

  // The sheet's search field opens the command palette, which is otherwise
  // keyboard-only (Ctrl+K). The palette is modal; focus comes back here.
  const openSearch = () => window.dispatchEvent(new CustomEvent('palette:open'));

  const languageLink = (language) => (pathname ? twinPath(pathname, language) : undefined);
  const chooseLanguage = (language) => (event) => {
    event.preventDefault();
    if ((language === 'ar') === isArabic) return;
    switchLanguage(language);
  };

  return (
    // <header> is the page's banner landmark; the link lists inside it are
    // the navigation landmarks (desktop bar, phone menu). No transform and no
    // backdrop-filter on the header itself: either would make it the
    // containing block of the fixed sheet inside it (see globals.css).
    <header ref={headerRef} className="site-header fixed inset-x-0 top-0 z-50">
      {/* The fill: transparent over the top of the page, frosted once the
          page has scrolled, solid while the menu sheet hangs from it. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b transition-[opacity,background-color,border-color] duration-300 ${
          isOpen
            ? 'bg-[rgb(var(--background))] border-[rgb(var(--border-subtle))] opacity-100'
            : scrolled
              ? 'bg-[rgb(var(--surface))]/80 md:bg-[rgb(var(--surface))]/90 backdrop-blur-[16px] backdrop-saturate-[1.6] border-[rgb(var(--border-subtle))] opacity-100'
              : 'border-transparent opacity-0'
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-[var(--m-gutter)] sm:px-6 lg:px-8 animate-fadeInDown">
        <div className="flex items-center justify-between gap-3 h-14 md:h-16 xl:h-20">
          {/* Logo with enhanced animation */}
          <m.a
            href={`${home}/`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={t('a11y.home_link')}
            className="flex items-center gap-2.5 md:gap-3 min-h-11 min-w-11 cursor-pointer group relative">
              {/* The mark spells B at rest and rearranges into N on hover. */}
              <Logo size={34} className="shrink-0 w-7 h-7 md:w-[34px] md:h-[34px]" />
              {/* Below 360px the wordmark is visually hidden (the mark and the
                  link's accessible name stay): at 320 it pushed the menu
                  button off the screen. */}
              <div className="relative max-[359px]:sr-only">
                {/* lang="en": on /ar the :lang(ar) reset would otherwise strip
                    the Latin wordmark's tight tracking. */}
                <span lang="en" className="relative text-lg md:text-2xl font-bold text-[rgb(var(--foreground))] tracking-tight flex items-center whitespace-nowrap">
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
                  aria-current={isActiveDesktop(item) ? (item.route ? 'page' : 'location') : undefined}
                  className="cursor-pointer relative rounded-full">
                  {/* A plain div: framer-motion gives any element with a tap
                      gesture tabindex=0, which made every link two tab stops. */}
                  <div
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-105 motion-safe:active:scale-95 ${
                      isActiveDesktop(item)
                        ? 'text-[rgb(var(--primary))] font-semibold'
                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                    }`}>
                    {isActiveDesktop(item) && (
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

            {/* Resume button: an outline pill. The filled copper is kept for
                the one primary action on a page (the hero's contact CTA). */}
            <MagneticButton
              type="button"
              onClick={downloadCV}
              className="group relative min-h-[44px] px-5 py-2 rounded-full border border-[rgb(var(--border-control))] text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] font-semibold overflow-hidden transition-colors duration-300 flex items-center gap-2">
              <span className="relative z-10 flex items-center gap-2">
                <FaDownload className="text-sm" />
                {t('nav.download_cv')}
              </span>
            </MagneticButton>
          </div>

          {/* Phone and tablet controls. Below md: the language pill and the
              menu only (theme lives in the sheet); md to xl keeps the theme
              button too. */}
          <div className="xl:hidden flex items-center gap-2 shrink-0">
            {/* The desktop AR/EN pill is xl-only; without this, phones and
                tablets had no way to switch language at all. */}
            <LanguageToggle />
            <m.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="hidden md:flex w-11 h-11 items-center justify-center rounded-full bg-[rgb(var(--surface))]/70 border border-[rgb(var(--border-subtle))] text-[rgb(var(--accent))] hover:bg-[rgb(var(--muted))] transition-colors duration-200"
              aria-label={t('theme.toggle')}>
              {isDark ? <FaMoon size={18} /> : <FaSun size={18} />}
            </m.button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`press relative w-11 h-11 flex items-center justify-center rounded-full border transition-colors duration-200 ${
                isOpen
                  ? 'bg-[rgb(var(--text))]/[0.08] border-transparent'
                  : 'bg-[rgb(var(--surface))]/70 border-[rgb(var(--border-subtle))] hover:bg-[rgb(var(--muted))]'
              }`}
              id="site-menu-button"
              aria-expanded={isOpen}
              // Only while the menu exists: it is unmounted when closed.
              aria-controls={isOpen ? 'site-menu' : undefined}
              aria-label={isOpen ? t('a11y.menu_close') : t('a11y.menu_open')}>
              {/* Two bars that cross into an X. Transform only; under reduced
                  motion they simply switch. */}
              <span aria-hidden="true" className="relative block w-[18px] h-3">
                <span
                  className={`absolute inset-x-0 h-[2px] rounded-full bg-[rgb(var(--foreground))] transition-transform duration-[260ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                    isOpen ? 'top-[5px] rotate-45' : 'top-0.5'
                  }`}
                />
                <span
                  className={`absolute inset-x-0 h-[2px] rounded-full bg-[rgb(var(--foreground))] transition-transform duration-[260ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                    isOpen ? 'top-[5px] -rotate-45' : 'top-[8px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* The phone and tablet menu: a full-width sheet hanging from the
          header, scrolling inside itself, with its actions pinned at the
          bottom. It stays inside <header> (the focusout rule above) and is
          unmounted when closed. */}
      <AnimatePresence>
        {isOpen && (
          <m.nav
            key="site-menu"
            id="site-menu"
            aria-label={t('a11y.main_nav')}
            initial={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, transition: { duration: 0.16, ease: 'easeOut' } }}
            className="xl:hidden fixed inset-x-0 top-[var(--header-h)] bottom-0 flex flex-col bg-[rgb(var(--background))]">
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
              <div className="mx-auto max-w-xl px-[var(--m-gutter)] pt-3 pb-6">
                {/* Search: the command palette, reachable by touch. */}
                <button
                  type="button"
                  onClick={openSearch}
                  className="press w-full flex items-center gap-3 h-12 px-4 mb-6 rounded-full bg-[rgb(var(--text))]/[0.06] border border-[rgb(var(--border-subtle))] text-[rgb(var(--muted-foreground))] text-[15px] text-start">
                  <FiSearch aria-hidden="true" className="shrink-0 text-lg" />
                  <span className="flex-1 truncate">{t('shell.search')}</span>
                </button>

                <SheetGroup
                  id="site-menu-main"
                  title={t('shell.group_main')}
                  items={mainItems}
                  offset={0}
                  isActive={isActive}
                  reduceMotion={reduceMotion}
                  isArabic={isArabic}
                  onNavigate={closeMenu}
                />
                <SheetGroup
                  id="site-menu-more"
                  title={t('shell.group_more')}
                  items={moreItems}
                  offset={mainItems.length}
                  isActive={isActive}
                  reduceMotion={reduceMotion}
                  isArabic={isArabic}
                  onNavigate={closeMenu}
                />
              </div>
            </div>

            {/* Pinned footer: preferences, then the two actions. */}
            <div className="shrink-0 border-t border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]/60">
              <div className="mx-auto max-w-xl px-[var(--m-gutter)] pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] space-y-3">
                <div className="flex gap-2.5">
                  <Segmented label={t('shell.theme')}>
                    <button type="button" aria-pressed={isDark} onClick={() => !isDark && toggleTheme()} className={segmentClass(isDark)}>
                      <FiMoon aria-hidden="true" className="shrink-0" />
                      {t('shell.theme_dark')}
                    </button>
                    <button type="button" aria-pressed={!isDark} onClick={() => isDark && toggleTheme()} className={segmentClass(!isDark)}>
                      <FiSun aria-hidden="true" className="shrink-0" />
                      {t('shell.theme_light')}
                    </button>
                  </Segmented>
                  <Segmented label={t('shell.language')}>
                    <a
                      href={languageLink('en')}
                      lang="en"
                      hrefLang="en"
                      aria-current={!isArabic ? 'true' : undefined}
                      onClick={chooseLanguage('en')}
                      className={segmentClass(!isArabic)}>
                      English
                    </a>
                    <a
                      href={languageLink('ar')}
                      lang="ar"
                      hrefLang="ar"
                      aria-current={isArabic ? 'true' : undefined}
                      onClick={chooseLanguage('ar')}
                      className={`${segmentClass(isArabic)} font-[family-name:var(--font-cairo)]`}>
                      العربية
                    </a>
                  </Segmented>
                </div>
                <div className="grid grid-cols-2 max-[359px]:grid-cols-1 gap-2.5">
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
                    className="press min-h-12 px-3 inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-[rgb(var(--border-control))] text-[rgb(var(--foreground))] text-sm font-semibold">
                    {/* The icon makes room for the Arabic label on narrow phones. */}
                    <FiDownload aria-hidden="true" className="shrink-0 max-[399px]:hidden" />
                    <span className="truncate">{t('nav.download_cv')}</span>
                  </button>
                  <a
                    href={homeAnchor(isArabic, 'contact')}
                    onClick={closeMenu}
                    className="press min-h-12 px-3 inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))] text-sm font-bold shadow-[0_8px_20px_-8px_rgb(var(--accent)/0.6)]">
                    <span className="truncate">{t('shell.start_project')}</span>
                    <FiArrowRight aria-hidden="true" className={`shrink-0 ${isArabic ? '-scale-x-100' : ''}`} />
                  </a>
                </div>
              </div>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
