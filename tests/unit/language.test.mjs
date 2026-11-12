// The URL decides the language; the switch navigates to the twin route.
import test from 'node:test';
import assert from 'node:assert/strict';
import { languageOfPath, twinPath } from '../../src/lib/language.js';
import { arabicPath } from '../../src/lib/metadata.js';

test('languageOfPath reads the /ar prefix and nothing that merely starts with it', () => {
  assert.equal(languageOfPath('/'), 'en');
  assert.equal(languageOfPath('/work'), 'en');
  assert.equal(languageOfPath('/ar'), 'ar');
  assert.equal(languageOfPath('/ar/case-study/oxgym'), 'ar');
  assert.equal(languageOfPath('/archive'), 'en');
  assert.equal(languageOfPath('/articles/x'), 'en');
});

test('twinPath maps a page to itself in the other language, both ways', () => {
  const pairs = [
    ['/', '/ar'],
    ['/work', '/ar/work'],
    ['/case-study/oxgym', '/ar/case-study/oxgym'],
    ['/blog/legacy-takeover-playbook', '/ar/blog/legacy-takeover-playbook'],
  ];
  for (const [english, arabic] of pairs) {
    assert.equal(twinPath(english, 'ar'), arabic);
    assert.equal(twinPath(arabic, 'en'), english);
    // Asking for the language a path is already in is a no-op.
    assert.equal(twinPath(english, 'en'), english);
    assert.equal(twinPath(arabic, 'ar'), arabic);
    assert.equal(arabicPath(english), arabic);
  }
  assert.equal(twinPath('/archive', 'ar'), '/ar/archive');
});
