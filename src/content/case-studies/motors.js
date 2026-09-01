const content = {
  "en": {
    "title": "Motors, an Arabic-First Car Marketplace for Saudi Arabia",
    "summary": "A full-stack Arabic marketplace for buying and selling new, used and damaged vehicles: advanced search filters, seller dashboards, multi-photo listings and direct WhatsApp contact between buyer and seller.",
    "facts": {
      "role": "Full-stack developer",
      "scope": "Listings and search, seller dashboards, media uploads, WhatsApp contact",
      "audience": "Car buyers and sellers in the Saudi market"
    },
    "challenge": {
      "body": "Car shoppers filter hard — brand, price, fuel type, condition — and a listing lives or dies by its photos. Sellers need to manage their own listings without support tickets, and in the Saudi market the deal usually closes on WhatsApp, so the platform had to lead buyers straight there.",
      "points": [
        "Search that handles brand, price, fuel type and condition",
        "Sellers manage their own listings end to end",
        "Multi-photo galleries with a primary image",
        "WhatsApp as the closing channel, built in"
      ]
    },
    "approach": {
      "body": "Next.js on the front, NestJS with TypeORM on PostgreSQL behind it, all in TypeScript. Uploads run through Multer into galleries with primary-image selection. The design is RTL-first with a dark theme tuned for the Saudi market, and every listing carries a direct WhatsApp deep link to its seller.",
      "points": [
        "Next.js + NestJS + TypeORM + PostgreSQL, all TypeScript",
        "Multer-powered multi-photo upload with primary selection",
        "RTL-first dark theme for the Saudi market",
        "WhatsApp deep links on every listing"
      ]
    },
    "delivered": {
      "body": "A complete marketplace covering the listing lifecycle from creation to contact.",
      "points": [
        "Advanced vehicle filtering by brand, price, fuel type and condition",
        "User dashboard with full CRUD over listings",
        "Image gallery with multi-photo upload",
        "Direct buyer-to-seller WhatsApp integration"
      ]
    },
    "outcome": {
      "body": "Motors is live at motorksa.org, an Arabic-first marketplace where the entire experience — from filters to the final WhatsApp message — matches how the Saudi market actually buys cars.",
      "points": [
        "Live at motorksa.org",
        "Covers new, used and damaged vehicle segments",
        "Buyer-to-seller contact built around WhatsApp"
      ]
    }
  },
  "ar": {
    "title": "Motors، سوق سيارات بالعربي أولاً للسعودية",
    "summary": "سوق عربي متكامل لبيع وشراء السيارات الجديدة والمستعملة والمصدومة: فلاتر بحث متقدمة، لوحات تحكم للبايعين، إعلانات بصور متعددة، وتواصل مباشر بين المشتري والبايع على WhatsApp.",
    "facts": {
      "role": "مطور Full-Stack",
      "scope": "الإعلانات والبحث، لوحات البايعين، رفع الوسائط، تواصل WhatsApp",
      "audience": "مشترو وبايعو السيارات في السوق السعودي"
    },
    "challenge": {
      "body": "مشتري العربيات بيفلتر بقوة — ماركة وسعر ونوع وقود وحالة — والإعلان بيعيش أو يموت بصوره. البايع محتاج يدير إعلاناته بنفسه من غير تذاكر دعم، وفي السوق السعودي الصفقة غالباً بتقفل على WhatsApp، فالمنصة كان لازم توصّل المشتري هناك على طول.",
      "points": [
        "بحث بيتعامل مع الماركة والسعر ونوع الوقود والحالة",
        "البايع بيدير إعلاناته بنفسه من الأول للآخر",
        "معارض صور متعددة بصورة رئيسية",
        "الـ WhatsApp كقناة إقفال الصفقة، مبني جوه المنصة"
      ]
    },
    "approach": {
      "body": "واجهة Next.js وخلفية NestJS مع TypeORM على PostgreSQL، وكله TypeScript. الرفع بيمشي عبر Multer لمعارض باختيار صورة رئيسية. التصميم RTL أولاً بثيم داكن متظبط للسوق السعودي، وكل إعلان معاه لينك WhatsApp مباشر للبايع.",
      "points": [
        "Next.js + NestJS + TypeORM + PostgreSQL بالكامل TypeScript",
        "رفع صور متعددة عبر Multer باختيار الصورة الرئيسية",
        "ثيم داكن RTL أولاً للسوق السعودي",
        "لينكات WhatsApp مباشرة على كل إعلان"
      ]
    },
    "delivered": {
      "body": "سوق متكامل بيغطي دورة حياة الإعلان من الإنشاء للتواصل.",
      "points": [
        "فلترة متقدمة بالماركة والسعر ونوع الوقود والحالة",
        "لوحة تحكم للمستخدم بعمليات CRUD كاملة على الإعلانات",
        "معرض صور برفع متعدد",
        "تكامل WhatsApp مباشر بين المشتري والبايع"
      ]
    },
    "outcome": {
      "body": "Motors شغالة على motorksa.org — سوق عربي أولاً، التجربة فيه كلها من الفلاتر لرسالة الـ WhatsApp الأخيرة ماشية مع الطريقة اللي السوق السعودي فعلاً بيشتري بيها عربيات.",
      "points": [
        "شغال على motorksa.org",
        "بيغطي الجديد والمستعمل والمصدوم",
        "التواصل مبني حوالين WhatsApp"
      ]
    }
  }
};

export default content;
