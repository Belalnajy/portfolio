const content = {
  "en": {
    "title": "Bilqalam Institute, an Online Academy Built and Run by One Developer",
    "summary": "A production learning platform for an institute teaching Qur’an, Arabic and Islamic studies online, serving thousands of enrolled students. I am the sole developer on it.",
    "facts": {
      "role": "Sole developer, built and maintained alone",
      "scope": "Enrollment and student management, billing and invoicing, admin reporting",
      "audience": "Thousands of enrolled students"
    },
    "challenge": {
      "body": "An institute at this size cannot run on spreadsheets and chat messages. It needs to enroll students, track who is in which programme, bill them, issue invoices and give administrators numbers they can act on. All of it has to work in Arabic, including the financial and data-heavy views that most templates handle badly.",
      "points": [
        "Thousands of enrolled students to track",
        "Billing and invoicing tied to enrollment",
        "Administrators need reporting they can act on",
        "Arabic and RTL in financial and data-heavy views"
      ]
    },
    "approach": {
      "body": "I built it as one system rather than separate tools bolted together, so enrollment, billing and reporting read from the same data. The frontend is Next.js and the backend is Laravel. RTL was designed in from the start rather than retrofitted, because the tables, invoices and report views are where right-to-left layouts usually break.",
      "points": [
        "Enrollment, billing and reporting on shared data",
        "Next.js frontend, Laravel backend",
        "RTL designed in from the start, not retrofitted",
        "One developer, so the architecture stays consistent"
      ]
    },
    "delivered": {
      "body": "The institute runs its day-to-day operations on the platform. I built every part of it and I maintain it alone.",
      "points": [
        "Student enrollment and management system",
        "Billing and invoicing",
        "Admin reporting dashboards the institute runs on",
        "Fully Arabic and RTL, including the financial and data-heavy views",
        "In production, serving thousands of enrolled students"
      ]
    },
    "outcome": {
      "body": "The platform is in production and the institute operates on it. It is the project I point to when a client asks whether I can build and carry a real system on my own, because that is exactly what it is.",
      "points": [
        "In production and in daily use",
        "Built and maintained by one developer",
        "Operations consolidated into a single system"
      ]
    }
  },
  "ar": {
    "title": "معهد بالقلم، أكاديمية أونلاين بناها ويديرها مطور واحد",
    "summary": "منصة تعليمية تعمل فعلياً لمعهد متخصص في تعليم القرآن الكريم واللغة العربية والعلوم الشرعية أونلاين، وبتخدم آلاف الطلاب المسجلين. أنا المطور الوحيد عليها.",
    "facts": {
      "role": "المطور الوحيد، بنيتها وبصيانتها لوحدي",
      "scope": "تسجيل الطلاب وإدارتهم، الفوترة والفواتير، التقارير الإدارية",
      "audience": "آلاف الطلاب المسجلين"
    },
    "challenge": {
      "body": "معهد بحجم ده مش ممكن يشتغل على ملفات إكسل ورسايل واتساب. محتاج يسجّل الطلاب، ويعرف مين في أي برنامج، ويحصّل منهم، ويصدر فواتير، ويدي الإدارة أرقام تقدر تتصرف على أساسها. وكل ده لازم يشتغل بالعربي، بما فيه الواجهات المالية والمليانة بيانات اللي أغلب القوالب بتفشل فيها.",
      "points": [
        "آلاف الطلاب المسجلين محتاجين متابعة",
        "فوترة وفواتير مربوطة بالتسجيل",
        "الإدارة محتاجة تقارير تقدر تتصرف عليها",
        "عربية و RTL في الواجهات المالية والمليانة بيانات"
      ]
    },
    "approach": {
      "body": "بنيتها كنظام واحد مش أدوات متلزقة ببعض، فالتسجيل والفوترة والتقارير بيقروا من نفس البيانات. الواجهة بـ Next.js والخلفية بـ Laravel. الـ RTL اتصمم من البداية مش اتضاف بعدين، لأن الجداول والفواتير وشاشات التقارير هي بالظبط المكان اللي بيتكسر فيه التخطيط من اليمين لليسار.",
      "points": [
        "التسجيل والفوترة والتقارير على نفس البيانات",
        "واجهة Next.js وخلفية Laravel",
        "RTL مصمم من البداية مش مضاف لاحقاً",
        "مطور واحد، فالمعمارية فضلت متسقة"
      ]
    },
    "delivered": {
      "body": "المعهد بيدير شغله اليومي على المنصة. بنيت كل جزء فيها وبصيانتها لوحدي.",
      "points": [
        "نظام تسجيل الطلاب وإدارتهم",
        "الفوترة وإصدار الفواتير",
        "لوحات التقارير الإدارية اللي المعهد بيشتغل عليها",
        "عربية و RTL بالكامل، بما فيها الواجهات المالية والمليانة بيانات",
        "تعمل فعلياً وتخدم آلاف الطلاب المسجلين"
      ]
    },
    "outcome": {
      "body": "المنصة شغالة فعلياً والمعهد بيشتغل عليها. دي المشروع اللي بشاور عليه لما عميل يسألني أقدر أبني نظام حقيقي وأشيله لوحدي ولا لأ، لأن ده بالظبط اللي هو.",
      "points": [
        "تعمل فعلياً وفي استخدام يومي",
        "مبنية ومُصانة بواسطة مطور واحد",
        "توحيد العمليات في نظام واحد"
      ]
    }
  }
};

export default content;
