'use client';
import Link from 'next/link';
import Reveal from '../Reveal';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { revealDelay } from '../../lib/motion';
import { useTranslation } from 'react-i18next';
import SiteShell from '../SiteShell';
import { BLOG_POSTS, BLOG_SLUGS } from '../../lib/blog';

const formatDate = (iso, lang) =>
  // `-u-nu-latn`: Arabic month names with Western digits, as everywhere else
  // on the site (Arabic-Indic digits are not used).
  new Intl.DateTimeFormat(lang === 'ar' ? 'ar-u-nu-latn' : 'en', {
    dateStyle: 'long',
    // The ISO date is midnight UTC; without this a reader west of UTC gets the
    // previous day, which is wrong and does not match the prerendered HTML.
    timeZone: 'UTC',
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
    <div className="container mx-auto px-6 max-sm:px-5 max-w-3xl pt-36 m-page-top pb-24 max-md:pb-14">
      {/* First viewport: a CSS animation that runs from the first paint and
          moves without fading, so the page's largest text is on screen before
          any JavaScript has loaded (see Reveal). */}
      <Reveal as="header" rise y={16} duration={0.5}
        className="text-start mb-14 max-md:mb-8">
        <h1 className="font-display text-display-lg type-h1 font-bold text-[rgb(var(--foreground))] mb-3">
          {t('blog_page.title')}
        </h1>
        <p className="text-lg text-[rgb(var(--muted-foreground))] leading-relaxed type-body">
          {t('blog_page.subtitle')}
        </p>
      </Reveal>

      <div className="space-y-6 max-md:space-y-3">
        {BLOG_SLUGS.map((slug, index) => {
          const post = BLOG_POSTS[slug];
          const copy = (isArabic && post.ar) || post.en;
          return (
            <Reveal as="article" y={24} delay={revealDelay(index)}
              key={slug}>
              <Link
                href={`${home}/blog/${slug}`}
                // The whole card is the link: on a phone it presses in.
                className="press m-card group block glass-card rounded-2xl border border-[rgb(var(--border))]/60 hover:border-[rgb(var(--primary))]/40 p-6 sm:p-8 text-start transition-colors">
                <p className="text-xs font-mono text-[rgb(var(--muted-foreground))] mb-3">
                  {formatDate(post.date, i18n.language)} ·{' '}
                  {t('blog_page.minutes', { count: post.minutes })}
                </p>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))] transition-colors mb-3 leading-snug type-h3 max-md:mb-2">
                  {copy.title}
                </h2>
                <p className="text-[rgb(var(--muted-foreground))] leading-relaxed mb-5 max-md:mb-4 max-md:line-clamp-3 max-md:text-[0.9375rem]">
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
            </Reveal>
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
