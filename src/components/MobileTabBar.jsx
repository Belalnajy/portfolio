'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiHome, FiLayers, FiPackage, FiLifeBuoy, FiMessageCircle } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import ContactSheet from './ContactSheet';

// Fields that bring up the on-screen keyboard. While one has focus the bar
// steps away (html[data-typing], globals.css), so the keyboard never stacks
// with the floating chrome.
const TEXT_INPUT = 'input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]):not([type=reset]):not([type=range]):not([type=color]):not([type=file]), textarea, select, [contenteditable=""], [contenteditable="true"]';

// 11px labels on a 16px line, never clipped: Cairo's Arabic marks reach
// past the line box, so no overflow clipping (every label was measured to
// fit its 67px slot at 360px, in both languages).
const TabLabel = ({ active, children }) => (
  <span
    className={`max-w-full whitespace-nowrap px-0.5 text-[11px] leading-4 transition-colors duration-200 ${
      active ? 'font-bold text-[rgb(var(--accent))]' : 'font-semibold text-[rgb(var(--muted-foreground))]'
    }`}>
    {children}
  </span>
);

/** One destination: an icon over a label, with a copper pill when current. */
const Tab = ({ tab, active }) => (
  <a
    href={tab.href}
    aria-current={tab.current ? 'page' : undefined}
    // Some labels are shortened to fit a 64px slot; the full name, which
    // starts with the visible word, is what assistive tech reads.
    aria-label={tab.name && tab.name !== tab.label ? tab.name : undefined}
    className="press group relative flex flex-col items-center justify-center gap-0.5 min-w-0 h-full rounded-[18px]">
    <span aria-hidden="true" className="relative flex items-center justify-center w-14 h-8">
      {active && <span className="tab-pill-in absolute inset-0 rounded-full bg-[rgb(var(--accent))]/15" />}
      <span
        className={`relative text-[22px] transition-colors duration-200 ${
          active ? 'text-[rgb(var(--accent-vivid))]' : 'text-[rgb(var(--muted-foreground))] group-active:text-[rgb(var(--foreground))]'
        }`}>
        {tab.icon}
      </span>
    </span>
    <TabLabel active={active}>{tab.label}</TabLabel>
  </a>
);

/**
 * App-style bottom tab bar for phones: a floating pill with four
 * destinations and, in the middle, the way to get in touch (a bottom sheet
 * with WhatsApp, the quick FAQ, the contact form and email). The hamburger
 * sheet keeps the long tail (Now, Blog, the CV). Rescue has a tab of its own:
 * an owner with a stuck project is the visitor most likely to act today.
 * Hidden from md up, where the top navigation takes over.
 */
const MobileTabBar = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const home = isArabic ? '/ar' : '';
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = useCallback(() => setSheetOpen(false), []);
  const contactRef = useRef(null);

  const [pathname, setPathname] = useState('');
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);
  const current = pathname.replace(/^\/ar(?=\/|$)/, '') || '/';
  const onHome = pathname !== '' && current === '/';

  // On the home page the bar follows the reader: Home, then Contact once the
  // contact section is on screen, and still Contact below it (the footer):
  // it is the last section of the page.
  const [contactInView, setContactInView] = useState(false);
  useEffect(() => {
    if (!onHome || typeof IntersectionObserver === 'undefined') return undefined;
    const section = document.getElementById('contact');
    if (!section) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setContactInView(entry.isIntersecting || entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0)),
      {
        rootMargin: '-35% 0px -35% 0px',
      },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [onHome]);

  // Keyboard up, chrome down (phones only; the attribute is inert from md).
  useEffect(() => {
    const root = document.documentElement;
    const phone = window.matchMedia('(max-width: 767.98px)');
    const onFocusIn = (event) => {
      if (phone.matches && event.target instanceof Element && event.target.matches(TEXT_INPUT)) {
        root.setAttribute('data-typing', '');
      }
    };
    const onFocusOut = (event) => {
      const next = event.relatedTarget;
      if (next instanceof Element && next.matches(TEXT_INPUT)) return;
      root.removeAttribute('data-typing');
    };
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      root.removeAttribute('data-typing');
    };
  }, []);

  const tabs = [
    { label: t('nav.home'), href: `${home}/`, route: '/', icon: <FiHome /> },
    { label: t('shell.tab_work'), href: `${home}/work`, route: '/work', icon: <FiLayers /> },
    null, // the contact button
    { label: t('nav.services'), href: `${home}/services`, route: '/services', icon: <FiPackage /> },
    { label: t('nav.rescue_short'), name: t('nav.rescue_project'), href: `${home}/rescue`, route: '/rescue', icon: <FiLifeBuoy /> },
  ].map((tab) => tab && { ...tab, current: pathname !== '' && current === tab.route });

  const contactActive = sheetOpen || (onHome && contactInView);

  return (
    <>
      <nav
        aria-label={t('a11y.tab_bar')}
        className="site-tabbar md:hidden fixed inset-x-3 bottom-[max(8px,env(safe-area-inset-bottom))] z-40 h-[var(--tabbar-h)] rounded-[24px] bg-[rgb(var(--surface))]/85 backdrop-blur-[16px] backdrop-saturate-[1.6] border border-[rgb(var(--border-subtle))] shadow-[var(--elev-3)]">
        <ul className="grid grid-cols-5 h-full px-1">
          {tabs.map((tab) =>
            tab ? (
              <li key={tab.href} className="min-w-0">
                <Tab tab={tab} active={tab.current && !(tab.route === '/' && contactActive)} />
              </li>
            ) : (
              <li key="contact" className="min-w-0">
                <button
                  ref={contactRef}
                  id="tabbar-contact"
                  type="button"
                  onClick={() => setSheetOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={sheetOpen}
                  aria-controls={sheetOpen ? 'contact-sheet' : undefined}
                  className="press group relative flex flex-col items-center justify-center gap-0.5 w-full h-full">
                  {/* Same box as a tab's icon pill, so the label lines up with
                      the others; the raised copper button grows up out of it,
                      over the bar's top edge. */}
                  <span aria-hidden="true" className="relative w-14 h-8">
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[52px] h-[52px] rounded-full flex items-center justify-center bg-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))] text-[24px] ring-4 ring-[rgb(var(--background))] shadow-[0_10px_22px_-8px_rgb(var(--accent)/0.75)]">
                      <FiMessageCircle />
                    </span>
                  </span>
                  <TabLabel active={contactActive}>{t('nav.contact_short')}</TabLabel>
                </button>
              </li>
            ),
          )}
        </ul>
      </nav>
      <ContactSheet
        open={sheetOpen}
        onClose={closeSheet}
      />
    </>
  );
};

export default MobileTabBar;
