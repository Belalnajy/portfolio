"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPalette } from 'react-icons/fa';

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('copper');

  /**
   * Accent presets. Each carries a light and a dark value because one hue
   * cannot serve both: an accent light enough to read on ink is too pale to
   * read on paper, and text on the fill has to flip with it.
   *
   * Every value here is solved to clear 4.5:1 for the accent on the page, for
   * text on the accent fill, on the hover fill, and for the accent on its own
   * chip. scripts/contrast-report.mjs re-checks all of them.
   */
  const themes = [
  { name: 'copper', label: 'Copper',
    light: { accent: '158 100 24', hover: '130 82 20', subtle: '249 246 241' },
    dark:  { accent: '200 127 30', hover: '210 150 70', subtle: '56 36 8' } },
  { name: 'blue', label: 'Ocean Blue',
    light: { accent: '50 110 209', hover: '41 90 171', subtle: '243 246 252' },
    dark:  { accent: '59 130 246', hover: '94 152 248', subtle: '14 30 57' } },
  { name: 'purple', label: 'Royal Purple',
    light: { accent: '148 75 217', hover: '121 62 178', subtle: '249 244 253' },
    dark:  { accent: '168 85 247', hover: '184 116 248', subtle: '32 16 47' } },
  { name: 'green', label: 'Emerald Green',
    light: { accent: '22 130 62', hover: '18 107 51', subtle: '241 248 243' },
    dark:  { accent: '34 197 94', hover: '74 207 123', subtle: '13 73 35' } },
  { name: 'orange', label: 'Sunset Orange',
    light: { accent: '163 95 39', hover: '134 78 32', subtle: '249 244 240' },
    dark:  { accent: '251 146 60', hover: '252 166 95', subtle: '95 55 23' } },
  { name: 'pink', label: 'Hot Pink',
    light: { accent: '196 60 127', hover: '161 49 104', subtle: '252 245 249' },
    dark:  { accent: '236 72 153', hover: '239 105 171', subtle: '61 19 40' } },
  { name: 'cyan', label: 'Cyber Cyan',
    light: { accent: '4 124 144', hover: '3 102 118', subtle: '240 247 248' },
    dark:  { accent: '6 182 212', hover: '51 195 220', subtle: '2 67 78' } },
  ];

  useEffect(() => {
    // 'theme' is the light/dark key; the accent lives under its own key.
    const savedTheme = localStorage.getItem('accent') || 'copper';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeName) => {
    const theme = themes.find((t) => t.name === themeName);
    if (!theme) return;
    const root = document.documentElement.style;
    // Set both variants; the active theme's CSS picks the one it needs, so the
    // choice survives toggling between light and dark.
    root.setProperty('--accent-light', theme.light.accent);
    root.setProperty('--accent-hover-light', theme.light.hover);
    root.setProperty('--accent-subtle-light', theme.light.subtle);
    root.setProperty('--accent-dark', theme.dark.accent);
    root.setProperty('--accent-hover-dark', theme.dark.hover);
    root.setProperty('--accent-subtle-dark', theme.dark.subtle);
    localStorage.setItem('accent', themeName);
  };

  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
    applyTheme(themeName);
    setIsOpen(false);
  };

  return (
    <div className="fixed left-4 md:left-6 bottom-[calc(max(1rem,env(safe-area-inset-bottom))+3.75rem)] md:bottom-24 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-16 left-0 glass-card p-4 rounded-xl shadow-2xl mb-2 min-w-[200px]">
            <h3 className="text-sm font-semibold mb-3 text-[rgb(var(--foreground))]">
              Choose Theme
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((theme) => (
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
                    style={{ backgroundColor: `rgb(${theme.dark.accent})` }}
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
        className="w-14 h-14 rounded-full glass-card border border-[rgb(var(--border-control))]/40 flex items-center justify-center text-[rgb(var(--accent))] shadow-lg hover:shadow-xl transition-shadow relative group">
        <FaPalette className="text-2xl" />

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute left-full ml-4 px-3 py-1 bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] text-[rgb(var(--accent-contrast))] text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Change Theme
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default ThemeSwitcher;
