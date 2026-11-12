'use client';
import { useTranslation } from 'react-i18next';
import { FaGraduationCap, FaCalendarAlt, FaBookOpen, FaRocket } from 'react-icons/fa';

// One fitting glyph per kind; decorative, the text carries the meaning.
const KIND_ICONS = {
  iti: FaGraduationCap,
  event: FaCalendarAlt,
  learning: FaBookOpen,
  venture: FaRocket,
};

/**
 * Says plainly what kind of project this was when it was not a plain client
 * engagement: an ITI training project, something built at an event, a
 * project built while learning, or a venture he co-founded. Rendered
 * wherever such a project is shown (archive card, details sheet, case-study
 * page) from the registry's `kind`; renders nothing for client work. Text,
 * not a colour, carries the meaning.
 */
const ProjectKindLabel = ({ kind, className = '' }) => {
  const { t } = useTranslation();
  if (!kind) return null;
  const Icon = KIND_ICONS[kind] ?? FaGraduationCap;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[rgb(var(--muted))]/50 text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))] ${className}`}>
      <Icon aria-hidden="true" className="shrink-0" />
      {t(`projects.kinds.${kind}`)}
    </span>
  );
};

export default ProjectKindLabel;
