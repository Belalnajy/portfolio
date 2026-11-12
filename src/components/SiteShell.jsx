'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import MotionProvider from './MotionProvider';
import { createI18nInstance, DEFAULT_LANGUAGE } from '../i18n';
import IconDefaults from './IconDefaults';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import Notification from './Notification';
import { track } from '@vercel/analytics';
import WhatsAppButton from './WhatsAppButton';
import FloatingActions from './FloatingActions';
import DarkModeToggle from './DarkModeToggle';
import MobileTabBar from './MobileTabBar';
import dynamic from 'next/dynamic';

// Neither is needed to paint or to hydrate the page: the FAQ panel carries a
// large bilingual knowledge base and the palette only matters once someone
// presses Ctrl+K. Both load after hydration in their own chunks.
const FaqAssistant = dynamic(() => import('./FaqAssistant'), { ssr: false });
const CommandPalette = dynamic(() => import('./CommandPalette'), { ssr: false });

/**
 * Everything a page needs from the shell: toasts and the CV download, without
 * threading props through every section.
 */
const SiteContext = createContext({
  showNotification: () => {},
  downloadCV: () => {},
});

export const useSite = () => useContext(SiteContext);

const ShellContent = ({ children }) => {
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false,
  });

  const { t } = useTranslation();

  // Installable PWA: register the hand-written service worker (public/sw.js)
  // once per page load. Production only — caching dev builds only confuses.
  useEffect(() => {
    if (
      process.env.NODE_ENV !== 'production' ||
      !('serviceWorker' in navigator)
    ) {
      return;
    }
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Registration failing (old browser, blocked storage) costs nothing:
      // the site simply stays a plain website.
    });
  }, []);

  // Smooth anchor scrolling switches on only after the page has loaded and
  // the browser has settled on the URL's #section (see globals.css), so a
  // link from another page lands on its section without a long glide.
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const enable = () => {
      frame = requestAnimationFrame(() => root.setAttribute('data-smooth', ''));
    };
    if (document.readyState === 'complete') enable();
    else window.addEventListener('load', enable, { once: true });
    return () => {
      window.removeEventListener('load', enable);
      cancelAnimationFrame(frame);
    };
  }, []);

  // One toast at a time: a new one restarts the clock, so it is never hidden
  // early by the timer of the toast it replaced.
  const hideTimer = useRef(null);
  const announceCount = useRef(0);
  useEffect(() => () => clearTimeout(hideTimer.current), []);

  // Errors carry instructions (an address to write to instead), so they stay
  // long enough to be read twice; confirmations clear sooner. Both can be
  // dismissed, and both are announced (see Notification).
  const showNotification = (message, type = 'success') => {
    // A fresh key per call, so the same message twice is announced twice.
    announceCount.current += 1;
    setNotification({ message, type, isVisible: true, key: announceCount.current });
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setNotification((prev) => ({ ...prev, isVisible: false }));
    }, type === 'error' ? 10000 : 5000);
  };

  const downloadCV = async () => {
    try {
      const response = await fetch('/Belal_Nagy_CV.pdf');
      if (!response.ok) throw new Error('Failed to download CV');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Belal_Nagy_CV.pdf';
      track('cv_download');
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showNotification(t('notifications.cv_success'));
    } catch (error) {
      console.error('Error downloading CV:', error);
      showNotification(t('notifications.cv_error'), 'error');
    }
  };

  return (
    <MotionProvider>
      <SiteContext.Provider value={{ showNotification, downloadCV }}>
        {/* overflow-x-clip contains the decorative entrance offsets and blurred
            blobs, which otherwise let the page pan sideways on phones in RTL.
            `clip` rather than `hidden` so no scroll container is created. */}
        <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors duration-300 relative overflow-x-clip">
          {/* First stop for keyboard users: past the navigation to the page.
              Hidden until focused. Keep it the first focusable element. */}
          <a href="#main" className="skip-link">
            {t('a11y.skip_to_content')}
          </a>
          {/* One quiet film-grain layer instead of a particles canvas. */}
          <div className="grain-overlay" aria-hidden="true" />
          <ScrollProgress />
          <Notification
            message={notification.message}
            type={notification.type}
            isVisible={notification.isVisible}
            announceKey={notification.key}
            closeLabel={t('a11y.close_notification')}
            onClose={() =>
              setNotification((prev) => ({ ...prev, isVisible: false }))
            }
          />
          <Navbar />
          {/* tabIndex -1 so the skip link can move focus here, not just scroll. */}
          <main id="main" tabIndex={-1} className="site-main relative z-10 focus:outline-none">
            {children}
          </main>
          <Footer />
          {/* Floating controls come after the page in the DOM, so the tab
              order is navigation, content, footer, then these; their fixed
              positioning places them on screen regardless. On phones the tab
              bar's centre button is the way to get in touch (a sheet); from
              md the floating dock below takes over. */}
          <MobileTabBar />
          {/* The ways to get in touch that float over every page, grouped as
              one complementary landmark rather than loose content. */}
          <aside aria-label={t('actions.contact_menu')}>
            <FloatingActions />
            <FaqAssistant />
            <WhatsAppButton />
          </aside>
          <DarkModeToggle />
          <CommandPalette />
        </div>
      </SiteContext.Provider>
    </MotionProvider>
  );
};

/**
 * The shared chrome every shell page renders inside: providers, navbar,
 * floating controls and footer. `lang` is the language the route prerenders
 * in and `bundle` its translations — only that bundle ships with the route;
 * switching language navigates to the twin route, which ships the other.
 */
const SiteShell = ({ lang = DEFAULT_LANGUAGE, bundle, children }) => {
  const [i18nInstance] = useState(() => createI18nInstance(lang, bundle));
  return (
    <I18nextProvider i18n={i18nInstance}>
      <IconDefaults>
        <ShellContent>{children}</ShellContent>
      </IconDefaults>
    </I18nextProvider>
  );
};

export default SiteShell;
