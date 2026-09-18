'use client';
import SiteShell from '../SiteShell';
import Testimonials from '../Testimonials';
import { useTranslation } from 'react-i18next';

const TestimonialsContent = () => {
  const { t } = useTranslation();
  return (
    <div className="pt-28">
      <header className="container mx-auto px-4 sm:px-6 max-w-3xl text-start mb-4">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[rgb(var(--foreground))]">
          {t('testimonials_page.title')}
        </h1>
        <p className="text-[rgb(var(--muted-foreground))] text-lg mt-3 leading-relaxed">
          {t('testimonials_page.subtitle')}
        </p>
      </header>
      {/* The same carousel the home page uses, so there is one implementation. */}
      <Testimonials />
    </div>
  );
};

const TestimonialsPage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    <TestimonialsContent />
  </SiteShell>
);

export default TestimonialsPage;
