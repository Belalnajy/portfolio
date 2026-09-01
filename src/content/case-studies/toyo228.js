const content = {
  "en": {
    "title": "Toyo228, a B2B Marketplace for Toyota Spare Parts",
    "summary": "A B2B e-commerce platform connecting Toyota spare-parts wholesalers with retail shops. Retailers search hundreds of parts at once by uploading an Excel file; admins, wholesalers and shops each get their own panel.",
    "facts": {
      "role": "Full-stack developer",
      "scope": "Multi-role panels, bulk Excel search, monorepo architecture, auth",
      "audience": "Toyota parts wholesalers and retail shops"
    },
    "challenge": {
      "body": "A retail shop does not order one part at a time — it arrives with a list of hundreds of part numbers and wants prices and availability for all of them. And a marketplace with wholesalers, shops and admins needs each side to see exactly its own world, nothing more.",
      "points": [
        "Bulk ordering: hundreds of part numbers per request",
        "Three very different user types on one platform",
        "Part data and images need serious upload handling",
        "Ownership boundaries between wholesalers must hold"
      ]
    },
    "approach": {
      "body": "I built it as a Turborepo monorepo — Next.js frontend, NestJS backend on PostgreSQL — so frontend and backend share the same TypeScript interfaces and cannot drift apart. Bulk search works by uploading an Excel file against a downloadable template. Authentication uses JWT in httpOnly cookies, with ownership guards on every resource.",
      "points": [
        "Turborepo monorepo with shared TypeScript interfaces",
        "Excel upload pipeline with template downloads",
        "JWT auth in httpOnly cookies plus ownership guards",
        "Server-side image optimization for part galleries"
      ]
    },
    "delivered": {
      "body": "A complete three-sided marketplace with the bulk workflows that B2B parts trading actually needs.",
      "points": [
        "Admin, Wholesaler and Retail Shop dashboards",
        "Bulk part search via Excel file upload",
        "Image gallery with drag-and-drop upload",
        "Secure per-role access with resource ownership checks"
      ]
    },
    "outcome": {
      "body": "The platform is live at toyo228.com, moving parts trading from phone-and-list workflows to a structured online marketplace.",
      "points": [
        "Live at toyo228.com",
        "Bulk trading digitized end to end",
        "One codebase, three user experiences"
      ]
    }
  },
  "ar": {
    "title": "Toyo228، سوق B2B لقطع غيار تويوتا",
    "summary": "منصة تجارة إلكترونية B2B بتربط تجار جملة قطع غيار تويوتا بمحلات التجزئة. المحل بيدور على مئات القطع مرة واحدة برفع ملف Excel، وكل طرف — أدمن وتاجر جملة ومحل — ليه لوحة تحكم خاصة بيه.",
    "facts": {
      "role": "مطور Full-Stack",
      "scope": "لوحات متعددة الأدوار، بحث جماعي بالإكسل، معمارية Monorepo، مصادقة",
      "audience": "تجار جملة قطع غيار تويوتا ومحلات التجزئة"
    },
    "challenge": {
      "body": "محل قطع الغيار مش بيطلب قطعة قطعة — بييجي بقايمة فيها مئات أرقام القطع وعايز الأسعار والتوافر ليهم كلهم. وسوق فيه تجار جملة ومحلات وأدمن محتاج كل طرف يشوف عالمه هو بس، ولا حاجة زيادة.",
      "points": [
        "طلبات جماعية: مئات أرقام القطع في الطلب الواحد",
        "ثلاث أنواع مستخدمين مختلفين تماماً على منصة واحدة",
        "بيانات وصور القطع محتاجة معالجة رفع قوية",
        "حدود الملكية بين تجار الجملة لازم تتحفظ"
      ]
    },
    "approach": {
      "body": "بنيتها كـ Monorepo بـ Turborepo — واجهة Next.js وخلفية NestJS على PostgreSQL — فالواجهة والخلفية بيتشاركوا نفس أنواع TypeScript ومش ممكن يبعدوا عن بعض. البحث الجماعي بيشتغل برفع ملف Excel على قالب جاهز للتحميل. المصادقة بـ JWT في httpOnly cookies، مع حراس ملكية على كل مورد.",
      "points": [
        "Turborepo Monorepo بواجهات TypeScript مشتركة",
        "خط معالجة Excel مع قوالب جاهزة للتحميل",
        "مصادقة JWT في httpOnly cookies مع حراس ملكية",
        "تحسين الصور على السيرفر لمعارض القطع"
      ]
    },
    "delivered": {
      "body": "سوق متكامل بثلاثة أطراف ومعاه دورات العمل الجماعية اللي تجارة قطع الغيار B2B محتاجاها فعلاً.",
      "points": [
        "لوحات تحكم للأدمن وتاجر الجملة ومحل التجزئة",
        "بحث جماعي عن القطع برفع ملف Excel",
        "معرض صور بالسحب والإفلات",
        "وصول آمن لكل دور مع فحص ملكية الموارد"
      ]
    },
    "outcome": {
      "body": "المنصة شغالة على toyo228.com، ونقلت تجارة قطع الغيار من شغل التليفون والقوايم لسوق إلكتروني منظم.",
      "points": [
        "شغالة على toyo228.com",
        "التجارة الجماعية اترقمنت من الأول للآخر",
        "كود واحد، ثلاث تجارب مستخدم"
      ]
    }
  }
};

export default content;
