const content = {
  "en": {
    "title": "Pro Fleet, an Intelligent Fleet Management Platform",
    "summary": "A multilingual fleet management platform built for a Saudi startup: real-time GPS tracking on interactive maps, role-based dashboards, automated billing, and live shipment tracking, with full Arabic RTL support.",
    "facts": {
      "role": "Full-stack developer",
      "scope": "Real-time tracking, role-based dashboards, billing, shipment operations",
      "audience": "Fleet operators, drivers and administrators of a Saudi startup"
    },
    "challenge": {
      "body": "Running a fleet without live visibility means finding out about problems after they happen. The client needed real-time positions on a map, dashboards cut per role, billing that runs itself, and an interface that works in Arabic RTL as naturally as in English.",
      "points": [
        "Live GPS visibility across the whole fleet",
        "Different roles need different dashboards",
        "Billing and payments should run automatically",
        "Arabic RTL as a first-class experience"
      ]
    },
    "approach": {
      "body": "The platform is built on Next.js and TypeScript with Prisma on PostgreSQL. Live positions stream over Socket.io onto interactive Leaflet maps, and every dashboard is scoped by role. An AI chatbot assists users inside the product.",
      "points": [
        "Next.js, TypeScript, Prisma, PostgreSQL",
        "Socket.io streaming onto interactive Leaflet maps",
        "Role-scoped dashboards and analytics",
        "AI chatbot for smart user assistance"
      ]
    },
    "delivered": {
      "body": "An operations platform that covers the fleet lifecycle: where every vehicle is now, who may see and do what, and how the money side runs.",
      "points": [
        "Real-time GPS tracking with interactive maps",
        "Role-based dashboards and analytics",
        "Automated billing and payment processing",
        "Live shipment tracking and fleet operations management",
        "Multilingual UI with full Arabic RTL"
      ]
    },
    "outcome": {
      "body": "Delivered for a Saudi startup as a complete, multilingual fleet platform — one of the data-heavy, real-time systems I build for Gulf clients.",
      "points": [
        "Built end-to-end for a Saudi startup",
        "Real-time from GPS to notifications",
        "Fully bilingual with Arabic RTL throughout"
      ]
    }
  },
  "ar": {
    "title": "Pro Fleet، منصة ذكية لإدارة الأساطيل",
    "summary": "منصة متعددة اللغات لإدارة الأساطيل مبنية لشركة ناشئة سعودية: تتبع GPS لحظي على خرائط تفاعلية، لوحات تحكم قائمة على الأدوار، فوترة مؤتمتة، وتتبع مباشر للشحنات، مع دعم كامل للـ RTL العربي.",
    "facts": {
      "role": "مطور Full-Stack",
      "scope": "تتبع لحظي، لوحات تحكم بالأدوار، فوترة، عمليات الشحن",
      "audience": "مشغلو الأسطول والسائقون والإداريون في شركة ناشئة سعودية"
    },
    "challenge": {
      "body": "إدارة أسطول من غير رؤية لحظية معناها إنك بتعرف بالمشكلة بعد ما تحصل. العميل كان محتاج مواقع مباشرة على الخريطة، ولوحات تحكم مفصّلة حسب الدور، وفوترة تشتغل لوحدها، وواجهة تشتغل بالعربي RTL بنفس سلاسة الإنجليزي.",
      "points": [
        "رؤية GPS مباشرة للأسطول كله",
        "كل دور محتاج لوحة تحكم مختلفة",
        "الفوترة والمدفوعات تشتغل أوتوماتيكياً",
        "العربي RTL كتجربة أساسية مش ثانوية"
      ]
    },
    "approach": {
      "body": "المنصة مبنية على Next.js و TypeScript مع Prisma على PostgreSQL. المواقع اللحظية بتتدفق عبر Socket.io على خرائط Leaflet تفاعلية، وكل لوحة تحكم محددة النطاق حسب الدور، ومعاها شات بوت ذكاء اصطناعي بيساعد المستخدمين جوه المنتج.",
      "points": [
        "Next.js و TypeScript و Prisma و PostgreSQL",
        "Socket.io يبث على خرائط Leaflet تفاعلية",
        "لوحات تحكم وتحليلات محددة حسب الدور",
        "شات بوت ذكاء اصطناعي لمساعدة المستخدمين"
      ]
    },
    "delivered": {
      "body": "منصة تشغيلية بتغطي دورة حياة الأسطول: كل عربية فين دلوقتي، ومين يشوف ويعمل إيه، والجانب المالي بيمشي إزاي.",
      "points": [
        "تتبع GPS لحظي مع خرائط تفاعلية",
        "لوحات تحكم وتحليلات قائمة على الأدوار",
        "فوترة مؤتمتة ومعالجة للمدفوعات",
        "تتبع مباشر للشحنات وإدارة عمليات الأسطول",
        "واجهة متعددة اللغات مع RTL عربي كامل"
      ]
    },
    "outcome": {
      "body": "اتسلّمت لشركة ناشئة سعودية كمنصة أسطول متكاملة متعددة اللغات — واحدة من الأنظمة اللحظية الغنية بالبيانات اللي ببنيها لعملاء الخليج.",
      "points": [
        "مبنية بالكامل لشركة ناشئة سعودية",
        "لحظية من الـ GPS للإشعارات",
        "ثنائية اللغة بالكامل مع RTL عربي في كل مكان"
      ]
    }
  }
};

export default content;
