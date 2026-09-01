/*
 * Generates public/Belal_Nagy_CV.pdf from the site's own data, so the CV the
 * download button serves can never drift from what the site says.
 *
 * Sources:
 *  - src/locales/en.js          → summary, experience/education timeline,
 *                                 certifications, project one-liners
 *  - src/lib/case-studies.js    → selected projects (name, stack, live URL)
 *
 * Usage:
 *   node scripts/generate-cv.mjs
 *
 * Needs a Chromium for the PDF step. It looks for playwright-core (install
 * with `npm i -D playwright-core` if missing) and an executable from, in
 * order: $CHROME_PATH, playwright's own download, /opt/pw-browsers/chromium,
 * or the system chromium/google-chrome on PATH.
 */
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import en from '../src/locales/en.js';
import { CASE_STUDIES } from '../src/lib/case-studies.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_PDF = join(ROOT, 'public', 'Belal_Nagy_CV.pdf');

const t = en.translation;

/* ------------------------------------------------------------------ data */

const CONTACT = {
  name: 'Belal Nagy',
  role: t.hero.role_line,
  location: 'Alexandria, Egypt',
  email: 'belalnajy9@gmail.com',
  site: 'belalnagy.com',
  github: 'github.com/Belalnajy',
  linkedin: 'linkedin.com/in/belalnajy',
};

// <1>…</1> markers are Trans-component islands on the site; plain text here.
const strip = (s) => s.replace(/<\/?\d+>/g, '');
const SUMMARY = [t.about.summary_p1, t.about.summary_p2, t.about.summary_p3].map(strip);

const TIMELINE = t.timeline.items;
const EXPERIENCE = TIMELINE.filter((item) => item.employment);
const EDUCATION = TIMELINE.filter((item) => !item.employment);

// The projects worth a recruiter's minute, in order. One line each, taken
// from the same copy the site's project cards use.
const PROJECT_SLUGS = ['bilqalam', 'injaz', 'indstrz', 'medicta', 'toyo228', 'uduipa'];
const PROJECTS = PROJECT_SLUGS.map((slug) => ({
  slug,
  ...CASE_STUDIES[slug],
  desc: t.projects.items[slug].desc,
}));

// Mirrors the categories in src/components/Skills.jsx, kept to CV depth.
const SKILLS = [
  ['Languages', 'Python · JavaScript · TypeScript · PHP · SQL · HTML · CSS'],
  ['Frameworks', 'Django · Flask · Laravel · Next.js · React · Node.js · Express · NestJS · Tailwind CSS'],
  ['Databases & APIs', 'PostgreSQL · MongoDB · MySQL · Redis · REST APIs · WebSockets'],
  ['DevOps & Infra', 'Docker · Git · Linux · Nginx · CI/CD · production deployment'],
  ['Languages (spoken)', 'Arabic (native) · English (professional)'],
];

const HIGHLIGHTS = [
  '31+ projects delivered for 27+ clients across Egypt and the Gulf',
  '100% positive freelance reviews on Khamsat, Mostaql and Nafezly',
  'Taught front-end development to 240+ students at ITI',
  'Arabic/RTL support shipped in every project',
];

const CERTIFICATIONS = Object.values(t.certifications.items);

/* ------------------------------------------------------------------ html */

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const section = (title, body) => `
  <section>
    <h2>${esc(title)}</h2>
    ${body}
  </section>`;

const experienceHtml = EXPERIENCE.map(
  (item) => `
  <div class="entry">
    <div class="entry-head">
      <div>
        <strong>${esc(item.title)}</strong> — ${esc(item.company)}
        <span class="tag">${esc(item.employment)}</span>
      </div>
      <div class="meta">${esc(item.period)} · ${esc(item.location)}</div>
    </div>
    <ul>${item.description.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
  </div>`,
).join('');

const educationHtml = EDUCATION.map(
  (item) => `
  <div class="entry">
    <div class="entry-head">
      <div><strong>${esc(item.title)}</strong> — ${esc(item.company)}</div>
      <div class="meta">${esc(item.period)} · ${esc(item.location)}</div>
    </div>
    <ul>${item.description.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
  </div>`,
).join('');

const projectsHtml = PROJECTS.map(
  (p) => `
  <div class="project">
    <strong>${esc(p.name)}</strong>
    <span class="meta">${esc(p.stack.join(' · '))}</span><br/>
    ${esc(p.desc)}
    ${p.liveUrl && p.liveUrl !== '#' ? `<span class="meta"> — ${esc(p.liveUrl.replace(/^https?:\/\/|\/$/g, ''))}</span>` : ''}
  </div>`,
).join('');

