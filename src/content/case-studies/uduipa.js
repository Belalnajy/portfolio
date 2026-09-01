const content = {
  "en": {
    "title": "UDUIPA, the Official Digital Platform of a University Union",
    "summary": "The official academic union platform at uduipa.com: centralized membership management, automated verification workflows, and document generation, delivered as a high-performance monorepo in three languages.",
    "facts": {
      "role": "Full-stack developer",
      "scope": "Membership management, automated verification, document pipelines",
      "audience": "Union members and administrators"
    },
    "challenge": {
      "body": "An official academic union needs one trustworthy registry of its members, a way to verify credentials that outsiders can rely on, and official documents issued consistently rather than assembled by hand. Everything had to work in Arabic, English and French, with Arabic RTL as a first-class citizen.",
      "points": [
        "One authoritative membership registry",
        "Verification that third parties can trust",
        "Official documents issued automatically, not by hand",
        "Three languages including full Arabic RTL"
      ]
    },
    "approach": {
      "body": "I built it as a Turborepo monorepo with Next.js and NestJS on PostgreSQL, so the member portal and the admin side share types and logic. A scalable RBAC system with secure JWT authentication separates member, staff and admin capabilities, and document generation is fully automated with Puppeteer-driven PDFs and QR codes.",
      "points": [
        "Turborepo monorepo: Next.js, NestJS, PostgreSQL",
        "Scalable RBAC with secure JWT authentication",
        "Automated PDF generation with QR verification codes",
        "Analytics built in from the start"
      ]
    },
    "delivered": {
      "body": "A production platform that manages memberships centrally and turns verification into an automated workflow instead of an office queue.",
      "points": [
        "Centralized membership management",
        "Official academic verification workflows",
        "Automated document pipelines with PDF and QR generation",
        "Fully localized RTL UI in Arabic, English and French",
        "Analytics dashboards for administrators"
      ]
    },
    "outcome": {
      "body": "The platform is live at uduipa.com as the union's official system. It is my reference project for reliable, large-scale production systems built for academic institutions.",
      "points": [
        "Live in production at uduipa.com",
        "The union's official digital platform",
        "Verification and document issuing fully automated"
      ]
    }
  },
  "ar": {
    "title": "UDUIPA، المنصة الرقمية الرسمية لاتحاد جامعي",
    "summary": "المنصة الرسمية للاتحاد الأكاديمي على uduipa.com: إدارة مركزية للعضويات، ودورات تحقق مؤتمتة، وتوليد مستندات رسمية — مبنية كـ Monorepo عالي الأداء بثلاث لغات.",
    "facts": {
      "role": "مطور Full-Stack",
      "scope": "إدارة العضويات، التحقق المؤتمت، دورات معالجة المستندات",
      "audience": "أعضاء الاتحاد والإداريون"
    },
    "challenge": {
      "body": "الاتحاد الأكاديمي الرسمي محتاج سجل واحد موثوق لأعضائه، وطريقة للتحقق من العضويات تقدر أي جهة خارجية تعتمد عليها، ومستندات رسمية تصدر بشكل موحد مش تتجمع يدوياً. وكل ده لازم يشتغل بالعربي والإنجليزي والفرنساوي، مع الـ RTL العربي كأولوية مش إضافة.",
      "points": [
        "سجل عضويات واحد موثوق",
        "تحقق تقدر الجهات الخارجية تعتمد عليه",
        "مستندات رسمية تصدر أوتوماتيكياً مش يدوياً",
        "ثلاث لغات مع دعم كامل للـ RTL العربي"
      ]
    },
    "approach": {
      "body": "بنيتها كـ Monorepo بـ Turborepo مع Next.js و NestJS على PostgreSQL، فبوابة الأعضاء ولوحة الإدارة بيتشاركوا نفس الأنواع والمنطق. نظام صلاحيات RBAC واسع النطاق مع مصادقة JWT آمنة بيفصل صلاحيات العضو والموظف والأدمن، وتوليد المستندات مؤتمت بالكامل بـ PDF عبر Puppeteer ورموز QR.",
      "points": [
        "Turborepo Monorepo: Next.js و NestJS و PostgreSQL",
        "نظام RBAC واسع النطاق مع مصادقة JWT آمنة",
        "توليد PDF مؤتمت مع رموز QR للتحقق",
        "التحليلات مدمجة من البداية"
      ]
    },
    "delivered": {
      "body": "منصة إنتاجية بتدير العضويات مركزياً وبتحوّل التحقق لدورة عمل مؤتمتة بدل طابور في مكتب.",
      "points": [
        "إدارة مركزية للعضويات",
        "دورات تحقق أكاديمي رسمية",
        "دورات مستندات مؤتمتة بتوليد PDF ورموز QR",
        "واجهة كاملة الترجمة بالعربي والإنجليزي والفرنساوي مع RTL",
        "لوحات تحليلات للإداريين"
      ]
    },
    "outcome": {
      "body": "المنصة شغالة فعلياً على uduipa.com كالنظام الرسمي للاتحاد، وهي مشروعي المرجعي للأنظمة الإنتاجية الكبيرة الموثوقة المبنية للمؤسسات الأكاديمية.",
      "points": [
        "تعمل فعلياً على uduipa.com",
        "المنصة الرقمية الرسمية للاتحاد",
        "التحقق وإصدار المستندات مؤتمت بالكامل"
      ]
    }
  }
};

export default content;
