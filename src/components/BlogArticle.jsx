'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { REVEAL_VIEWPORT } from '../lib/motion';
import { useTranslation } from 'react-i18next';
import SiteShell from './SiteShell';
import { BLOG_POSTS } from '../lib/blog';

const formatDate = (iso, lang) =>
  new Intl.DateTimeFormat(lang === 'ar' ? 'ar' : 'en', {
    dateStyle: 'long',
  }).format(new Date(iso));

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
    <article className="container mx-auto px-6 max-w-3xl pt-36 pb-24 text-start">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12">
        <Link
          href={`${home}/blog`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors mb-6">
          <Arrow className="text-xs rotate-180" />
          {t('blog_page.back')}
        </Link>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[rgb(var(--foreground))] leading-tight mb-4">
          {copy.title}
        </h1>
        <p className="text-sm font-mono text-[rgb(var(--muted-foreground))]/80 mb-4">
          {formatDate(facts.date, i18n.language)} ·{' '}
          {t('blog_page.minutes', { count: facts.minutes })} ·{' '}
          {t('blog_page.byline')}
        </p>
        <div className="flex flex-wrap gap-2">
          {facts.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/25 text-[rgb(var(--primary))]"
              dir="ltr">
              {tag}
            </span>
          ))}
        </div>
      </motion.header>

      <div className="space-y-5 mb-14">
        {copy.intro.map((paragraph, i) => (
          <p
            key={i}
            className="text-lg text-[rgb(var(--foreground))] leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {copy.sections.map((section, index) => (
        <motion.section
          key={index}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5 }}
          className="mb-12">
          <div className="flex items-baseline gap-4 mb-5">
            <span
              className="font-display text-4xl sm:text-5xl font-bold text-outline leading-none select-none"
              aria-hidden="true"
              dir="ltr">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[rgb(var(--foreground))] leading-snug">
              {section.heading}
            </h2>
          </div>
          <div className="space-y-4">
            {section.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-[rgb(var(--foreground))]/90 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.section>
      ))}

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={REVEAL_VIEWPORT}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-2xl border border-[rgb(var(--primary))]/25 p-6 sm:p-8 mb-14">
        <h2 className="font-display text-xl font-bold text-[rgb(var(--primary))] mb-4">
          {copy.takeaway.heading}
        </h2>
        <div className="space-y-4">
          {copy.takeaway.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-[rgb(var(--foreground))] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.section>

      {next && (
        <Link
          href={`${home}/blog/${nextSlug}`}
          className="group flex items-center justify-between gap-4 glass-card rounded-2xl border border-[rgb(var(--border))]/60 hover:border-[rgb(var(--primary))]/40 p-6 transition-colors">
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
