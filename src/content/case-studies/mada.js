const content = {
  "en": {
    "title": "Mada Education, an Accredited Training Platform on a Shared Engine",
    "summary": "An accredited e-learning and training platform running on the same LMS engine as Injaz and HC Holding, with its own visual identity and course catalogue: video lessons, assessments, payments and automated certificates.",
    "facts": {
      "role": "Sole developer of the platform and the shared LMS engine",
      "scope": "Branded deployment, course catalogue, payments, certification",
      "audience": "Trainees on accredited professional courses"
    },
    "challenge": {
      "body": "Every training provider wants its own platform, but rebuilding an LMS per client multiplies cost and bugs. The challenge Mada represents is productizing: give the client a platform that is genuinely theirs — brand, catalogue, pricing — without forking the accredited core that makes the whole thing trustworthy.",
      "points": [
        "A real brand of its own, not a reskin that leaks",
        "Independent catalogue and pricing",
        "The accredited core must stay shared and hardened",
        "Fixes must land on all platforms at once"
      ]
    },
    "approach": {
      "body": "Mada runs as a deployment of the shared Django/PostgreSQL LMS engine, with its brand theme layered over the core. Celery and Redis handle notifications, exports and reports asynchronously. Payments run through MyFatoorah with carts and discount coupons, and certificates are issued automatically with unique IDs and online verification.",
      "points": [
        "Independent brand theme over the shared accredited core",
        "Celery + Redis async processing",
        "MyFatoorah payments with cart and coupons",
        "Automated certificates with online verification"
      ]
    },
    "delivered": {
      "body": "A branded, accredited training platform with the full learning-to-certification pipeline.",
      "points": [
        "Course catalogue with video lessons and progress tracking",
        "Per-lesson quizzes",
        "Multi-role dashboards for admins, instructors and trainees",
        "Automated verifiable certificates"
      ]
    },
    "outcome": {
      "body": "Mada Education is live at mada-education.com — the third branded deployment proving the multi-tenant engine works as a product line, not a one-off.",
      "points": [
        "Live at mada-education.com",
        "Third branded platform on one hardened core",
        "New client launches measured in days"
      ]
    }
  },
  "ar": {
    "title": "مدى التعليمية، منصة تدريب معتمدة على محرك مشترك",
    "summary": "منصة تعلم إلكتروني وتدريب معتمد شغالة على نفس محرك الـ LMS بتاع الإنجاز والتجمع الصحي، بهوية بصرية وكتالوج دورات خاصين بيها: دروس فيديو، اختبارات، مدفوعات، وشهادات مؤتمتة.",
    "facts": {
      "role": "المطور الوحيد للمنصة والمحرك المشترك",
      "scope": "نشر بهوية مستقلة، كتالوج دورات، مدفوعات، شهادات",
      "audience": "متدربون في دورات مهنية معتمدة"
    },
    "challenge": {
      "body": "كل جهة تدريب عايزة منصة خاصة بيها، لكن إعادة بناء LMS لكل عميل بتضاعف التكلفة والأخطاء. التحدي اللي مدى بتمثله هو التحويل لمنتج: تدي العميل منصة فعلاً بتاعته — هوية وكتالوج وتسعير — من غير ما تعمل fork للنواة المعتمدة اللي هي أساس الثقة كلها.",
      "points": [
        "هوية حقيقية خاصة، مش قشرة بتسرّب",
        "كتالوج وتسعير مستقلين",
        "النواة المعتمدة لازم تفضل مشتركة ومحصّنة",
        "الإصلاحات لازم تنزل على كل المنصات مرة واحدة"
      ]
    },
    "approach": {
      "body": "مدى شغالة كنشرة من محرك الـ LMS المشترك (Django/PostgreSQL) مع ثيم هويتها فوق النواة. Celery و Redis بيتولوا الإشعارات والتصدير والتقارير بشكل غير متزامن. المدفوعات عبر MyFatoorah بسلة وكوبونات خصم، والشهادات بتصدر أوتوماتيكياً بأرقام فريدة وتحقق أونلاين.",
      "points": [
        "ثيم هوية مستقل فوق النواة المعتمدة المشتركة",
        "معالجة غير متزامنة بـ Celery + Redis",
        "مدفوعات MyFatoorah بسلة وكوبونات",
        "شهادات مؤتمتة بتحقق أونلاين"
      ]
    },
    "delivered": {
      "body": "منصة تدريب معتمدة بهوية خاصة، وبدورة كاملة من التعلم للشهادة.",
      "points": [
        "كتالوج دورات بدروس فيديو وتتبع تقدم",
        "اختبارات لكل درس",
        "لوحات تحكم متعددة الأدوار للإدارة والمدربين والمتدربين",
        "شهادات مؤتمتة قابلة للتحقق"
      ]
    },
    "outcome": {
      "body": "مدى التعليمية شغالة على mada-education.com — النشرة الثالثة بهوية مستقلة اللي بتثبت إن المحرك متعدد المستأجرين خط إنتاج، مش مشروع لمرة واحدة.",
      "points": [
        "تعمل على mada-education.com",
        "ثالث منصة بهوية مستقلة على نواة واحدة محصّنة",
        "إطلاق العملاء الجدد بيتقاس بالأيام"
      ]
    }
  }
};

export default content;
