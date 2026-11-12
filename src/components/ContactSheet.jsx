'use client';
import { useEffect, useRef } from 'react';
import { m, AnimatePresence, useReducedMotion, useDragControls } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiHelpCircle, FiEdit3, FiMail, FiChevronRight, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { track } from '@vercel/analytics';
import { whatsappUrl } from './WhatsAppButton';
import { brandColor } from '../lib/brand-colors';
import { useEscapeLayer } from '../lib/useEscapeLayer';
import { useFocusTrap } from '../lib/useFocusTrap';
import { homeAnchor } from '../lib/home-anchor';
import { showChrome } from '../lib/scroll-chrome';

const EMAIL = 'belalnajy9@gmail.com';
const SPRING = { type: 'spring', stiffness: 420, damping: 40 };

/**
 * The phone's ways to get in touch, as a bottom sheet opened from the tab
 * bar's centre button. It replaces the floating contact button below md,
 * which sat on top of images and text on every page.
 *
 * A modal dialog: focus moves in and is trapped, Escape (through the shared
 * layer stack) or a tap on the scrim closes it, and focus returns to the
 * button that opened it. It can also be dragged down to close by its handle
 * or header (only there, so the list itself can scroll on a short screen),
 * and it closes if the window grows past the phone layout (a rotated
 * tablet), which would otherwise leave the page locked under an invisible
 * sheet.
 */
