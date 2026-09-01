const content = {
  "en": {
    "title": "An Inventory System Covering the Whole Stock Lifecycle",
    "summary": "A role-based inventory management system built with Django, PostgreSQL and Bootstrap during my ITI training, as a team project: stock, orders, shipments, suppliers, customers and reporting in one system.",
    "facts": {
      "role": "Full-stack developer — ITI team project",
      "scope": "Stock management, orders and shipments, suppliers, reporting",
      "audience": "Warehouse and operations staff"
    },
    "challenge": {
      "body": "Inventory is where small errors compound: a miscounted stock level becomes a failed order becomes an angry customer. The system had to keep stock truthful in real time, move orders through processing and shipment, and let each role touch only what its job requires.",
      "points": [
        "Stock levels must stay truthful in real time",
        "Orders flow through processing to shipment",
        "Suppliers and customers managed in one place",
        "Role-based access per job function"
      ]
    },
    "approach": {
      "body": "We built it on Django and PostgreSQL with Bootstrap on the front: role-based access control across the workflows, real-time stock movements tied to orders, shipment tracking, and reporting views that summarize the operation.",
      "points": [
        "Django + PostgreSQL + Bootstrap",
        "Role-based access control",
        "Stock movements tied to order processing",
        "Reporting and analytics views"
      ]
    },
    "delivered": {
      "body": "A working operations system, end to end.",
      "points": [
        "Real-time stock management",
        "Order processing and shipment tracking",
        "Supplier and customer management",
        "Reporting and analytics"
      ]
    },
    "outcome": {
      "body": "Delivered as a team project during ITI training — early practice in the multi-role, data-integrity-heavy systems I now build in production.",
      "points": [
        "Complete team delivery during ITI",
        "Team collaboration on a shared codebase",
        "Foundation for later production systems"
      ]
    }
  },
  "ar": {
    "title": "نظام مخازن بيغطي دورة حياة المخزون كلها",
    "summary": "نظام إدارة مخازن قائم على الأدوار مبني بـ Django و PostgreSQL و Bootstrap أثناء تدريبي في ITI كمشروع جماعي: مخزون وطلبات وشحنات وموردين وعملاء وتقارير في نظام واحد.",
    "facts": {
      "role": "مطور Full-Stack — مشروع جماعي في ITI",
      "scope": "إدارة مخزون، طلبات وشحنات، موردين، تقارير",
      "audience": "موظفو المخازن والعمليات"
    },
    "challenge": {
      "body": "المخازن هي المكان اللي الأخطاء الصغيرة بتتراكم فيه: رصيد متعدود غلط بيبقى طلب فاشل بيبقى عميل زعلان. النظام كان لازم يخلي المخزون صادق لحظياً، ويمشّي الطلبات من المعالجة للشحن، ويخلي كل دور يلمس بس اللي شغلته محتاجاه.",
      "points": [
        "أرصدة المخزون لازم تفضل صادقة لحظياً",
        "الطلبات بتتحرك من المعالجة للشحن",
        "الموردون والعملاء في مكان واحد",
        "وصول حسب الدور لكل وظيفة"
      ]
    },
    "approach": {
      "body": "بنيناه على Django و PostgreSQL بواجهة Bootstrap: تحكم وصول بالأدوار على دورات العمل، وحركات مخزون لحظية مربوطة بالطلبات، وتتبع شحنات، وشاشات تقارير بتلخص التشغيل.",
      "points": [
        "Django + PostgreSQL + Bootstrap",
        "تحكم وصول قائم على الأدوار",
        "حركات مخزون مربوطة بمعالجة الطلبات",
        "شاشات تقارير وتحليلات"
      ]
    },
    "delivered": {
      "body": "نظام تشغيل شغال من الأول للآخر.",
      "points": [
        "إدارة مخزون لحظية",
        "معالجة طلبات وتتبع شحنات",
        "إدارة موردين وعملاء",
        "تقارير وتحليلات"
      ]
    },
    "outcome": {
      "body": "اتسلّم كمشروع جماعي أثناء تدريب ITI — تمرين مبكر على الأنظمة متعددة الأدوار الثقيلة في سلامة البيانات اللي بقيت ببنيها في الإنتاج.",
      "points": [
        "تسليم جماعي كامل أثناء ITI",
        "شغل فريق على كود مشترك",
        "أساس لأنظمة الإنتاج اللاحقة"
      ]
    }
  }
};

export default content;
