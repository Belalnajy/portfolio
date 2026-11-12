'use client';
import SiteShell from '../SiteShell';
import Reveal from '../Reveal';
import { revealDelay } from '../../lib/motion';
import { FaBriefcase, FaBookOpen, FaHandshake, FaCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { asArray } from '../../lib/as-array';


const NowSection = ({ icon, title, items, index }) => (
  <Reveal as="section" y={24} delay={revealDelay(index)}
    className="glass-card rounded-2xl border border-[rgb(var(--border))]/60 p-6 sm:p-8 text-start">
    <h2 className="flex items-center gap-3 font-display text-xl font-bold text-[rgb(var(--foreground))] mb-5">
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[rgb(var(--muted))]/40 border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))]">
        {icon}
      </span>
      {title}
    </h2>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[rgb(var(--foreground))] leading-relaxed">
          <FaCircle className="text-[5px] mt-2.5 text-[rgb(var(--muted-foreground))] shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </Reveal>
);

/**
 * A /now page (nownownow.com tradition): what is actually on the desk right
 * now. Small, honest and dated — it signals an active, current developer.
 */
const NowContent = () => {
  const { t, i18n } = useTranslation();
  const home = i18n.language === 'ar' ? '/ar' : '';

  return (
    <div className="container mx-auto px-6 max-w-3xl pt-36 pb-24">
      {/* First viewport: a CSS animation that runs from the first paint and
          moves without fading, so the page's largest text is on screen before
          any JavaScript has loaded (see Reveal). */}
      <Reveal as="header" rise y={16} duration={0.5}
        className="text-start mb-12">
        <h1 className="font-display text-display-lg font-bold text-[rgb(var(--foreground))] mb-3">
          {t('now_page.title')}
        </h1>
        <p className="text-lg text-[rgb(var(--muted-foreground))] leading-relaxed mb-3">
          {t('now_page.subtitle')}
        </p>
        <p className="text-xs font-mono text-[rgb(var(--muted-foreground))]">
          {t('now_page.updated')}
        </p>
      </Reveal>

      <div className="space-y-6">
        <NowSection
          icon={<FaBriefcase />}
          title={t('now_page.focus_title')}
          items={asArray(t('now_page.focus', { returnObjects: true }))}
          index={0}
        />
        <NowSection
          icon={<FaBookOpen />}
          title={t('now_page.learning_title')}
          items={asArray(t('now_page.learning', { returnObjects: true }))}
          index={1}
        />

        <Reveal as="section" y={24} delay={revealDelay(2)}
          className="glass-card rounded-2xl border border-[rgb(var(--border))] p-6 sm:p-8 text-start">
          <h2 className="flex items-center gap-3 font-display text-xl font-bold text-[rgb(var(--foreground))] mb-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[rgb(var(--muted))]/40 border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))]">
              <FaHandshake />
            </span>
            {t('now_page.availability_title')}
          </h2>
          <p className="text-[rgb(var(--foreground))] leading-relaxed mb-6">
            {t('now_page.availability_body')}
          </p>
          {/* Contact lives on the home page; link there in the language being read. */}
          <a
            href={`${home}/#contact`}
            className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-xl font-semibold bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] hover:from-[rgb(var(--accent-hover))] hover:to-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))] shadow-lg transition-all active:scale-[0.98]">
            {t('now_page.availability_cta')}
          </a>
        </Reveal>
      </div>
    </div>
  );
};

const NowPage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    <NowContent />
  </SiteShell>
);

export default NowPage;
