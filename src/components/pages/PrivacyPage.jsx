'use client';
import SiteShell from '../SiteShell';
import { motion } from 'framer-motion';
import { REVEAL_VIEWPORT, revealDelay, REVEAL_DURATION } from '../../lib/motion';
import { useTranslation } from 'react-i18next';

const EMAIL = 'belalnajy9@gmail.com';

const PrivacyContent = () => {
  const { t } = useTranslation();
  const sections = t('privacy.sections', { returnObjects: true });

  return (
    <div className="container mx-auto px-4 sm:px-6 pt-28 pb-20 max-w-3xl text-start">
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[rgb(var(--foreground))]">
          {t('privacy.title')}
        </h1>
        <p className="text-[rgb(var(--muted-foreground))] text-lg mt-3 leading-relaxed">
          {t('privacy.subtitle')}
        </p>
        <p className="font-mono text-xs text-[rgb(var(--muted-foreground))]/70 mt-4">
          {t('privacy.updated')}
        </p>
      </header>

      <div className="space-y-6">
        {(Array.isArray(sections) ? sections : []).map((section, index) => (
          <motion.section
            key={section.heading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
            className="glass-card rounded-2xl border border-[rgb(var(--border))]/60 p-6 sm:p-7">
            <h2 className="font-display text-xl font-bold text-[rgb(var(--foreground))] mb-3">
              {section.heading}
            </h2>
            <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">{section.body}</p>
          </motion.section>
        ))}
      </div>

      <p className="mt-10 text-center text-[rgb(var(--muted-foreground))]">
        {t('privacy.contact_line', { email: '' })}
        <a href={`mailto:${EMAIL}`} className="text-[rgb(var(--primary))] font-semibold hover:underline" dir="ltr">
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
