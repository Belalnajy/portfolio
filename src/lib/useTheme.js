"use client";
import { useState, useEffect } from 'react';

/**
 * Light/dark preference, shared by the desktop floating toggle and the phone
 * header button so the two can never disagree.
 *
 * Dark is the default and carries no attribute; only light is stamped, which
 * matches the pre-paint script in the root layout.
 */
export const useTheme = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(localStorage.getItem('mode') !== 'light');
  }, []);

  const toggle = () => {
    setIsDark((wasDark) => {
      const next = !wasDark;
      const root = document.documentElement;
      if (next) root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', 'light');
      try {
        localStorage.setItem('mode', next ? 'dark' : 'light');
      } catch {
        // Private mode: the choice still applies for this session.
      }
      return next;
    });
  };

  return { isDark, toggle };
};
