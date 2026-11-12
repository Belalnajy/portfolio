/**
 * The one project registry. Every project fact that is not prose lives here:
 * the case-study routes, share images, sitemap, llms.txt, the command palette
 * and the project cards (src/components/Projects.jsx) all read it, so a
 * stack, a live URL or a cover is typed once. The narrative (both languages)
 * lives in `src/content/case-studies/<slug>.js` and is loaded per page; card
 * wording lives in the locale bundles under `projects.items.<slug>`.
 *
 * Per project: `name`, `image` (cover), `stack`, `industry` (the archive
 * filter on /work; one of INDUSTRIES below), `updated`, and when they apply
 * `liveUrl`, `appStoreUrl`, `github`, `featured`, `gallery`, `mockups` and
 * `kind`. Leave a link out when there is none; nothing uses a '#' placeholder.
 *
 * `industry` is what the project is for, judged from its case study, not
 * what it was built with: a client looking for "my kind of work" filters by
 * sector, and the stack is still searchable. The filter used to be by stack
 * (Full Stack / Frontend / Backend / Mobile), which told a client nothing and
 * left two of its five buttons with one project each.
 *
 * `mockups` lists the project's pictures (cover or gallery) that are composed
 * mockups or illustrations rather than one screen of a browser. They are
 * framed without the browser bar (DeviceFrame), which would otherwise put a
 * fake address bar over a picture of phones.
 *
 * `kind` labels work that was not a plain client engagement, wherever it is
 * shown. 'iti' (an ITI training project), 'event' (built at the Cursor
 * Alexandria event; the label names it, so give a different event its own
 * kind) and 'learning' (built while learning the stack) are not client work
 * and are left out of the headline project count. 'venture' (a product he
 * co-founded) is labelled but still counted: the owner counts it as both.
 * No `kind` means client work. The labels are `projects.kinds.<kind>` in both
 * locale files.
 *
 * `gallery` lists extra screens captured from the live product: `-dN` are
 * desktop views further down the page, `-m` is the phone view.
 */
