"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
  FaCode,
  FaLayerGroup,
  FaBookOpen,
} from 'react-icons/fa';
import { getTechIcon } from './Projects';
import { useTranslation } from 'react-i18next';
import { coverMeta } from '../lib/cover-meta';
import { useFocusTrap } from '../lib/useFocusTrap';

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
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const dragControls = useDragControls();
  const dialogRef = useRef(null);
  // Portals need a DOM target, so nothing renders until after mount.
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  // Tab stays inside the sheet; focus returns to the card on close.
  useFocusTrap(dialogRef, isOpen && mounted && !!project);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !project) return null;

  const cover = coverMeta(project.image);

  // On phones the sheet rises from the bottom edge; on wider screens it scales
  // in as a centred dialog.
  const sheetMotion = isMobile
    ? {
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%' },
        transition: { type: 'spring', damping: 32, stiffness: 320 },
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-[rgb(var(--scrim))]/75 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:p-6 pointer-events-none">
            <motion.div
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
                  <span className="shrink-0 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/25">
                    {project.category}
                  </span>
                  <h2 className="flex-1 min-w-0 truncate text-sm sm:text-base font-bold text-[rgb(var(--foreground))] text-start">
                    {project.title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[rgb(var(--muted))]/30 hover:bg-[rgb(var(--muted))]/60 text-[rgb(var(--foreground))] transition-colors"
                    aria-label={t('projects.modal.close')}
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {/* Cover image */}
                <div className="relative w-full bg-[rgb(var(--scrim))] border-b border-[rgb(var(--border))]/30">
                  {/* Covers are wide (~2.4:1), so a shallow box on phones avoids
                      dead space above the screenshot. */}
                  <div className="w-full aspect-[2/1] sm:aspect-[21/9] relative flex items-center sm:items-end justify-center p-3 sm:p-4 sm:pb-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--scrim))]/85 via-[rgb(var(--scrim))]/35 to-transparent z-[1]" />
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={cover.w}
                      height={cover.h}
                      sizes="(min-width: 640px) 850px, 100vw"
                      placeholder={cover.blur ? 'blur' : 'empty'}
                      blurDataURL={cover.blur}
                      className="relative z-0 max-w-full max-h-full w-auto h-auto object-contain rounded-lg sm:rounded-t-lg shadow-2xl"
                    />
                  </div>
                </div>

                <div className="p-5 sm:p-8 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Main details */}
                    <div className="flex-1 space-y-6 min-w-0">
                      <div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[rgb(var(--foreground))] mb-3 sm:mb-4 text-start leading-tight">
                          {project.title}
                        </h3>
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
                              <span>{getTechIcon(tag)}</span>
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky action bar — thumb-reachable on mobile, clears the home indicator */}
              {(project.live !== '#' || project.github !== '#' || project.caseStudy) && (
                <div className="shrink-0 flex flex-col sm:flex-row gap-3 px-4 sm:px-8 py-4 border-t border-[rgb(var(--border))]/40 bg-[rgb(var(--background))]/95 backdrop-blur-xl pb-[max(1rem,env(safe-area-inset-bottom))]">
                  {project.caseStudy && (
                    <a
                      href={project.caseStudy}
                      className="flex items-center justify-center gap-2 flex-1 min-h-[48px] px-4 bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/30 hover:bg-[rgb(var(--primary))]/20 rounded-xl font-semibold transition-all active:scale-[0.98]"
                    >
                      <FaBookOpen /> {t('projects.modal.case_study')}
                    </a>
                  )}
                  {project.live !== '#' && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 flex-1 min-h-[48px] px-4 bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] hover:from-[rgb(var(--accent-hover))] hover:to-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))] rounded-xl font-semibold transition-all shadow-lg active:scale-[0.98]"
                    >
                      <FaExternalLinkAlt /> {t('projects.modal.live_link')}
                    </a>
                  )}
                  {project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 flex-1 min-h-[48px] px-4 glass-card hover:bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] border border-[rgb(var(--border))] rounded-xl font-semibold transition-all active:scale-[0.98]"
                    >
                      <FaGithub size={20} /> {t('projects.modal.source_code')}
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ProjectModal;
