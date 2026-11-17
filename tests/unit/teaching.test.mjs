// The /teaching page (src/lib/teaching.js): every lecture has its wording in
// both languages, every Drive id looks like one, and the stats line adds up.
import test from 'node:test';
import assert from 'node:assert/strict';
import { COURSES, VIDEOS, TEACHING_STATS } from '../../src/lib/teaching.js';
import en from '../../src/locales/en.js';
import ar from '../../src/locales/ar.js';

const DRIVE_ID = /^[\w-]{25,}$/;

test('every course, section and lecture is worded in both languages', () => {
  const problems = [];
  for (const [lang, bundle] of [['en', en], ['ar', ar]]) {
    const copy = bundle.translation.teaching;
    for (const course of COURSES) {
      for (const key of ['title', 'short', 'meta', 'desc']) {
        if (!copy.courses?.[course.id]?.[key]) problems.push(`${lang}: teaching.courses.${course.id}.${key}`);
      }
      for (const section of course.sections ?? []) {
        if (!copy.sections?.[section.id]) problems.push(`${lang}: teaching.sections.${section.id}`);
      }
      for (const lecture of course.lectures ?? []) {
        if (!copy.topics?.[lecture.id]) problems.push(`${lang}: teaching.topics.${lecture.id}`);
      }
    }
  }
  assert.deepEqual(problems, []);
});

test('every Drive id is well-formed and used once', () => {
  const ids = COURSES.flatMap((course) => [
    course.folder,
    ...(course.sections ?? []).flatMap((section) => [section.folder, ...section.videos.map((video) => video.drive)]),
    ...(course.lectures ?? []).flatMap((lecture) => [lecture.folder, lecture.slides, lecture.labVideo].filter(Boolean)),
  ]);
  assert.deepEqual(ids.filter((id) => !DRIVE_ID.test(id)), []);
  assert.equal(new Set(ids).size, ids.length);
});

test('the stats line matches the material', () => {
  assert.equal(VIDEOS.length, 19);
  assert.deepEqual(VIDEOS.map((video) => video.number), Array.from({ length: 19 }, (_, i) => i + 1));
  assert.deepEqual(
    { courses: TEACHING_STATS.courses, lectures: TEACHING_STATS.lectures, decks: TEACHING_STATS.decks },
    { courses: 2, lectures: 27, decks: 8 },
  );
});
