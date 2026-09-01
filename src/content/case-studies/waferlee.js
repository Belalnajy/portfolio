const content = {
  "en": {
    "title": "Waferlee, a Community-Powered Deals Platform",
    "summary": "A discovery platform where the community submits and votes on deals and coupons, with a custom 'Temperature' algorithm surfacing what is genuinely trending — plus the moderation and anti-abuse layer a voting product needs.",
    "facts": {
      "role": "Full-stack developer",
      "scope": "Voting engine, trending algorithm, submissions, moderation, notifications",
      "audience": "Deal hunters and the community submitting offers"
    },
    "challenge": {
      "body": "A deals site ranked by raw votes gets gamed on day one. The ranking needed to reflect momentum, not just totals — and every community feature (submission, voting, comments) invites abuse, so moderation and bot protection had to be part of the core design, not patches.",
      "points": [
        "Trending must reflect momentum, not raw vote counts",
        "Community submissions need a moderation pipeline",
        "Voting invites bots and manipulation",
        "Users expect to be notified when deals move"
      ]
    },
    "approach": {
      "body": "I built a robust voting engine with a custom 'Temperature' algorithm that weighs votes over time, so fresh momentum beats stale totals. RBAC separates members from moderators, Google ReCAPTCHA guards the interaction points, and automated email flows plus multi-channel notifications keep the community engaged.",
      "points": [
        "Custom 'Temperature' trending algorithm",
        "Real-time voting, submissions and moderation",
        "RBAC plus Google ReCAPTCHA against abuse",
        "Automated email flows and multi-channel notifications"
      ]
    },
    "delivered": {
      "body": "A complete community product: contribution, ranking, moderation and engagement.",
      "points": [
        "Robust voting engine with momentum-based ranking",
        "Deal submission and moderation workflows",
        "Secure interactions with RBAC and ReCAPTCHA",
        "Notification and email engagement flows"
      ]
    },
    "outcome": {
      "body": "Waferlee is live at waferlee.ae — a community platform where the ranking stays honest because the algorithm, moderation and anti-abuse were designed together.",
      "points": [
        "Live at waferlee.ae",
        "Trending feed driven by the Temperature algorithm",
        "Community contribution with protected integrity"
      ]
    }
  },
  "ar": {
    "title": "Waferlee، منصة عروض بتحركها المجتمع",
    "summary": "منصة اكتشاف بيقدّم فيها المجتمع العروض والكوبونات ويصوّت عليها، مع خوارزمية \"Temperature\" مخصصة بتطلّع الرائج فعلاً — ومعاها طبقة الإشراف ومنع التلاعب اللي أي منتج تصويت محتاجها.",
    "facts": {
      "role": "مطور Full-Stack",
      "scope": "محرك تصويت، خوارزمية رواج، تقديم عروض، إشراف، إشعارات",
      "audience": "صايدو العروض والمجتمع اللي بيقدّمها"
    },
    "challenge": {
      "body": "موقع عروض بيترتب بعدد الأصوات الخام بيتلاعب بيه من أول يوم. الترتيب كان لازم يعكس الزخم مش المجاميع — وكل ميزة مجتمعية (تقديم، تصويت، تعليقات) بتفتح باب إساءة استخدام، فالإشراف وحماية البوتات كان لازم يكونوا جزء من التصميم الأساسي مش ترقيعات.",
      "points": [
        "الرواج لازم يعكس الزخم مش عدد الأصوات الخام",
        "تقديمات المجتمع محتاجة خط إشراف",
        "التصويت بيجذب البوتات والتلاعب",
        "المستخدمين متوقعين إشعارات لما العروض تتحرك"
      ]
    },
    "approach": {
      "body": "بنيت محرك تصويت قوي بخوارزمية \"Temperature\" مخصصة بتوزن الأصوات مع الوقت، فالزخم الجديد بيكسب المجاميع القديمة. نظام RBAC بيفصل الأعضاء عن المشرفين، و Google ReCAPTCHA بيحمي نقاط التفاعل، ومسارات إيميل مؤتمتة وإشعارات متعددة القنوات بتحافظ على تفاعل المجتمع.",
      "points": [
        "خوارزمية رواج \"Temperature\" مخصصة",
        "تصويت وتقديم وإشراف لحظي",
        "RBAC + Google ReCAPTCHA ضد إساءة الاستخدام",
        "مسارات إيميل مؤتمتة وإشعارات متعددة القنوات"
      ]
    },
    "delivered": {
      "body": "منتج مجتمعي متكامل: مساهمة، ترتيب، إشراف، وتفاعل.",
      "points": [
        "محرك تصويت قوي بترتيب مبني على الزخم",
        "دورات عمل تقديم العروض والإشراف عليها",
        "تفاعلات آمنة بـ RBAC و ReCAPTCHA",
        "مسارات إشعارات وإيميلات للتفاعل"
      ]
    },
    "outcome": {
      "body": "Waferlee شغالة على waferlee.ae — منصة مجتمعية الترتيب فيها بيفضل نضيف لأن الخوارزمية والإشراف ومنع التلاعب اتصمموا مع بعض.",
      "points": [
        "شغالة على waferlee.ae",
        "خلاصة رائجة بتحركها خوارزمية Temperature",
        "مساهمة مجتمعية بنزاهة محمية"
      ]
    }
  }
};

export default content;