export const CASE_STUDIES = {
  oxgym: {
    name: 'OX GYM',
    image: '/covers/oxgym.webp',
    liveUrl: 'https://oxgym-eg.com/',
    stack: ['JavaScript', 'Node.js', 'PostgreSQL', 'Vercel Serverless', 'PWA', 'Web Push', 'Service Worker', 'SEO'],
    industry: 'systems',
    mockups: ['/covers/oxgym.webp'],
    featured: true,
    updated: '2026-11-11',
    gallery: ['/gallery/oxgym-d1.webp', '/gallery/oxgym-d2.webp', '/gallery/oxgym-b-d3.webp', '/gallery/oxgym-d4.webp', '/gallery/oxgym-m.webp'],
  },
  opptmakers: {
    name: 'Opportunities Makers',
    image: '/covers/opptmakers.webp',
    liveUrl: 'https://opptmakers.cloud/login',
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'React', 'Tailwind', 'Docker'],
    industry: 'systems',
    mockups: ['/covers/opptmakers.webp'],
    featured: true,
    updated: '2026-11-11',
    gallery: ['/gallery/opptmakers-d1.webp', '/gallery/opptmakers-d2.webp', '/gallery/opptmakers-d3.webp', '/gallery/opptmakers-d4.webp', '/gallery/opptmakers-m.webp'],
  },
  'opptmakers-platforms': {
    name: 'Opportunities Makers Platforms',
    image: '/covers/opptmakers-platforms.webp',
    liveUrl: 'https://platforms.opptmakers.cloud/login',
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'React', 'Tailwind', 'Docker'],
    industry: 'systems',
    mockups: ['/covers/opptmakers-platforms.webp'],
    featured: true,
    updated: '2026-11-11',
    gallery: ['/gallery/opptmakers-platforms-d1.webp', '/gallery/opptmakers-platforms-d2.webp', '/gallery/opptmakers-platforms-d3.webp', '/gallery/opptmakers-platforms-d4.webp', '/gallery/opptmakers-platforms-m.webp'],
  },
  bilqalam: {
    name: 'Bilqalam Institute',
    image: '/covers/bilqalam.webp',
    liveUrl: 'https://bilqalaminstitute.net/',
    stack: ['Next.js', 'React', 'Laravel', 'PHP', 'Tailwind'],
    industry: 'education',
    featured: true,
    updated: '2026-08-30',
    gallery: ['/gallery/bilqalam-b-d1.webp', '/gallery/bilqalam-b-d2.webp', '/gallery/bilqalam-b-d3.webp', '/gallery/bilqalam-b-m.webp'],
  },
  indstrz: {
    name: 'Indstrz',
    kind: 'venture',
    image: '/covers/indstrz.webp',
    liveUrl: 'https://indstrz.com/en',
    stack: ['Next.js', 'React', 'Flask', 'PostgreSQL', 'Socket.io', 'SQLAlchemy', 'Cloudinary'],
    industry: 'commerce',
    featured: true,
    updated: '2026-08-30',
    gallery: ['/gallery/indstrz-b-d1.webp', '/gallery/indstrz-b-d2.webp', '/gallery/indstrz-b-d3.webp', '/gallery/indstrz-b-m.webp'],
  },
  uduipa: {
    name: 'UDUIPA',
    image: '/covers/uduipa.webp',
    stack: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Turborepo', 'Cloudinary', 'Puppeteer', 'Recharts'],
    industry: 'systems',
    featured: true,
    updated: '2026-08-30',
  },
  profleet: {
    name: 'Pro Fleet',
    image: '/covers/profleet.webp',
    liveUrl: 'https://pro-fleet.vercel.app/',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io', 'PostgreSQL', 'Leaflet'],
    industry: 'systems',
    featured: true,
    updated: '2026-08-30',
    gallery: ['/gallery/profleet-b-d1.webp', '/gallery/profleet-b-d2.webp', '/gallery/profleet-b-m.webp'],
  },
  medicta: {
    name: 'Medicta',
    image: '/covers/medicta.webp',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.medicta',
    appStoreUrl: 'https://apps.apple.com/app/id6743770555',
    stack: ['React Native', 'Android', 'iOS', 'React Query', 'Redux', 'Firebase', 'Codemagic', 'Google Play', 'App Store', 'i18next', 'App Store Connect API'],
    industry: 'healthcare',
    mockups: ['/covers/medicta.webp', '/gallery/medicta-d1.webp', '/gallery/medicta-d2.webp', '/gallery/medicta-d3.webp', '/gallery/medicta-d4.webp'],
    featured: true,
    updated: '2026-11-11',
    gallery: ['/gallery/medicta-d1.webp', '/gallery/medicta-d2.webp', '/gallery/medicta-d3.webp', '/gallery/medicta-d4.webp', '/gallery/medicta-m.webp'],
  },
  toyo228: {
    name: 'Toyo228',
    image: '/covers/toyo228.webp',
    liveUrl: 'https://toyo228.com/en',
    stack: ['Next.js', 'NestJS', 'TypeORM', 'PostgreSQL', 'TypeScript', 'Turborepo', 'Multer', 'Excel Processing'],
    industry: 'commerce',
    featured: true,
    updated: '2026-08-31',
    gallery: ['/gallery/toyo228-d1.webp', '/gallery/toyo228-d2.webp', '/gallery/toyo228-m.webp'],
  },
  injaz: {
    name: 'Injaz',
    image: '/covers/injaz.webp',
    liveUrl: 'https://lms-injaz.com/',
    stack: ['Django', 'PostgreSQL', 'Python', 'Celery', 'Redis', 'MyFatoorah', 'NELC', 'SCFHS'],
    industry: 'education',
    featured: true,
    updated: '2026-08-31',
    gallery: ['/gallery/injaz-d1.webp', '/gallery/injaz-b-d3.webp', '/gallery/injaz-m.webp'],
  },
  hcholding: {
    name: 'HC Holding',
    image: '/covers/hcholding.webp',
    liveUrl: 'https://lms-hcholding.org/',
    stack: ['Django', 'PostgreSQL', 'Python', 'Celery', 'Redis', 'MyFatoorah', 'NELC', 'SCFHS'],
    industry: 'education',
    updated: '2026-08-31',
    gallery: ['/gallery/hcholding-d1.webp', '/gallery/hcholding-b-d3.webp', '/gallery/hcholding-m.webp'],
  },
  mada: {
    name: 'Mada Education',
    image: '/covers/mada.webp',
    liveUrl: 'https://mada-education.com/',
    stack: ['Django', 'PostgreSQL', 'Python', 'Celery', 'Redis', 'MyFatoorah', 'Tailwind'],
    industry: 'education',
    updated: '2026-08-31',
    gallery: ['/gallery/mada-d1.webp', '/gallery/mada-d2.webp', '/gallery/mada-m.webp'],
  },
  mutlq: {
    name: 'Mutlq',
    image: '/covers/mutlq.webp',
    liveUrl: 'https://mutlq.org/',
    stack: ['Django', 'PostgreSQL', 'Tailwind', 'JavaScript'],
    industry: 'company',
    updated: '2026-08-31',
    gallery: ['/gallery/mutlq-d1.webp', '/gallery/mutlq-d2.webp', '/gallery/mutlq-d3.webp', '/gallery/mutlq-m.webp'],
  },
  motors: {
    name: 'Motors',
    image: '/covers/motors.webp',
    stack: ['Next.js', 'NestJS', 'TypeORM', 'PostgreSQL', 'TypeScript', 'Multer'],
    industry: 'commerce',
    featured: true,
    updated: '2026-08-31',
  },
  waferlee: {
    name: 'Waferlee',
    image: '/covers/waferlee.webp',
    liveUrl: 'https://waferlee.ae',
    stack: ['Next.js', 'NestJS', 'TypeORM', 'PostgreSQL', 'Tailwind', 'Radix UI', 'Framer Motion'],
    industry: 'commerce',
    updated: '2026-08-31',
    gallery: ['/gallery/waferlee-d1.webp', '/gallery/waferlee-d2.webp', '/gallery/waferlee-b-m.webp'],
  },
  baserah: {
    name: 'Baserah AI',
    image: '/covers/baserah.webp',
    liveUrl: 'https://baserah.ai/',
    stack: ['FastAPI', 'Python', 'MongoDB', 'AI', 'Gemini'],
    industry: 'systems',
    updated: '2026-08-31',
    gallery: ['/gallery/baserah-d1.webp', '/gallery/baserah-d2.webp', '/gallery/baserah-d3.webp', '/gallery/baserah-m.webp'],
  },
  sf_portal: {
    name: 'S&F Digital Portfolio',
    image: '/covers/sf_portal.webp',
    liveUrl: 'https://smart-fast.com/',
    stack: ['React', 'TypeScript', 'Vite', 'Radix UI', 'Tailwind', 'Django', 'Recharts'],
    industry: 'company',
    updated: '2026-08-31',
    gallery: ['/gallery/sf_portal-d1.webp', '/gallery/sf_portal-d2.webp', '/gallery/sf_portal-d3.webp', '/gallery/sf_portal-m.webp'],
  },
  journal: {
    name: 'Scientific Journal System',
    image: '/covers/journal.webp',
    liveUrl: 'https://upafa-edu.net/',
    stack: ['React', 'NestJS', 'TypeORM', 'PostgreSQL', 'TypeScript', 'Nx Monorepo'],
    industry: 'education',
    updated: '2026-08-31',
    gallery: ['/gallery/journal-d1.webp', '/gallery/journal-d2.webp', '/gallery/journal-d3.webp', '/gallery/journal-m.webp'],
  },
  clinic: {
    name: 'Clinic Management System',
    image: '/covers/clinic.webp',
    liveUrl: 'https://clinic-project-2.vercel.app/',
    stack: ['React', 'Django', 'PostgreSQL', 'Tailwind', 'AI'],
    kind: 'iti',
    industry: 'healthcare',
    updated: '2026-08-31',
  },
  manqla: {
    name: 'Manqla',
    image: '/covers/manqla.webp',
    liveUrl: 'https://www.manqla.com/',
    stack: ['React', 'Tailwind', 'TypeScript'],
    industry: 'company',
    updated: '2026-08-31',
    gallery: ['/gallery/manqla-d1.webp', '/gallery/manqla-d2.webp', '/gallery/manqla-d3.webp', '/gallery/manqla-m.webp'],
  },
  orca: {
    name: 'Orca',
    image: '/covers/orca.webp',
    liveUrl: 'https://orcastore.vercel.app/',
    stack: ['Next.js', 'Tailwind', 'Node.js', 'Express.js', 'MongoDB'],
    industry: 'commerce',
    updated: '2026-08-31',
  },
  amarna: {
    name: 'Amarna Travel',
    image: '/covers/amarna.webp',
    liveUrl: 'https://amarnatravel.com/',
    stack: ['CMS', 'RTL', 'Customization'],
    industry: 'company',
    updated: '2026-08-31',
    gallery: ['/gallery/amarna-d1.webp', '/gallery/amarna-d2.webp', '/gallery/amarna-d3.webp', '/gallery/amarna-m.webp'],
  },
  sonomedix: {
    name: 'Sonomedix News',
    image: '/covers/sonomedix.webp',
    liveUrl: 'https://sonomedix.cloud/',
    stack: ['React', 'Tailwind', 'Node.js', 'Express.js', 'MongoDB'],
    industry: 'healthcare',
    updated: '2026-08-31',
    gallery: ['/gallery/sonomedix-d1.webp', '/gallery/sonomedix-d2.webp', '/gallery/sonomedix-d3.webp', '/gallery/sonomedix-m.webp'],
  },
  nextstop: {
    name: 'NextStop Visa',
    image: '/covers/nextstop.webp',
    liveUrl: 'https://next-stop-project-nine.vercel.app/',
    stack: ['Next.js', 'Tailwind', 'Vercel', 'React'],
    industry: 'company',
    updated: '2026-08-31',
    gallery: ['/gallery/nextstop-d1.webp', '/gallery/nextstop-d2.webp', '/gallery/nextstop-d3.webp', '/gallery/nextstop-m.webp'],
  },
  kmbc: {
    name: 'KMBC',
    image: '/covers/kmbc.webp',
    liveUrl: 'https://www.kmbc-kw.com/',
    stack: ['Next.js', 'Tailwind', 'Framer Motion', 'React'],
    industry: 'company',
    updated: '2026-08-31',
    gallery: ['/gallery/kmbc-d1.webp', '/gallery/kmbc-d2.webp', '/gallery/kmbc-d3.webp', '/gallery/kmbc-m.webp'],
  },
  rabzan: {
    name: 'Rabzan Trading',
    image: '/covers/rabzan.webp',
    liveUrl: 'https://www.rabzan.com/',
    stack: ['React', 'Tailwind', 'JavaScript'],
    industry: 'company',
    updated: '2026-08-31',
    gallery: ['/gallery/rabzan-d1.webp', '/gallery/rabzan-d2.webp', '/gallery/rabzan-d3.webp', '/gallery/rabzan-m.webp'],
  },
  sems: {
    name: 'Tahsili Platform',
    image: '/covers/sems.webp',
    liveUrl: 'https://sems-project.vercel.app/',
    stack: ['Next.js', 'Tailwind', 'React', 'TypeScript'],
    industry: 'education',
    updated: '2026-08-31',
    gallery: ['/gallery/sems-d1.webp', '/gallery/sems-d2.webp', '/gallery/sems-m.webp'],
  },
  quotemate: {
    name: 'QuoteMate',
    image: '/covers/quotemate.webp',
    liveUrl: 'https://quote-mateapp.vercel.app/',
    stack: ['Next.js', 'Tailwind', 'AI', 'OpenAI', 'React'],
    kind: 'event',
    industry: 'systems',
    updated: '2026-08-31',
  },
  dmagni: {
    name: 'Dmagni',
    image: '/covers/dmagni.webp',
    liveUrl: 'https://dmagni-project.vercel.app/',
    stack: ['Next.js', 'Tailwind', 'AI', 'React'],
    industry: 'commerce',
    updated: '2026-08-31',
    gallery: ['/gallery/dmagni-d1.webp', '/gallery/dmagni-d2.webp', '/gallery/dmagni-m.webp'],
  },
  cme: {
    name: 'Itimad Tibbi',
    image: '/covers/cme.webp',
    liveUrl: 'https://cmehours.online/',
    stack: ['Next.js', 'Tailwind', 'React', 'PostgreSQL'],
    industry: 'education',
    updated: '2026-08-31',
    gallery: ['/gallery/cme-d1.webp', '/gallery/cme-d2.webp', '/gallery/cme-d3.webp', '/gallery/cme-m.webp'],
  },
  dpms: {
    name: 'DiaMonitor',
    image: '/covers/dpms.webp',
    liveUrl: 'https://dpms-rust.vercel.app/',
    stack: ['Next.js', 'Tailwind', 'React', 'PostgreSQL'],
    industry: 'healthcare',
    updated: '2026-08-31',
    gallery: ['/gallery/dpms-d1.webp', '/gallery/dpms-m.webp'],
  },
  alva_ai: {
    name: 'Alva AI (PULSE)',
    image: '/covers/alva_ai.webp',
    stack: ['React', 'Node.js', 'Express.js', 'Knex.js', 'OpenAI', 'Tailwind', 'Vite'],
    industry: 'systems',
    updated: '2026-08-31',
  },
  inventory: {
    name: 'Inventory System',
    image: '/covers/inventory.webp',
    stack: ['Django', 'PostgreSQL', 'Bootstrap', 'JavaScript'],
    kind: 'iti',
    industry: 'systems',
    github: 'https://github.com/ChaoticMaximoff/Inventory-Management-System-ITI-Django-Project',
    updated: '2026-08-31',
  },
  cinemascore: {
    name: 'CinemaScore',
    image: '/covers/cinemascore.webp',
    liveUrl: 'https://movies-app-react-project-mocha.vercel.app/',
    stack: ['React', 'Bootstrap', 'TMDB API'],
    kind: 'iti',
    industry: 'media',
    github: 'https://github.com/HamsEldakrory/Movies-App-react-project',
    updated: '2026-08-31',
  },
  movieweb: {
    name: 'Movie Web App',
    image: '/covers/movieweb.webp',
    liveUrl: 'https://movieswebsiteproject.vercel.app/',
    stack: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Tailwind'],
    kind: 'learning',
    industry: 'media',
    updated: '2026-08-31',
  },
  hms_odoo: {
    name: 'Hospital Management',
    image: '/covers/hms_odoo.webp',
    stack: ['Odoo', 'Python', 'PostgreSQL'],
    kind: 'iti',
    industry: 'healthcare',
    mockups: ['/covers/hms_odoo.webp'],
    updated: '2026-08-31',
  },
  bookstore: {
    name: 'Bookstore Web App',
    image: '/covers/bookstore.webp',
    liveUrl: 'https://bookstoredeploytest.vercel.app/',
    stack: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap'],
    kind: 'iti',
    industry: 'commerce',
    github: 'https://github.com/Sara-Elagder/Front-end-ITI',
    updated: '2026-08-31',
  },
  library: {
    name: 'Library Management',
    image: '/covers/library.webp',
    stack: ['Django', 'PostgreSQL', 'Python'],
    kind: 'learning',
    industry: 'systems',
    github: 'https://github.com/Belalnajy/LMSProject',
    updated: '2026-08-31',
  },
};

export const CASE_STUDY_SLUGS = Object.keys(CASE_STUDIES);

/**
 * The /work filter, in display order. Labels are `projects.industries.<id>`
 * in both locale files; `media` holds two training projects that fit no
 * client sector, so every project has a home.
 */
export const INDUSTRIES = ['education', 'healthcare', 'commerce', 'systems', 'company', 'media'];

/** What a `kind` means; every value used above must be listed here. */
export const PROJECT_KINDS = ['iti', 'event', 'learning', 'venture'];

/** Kinds that are labelled but still counted as client work (and may be featured). */
export const COUNTED_KINDS = ['venture'];

/**
 * What the headline "N projects for M clients" counts: client work, plus the
 * labelled kinds the owner counts (COUNTED_KINDS).
 */
export const CLIENT_PROJECT_SLUGS = CASE_STUDY_SLUGS.filter((slug) => {
  const { kind } = CASE_STUDIES[slug];
  return !kind || COUNTED_KINDS.includes(kind);
});
