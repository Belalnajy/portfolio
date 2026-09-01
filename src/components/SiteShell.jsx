'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { MotionConfig } from 'framer-motion';
import {
  createI18nInstance,
  resolvePreferredLanguage,
  loadLanguage,
  DEFAULT_LANGUAGE,
} from '../i18n';
import IconDefaults from './IconDefaults';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import Notification from './Notification';
import WhatsAppButton from './WhatsAppButton';
import CommandPalette from './CommandPalette';
import DarkModeToggle from './DarkModeToggle';
import FaqAssistant from './FaqAssistant';

/**
 * Everything a page needs from the shell: toasts and the CV download, without
 * threading props through every section.
 */
const SiteContext = createContext({
  showNotification: () => {},
  downloadCV: () => {},
});

export const useSite = () => useContext(SiteContext);

const ShellContent = ({ pageLang, children }) => {
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false,
  });

  const { t, i18n } = useTranslation();

  // Apply the stored/browser language only after hydration, so the first render
  // matches the markup prerendered in this route's language.
  useEffect(() => {
    const preferred = resolvePreferredLanguage(pageLang);
    if (preferred !== i18n.language) {
      loadLanguage(i18n, preferred);
    }
  }, [i18n, pageLang]);

  useEffect(() => {
    document.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
    // Keep the URL in step with the language on every shell page, so copying
    // the address bar shares the page in the language actually being read.
    const { pathname, hash } = window.location;
    if (i18n.language === 'ar' && !pathname.startsWith('/ar')) {
      const suffix = pathname === '/' ? '' : pathname;
      window.history.replaceState(null, '', `/ar${suffix}${hash}`);
    } else if (i18n.language === 'en' && pathname.startsWith('/ar')) {
      const stripped = pathname.slice(3) || '/';
      window.history.replaceState(null, '', `${stripped}${hash}`);
    }
  }, [i18n.language, i18n]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type, isVisible: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
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
    // reducedMotion="user" drops transform and layout animations for anyone who
    // has asked their OS to reduce motion, without touching opacity fades.
    <MotionConfig reducedMotion="user">
      <SiteContext.Provider value={{ showNotification, downloadCV }}>
        {/* overflow-x-clip contains the decorative entrance offsets and blurred
            blobs, which otherwise let the page pan sideways on phones in RTL.
            `clip` rather than `hidden` so no scroll container is created. */}
        <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors duration-300 relative overflow-x-clip">
          {/* One quiet film-grain layer instead of a particles canvas. */}
          <div className="grain-overlay" aria-hidden="true" />
          <CommandPalette />
          <DarkModeToggle />
          <WhatsAppButton />
          <ScrollProgress />
          <Notification
            message={notification.message}
            type={notification.type}
            isVisible={notification.isVisible}
            onClose={() =>
              setNotification((prev) => ({ ...prev, isVisible: false }))
            }
          />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <FaqAssistant />
          <Footer />
        </div>
      </SiteContext.Provider>
    </MotionConfig>
  );
};

/**
 * The shared chrome every shell page renders inside: providers, navbar,
 * floating controls and footer. `lang` is the language the route prerenders
 * in and `bundle` its translations — only that bundle ships with the route;
 * the other loads if the visitor switches.
 */
const SiteShell = ({ lang = DEFAULT_LANGUAGE, bundle, children }) => {
  const [i18nInstance] = useState(() => createI18nInstance(lang, bundle));
  return (
    <I18nextProvider i18n={i18nInstance}>
      <IconDefaults>
        <ShellContent pageLang={lang}>{children}</ShellContent>
      </IconDefaults>
    </I18nextProvider>
  );
};

export default SiteShell;
