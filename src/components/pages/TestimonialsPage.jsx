'use client';
import SiteShell from '../SiteShell';
import Testimonials from '../Testimonials';
import { useTranslation } from 'react-i18next';

const TestimonialsContent = () => {
  const { t } = useTranslation();
  return (
    <div className="pt-28 m-page-top">
      <header className="container mx-auto px-6 max-sm:px-5 text-start">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[rgb(var(--foreground))] type-h1">
            {t('testimonials_page.title')}
          </h1>
          <p className="text-[rgb(var(--muted-foreground))] text-lg mt-3 leading-relaxed max-w-2xl type-body">
            {t('testimonials_page.subtitle')}
          </p>
        </div>
      </header>
      {/* The same carousel the home page uses, so there is one implementation.
          The page variant leaves out the section heading: the h1 above is it. */}
      <Testimonials variant="page" />
    </div>
  );
};

const TestimonialsPage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    <TestimonialsContent />
  </SiteShell>
);

export default TestimonialsPage;
