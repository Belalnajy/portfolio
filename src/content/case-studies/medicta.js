const content = {
  "en": {
    "title": "Medicta, a Healthcare Booking App Taken Over, Redesigned and Shipped to Both Stores",
    "summary": "A React Native app for patients in Saudi Arabia to book doctors, radiology and lab tests, and medical offers, then pay online. I took over a live Android app from another developer, recovered what was missing to build it, redesigned the whole booking experience, and shipped it to Google Play and the App Store. I am still developing it with the client.",
    "facts": {
      "role": "Mobile developer: takeover, redesign and releases",
      "scope": "React Native app (Android and iOS), store releases, iOS CI, backend coordination",
      "audience": "Patients booking doctors, scans, lab tests and offers in Saudi Arabia"
    },
    "challenge": {
      "body": "The app was live on Google Play with real users, but the handover was incomplete: the iOS project was not in the repository, the key Google Play expected for updates was lost, and Play was blocking releases over a background-location permission the app did not need. On top of that the booking flows were fragile, pages waited on slow services, and the client had a new design to roll out. The work had to happen without taking the product offline.",
      "points": [
        "Live app with real users and no access to the original developer",
        "No iOS project in the repo and a lost Play upload key",
        "Store policy blocks on permissions and target API",
        "Slow screens and broken flows across booking, payment and accounts"
      ]
    },
    "approach": {
      "body": "First I made the app releasable again: a reset Play upload key, the iOS project restored from the client's files, and iOS builds on Codemagic cloud Macs signed through the App Store Connect API, so no Mac or personal Apple ID was needed. Store submissions are scripted through the same API. Then I rebuilt the booking flow from the client's new design, screen by screen, while fixing flows on the live server. For speed, I measured every endpoint the app calls, stopped the home screen waiting on slow ones, cached what rarely changes, and handed the backend team an API inventory and a performance report to fix the rest.",
      "points": [
        "iOS builds and App Store submissions from Linux via Codemagic and the App Store Connect API",
        "New booking design rolled out across doctors, centres, labs and offers",
        "Endpoint-by-endpoint performance report shared with the backend team",
        "Separate test and production builds, every release tested by the client first"
      ]
    },
    "delivered": {
      "body": "One app, in Arabic and English, that covers the full booking journey from search to payment and follow-up.",
      "points": [
        "Doctor search by specialty with daily time slots and the nearest branch picked by location",
        "Radiology and lab test booking, and medical offers with per-branch prices",
        "Cart with several bookings at once and online card payment",
        "Wallet, account statement and refunds back to the original payment method",
        "Booking for family members, modifying or cancelling a booking, and sharing it as a PDF",
        "Push notifications, ratings, favourites and service texts rendered from the admin editor",
        "Doctor and offer links from medicta.com open straight in the app on Android and iPhone",
        "In-app prompt to update when a newer version is required"
      ]
    },
    "outcome": {
      "body": "Medicta is live on Google Play and the App Store, released from this codebase in regular versions since October 2026. I still work with the client on new rounds of notes and releases, and the app has become my reference for taking over production code and leaving it better than a rewrite would.",
      "points": [
        "Live on Google Play and the App Store (com.medicta)",
        "Regular releases on both stores since October 2026",
        "The slowest list went from about 12.5 s to under a second after the backend fixes from the report",
        "Ongoing development with the client"
      ]
    }
  },
  "ar": {
    "title": "Medicta، تطبيق حجز طبي استلمته وعدت تصميمه ونزّلته على المتجرين",
    "summary": "تطبيق React Native للمرضى في السعودية، بيحجزوا منه دكاترة وأشعة وتحاليل وعروض طبية ويدفعوا أونلاين. استلمت التطبيق وهو شغال على Google Play من مطوّر تاني، ورجّعت الحاجات الناقصة عشان يتبني، وعدت تصميم تجربة الحجز كلها، ونزّلته على Google Play والآب ستور. ولسه شغال معاهم على تطويره.",
    "facts": {
      "role": "مطوّر موبايل: استلام وإعادة تصميم وإصدارات",
      "scope": "تطبيق React Native (أندرويد وآيفون)، الرفع على المتجرين، CI للآيفون، تنسيق مع الباك إند",
      "audience": "مرضى بيحجزوا دكاترة وأشعة وتحاليل وعروض في السعودية"
    },
    "challenge": {
      "body": "التطبيق كان شغال على Google Play وعليه مستخدمين، بس التسليم كان ناقص: مشروع الآيفون مش موجود في الـ repo، ومفتاح الرفع اللي جوجل بلاي مستنياه ضايع، وجوجل كانت موقفة أي تحديث بسبب صلاحية موقع في الخلفية التطبيق مش محتاجها أصلًا. وفوق ده، مسارات الحجز كانت هشة، والصفحات بتستنى خدمات بطيئة، والعميل عنده تصميم جديد عايز ينزل. وكل ده لازم يتعمل من غير ما التطبيق يقف.",
      "points": [
        "تطبيق شغال بمستخدمين حقيقيين، ومفيش تواصل مع المطوّر الأصلي",
        "مفيش مشروع آيفون في الـ repo، ومفتاح الرفع على جوجل ضايع",
        "سياسات المتجر موقفة الإصدارات بسبب الصلاحيات ونسخة الـ API",
        "صفحات بطيئة ومسارات بايظة في الحجز والدفع والحسابات"
      ]
    },
    "approach": {
      "body": "الأول رجّعت التطبيق قابل للرفع: مفتاح رفع جديد على جوجل بلاي، ومشروع الآيفون رجع من ملفات العميل، وبيلد الآيفون بقى على أجهزة ماك في Codemagic وبيتوقّع من خلال App Store Connect API، فمش محتاج ماك ولا Apple ID شخصي. والرفع للمراجعة نفسه بقى سكريبت على نفس الـ API. بعدها بنيت مسار الحجز من التصميم الجديد صفحة صفحة، وأنا بصلّح المسارات على السيرفر الحقيقي. وعشان السرعة، قست كل endpoint التطبيق بيكلمه، وخليت الرئيسية متستناش البطيء منهم، وعملت كاش للحاجات اللي مش بتتغير كتير، وسلّمت فريق الباك إند جرد كامل للـ API وتقرير أداء يصلّحوا بيه الباقي.",
      "points": [
        "بيلد الآيفون والرفع للآب ستور من لينكس عن طريق Codemagic وApp Store Connect API",
        "التصميم الجديد للحجز نزل على الدكاترة والمراكز والتحاليل والعروض",
        "تقرير أداء لكل endpoint اتسلّم لفريق الباك إند",
        "نسخة اختبار ونسخة إنتاج منفصلين، وكل إصدار العميل بيجرّبه الأول"
      ]
    },
    "delivered": {
      "body": "تطبيق واحد بالعربي والإنجليزي، بيغطّي رحلة الحجز كلها من البحث للدفع والمتابعة.",
      "points": [
        "البحث عن دكتور بالتخصص بمواعيد كل يوم، وأقرب فرع بيتختار حسب الموقع",
        "حجز الأشعة والتحاليل، وعروض طبية بسعر كل فرع",
        "سلة فيها كذا حجز مع بعض ودفع أونلاين بالكارت",
        "محفظة وكشف حساب واسترداد المبلغ لنفس طريقة الدفع",
        "الحجز لأفراد العيلة، وتعديل الحجز أو إلغاؤه، ومشاركته PDF",
        "إشعارات وتقييمات ومفضلة، ونصوص الخدمات بتتعرض زي ما بتتكتب في لوحة التحكم",
        "روابط الدكاترة والعروض من medicta.com بتفتح في التطبيق على الأندرويد والآيفون",
        "التطبيق بيطلب التحديث لوحده لما تنزل نسخة لازمة"
      ]
    },
    "outcome": {
      "body": "Medicta شغال على Google Play والآب ستور، وبينزل من الكود ده في إصدارات منتظمة من أكتوبر 2026. ولسه شغال مع العميل على جولات ملاحظات وإصدارات جديدة، والتطبيق بقى مشروعي المرجعي في استلام كود شغال فعلًا وإني أسيبه أحسن مما كانت إعادة الكتابة هتعمله.",
      "points": [
        "منشور على Google Play والآب ستور (com.medicta)",
        "إصدارات منتظمة على المتجرين من أكتوبر 2026",
        "أبطأ قائمة نزلت من حوالي 12.5 ثانية لأقل من ثانية بعد تصليحات الباك إند من التقرير",
        "التطوير مستمر مع العميل"
      ]
    }
  }
};

export default content;
