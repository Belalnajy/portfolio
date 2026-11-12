'use client';
import { useState } from 'react';
import Link from 'next/link';
import { track } from '@vercel/analytics';
import Reveal from './Reveal';
import { FaArrowRight, FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import SiteShell from './SiteShell';
import { BLOG_POSTS } from '../lib/blog';

const formatDate = (iso, lang) =>
  // `-u-nu-latn`: Arabic month names with Western digits, as everywhere else
  // on the site (Arabic-Indic digits are not used).
  new Intl.DateTimeFormat(lang === 'ar' ? 'ar-u-nu-latn' : 'en', {
    dateStyle: 'long',
    // The ISO date is midnight UTC; without this a reader west of UTC gets the
    // previous day, which is wrong and does not match the prerendered HTML.
    timeZone: 'UTC',
  }).format(new Date(iso));

// Reading size on a phone: 17px on a 1.75 line (1.9 in Arabic).
const BODY = 'max-md:text-[1.0625rem] max-md:leading-[1.75] max-md:rtl:leading-[1.9]';

/**
 * The end of an article on a phone: back to the list, or share it. Share
 * opens the system sheet where there is one, and otherwise copies the
 * address and says so.
 */
const EndRow = ({ slug, title, home, Arrow }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    track('share_click', { placement: 'blog_article', article: slug, method: navigator.share ? 'native' : 'copy' });
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // Dismissed: nothing to do.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // No clipboard either: the address bar still has it.
    }
  };
  return (
    <div className="md:hidden grid grid-cols-2 gap-3 mb-6">
      <Link
        href={`${home}/blog`}
        className="press inline-flex items-center justify-center gap-2 min-h-12 px-3 rounded-[var(--radius-btn)] font-semibold text-sm border border-[rgb(var(--border-control))] text-[rgb(var(--foreground))]">
        <Arrow aria-hidden="true" className="text-xs rotate-180" />
        {t('blog_page.back')}
      </Link>
      <button
        type="button"
        onClick={share}
        className="press inline-flex items-center justify-center gap-2 min-h-12 px-3 rounded-[var(--radius-btn)] font-semibold text-sm bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] border border-[rgb(var(--accent))]/30">
        <FaShareAlt aria-hidden="true" className="text-xs" />
        {t('mPages.share')}
      </button>
      <p className="sr-only" role="status" aria-live="polite">
        {copied ? t('mPages.link_copied') : ''}
      </p>
      {copied && (
        <p aria-hidden="true" className="col-span-2 text-center text-xs font-semibold text-[rgb(var(--accent))]">
          {t('mPages.link_copied')}
        </p>
      )}
    </div>
  );
};

/**
 * Long-form article view. `article` is the bilingual body module loaded
 * server-side for this slug only; card facts (date, minutes, tags) come from
 * the registry. Numbered sections echo the case-study layout so the whole
 * site reads as one publication.
 */
const ArticleContent = ({ slug, article, nextSlug }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const home = isArabic ? '/ar' : '';
  const Arrow = isArabic ? FaArrowLeft : FaArrowRight;

  const facts = BLOG_POSTS[slug];
  const copy = (isArabic && article.ar) || article.en;
  const next = nextSlug
    ? (isArabic && BLOG_POSTS[nextSlug].ar) || BLOG_POSTS[nextSlug].en
    : null;

  return (
    <article className="container mx-auto px-6 max-sm:px-5 max-w-3xl pt-36 m-page-top pb-24 max-md:pb-14 text-start">
      {/* First viewport: a CSS animation that runs from the first paint and
          moves without fading, so the page's largest text is on screen before
          any JavaScript has loaded (see Reveal). */}
      <Reveal as="header" rise y={16} duration={0.5}
        className="mb-12 max-md:mb-8">
        <Link
          href={`${home}/blog`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors mb-6 max-md:mb-3 max-md:min-h-11">
          <Arrow className="text-xs rotate-180" />
          {t('blog_page.back')}
        </Link>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[rgb(var(--foreground))] leading-tight mb-4 type-h1">
          {copy.title}
        </h1>
        <p className="text-sm font-mono text-[rgb(var(--muted-foreground))] mb-4">
          {formatDate(facts.date, i18n.language)} ·{' '}
          {t('blog_page.minutes', { count: facts.minutes })} ·{' '}
          {t('blog_page.byline')}
        </p>
        <div className="flex flex-wrap gap-2">
          {facts.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[rgb(var(--muted))]/40 border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))]"
              dir="ltr">
              {tag}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="space-y-5 mb-14 max-md:mb-12">
        {copy.intro.map((paragraph, i) => (
          <p
            key={i}
            className={`text-lg text-[rgb(var(--foreground))] leading-relaxed ${BODY}`}>
            {paragraph}
          </p>
        ))}
      </div>

      {copy.sections.map((section, index) => (
        <Reveal as="section" y={24} duration={0.5}
          key={index}
          className="mb-12 scroll-mt-[calc(var(--header-h)+1.5rem)]">
          {/* On a phone the outline numeral becomes an eyebrow. */}
          <p aria-hidden="true" dir="ltr" className="md:hidden m-eyebrow mb-2 rtl:text-end">
            {String(index + 1).padStart(2, '0')}
          </p>
          <div className="flex items-baseline gap-4 mb-5 max-md:mb-4">
            <span
              className="max-md:hidden font-display text-4xl sm:text-5xl font-bold text-outline leading-none select-none"
              aria-hidden="true"
              dir="ltr">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[rgb(var(--foreground))] leading-snug type-h2">
              {section.heading}
            </h2>
          </div>
          <div className="space-y-4">
            {section.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`text-[rgb(var(--foreground))]/90 leading-relaxed ${BODY}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      ))}

      <Reveal as="section" y={24} duration={0.5}
        className="m-card glass-card rounded-2xl border border-[rgb(var(--border))] p-6 sm:p-8 mb-14 max-md:mb-8">
        <h2 className="font-display text-xl font-bold text-[rgb(var(--primary))] mb-4">
          {copy.takeaway.heading}
        </h2>
        <div className="space-y-4">
          {copy.takeaway.paragraphs.map((paragraph, i) => (
            <p key={i} className={`text-[rgb(var(--foreground))] leading-relaxed ${BODY}`}>
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>

      <EndRow slug={slug} title={copy.title} home={home} Arrow={Arrow} />

      {next && (
        <Link
          href={`${home}/blog/${nextSlug}`}
          className="press m-card group flex items-center justify-between gap-4 glass-card rounded-2xl border border-[rgb(var(--border))]/60 hover:border-[rgb(var(--primary))]/40 p-6 transition-colors">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--muted-foreground))] mb-1.5">
              {t('blog_page.next')}
            </p>
            <p className="font-display font-bold text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))] transition-colors leading-snug">
              {next.title}
            </p>
          </div>
          <Arrow className="shrink-0 text-[rgb(var(--muted-foreground))] group-hover:text-[rgb(var(--primary))] transition-colors" />
        </Link>
      )}
    </article>
  );
};

const BlogArticle = ({ slug, article, nextSlug, lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    <ArticleContent slug={slug} article={article} nextSlug={nextSlug} />
  </SiteShell>
);

export default BlogArticle;
