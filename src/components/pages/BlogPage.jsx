'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { REVEAL_VIEWPORT, revealDelay, REVEAL_DURATION } from '../../lib/motion';
import { useTranslation } from 'react-i18next';
import SiteShell from '../SiteShell';
import { BLOG_POSTS, BLOG_SLUGS } from '../../lib/blog';

const formatDate = (iso, lang) =>
  new Intl.DateTimeFormat(lang === 'ar' ? 'ar' : 'en', {
    dateStyle: 'long',
  }).format(new Date(iso));

/**
 * The writing index: long-form engineering articles drawn from shipped
 * projects. Card copy comes from the registry, so this page never loads an
 * article body.
 */
const BlogContent = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const home = isArabic ? '/ar' : '';
  const Arrow = isArabic ? FaArrowLeft : FaArrowRight;

  return (
    <div className="container mx-auto px-6 max-w-3xl pt-36 pb-24">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-start mb-14">
        <h1 className="font-display text-display-lg font-bold text-[rgb(var(--foreground))] mb-3">
          {t('blog_page.title')}
        </h1>
        <p className="text-lg text-[rgb(var(--muted-foreground))] leading-relaxed">
          {t('blog_page.subtitle')}
        </p>
      </motion.header>

      <div className="space-y-6">
        {BLOG_SLUGS.map((slug, index) => {
          const post = BLOG_POSTS[slug];
          const copy = (isArabic && post.ar) || post.en;
          return (
            <motion.article
              key={slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL_VIEWPORT}
              transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}>
              <Link
                href={`${home}/blog/${slug}`}
                className="group block glass-card rounded-2xl border border-[rgb(var(--border))]/60 hover:border-[rgb(var(--primary))]/40 p-6 sm:p-8 text-start transition-colors">
                <p className="text-xs font-mono text-[rgb(var(--muted-foreground))]/80 mb-3">
                  {formatDate(post.date, i18n.language)} ·{' '}
                  {t('blog_page.minutes', { count: post.minutes })}
                </p>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))] transition-colors mb-3 leading-snug">
                  {copy.title}
                </h2>
                <p className="text-[rgb(var(--muted-foreground))] leading-relaxed mb-5">
                  {copy.description}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[rgb(var(--muted))]/30 border border-[rgb(var(--border))]/60 text-[rgb(var(--muted-foreground))]"
                      dir="ltr">
                      {tag}
                    </span>
                  ))}
                  <span className="ms-auto inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--primary))]">
                    {t('blog_page.read')}
                    <Arrow className="text-xs transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
};

const BlogPage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    <BlogContent />
  </SiteShell>
);

export default BlogPage;
