// Article body, both languages. Loaded per page via src/lib/blog.js.
const post = {
  en: {
    title: 'One Django Engine, Three Accredited Platforms',
    intro: [
      'Injaz, HC Holding and Mada Education look like three unrelated products. Different domains, different colors, different logos, different course catalogs. Under the surface they are the same Django and PostgreSQL engine, deployed three times. This article is about how that engine is put together, and why I would make the same call again.',
      'The trap with client number two is copy-paste. The first LMS ships, a second client wants "the same thing but branded for us", and the fastest week of your life is the one where you fork the repo. Six months later every bug exists three times, every feature is implemented three times, and the forks have drifted so far apart that a security patch is an afternoon of careful diffing per client. I had seen that movie, so the suite was built engine-first from the start.',
    ],
    sections: [
      {
        heading: 'One codebase, three deployments',
        paragraphs: [
          'The engine is a single Django project. Each brand runs as its own deployment with its own PostgreSQL database, its own domain, its own media storage and its own environment configuration. Nothing is shared at runtime — no shared database with a tenant column, no cross-tenant queries to get wrong, no risk that one client\'s traffic spike or data mistake touches another client.',
          'Everything brand-specific is configuration, not code: the theme tokens, the logo set, the payment credentials, the accreditation identifiers, the email sender. A new deployment is an environment file and a theme entry, not a fork. When I fix a bug or harden an endpoint, every platform gets the fix on its next deploy — one patch, three products.',
        ],
      },
      {
        heading: 'Branding as data',
        paragraphs: [
          'The templates never mention a brand. They render CSS custom properties, logo slots and copy blocks that the deployment\'s theme configuration fills in. The discipline that matters day-to-day: any time a brand name or color is about to be typed into a template, it becomes a theme key instead. That rule is the entire multi-brand system; everything else is just enforcing it.',
          'It pays off in odd places. Certificates, invoices and notification emails are all generated documents, and all of them carry brand identity. Because branding is data, the same certificate renderer produces an Injaz certificate and a Mada certificate — and a third brand would cost nothing but assets.',
        ],
      },
      {
        heading: 'Accreditation is a module, not a feature',
        paragraphs: [
          'The hard requirements in this space are not CRUD — they are regulators. Saudi platforms integrate with NELC (the national e-learning center) and, for medical training, SCFHS accreditation flows: enrollment reporting, attendance evidence, completion records, certificate issuance in the shape the regulator expects.',
          'Those integrations live behind their own module boundary in the engine, keyed by configuration. A brand that needs SCFHS turns it on; a brand that does not never loads it. When a regulator changes a field or an endpoint — and they do — the change lands once, in one module, and every accredited platform stays compliant together. This is the part of the architecture that has paid for itself most directly.',
        ],
      },
      {
        heading: 'Payments, background work and the boring parts',
        paragraphs: [
          'Payments go through MyFatoorah with per-brand merchant credentials, so money flows to each client directly and refunds and reconciliation stay per-brand. Celery and Redis carry the background load: enrollment confirmations, certificate generation, regulator reporting jobs, scheduled reminders. Each deployment runs its own workers, which keeps a stuck queue on one platform from delaying another.',
          'Database migrations are the operational cost of the engine model: every schema change runs against three production databases. The routine is unglamorous and strict — backwards-compatible migrations, deploy engine first, migrate each brand in sequence, verify. The discipline costs minutes per release and has kept three production platforms on one schema without an incident.',
        ],
      },
      {
        heading: 'What it costs, honestly',
        paragraphs: [
          'The engine model is not free. Every feature request now has a second question attached: is this for one brand or for the engine? Per-brand feature flags exist and must be tested in both states. A change that would be a quick hack in a single-client codebase gets designed slightly more carefully, because it will run in three places. And the test surface is real: CI has to prove the engine against more than one configuration.',
          'What it buys is leverage. Three accredited platforms are maintained with the effort of roughly one and a half. A compliance change ships everywhere at once. And selling platform number four is a conversation about branding and content, not about months of build time.',
        ],
      },
    ],
    takeaway: {
      heading: 'The takeaway',
      paragraphs: [
        'If a second client ever asks for "the same thing, but ours": do not fork. Extract the engine while there are only two consumers of it, make branding configuration instead of code, and put regulator integrations behind module boundaries from day one. The engine mindset is a habit more than an architecture — and it is far cheaper to adopt at platform two than at platform three.',
      ],
    },
  },
  ar: {
    title: 'محرّك Django واحد… ثلاث منصات معتمدة',
    intro: [
      'إنجاز وHC Holding ومدى للتعليم تبدو ثلاث منتجات لا علاقة بينها: نطاقات مختلفة، ألوان مختلفة، شعارات مختلفة، وكتالوجات دورات مختلفة. لكن تحت السطح، هي المحرّك نفسه — Django وPostgreSQL — منشورًا ثلاث مرات. هذه المقالة عن كيفية بناء هذا المحرّك، ولماذا سأتخذ القرار نفسه لو عاد بي الزمن.',
      'الفخ يظهر مع العميل الثاني: أول منصة تُطلق، ثم يأتي عميل يريد "نفس المنتج لكن بهويتنا"، وأسرع أسبوع في حياتك هو الأسبوع الذي تنسخ فيه المستودع. بعد ستة أشهر يصبح كل خطأ موجودًا ثلاث مرات، وكل ميزة تُبنى ثلاث مرات، وتتباعد النسخ حتى تصبح رقعة أمنية واحدة يومًا كاملًا من المقارنات الحذرة لكل عميل. رأيت هذا الفيلم من قبل، لذلك بُنيت المنظومة منذ البداية بعقلية المحرّك أولًا.',
    ],
    sections: [
      {
        heading: 'كود واحد، ثلاث عمليات نشر',
        paragraphs: [
          'المحرّك مشروع Django واحد. كل علامة تجارية تعمل كنشر مستقل بقاعدة بيانات PostgreSQL خاصة بها، ونطاق خاص، وتخزين وسائط خاص، وإعدادات بيئة خاصة. لا شيء مشترك وقت التشغيل: لا قاعدة بيانات مشتركة بعمود tenant، ولا استعلامات عابرة للعملاء يمكن أن تُخطئ، ولا احتمال أن تمسّ ذروة زيارات عميلٍ أو خطأ في بياناته عميلًا آخر.',
          'كل ما يخص العلامة التجارية إعدادات لا كود: رموز الألوان، ومجموعة الشعارات، وبيانات اعتماد الدفع، ومعرّفات الاعتماد الأكاديمي، وعنوان البريد المرسِل. المنصة الجديدة ملف بيئة ومدخل ثيم، لا نسخة جديدة من المستودع. وحين أُصلح خطأً أو أُحصّن نقطة نهاية، تصل الإصلاحات لكل المنصات مع أول نشر تالٍ: رقعة واحدة، ثلاث منتجات.',
        ],
      },
      {
        heading: 'الهوية البصرية كبيانات',
        paragraphs: [
          'القوالب لا تذكر أي علامة تجارية أبدًا. هي تعرض خصائص CSS ومواضع شعارات وكتل نصوص تملؤها إعدادات الثيم الخاصة بكل نشر. والانضباط المهم يوميًا: كلما أوشك اسم علامة أو لون على أن يُكتب داخل قالب، يتحول إلى مفتاح ثيم بدلًا من ذلك. هذه القاعدة هي كل نظام تعدد العلامات؛ والباقي مجرد الالتزام بها.',
          'ويظهر مردودها في أماكن غير متوقعة: الشهادات والفواتير ورسائل الإشعارات كلها مستندات مولّدة، وكلها تحمل هوية العلامة. ولأن الهوية بيانات، فإن مولّد الشهادات نفسه ينتج شهادة إنجاز وشهادة مدى — وعلامة رابعة لن تكلّف سوى الأصول البصرية.',
        ],
      },
      {
        heading: 'الاعتماد الأكاديمي وحدة مستقلة، لا مجرد ميزة',
        paragraphs: [
          'المتطلبات الصعبة في هذا المجال ليست عمليات CRUD — بل الجهات التنظيمية. المنصات السعودية تتكامل مع المركز الوطني للتعليم الإلكتروني NELC، وللتدريب الطبي مع مسارات اعتماد هيئة التخصصات الصحية SCFHS: تقارير التسجيل، وأدلة الحضور، وسجلات الإتمام، وإصدار الشهادات بالشكل الذي تتوقعه الجهة المنظِّمة.',
          'هذه التكاملات تعيش خلف حدود وحدة مستقلة داخل المحرّك، وتُفعَّل بالإعدادات. العلامة التي تحتاج SCFHS تُشغّله، والتي لا تحتاجه لا يُحمَّل عندها أصلًا. وحين تغيّر الجهة المنظمة حقلًا أو نقطة نهاية — وهذا يحدث — يهبط التغيير مرة واحدة في وحدة واحدة، وتبقى كل المنصات المعتمدة متوافقة معًا. هذا هو الجزء من البنية الذي سدّد ثمن نفسه مباشرة.',
        ],
      },
      {
        heading: 'المدفوعات والمهام الخلفية والتفاصيل المملة',
        paragraphs: [
          'المدفوعات تمر عبر MyFatoorah ببيانات تاجر خاصة بكل علامة، فتصل الأموال لكل عميل مباشرة وتبقى الاستردادات والتسويات منفصلة. أما الحمل الخلفي فيحمله Celery وRedis: تأكيدات التسجيل، وتوليد الشهادات، ومهام التقارير التنظيمية، والتذكيرات المجدولة. كل نشر يشغّل عمّاله الخاصين، فلا يؤخر طابورٌ متعطل في منصةٍ منصةً أخرى.',
          'ترحيلات قاعدة البيانات هي الكلفة التشغيلية لنموذج المحرّك: كل تغيير في المخطط يعمل على ثلاث قواعد بيانات إنتاجية. الروتين صارم وغير لامع — ترحيلات متوافقة مع الإصدارات السابقة، نشر المحرّك أولًا، ثم ترحيل كل علامة بالتسلسل والتحقق. ينفق هذا الانضباط دقائق في كل إصدار، وقد أبقى ثلاث منصات إنتاجية على مخطط واحد دون حادثة واحدة.',
        ],
      },
      {
        heading: 'التكلفة بصراحة',
        paragraphs: [
          'نموذج المحرّك ليس مجانيًا. كل طلب ميزة يحمل الآن سؤالًا ثانيًا: هل هذا لعلامة واحدة أم للمحرّك؟ توجد مفاتيح ميزات لكل علامة ويجب اختبارها في الحالتين. والتغيير الذي كان سيكون حلًا سريعًا في كود عميلٍ واحد يُصمَّم هنا بعناية أكبر قليلًا لأنه سيعمل في ثلاثة أماكن. ومساحة الاختبار حقيقية: على CI أن يثبت صحة المحرّك بأكثر من إعداد.',
          'وما يشتريه هذا الثمن هو الرافعة: ثلاث منصات معتمدة تُصان بجهد منصة ونصف تقريبًا. وتغيير الامتثال يصل للجميع دفعة واحدة. وبيع المنصة الرابعة حديثٌ عن هوية ومحتوى، لا عن شهور من البناء.',
        ],
      },
    ],
    takeaway: {
      heading: 'الخلاصة',
      paragraphs: [
        'إن طلب منك عميل ثانٍ يومًا "نفس المنتج لكن باسمنا": لا تنسخ المستودع. استخرج المحرّك وما زال له مستهلكان فقط، واجعل الهوية إعدادات لا كودًا، وضع تكاملات الجهات التنظيمية خلف حدود وحدات من اليوم الأول. عقلية المحرّك عادة أكثر منها بنية — وتبنّيها عند المنصة الثانية أرخص كثيرًا من تبنّيها عند الثالثة.',
      ],
    },
  },
};

export default post;
