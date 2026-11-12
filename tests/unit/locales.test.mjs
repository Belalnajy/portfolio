// The two locale bundles must have the same shape: a key present in one and
// missing in the other renders as a raw key (or, for a list, used to crash the
// page), and nothing else in the toolchain notices.
import test from 'node:test';
import assert from 'node:assert/strict';
import en from '../../src/locales/en.js';
import ar from '../../src/locales/ar.js';
import { FACT_VARIABLES } from '../../src/lib/facts.js';

const shape = (value, path = '', out = new Map()) => {
  if (Array.isArray(value)) {
    out.set(path, `array(${value.length})`);
    value.forEach((item, i) => shape(item, `${path}[${i}]`, out));
  } else if (value && typeof value === 'object') {
    out.set(path, 'object');
    for (const [key, inner] of Object.entries(value)) shape(inner, path ? `${path}.${key}` : key, out);
  } else {
    out.set(path, typeof value);
  }
  return out;
};

const strings = (value, path = '', out = []) => {
  if (typeof value === 'string') out.push([path, value]);
  else if (value && typeof value === 'object') {
    for (const [key, inner] of Object.entries(value)) strings(inner, path ? `${path}.${key}` : key, out);
  }
  return out;
};

const EN = shape(en.translation);
const AR = shape(ar.translation);

test('every English key exists in Arabic with the same type and list length', () => {
  const problems = [];
  for (const [path, kind] of EN) {
    if (!AR.has(path)) problems.push(`missing in ar: ${path}`);
    else if (AR.get(path) !== kind) problems.push(`${path}: en ${kind}, ar ${AR.get(path)}`);
  }
  assert.deepEqual(problems, []);
});

test('Arabic has no keys English lacks', () => {
  assert.deepEqual([...AR.keys()].filter((path) => !EN.has(path)), []);
});

// The placeholders of a string must match between the two languages.
const placeholders = (text) => [...text.matchAll(/\{\{\s*(\w+)\s*\}\}/g)].map(([, name]) => name).sort();

test('each string uses the same placeholders in both languages', () => {
  const arabic = new Map(strings(ar.translation));
  const problems = strings(en.translation)
    .filter(([path, text]) => arabic.has(path) && placeholders(text).join() !== placeholders(arabic.get(path)).join())
    .map(([path]) => path);
  assert.deepEqual(problems, []);
});

// Placeholders are either facts (filled by i18next's defaultVariables) or one
// of the few values a call site passes. Anything else, such as a typo like
// {{project}}, would render literally; add a new call-site name here.
const CALL_SITE_VARIABLES = new Set(['count', 'date', 'n', 'name', 'platform', 'email']);
test('every placeholder is a fact from src/lib/facts.js or a known call-site value', () => {
  const unknown = [...strings(en.translation), ...strings(ar.translation)].flatMap(([path, text]) =>
    [...text.matchAll(/\{\{\s*(\w+)\s*\}\}/g)]
      .map(([, name]) => name)
      .filter((name) => !(name in FACT_VARIABLES) && !CALL_SITE_VARIABLES.has(name))
      .map((name) => `${path}: {{${name}}}`),
  );
  assert.deepEqual(unknown, []);
});

// The owner chose Western digits in Arabic, not Arabic-Indic ones. Arabic-Indic digits
// and the Arabic percent sign crept back in more than once while copy was
// typed by hand, so the bundle is checked for them.
test('Arabic copy uses Western digits and %', () => {
  const offending = strings(ar.translation)
    .filter(([, text]) => /[\u0660-\u0669\u06F0-\u06F9\u066A]/.test(text))
    .map(([path]) => path);
  assert.deepEqual(offending, []);
});
