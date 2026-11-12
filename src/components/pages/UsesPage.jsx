'use client';
import SiteShell from '../SiteShell';
import Reveal from '../Reveal';
import { revealDelay } from '../../lib/motion';
import { FaTerminal, FaCode, FaDatabase, FaProjectDiagram, FaCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ICONS = [<FaTerminal key="t" />, <FaCode key="c" />, <FaDatabase key="d" />, <FaProjectDiagram key="p" />];

const UsesContent = () => {
  const { t } = useTranslation();
  const groups = t('uses.groups', { returnObjects: true });

  return (
    <div className="container mx-auto px-4 sm:px-6 pt-28 pb-20 max-w-4xl text-start">
      <header className="mb-12">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[rgb(var(--foreground))]">
          {t('uses.title')}
        </h1>
        <p className="text-[rgb(var(--muted-foreground))] text-lg mt-3 leading-relaxed">
          {t('uses.subtitle')}
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-5">
        {(Array.isArray(groups) ? groups : []).map((group, index) => (
          <Reveal as="section" y={20} delay={revealDelay(index)}
            key={group.heading}
            className="glass-card rounded-2xl border border-[rgb(var(--border))]/60 p-6">
            <h2 className="flex items-center gap-3 font-display text-lg font-bold text-[rgb(var(--foreground))] mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[rgb(var(--muted))]/40 border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))]">
                {ICONS[index % ICONS.length]}
              </span>
              {group.heading}
            </h2>
            <ul className="space-y-2.5">
              {group.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[rgb(var(--muted-foreground))] leading-relaxed">
                  <FaCircle className="text-[5px] mt-2 text-[rgb(var(--muted-foreground))] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <p className="text-center text-sm text-[rgb(var(--muted-foreground))] mt-10 max-w-2xl mx-auto leading-relaxed">
        {t('uses.note')}
      </p>
    </div>
  );
};

/** The /uses tradition: the real toolkit, kept honest. */
const UsesPage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    <UsesContent />
  </SiteShell>
);

export default UsesPage;
