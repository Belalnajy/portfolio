const content = {
  "en": {
    "title": "Medicta, Rescuing a Healthcare Booking App Already in Production",
    "summary": "An Android app for booking doctor appointments and browsing clinic services, published on Google Play. I took over the existing codebase, re-architected it, and worked through its functional defects one by one.",
    "facts": {
      "role": "Mobile developer — code takeover and redesign",
      "scope": "Re-architecture, bug fixing across booking, auth and data flows, UI/UX cleanup",
      "audience": "Patients booking doctor appointments on Android"
    },
    "challenge": {
      "body": "The app was already live with real users, but the codebase underneath it was fragile: broken flows in booking, authentication and data handling, stale-data and race-condition bugs, and a structure that made every fix risky. The job was not to build something new — it was to make an existing product trustworthy without taking it offline.",
      "points": [
        "Live app with real users — no room for breakage",
        "Broken flows across booking, auth and data handling",
        "Stale-data and race-condition bugs in state management",
        "A structure that made every change risky"
      ]
    },
    "approach": {
      "body": "I restructured the app into clear, maintainable layers first, so fixes would land in one place instead of leaking everywhere. Then I worked through the functional bugs systematically — booking, authentication, then data flows — and refactored the API integration layer to behave consistently under errors and loading.",
      "points": [
        "Full code redesign into clear, maintainable layers",
        "Systematic bug-fixing pass over booking, auth and data flows",
        "Refactored API layer with consistent error and loading states",
        "State management rework to kill stale-data and race conditions"
      ]
    },
    "delivered": {
      "body": "A stable, restructured app that behaves predictably, with a cleaner UI on top of it.",
      "points": [
        "Re-architected codebase in maintainable layers",
        "Booking, authentication and data flows working reliably",
        "Consistent API error and loading behaviour",
        "UI/UX cleanup for smoother navigation and faster perceived performance"
      ]
    },
    "outcome": {
      "body": "The app is live on Google Play under the package com.medicta. It is my reference for legacy takeover work: inheriting someone else's production code and leaving it better than a rewrite would.",
      "points": [
        "Live on Google Play (com.medicta)",
        "Existing product stabilized without a ground-up rewrite",
        "Proof of legacy-takeover capability"
      ]
    }
  },
  "ar": {
    "title": "Medicta، إنقاذ تطبيق حجوزات طبية شغال فعلياً",
    "summary": "تطبيق أندرويد لحجز مواعيد الأطباء واستعراض الخدمات الطبية، منشور على Google Play. استلمت الكود القائم، وأعدت هيكلته، وعالجت أعطاله الوظيفية واحداً واحداً.",
    "facts": {
      "role": "مطور موبايل — استلام كود وإعادة هيكلة",
      "scope": "إعادة معمارية، إصلاح أخطاء الحجز والمصادقة والبيانات، تحسين الواجهة",
      "audience": "مرضى بيحجزوا مواعيد أطباء على أندرويد"
    },
    "challenge": {
      "body": "التطبيق كان شغال فعلياً وبمستخدمين حقيقيين، لكن الكود تحته كان هش: مسارات مكسورة في الحجز والمصادقة والتعامل مع البيانات، ومشاكل بيانات قديمة و race conditions، وبنية بتخلي أي تعديل مخاطرة. الشغلانة ماكانتش بناء حاجة جديدة — كانت إن منتج موجود يبقى موثوق من غير ما يقف.",
      "points": [
        "تطبيق شغال بمستخدمين حقيقيين — مفيش مجال للكسر",
        "مسارات مكسورة في الحجز والمصادقة والبيانات",
        "مشاكل بيانات قديمة و race conditions في إدارة الحالة",
        "بنية بتخلي أي تغيير مخاطرة"
      ]
    },
    "approach": {
      "body": "أعدت هيكلة التطبيق لطبقات واضحة وقابلة للصيانة الأول، عشان أي إصلاح ينزل في مكان واحد بدل ما يتسرب في كل حتة. بعدها عالجت الأخطاء الوظيفية بشكل منهجي — الحجز، فالمصادقة، فمسارات البيانات — وأعدت بناء طبقة الـ API عشان تتصرف بشكل متسق مع الأخطاء والتحميل.",
      "points": [
        "إعادة تصميم كاملة للكود في طبقات واضحة",
        "معالجة منهجية لأخطاء الحجز والمصادقة والبيانات",
        "طبقة API معاد بناؤها بحالات خطأ وتحميل متسقة",
        "إعادة هيكلة إدارة الحالة للتخلص من الـ race conditions"
      ]
    },
    "delivered": {
      "body": "تطبيق مستقر ومعاد هيكلته بيتصرف بشكل متوقع، وفوقه واجهة أنضف.",
      "points": [
        "كود معاد بناؤه في طبقات قابلة للصيانة",
        "الحجز والمصادقة ومسارات البيانات شغالين باستقرار",
        "سلوك API متسق في الأخطاء والتحميل",
        "تحسين UI/UX لتنقل أسلس وأداء محسوس أسرع"
      ]
    },
    "outcome": {
      "body": "التطبيق شغال على Google Play تحت الباكدج com.medicta. ده مشروعي المرجعي في استلام الأكواد القائمة: تستلم كود إنتاج مش بتاعك وتسيبه أحسن من إعادة كتابته من الصفر.",
      "points": [
        "منشور على Google Play (com.medicta)",
        "منتج قائم اتثبّت من غير إعادة كتابة من الصفر",
        "دليل عملي على القدرة على استلام الأكواد القديمة"
      ]
    }
  }
};

export default content;
