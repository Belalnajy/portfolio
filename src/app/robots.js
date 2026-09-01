import { SITE_URL } from '../lib/site';

// AI answer-engine crawlers are listed explicitly so the intent is
// unambiguous: this portfolio wants to be readable and citable by assistants
// (ChatGPT, Claude, Perplexity, Gemini and others), not just indexed by
// classic search. `*` already allows everything; the named rules make sure a
// future blanket change does not silently drop the answer engines.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'cohere-ai',
  'CCBot',
  'Bytespider',
  'Amazonbot',
  'DuckAssistBot',
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
