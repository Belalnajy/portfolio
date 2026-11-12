// The project registry (src/lib/case-studies.js) is the single source for
// every project fact. These checks make sure everything that hangs off a
// slug — narrative, card wording, cover, gallery, cover metadata — exists.
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { CASE_STUDIES, CASE_STUDY_SLUGS, CLIENT_PROJECT_SLUGS, PROJECT_KINDS, COUNTED_KINDS } from '../../src/lib/case-studies.js';
import { COVER_META } from '../../src/lib/cover-meta.js';
import { BLOG_POSTS, BLOG_SLUGS } from '../../src/lib/blog.js';
import { FACTS } from '../../src/lib/facts.js';
import en from '../../src/locales/en.js';
import ar from '../../src/locales/ar.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const inRepo = (...parts) => path.join(root, ...parts);
const CATEGORIES = new Set(['Full Stack', 'Frontend', 'Backend', 'Mobile']);
const SECTIONS = ['challenge', 'approach', 'delivered', 'outcome'];

test('registry entries are complete and well-formed', () => {
  const problems = [];
  for (const slug of CASE_STUDY_SLUGS) {
    const project = CASE_STUDIES[slug];
    if (!project.name) problems.push(`${slug}: no name`);
    if (!Array.isArray(project.stack) || project.stack.length === 0) problems.push(`${slug}: empty stack`);
    if (!CATEGORIES.has(project.category)) problems.push(`${slug}: category "${project.category}"`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(project.updated ?? '')) problems.push(`${slug}: updated "${project.updated}"`);
    for (const key of ['liveUrl', 'appStoreUrl', 'github']) {
      if (key in project && !/^https:\/\/\S+$/.test(project[key])) problems.push(`${slug}: ${key} "${project[key]}"`);
    }
  }
  assert.deepEqual(problems, []);
});

test('every cover and gallery image exists and has cover metadata', () => {
  const problems = [];
  for (const slug of CASE_STUDY_SLUGS) {
    const { image, gallery = [] } = CASE_STUDIES[slug];
    for (const file of [image, ...gallery]) {
      if (!existsSync(inRepo('public', file))) problems.push(`${slug}: missing public${file}`);
      if (!COVER_META[file]) problems.push(`${slug}: ${file} not in cover-meta.js (run npm run cover-meta)`);
    }
  }
  assert.deepEqual(problems, []);
});

test('every project has a bilingual narrative with matching shape', async () => {
  const problems = [];
  for (const slug of CASE_STUDY_SLUGS) {
    const file = inRepo('src/content/case-studies', `${slug}.js`);
    if (!existsSync(file)) {
      problems.push(`${slug}: no narrative module`);
      continue;
    }
    const narrative = (await import(file)).default;
    for (const lang of ['en', 'ar']) {
      const copy = narrative[lang];
      if (!copy?.title || !copy?.summary) problems.push(`${slug}.${lang}: title/summary`);
      for (const key of ['role', 'scope', 'audience']) {
        if (!copy?.facts?.[key]) problems.push(`${slug}.${lang}: facts.${key}`);
      }
      for (const section of SECTIONS) {
        if (!copy?.[section]?.body || !Array.isArray(copy[section].points)) problems.push(`${slug}.${lang}: ${section}`);
      }
    }
    for (const section of SECTIONS) {
      if (narrative.en?.[section]?.points?.length !== narrative.ar?.[section]?.points?.length) {
        problems.push(`${slug}: ${section}.points differ in length between en and ar`);
      }
    }
  }
  assert.deepEqual(problems, []);
});

test('narrative modules and registry entries pair up one to one', () => {
  const modules = readdirSync(inRepo('src/content/case-studies')).map((file) => file.replace(/\.js$/, '')).sort();
  assert.deepEqual(modules, [...CASE_STUDY_SLUGS].sort());
});

test('every project has card wording in both locales, and no wording is orphaned', () => {
  const problems = [];
  for (const [lang, bundle] of [['en', en], ['ar', ar]]) {
    const items = bundle.translation.projects.items;
    for (const slug of CASE_STUDY_SLUGS) {
      const item = items[slug];
      if (!item?.title || !item?.desc || !Array.isArray(item?.features)) problems.push(`${lang}: projects.items.${slug}`);
    }
    for (const key of Object.keys(items)) {
      if (!CASE_STUDIES[key]) problems.push(`${lang}: projects.items.${key} has no registry entry`);
    }
  }
  assert.deepEqual(problems, []);
});

test('the headline project count is client work only; the archive count is everything', () => {
  assert.equal(FACTS.projects, CLIENT_PROJECT_SLUGS.length);
  assert.equal(FACTS.archive, CASE_STUDY_SLUGS.length);
  assert.ok(FACTS.projects < FACTS.archive, 'training, event and learning projects exist and are excluded');
});

test('project kinds are known, labelled in both languages, and uncounted kinds are never featured', () => {
  const problems = [];
  for (const slug of CASE_STUDY_SLUGS) {
    const { kind, featured } = CASE_STUDIES[slug];
    if (kind === undefined) continue;
    if (!PROJECT_KINDS.includes(kind)) problems.push(`${slug}: unknown kind "${kind}"`);
    if (featured && !COUNTED_KINDS.includes(kind)) problems.push(`${slug}: ${kind} work is featured as if it were client work`);
  }
  for (const [lang, bundle] of [['en', en], ['ar', ar]]) {
    for (const kind of PROJECT_KINDS) {
      if (!bundle.translation.projects.kinds?.[kind]) problems.push(`${lang}: projects.kinds.${kind} missing`);
    }
  }
  assert.deepEqual(problems, []);
});

test('every article in the blog registry has a bilingual body', async () => {
  const problems = [];
  for (const slug of BLOG_SLUGS) {
    const file = inRepo('src/content/blog', `${slug}.js`);
    if (!existsSync(file)) {
      problems.push(`${slug}: no article module`);
      continue;
    }
    const post = (await import(file)).default;
    for (const lang of ['en', 'ar']) {
      if (!BLOG_POSTS[slug][lang]?.title || !BLOG_POSTS[slug][lang]?.description) problems.push(`${slug}.${lang}: card`);
      if (!Array.isArray(post[lang]?.intro) || !Array.isArray(post[lang]?.sections)) problems.push(`${slug}.${lang}: body`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(BLOG_POSTS[slug].date)) problems.push(`${slug}: date`);
  }
  assert.deepEqual(problems, []);
});
