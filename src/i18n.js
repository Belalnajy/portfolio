import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { FACT_VARIABLES } from './lib/facts';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './lib/language';

export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE };

/**
 * A standalone instance initialised synchronously in `lng` with that
 * language's bundle, so the server render already carries the right strings.
 *
 * Each route is statically prerendered in its own language (`/` in English,
 * `/ar` in Arabic) and stays in it: switching language is a navigation to
 * the twin route (see src/lib/language.js), never an in-place swap, so the
 * instance only ever holds the one bundle its route imported.
 *
 * i18next initialises synchronously whenever `resources` are passed inline,
 * which is always the case here; `initAsync: false` states that intent
 * rather than leaving it to the default.
 */
export const createI18nInstance = (lng = DEFAULT_LANGUAGE, bundle) => {
  const instance = i18n.createInstance();
  instance.use(initReactI18next).init({
    resources: bundle ? { [lng]: bundle } : {},
    lng,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    // {{projects}}, {{clients}} … resolve in every string without each
    // call site passing them; see src/lib/facts.js.
    interpolation: { escapeValue: false, defaultVariables: FACT_VARIABLES },
    initAsync: false,
  });
  return instance;
};
