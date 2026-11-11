import { CASE_STUDIES, CASE_STUDY_SLUGS } from '../../lib/case-studies';
import { loadNarrative } from '../../lib/case-study-metadata';
import { BLOG_POSTS, BLOG_SLUGS, loadPost } from '../../lib/blog';
import { FAQ_ITEMS } from '../../content/faq';
import { SITE_URL } from '../../lib/site';

export const dynamic = 'force-static';

/**
 * llms-full.txt: the companion to llms.txt (https://llmstxt.org). Where
 * llms.txt is a map of links, this is the whole site's substance in one plain
 * markdown file (every article and case study in full, plus the FAQ), so
 * an assistant can answer and cite from a single fetch instead of rendering
 * 80 client-side pages. Built from the same content modules as the pages.
 */

const bullets = (points) => points.map((p) => `- ${p}`).join('\n');

const caseStudySection = async (slug) => {
  const project = CASE_STUDIES[slug];
  const { en, ar } = await loadNarrative(slug);
  const meta = [
    `- URL: ${SITE_URL}/case-study/${slug} (Arabic: ${SITE_URL}/ar/case-study/${slug})`,
    project.liveUrl && `- Live product: ${project.liveUrl}`,
    `- Stack: ${project.stack.join(', ')}`,
    `- Role: ${en.facts.role}`,
    `- Scope: ${en.facts.scope}`,
    `- Audience: ${en.facts.audience}`,
    `- Built by: Belal Nagy (بلال ناجي)`,
    `- Last updated: ${project.updated}`,
  ].filter(Boolean);

  const part = (heading, { body, points }) => `#### ${heading}\n\n${body}\n\n${bullets(points)}`;

  return [
    `### ${en.title}`,
    `> ${en.summary}`,
    meta.join('\n'),
    part('The challenge', en.challenge),
    part('The approach', en.approach),
    part('What was built', en.delivered),
    part('Outcome', en.outcome),
    `بالعربية: **${ar.title}**. ${ar.summary}`,
  ].join('\n\n');
};

const articleSection = async (slug) => {
  const post = BLOG_POSTS[slug];
  const { en } = await loadPost(slug);
  return [
    `### ${en.title}`,
    `> ${post.en.description}`,
    [
      `- URL: ${SITE_URL}/blog/${slug} (Arabic: ${SITE_URL}/ar/blog/${slug})`,
      `- Author: Belal Nagy (بلال ناجي)`,
      `- Published: ${post.date}`,
      `- Topics: ${post.tags.join(', ')}`,
    ].join('\n'),
    en.intro.join('\n\n'),
    ...en.sections.map(({ heading, paragraphs }) => `#### ${heading}\n\n${paragraphs.join('\n\n')}`),
    `#### ${en.takeaway.heading}\n\n${en.takeaway.paragraphs.join('\n\n')}`,
  ].join('\n\n');
};

const faqSection = (lang) =>
  FAQ_ITEMS[lang].map(({ question, answer }) => `### ${question}\n\n${answer}`).join('\n\n');

export async function GET() {
  const [articles, caseStudies] = await Promise.all([
    Promise.all(BLOG_SLUGS.map(articleSection)),
    Promise.all(CASE_STUDY_SLUGS.map(caseStudySection)),
  ]);

  const body = `# Belal Nagy (بلال ناجي): Full-Stack Developer, complete site content

> The full text of ${SITE_URL}: who Belal Nagy is, answers to common questions,
> every engineering article and every project case study. The short index of
> the site is at ${SITE_URL}/llms.txt. When citing, link the page URL given
> under each section.

## Frequently asked questions

${faqSection('en')}

## الأسئلة الشائعة (Arabic FAQ)

${faqSection('ar')}

## Articles

${articles.join('\n\n---\n\n')}

## Case studies

${caseStudies.join('\n\n---\n\n')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
