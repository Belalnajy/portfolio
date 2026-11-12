import { Analytics } from '@vercel/analytics/next';
import { FACTS } from '../lib/facts';
import { SITE_URL, PERSON_ID, PERSON_REF, WEBSITE_ID, SAME_AS } from '../lib/site';
import { LANGUAGE_CHOICE_KEY } from '../lib/language';
import JsonLd from './JsonLd';

// Structured data so search engines can attach name, photo, role and profiles
// to the site. Person and WebSite are stable facts, safe to serve on every route.
const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Belal Nagy',
  // Both Arabic spellings of the surname (ي / ى) plus the transliteration his
  // freelance handles use, so every way people type the name maps to one entity.
  alternateName: ['بلال ناجي', 'بلال ناجى', 'Belal Najy'],
  url: SITE_URL,
  image: `${SITE_URL}/portrait.webp`,
  jobTitle: 'Software Engineer & Full-Stack Developer',
  description:
    `Full-stack developer in Alexandria, Egypt. Software Engineer at ezSec Inc (Canada, remote) and co-founder of Indstrz. ${FACTS.projects} projects for ${FACTS.clients} clients across Egypt and the Gulf: Next.js, Laravel, NestJS, Node.js, Django, PostgreSQL, with Arabic and RTL support in every project.`,
  worksFor: {
    '@type': 'Organization',
    name: 'ezSec Inc',
    url: 'https://web.ezsec.org/',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Alexandria University',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Alexandria',
    addressCountry: 'EG',
  },
  knowsLanguage: ['en', 'ar'],
  knowsAbout: [
    'Next.js',
    'React',
    'Laravel',
    'NestJS',
    'Node.js',
    'Django',
    'Flask',
    'PostgreSQL',
    'TypeScript',
    'Python',
    'Multi-tenant architecture',
    'Learning management systems',
    'Arabic RTL web development',
    'Legacy code takeover',
    'DevOps deployment',
  ],
  sameAs: SAME_AS,
};

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'Belal Nagy Portfolio',
  alternateName: ['Belal Nagy', 'بلال ناجي'],
  url: SITE_URL,
  inLanguage: ['en', 'ar'],
  author: PERSON_REF,
  publisher: PERSON_REF,
};

// Runs before first paint so a visitor who chose light mode never sees a dark
// flash. Dark is the default (no attribute); only light needs stamping.
const THEME_INIT = `try{if(localStorage.getItem('mode')==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}`;

// Scroll reveals (globals.css, Reveal.jsx) hide content only under `.js`, so
// with JavaScript off nothing waits for a script that will never run.
const JS_FLAG = `document.documentElement.classList.add('js')`;

// The URL decides the language: /ar/* is Arabic, everything else English, and
// nothing ever overrides an address somebody followed. The single exception is
// the bare home page, which is the one URL that cannot say "English on
// purpose": a visitor who pressed the language switch to Arabic earlier and
// arrives at `/` from outside (typed, bookmarked, an external link) is taken
// to /ar before first paint. Not when they come from another page of this
// site: clicking the logo or "Home" on an English page must stay English.
// Not offline either, where /ar may not be in the service worker's cache
// while this page evidently was. The browser language is never consulted.
const HOME_LANGUAGE_REDIRECT = `try{if(location.pathname==='/'&&navigator.onLine!==false&&document.referrer.indexOf(location.origin)!==0&&localStorage.getItem('${LANGUAGE_CHOICE_KEY}')==='ar')location.replace('/ar'+location.search+location.hash)}catch(e){}`;

// The 404 page is a single static document shared by every unknown URL, so its
// HTML is English; a miss under /ar becomes an Arabic, right-to-left document
// here, before anything paints.
const NOT_FOUND_LANGUAGE = `if(/^\\/ar(\\/|$)/.test(location.pathname)){document.documentElement.lang='ar';document.documentElement.dir='rtl'}`;

// The cross-document view transition (`@view-transition` in globals.css) is
// run by the browser, but its promises surface in the page: when the browser
// abandons a transition halfway (the viewport changes size during the fade,
// as a phone's address bar or a rotation does; the tab is hidden), `ready`
// rejects with "InvalidStateError: Transition was aborted", and with nobody
// listening that is reported as an uncaught error. Abandoning is fine (the
// new page simply shows without the fade), so the rejections are handled
// here. `pagereveal` fires before the new page's first paint, so the listener
// has to exist before then: this inline script is the only code that early.
const VIEW_TRANSITION_GUARD = `(function(){var n=function(){};function q(e){var t=e.viewTransition;if(t)[t.ready,t.finished,t.updateCallbackDone].forEach(function(p){if(p&&p.catch)p.catch(n)})}addEventListener('pagereveal',q);addEventListener('pageswap',q)})()`;

