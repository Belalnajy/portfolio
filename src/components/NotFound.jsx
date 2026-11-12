"use client";
import { useSyncExternalStore } from 'react';
import { languageOfPath } from '../lib/language';
import { FaHome, FaLayerGroup, FaEnvelope } from 'react-icons/fa';

// Nothing ever changes the path under a rendered 404, so there is nothing to
// subscribe to; the store only exists to read the path after hydration.
const subscribe = () => () => {};
const languageNow = () => languageOfPath(window.location.pathname);
const languageOnServer = () => 'en';

/**
 * On-brand 404: the display type does the talking. Bilingual, so both
 * languages get a line.
 *
 * It is one static page for every unknown URL (src/app/global-not-found.jsx),
 * so it cannot be prerendered per language. The HTML is the English variant;
 * for a miss under /ar the document is switched to Arabic before first paint
 * (RootDocument) and, once hydrated, the links here point into /ar and the
 * English lines are marked as English so they are not mirrored or read with
 * the wrong voice.
 */
const NotFound = () => {
  const lang = useSyncExternalStore(subscribe, languageNow, languageOnServer);
  const home = lang === 'ar' ? '/ar' : '';
  const english = lang === 'ar' ? { lang: 'en', dir: 'ltr' } : {};
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[rgb(var(--background))]">
      <div className="grain-overlay" aria-hidden="true" />
      <div
        className="absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,black,transparent)]"
        aria-hidden="true"
      />
      <div className="absolute -top-32 start-1/3 w-[30rem] h-[30rem] bg-[rgb(var(--accent))]/8 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10 text-center py-24">
        <p className="font-display font-bold leading-none select-none mb-6" aria-hidden="true">
          <span className="block text-[7rem] sm:text-[11rem] text-outline">404</span>
        </p>

        <h1 {...english} className="font-display text-2xl sm:text-4xl font-bold text-[rgb(var(--foreground))] mb-3">
          This page doesn&apos;t exist
        </h1>
        <p className="text-lg text-[rgb(var(--muted-foreground))] mb-1" dir="rtl" lang="ar">
          الصفحة دي مش موجودة، بس الشغل الحقيقي موجود تحت 👇
        </p>
        <p {...english} className="text-[rgb(var(--muted-foreground))] mb-10">
          The work, however, very much does.
        </p>

        <div {...english} className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
          <a
            href={`${home}/`}
            className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-xl font-semibold bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))] hover:bg-[rgb(var(--primary))]/90 shadow-lg transition-all active:scale-[0.98]">
            <FaHome aria-hidden="true" className="text-sm" />
            Home
          </a>
          <a
            href={`${home}/work`}
            className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-xl font-semibold border border-[rgb(var(--border-control))] text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors">
            <FaLayerGroup aria-hidden="true" className="text-sm" />
            Work
          </a>
          <a
            href={`${home}/#contact`}
            className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-xl font-semibold text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors">
            <FaEnvelope aria-hidden="true" className="text-sm" />
            Contact
          </a>
        </div>

        {/* Only where there is a keyboard to press it with: phones and
            tablets have no ⌘K, so they are not told to use one. */}
        <p className="hidden [@media(hover:hover)_and_(pointer:fine)]:block text-xs font-mono text-[rgb(var(--muted-foreground))]" dir="ltr" lang="en">
          HTTP 404 · try <kbd className="px-1.5 py-0.5 rounded border border-[rgb(var(--border))]">⌘K</kbd> / <kbd className="px-1.5 py-0.5 rounded border border-[rgb(var(--border))]">Ctrl K</kbd> on any page to jump anywhere
        </p>
      </div>
    </main>
  );
};

export default NotFound;
