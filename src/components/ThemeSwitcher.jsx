import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPalette } from 'react-icons/fa';

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('blue');

  const themes = [
    { name: 'blue', primary: '96 165 250', label: 'Ocean Blue' },
    { name: 'purple', primary: '168 85 247', label: 'Royal Purple' },
    { name: 'green', primary: '34 197 94', label: 'Emerald Green' },
    { name: 'orange', primary: '251 146 60', label: 'Sunset Orange' },
    { name: 'pink', primary: '236 72 153', label: 'Hot Pink' },
    { name: 'cyan', primary: '6 182 212', label: 'Cyber Cyan' }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'blue';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = themeName => {
    const theme = themes.find(t => t.name === themeName);
    if (theme) {
      document.documentElement.style.setProperty('--primary', theme.primary);
      localStorage.setItem('theme', themeName);
    }
  };

  const handleThemeChange = themeName => {
    setCurrentTheme(themeName);
    applyTheme(themeName);
    setIsOpen(false);
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-16 right-0 glass-card p-4 rounded-xl shadow-2xl mb-2 min-w-[200px]">
            <h3 className="text-sm font-semibold mb-3 text-[rgb(var(--foreground))]">
              Choose Theme
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {themes.map(theme => (
                <motion.button
                  key={theme.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleThemeChange(theme.name)}
                  className={`p-3 rounded-lg transition-all ${
                    currentTheme === theme.name
                      ? 'ring-2 ring-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10'
                      : 'hover:bg-[rgb(var(--muted))]'
                  }`}>
                  <div
                    className="w-8 h-8 rounded-full mx-auto mb-1"
                    style={{ backgroundColor: `rgb(${theme.primary})` }}
                  />
                  <p className="text-xs text-center text-[rgb(var(--foreground))]">
                    {theme.label}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow">
        <FaPalette className="text-2xl" />
      </motion.button>
    </div>
  );
};

export default ThemeSwitcher;
