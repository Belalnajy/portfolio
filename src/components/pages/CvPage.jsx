'use client';
import SiteShell from '../SiteShell';
import InteractiveTimeline from '../InteractiveTimeline';
import PlatformSuite from '../PlatformSuite';
import { useTranslation } from 'react-i18next';
import { FaDownload, FaPrint, FaEnvelope, FaGlobe, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { track } from '@vercel/analytics';
import { buildCv, CV_UPDATED } from '../../lib/cv';

// Phone layouts on this page use a screen-only variant instead of max-md:
// an A4 page is narrower than 768px, so a max-md: class would also restyle
// the printed CV.
const Section = ({ title, children }) => (
  <section className="cv-section mb-7 last:mb-0 [@media_screen_and_(max-width:47.99rem)]:mb-8 [@media_screen_and_(max-width:47.99rem)]:last:mb-0">
    {/* On a phone the label is the site's eyebrow. */}
    <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[rgb(var(--primary))] border-b border-[rgb(var(--border))] pb-2 mb-4 [@media_screen_and_(max-width:47.99rem)]:text-xs [@media_screen_and_(max-width:47.99rem)]:font-semibold [@media_screen_and_(max-width:47.99rem)]:tracking-[0.14em] [@media_screen_and_(max-width:47.99rem)]:border-[rgb(var(--border-subtle))]">
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
        <span className="font-normal text-[rgb(var(--muted-foreground))]"> · {item.company}</span>
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
            <span className="absolute start-0 top-[0.55em] w-1 h-1 rounded-full bg-[rgb(var(--muted-foreground))]" />
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
    <div className="container mx-auto px-5 sm:px-6 pt-28 [@media_screen_and_(max-width:47.99rem)]:pt-[calc(var(--header-h)+2rem)] pb-20 [@media_screen_and_(max-width:47.99rem)]:pb-14 max-w-4xl text-start">
      {/* Actions — screen only. On a phone: Download and Print as an
          equal-width pair under the heading. */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-3 mb-8 max-md:gap-5 max-md:mb-10">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[rgb(var(--foreground))] type-h1">
            {t('cv.title')}
          </h1>
          <p className="text-[rgb(var(--muted-foreground))] mt-1 max-md:mt-2 type-body">{t('cv.subtitle')}</p>
        </div>
        <div className="flex gap-2 max-md:grid max-md:grid-cols-2 max-md:gap-3 max-md:w-full">
          <a
            href="/Belal_Nagy_CV.pdf"
            download
            onClick={() => track('cv_download', { placement: 'cv_page' })}
            className="press max-md:justify-center max-md:min-h-12 max-md:px-3 max-md:rounded-[var(--radius-btn)] inline-flex items-center gap-2 min-h-[44px] px-5 rounded-xl font-semibold bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))] shadow-lg transition-transform active:scale-[0.98]">
            <FaDownload className="text-sm" /> {t('cv.download')}
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="press max-md:justify-center max-md:min-h-12 max-md:px-3 max-md:rounded-[var(--radius-btn)] max-md:bg-[rgb(var(--surface))]! max-md:border-[rgb(var(--border-subtle))]! inline-flex items-center gap-2 min-h-[44px] px-5 rounded-xl font-semibold glass-card border border-[rgb(var(--border))] text-[rgb(var(--foreground))] transition-transform active:scale-[0.98]">
            <FaPrint className="text-sm" /> {t('cv.print')}
          </button>
        </div>
      </div>

      {/* The sheet. `cv-sheet` is what the print stylesheet keeps. */}
      {/* On a phone the sheet drops its card chrome (a padded card inside a
          padded page): the CV runs on the page itself. */}
      <article className="cv-sheet glass-card print:bg-transparent print:border-0 print:shadow-none rounded-2xl border border-[rgb(var(--border))]/60 p-6 sm:p-10 [@media_screen_and_(max-width:47.99rem)]:bg-transparent! [@media_screen_and_(max-width:47.99rem)]:border-0! [@media_screen_and_(max-width:47.99rem)]:shadow-none! [@media_screen_and_(max-width:47.99rem)]:rounded-none! [@media_screen_and_(max-width:47.99rem)]:p-0!">
        <header className="pb-5 mb-6 border-b border-[rgb(var(--border))] [@media_screen_and_(max-width:47.99rem)]:pb-6 [@media_screen_and_(max-width:47.99rem)]:mb-8 [@media_screen_and_(max-width:47.99rem)]:border-[rgb(var(--border-subtle))]">
          {/* The name is written in Latin on both CVs; lang="en" keeps the
              display face's tracking, which :lang(ar) resets. */}
          <h2 lang="en" className="font-display text-3xl font-bold text-[rgb(var(--foreground))]">
            {cv.contact.name}
          </h2>
          <p className="text-[rgb(var(--primary))] font-semibold mt-1">{cv.contact.role}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-xs text-[rgb(var(--muted-foreground))] [@media_screen_and_(max-width:47.99rem)]:gap-y-0 [@media_screen_and_(max-width:47.99rem)]:text-sm [@media_screen_and_(max-width:47.99rem)]:mt-3">
            {contactItems.map((item) => (
              <li key={item.text} className="flex items-center gap-1.5 [@media_screen_and_(max-width:47.99rem)]:min-h-11 [@media_screen_and_(max-width:47.99rem)]:gap-2">
                <span className="text-[rgb(var(--primary))]">{item.icon}</span>
                {item.href ? (
                  <a href={item.href} className="hover:text-[rgb(var(--primary))] [@media_screen_and_(max-width:47.99rem)]:inline-flex [@media_screen_and_(max-width:47.99rem)]:items-center [@media_screen_and_(max-width:47.99rem)]:min-h-11" dir="ltr">
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
                <span className="absolute start-0 top-[0.55em] w-1 h-1 rounded-full bg-[rgb(var(--muted-foreground))]" />
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
                <span className="absolute start-0 top-[0.55em] w-1 h-1 rounded-full bg-[rgb(var(--muted-foreground))]" />
                {name}
              </li>
            ))}
          </ul>
        </Section>
      </article>

      <p className="print:hidden text-center text-xs text-[rgb(var(--muted-foreground))] mt-6">
        {t('cv.updated', {
          date: new Date(`${CV_UPDATED}T00:00:00Z`).toLocaleDateString(i18n.language === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB', {
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
          }),
        })}
      </p>
    </div>
  );
};

/**
 * A CV a recruiter can read without downloading anything, printed straight
 * from the browser onto A4, and built from the same data as the PDF.
 *
 * Below the sheet, on screen only: the interactive experience timeline and
 * the platform suite, which moved here from the home page. Their section ids
 * (#experience, #platform-suite) are what the nav, footer and command
 * palette link to.
 */
const CvPage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    <CvContent bundle={bundle} />
    <div className="print:hidden">
      <InteractiveTimeline />
      <PlatformSuite />
    </div>
  </SiteShell>
);

export default CvPage;
