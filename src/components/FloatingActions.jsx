"use client";
import { useRef, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes, FaCommentDots, FaUserAstronaut } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { track } from '@vercel/analytics';
import { whatsappUrl } from './WhatsAppButton';
import { brandColor } from '../lib/brand-colors';
import { useEscapeLayer } from '../lib/useEscapeLayer';

/**
 * Phones only: one button instead of three.
 *
 * A 390px screen was carrying a tab bar plus a WhatsApp button, a FAQ button
 * and a theme toggle, and the floating three sat on top of the hero. The theme
 * toggle moved into the header; the other two live behind this single dock and
 * only appear when it is opened. Desktop keeps its own dedicated buttons, where
 * there is room for them.
 *
 * The FAQ panel owns its own state, so opening it from here is a DOM event
 * rather than lifted state — nothing else has to know the two are related.
 */
const FloatingActions = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const dockRef = useRef(null);

  const close = () => setOpen(false);

  // Escape folds the dock back and returns focus to its button.
  // Focus only comes back from inside the dock (or from nowhere): Escape
  // while typing in the contact form folds the dock but leaves the caret be.
  useEscapeLayer(open, () => {
    setOpen(false);
    const current = document.activeElement;
    if (!current || current === document.body || dockRef.current?.contains(current)) {
      toggleRef.current?.focus();
    }
  });

  const openFaq = () => {
    close();
    window.dispatchEvent(new CustomEvent('faq:open'));
  };

  const onWhatsApp = () => {
    track('whatsapp_click', { placement: 'mobile_dock' });
    close();
  };

  return (
    // .floating-dock hides while the phone menu or the FAQ panel is open, so
    // the button never covers their last items (globals.css).
    <div ref={dockRef} id="contact-dock" className="floating-dock md:hidden fixed end-4 bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.5rem)] z-[9999] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <>
            <m.a
              key="whatsapp"
              href={whatsappUrl(t('whatsapp.message'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWhatsApp}
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              style={{ backgroundColor: brandColor('WhatsApp') }}
              className="flex items-center gap-3 ps-4 pe-3 h-12 rounded-full text-[rgb(var(--scrim))] font-semibold text-sm shadow-lg">
              {t('whatsapp.aria')}
              <FaWhatsapp aria-hidden="true" size={22} />
            </m.a>

            <m.button
              key="faq"
              type="button"
              onClick={openFaq}
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              transition={{ duration: 0.18, delay: 0.04 }}
              className="flex items-center gap-3 ps-4 pe-3 h-12 rounded-full glass-card border border-[rgb(var(--border))] text-[rgb(var(--foreground))] font-semibold text-sm shadow-lg">
              {t('faq.title')}
              <FaUserAstronaut aria-hidden="true" size={20} className="text-[rgb(var(--accent))]" />
            </m.button>
          </>
        )}
      </AnimatePresence>

      <m.button
        ref={toggleRef}
        type="button"
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        aria-expanded={open}
        aria-label={t('actions.contact_menu')}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] text-[rgb(var(--accent-contrast))] shadow-lg flex items-center justify-center">
        <AnimatePresence mode="wait">
          <m.span
            aria-hidden="true"
            key={open ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}>
            {open ? <FaTimes size={22} /> : <FaCommentDots size={24} />}
          </m.span>
        </AnimatePresence>
      </m.button>
    </div>
  );
};

export default FloatingActions;
