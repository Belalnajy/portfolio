const content = {
  "en": {
    "title": "Coach Mohamed Nasser, a Coaching Website That Turns Results into WhatsApp Bookings",
    "summary": "The website of a fitness and body-transformation coach in Egypt: Arabic first, with English at /en, his real client results, four fitness calculators and a booking flow that ends in a ready WhatsApp message. Fully static with no backend, and built on a template where everything about the coach lives in one config folder.",
    "facts": {
      "role": "Design and development, end to end",
      "scope": "Bilingual site, WhatsApp booking, results gallery, fitness calculators, reusable template",
      "audience": "People looking for a coach, in Arabic and English"
    },
    "challenge": {
      "body": "The coach's proof already existed: his clients' transformations, in his own posts. What he lacked was one place that shows that proof properly and turns a visitor into a booking, in Arabic first and on a phone, and that he can keep updating without a developer for every change. His bookings happen on WhatsApp, so the site had to end there, not in a form nobody answers.",
      "points": [
        "Results scattered across posts, with nowhere to browse them",
        "Bookings happen on WhatsApp, not through forms",
        "Arabic first, right to left, with an English version",
        "Content the coach can update without touching the code"
      ]
    },
    "approach": {
      "body": "A fully static Next.js 16 site on Vercel, written in TypeScript with React 19 and Tailwind v4. Arabic and English each have their own root layout, hreflang, share images for every page (the Arabic ones set in Cairo) and structured data. Everything about the coach (name, packages, booking options, results, FAQ) lives in one config folder that is validated at build time, and a sample-content safeguard keeps the template's placeholder data from ever shipping.",
      "points": [
        "Static pages, no backend and no database",
        "Separate Arabic and English root layouts with hreflang and JSON-LD",
        "One config folder for the coach, validated on every build",
        "Sample mode: noindex, and the build fails on leftover placeholders"
      ]
    },
    "delivered": {
      "body": "A site built around one action: book on WhatsApp.",
      "points": [
        "Booking sheet: package, goal, day and time, then WhatsApp opens with a formatted message in the visitor's language",
        "Results page with 29 real transformations from the coach's own posts, shared with his clients' consent",
        "Before/after slider that moves only from its handle on touch, so scrolling never drags it; keyboard and screen-reader support, mirrored in Arabic",
        "Front, side and back views, goal filters, and the best photos first",
        "Calculators: calories (Mifflin–St Jeor), protein, BMI and ideal weight, body fat (US Navy), each result ready to go into the booking message",
        "Programs page for online coaching and in-gym training, where each package opens the booking with it already chosen",
        "Sections with no content hide themselves, with their menu entries and structured data",
        "The coach's achievement on the home page: an athlete he prepared placed 3rd at the Shalaby Classic after a 6-week prep"
      ]
    },
    "outcome": {
      "body": "The coach's site is live in both languages, with his real results and bookings going straight to his WhatsApp. On mobile, Lighthouse scores about 92–97 for performance and 100 for accessibility, best practices and SEO, with no layout shift. The original template is kept on its own branch, so the next coach is a content change, not a rebuild.",
      "points": [
        "Live on Vercel in Arabic and English",
        "Lighthouse mobile: 100 for accessibility, best practices and SEO; CLS 0",
        "Unit tests for the calculators, the WhatsApp message and config validation, plus smoke and browser checks",
        "A template ready for other coaches"
      ]
    }
  },
  "ar": {
    "title": "الكابتن محمد ناصر، موقع مدرب يحوّل النتائج إلى حجوزات على واتساب",
    "summary": "موقع مدرب لياقة وتغيير شكل جسم في مصر: عربي الأول ومعاه نسخة إنجليزي، فيه نتايج عملائه الحقيقية، وأربع حاسبات لياقة، وحجز بيخلص برسالة واتساب جاهزة. الموقع كله static من غير باك إند، ومبني على قالب كل بيانات الكابتن فيه في فولدر إعدادات واحد.",
    "facts": {
      "role": "التصميم والتطوير بالكامل",
      "scope": "موقع بلغتين، حجز على واتساب، معرض نتائج، حاسبات لياقة، قالب قابل لإعادة الاستخدام",
      "audience": "الباحثون عن مدرب، بالعربية والإنجليزية"
    },
    "challenge": {
      "body": "الدليل كان موجود أصلاً: تحوّلات عملاء الكابتن في بوستاته هو. اللي كان ناقص مكان واحد يعرض النتايج دي صح ويحوّل الزائر لحجز، بالعربي الأول وعلى الموبايل، والكابتن يقدر يحدّثه من غير ما يرجع لمطوّر في كل تعديل. والحجز عنده أصلاً بيتم على واتساب، فالموقع لازم يخلص هناك، مش في فورم محدش بيرد عليها.",
      "points": [
        "النتايج متفرقة في البوستات ومفيش مكان تتصفح فيه",
        "الحجز بيتم على واتساب مش من خلال فورم",
        "عربي الأول من اليمين للشمال، ومعاه نسخة إنجليزي",
        "محتوى الكابتن يقدر يحدّثه من غير ما يلمس الكود"
      ]
    },
    "approach": {
      "body": "موقع Next.js 16 static بالكامل على Vercel، مكتوب بـ TypeScript مع React 19 وTailwind v4. العربي والإنجليزي كل واحد فيهم ليه root layout خاص بيه، وhreflang، وصور مشاركة لكل صفحة (العربي منها بخط Cairo)، وبيانات منظّمة. وكل حاجة تخص الكابتن (الاسم، الباقات، اختيارات الحجز، النتايج، الأسئلة الشائعة) موجودة في فولدر إعدادات واحد بيتراجع وقت البناء، ومعاه حماية بتمنع أي بيانات تجريبية من القالب إنها توصل للناس.",
      "points": [
        "صفحات static من غير باك إند ولا قاعدة بيانات",
        "root layout منفصل للعربي والإنجليزي مع hreflang وJSON-LD",
        "فولدر إعدادات واحد للكابتن بيتراجع مع كل build",
        "وضع العيّنة: noindex، والـ build بيفشل لو فضلت أي بيانات تجريبية"
      ]
    },
    "delivered": {
      "body": "موقع مبني حوالين حاجة واحدة: احجز على واتساب.",
      "points": [
        "شاشة حجز: الباقة والهدف واليوم والوقت، وبعدها واتساب بيفتح برسالة متنسّقة بلغة الزائر",
        "صفحة نتايج فيها 29 تحوّل حقيقي من بوستات الكابتن نفسه، منشورة بموافقة عملائه",
        "سلايدر قبل وبعد بيتحرك من المقبض بس على اللمس، فالسكرول عمره ما يحرّكه، وبيدعم الكيبورد وقارئ الشاشة، ومعكوس في العربي",
        "صور من الأمام والجنب والضهر، وفلاتر حسب الهدف، وأحسن الصور الأول",
        "حاسبات: السعرات (Mifflin–St Jeor)، البروتين، مؤشر كتلة الجسم والوزن المثالي، نسبة الدهون (US Navy)، وأي نتيجة ممكن تتبعت مع رسالة الحجز",
        "صفحة باقات للمتابعة الأونلاين والتدريب في الجيم، وكل باقة بتفتح الحجز وهي مختارة",
        "أي قسم مفيهوش محتوى بيختفي لوحده، هو وعناصر القايمة والبيانات المنظّمة بتاعته",
        "إنجاز الكابتن في الصفحة الرئيسية: لاعب جهّزه خد المركز التالت في بطولة شلبي كلاسيك بعد تحضير 6 أسابيع"
      ]
    },
    "outcome": {
      "body": "موقع الكابتن شغال لايف باللغتين، بنتايجه الحقيقية، والحجز بيوصل على واتساب بتاعه على طول. على الموبايل، Lighthouse بيدي من 92 لـ 97 تقريباً في الأداء و100 في الإتاحة وأفضل الممارسات وSEO، ومن غير أي اهتزاز في الصفحة وهي بتحمّل. والقالب الأصلي محفوظ على branch لوحده، فأي كابتن جديد هيبقى تعديل محتوى مش بناء من الأول.",
      "points": [
        "شغال على Vercel بالعربي والإنجليزي",
        "Lighthouse موبايل: 100 في الإتاحة وأفضل الممارسات وSEO، وCLS صفر",
        "اختبارات للحاسبات ورسالة واتساب والتحقق من الإعدادات، ومعاها فحوصات smoke ومتصفح",
        "قالب جاهز لمدربين تانيين"
      ]
    }
  }
};

export default content;
