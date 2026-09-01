import { CASE_STUDIES, CASE_STUDY_SLUGS } from '../../lib/case-studies';
import { loadNarrative } from '../../lib/case-study-metadata';
import { SITE_URL } from '../../lib/site';

export const dynamic = 'force-static';

/**
 * llms.txt — a concise, plain-markdown map of the site for AI assistants and
 * answer engines (https://llmstxt.org). Generated from the same case-study
 * registry as the routes and sitemap, so it never goes stale.
 */
export async function GET() {
  const caseStudies = await Promise.all(
    CASE_STUDY_SLUGS.map(async (slug) => {
      const narrative = await loadNarrative(slug);
      return `- [${CASE_STUDIES[slug].name}](${SITE_URL}/case-study/${slug}): ${narrative.en.summary}`;
    }),
  );

  const body = `# Belal Nagy — Full-Stack Developer

> Belal Nagy is a full-stack developer based in Alexandria, Egypt, currently a
> Software Engineer at ezSec Inc (a cybersecurity company in Kitchener,
> Canada, remote) and co-founder of Indstrz. He builds web platforms from
> zero and takes over existing codebases that need fixing: 31 projects for 27
> clients across Egypt and the Gulf, in Next.js, Laravel, NestJS, Node.js,
> Django and PostgreSQL, with Arabic/RTL support in every project.

Key facts:

- Current role: Software Engineer at ezSec Inc, Canada (remote, full-time, since 01/2026), including DevOps deployment work
- Also: Full Stack Developer at S&F, Saudi Arabia (part-time); co-founder of Indstrz, a B2B industrial procurement platform selected for the Venture Ready Program by Plug and Play
- Education: Bachelor of Business (English Section), Business Information Systems (BIS), Alexandria University, 2019–2023, GPA 3.265
- Taught front-end development to 240+ students as an external instructor at ITI
- Specialties: multi-tenant platforms (one LMS engine running three accredited brands), Arabic-first/RTL interfaces, legacy-code takeover, real-time systems
- Languages: Arabic (native), English
- Contact and profiles: [GitHub](https://github.com/Belalnajy), [LinkedIn](https://linkedin.com/in/belalnajy)

## Main pages

- [Home (English)](${SITE_URL}/): who Belal is, experience timeline, flagship projects and contact
- [Home (Arabic)](${SITE_URL}/ar): the same site, fully in Arabic (every page also exists under /ar)
- [Work](${SITE_URL}/work): the complete archive of 35 projects with skills and certifications
- [Services & packages](${SITE_URL}/services): what Belal offers, the delivery process and pricing packages
- [Now](${SITE_URL}/now): what he is focused on right now, updated regularly
- [CV (PDF)](${SITE_URL}/Belal_Nagy_CV.pdf)

## Case studies

${caseStudies.join('\n')}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