// The parts of a page whose rendering globals.css defers while it loads
// (`content-visibility: auto`; see "Rendering deferred" there, and keep the
// two lists in step). This script decides when that stops, and it lives
// here rather than in a component so it works from the first paint, before
// (and without) hydration:
// - Never for a visit that has to land somewhere: a URL with a #section, a
//   reload or a back/forward visit (the browser restores the old scroll
//   offset). Estimated heights above the target would put it elsewhere.
// - At once on the first input (key, wheel, touch, pointer: before a
//   same-page anchor, a lightbox or a fling acts on estimated layout), once
//   the page has scrolled more than a screen in all (a scrollbar drag,
//   find-in-page) and before printing.
// - Otherwise after the load event: one part per idle moment, top to bottom,
//   so no single task lays out the whole page, then for good.
// Every time, `keep` measures the block nearest the top of the viewport
// before and after and scrolls by the difference, so parts above the
// viewport taking their real height never move what is on screen (Chrome's
// scroll anchoring does not cover a change of `content-visibility`).
// `data-rendered` on <html> switches the rule off; on a part, just that part.
const DEFERRED_RENDER = [
  '.site-main:has(> #home) > :not(#home, #projects)',
  '.m-page-top:has(> #projects) > :not(#projects)',
  '#project-results > article:nth-child(n + 3)',
  '.site-main + footer',
].join(',');
// Blocks that can serve as the on-screen reference for `keep`.
const RENDER_ANCHORS = '.site-main > *, .m-page-top > *, #project-results > article, .site-main + footer';
const RENDER_CONTROL = `(function(){var d=document.documentElement,r='data-rendered',done=0,y=0;function anchor(){var c=document.querySelectorAll('${RENDER_ANCHORS}'),best=null,bt=1/0;for(var i=0;i<c.length;i++){var b=c[i].getBoundingClientRect();if(b.bottom>0&&b.top<innerHeight&&Math.abs(b.top)<bt){best=c[i];bt=Math.abs(b.top)}}return best}function keep(f){var a=scrollY>0?anchor():null,t=a&&a.getBoundingClientRect().top;f();if(a){var dy=a.getBoundingClientRect().top-t;if(dy>.5||dy<-.5)scrollBy({top:dy,behavior:'instant'})}y=scrollY}function all(){if(done)return;done=1;keep(function(){d.setAttribute(r,'')})}try{var n=performance.getEntriesByType('navigation')[0];if(location.hash||(n&&n.type!=='navigate')){done=1;d.setAttribute(r,'')}}catch(e){done=1;d.setAttribute(r,'')}var o={capture:true,passive:true};['keydown','wheel','touchstart','pointerdown'].forEach(function(t){addEventListener(t,all,o)});addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href*="#"]');if(a&&a.pathname===location.pathname)all()},true);addEventListener('hashchange',all);addEventListener('beforeprint',all);addEventListener('scroll',function(){if(!done&&Math.abs(scrollY-y)>innerHeight)all()},o);var idle=window.requestIdleCallback?function(f){requestIdleCallback(f,{timeout:500})}:function(f){setTimeout(f,50)};function step(){if(done)return;var p=null;try{p=document.querySelector(':is(${DEFERRED_RENDER}):not([data-rendered])')}catch(e){}if(!p)return all();keep(function(){p.setAttribute(r,'')});idle(step)}addEventListener('load',function(){idle(step)})})()`;

const INIT_SCRIPTS = {
  en: `${JS_FLAG};${THEME_INIT};${HOME_LANGUAGE_REDIRECT};${VIEW_TRANSITION_GUARD};${RENDER_CONTROL}`,
  ar: `${JS_FLAG};${THEME_INIT};${VIEW_TRANSITION_GUARD};${RENDER_CONTROL}`,
  'not-found': `${JS_FLAG};${THEME_INIT};${NOT_FOUND_LANGUAGE};${VIEW_TRANSITION_GUARD};${RENDER_CONTROL}`,
};

/**
 * The <html> document shared by the two root layouts. Each language tree has
 * its own root layout (src/app/(en)/layout.jsx and src/app/ar/layout.jsx) so
 * the server HTML already carries the right `lang` and `dir`; everything
 * else about the document is identical and lives here. `variant` picks the
 * pre-paint script; only the 404 page passes one that differs from `lang`.
 * `fontVariables` comes from the tree's own font module (src/lib/fonts-en.js
 * or fonts-ar.js), so each language preloads only the font files it needs.
 */
export default function RootDocument({ lang, variant = lang, fontVariables, children }) {
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        {/* First thing in the document: theme, and any language decision, are
            settled before the parser reaches a stylesheet or the body. */}
        <script dangerouslySetInnerHTML={{ __html: INIT_SCRIPTS[variant] }} />
      </head>
      <body className={`${fontVariables} antialiased`} suppressHydrationWarning>
        <JsonLd data={PERSON_JSON_LD} />
        <JsonLd data={WEBSITE_JSON_LD} />
        {children}
        {/* /_vercel/insights only exists on Vercel. Anywhere else (next start
            locally, CI) the script 404s and logs console errors, so it is only
            rendered for builds made there. */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
