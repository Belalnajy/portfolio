'use client';
import { useEffect, useState } from 'react';
import { FaHome, FaLayerGroup, FaBoxOpen, FaLifeRing, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

/**
 * App-style bottom tab bar for phones. The five primary destinations stay one
 * thumb-tap away; the hamburger drawer keeps the long tail (Now, Blog, the
 * CV). Rescue has a tab of its own: an owner with a stuck project is the
 * visitor most likely to act today. Hidden from md up, where the top
 * navigation takes over.
 */
const MobileTabBar = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const home = isArabic ? '/ar' : '';

  const [pathname, setPathname] = useState('');
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const current = pathname.replace(/^\/ar(?=\/|$)/, '') || '/';

  const tabs = [
    { label: t('nav.home'), href: `${home}/`, route: '/', icon: <FaHome /> },
    { label: t('nav.projects'), href: `${home}/work`, route: '/work', icon: <FaLayerGroup /> },
    { label: t('nav.services'), href: `${home}/services`, route: '/services', icon: <FaBoxOpen /> },
    { label: t('nav.rescue_short'), name: t('nav.rescue_project'), href: `${home}/rescue`, route: '/rescue', icon: <FaLifeRing /> },
    { label: t('nav.contact_short'), name: t('nav.contact'), href: `${home}/#contact`, icon: <FaEnvelope /> },
  ];

  return (
    <nav
      aria-label={t('a11y.tab_bar')}
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[rgb(var(--card))]/92 backdrop-blur-2xl border-t border-[rgb(var(--border))] pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => {
          const active = tab.route && current === tab.route;
          return (
            <a
              key={tab.label}
              href={tab.href}
              aria-current={active ? 'page' : undefined}
              // A tab is 64px wide at 320px, so some labels are shortened;
              // the full name, which starts with the visible word, is what
              // assistive tech reads.
              aria-label={tab.name && tab.name !== tab.label ? tab.name : undefined}
              className={`relative flex flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
                active
                  ? 'text-[rgb(var(--primary))]'
                  : 'text-[rgb(var(--muted-foreground))] active:text-[rgb(var(--foreground))]'
              }`}>
              {/* Active indicator: a short copper bar hugging the top edge. */}
              {active && (
                <span className="absolute top-0 inset-x-4 h-0.5 rounded-full bg-[rgb(var(--primary))]" aria-hidden="true" />
              )}
              <span aria-hidden="true" className={`text-lg ${active ? 'scale-110' : ''} transition-transform`}>{tab.icon}</span>
              <span className="truncate max-w-full px-1">{tab.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileTabBar;
