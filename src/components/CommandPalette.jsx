'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'framer-motion';
import { FaSearch, FaHashtag, FaBookOpen, FaBolt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { CASE_STUDIES } from '../lib/case-studies';
import { switchLanguage } from '../lib/language';
import { useEscapeLayer } from '../lib/useEscapeLayer';

/**
 * ⌘K / Ctrl+K command palette: jump to any section, open any case study,
 * download the CV or switch language. Client-only, no external library —
 * a small flex of the craft it navigates.
 */
const CommandPalette = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  // The element focused before the palette opened; focus goes back there.
  const openerRef = useRef(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((prev) => {
          if (!prev) openerRef.current = document.activeElement;
          return !prev;
        });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Escape closes the palette only; a menu or sheet under it stays open.
  useEscapeLayer(open, () => setOpen(false));

  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    setActive(0);
    // Focus after the panel mounts.
    requestAnimationFrame(() => inputRef.current?.focus());
    // On close (Escape, backdrop, ⌘K again) focus returns to where it was,
    // instead of falling to <body> at the top of the page.
    return () => {
      const opener = openerRef.current;
      if (opener && opener.isConnected && opener !== document.body) opener.focus({ preventScroll: true });
    };
  }, [open]);

  const items = useMemo(() => {
    const home = isArabic ? '/ar' : '';
    const sections = [
      { id: 'about', label: t('nav.about'), href: `${home}/#about` },
      { id: 'experience', label: t('nav.timeline'), href: `${home}/cv#experience` },
      { id: 'suite', label: t('nav.suite'), href: `${home}/cv#platform-suite` },
      { id: 'work', label: t('nav.projects'), href: `${home}/work` },
      { id: 'services', label: t('nav.services'), href: `${home}/services` },
      { id: 'now', label: t('nav.now'), href: `${home}/now` },
      { id: 'blog', label: t('nav.blog'), href: `${home}/blog` },
      { id: 'rescue', label: t('nav.rescue'), href: `${home}/rescue` },
      { id: 'testimonials', label: t('nav.testimonials'), href: `${home}/#testimonials` },
      { id: 'contact', label: t('nav.contact'), href: `${home}/#contact` },
    ].map((section) => ({ ...section, group: 'sections', icon: <FaHashtag /> }));

    const caseStudies = Object.entries(CASE_STUDIES).map(([slug, { name }]) => ({
      id: `cs-${slug}`,
      label: name,
      href: `${isArabic ? '/ar' : ''}/case-study/${slug}`,
      group: 'case_studies',
      icon: <FaBookOpen />,
    }));

    const actions = [
      {
        id: 'cv',
        label: t('cmdk.download_cv'),
        href: '/Belal_Nagy_CV.pdf',
        download: true,
        group: 'actions',
        icon: <FaBolt />,
      },
      {
        id: 'lang',
        label: t('cmdk.switch_lang'),
        // Named in the language it switches to; voiced in that language.
        lang: isArabic ? 'en' : 'ar',
        // Same page in the other language, not a jump to the home page.
        language: isArabic ? 'en' : 'ar',
        group: 'actions',
        icon: <FaBolt />,
      },
    ];

    return [...sections, ...caseStudies, ...actions];
  }, [t, isArabic]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.label.toLowerCase().includes(q));
  }, [items, query]);

  const go = useCallback((item) => {
    setOpen(false);
    if (item.download) {
      const a = document.createElement('a');
      a.href = item.href;
      a.download = '';
      a.click();
      return;
    }
    if (item.language) {
      switchLanguage(item.language);
      return;
    }
    // A section of this same page is a hash change, not a reload, so the
    // phone menu (if the palette was opened over it) is told to close.
    window.dispatchEvent(new CustomEvent('menu:close'));
    window.location.href = item.href;
  }, []);

  const onListKeyDown = (event) => {
    // The input is the dialog's only tab stop (the results are options of a
    // listbox, reached with the arrow keys), so Tab stays inside the dialog.
    if (event.key === 'Tab') {
      event.preventDefault();
      inputRef.current?.focus();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((prev) => Math.max(prev - 1, 0));
    } else if (event.key === 'Enter' && filtered[active]) {
      event.preventDefault();
      go(filtered[active]);
    }
  };

  useEffect(() => {
    // Keep the active row in view while arrowing through the list.
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!mounted) return null;

  const groups = ['sections', 'case_studies', 'actions'];

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[10000] bg-[rgb(var(--scrim))]/70 backdrop-blur-sm"
          />
          <div className="fixed inset-x-0 top-[12vh] z-[10001] flex justify-center px-4 pointer-events-none">
            <m.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.15 }}
              role="dialog"
              aria-modal="true"
              aria-label={t('cmdk.placeholder')}
              dir={isArabic ? 'rtl' : 'ltr'}
              className="w-full max-w-xl glass-card bg-[rgb(var(--popover))] rounded-2xl border border-[rgb(var(--border))] shadow-2xl overflow-hidden pointer-events-auto"
              onKeyDown={onListKeyDown}>
              <div className="flex items-center gap-3 px-4 border-b border-[rgb(var(--border))]/60">
                <FaSearch aria-hidden="true" className="text-[rgb(var(--muted-foreground))] text-sm shrink-0" />
                {/* Combobox pattern: focus stays in the input, the highlighted
                    result is announced through aria-activedescendant. */}
                <input
                  ref={inputRef}
                  type="search"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="cmdk-results"
                  aria-autocomplete="list"
                  aria-activedescendant={filtered[active] ? `cmdk-${filtered[active].id}` : undefined}
                  aria-label={t('cmdk.placeholder')}
                  autoComplete="off"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActive(0);
                  }}
                  placeholder={t('cmdk.placeholder')}
                  className="w-full bg-transparent py-4 text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] outline-none text-base sm:text-sm"
                />
                <kbd aria-hidden="true" className="hidden sm:block shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))]">
                  ESC
                </kbd>
              </div>

              {/* How many results the query left, for screen readers. */}
              <p className="sr-only" role="status" aria-live="polite">
                {filtered.length === 0 ? t('cmdk.no_results') : t('a11y.palette_count', { count: filtered.length })}
              </p>
              <div
                ref={listRef}
                id="cmdk-results"
                role="listbox"
                aria-label={t('a11y.palette_results')}
                className="max-h-[46vh] overflow-y-auto overscroll-contain py-2">
                {filtered.length === 0 && (
                  <p aria-hidden="true" className="px-4 py-6 text-sm text-[rgb(var(--muted-foreground))] text-center">
                    {t('cmdk.no_results')}
                  </p>
                )}
                {groups.map((group) => {
                  const groupItems = filtered.filter((item) => item.group === group);
                  if (groupItems.length === 0) return null;
                  return (
                    <div key={group} role="group" aria-labelledby={`cmdk-group-${group}`} className="mb-1">
                      <p id={`cmdk-group-${group}`} className="px-4 pt-2 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
                        {t(`cmdk.${group}`)}
                      </p>
                      {groupItems.map((item) => {
                        const index = filtered.indexOf(item);
                        return (
                          <div
                            key={item.id}
                            id={`cmdk-${item.id}`}
                            role="option"
                            lang={item.lang}
                            aria-selected={index === active}
                            data-active={index === active}
                            onMouseEnter={() => setActive(index)}
                            onClick={() => go(item)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 min-h-[44px] cursor-pointer text-sm text-start transition-colors ${
                              index === active
                                ? 'bg-[rgb(var(--primary))]/12 text-[rgb(var(--foreground))]'
                                : 'text-[rgb(var(--muted-foreground))]'
                            }`}>
                            <span aria-hidden="true" className={`text-xs ${index === active ? 'text-[rgb(var(--primary))]' : ''}`}>
                              {item.icon}
                            </span>
                            <span className="flex-1 truncate">{item.label}</span>
                            {index === active && (
                              <kbd aria-hidden="true" className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))]">
                                ↵
                              </kbd>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </m.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default CommandPalette;
