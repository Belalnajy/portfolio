import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('mode');
    if (savedTheme) {
      const isDarkMode = savedTheme === 'dark';
      setIsDark(isDarkMode);
      applyTheme(isDarkMode);
    } else {
      // Default to dark mode
      setIsDark(true);
      applyTheme(true);
    }
  }, []);

  const applyTheme = (isDarkMode) => {
    if (isDarkMode) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('mode', isDarkMode ? 'dark' : 'light');
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    applyTheme(newIsDark);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="fixed left-6 bottom-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-indigo-500 dark:to-purple-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
      aria-label="Toggle dark mode">
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : 180,
          scale: isDark ? 1 : 1.1,
        }}
        transition={{ duration: 0.3 }}>
        {isDark ? (
          <FaMoon className="text-2xl" />
        ) : (
          <FaSun className="text-2xl" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;
