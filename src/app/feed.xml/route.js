import { BLOG_POSTS, BLOG_SLUGS } from '../../lib/blog';
import { SITE_URL } from '../../lib/site';

/**
 * RSS 2.0 for the writing. Both languages ride in one feed: each post appears
 * once in English with an Arabic alternate link, which is what readers expect
 * from a bilingual site — two feeds would just split the subscriber list.
 *
 * Rebuilt with the site, so it is a static file in practice.
 */
export const dynamic = 'force-static';

const escape = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function GET() {
  const items = BLOG_SLUGS.map((slug) => {
    const post = BLOG_POSTS[slug];
    const url = `${SITE_URL}/blog/${slug}`;
    return `    <item>
      <title>${escape(post.en.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(post.en.description)}</description>
${post.tags.map((tag) => `      <category>${escape(tag)}</category>`).join('\n')}
      <xhtml:link xmlns:xhtml="http://www.w3.org/1999/xhtml" rel="alternate" hreflang="ar" href="${SITE_URL}/ar/blog/${slug}" />
    </item>`;
  }).join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Belal Nagy — Writing</title>
    <link>${SITE_URL}/blog</link>
    <description>Engineering write-ups from shipped projects — the decisions, the costs, and what I would do again.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
