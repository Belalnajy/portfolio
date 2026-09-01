"use client";
import Link from 'next/link';
import { FaHome, FaLayerGroup, FaEnvelope } from 'react-icons/fa';

/**
 * On-brand 404: the display type does the talking. Static and bilingual —
 * a not-found page has no locale context, so both languages get a line.
 */
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[rgb(var(--background))]">
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

        <h1 className="font-display text-2xl sm:text-4xl font-bold text-[rgb(var(--foreground))] mb-3">
          This page doesn&apos;t exist
        </h1>
        <p className="text-lg text-[rgb(var(--muted-foreground))] mb-1" dir="rtl" lang="ar">
          الصفحة دي مش موجودة — بس الشغل الحقيقي موجود تحت 👇
        </p>
        <p className="text-[rgb(var(--muted-foreground))] mb-10">
          The work, however, very much does.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-xl font-semibold bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))] hover:bg-[rgb(var(--primary))]/90 shadow-lg transition-all active:scale-[0.98]">
            <FaHome className="text-sm" />
            Home
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-xl font-semibold border border-[rgb(var(--border-control))] text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors">
            <FaLayerGroup className="text-sm" />
            Work
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-xl font-semibold text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors">
            <FaEnvelope className="text-sm" />
            Contact
          </Link>
        </div>

        <p className="text-xs font-mono text-[rgb(var(--muted-foreground))]/60" dir="ltr">
          HTTP 404 · try <kbd className="px-1.5 py-0.5 rounded border border-[rgb(var(--border))]">⌘K</kbd> on any page to jump anywhere
        </p>
      </div>
    </div>
  );
};

export default NotFound;