const ContactSheet = ({ open, onClose }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const reduceMotion = useReducedMotion();
  const sheetRef = useRef(null);
  const dragControls = useDragControls();
  const startDrag = (event) => {
    if (reduceMotion || event.target.closest('button, a')) return;
    dragControls.start(event);
  };

  useFocusTrap(sheetRef, open);
  useEscapeLayer(open, onClose);

  // Locks the page and keeps the header in place while the sheet is up.
  useEffect(() => {
    if (!open) return undefined;
    const root = document.documentElement;
    root.setAttribute('data-sheet-open', '');
    showChrome();
    return () => root.removeAttribute('data-sheet-open');
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const wide = window.matchMedia('(min-width: 768px)');
    const onChange = () => wide.matches && onClose();
    onChange();
    wide.addEventListener('change', onChange);
    return () => wide.removeEventListener('change', onChange);
  }, [open, onClose]);

  const openFaq = () => {
    onClose();
    window.dispatchEvent(new CustomEvent('faq:open'));
  };

  const rows = [
    {
      key: 'whatsapp',
      // Only rendered after a tap, so the number never reaches the
      // prerendered HTML (see WhatsAppButton).
      href: whatsappUrl(t('whatsapp.message')),
      external: true,
      onClick: () => {
        track('whatsapp_click', { placement: 'mobile_sheet' });
        onClose();
      },
      title: 'WhatsApp',
      hint: t('shell.whatsapp_hint'),
      tile: (
        <span
          aria-hidden="true"
          style={{ backgroundColor: brandColor('WhatsApp') }}
          className="w-11 h-11 rounded-[13px] flex items-center justify-center text-[rgb(var(--scrim))] text-[22px]">
          <FaWhatsapp />
        </span>
      ),
    },
    {
      key: 'faq',
      onClick: openFaq,
      title: t('faq.title'),
      hint: t('shell.faq_hint'),
      icon: <FiHelpCircle />,
    },
    {
      key: 'message',
      href: homeAnchor(isArabic, 'contact'),
      onClick: onClose,
      title: t('shell.message'),
      hint: t('shell.message_hint'),
      icon: <FiEdit3 />,
    },
    {
      key: 'email',
      href: `mailto:${EMAIL}`,
      onClick: onClose,
      title: t('shell.email'),
      hint: EMAIL,
      hintLtr: true,
      icon: <FiMail />,
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <m.div
            key="contact-scrim"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.24 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            onClick={onClose}
            className="md:hidden fixed inset-0 z-[60] bg-[rgb(var(--scrim))]/60"
          />
          <m.div
            key="contact-sheet"
            ref={sheetRef}
            id="contact-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-sheet-title"
            aria-describedby="contact-sheet-subtitle"
            tabIndex={-1}
            initial={reduceMotion ? { opacity: 0 } : { y: '100%' }}
            animate={reduceMotion ? { opacity: 1, transition: { duration: 0.2 } } : { y: 0, transition: SPRING }}
            exit={reduceMotion ? { opacity: 0, transition: { duration: 0.16 } } : { y: '100%', transition: { duration: 0.24, ease: [0.4, 0, 1, 1] } }}
            drag={reduceMotion ? false : 'y'}
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.7 }}
            dragSnapToOrigin
            onDragEnd={(_, info) => {
              if (info.offset.y > 90 || info.velocity.y > 600) onClose();
            }}
            className="md:hidden fixed inset-x-0 bottom-0 z-[61] rounded-t-[24px] bg-[rgb(var(--surface-raised))] border-t border-[rgb(var(--border-subtle))] shadow-[var(--elev-3)] max-h-[calc(100dvh-1rem)] overflow-y-auto overscroll-contain focus:outline-none">
            {/* Grab handle */}
            <div aria-hidden="true" onPointerDown={startDrag} className="flex justify-center pt-2.5 pb-1 touch-none">
              <span className="w-9 h-[5px] rounded-full bg-[rgb(var(--muted-foreground))]/35" />
            </div>
            <div className="px-[var(--m-gutter)] pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div onPointerDown={startDrag} className="flex items-start justify-between gap-3 pt-2 pb-4 touch-none">
                <div className="min-w-0">
                  <h2 id="contact-sheet-title" className="font-display text-[22px] leading-tight font-bold text-[rgb(var(--foreground))]">
                    {t('shell.contact_title')}
                  </h2>
                  <p id="contact-sheet-subtitle" className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">
                    <span aria-hidden="true" className="relative inline-flex w-2 h-2 me-2 align-middle">
                      <span className="absolute inset-0 rounded-full bg-[rgb(var(--success))]" />
                    </span>
                    {t('shell.contact_subtitle')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t('shell.close_contact')}
                  className="press shrink-0 -me-1.5 -mt-1 w-11 h-11 rounded-full flex items-center justify-center bg-[rgb(var(--text))]/[0.06] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]">
                  <FiX aria-hidden="true" size={20} />
                </button>
              </div>

              <ul className="rounded-[var(--radius-card)] bg-[rgb(var(--background))]/50 border border-[rgb(var(--border-subtle))] p-1">
                {rows.map((row, index) => {
                  const Tag = row.href ? 'a' : 'button';
                  const linkProps =
                    Tag === 'a'
                      ? {
                          href: row.href,
                          ...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
                        }
                      : { type: 'button' };
                  return (
                    <li key={row.key}>
                      <Tag
                        {...linkProps}
                        onClick={row.onClick}
                        className="press-tint relative w-full flex items-center gap-3.5 min-h-[64px] px-3 py-2.5 rounded-[14px] text-start transition-colors hover:bg-[rgb(var(--text))]/[0.04]">
                        {row.tile ?? (
                          <span
                            aria-hidden="true"
                            className="w-11 h-11 shrink-0 rounded-[13px] flex items-center justify-center text-[20px] bg-[rgb(var(--accent))]/12 text-[rgb(var(--accent-vivid))]">
                            {row.icon}
                          </span>
                        )}
                        <span className="flex-1 min-w-0">
                          <span className="block text-base font-semibold text-[rgb(var(--foreground))]">{row.title}</span>
                          <span
                            dir={row.hintLtr ? 'ltr' : undefined}
                            className={`block truncate text-[13px] text-[rgb(var(--muted-foreground))] ${row.hintLtr && isArabic ? 'text-end' : ''}`}>
                            {row.hint}
                          </span>
                        </span>
                        <FiChevronRight
                          aria-hidden="true"
                          className={`shrink-0 text-[rgb(var(--muted-foreground))]/70 ${isArabic ? '-scale-x-100' : ''}`}
                        />
                        {index < rows.length - 1 && (
                          <span aria-hidden="true" className="absolute bottom-0 end-3 start-[4.25rem] h-px bg-[rgb(var(--border-subtle))]" />
                        )}
                      </Tag>
                    </li>
                  );
                })}
              </ul>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactSheet;
