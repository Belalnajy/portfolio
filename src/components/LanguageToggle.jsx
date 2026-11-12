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
      className={`press h-11 min-w-11 px-3 flex items-center justify-center rounded-full bg-[rgb(var(--surface))]/70 border border-[rgb(var(--border-subtle))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors duration-200 font-bold ${
        isArabic ? 'text-xs' : 'text-sm font-[family-name:var(--font-cairo)]'
      } ${className}`}>
      {isArabic ? 'EN' : 'عربي'}
    </button>
  );
};

export default LanguageToggle;
