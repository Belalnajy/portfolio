const content = {
  "en": {
    "title": "A Library Management System in Django",
    "summary": "A library management system I built while learning Django and PostgreSQL: book cataloguing, category management, full CRUD operations and search across the collection.",
    "facts": {
      "role": "Full-stack developer",
      "scope": "Cataloguing, categories, CRUD, search",
      "audience": "Built for library staff managing a collection"
    },
    "challenge": {
      "body": "A library system stands on its data model: books, categories and their relationships must be structured so that cataloguing stays consistent and search actually finds things. The operations themselves (add, update, categorise, retire) need to be safe and fast for daily staff use.",
      "points": [
        "A data model that keeps cataloguing consistent",
        "Search that finds books reliably",
        "Full CRUD for daily operations",
        "Categories that organise a growing collection"
      ]
    },
    "approach": {
      "body": "Built on Django's ORM with PostgreSQL: relational models for books and categories, complete CRUD workflows through Django views and forms, and search functionality across the catalogue.",
      "points": [
        "Django ORM on PostgreSQL",
        "Relational book and category models",
        "CRUD workflows via views and forms",
        "Catalogue-wide search"
      ]
    },
    "delivered": {
      "body": "A complete back-office system for a book collection.",
      "points": [
        "Book cataloguing system",
        "Category management",
        "Full CRUD operations",
        "Search functionality"
      ]
    },
    "outcome": {
      "body": "One of my early Django systems: the ORM-and-relational-modelling foundation that later carried platforms like the LMS engine.",
      "points": [
        "Complete working system",
        "Early Django and PostgreSQL practice",
        "Foundation for later production platforms"
      ]
    }
  },
  "ar": {
    "title": "نظام إدارة مكتبات بـ Django",
    "summary": "نظام لإدارة المكتبات عملته وأنا بتعلم Django مع PostgreSQL: فهرسة كتب، إدارة تصنيفات، عمليات CRUD كاملة، وبحث في المجموعة كلها.",
    "facts": {
      "role": "مطور Full-Stack",
      "scope": "فهرسة، تصنيفات، CRUD، بحث",
      "audience": "مصمم لموظفي مكتبة بيديروا مجموعة كتب"
    },
    "challenge": {
      "body": "نظام المكتبة واقف على نموذج بياناته: الكتب والتصنيفات وعلاقاتهم لازم يتهيكلوا بشكل يخلي الفهرسة متسقة والبحث فعلاً يلاقي. والعمليات نفسها (إضافة وتحديث وتصنيف وسحب) لازم تكون آمنة وسريعة للاستخدام اليومي.",
      "points": [
        "نموذج بيانات يحافظ على اتساق الفهرسة",
        "بحث بيلاقي الكتب باستمرار",
        "CRUD كامل للتشغيل اليومي",
        "تصنيفات بتنظم مجموعة بتكبر"
      ]
    },
    "approach": {
      "body": "مبني على ORM بتاع Django مع PostgreSQL: موديلات علائقية للكتب والتصنيفات، ودورات CRUD كاملة عبر الـ views والـ forms بتاعة Django، وخاصية بحث على الكتالوج كله.",
      "points": [
        "Django ORM على PostgreSQL",
        "موديلات علائقية للكتب والتصنيفات",
        "دورات CRUD عبر الـ views والـ forms",
        "بحث على مستوى الكتالوج"
      ]
    },
    "delivered": {
      "body": "نظام back-office كامل لمجموعة كتب.",
      "points": [
        "نظام فهرسة كتب",
        "إدارة تصنيفات",
        "عمليات CRUD كاملة",
        "خاصية بحث"
      ]
    },
    "outcome": {
      "body": "واحد من أنظمتي المبكرة بـ Django، وهو أساس الـ ORM والنمذجة العلائقية اللي شال بعدين منصات زي محرك الـ LMS.",
      "points": [
        "نظام كامل شغال",
        "تمرين مبكر على Django مع PostgreSQL",
        "أساس لمنصات الإنتاج اللاحقة"
      ]
    }
  }
};

export default content;
