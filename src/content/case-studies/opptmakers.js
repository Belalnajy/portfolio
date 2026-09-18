const content = {
  "en": {
    "title": "Opportunities Makers, an Internal CRM for Company Formation",
    "summary": "The internal client and transaction system for a Saudi consultancy that sets up companies for foreign investors. It holds the client files and tracks every formation case step by step, with access scoped per employee. Arabic-first and fully RTL.",
    "facts": {
      "role": "Software developer, part-time",
      "scope": "Client and transaction management, per-employee access, Arabic-first interface",
      "audience": "The consultancy's staff, handling investor formation cases"
    },
    "challenge": {
      "body": "Setting up a company for a foreign investor in Saudi Arabia is a long, paperwork-heavy process that runs over weeks and passes through several people. Tracked in spreadsheets and chat threads, it becomes impossible to answer the two questions that matter: where is this client's file right now, and who touched it. Client files also carry commercial and identity documents, so not every employee should see every case.",
      "points": [
        "A multi-week formation process with many sequential steps",
        "Several staff touching the same case at different stages",
        "Client files containing commercial and identity documents",
        "Arabic as the working language of the whole team"
      ]
    },
    "approach": {
      "body": "I built it as one internal system rather than a set of shared documents, so each client and each transaction is a record with a state rather than a row someone has to keep updating by hand. Access is scoped per employee, so a staff member reaches the cases they are cleared for and nothing else. The interface is Arabic-first with RTL designed in from the start, because tables, forms and document views are exactly where right-to-left layouts usually break.",
      "points": [
        "Client and transaction records with an explicit state per case",
        "Access scoped per employee rather than one shared login",
        "Arabic-first, fully RTL layout across tables, forms and document views",
        "Next.js and React on the front, a NestJS API on PostgreSQL behind it, Tailwind design system, light and dark themes"
      ]
    },
    "delivered": {
      "body": "A working internal system the team runs the day on.",
      "points": [
        "Client and transaction management for company-formation cases",
        "Step-by-step tracking of each case from first request to issued documents",
        "Per-employee permissions on a secure sign-in",
        "Arabic-first interface with light and dark themes"
      ]
    },
    "outcome": {
      "body": "In use as the consultancy's internal system for client files and formation cases. I joined the company part-time in July 2026 and continue to build and maintain it.",
      "points": [
        "Running as the team's internal system of record",
        "Case status visible without chasing people for updates",
        "Built and maintained on an ongoing part-time engagement"
      ]
    }
  },
  "ar": {
    "title": "صناع الفرص، نظام داخلي لإدارة عملاء ومعاملات تأسيس الشركات",
    "summary": "النظام الداخلي لإدارة العملاء والمعاملات لشركة سعودية متخصصة في تأسيس الشركات للمستثمرين الأجانب. بيحتفظ بملفات العملاء وبيتابع كل معاملة تأسيس خطوة بخطوة، بصلاحيات محددة لكل موظف. عربي أولاً وبدعم RTL كامل.",
    "facts": {
      "role": "مطور برمجيات، دوام جزئي",
      "scope": "إدارة العملاء والمعاملات، صلاحيات لكل موظف، واجهة عربية أولاً",
      "audience": "فريق الشركة اللي بيتابع معاملات تأسيس المستثمرين"
    },
    "challenge": {
      "body": "تأسيس شركة لمستثمر أجنبي في السعودية عملية طويلة ومليانة أوراق، بتاخد أسابيع وبتعدي على أكتر من موظف. لو اتتابعت على ملفات إكسل ومحادثات، بيبقى مستحيل تجاوب على السؤالين المهمين: ملف العميل ده واقف فين دلوقتي، ومين اللي اشتغل عليه. وكمان ملفات العملاء فيها مستندات تجارية وهوية، فمش كل موظف المفروض يشوف كل معاملة.",
      "points": [
        "عملية تأسيس بتمتد أسابيع بخطوات متتابعة كتير",
        "أكتر من موظف بيشتغل على نفس المعاملة في مراحل مختلفة",
        "ملفات عملاء فيها مستندات تجارية ومستندات هوية",
        "العربية هي لغة العمل للفريق كله"
      ]
    },
    "approach": {
      "body": "بنيته كنظام داخلي واحد بدل مجموعة ملفات مشتركة، فكل عميل وكل معاملة بقت سجل له حالة واضحة مش سطر حد لازم يفضل يحدّثه بإيده. الصلاحيات محددة لكل موظف، فالموظف بيوصل للمعاملات المسموح له بيها ومش أكتر. والواجهة عربية أولاً والـ RTL مصمم من البداية، لأن الجداول والفورمات وعرض المستندات هي بالظبط الأماكن اللي تخطيط اليمين-لليسار بيقع فيها عادةً.",
      "points": [
        "سجلات عملاء ومعاملات بحالة واضحة لكل معاملة",
        "صلاحيات لكل موظف بدل حساب واحد مشترك",
        "تخطيط عربي أولاً بدعم RTL كامل في الجداول والفورمات وعرض المستندات",
        "Next.js و React في الواجهة، و NestJS API على PostgreSQL في الخلفية، ونظام تصميم Tailwind، ووضع فاتح وداكن"
      ]
    },
    "delivered": {
      "body": "نظام داخلي شغال الفريق بيشتغل عليه يومياً.",
      "points": [
        "إدارة العملاء والمعاملات الخاصة بتأسيس الشركات",
        "متابعة كل معاملة خطوة بخطوة من أول طلب لحد تسليم الأوراق",
        "صلاحيات لكل موظف على دخول آمن",
        "واجهة عربية أولاً بوضع فاتح وداكن"
      ]
    },
    "outcome": {
      "body": "شغال كنظام الشركة الداخلي لملفات العملاء ومعاملات التأسيس. انضممت للشركة بدوام جزئي في يوليو ٢٠٢٦ وبكمّل بناءه وصيانته.",
      "points": [
        "شغال كمرجع داخلي للفريق",
        "حالة كل معاملة واضحة من غير ما حد يجري ورا حد",
        "بنيته وبصيانته ضمن تعاقد دوام جزئي مستمر"
      ]
    }
  }
};

export default content;
