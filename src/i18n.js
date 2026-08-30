import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const SUPPORTED_LANGUAGES = ['en', 'ar'];
export const DEFAULT_LANGUAGE = 'en';
// Same key the browser language-detector used, so returning visitors keep their choice.
export const LANGUAGE_STORAGE_KEY = 'i18nextLng';

/**
 * Each route is statically prerendered in its own language (`/` in English,
 * `/ar` in Arabic), so detection can't run before the first render — the
 * server markup and the first client render must agree or every translated
 * string fails hydration. The stored or browser preference is applied after
 * mount instead.
 *
 * `pageLanguage` is the language the current route was prerendered in. A
 * stored explicit choice always wins; the browser language is only consulted
 * on the default (English) route — a visitor who opened /ar deliberately
 * should not be bounced to English by their browser locale.
 */
export const resolvePreferredLanguage = (pageLanguage = DEFAULT_LANGUAGE) => {
  if (typeof window === 'undefined') return pageLanguage;

  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.includes(stored)) return stored;
  } catch {
    // localStorage can throw in private mode — fall through to the browser language.
  }

  if (pageLanguage !== DEFAULT_LANGUAGE) return pageLanguage;

  const navigatorLanguage = window.navigator?.language || '';
  const base = navigatorLanguage.split('-')[0];
  return SUPPORTED_LANGUAGES.includes(base) ? base : pageLanguage;
};

// Each bundle is its own chunk. A route imports the one it prerenders in and
// passes it to createI18nInstance; the other only downloads if the visitor
// switches, so nobody pays for both languages up front.
const BUNDLE_LOADERS = {
  en: () => import('./locales/en'),
  ar: () => import('./locales/ar'),
};

export const loadLanguage = async (instance, lng) => {
  if (!SUPPORTED_LANGUAGES.includes(lng)) return;
  if (!instance.hasResourceBundle(lng, 'translation')) {
    const mod = await BUNDLE_LOADERS[lng]();
    instance.addResourceBundle(lng, 'translation', mod.default.translation, true, true);
  }
  await instance.changeLanguage(lng);
};

// The detector plugin used to persist this; keep the behaviour without it.
const persistLanguageChoice = (instance) => {
  if (typeof window === 'undefined') return;
  instance.on('languageChanged', (language) => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore write failures — the language still applies for this session.
    }
  });
};

/**
 * A standalone instance initialised synchronously in `lng` with that
 * language's bundle, so the server render already carries the right strings.
 * `initImmediate: false` makes init fully synchronous.
 */
export const createI18nInstance = (lng = DEFAULT_LANGUAGE, bundle) => {
  const instance = i18n.createInstance();
  instance.use(initReactI18next).init({
    resources: bundle ? { [lng]: bundle } : {},
    lng,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: { escapeValue: false },
    initImmediate: false,
  });
  persistLanguageChoice(instance);
  return instance;
};
