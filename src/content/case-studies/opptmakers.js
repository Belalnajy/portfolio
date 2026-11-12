const content = {
  "en": {
    "title": "Opportunities Makers, an Internal CRM for Company Formation",
    "summary": "The internal client and transaction system for a Saudi consultancy that sets up companies for foreign investors. It holds the client files, moves every formation case through its stages, measures each employee's month, and keeps clients informed by SMS. Every employee gets their own permissions, ticked box by box. Arabic-first and fully RTL, built for this one company rather than sold as a product.",
    "facts": {
      "role": "Software developer, part-time",
      "scope": "Clients and transactions, stages, staff performance, permissions, customer messaging",
      "audience": "The consultancy's management and staff, handling investor formation cases"
    },
    "challenge": {
      "body": "Setting up a company for a foreign investor in Saudi Arabia is a long, paperwork-heavy process that runs over weeks and passes through several people. Tracked in spreadsheets and chat threads, it becomes impossible to answer the questions that matter: where is this client's file right now, who touched it, and who is falling behind. Client files also carry commercial and identity documents, so not every employee should see every case, and the client expects to hear about their payments and progress without chasing anyone.",
      "points": [
        "A multi-week formation process with many sequential steps",
        "Several staff touching the same case at different stages",
        "Client files containing commercial and identity documents",
        "Management needing a monthly view of each employee's work",
        "Arabic as the working language of the whole team"
      ]
    },
    "approach": {
      "body": "I built it as one internal system rather than a set of shared documents, so each client and each transaction is a record with a state and a history. Access is decided per employee through a checklist of permissions, with ready templates for a manager, a supervisor and a staff member, instead of one fixed role for everyone. The interface is Arabic-first with RTL designed in from the start, because tables, forms and document views are exactly where right-to-left layouts usually break. Features were added in close loops with the management: each one built, tested on the live system, and released on request.",
      "points": [
        "Client and transaction records with an explicit state and change log",
        "Per-employee permissions as checkboxes, with templates and owner-only controls",
        "Arabic-first, fully RTL layout across tables, forms and document views",
        "Next.js and React on the front, a NestJS API on PostgreSQL behind it, Docker and Caddy in production"
      ]
    },
    "delivered": {
      "body": "A working internal system the team runs the day on.",
      "points": [
        "Client and transaction management with search, filters, inline editing and Excel import and export",
        "A stages board where each stage has an owner and every card shows how long it has waited",
        "Monthly transactions per employee with PDF and Excel statements, and customer ratings feeding into them",
        "Employee certificates with a QR code that anyone can verify",
        "Archive with a satisfaction survey, a complaints registry and returned transactions",
        "Custom pages that the system admin builds from fields without code",
        "Internal chat with voice notes, live notifications and attendance tracking",
        "SMS to clients through the company's provider: a welcome message, payment reminders and a closing message, editable from the settings"
      ]
    },
    "outcome": {
      "body": "In use as the consultancy's internal system for client files and formation cases. It is a system built for this one company, not a product on sale. I joined the company part-time in July 2026 and continue to build and maintain it, alongside a second system for the same company that manages its clients' government platforms.",
      "points": [
        "Running as the team's internal system of record",
        "Case status and each employee's month visible without chasing people",
        "Built and maintained on an ongoing part-time engagement"
      ]
    }
  },
  "ar": {
    "title": "صناع الفرص، نظام داخلي لإدارة عملاء ومعاملات تأسيس الشركات",
    "summary": "النظام الداخلي لإدارة العملاء والمعاملات لشركة سعودية متخصصة في تأسيس الشركات للمستثمرين الأجانب. بيحتفظ بملفات العملاء، وبيمشّي كل معاملة تأسيس على مراحلها، وبيحسب شغل كل موظف في الشهر، وبيبلّغ العميل برسايل SMS. وكل موظف ليه صلاحيات بتتحدد بالتشيك بوكس. عربي أولاً وبدعم RTL كامل، ومعمول مخصوص للشركة دي مش منتج للبيع.",
    "facts": {
      "role": "مطور برمجيات، دوام جزئي",
      "scope": "العملاء والمعاملات، المراحل، أداء الموظفين، الصلاحيات، رسايل العملاء",
      "audience": "إدارة الشركة والفريق اللي بيتابع معاملات تأسيس المستثمرين"
    },
    "challenge": {
      "body": "تأسيس شركة لمستثمر أجنبي في السعودية عملية طويلة ومليانة أوراق، بتاخد أسابيع وبتعدي على أكتر من موظف. لو اتتابعت على ملفات إكسل ومحادثات، بيبقى مستحيل تجاوب على الأسئلة المهمة: ملف العميل ده واقف فين دلوقتي، ومين اللي اشتغل عليه، ومين متأخر. وكمان ملفات العملاء فيها مستندات تجارية وهوية، فمش كل موظف المفروض يشوف كل معاملة، والعميل عايز يعرف أخبار دفعاته ومعاملته من غير ما يجري ورا حد.",
      "points": [
        "عملية تأسيس بتمتد أسابيع بخطوات متتابعة كتير",
        "أكتر من موظف بيشتغل على نفس المعاملة في مراحل مختلفة",
        "ملفات عملاء فيها مستندات تجارية ومستندات هوية",
        "الإدارة محتاجة تشوف شغل كل موظف في الشهر",
        "العربية هي لغة العمل للفريق كله"
      ]
    },
    "approach": {
      "body": "بنيته كنظام داخلي واحد بدل مجموعة ملفات مشتركة، فكل عميل وكل معاملة بقت سجل له حالة وتاريخ. الصلاحيات بتتحدد لكل موظف بقايمة تشيك بوكس، ومعاها قوالب جاهزة للمدير والمشرف والموظف، بدل دور واحد ثابت للكل. والواجهة عربية أولاً والـ RTL مصمم من البداية، لأن الجداول والفورمات وعرض المستندات هي بالظبط الأماكن اللي تخطيط اليمين-لليسار بيقع فيها عادةً. والميزات اتبنت في دورات قصيرة مع الإدارة: كل ميزة بتتبني وتتجرب على النظام الحقيقي وتترفع لما يطلبوها.",
      "points": [
        "سجلات عملاء ومعاملات بحالة واضحة وسجل لكل تغيير",
        "صلاحيات مفصّلة لكل موظف، بقوالب جاهزة وتحكم خاص بالإدارة",
        "تخطيط عربي أولاً بدعم RTL كامل في الجداول والفورمات وعرض المستندات",
        "Next.js مع React في الواجهة، وفي الخلفية NestJS API على PostgreSQL، وعلى السيرفر Docker مع Caddy"
      ]
    },
    "delivered": {
      "body": "نظام داخلي شغال الفريق بيشتغل عليه يومياً.",
      "points": [
        "إدارة العملاء والمعاملات ببحث وفلاتر وتعديل من الجدول، واستيراد وتصدير Excel",
        "لوحة مراحل لكل مرحلة فيها مسؤول، وكل كارت بيعرض العميل بقاله قد إيه في المرحلة",
        "المعاملات الشهرية لكل موظف ببيان بصيغة PDF أو Excel، وتقييمات العملاء داخلة فيها",
        "شهادات للموظفين بكود QR أي حد يقدر يتأكد منه",
        "أرشيف باستبيان رضا، وسجل شكاوى، ومعاملات مرتجعة",
        "صفحات خاصة مدير النظام بيبنيها بالخانات من غير كود",
        "تواصل داخلي برسايل صوتية، وإشعارات لحظية، ومتابعة حضور الموظفين",
        "رسايل SMS للعملاء من حساب الشركة: ترحيب، وتذكير بالدفعات، ورسالة ختامية، ونصوصها بتتعدل من الإعدادات"
      ]
    },
    "outcome": {
      "body": "شغال كنظام الشركة الداخلي لملفات العملاء ومعاملات التأسيس، وهو نظام معمول مخصوص للشركة دي مش منتج للبيع. انضممت للشركة بدوام جزئي في يوليو 2026 وبكمّل بناءه وصيانته، ومعاه نظام تاني لنفس الشركة بيدير المنصات الحكومية لعملائها.",
      "points": [
        "شغال كمرجع داخلي للفريق",
        "حالة كل معاملة وشغل كل موظف في الشهر واضحين من غير ما حد يجري ورا حد",
        "بنيته وبصيانته ضمن تعاقد دوام جزئي مستمر"
      ]
    }
  }
};

export default content;
