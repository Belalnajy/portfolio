"use client";
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../lib/useTheme';

/**
 * Desktop only. Phones get the same control in the header instead, so the
 * bottom of a small screen is not three floating buttons and a tab bar.
 */
const DarkModeToggle = () => {
  const { t } = useTranslation();
  const { isDark, toggle } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="hidden md:flex fixed left-6 bottom-6 z-50 w-14 h-14 rounded-full glass-card border border-[rgb(var(--border-control))]/40 items-center justify-center text-[rgb(var(--accent))] shadow-lg hover:shadow-xl transition-all"
      aria-label={t('theme.toggle')}>
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 1.1 }}
        transition={{ duration: 0.3 }}>
        {isDark ? <FaMoon className="text-2xl" /> : <FaSun className="text-2xl" />}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;
