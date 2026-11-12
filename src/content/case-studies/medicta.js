const content = {
  "en": {
    "title": "Medicta, a Healthcare Booking App I Took Over, Rebuilt and Keep Developing",
    "summary": "Medicta lets patients in Saudi Arabia book doctors, radiology, lab tests and medical offers, then pay online. I took over its React Native app in mid-2026 from another developer, while it was live on Google Play. Since then I have redesigned it screen by screen, rebuilt its booking and payment flows, brought it to the App Store, and kept shipping new versions with the client in regular rounds of notes.",
    "facts": {
      "role": "Lead mobile developer (React Native)",
      "scope": "Takeover, full redesign, booking and payment flows, Android and iOS releases, ongoing development",
      "audience": "Patients booking doctors, scans, lab tests and offers in Saudi Arabia"
    },
    "challenge": {
      "body": "The app was already in users' hands, but it came without a proper handover: an old design, fragile flows, and a codebase that made every change risky. The client wanted a completely new look, an iPhone version, and a backend that kept evolving underneath the app, all without ever taking the product offline. The work had to move forward feature by feature while staying shippable every week.",
      "points": [
        "A live app inherited from another developer, with no handover",
        "A full redesign while real users kept booking",
        "Android only at the start; iPhone needed too",
        "A backend changing alongside the app"
      ]
    },
    "approach": {
      "body": "I started with a design system: theme tokens, an icon set and shared UI components, then redesigned the app on top of it, from splash and login to home, search, booking, cart and account. I work in rounds with the client: they send notes and screenshots, I fix and build a test version on the test server, they try it, and only then it goes to the stores. Test and production builds are kept separate. On the backend side I document every endpoint the app uses and send the backend team clear requests, so the app and the server move together.",
      "points": [
        "Design system first, then every screen rebuilt on it",
        "Rounds of client notes, each ending with a test build",
        "Separate test and production servers and builds",
        "Close coordination with the backend team, with a full API inventory"
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
        "Doctor and offer links from medicta.com that open straight in the app",
        "iOS builds and App Store releases from Linux through Codemagic and the App Store Connect API"
      ]
    },
    "outcome": {
      "body": "Medicta is live on Google Play and the App Store, released from this codebase since October 2026. Over five months the project has grown to more than 400 commits, and I keep developing it with the client on a monthly basis. It is my reference for taking over production code and growing it instead of rewriting it.",
      "points": [
        "Live on Google Play and the App Store (com.medicta)",
        "Fully redesigned, in Arabic and English",
        "More than 400 commits since the takeover",
        "Ongoing development with the client"
      ]
    }
  },
  "ar": {
    "title": "Medicta، تطبيق حجز طبي استلمته وعدت بناءه ولسه بطوّره",
    "summary": "Medicta تطبيق بيحجز منه المرضى في السعودية دكاترة وأشعة وتحاليل وعروض طبية ويدفعوا أونلاين. استلمت كود التطبيق (React Native) في نص 2026 من مطوّر تاني، وهو شغال فعلًا على Google Play. ومن ساعتها عدت تصميمه شاشة شاشة، وبنيت مسارات الحجز والدفع من جديد، ونزّلته على الآب ستور، ولسه بنزّل نسخ جديدة مع العميل في جولات ملاحظات منتظمة.",
    "facts": {
      "role": "مطوّر الموبايل الأساسي (React Native)",
      "scope": "استلام المشروع، إعادة تصميم كاملة، مسارات الحجز والدفع، إصدارات أندرويد وآيفون، تطوير مستمر",
      "audience": "مرضى بيحجزوا دكاترة وأشعة وتحاليل وعروض في السعودية"
    },
    "challenge": {
      "body": "التطبيق كان في إيد المستخدمين فعلًا، بس اتسلّم من غير تسليم حقيقي: تصميم قديم، ومسارات هشة، وكود أي تعديل فيه مخاطرة. والعميل كان عايز شكل جديد خالص، ونسخة آيفون، وباك إند بيتطوّر تحت التطبيق في نفس الوقت، وكل ده من غير ما التطبيق يقف. فالشغل لازم يمشي ميزة ميزة، والتطبيق يفضل جاهز للرفع كل أسبوع.",
      "points": [
        "تطبيق شغال استلمته من مطوّر تاني من غير تسليم",
        "إعادة تصميم كاملة والمستخدمين بيحجزوا عادي",
        "أندرويد بس في الأول، والآيفون مطلوب كمان",
        "باك إند بيتغيّر مع التطبيق"
      ]
    },
    "approach": {
      "body": "بدأت بـ design system: ألوان ومقاسات موحّدة، ومجموعة أيقونات، ومكوّنات مشتركة، وبعدين عدت تصميم التطبيق عليه، من شاشة البداية وتسجيل الدخول للرئيسية والبحث والحجز والسلة والحساب. والشغل مع العميل ماشي بجولات: يبعت ملاحظات وصور، أصلّح وأعمل نسخة اختبار على سيرفر الاختبار، يجرّبها، وبعدها بس تنزل على المتجر. ونسخ الاختبار والإنتاج منفصلين. ومن ناحية الباك إند بوثّق كل endpoint التطبيق بيستخدمه، وببعت لفريق الباك إند طلبات واضحة، عشان التطبيق والسيرفر يمشوا مع بعض.",
      "points": [
        "design system الأول، وبعدين كل شاشة اتبنت عليه",
        "جولات ملاحظات من العميل، كل جولة بتخلص بنسخة اختبار",
        "سيرفر ونسخ اختبار منفصلين عن الإنتاج",
        "تنسيق قريب مع فريق الباك إند، بجرد كامل للـ API"
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
        "روابط الدكاترة والعروض من medicta.com بتفتح في التطبيق على طول",
        "بيلد الآيفون والرفع للآب ستور من لينكس عن طريق Codemagic مع App Store Connect API"
      ]
    },
    "outcome": {
      "body": "Medicta شغال على Google Play والآب ستور، وبينزل من الكود ده من أكتوبر 2026. وفي خمس شهور المشروع وصل لأكتر من 400 commit، ولسه بطوّره مع العميل بشكل شهري. وبقى مشروعي المرجعي في استلام كود شغال فعلًا وتطويره بدل ما يتكتب من الأول.",
      "points": [
        "منشور على Google Play والآب ستور (com.medicta)",
        "تصميم جديد بالكامل، بالعربي والإنجليزي",
        "أكتر من 400 commit من ساعة الاستلام",
        "التطوير مستمر مع العميل"
      ]
    }
  }
};

export default content;
