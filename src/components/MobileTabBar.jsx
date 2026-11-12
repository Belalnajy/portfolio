'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiHome, FiLayers, FiPackage, FiLifeBuoy, FiMessageCircle } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import ContactSheet from './ContactSheet';
import { registerChrome, expandTabbar } from '../lib/scroll-chrome';

// Fields that bring up the on-screen keyboard. While one has focus the bar
// steps away (html[data-typing], globals.css), so the keyboard never stacks
// with the floating chrome.
const TEXT_INPUT = 'input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]):not([type=reset]):not([type=range]):not([type=color]):not([type=file]), textarea, select, [contenteditable=""], [contenteditable="true"]';

// 11px labels on a 16px line, never clipped: Cairo's Arabic marks reach
// past the line box, so no overflow clipping (every label was measured to
// fit its 67px slot at 360px, in both languages). In the compact bar the
// label fades out (opacity only): it is still the link's accessible name.
const TabLabel = ({ active, children }) => (
  <span
    className={`tabbar-label max-w-full whitespace-nowrap px-0.5 text-[11px] leading-4 ${
      active ? 'font-bold text-[var(--tab-ink-active)]' : 'font-semibold text-[var(--tab-ink)]'
    }`}>
    {children}
  </span>
);

/** One destination: an icon over a label. The lens behind it is shared. */
const Tab = ({ tab, active, onPress }) => (
  <a
    href={tab.href}
    onClick={onPress}
    aria-current={tab.current ? 'page' : undefined}
    // Some labels are shortened to fit a 64px slot; the full name, which
    // starts with the visible word, is what assistive tech reads.
    aria-label={tab.name && tab.name !== tab.label ? tab.name : undefined}
    className="press group relative flex flex-col items-center justify-center gap-0.5 min-w-0 h-full rounded-[18px]">
    <span aria-hidden="true" className="relative flex items-center justify-center w-14 h-8">
      <span
        className={`relative text-[22px] transition-colors duration-200 ${
          active ? 'text-[var(--tab-icon-active)]' : 'text-[var(--tab-ink)] group-active:text-[rgb(var(--foreground))]'
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
 *
 * Liquid glass (globals.css, "Tab bar"): a translucent, blurred and
 * saturated layer with an inner highlight, and a solid fallback where
 * backdrop-filter, transparency or colours are unavailable. On the way down
 * the page it shrinks to a compact pill (html[data-tabbar=compact], set by the
 * shared scroll controller only when it really is compact); scrolling up,
 * the top or the bottom of the page, or a touch on the bar restores it. The
 * current tab sits on one lens that slides between tabs on a spring.
 */
const MobileTabBar = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const home = isArabic ? '/ar' : '';
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = useCallback(() => setSheetOpen(false), []);
  const contactRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => registerChrome('tabbar', barRef.current), []);

  // A tapped tab takes the lens at once, so it slides there while the next
  // page loads. Cleared when the page comes back from the back/forward cache.
  const [pressed, setPressed] = useState(null);
  useEffect(() => {
    const onShow = (event) => event.persisted && setPressed(null);
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

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
  const CONTACT_SLOT = 2;
  const activeSlot = contactActive ? CONTACT_SLOT : tabs.findIndex((tab) => tab?.current);
  const lensSlot = pressed ?? (activeSlot === -1 ? null : activeSlot);

  // The lens slides only once it has a place: its first position (known
  // after hydration) is drawn without a transition.
  const [lensReady, setLensReady] = useState(false);
  useEffect(() => {
    if (lensSlot === null || lensReady) return undefined;
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setLensReady(true)));
    return () => cancelAnimationFrame(frame);
  }, [lensSlot, lensReady]);

  return (
    <>
      <nav
        ref={barRef}
        aria-label={t('a11y.tab_bar')}
        // Any touch on the compact bar brings it back to full size.
        onPointerDown={expandTabbar}
        data-lens-ready={lensReady ? '' : undefined}
        className="site-tabbar md:hidden fixed inset-x-3 bottom-[max(8px,env(safe-area-inset-bottom))] z-40 h-[var(--tabbar-h)]">
        <div aria-hidden="true" className="tabbar-glass" />
        {/* The lens: one highlight for the current tab, moved by a transform
            (see .tabbar-lens), so it slides instead of appearing. */}
        <div aria-hidden="true" className="tabbar-rail">
          <span className="tabbar-lens" data-on={lensSlot !== null ? '' : undefined} style={{ '--k': lensSlot ?? CONTACT_SLOT }}>
            <span className="tabbar-lens-pill" />
          </span>
        </div>
        <ul className="relative grid grid-cols-5 h-full px-1">
          {tabs.map((tab, index) =>
            tab ? (
              <li key={tab.href} className="tabbar-slot min-w-0" style={{ '--i': index }}>
                <Tab
                  tab={tab}
                  active={lensSlot === index}
                  onPress={(event) => {
                    if (!event.defaultPrevented && !event.metaKey && !event.ctrlKey && !event.shiftKey) setPressed(index);
                  }}
                />
              </li>
            ) : (
              <li key="contact" className="tabbar-slot min-w-0" style={{ '--i': index }}>
                <button
                  ref={contactRef}
                  id="tabbar-contact"
                  type="button"
                  onClick={() => setSheetOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={sheetOpen}
                  aria-controls={sheetOpen ? 'contact-sheet' : undefined}
                  className="press group relative flex flex-col items-center justify-center gap-0.5 w-full h-full">
                  {/* Same box as a tab's icon, so the label lines up with the
                      others; the raised copper button grows up out of it,
                      over the bar's top edge. */}
                  <span aria-hidden="true" className="relative w-14 h-8">
                    <span className="tabbar-fab absolute left-1/2 -translate-x-1/2 bottom-0 w-[52px] h-[52px] rounded-full flex items-center justify-center text-[24px]">
                      <FiMessageCircle />
                    </span>
                  </span>
                  <TabLabel active={lensSlot === CONTACT_SLOT}>{t('nav.contact_short')}</TabLabel>
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
