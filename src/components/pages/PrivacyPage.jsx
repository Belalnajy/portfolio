'use client';
import SiteShell from '../SiteShell';
import Reveal from '../Reveal';
import { revealDelay } from '../../lib/motion';
import { useTranslation } from 'react-i18next';

const EMAIL = 'belalnajy9@gmail.com';

const PrivacyContent = () => {
  const { t } = useTranslation();
  const sections = t('privacy.sections', { returnObjects: true });

  return (
    <div className="container mx-auto px-5 sm:px-6 pt-28 m-page-top pb-20 max-md:pb-14 max-w-3xl text-start">
      <header className="mb-10 max-md:mb-8">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[rgb(var(--foreground))] type-h1">
          {t('privacy.title')}
        </h1>
        <p className="text-[rgb(var(--muted-foreground))] text-lg mt-3 leading-relaxed type-body">
          {t('privacy.subtitle')}
        </p>
        <p className="font-mono text-xs text-[rgb(var(--muted-foreground))] mt-4">
          {t('privacy.updated')}
        </p>
      </header>

      <div className="space-y-6 max-md:space-y-3">
        {(Array.isArray(sections) ? sections : []).map((section, index) => (
          <Reveal as="section" y={20} delay={revealDelay(index)}
            key={section.heading}
            className="m-card glass-card rounded-2xl border border-[rgb(var(--border))]/60 p-6 sm:p-7">
            <h2 className="font-display text-xl font-bold text-[rgb(var(--foreground))] mb-3 type-h3 max-md:mb-2">
              {section.heading}
            </h2>
            <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">{section.body}</p>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 max-md:mt-8 text-center max-md:text-start text-[rgb(var(--muted-foreground))]">
        {t('privacy.contact_line', { email: '' })}
        <a href={`mailto:${EMAIL}`} className="text-[rgb(var(--primary))] font-semibold hover:underline max-md:inline-flex max-md:items-center max-md:min-h-11" dir="ltr">
          {EMAIL}
        </a>
      </p>
    </div>
  );
};

/**
 * The site has a contact form, analytics events and localStorage, and had no
 * page saying so. This states exactly what is collected and what is not.
 */
const PrivacyPage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    <PrivacyContent />
  </SiteShell>
);

export default PrivacyPage;