const skillsHtml = `<table class="skills">${SKILLS.map(
  ([label, list]) => `<tr><td class="skill-label">${esc(label)}</td><td>${esc(list)}</td></tr>`,
).join('')}</table>`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<style>
  :root { --ink: #0b0f14; --copper: #b06f14; --muted: #55616e; --line: #d8dee5; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    font: 9.6pt/1.45 'Helvetica Neue', Arial, sans-serif;
    color: var(--ink);
  }
  header { border-bottom: 2.5px solid var(--copper); padding-bottom: 10px; margin-bottom: 12px; }
  h1 { font-size: 21pt; letter-spacing: 0.5px; }
  .role { color: var(--copper); font-weight: 700; font-size: 10.5pt; margin: 2px 0 6px; }
  .contact { color: var(--muted); font-size: 8.8pt; }
  .contact span + span::before { content: '  ·  '; }
  h2 {
    font-size: 10pt; text-transform: uppercase; letter-spacing: 1.6px;
    color: var(--copper); border-bottom: 1px solid var(--line);
    padding-bottom: 2px; margin: 12px 0 7px;
  }
  p.summary { margin-bottom: 5px; text-align: justify; }
  .entry { margin-bottom: 8px; page-break-inside: avoid; }
  .entry-head { display: flex; justify-content: space-between; gap: 12px; align-items: baseline; }
  .meta { color: var(--muted); font-size: 8.6pt; white-space: nowrap; }
  .tag {
    font-size: 7.6pt; color: var(--copper); border: 1px solid var(--copper);
    border-radius: 8px; padding: 0 5px; margin-inline-start: 4px; vertical-align: 1px;
  }
  ul { margin: 3px 0 0 14px; }
  li { margin-bottom: 1.5px; }
  .project { margin-bottom: 6px; page-break-inside: avoid; }
  .project .meta { white-space: normal; }
  .skills td { padding: 1.5px 0; vertical-align: top; }
  .skill-label { color: var(--muted); font-weight: 700; width: 118px; padding-inline-end: 10px; }
  .highlights { columns: 2; column-gap: 24px; margin-left: 14px; }
  .certs { columns: 2; column-gap: 24px; margin-left: 14px; font-size: 8.8pt; }
</style>
</head>
<body>
  <header>
    <h1>${esc(CONTACT.name)}</h1>
    <div class="role">${esc(CONTACT.role)}</div>
    <div class="contact">
      <span>${esc(CONTACT.location)}</span><span>${esc(CONTACT.email)}</span><span>${esc(CONTACT.site)}</span><span>${esc(CONTACT.github)}</span><span>${esc(CONTACT.linkedin)}</span>
    </div>
  </header>

  ${section('Summary', SUMMARY.map((p) => `<p class="summary">${esc(p)}</p>`).join(''))}
  ${section('Highlights', `<ul class="highlights">${HIGHLIGHTS.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>`)}
  ${section('Experience', experienceHtml)}
  ${section('Selected Projects', projectsHtml)}
  ${section('Skills', skillsHtml)}
  ${section('Education', educationHtml)}
  ${section('Courses & Certifications', `<ul class="certs">${CERTIFICATIONS.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>`)}
</body>
</html>`;

/* ------------------------------------------------------------------- pdf */

const findChromium = () => {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  if (existsSync('/opt/pw-browsers/chromium')) return '/opt/pw-browsers/chromium';
  for (const bin of ['chromium', 'chromium-browser', 'google-chrome']) {
    try {
      return execSync(`command -v ${bin}`, { encoding: 'utf8' }).trim();
    } catch {
      /* keep looking */
    }
  }
  return null;
};

const main = async () => {
  const { chromium } = await import('playwright-core');
  const executablePath = findChromium();

  const browser = await chromium.launch(
    executablePath ? { executablePath } : {},
  );
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    await mkdir(dirname(OUT_PDF), { recursive: true });
    await rm(OUT_PDF, { force: true });
    await page.pdf({
      path: OUT_PDF,
      format: 'A4',
      margin: { top: '14mm', bottom: '14mm', left: '14mm', right: '14mm' },
      printBackground: true,
    });
  } finally {
    await browser.close();
  }
  console.log(`Wrote ${OUT_PDF}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
