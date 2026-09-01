// Article body, both languages. Loaded per page via src/lib/blog.js.
const post = {
  en: {
    title: 'Arabic RTL That Survives Dashboards and Invoices',
    intro: [
      'Every project I ship carries Arabic and RTL support — learning platforms, procurement dashboards, financial documents, booking apps. After that many rounds, I can say where RTL actually gets hard, and it is not where tutorials spend their time. Flipping a marketing page is an afternoon. Keeping Arabic correct through data tables, invoices, charts and mixed-direction text is engineering.',
      'This is a field guide to the part after `dir="rtl"` — the decisions that separate an interface that is technically flipped from one an Arabic reader trusts.',
    ],
    sections: [
      {
        heading: 'Logical properties or a lifetime of overrides',
        paragraphs: [
          'The single highest-leverage decision is writing layout in logical properties from day one: margin-inline-start instead of margin-left, padding-inline-end instead of padding-right, start/end alignment instead of left/right. In Tailwind that means ms-*, me-*, ps-*, pe-* and text-start as reflexes, never their physical cousins.',
          'Do this and 90% of RTL costs nothing — the same stylesheet serves both directions. Skip it and every physical property becomes a future [dir="rtl"] override, and the overrides file becomes its own legacy codebase. I have inherited projects in both states; the difference is weeks.',
        ],
      },
      {
        heading: 'Bidi text: where trust is won or lost',
        paragraphs: [
          'The genuinely hard problem is mixed-direction content. An Arabic sentence containing a product code, a URL, an email address or an English brand name is a minefield: the Unicode bidi algorithm will happily reorder "ABC-123" or split a phone number across a line in ways that look corrupted to the reader.',
          'The working rules: wrap Latin-script islands — codes, URLs, emails, file paths — in dir="ltr" spans or guard them with bidi isolation (unicode-bidi: isolate, or the &lrm; mark where markup is unavailable). Keep phone numbers LTR always. And render user-generated text with dir="auto", because a platform whose users write both Arabic and English will receive both, often in the same field.',
        ],
      },
      {
        heading: 'Numbers, dates and money',
        paragraphs: [
          'Financial interfaces force decisions marketing pages never meet. Western digits or Eastern Arabic digits? My default is Western digits for anything transactional — amounts, invoice numbers, IBANs — because they match what banks, receipts and calculators show, while Eastern digits remain a locale preference for prose. Whatever the choice, it must be one choice, applied everywhere; mixing digit systems in one document reads as a bug.',
          'Currency and dates go through Intl.NumberFormat and Intl.DateTimeFormat with an explicit locale, never through string concatenation — the position of the currency symbol, the shape of the thousands separator and the order of date parts are all locale decisions that hand-built strings get wrong. An invoice is a legal document; "almost right" formatting is wrong.',
        ],
      },
      {
        heading: 'Dashboards, tables and charts',
        paragraphs: [
          'Data-heavy screens have a subtlety: the reading direction of the chrome flips, but the direction of data often should not. Table columns mirror, but a column of amounts stays right-aligned in both directions and numbers inside stay LTR. Time axes on charts are the classic trap — most charting libraries assume LTR, and a naively mirrored chart shows time flowing right to left, which no user actually wants. I keep time axes LTR and mirror the legend, tooltips and axis labels instead.',
          'Icons follow meaning, not reflex: arrows that mean "next" or "back" flip with direction; icons depicting real objects — a clock, a play button, a checkmark — never flip. Progress bars fill from the start edge. Getting these details right is invisible; getting them wrong is instantly visible to every native reader.',
        ],
      },
      {
        heading: 'Fonts and generated documents',
        paragraphs: [
          'Arabic type needs its own font decision, not a fallback stack accident. Arabic glyphs have taller ascenders and deeper descenders than Latin ones, so display type that looks great in English will clip Arabic unless line-height and clamp sizes are tuned per script — my own portfolio headline runs different sizing rules per language for exactly this reason. Cairo, IBM Plex Sans Arabic and Noto family fonts have carried every project of mine well.',
          'Generated documents are the final boss: PDFs, certificates, email templates. HTML-to-PDF pipelines and email clients each have their own bidi quirks, and a certificate with a reversed name or a broken date is a support ticket from someone\'s proudest moment. Every document template gets rendered and eyeballed in both languages before it ships — there is no shortcut.',
        ],
      },
      {
        heading: 'Test with real content, not lorem ipsum',
        paragraphs: [
          'RTL bugs hide in real data: the longest Arabic course title, a user named in both scripts, an address containing digits and a Latin street name, a search query mixing directions. Screenshot-diffing key screens in both directions catches regressions, but nothing replaces scrolling actual production-shaped content with the interface in Arabic.',
          'My rule for every feature: it is not done until it has been looked at in Arabic. Not translated later, not flipped later — looked at, in Arabic, before merge. RTL-as-afterthought is how a two-direction product turns into two products.',
        ],
      },
    ],
    takeaway: {
      heading: 'The takeaway',
      paragraphs: [
        'Logical properties from day one, bidi isolation around every Latin island, one deliberate digit policy, LTR time axes, per-script typography, and both-language review as part of done. None of it is exotic — it is a set of habits. But habits are exactly what distinguish RTL support that demos well from RTL support that four hundred million Arabic speakers can actually trust with their money and their certificates.',
      ],
    },
  },
  ar: {
    title: 'واجهات عربية RTL تصمد أمام لوحات التحكم والفواتير',
    intro: [
      'كل مشروع أعمل عليه يشمل دعم العربية والاتجاه من اليمين لليسار — منصات تعليمية، لوحات مشتريات، مستندات مالية، تطبيقات حجز. بعد كل هذه الجولات أستطيع أن أحدد أين يصعب الـRTL فعلًا، وهو ليس حيث تقضي الدروس التعليمية وقتها. قلبُ صفحة تسويقية عملُ ظهيرة، أما بقاء العربية صحيحة عبر جداول البيانات والفواتير والرسوم البيانية والنص مختلط الاتجاه فهندسةٌ كاملة.',
      'هذا دليل ميداني لما بعد ‎dir="rtl"‎ — القرارات التي تفصل واجهةً "معكوسة تقنيًا" عن واجهةٍ يثق بها القارئ العربي.',
    ],
    sections: [
      {
        heading: 'الخصائص المنطقية… أو عمرٌ من التصحيحات',
        paragraphs: [
          'القرار الأعلى مردودًا على الإطلاق هو كتابة التخطيط بالخصائص المنطقية من اليوم الأول: ‎margin-inline-start بدل ‎margin-left، و‎padding-inline-end بدل ‎padding-right، ومحاذاة start/end بدل left/right. وفي Tailwind يعني ذلك أن تكون ‎ms-*‎ و‎me-*‎ و‎ps-*‎ و‎pe-*‎ و‎text-start ردود أفعال تلقائية، لا نظيراتها الفيزيائية أبدًا.',
          'افعل ذلك و90% من دعم RTL لن يكلف شيئًا — ورقة الأنماط نفسها تخدم الاتجاهين. تجاهله وسيتحول كل خاصية فيزيائية إلى تصحيح ‎[dir="rtl"]‎ مستقبلي، ويصبح ملف التصحيحات مشروعًا قديمًا قائمًا بذاته. ورثتُ مشاريع في الحالتين؛ والفرق يُقاس بالأسابيع.',
        ],
      },
      {
        heading: 'النص ثنائي الاتجاه: حيث تُكسب الثقة أو تُخسر',
        paragraphs: [
          'المشكلة الصعبة حقًا هي المحتوى مختلط الاتجاه. جملة عربية تحوي كود منتج أو رابطًا أو بريدًا إلكترونيًا أو اسم علامة أجنبية حقلُ ألغام: خوارزمية Unicode للاتجاه ستعيد ترتيب "ABC-123" بسرور، أو تقسم رقم هاتف عبر سطرين بطريقة تبدو للقارئ كأنها بيانات تالفة.',
          'القواعد العملية: غلّف الجزر اللاتينية — الأكواد والروابط والبريد ومسارات الملفات — في عناصر ‎dir="ltr"‎ أو اعزلها بعزل الاتجاه (‎unicode-bidi: isolate، أو علامة ‎&lrm;‎ حيث لا تتوفر الوسوم). وأبقِ أرقام الهواتف LTR دائمًا. واعرض نصوص المستخدمين بـ‎dir="auto"‎، لأن منصةً يكتب مستخدموها العربية والإنجليزية ستستقبل الاثنتين، وغالبًا في الحقل نفسه.',
        ],
      },
      {
        heading: 'الأرقام والتواريخ والمال',
        paragraphs: [
          'الواجهات المالية تفرض قرارات لا تواجهها الصفحات التسويقية أبدًا. أرقام غربية أم أرقام عربية مشرقية؟ خياري الافتراضي هو الأرقام الغربية لكل ما هو معاملات — المبالغ وأرقام الفواتير وأرقام IBAN — لأنها تطابق ما تعرضه البنوك والإيصالات والآلات الحاسبة، وتبقى الأرقام المشرقية تفضيلَ لغةٍ للنصوص السردية. وأيًا كان الخيار، يجب أن يكون خيارًا واحدًا مطبقًا في كل مكان؛ فخلط نظامي أرقام في مستند واحد يُقرأ كخطأ برمجي.',
          'العملات والتواريخ تمر عبر ‎Intl.NumberFormat و‎Intl.DateTimeFormat بلغة صريحة، لا عبر لصق النصوص أبدًا — فموضع رمز العملة، وشكل فاصل الآلاف، وترتيب أجزاء التاريخ كلها قرارات لغوية تخطئها النصوص المبنية يدويًا. الفاتورة مستند قانوني؛ والتنسيق "الصحيح تقريبًا" خطأ.',
        ],
      },
      {
        heading: 'لوحات التحكم والجداول والرسوم البيانية',
        paragraphs: [
          'الشاشات كثيفة البيانات فيها دقيقةٌ مهمة: اتجاه قراءة الإطار ينقلب، لكن اتجاه البيانات غالبًا لا ينبغي أن ينقلب. أعمدة الجدول تنعكس، لكن عمود المبالغ يبقى محاذًى لليمين في الاتجاهين وتبقى الأرقام داخله LTR. ومحاور الزمن في الرسوم البيانية هي الفخ الكلاسيكي — معظم مكتبات الرسم تفترض LTR، والرسم المعكوس بسذاجة يُظهر الزمن يجري من اليمين لليسار، وهو ما لا يريده أي مستخدم فعلًا. أبقي محاور الزمن LTR وأعكس وسيلة الإيضاح والتلميحات وتسميات المحاور بدلًا من ذلك.',
          'الأيقونات تتبع المعنى لا الانعكاس الآلي: الأسهم التي تعني "التالي" أو "رجوع" تنقلب مع الاتجاه؛ أما أيقونات الأشياء الحقيقية — ساعة، زر تشغيل، علامة صح — فلا تنقلب أبدًا. وأشرطة التقدم تمتلئ من حافة البداية. إتقان هذه التفاصيل غير مرئي؛ وإخفاقها مرئي فورًا لكل قارئ أصلي.',
        ],
      },
      {
        heading: 'الخطوط والمستندات المولّدة',
        paragraphs: [
          'الخط العربي يحتاج قرارًا خاصًا به، لا مصادفةَ سلسلةِ خطوطٍ احتياطية. فحروف العربية أعلى صعودًا وأعمق نزولًا من اللاتينية، وخط العناوين الذي يبدو رائعًا بالإنجليزية سيقصّ العربية ما لم تُضبط ‎line-height وأحجام ‎clamp لكل نظام كتابة على حدة — عنوان موقعي الشخصي نفسه يعمل بقواعد قياس مختلفة لكل لغة لهذا السبب تحديدًا. خطوط Cairo وIBM Plex Sans Arabic وعائلة Noto حملت كل مشاريعي بجدارة.',
          'والمستندات المولّدة هي الاختبار الأخير: ملفات PDF والشهادات وقوالب البريد. خطوط أنابيب HTML-to-PDF وعملاء البريد لكلٍّ منها غرائبها مع ثنائية الاتجاه، وشهادةٌ باسم معكوس أو تاريخ مكسور تذكرةُ دعمٍ قادمة من أفخر لحظات صاحبها. كل قالب مستند يُعرض ويُفحص بالعين باللغتين قبل شحنه — لا طريق مختصر هنا.',
        ],
      },
      {
        heading: 'اختبر بمحتوى حقيقي لا بـlorem ipsum',
        paragraphs: [
          'أخطاء RTL تختبئ في البيانات الحقيقية: أطول عنوان دورة بالعربية، مستخدم اسمه مكتوب بالنظامين، عنوان يحوي أرقامًا واسم شارع لاتينيًا، استعلام بحث يخلط الاتجاهين. مقارنة لقطات الشاشات الرئيسية في الاتجاهين تلتقط الانحدارات، لكن لا شيء يعوّض تصفح محتوى بشكل الإنتاج الفعلي والواجهة بالعربية.',
          'قاعدتي في كل ميزة: ليست منتهية حتى تُرى بالعربية. لا تُترجم لاحقًا، ولا تُقلب لاحقًا — تُرى بالعربية قبل الدمج. فـRTL كفكرةٍ لاحقة هو الطريق الذي يحوّل منتجًا ثنائي الاتجاه إلى منتجين.',
        ],
      },
    ],
    takeaway: {
      heading: 'الخلاصة',
      paragraphs: [
        'خصائص منطقية من اليوم الأول، وعزل اتجاهي حول كل جزيرة لاتينية، وسياسة أرقام واحدة متعمدة، ومحاور زمن LTR، وطباعة لكل نظام كتابة، ومراجعة باللغتين كجزء من تعريف "منتهٍ". لا شيء من هذا غريب — إنها مجموعة عادات. لكن العادات هي بالضبط ما يفصل دعم RTL الذي يلمع في العرض التوضيحي عن دعمٍ يستطيع أربعمئة مليون ناطق بالعربية أن يأتمنوه فعلًا على أموالهم وشهاداتهم.',
      ],
    },
  },
};

export default post;
