'use client';
import SiteShell from '../SiteShell';
import { useTranslation } from 'react-i18next';
import { FaDownload, FaPrint, FaEnvelope, FaGlobe, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { track } from '@vercel/analytics';
import { buildCv } from '../../lib/cv';

const Section = ({ title, children }) => (
  <section className="cv-section mb-7 last:mb-0">
    <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[rgb(var(--primary))] border-b border-[rgb(var(--border))] pb-2 mb-4">
      {title}
    </h2>
    {children}
  </section>
);

const Entry = ({ item }) => (
  <div className="mb-5 last:mb-0 break-inside-avoid">
    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <p className="font-bold text-[rgb(var(--foreground))]">
        {item.title}
        <span className="font-normal text-[rgb(var(--muted-foreground))]"> — {item.company}</span>
      </p>
      <p className="text-xs text-[rgb(var(--muted-foreground))] whitespace-nowrap" dir="ltr">
        {item.period}
      </p>
    </div>
    <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">
      {item.location}
      {item.employment ? ` · ${item.employment}` : ''}
    </p>
    {item.description?.length > 0 && (
      <ul className="mt-2 space-y-1">
        {item.description.map((line, i) => (
          <li key={i} className="text-sm text-[rgb(var(--foreground))] leading-relaxed ps-4 relative">
            <span className="absolute start-0 top-[0.55em] w-1 h-1 rounded-full bg-[rgb(var(--primary))]" />
            {line}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const CvContent = ({ bundle }) => {
  const { t, i18n } = useTranslation();
  const cv = buildCv(bundle);
  const s = (key) => t(`cv.sections.${key}`);

  const contactItems = [
    { icon: <FaEnvelope />, text: cv.contact.email, href: `mailto:${cv.contact.email}` },
    { icon: <FaGlobe />, text: cv.contact.site, href: `https://${cv.contact.site}` },
    { icon: <FaLinkedin />, text: cv.contact.linkedin, href: `https://${cv.contact.linkedin}` },
    { icon: <FaGithub />, text: cv.contact.github, href: `https://${cv.contact.github}` },
    { icon: <FaMapMarkerAlt />, text: cv.contact.location },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 pt-28 pb-20 max-w-4xl text-start">
      {/* Actions — screen only */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-3 mb-8">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[rgb(var(--foreground))]">
            {t('cv.title')}
          </h1>
          <p className="text-[rgb(var(--muted-foreground))] mt-1">{t('cv.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <a
            href="/Belal_Nagy_CV.pdf"
            download
            onClick={() => track('cv_download', { placement: 'cv_page' })}
            className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-xl font-semibold bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))] shadow-lg transition-transform active:scale-[0.98]">
            <FaDownload className="text-sm" /> {t('cv.download')}
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-xl font-semibold glass-card border border-[rgb(var(--border))] text-[rgb(var(--foreground))] transition-transform active:scale-[0.98]">
            <FaPrint className="text-sm" /> {t('cv.print')}
          </button>
        </div>
      </div>

      {/* The sheet. `cv-sheet` is what the print stylesheet keeps. */}
      <article className="cv-sheet glass-card print:bg-transparent print:border-0 print:shadow-none rounded-2xl border border-[rgb(var(--border))]/60 p-6 sm:p-10">
        <header className="pb-5 mb-6 border-b border-[rgb(var(--border))]">
          <h2 className="font-display text-3xl font-bold text-[rgb(var(--foreground))]">
            {cv.contact.name}
          </h2>
          <p className="text-[rgb(var(--primary))] font-semibold mt-1">{cv.contact.role}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-xs text-[rgb(var(--muted-foreground))]">
            {contactItems.map((item) => (
              <li key={item.text} className="flex items-center gap-1.5">
                <span className="text-[rgb(var(--primary))]">{item.icon}</span>
                {item.href ? (
                  <a href={item.href} className="hover:text-[rgb(var(--primary))]" dir="ltr">
                    {item.text}
                  </a>
                ) : (
                  <span>{item.text}</span>
                )}
              </li>
            ))}
          </ul>
        </header>

        <Section title={s('summary')}>
          {cv.summary.map((paragraph, i) => (
            <p key={i} className="text-sm text-[rgb(var(--foreground))] leading-relaxed mb-2 last:mb-0">
              {paragraph}
            </p>
          ))}
        </Section>

        <Section title={s('highlights')}>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {cv.highlights.map((line, i) => (
              <li key={i} className="text-sm text-[rgb(var(--foreground))] leading-relaxed ps-4 relative">
                <span className="absolute start-0 top-[0.55em] w-1 h-1 rounded-full bg-[rgb(var(--primary))]" />
                {line}
              </li>
            ))}
          </ul>
        </Section>

        <Section title={s('experience')}>
          {cv.experience.map((item) => (
            <Entry key={item.key} item={item} />
          ))}
        </Section>

        <Section title={s('projects')}>
          {cv.projects.map((project) => (
            <div key={project.slug} className="mb-4 last:mb-0 break-inside-avoid">
              <p className="font-bold text-[rgb(var(--foreground))]">
                {project.name}
                <span className="font-normal text-xs text-[rgb(var(--muted-foreground))]" dir="ltr">
                  {' '}· {project.stack.join(' · ')}
                </span>
              </p>
              <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed mt-1">
                {project.desc}
              </p>
            </div>
          ))}
        </Section>

        <Section title={s('skills')}>
          <dl className="space-y-2">
            {cv.skills.map(([label, value]) => (
              <div key={label} className="sm:flex gap-3">
                <dt className="font-semibold text-sm text-[rgb(var(--foreground))] sm:w-44 shrink-0">
                  {label}
                </dt>
                <dd className="text-sm text-[rgb(var(--muted-foreground))]" dir="ltr">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title={s('education')}>
          {cv.education.map((item) => (
            <Entry key={item.key} item={item} />
          ))}
        </Section>

        <Section title={s('certifications')}>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
            {cv.certifications.map((name, i) => (
              <li key={i} className="text-sm text-[rgb(var(--muted-foreground))] ps-4 relative">
                <span className="absolute start-0 top-[0.55em] w-1 h-1 rounded-full bg-[rgb(var(--primary))]" />
                {name}
              </li>
            ))}
          </ul>
        </Section>
      </article>

      <p className="print:hidden text-center text-xs text-[rgb(var(--muted-foreground))] mt-6">
        {t('cv.updated', {
          date: new Date().toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-GB', {
            month: 'long',
            year: 'numeric',
          }),
        })}
      </p>
    </div>
  );
};

/**
 * A CV a recruiter can read without downloading anything, printed straight
 * from the browser onto A4, and built from the same data as the PDF.
 */
const CvPage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    <CvContent bundle={bundle} />
  </SiteShell>
);

export default CvPage;
