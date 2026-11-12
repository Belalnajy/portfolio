'use client';
import { useEffect, useRef } from 'react';

/**
 * What a visitor sees when a page throws while rendering in the browser.
 * Without an error boundary Next replaces the whole document with its bare
 * "This page couldn't load" screen; this keeps the visitor on the site with a
 * way to retry and a way home. Deliberately dependency-free (no i18n, no
 * shell): whatever broke the page must not be able to break this too.
 */
const RouteError = ({ error, reset, lang = 'en' }) => {
  const ar = lang === 'ar';
  const title = ar ? 'حصل خطأ غير متوقع' : 'Something went wrong';
  const headingRef = useRef(null);

  useEffect(() => {
    console.error(error);
  }, [error]);

  // The page that broke is gone, but its <title> and the focus are still
  // where it left them. Name the tab after what is on screen now and move
  // focus to the heading, so keyboard and screen-reader users land on the
  // message instead of on an empty <body>. The old title comes back if the
  // retry succeeds and this unmounts.
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    headingRef.current?.focus();
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[rgb(var(--background))] px-6 py-24 text-center">
      {/* role="alert": announced as soon as it replaces the page. */}
      <div role="alert">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-2xl sm:text-4xl font-bold text-[rgb(var(--foreground))] mb-3 focus:outline-none">
          {title}
        </h1>
        <p className="text-[rgb(var(--muted-foreground))] mb-8">
          {ar ? 'جرّب تحميل الصفحة مرة تانية.' : 'Try loading the page again.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-xl font-semibold bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))] hover:bg-[rgb(var(--primary))]/90 shadow-lg transition-all active:scale-[0.98]">
            {ar ? 'حاول مرة أخرى' : 'Try again'}
          </button>
          <a
            href={ar ? '/ar' : '/'}
            className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-xl font-semibold border border-[rgb(var(--border-control))] text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors">
            {ar ? 'الرئيسية' : 'Home'}
          </a>
        </div>
      </div>
    </main>
  );
};

export default RouteError;
