/**
 * Registry for the technical articles. Card-level facts for both languages
 * live here (small enough to import anywhere); the article bodies live in
 * `src/content/blog/<slug>.js` and are loaded per page, exactly like the
 * case-study narratives. Routes, sitemap and llms.txt all read from here.
 */
export const BLOG_POSTS = {
  'one-engine-three-platforms': {
    date: '2026-09-01',
    minutes: 9,
    tags: ['Django', 'PostgreSQL', 'Architecture', 'LMS'],
    en: {
      title: 'One Django Engine, Three Accredited Platforms',
      description:
        'How I run Injaz, HC Holding and Mada Education — three separately branded, separately accredited learning platforms — on a single hardened Django and PostgreSQL core, and what that architecture costs and buys.',
    },
    ar: {
      title: 'محرّك Django واحد… ثلاث منصات معتمدة',
      description:
        'كيف أُشغّل إنجاز وHC Holding ومدى للتعليم — ثلاث منصات تعليمية بهويات واعتمادات منفصلة — على نواة واحدة من Django وPostgreSQL، وما الذي تكلّفه هذه البنية وما الذي توفّره.',
    },
  },
  'legacy-takeover-playbook': {
    date: '2026-09-01',
    minutes: 8,
    tags: ['Legacy Code', 'React Native', 'Refactoring'],
    en: {
      title: 'Taking Over a Legacy Codebase Without Rewriting It',
      description:
        'The playbook I used to take over Medicta — a live React Native app on Google Play with real users and real bugs — stabilize it, redesign its UI and ship updates, without the rewrite everyone reaches for first.',
    },
    ar: {
      title: 'استلام مشروع قديم بدون إعادة كتابته من الصفر',
      description:
        'الخطة التي استخدمتها لاستلام Medicta — تطبيق React Native حي على Google Play بمستخدمين حقيقيين وأخطاء حقيقية — وتثبيته وإعادة تصميم واجهته وإطلاق التحديثات، بدون "إعادة الكتابة من الصفر" التي يبدأ بها الجميع.',
    },
  },
  'rtl-beyond-the-landing-page': {
    date: '2026-09-01',
    minutes: 8,
    tags: ['RTL', 'Arabic', 'i18n', 'Frontend'],
    en: {
      title: 'Arabic RTL That Survives Dashboards and Invoices',
      description:
        'Flipping a landing page to RTL is easy. Keeping Arabic correct through data tables, financial documents, charts and mixed-direction text is engineering — here is what shipping RTL in every one of my projects has taught me.',
    },
    ar: {
      title: 'واجهات عربية RTL تصمد أمام لوحات التحكم والفواتير',
      description:
        'قلب صفحة هبوط إلى RTL أمرٌ سهل. أما بقاء العربية صحيحة عبر جداول البيانات والمستندات المالية والرسوم البيانية والنصوص مختلطة الاتجاه فهو هندسة — هذا ما علّمني إياه شحن RTL في كل مشروع عملت عليه.',
    },
  },
};

export const BLOG_SLUGS = Object.keys(BLOG_POSTS);

/**
 * Loads one article's full bilingual body. Server-side only in practice
 * (pages resolve it before render), so article prose never rides in the
 * client bundle of the listing.
 */
export const loadPost = async (slug) =>
  (await import(`../content/blog/${slug}.js`)).default;
