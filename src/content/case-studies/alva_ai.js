const content = {
  "en": {
    "title": "Alva AI, Marketing Content That Sounds Saudi",
    "summary": "An AI-powered marketing automation platform generating localized content for Saudi social media markets — TikTok, Instagram, X, Snapchat and WhatsApp — using GPT-4o-mini with real-time hashtag enrichment.",
    "facts": {
      "role": "Full-stack developer",
      "scope": "AI content pipeline, localization prompts, enrichment, subscriptions",
      "audience": "Marketers targeting Saudi social audiences"
    },
    "challenge": {
      "body": "Generic AI content is instantly recognizable in Saudi feeds — the dialect is wrong, the references are wrong, the hashtags are stale. The platform had to generate content that sounds genuinely Saudi, per platform, and stay current with what is actually trending — while metering usage per subscription.",
      "points": [
        "Saudi colloquial Arabic, not textbook Arabic",
        "Five platforms with different content norms",
        "Hashtags must reflect live trends",
        "Usage metered by subscription tier"
      ]
    },
    "approach": {
      "body": "The generation pipeline runs GPT-4o-mini behind advanced prompt engineering tuned for Saudi colloquial Arabic, with per-platform templates for TikTok, Instagram, X, Snapchat and WhatsApp. SerpAPI enrichment injects live hashtag data, and a layered Node.js backend enforces subscription-based entitlements and throttling.",
      "points": [
        "GPT-4o-mini with Saudi-dialect prompt engineering",
        "Per-platform content generation",
        "Real-time hashtag enrichment via SerpAPI",
        "Layered backend with entitlements and throttling"
      ]
    },
    "delivered": {
      "body": "A content machine tuned to one market done properly.",
      "points": [
        "AI content for five social platforms",
        "Localized Saudi colloquial output",
        "Live-trend hashtag enrichment",
        "Subscription and quota management"
      ]
    },
    "outcome": {
      "body": "Alva shows the difference between calling an AI API and building an AI product: localization, enrichment and commercial controls layered around the model.",
      "points": [
        "Localization as a real engineering problem, solved",
        "Live market signals in every generation",
        "Commercially metered AI usage"
      ]
    }
  },
  "ar": {
    "title": "Alva AI، محتوى تسويقي بيتكلم سعودي بجد",
    "summary": "منصة أتمتة تسويق بالذكاء الاصطناعي بتولّد محتوى معرّب للسوق السعودي على السوشيال — TikTok و Instagram و X و Snapchat و WhatsApp — باستخدام GPT-4o-mini مع إثراء هاشتاجات لحظي.",
    "facts": {
      "role": "مطور Full-Stack",
      "scope": "خط محتوى AI، برومبتات تعريب، إثراء، اشتراكات",
      "audience": "مسوّقون بيستهدفوا الجمهور السعودي"
    },
    "challenge": {
      "body": "محتوى الـ AI العام بيتعرف فوراً في الفيدات السعودية — اللهجة غلط والمراجع غلط والهاشتاجات بايتة. المنصة كان لازم تولّد محتوى فعلاً بيحس سعودي، لكل منصة بمعاييرها، ويفضل مواكب للرائج فعلياً — مع تقنين الاستخدام حسب الاشتراك.",
      "points": [
        "عامية سعودية مش عربي كتب",
        "خمس منصات بأعراف محتوى مختلفة",
        "الهاشتاجات لازم تعكس الترند الحي",
        "الاستخدام مُقنَّن حسب فئة الاشتراك"
      ]
    },
    "approach": {
      "body": "خط التوليد بيشغّل GPT-4o-mini ورا هندسة برومبتات متقدمة متظبطة للعامية السعودية، بقوالب لكل منصة من TikTok لـ WhatsApp. إثراء SerpAPI بيحقن بيانات هاشتاجات حية، وباك إند Node.js طبقي بيفرض صلاحيات الاشتراكات والـ throttling.",
      "points": [
        "GPT-4o-mini بهندسة برومبتات باللهجة السعودية",
        "توليد محتوى مخصص لكل منصة",
        "إثراء هاشتاجات لحظي عبر SerpAPI",
        "باك إند طبقي بصلاحيات وتقنين استخدام"
      ]
    },
    "delivered": {
      "body": "ماكينة محتوى متظبطة لسوق واحد متعمول صح.",
      "points": [
        "محتوى AI لخمس منصات سوشيال",
        "مخرجات معرّبة بالعامية السعودية",
        "إثراء هاشتاجات من الترند الحي",
        "إدارة اشتراكات وحصص استخدام"
      ]
    },
    "outcome": {
      "body": "Alva بتوضح الفرق بين إنك تنادي API ذكاء اصطناعي وإنك تبني منتج ذكاء اصطناعي: تعريب وإثراء وتحكمات تجارية متلفّفة حوالين الموديل.",
      "points": [
        "التعريب كمشكلة هندسية حقيقية، متحلّة",
        "إشارات سوق حية في كل توليدة",
        "استخدام AI مُقنَّن تجارياً"
      ]
    }
  }
};

export default content;
