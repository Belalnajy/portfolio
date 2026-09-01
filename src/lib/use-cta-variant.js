'use client';
import { useEffect, useState } from 'react';
import { track } from '@vercel/analytics';

const STORAGE_KEY = 'cta-variant';

/**
 * Deterministic A/B assignment for the hero's hire-me CTA: the first visit
 * flips a coin and stores it, every later visit reuses the stored arm, so one
 * visitor always sees one wording. Exposures and clicks land in Vercel
 * Analytics as custom events (`cta_exposure`, `cta_click`) with the variant
 * attached — conversion per arm is clicks over exposures.
 *
 * The server renders variant "a"; the stored arm applies after hydration.
 */
export const useCtaVariant = () => {
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    let assigned;
    try {
      assigned = localStorage.getItem(STORAGE_KEY);
      if (assigned !== 'a' && assigned !== 'b') {
        assigned = Math.random() < 0.5 ? 'a' : 'b';
        localStorage.setItem(STORAGE_KEY, assigned);
      }
    } catch {
      // Storage blocked (private mode etc.): show the control, track nothing.
      assigned = 'a';
    }
    setVariant(assigned);
    track('cta_exposure', { variant: assigned });
  }, []);

  const trackCtaClick = (placement) => {
    if (variant) track('cta_click', { variant, placement });
  };

  return { ctaVariant: variant ?? 'a', trackCtaClick };
};
