"use client";
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { m, AnimatePresence, useDragControls, useReducedMotion } from 'framer-motion';
import {
  FaTimes,
  FaCode,
  FaLayerGroup,
  FaBookOpen,
} from 'react-icons/fa';
import { getTechIcon, secondaryLink, trackCaseStudy, trackSecondary } from './Projects';
import { useTranslation } from 'react-i18next';
import DeviceFrame, { frameKind, hostOf } from './DeviceFrame';
import { useFocusTrap } from '../lib/useFocusTrap';
import { useEscapeLayer } from '../lib/useEscapeLayer';
import ProjectKindLabel from './ProjectKindLabel';

const MOBILE_QUERY = '(max-width: 639px)';

const useIsMobile = () => {
  // Starts false so the server markup and first client render agree.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return isMobile;
};

const ProjectModal = ({ project, isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const dragControls = useDragControls();
  const dialogRef = useRef(null);
  // Portals need a DOM target, so nothing renders until after mount.
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Everything behind the sheet is made inert while it is open: not
  // clickable, not focusable, not in the accessibility tree, so a screen
  // reader's virtual cursor cannot wander into the page underneath.
  // Declared before the focus trap so that on close the page is live again
  // before the trap hands focus back to the card.
  const active = isOpen && mounted && !!project;
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!active || !dialog) return undefined;
    const behind = [...document.body.children].filter(
      (el) => !el.contains(dialog) && !el.hasAttribute('data-modal-backdrop') && !el.inert,
    );
    behind.forEach((el) => {
      el.inert = true;
    });
    return () =>
      behind.forEach((el) => {
        el.inert = false;
      });
  }, [active]);

  // Tab stays inside the sheet; focus returns to the card on close.
  useFocusTrap(dialogRef, active);

  // The trap focuses the first control, the close button, which then wore
  // a focus ring on every open. The sheet itself takes focus instead (it is
  // the labelled dialog, so the title is what gets announced); Tab goes on
  // to the close button as before. Runs after the trap's own effect.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!active || !dialog) return undefined;
    dialog.focus({ preventScroll: true, focusVisible: false });
    // Shift+Tab from the sheet itself would leave it: the trap only wraps
    // from its first control. Wrap to the last one here.
    const onKeyDown = (event) => {
      if (event.key !== 'Tab' || !event.shiftKey || document.activeElement !== dialog) return;
      const controls = [...dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')].filter(
        (el) => el.offsetParent !== null,
      );
      if (controls.length === 0) return;
      event.preventDefault();
      controls[controls.length - 1].focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useEscapeLayer(isOpen, onClose);

  if (!mounted || !project) return null;

  const secondary = secondaryLink(project);
  const shortLabel = secondary && {
    live: 'mPages.live_short',
    app_store: 'mPages.app_store_short',
    github: 'mPages.source_short',
  }[secondary.type];

  // On phones the sheet rises from the bottom edge (the site's sheet
  // spring); on wider screens it scales in as a centred dialog. With reduced
  // motion it only fades.
  const sheetMotion = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      }
    : isMobile
    ? {
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%' },
        transition: { type: 'spring', damping: 40, stiffness: 420 },
      }
    : {
        initial: { opacity: 0, scale: 0.96, y: 16 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96, y: 16 },
        transition: { type: 'spring', damping: 26, stiffness: 300 },
      };

  const handleDragEnd = (_event, info) => {
    // A decisive downward flick, or a drag past a quarter of the sheet, closes it.
    if (info.offset.y > 140 || info.velocity.y > 600) onClose();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — above the navbar and the floating action buttons */}
          <m.div
            data-modal-backdrop=""
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-[rgb(var(--scrim))]/75 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:p-6 pointer-events-none">
            <m.div
              {...sheetMotion}
              drag={isMobile ? 'y' : false}
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={handleDragEnd}
              ref={dialogRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label={project.title}
              className="relative w-full sm:max-w-4xl max-h-[92dvh] sm:max-h-[90vh] flex flex-col glass-card bg-[rgb(var(--background))] rounded-t-3xl sm:rounded-2xl shadow-2xl pointer-events-auto border border-[rgb(var(--border))]/50 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky header: drag handle on mobile, always-reachable close button */}
              <div className="relative shrink-0 border-b border-[rgb(var(--border))]/40 bg-[rgb(var(--background))]/95 backdrop-blur-xl">
                <div
                  onPointerDown={(event) => dragControls.start(event)}
                  className="sm:hidden pt-3 pb-1 flex justify-center cursor-grab active:cursor-grabbing touch-none"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-11 rounded-full bg-[rgb(var(--muted-foreground))]/40" />
                </div>

                <div className="flex items-center gap-3 px-4 sm:px-6 py-3">
                  <span className="shrink-0 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[rgb(var(--muted))]/40 text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))]">
                    {t(`projects.industries.${project.industry}`)}
                  </span>
                  <h2 className="flex-1 min-w-0 truncate text-sm sm:text-base font-bold text-[rgb(var(--foreground))] text-start">
                    {project.title}
                  </h2>
                  <button
                    onClick={onClose}
                    type="button"
                    className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-[rgb(var(--muted))]/30 hover:bg-[rgb(var(--muted))]/60 text-[rgb(var(--foreground))] transition-colors"
                    aria-label={t('projects.modal.close')}
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              </div>

              {/* Scrollable body. Focusable so it can be scrolled with the
                  arrow keys when it holds no link to tab to. */}
              <div tabIndex={0} className="flex-1 overflow-y-auto overscroll-contain focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[rgb(var(--accent))]">
                {/* Cover, in the same frame as the card that opened the sheet. */}
                <div className="px-3 pt-3 sm:px-5 sm:pt-5">
                  <DeviceFrame
                    src={project.image}
                    alt={project.title}
                    kind={frameKind(project.image, project.mockups)}
                    host={hostOf(project.live)}
                    // The sheet is 896px wide from 640 up, less its margin.
                    sizes="(min-width: 640px) 856px, calc(100vw - 24px)"
                  />
                </div>

                <div className="p-5 sm:p-8 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Main details */}
                    <div className="flex-1 space-y-6 min-w-0">
                      <div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[rgb(var(--foreground))] mb-3 text-start leading-tight">
                          {project.title}
                        </h3>
                        <ProjectKindLabel kind={project.kind} className="mb-3 sm:mb-4" />
                        <p className="text-base sm:text-lg text-[rgb(var(--muted-foreground))] leading-relaxed text-start">
                          {project.description}
                        </p>
                      </div>

                      {/* Features list */}
                      <div className="space-y-4 text-start">
                        <h4 className="text-lg sm:text-xl font-semibold text-[rgb(var(--foreground))] border-b border-[rgb(var(--border))]/50 pb-2">
                          {t('projects.modal.features')}
                        </h4>
                        <ul className="space-y-3">
                          {project.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm sm:text-base text-[rgb(var(--muted-foreground))]"
                            >
                              <FaCode className="mt-1 text-[rgb(var(--primary))] shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Sibling deployments — same engine, different brand identity */}
                      {project.suite && (
                        <div className="space-y-4 text-start">
                          <h4 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-[rgb(var(--foreground))] border-b border-[rgb(var(--border))]/50 pb-2">
                            <FaLayerGroup className="text-[rgb(var(--primary))]" />
                            {t('projects.modal.suite_title')}
                          </h4>
                          <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed">
                            {t('projects.modal.suite_desc')}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {project.suite.members.map((member) => {
                              const isCurrent = member.slug === project.slug;
                              return (
                                <a
                                  key={member.slug}
                                  href={member.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-current={isCurrent ? 'true' : undefined}
                                  className={`group flex flex-col gap-2 p-3 rounded-xl border transition-all active:scale-[0.98] hover:-translate-y-0.5 ${
                                    isCurrent
                                      ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10'
                                      : 'border-[rgb(var(--border))]/60 bg-[rgb(var(--muted))]/10 hover:border-[rgb(var(--primary))]/50'
                                  }`}
                                >
                                  <span
                                    className="h-1.5 w-8 rounded-full"
                                    style={{ backgroundColor: member.accent }}
                                  />
                                  <span className="text-sm font-semibold text-[rgb(var(--foreground))]">
                                    {member.name}
                                  </span>
                                  <span className="text-[11px] text-[rgb(var(--muted-foreground))] break-all">
                                    {member.url.replace(/^https?:\/\/|\/$/g, '')}
                                  </span>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sidebar: tech stack */}
                    <div className="w-full md:w-1/3 shrink-0 flex flex-col gap-6 text-start">
                      <div className="p-5 sm:p-6 rounded-xl glass-card bg-[rgb(var(--muted))]/10 border border-[rgb(var(--border))]/50">
                        <h4 className="text-base sm:text-lg font-semibold text-[rgb(var(--foreground))] mb-4">
                          {t('projects.modal.technologies')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 bg-[rgb(var(--background))] px-3 py-1.5 rounded-lg border border-[rgb(var(--border))]/50 text-xs sm:text-sm font-medium text-[rgb(var(--foreground))]"
                            >
                              {getTechIcon(tag)}
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky action bar, thumb-reachable on mobile, clear of the
                  home indicator. Two actions at most: the case study, and
                  the live product (or the store, or the source when nothing
                  is live). The rest is on the case-study page. The case
                  study is the filled primary, as on the rows. */}
              <div className={`shrink-0 grid ${secondary ? 'grid-cols-2' : 'grid-cols-1'} sm:flex sm:flex-row gap-3 px-4 sm:px-8 pt-3 sm:pt-4 border-t border-[rgb(var(--border))]/40 bg-[rgb(var(--background))]/95 backdrop-blur-md sm:backdrop-blur-xl pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-[max(1rem,env(safe-area-inset-bottom))]`}>
                <a
                  href={i18n.language === 'ar' ? `/ar${project.caseStudy}` : project.caseStudy}
                  onClick={() => trackCaseStudy(project, 'sheet')}
                  className="press flex items-center justify-center gap-2 flex-1 min-h-[48px] px-3 sm:px-4 bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] hover:from-[rgb(var(--accent-hover))] hover:to-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))] rounded-xl font-semibold transition-all shadow-lg active:scale-[0.98]"
                >
                  <FaBookOpen aria-hidden="true" className="shrink-0" />
                  <span className="sm:hidden">{t('mPages.case_study_short')}</span>
                  <span className="max-sm:hidden">{t('projects.modal.case_study')}</span>
                </a>
                {secondary && (
                  <a
                    href={secondary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackSecondary(project, secondary, 'sheet')}
                    className="press flex items-center justify-center gap-2 flex-1 min-h-[48px] px-3 sm:px-4 border border-[rgb(var(--border-control))] text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] rounded-xl font-semibold transition-all active:scale-[0.98]"
                  >
                    <secondary.Icon aria-hidden="true" className="shrink-0" />
                    <span className="sm:hidden">{t(shortLabel)}</span>
                    <span className="max-sm:hidden">{t(secondary.label)}</span>
                  </a>
                )}
              </div>
            </m.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ProjectModal;
