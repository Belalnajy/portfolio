'use client';
import { useEffect, useRef } from 'react';

const COPY = {
  en: { title: 'Something went wrong', body: 'Try loading the page again.', retry: 'Try again', home: 'Home', href: '/' },
  ar: { title: 'حصل خطأ غير متوقع', body: 'جرّب تحميل الصفحة مرة تانية.', retry: 'حاول مرة أخرى', home: 'الرئيسية', href: '/ar' },
};

const buttonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 48,
  padding: '0 28px',
  borderRadius: 12,
  border: '1px solid currentColor',
  background: 'transparent',
  color: 'inherit',
  font: 'inherit',
  fontWeight: 600,
  textDecoration: 'none',
  cursor: 'pointer',
};

/**
 * Last resort: catches an error thrown by a root layout itself, where the
 * per-tree error.jsx cannot help because it renders inside that layout. It
 * replaces the whole document, so it carries its own <html>, <title> and
 * <body> and uses inline styles only (the stylesheet may be what failed to
 * load). It only ever renders in the browser, after the failure, so the
 * language can be read from the address like everywhere else: /ar/* is Arabic.
 */
export default function GlobalError({ reset }) {
  const arabic = typeof window !== 'undefined' && /^\/ar(\/|$)/.test(window.location.pathname);
  const copy = arabic ? COPY.ar : COPY.en;
  const headingRef = useRef(null);

  // Land keyboard and screen-reader users on the message, not on <body>.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <html lang={arabic ? 'ar' : 'en'} dir={arabic ? 'rtl' : 'ltr'}>
      <head>
        <title>{`${copy.title} | Belal Nagy`}</title>
      </head>
      <body style={{ margin: 0, background: '#0B0F14', color: '#F4F6F8', fontFamily: 'system-ui, sans-serif' }}>
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 24 }}>
          <div role="alert">
            <h1 ref={headingRef} tabIndex={-1} style={{ fontSize: 28, margin: '0 0 12px', outline: 'none' }}>
              {copy.title}
            </h1>
            <p style={{ margin: '0 0 24px', opacity: 0.8 }}>{copy.body}</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" onClick={() => reset()} style={buttonStyle}>
                {copy.retry}
              </button>
              <a href={copy.href} style={buttonStyle}>
                {copy.home}
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
