/**
 * Language routing helpers. Plain module (no React, no i18next) so the root
 * document, the shell and the tests can all import it.
 *
 * The URL decides the language: `/ar` and `/ar/*` are Arabic, every other
 * path is English. Switching language is a real navigation to the twin
 * route, so the document (<html lang dir>, <title>, canonical, structured
 * data, every section) is always the one prerendered for that language.
 */
export const SUPPORTED_LANGUAGES = ['en', 'ar'];
export const DEFAULT_LANGUAGE = 'en';

// Written only when the visitor presses a language switch. A new key on
// purpose: the old `i18nextLng` value was also written by browser-language
// auto-detection, so it never proved anyone had chosen anything.
export const LANGUAGE_CHOICE_KEY = 'lang-choice';

// Accessible name of the language switch, in the language it switches TO and
// starting with the word the button shows ('عربي' / 'EN'), so a reader of
// either language recognises it and a voice user can say what they see
// (WCAG 2.5.3). Keyed by the target language.
export const LANGUAGE_SWITCH_LABEL = {
  ar: 'عربي: التبديل إلى العربية',
  en: 'EN: Switch to English',
};

const ARABIC_PREFIX = /^\/ar(?=\/|$)/;

export const languageOfPath = (pathname) => (ARABIC_PREFIX.test(pathname) ? 'ar' : 'en');

/** The same page in `language`: `/ar/work` <-> `/work`, `/ar` <-> `/`. */
export const twinPath = (pathname, language) => {
  const english = pathname.replace(ARABIC_PREFIX, '') || '/';
  if (language !== 'ar') return english;
  return english === '/' ? '/ar' : `/ar${english}`;
};

/**
 * Remember the choice and go to the twin route, keeping the query string and
 * the hash so campaign parameters and in-page anchors survive the switch.
 */
export const switchLanguage = (language) => {
  if (typeof window === 'undefined' || !SUPPORTED_LANGUAGES.includes(language)) return;
  try {
    window.localStorage.setItem(LANGUAGE_CHOICE_KEY, language);
  } catch {
    // Storage blocked (private mode, cookies off): the navigation still happens.
  }
  const { pathname, search, hash } = window.location;
  window.location.assign(`${twinPath(pathname, language)}${search}${hash}`);
};
