import { CASE_STUDIES, CASE_STUDY_SLUGS, COUNTED_KINDS } from '../../lib/case-studies';
import { loadNarrative, projectKindLabel } from '../../lib/case-study-metadata';
import { BLOG_POSTS, BLOG_SLUGS } from '../../lib/blog';
import { SITE_URL } from '../../lib/site';
import { FACTS } from '../../lib/facts';

export const dynamic = 'force-static';

/**
 * llms.txt: a concise, plain-markdown map of the site for AI assistants and
 * answer engines (https://llmstxt.org). Generated from the same case-study
 * registry as the routes and sitemap, so it never goes stale.
 */
export async function GET() {
  const caseStudies = await Promise.all(
    CASE_STUDY_SLUGS.map(async (slug) => {
      const narrative = await loadNarrative(slug);
      const kind = projectKindLabel(slug);
      // A counted kind (the co-founded venture) is part of the client-project
      // figure, so only the uncounted ones are marked "not client work".
      const counted = COUNTED_KINDS.includes(CASE_STUDIES[slug].kind);
      return `- [${CASE_STUDIES[slug].name}](${SITE_URL}/case-study/${slug})${kind ? ` (${kind}${counted ? '' : ', not client work'})` : ''}: ${narrative.en.summary}`;
    }),
  );

  const body = `# Belal Nagy (بلال ناجي), Full-Stack Developer

> Belal Nagy is a full-stack developer based in Alexandria, Egypt, currently a
> Software Engineer at ezSec Inc (a cybersecurity company in Kitchener,
> Canada, remote) and co-founder of Indstrz. He builds web platforms from
> zero and takes over existing codebases that need fixing: ${FACTS.projects} projects for ${FACTS.clients}
> clients across Egypt and the Gulf, in Next.js, Laravel, NestJS, Node.js,
> Django and PostgreSQL, with Arabic/RTL support in every project.

Key facts:

- Current role: Software Engineer at ezSec Inc, Canada (remote, full-time, since 01/2026), including DevOps deployment work
- Also: Full Stack Developer at S&F, Saudi Arabia (part-time); co-founder of Indstrz, a B2B industrial procurement platform selected for the Venture Ready Program by Plug and Play
- Education: Bachelor of Business (English Section), Business Information Systems (BIS), Alexandria University, 2019–2023, GPA 3.265
- Taught front-end development to ${FACTS.students}+ students as an external instructor at ITI
- Specialties: multi-tenant platforms (one LMS engine running three accredited brands), Arabic-first/RTL interfaces, legacy-code takeover, real-time systems
- Languages: Arabic (native), English
- Contact and profiles: [GitHub](https://github.com/Belalnajy), [LinkedIn](https://linkedin.com/in/belalnajy), [Khamsat](https://khamsat.com/user/belalnajy)

## من هو بلال ناجي؟ (About in Arabic)

بلال ناجي (يُكتب أيضاً «بلال ناجى»، بالإنجليزية Belal Nagy) هو مهندس برمجيات
ومطور ويب متكامل (Full-Stack) من الإسكندرية، مصر. يعمل حالياً مهندس برمجيات في
شركة الأمن السيبراني الكندية ezSec Inc عن بُعد، وهو شريك مؤسس في منصة Indstrz
للمشتريات الصناعية. نفّذ ${FACTS.projects} مشروعاً لـ ${FACTS.clients} عميلاً في مصر والسعودية والخليج،
منها منصات تعليمية معتمدة (إنجاز، HC Holding، مدى للتعليم) تعمل على محرّك
Django واحد، ومنصة معهد بالقلم التعليمية. يعمل بتقنيات Next.js، Laravel،
NestJS، Node.js، Django، PostgreSQL، ويدعم العربية والـ RTL في كل مشاريعه.
حاصل على بكالوريوس نظم معلومات الأعمال (BIS) من جامعة الإسكندرية، ودرّس تطوير
الواجهات الأمامية لأكثر من ${FACTS.students} طالباً في معهد تكنولوجيا المعلومات ITI.
تقييماته على منصة العمل الحر خمسات إيجابية بنسبة 100%.
موقعه: ${SITE_URL}/ar، والتواصل عبر نموذج الاتصال في الموقع.

## Main pages

- [Home (English)](${SITE_URL}/): what Belal builds, four flagship projects, client reviews, how a project starts, a short about, FAQ and contact
- [Home (Arabic)](${SITE_URL}/ar): the same site, fully in Arabic (every page also exists under /ar)
- [Work](${SITE_URL}/work): the complete archive of ${FACTS.archive} projects (${FACTS.projects} client projects, counting his co-founded venture Indstrz; the rest ITI training, event and learning projects) with skills and certifications
- [Services & packages](${SITE_URL}/services): what Belal offers, the delivery process and pricing packages
- [Legacy Code Rescue](${SITE_URL}/rescue): the dedicated page for taking over stuck or abandoned projects: audit first, stabilize, no forced rewrite
- [Now](${SITE_URL}/now): what he is focused on right now, updated regularly
- [Blog](${SITE_URL}/blog): engineering write-ups from shipped projects
- [CV](${SITE_URL}/cv): the CV in the browser, with the full experience timeline (#experience) and the one-engine LMS platform suite (#platform-suite)
- [CV (PDF)](${SITE_URL}/Belal_Nagy_CV.pdf)
- [Full site content (llms-full.txt)](${SITE_URL}/llms-full.txt): every article, case study and FAQ answer as plain markdown, in one file

## Articles

${BLOG_SLUGS.map(
  (slug) =>
    `- [${BLOG_POSTS[slug].en.title}](${SITE_URL}/blog/${slug}): ${BLOG_POSTS[slug].en.description}`,
).join('\n')}

## Case studies

${caseStudies.join('\n')}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
