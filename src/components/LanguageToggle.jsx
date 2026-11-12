'use client';
import { useTranslation } from 'react-i18next';
import { switchLanguage, LANGUAGE_SWITCH_LABEL } from '../lib/language';

/**
 * Compact AR/EN switch for phones and the case-study header, where the
 * desktop navbar pill is not rendered. Shows the language you would switch
 * TO, written in that language, so a reader who cannot read the current one
 * still recognises it. Pressing it navigates to the same page in the other
 * language (src/lib/language.js), keeping the query string and hash.
 */
const LanguageToggle = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const target = isArabic ? 'en' : 'ar';

  return (
    <button
      type="button"
      onClick={() => switchLanguage(target)}
      lang={target}
      aria-label={LANGUAGE_SWITCH_LABEL[target]}
      className={`w-11 h-11 flex items-center justify-center rounded-xl bg-[rgb(var(--card))]/80 border border-[rgb(var(--border))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] active:scale-90 transition-all duration-200 font-bold ${
        isArabic ? 'text-xs' : 'text-sm font-[family-name:var(--font-cairo)]'
      } ${className}`}>
      {isArabic ? 'EN' : 'عربي'}
    </button>
  );
};

export default LanguageToggle;
