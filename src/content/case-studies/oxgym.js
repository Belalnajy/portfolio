const content = {
  "en": {
    "title": "OX GYM, a Complete Gym Package: Website, Management System and Members App",
    "summary": "A full digital package for a gym in Alexandria: a bilingual marketing website that books free trials, a management system for the front desk, owner and coaches, and an installable members app with a digital card, workouts, progress and push notifications. All three share one live database, and the package is ready to be rolled out for any gym.",
    "facts": {
      "role": "Product design and full-stack development",
      "scope": "Website, gym management system, members PWA, hosting, SEO",
      "audience": "Gym owners, front-desk staff, coaches and members"
    },
    "challenge": {
      "body": "The gym ran on a desktop program and paper: renewals were missed, no one noticed members who stopped coming, and members had no way to see their own subscription. The goal was one connected system where the website, the front desk and the members all see the same live data, from any phone, without installing anything from a store.",
      "points": [
        "Missed renewals and silent drop-offs",
        "Members could not see their own subscription",
        "Front desk needed fast check-in and a clean cash flow",
        "Existing member records had to be migrated"
      ]
    },
    "approach": {
      "body": "Three web apps on one backend: serverless API functions on Vercel with PostgreSQL, signed HttpOnly sessions and role-based permissions. The website pulls plans and prices straight from the system, so a price changed at the desk is live on the site within the hour. The members app is a PWA that works offline from the last synced data, receives Web Push notifications, and installs on Android and iPhone.",
      "points": [
        "One PostgreSQL database behind all three apps",
        "Fine-grained roles: owner, manager, front desk, coach",
        "Installable PWAs with offline mode and Web Push",
        "Daily cron for expiry reminders and monthly prizes"
      ]
    },
    "delivered": {
      "body": "A website that sells, a system that runs the floor, and an app that keeps members coming back.",
      "points": [
        "Website: live prices, free-trial booking, body calculator, ladies-only hours, Arabic and English",
        "System: dashboard, barcode check-in, subscriptions and freezes, cashier shifts, expenses, reports with Excel export",
        "Follow-up page for expiring and inactive members with WhatsApp templates and call logging",
        "Personal-training clients with programs, diet plans and body measurements",
        "Members app: digital membership card, workout program, progress charts, points and rewards",
        "Monthly attendance leaderboard with automatic point prizes",
        "Push notifications for renewals, approvals and announcements",
        "Audit log of every financial and subscription action"
      ]
    },
    "outcome": {
      "body": "OX GYM runs on it day to day, on its own domain, with three separate entry points: oxgym-eg.com for the public, app.oxgym-eg.com for members and admin.oxgym-eg.com for staff. The same package can be set up for any gym with its own brand, domain and plans.",
      "points": [
        "Live in production on a custom domain",
        "Member records migrated from the old system",
        "Search-ready site with structured data and llms.txt",
        "Ready to deploy for other gyms"
      ]
    }
  },
  "ar": {
    "title": "OX GYM، باقة متكاملة للجيم: موقع وسيستم إدارة وتطبيق للأعضاء",
    "summary": "باقة رقمية كاملة لجيم في الإسكندرية: موقع تعريفي بالعربي والإنجليزي بيحجز حصص تجريبية، وسيستم إدارة للريسبشن وصاحب الجيم والكباتن، وتطبيق للأعضاء بيتثبت على الموبايل فيه كارت العضوية والتمرين والتقدم والإشعارات. التلاتة شغالين على قاعدة بيانات واحدة لايف، والباقة جاهزة تتعمل لأي جيم.",
    "facts": {
      "role": "تصميم المنتج وتطوير Full-Stack",
      "scope": "موقع، سيستم إدارة جيم، تطبيق أعضاء PWA، استضافة، SEO",
      "audience": "أصحاب الجيمات، الريسبشن، الكباتن والأعضاء"
    },
    "challenge": {
      "body": "الجيم كان شغال على برنامج ديسكتوب وورق: تجديدات بتفوت، ومحدش واخد باله من الأعضاء اللي بطّلوا ييجوا، والعضو مش قادر يشوف اشتراكه. المطلوب كان سيستم واحد مترابط، الموقع والريسبشن والأعضاء شايفين فيه نفس الداتا لايف، من أي موبايل ومن غير ما حد ينزّل حاجة من المتجر.",
      "points": [
        "تجديدات بتفوت وأعضاء بيختفوا من غير ما حد ياخد باله",
        "العضو مش قادر يشوف اشتراكه",
        "الريسبشن محتاج تسجيل دخول سريع وخزنة مظبوطة",
        "داتا الأعضاء القديمة لازم تتنقل"
      ]
    },
    "approach": {
      "body": "تلات تطبيقات ويب على باك إند واحد: API على Vercel Serverless مع PostgreSQL، وجلسات موقّعة HttpOnly وصلاحيات حسب الدور. الموقع بيسحب الباقات والأسعار من السيستم مباشرة، فأي سعر يتغيّر في الريسبشن بيظهر على الموقع لوحده. وتطبيق الأعضاء PWA بيفتح من غير نت بآخر داتا، وبيستقبل إشعارات Web Push، وبيتثبت على أندرويد وآيفون.",
      "points": [
        "قاعدة PostgreSQL واحدة ورا التلات تطبيقات",
        "صلاحيات دقيقة: صاحب الجيم، مدير، ريسبشن، كابتن",
        "تطبيقات PWA بتتثبت وبتشتغل أوفلاين مع Web Push",
        "Cron يومي لتنبيهات التجديد وجوايز الشهر"
      ]
    },
    "delivered": {
      "body": "موقع بيبيع، وسيستم بيشغّل الصالة، وتطبيق بيرجّع العضو تاني.",
      "points": [
        "الموقع: أسعار لايف، حجز حصة تجريبية، حاسبة الجسم، مواعيد السيدات، عربي وإنجليزي",
        "السيستم: لوحة تحكم، تسجيل دخول بالباركود، اشتراكات وتجميد، ورديات وخزنة، مصروفات، تقارير بتتصدّر Excel",
        "صفحة متابعة للي اشتراكهم قرّب يخلص واللي بطّلوا ييجوا، برسايل واتساب جاهزة وتسجيل المكالمات",
        "عملاء البرايفت ببرامج تمرين وأكل وقياسات جسم",
        "تطبيق الأعضاء: كارت عضوية رقمي، برنامج التمرين، رسوم التقدم، نقاط وجوايز",
        "ترتيب الحضور الشهري بجوايز نقاط أوتوماتيك",
        "إشعارات للتجديد والموافقات والإعلانات",
        "سجل لكل عملية مالية أو على اشتراك"
      ]
    },
    "outcome": {
      "body": "OX GYM شغال عليه يوميًا على دومينه الخاص، بتلات مداخل: oxgym-eg.com للناس، وللأعضاء app.oxgym-eg.com، وللموظفين admin.oxgym-eg.com. ونفس الحل ممكن يتعمل لأي جيم بهويته ودومينه وباقات اشتراكه.",
      "points": [
        "شغال لايف على دومين خاص",
        "داتا الأعضاء اتنقلت من السيستم القديم",
        "موقع جاهز لمحركات البحث ببيانات منظّمة وملف llms.txt",
        "جاهزة تتعمل لأي جيم"
      ]
    }
  }
};

export default content;
