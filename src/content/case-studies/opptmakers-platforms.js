const content = {
  "en": {
    "title": "Opportunities Makers Platforms, Government Platforms and Compliance for Client Companies",
    "summary": "A second internal system for the same Saudi consultancy, for a new service: running its client companies' government platforms on a 3, 6 or 12 month subscription. Every platform gets its own column with a countdown to expiry, staff work through a task board with day counters, and management gets a monthly report per employee. It runs on its own subdomain and database, signs in with the same accounts as the main CRM, and is built for this one company rather than sold as a product.",
    "facts": {
      "role": "Software developer, part-time",
      "scope": "Separate system: platforms table, subscriptions, labor contracts, tasks, alerts, reports",
      "audience": "The consultancy's compliance staff and management"
    },
    "challenge": {
      "body": "A company in Saudi Arabia lives on a set of government platforms, each with its own expiry date and its own fines when something lapses. The consultancy managed these for its clients from a shared spreadsheet: one row per company, a group of columns per platform. Nothing warned anyone before a date passed, there was no record of who worked on what, and no way to tell a client that their subscription had ended and work should stop.",
      "points": [
        "Seven government platforms per company, each with its own expiry date",
        "Fines when a renewal is missed",
        "Labor contracts per employee, each with its own renewal date",
        "Work that had to be counted per employee at the end of the month"
      ]
    },
    "approach": {
      "body": "I kept the shape the team already knew from the spreadsheet, one row per company and one column per platform, and made each cell a record with a status, an action type, notes and an expiry date. The cell counts down the days and turns yellow ten days before expiry and red at five. The system is separate from the main CRM, on its own subdomain and database, but adding a client searches the CRM by name or contract number through a read-only database view, so nobody retypes a client's details.",
      "points": [
        "One column per platform with a countdown to expiry, yellow at 10 days and red at 5",
        "Subscriptions of 3, 6 or 12 months: an expired client fades out and staff can no longer act on it",
        "Separate database and subdomain, same accounts, and a read-only link to the main CRM",
        "Next.js and React on the front, NestJS and PostgreSQL behind it, Docker and Caddy on the same server"
      ]
    },
    "delivered": {
      "body": "The compliance team's daily system, from adding a client to the end-of-month report.",
      "points": [
        "Clients table with a column for each government platform: Qiwa, Muqeem, Mudad, GOSI, Balady, Zakat and Tax, medical insurance",
        "Labor contracts and employee count for every company, with the nearest renewal shown in the table",
        "Task board fed from the client row, with one day counter from creation and another from the start of work, and an optional proof screenshot",
        "Dashboard of platforms that expired or expire within 5 and 10 days, subscriptions and contracts running out, and client status, each employee seeing only their own clients",
        "Two tickers across every page: platform news fetched automatically, and platforms about to expire",
        "Monthly report per employee: tasks completed and for which client, number of clients, total and average task days, with Excel export and printing",
        "Platforms managed from the settings: add, rename, reorder or hide, and every platform becomes a column"
      ]
    },
    "outcome": {
      "body": "Live on its own subdomain since October 2026, with the first half released on the 19th and the rest on the 29th. It is an internal system built for this one company and its compliance service, not a product on sale.",
      "points": [
        "Requested and released within the same month",
        "Running next to the main CRM on the same server, without touching its data",
        "Built and maintained on the same part-time engagement"
      ]
    }
  },
  "ar": {
    "title": "منصات صناع الفرص، نظام إدارة المنصات الحكومية والامتثال لشركات العملاء",
    "summary": "نظام داخلي تاني لنفس الشركة السعودية، لخدمة جديدة: إدارة المنصات الحكومية لشركات عملائها باشتراك 3 أو 6 شهور أو سنة. كل منصة ليها عمود فيه عداد للأيام الباقية على انتهائها، والموظفين بيشتغلوا على لوحة مهام بعدادات أيام، والإدارة بتطلع تقرير شهري لكل موظف. شغال على دومين فرعي وقاعدة بيانات لوحده، والدخول بنفس حسابات نظام العملاء، ومعمول مخصوص للشركة دي مش منتج للبيع.",
    "facts": {
      "role": "مطور برمجيات، دوام جزئي",
      "scope": "نظام منفصل: جدول المنصات، الاشتراكات، عقود العمل، المهام، التنبيهات، التقارير",
      "audience": "فريق الامتثال في الشركة والإدارة"
    },
    "challenge": {
      "body": "أي شركة في السعودية شغلها ماشي على مجموعة منصات حكومية، كل منصة ليها تاريخ انتهاء وغرامة لو حاجة فاتت. الشركة كانت بتدير ده لعملائها من شيت مشترك: صف لكل شركة، ومجموعة أعمدة لكل منصة. مفيش حاجة بتنبّه حد قبل ما التاريخ يعدي، ومفيش سجل مين اشتغل على إيه، ومفيش طريقة تقول إن اشتراك العميل خلص والشغل لازم يقف.",
      "points": [
        "سبع منصات حكومية لكل شركة، كل واحدة بتاريخ انتهاء",
        "غرامات لو التجديد فات",
        "عقود عمل لكل موظف في الشركة، كل عقد بميعاد تجديد",
        "شغل لازم يتحسب لكل موظف آخر الشهر"
      ]
    },
    "approach": {
      "body": "حافظت على الشكل اللي الفريق متعود عليه من الشيت، صف لكل شركة وعمود لكل منصة، وخليت كل خانة سجل فيه الحالة ونوع الإجراء والملاحظات وتاريخ الانتهاء. الخانة بتعدّ الأيام الباقية، وبتبقى صفرا قبل الانتهاء بعشر أيام وحمرا قبله بخمسة. والنظام منفصل عن نظام العملاء على دومين فرعي وقاعدة بيانات لوحده، بس إضافة العميل بتدوّر في نظام العملاء بالاسم أو رقم العقد من خلال view للقراءة بس، فمحدش بيكتب بيانات العميل تاني.",
      "points": [
        "عمود لكل منصة بعداد للأيام الباقية، أصفر قبل 10 أيام وأحمر قبل 5",
        "اشتراك 3 أو 6 شهور أو سنة: العميل اللي اشتراكه خلص بيبان باهت والموظف ميقدرش يعمل عليه حاجة",
        "قاعدة بيانات ودومين منفصلين، ونفس الحسابات، وربط للقراءة بس مع نظام العملاء",
        "Next.js مع React في الواجهة، وفي الخلفية NestJS مع PostgreSQL، وعلى نفس السيرفر Docker مع Caddy"
      ]
    },
    "delivered": {
      "body": "نظام فريق الامتثال اليومي، من إضافة العميل لحد تقرير آخر الشهر.",
      "points": [
        "جدول العملاء بعمود لكل منصة حكومية: قوى، مقيم، مدد، التأمينات، بلدي، الزكاة والضريبة، التأمين الطبي",
        "عقود العمل وعدد الموظفين لكل شركة، وأقرب تجديد ظاهر في الجدول",
        "لوحة مهام بتتغذى من صف العميل، بعداد أيام من إنشاء المهمة وعداد تاني من بداية التنفيذ، وصورة إثبات اختيارية",
        "لوحة تحكم فيها المنصات اللي خلصت أو هتخلص خلال 5 أيام أو 10 أيام، والاشتراكات والعقود اللي قربت تخلص، وحالة العملاء، وكل موظف بيشوف عملاءه هو بس",
        "شريطين فوق كل الصفحات: أخبار المنصات بتتجاب أوتوماتيك، والمنصات اللي قربت تنتهي",
        "تقرير شهري لكل موظف: المهام اللي خلصها ولأنهي عميل، وعدد العملاء، وإجمالي ومتوسط أيام المهام، مع تصدير Excel وطباعة",
        "إدارة المنصات من الإعدادات: إضافة أو تغيير اسم أو ترتيب أو إخفاء، وكل منصة بتبقى عمود"
      ]
    },
    "outcome": {
      "body": "شغال على دومينه الفرعي من أكتوبر 2026، النص الأول اترفع يوم 19 والباقي يوم 29. وهو نظام داخلي معمول مخصوص للشركة دي ولخدمة الامتثال بتاعتها، مش منتج للبيع.",
      "points": [
        "اتطلب واترفع في نفس الشهر",
        "شغال جنب نظام العملاء على نفس السيرفر من غير ما يلمس بياناته",
        "بنيته وبصيانته ضمن نفس تعاقد الدوام الجزئي"
      ]
    }
  }
};

export default content;
