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
    // A small, calm pill: it informs, it should not compete with the title
    // or the impact badge next to it. Muted text on a hairline, no fill.
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium leading-4 text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border-subtle))] bg-transparent ${className}`}>
      <Icon aria-hidden="true" className="shrink-0 text-[10px] opacity-70" />
      {t(`projects.kinds.${kind}`)}
    </span>
  );
};

export default ProjectKindLabel;
