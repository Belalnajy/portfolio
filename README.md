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
| `npm run links` | Checks every live site, store page and GitHub link in the registry (see below) |
| `node scripts/capture-covers.mjs` | Screenshots project covers from the live sites (see below) |
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
│   ├── <route>/opengraph-image.jsx   # Share cards: English ones outside the route group,
│   │                                 # Arabic ones under ar/; case-study cards in both languages
│   └── robots.js, sitemap.js, llms.txt, llms-full.txt, feed.xml, og.png
├── components/          # Sections and page shells (components/pages)
├── content/             # Case-study narratives, blog articles, FAQ
├── lib/                 # Registries and helpers
│   ├── case-studies.js  # The one project registry (stack, links, cover, industry)
│   ├── blog.js          # Article registry
│   ├── facts.js         # Headline numbers ({{projects}}, {{clients}} …)
│   ├── metadata.js      # pageMetadata(): canonical, hreflang, Open Graph, Twitter
│   └── language.js      # Language routing: the URL decides the language
├── locales/             # en.js and ar.js translation bundles
└── i18n.js
public/                  # covers/, gallery/, logos/, CV PDF, service worker (sw.js)
scripts/                 # Lighthouse, contrast report, CV and cover generators, IndexNow
tests/                   # node --test checks
```

Things worth knowing before changing anything:

- **Languages.** The URL decides the language: `/ar/*` is Arabic, everything else English. The language switch is a navigation to the same page in the other language (`src/lib/language.js`). Every English page has a twin under `src/app/ar`.
- **Adding a project.** Add an entry to `src/lib/case-studies.js`, a narrative module in `src/content/case-studies/<slug>.js`, card wording under `projects.items.<slug>` in both locale files, and the cover in `public/covers/` (1920x1000 WebP, then `npm run cover-meta`). `npm test` checks that these agree. Registry fields beyond name, cover, stack and links:
  - `industry`: the /work filter, one of `INDUSTRIES` in the same file (education, healthcare, commerce, systems, company, media). Judge it from what the project is for, not what it was built with.
  - `gallery`: extra screens in `public/gallery/`: `<slug>-dN.webp` desktop views (1440x900) and `<slug>-m.webp` the phone view (780x1688).
  - `mockups`: the pictures (cover or gallery) that are composed mockups or illustrations rather than one browser screen. They are framed without the browser bar, and on phones a mockup board in the gallery scrolls sideways instead of shrinking.
  - `kind`: labels work that is not a plain client engagement (`iti`, `event`, `learning`, `venture`).
- **Covers.** `scripts/capture-covers.mjs` screenshots the top of each live site at 1920x1000. It needs a Chrome or Chromium binary: set `CHROME_PATH` or have `chromium` / `google-chrome` on PATH. `--out <dir>` writes the captures somewhere else to review first; `--write` puts them in `public/covers/` (the script header lists every flag). Look at each capture before committing it, then run `npm run cover-meta`.
- **Share cards.** Case-study cards (`src/lib/og-case-study.jsx`) show the project's cover in the site's browser frame, rendered at build time in both languages. Satori cannot lay out Arabic, so the Arabic text block is set by sharp (Pango) in Cairo Bold, `src/assets/og/Cairo-Bold.ttf`, under the SIL Open Font License (`src/assets/og/OFL.txt`). sharp is a direct dependency for this.
- **Live links.** `npm run links` (`scripts/check-live-links.mjs`) checks each project's `liveUrl`, store links and `github`: dead links fail, bot blocks, host changes and GitHub rate limits only warn, and a malformed URL is reported as a failed row. `.github/workflows/live-links.yml` runs it every Monday and GitHub emails the owner when it fails. GitHub disables scheduled workflows in a repository with no activity for 60 days; re-enable it from the Actions tab if the weekly run stops.
- **Page metadata.** Use `pageMetadata()` from `src/lib/metadata.js` in every layout; Next replaces nested metadata objects rather than merging them, so hand-written blocks lose tags.
- **Replacing an image.** Files in `public/` keep their names, so browsers and the image optimiser cache them: a cover, gallery screen or logo overwritten under the same name can take up to a day to reach returning visitors (`images.minimumCacheTTL` and the `Cache-Control` headers in `next.config.js`). Rename the file to make the change immediate.
- **Service worker.** `public/sw.js` is hand-written; bump its `VERSION` when the caching logic changes.

## Contact

- GitHub: [@Belalnajy](https://github.com/Belalnajy)
- LinkedIn: [Belal Nagy](https://linkedin.com/in/belalnajy)
- Email: belalnajy9@gmail.com
