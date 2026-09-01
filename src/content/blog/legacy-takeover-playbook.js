// Article body, both languages. Loaded per page via src/lib/blog.js.
const post = {
  en: {
    title: 'Taking Over a Legacy Codebase Without Rewriting It',
    intro: [
      'Medicta came to me as a live React Native app on Google Play: real users booking doctor appointments and home visits, a bug list long enough to hurt, an outdated UI, and no access to the developers who wrote it. The client had already heard the advice every developer gives in that situation — "this needs a rewrite" — and could not afford six months of paying for a product they already owned.',
      'I stabilized it, redesigned the UI screen by screen, and shipped it back to Google Play without ever stopping the app that users depended on. This is the playbook, because takeovers are a discipline of their own, and almost everything about them runs against a developer\'s instincts.',
    ],
    sections: [
      {
        heading: 'First, earn a reproducible build',
        paragraphs: [
          'Nothing else matters until the code on your machine provably becomes the app in the store. Legacy mobile projects fail here constantly: undocumented signing keys, dependency versions that no longer resolve, native modules pinned to an SDK three versions back, an .env file that lives only on a former developer\'s laptop.',
          'The first deliverable was not a fix — it was a build: check out, install, compile, run on a device, and a written record of every step and every credential needed to do it again. It is unglamorous work the client never sees, but it converts the project from "a zip file we are afraid of" into software. Only then did I touch a bug.',
        ],
      },
      {
        heading: 'Read before you judge',
        paragraphs: [
          'Every takeover begins with the urge to condemn the previous developer. Resist it — not out of politeness, but because it produces bad engineering. Code that looks insane is usually load-bearing in a way you have not discovered yet: the weird retry wrapper exists because the booking API double-charges on timeout; the hand-rolled date parser exists because the backend sends three different formats.',
          'I spent the first days mapping instead of fixing: which screens exist, which API endpoints they call, where state lives, what the crash reports actually say. The map does not need to be complete — it needs to be honest about which parts are understood and which are still dark. Fixes stay inside the lit area; the dark area shrinks one bug at a time.',
        ],
      },
      {
        heading: 'Triage like an ER, not like a backlog',
        paragraphs: [
          'A legacy bug list is not a backlog to burn down in order. I sorted Medicta\'s issues into three bands: bugs that lose money or users right now (booking failures, crashes on launch), bugs that erode trust slowly (wrong labels, stale data, broken edge cases), and everything cosmetic. The first band ships as fast as it safely can; the second is scheduled; the third waits for the redesign to absorb it for free.',
          'The band system also gave the client something rewrites never do: visible progress in week one. Users felt the app get better while the deeper work was still underway — and a client who sees motion extends trust, which a takeover consumes quickly otherwise.',
        ],
      },
      {
        heading: 'Change in the smallest possible units',
        paragraphs: [
          'In a codebase with no tests and no original authors, the size of a change is the size of its risk. Every fix was the smallest diff that resolved the issue — no drive-by cleanups, no "while I\'m here" refactors mixed into bug fixes. When a refactor was genuinely needed, it shipped alone, so that if something regressed, the cause was one commit and not an archaeology project.',
          'The UI redesign followed the same rule at a larger scale: screen by screen, not app in one leap. Each release replaced a handful of screens with the new design while the rest kept working as before. Users got a steadily improving app instead of a big-bang update, and every release stayed small enough to roll back.',
        ],
      },
      {
        heading: 'The rewrite question, answered honestly',
        paragraphs: [
          'Rewrites are sometimes right — when the platform is dead, the framework unsupported, or the architecture actively blocks the business. None of that was true here. What the rewrite instinct usually expresses is that reading other people\'s code is harder than writing your own. That is true, and it is also the job.',
          'The takeover cost a fraction of a rewrite, kept revenue flowing the entire time, and preserved years of accumulated edge-case knowledge encoded in that "ugly" code — knowledge a rewrite would have had to rediscover one production incident at a time.',
        ],
      },
    ],
    takeaway: {
      heading: 'The takeaway',
      paragraphs: [
        'If you inherit a live codebase: make the build reproducible before anything else, map before you fix, triage by business damage rather than by ticket order, keep every change as small as its risk demands, and treat the rewrite as a last resort with a business case — not a first instinct with an aesthetic one. The client does not need beautiful code. They need the app they already paid for to work, and to keep working while it gets better.',
      ],
    },
  },
  ar: {
    title: 'استلام مشروع قديم بدون إعادة كتابته من الصفر',
    intro: [
      'وصلني Medicta تطبيقَ React Native حيًّا على Google Play: مستخدمون حقيقيون يحجزون مواعيد أطباء وزيارات منزلية، وقائمة أخطاء طويلة تكفي لتؤلم، وواجهة قديمة، ولا سبيل للوصول إلى المطورين الذين كتبوه. وكان العميل قد سمع فعلًا النصيحة التي يقدمها كل مطور في هذا الموقف — "المشروع محتاج إعادة كتابة" — ولم يكن يحتمل ستة أشهر يدفع فيها ثمن منتج يملكه بالفعل.',
      'ثبّتُّ التطبيق، وأعدت تصميم واجهته شاشةً بشاشة، وأعدته إلى Google Play دون أن يتوقف يومًا عن خدمة مستخدميه. هذه هي الخطة كاملة، لأن استلام المشاريع القديمة تخصص قائم بذاته، وكل شيء فيه تقريبًا يسير عكس غريزة المطور.',
    ],
    sections: [
      {
        heading: 'أولًا: استحق بناءً قابلًا للتكرار',
        paragraphs: [
          'لا شيء آخر يهم قبل أن يثبت أن الكود على جهازك يتحول فعلًا إلى التطبيق الموجود في المتجر. مشاريع الموبايل القديمة تفشل هنا باستمرار: مفاتيح توقيع غير موثقة، وإصدارات اعتماديات لم تعد تُحلّ، ووحدات native مثبتة على SDK أقدم بثلاثة إصدارات، وملف ‎.env يعيش فقط على حاسوب مطورٍ سابق.',
          'أول تسليم لم يكن إصلاحًا — بل كان بناءً: سحب الكود، والتثبيت، والترجمة، والتشغيل على جهاز حقيقي، مع توثيق مكتوب لكل خطوة وكل بيانات اعتماد يلزم تكرارها. عملٌ لا بريق له ولا يراه العميل، لكنه يحوّل المشروع من "ملف مضغوط نخاف منه" إلى برمجيات. عندها فقط لمستُ أول خطأ.',
        ],
      },
      {
        heading: 'اقرأ قبل أن تحكم',
        paragraphs: [
          'كل استلام يبدأ برغبةٍ في إدانة المطور السابق. قاومها — لا مجاملةً، بل لأنها تنتج هندسة رديئة. الكود الذي يبدو جنونيًا غالبًا ما يحمل وزنًا لم تكتشفه بعد: غلاف إعادة المحاولة الغريب موجود لأن API الحجز يخصم مرتين عند انتهاء المهلة، ومحلّل التواريخ اليدوي موجود لأن الخادم يرسل ثلاث صيغ مختلفة.',
          'قضيت الأيام الأولى في رسم الخريطة لا في الإصلاح: أي الشاشات موجودة، وأي نقاط API تستدعيها، وأين تعيش الحالة، وماذا تقول تقارير الانهيار فعلًا. لا يلزم أن تكتمل الخريطة — يلزم أن تكون صادقة بشأن ما فُهم وما زال معتمًا. تبقى الإصلاحات داخل المنطقة المضاءة، وتنكمش المنطقة المعتمة خطأً بعد خطأ.',
        ],
      },
      {
        heading: 'فرزٌ كغرفة طوارئ، لا كقائمة مهام',
        paragraphs: [
          'قائمة أخطاء مشروعٍ قديم ليست backlog يُحرق بالترتيب. صنّفت مشاكل Medicta في ثلاث درجات: أخطاء تخسر مالًا أو مستخدمين الآن (فشل الحجز، انهيار عند الإقلاع)، وأخطاء تُضعف الثقة ببطء (تسميات خاطئة، بيانات قديمة، حالات حدّية مكسورة)، وكل ما هو تجميلي. الدرجة الأولى تُشحن بأسرع ما يمكن بأمان؛ والثانية تُجدول؛ والثالثة تنتظر إعادة التصميم لتبتلعها مجانًا.',
          'ونظام الدرجات أعطى العميل ما لا تعطيه إعادة الكتابة أبدًا: تقدمًا مرئيًا في الأسبوع الأول. شعر المستخدمون بالتطبيق يتحسن والعملُ الأعمق ما زال جاريًا — والعميل الذي يرى حركةً يمنح ثقة، وهي عملة يستهلكها الاستلام سريعًا لولا ذلك.',
        ],
      },
      {
        heading: 'غيّر بأصغر الوحدات الممكنة',
        paragraphs: [
          'في كودٍ بلا اختبارات وبلا مؤلفيه الأصليين، حجم التغيير هو حجم مخاطرته. كان كل إصلاح أصغر فرقٍ يحل المشكلة — لا تنظيفات عابرة، ولا refactor "بما أنني هنا" مخلوطًا بإصلاح خطأ. وحين كانت إعادة الهيكلة ضرورية حقًا، شُحنت وحدها، حتى إذا انكسر شيء كان السبب commit واحدًا لا مشروعَ تنقيبٍ أثري.',
          'واتبعت إعادة تصميم الواجهة القاعدة نفسها على نطاق أوسع: شاشة بشاشة، لا التطبيق بقفزة واحدة. كل إصدار استبدل حفنة شاشات بالتصميم الجديد بينما بقي الباقي يعمل كما كان. حصل المستخدمون على تطبيق يتحسن باطراد بدل تحديثٍ انفجاري، وبقي كل إصدار صغيرًا بما يكفي للتراجع عنه.',
        ],
      },
      {
        heading: 'سؤال إعادة الكتابة… بإجابة صادقة',
        paragraphs: [
          'إعادة الكتابة صائبة أحيانًا — حين تموت المنصة، أو يفقد الإطار دعمه، أو تسدّ البنية طريق العمل فعليًا. لم يكن شيء من ذلك صحيحًا هنا. ما تعبّر عنه غريزة إعادة الكتابة غالبًا هو أن قراءة كود الآخرين أصعب من كتابة كودك. هذا صحيح — وهو أيضًا صلبُ المهنة.',
          'كلّف الاستلام جزءًا يسيرًا من كلفة إعادة الكتابة، وأبقى الإيراد يتدفق طوال الوقت، وحافظ على سنوات من معرفة الحالات الحدّية المخزنة في ذلك الكود "القبيح" — معرفة كانت إعادة الكتابة ستعيد اكتشافها حادثةَ إنتاجٍ تلو أخرى.',
        ],
      },
    ],
    takeaway: {
      heading: 'الخلاصة',
      paragraphs: [
        'إذا ورثت كودًا حيًّا: اجعل البناء قابلًا للتكرار قبل أي شيء، وارسم الخريطة قبل أن تُصلح، وافرز بحجم الضرر على العمل لا بترتيب التذاكر، وأبقِ كل تغيير بصغر ما تمليه مخاطرته، وعامل إعادة الكتابة كملاذ أخير له حالة عمل مقنعة — لا كغريزة أولى دافعها جمالي. العميل لا يحتاج كودًا جميلًا؛ يحتاج التطبيق الذي دفع ثمنه أن يعمل، وأن يستمر في العمل وهو يتحسن.',
      ],
    },
  },
};

export default post;
