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

## Reactions and comments

Case studies and articles carry a reaction bar (👍 ❤️ 🔥 👏 💡) and comments, and so does each course on `/teaching` whenever that page is public (`TEACHING_PUBLIC` in `src/lib/teaching.js`; while it is hidden, its threads are not accepted). No login: a comment needs a name, waits for the owner's approval, and he gets an email for each one with approve and delete links. Pages stay static; the block loads from `/api/engage` when it nears the viewport. The project lists (home rows, /work rows and cards, the project sheet) carry a small reaction strip and a comments count from `/api/engage/summary`, fetched once per page when the projects near the viewport (on the home page only after a scroll). Code: `src/lib/engage/` (storage, validation, signing, email) and `src/components/engage/`.

**Without configuration the feature is off.** A production build with no storage or no `COMMENTS_SECRET` renders nothing where the block would be, and the API answers 503. `next dev` and `npm test` use an in-memory store instead, so they work with no setup.

| Variable | What it is |
| --- | --- |
| `DATABASE_URL` (or `POSTGRES_URL`) | The Neon Postgres database, set by the Vercel Neon integration. The tables (`engage_reactions`, `engage_comments`, `engage_limits`, `engage_voters`) are created on first use: there is no migration to run |
| `COMMENTS_SECRET` | The password of `/admin/comments`. Separate keys are derived from it (HKDF) to sign the email links, the admin cookie and the form timing token, and to key the IP and visitor hashes. At least 16 characters; use 32+. Required wherever a database is configured: the development fallback is never used next to real data |
| `RESEND_API_KEY` | Sends the notification email. Without it, comments are still stored and wait on `/admin/comments` |
| `OWNER_EMAIL` | Where the notification goes (default belalnajy9@gmail.com). Server-only, never in the browser bundle |

Setup, once:

1. **Storage.** In Vercel: the project → Storage → Create Database → **Neon** (Serverless Postgres) → the free plan, and connect it to the portfolio project for all environments. It adds `DATABASE_URL` and `POSTGRES_URL` (and a few more the code does not read). Postgres keeps the data on disk; the free Upstash plan used before kept it in memory only. Once the site runs on Neon, the old Upstash integration can be removed from the project.
2. **Secret.** Generate one, e.g. `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`, and add it as `COMMENTS_SECRET` (Settings → Environment Variables, Production). Keep it in a password manager: it is the admin password. Changing it invalidates every email link and signs you out.
3. **Email.** Create a free account at resend.com with the owner's address, then API Keys → Create (sending access). Add it as `RESEND_API_KEY`. Mail is sent from `onboarding@resend.dev`, which Resend allows only to the account's own address, so `OWNER_EMAIL` must be that address (or verify a domain in Resend and change the sender in `src/lib/engage/http.js`).
4. Redeploy. Moderate from the email links (each opens a confirmation page with one button, so mail scanners that follow links cannot approve anything) or at `/admin/comments`.

Optional hardening, both in dashboards rather than code:

- **Vercel Firewall:** a rate-limit rule on `/api/` (for example 60 requests a minute per IP, action "deny" or "challenge") stops a flood at the edge, before it costs a function call or a database query.
- **Neon compute cap:** in the Neon console, set the database's autoscaling maximum to 0.25 CU. The free plan's monthly compute hours then last however hard the endpoints are hit, and the worst case is a slower reply, not a surprise.

Spam and abuse: a hidden honeypot field; a signed timing token the form fetches when someone starts writing (a comment sent under 3 seconds after it, or without one, is dropped); per connection (a keyed hash of the IP, the /64 for IPv6; raw IPs are never stored) 10 comments, 60 reactions and 10 admin sign-ins an hour, and at most 10 new reaction voters per thread a day; at most 500 comments waiting and 20 notification emails an hour site-wide (past that, comments are still stored without an email); 1 KB request bodies; at most two links per comment. Comments are shown as plain text only. Reactions are keyed on an anonymous id the browser creates on its first reaction, so changing networks does not count twice.

Cost: the thread and summary endpoints (`GET /api/engage`, `GET /api/engage/summary`) are the same for every visitor and cached by Vercel's CDN for 30 seconds (served stale for up to 5 minutes while it refreshes; set with `CDN-Cache-Control`, so browsers still ask every time), so page views barely reach the database: one query for a thread, or for the whole summary, per 30 seconds whatever the traffic. Neon's free plan suspends the database when idle, so the first query after a pause can take 0.5–2 s; the CDN copy covers reads, and the page draws nothing broken in the meantime. If the database stops answering, every endpoint answers 503: the block does not show, and the reserved strip row on the project lists stays empty.

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
