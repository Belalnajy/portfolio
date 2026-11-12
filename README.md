# Belal Nagy's Portfolio

The source of [belalnagy.com](https://www.belalnagy.com): a bilingual (English / Arabic) portfolio with a project archive, long-form case studies, a blog, a CV page and a contact form.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, every page statically prerendered) and React 19, in JavaScript
- [Tailwind CSS 4](https://tailwindcss.com/) (configured in `src/app/globals.css`, no `tailwind.config.js`)
- [react-i18next](https://react.i18next.com/) for the two languages
- [Framer Motion](https://www.framer.com/motion/) for animation, [React Icons](https://react-icons.github.io/react-icons/)
- [EmailJS](https://www.emailjs.com/) for the contact form, [Vercel Analytics](https://vercel.com/analytics)
- Deployed on [Vercel](https://vercel.com/)

## Getting started

Node 22 (see `.nvmrc`).

```bash
npm ci
cp .env.example .env   # then fill in the EmailJS values
npm run dev            # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run lint` | ESLint (warnings fail) |
| `npm test` | Unit checks: locale parity, project registry, language routing |
| `npm run test:site` | Checks every sitemap URL against a running server (`BASE_URL`, default `http://127.0.0.1:3000`) |
| `npm run test:browser` | Headless-Chrome smoke test against a running server |
| `npm run lighthouse` | Lighthouse budget against a running server |
| `npm run cover-meta` | Regenerate `src/lib/cover-meta.js` after adding or replacing a cover |
| `node scripts/generate-cv.mjs` | Regenerate `public/Belal_Nagy_CV.pdf` from the site data |
| `node scripts/contrast-report.mjs` | WCAG contrast report for both themes |

## Environment variables

`NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` configure the contact form (set them in `.env` locally and in Vercel → Settings → Environment Variables). They are inlined at build time; a build without them works, but the form reports that it is unavailable. Setup guide: [docs/EMAILJS_SETUP.md](./docs/EMAILJS_SETUP.md).

## How the site is organised

```
src/
├── app/
│   ├── (en)/            # English pages, with their own root layout (<html lang="en">)
│   ├── ar/              # Arabic pages under /ar, with their own root layout (<html lang="ar" dir="rtl">)
│   ├── <route>/opengraph-image.jsx   # English share cards (kept outside the route group)
│   └── robots.js, sitemap.js, llms.txt, llms-full.txt, feed.xml, og.png
├── components/          # Sections and page shells (components/pages)
├── content/             # Case-study narratives, blog articles, FAQ
├── lib/                 # Registries and helpers
│   ├── case-studies.js  # The one project registry (stack, links, cover, category)
│   ├── blog.js          # Article registry
│   ├── facts.js         # Headline numbers ({{projects}}, {{clients}} …)
│   ├── metadata.js      # pageMetadata(): canonical, hreflang, Open Graph, Twitter
│   └── language.js      # Language routing: the URL decides the language
├── locales/             # en.js and ar.js translation bundles
└── i18n.js
public/                  # Covers, gallery, logos, CV PDF, service worker (sw.js)
scripts/                 # Lighthouse, contrast report, CV and cover generators, IndexNow
tests/                   # node --test checks
```

Things worth knowing before changing anything:

- **Languages.** The URL decides the language: `/ar/*` is Arabic, everything else English. The language switch is a navigation to the same page in the other language (`src/lib/language.js`). Every English page has a twin under `src/app/ar`.
- **Adding a project.** Add an entry to `src/lib/case-studies.js`, a narrative module in `src/content/case-studies/<slug>.js`, card wording under `projects.items.<slug>` in both locale files, and the cover in `public/` (then `npm run cover-meta`). `npm test` checks that these agree.
- **Page metadata.** Use `pageMetadata()` from `src/lib/metadata.js` in every layout; Next replaces nested metadata objects rather than merging them, so hand-written blocks lose tags.
- **Replacing an image.** Files in `public/` keep their names, so browsers and the image optimiser cache them: a cover, gallery screen or logo overwritten under the same name can take up to a day to reach returning visitors (`images.minimumCacheTTL` and the `Cache-Control` headers in `next.config.js`). Rename the file to make the change immediate.
- **Service worker.** `public/sw.js` is hand-written; bump its `VERSION` when the caching logic changes.

## Contact

- GitHub: [@Belalnajy](https://github.com/Belalnajy)
- LinkedIn: [Belal Nagy](https://linkedin.com/in/belalnajy)
- Email: belalnajy9@gmail.com
