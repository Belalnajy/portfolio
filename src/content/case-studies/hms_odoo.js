const content = {
  "en": {
    "title": "A Hospital Management Module Inside Odoo",
    "summary": "A custom HMS module built on the Odoo platform managing patients, departments and doctors, with automated email validation and CRM integration.",
    "facts": {
      "role": "Odoo developer",
      "scope": "Custom module: patients, departments, doctors, CRM hooks",
      "audience": "Hospital administrative staff"
    },
    "challenge": {
      "body": "Building inside an ERP is a different discipline from greenfield work: Odoo has its own ORM, view system and module conventions, and a good module feels native to the platform rather than bolted on. The HMS had to model patients, departments and doctors properly within those rules.",
      "points": [
        "Odoo's ORM and module conventions to respect",
        "Patients, departments and doctors as linked models",
        "Data validity enforced at entry",
        "CRM features reused, not rebuilt"
      ]
    },
    "approach": {
      "body": "I built the module in Python on Odoo's framework: relational models linking patients, departments and doctors, automated email validation on records, and integration with Odoo's CRM so the hospital benefits from the platform's existing machinery.",
      "points": [
        "Custom Odoo module in Python",
        "Linked patient, department and doctor models",
        "Automated email validation",
        "CRM integration through the platform"
      ]
    },
    "delivered": {
      "body": "A native-feeling hospital module on the ERP.",
      "points": [
        "Patient records management",
        "Department organization",
        "Doctor assignment",
        "Validation and CRM hooks"
      ]
    },
    "outcome": {
      "body": "The project added ERP-platform development to my toolbox: extending a large existing system on its own terms — the same skill behind my legacy-takeover work.",
      "points": [
        "Working HMS module on Odoo",
        "ERP development within platform conventions",
        "Skills reused in legacy-code client work"
      ]
    }
  },
  "ar": {
    "title": "موديول إدارة مستشفيات جوه Odoo",
    "summary": "موديول HMS مخصص مبني على منصة Odoo بيدير المرضى والأقسام والأطباء، مع تحقق مؤتمت من الإيميلات وتكامل مع الـ CRM.",
    "facts": {
      "role": "مطور Odoo",
      "scope": "موديول مخصص: مرضى، أقسام، أطباء، تكامل CRM",
      "audience": "الطاقم الإداري للمستشفى"
    },
    "challenge": {
      "body": "البناء جوه ERP تخصص مختلف عن البناء من الصفر: Odoo ليه الـ ORM بتاعه ونظام العرض وأعراف الموديولات، والموديول الكويس بيحس إنه أصلي من المنصة مش متلزق عليها. الـ HMS كان لازم يمثّل المرضى والأقسام والأطباء صح جوه القواعد دي.",
      "points": [
        "ORM وأعراف موديولات Odoo لازم تتحترم",
        "المرضى والأقسام والأطباء كموديلات مترابطة",
        "صحة البيانات مفروضة عند الإدخال",
        "خصائص CRM بتتعاد استخدامها مش بتتعاد بناءها"
      ]
    },
    "approach": {
      "body": "بنيت الموديول بـ Python على إطار Odoo: موديلات علائقية بتربط المرضى والأقسام والأطباء، وتحقق مؤتمت من الإيميلات على السجلات، وتكامل مع CRM بتاع Odoo فالمستشفى بتستفيد من ماكينة المنصة الجاهزة.",
      "points": [
        "موديول Odoo مخصص بـ Python",
        "موديلات مترابطة للمرضى والأقسام والأطباء",
        "تحقق مؤتمت من الإيميلات",
        "تكامل CRM من خلال المنصة"
      ]
    },
    "delivered": {
      "body": "موديول مستشفيات بيحس أصلي على الـ ERP.",
      "points": [
        "إدارة سجلات المرضى",
        "تنظيم الأقسام",
        "إسناد الأطباء",
        "تحقق وتكامل CRM"
      ]
    },
    "outcome": {
      "body": "المشروع ضاف تطوير منصات الـ ERP لعدة أدواتي: تمديد نظام كبير موجود بشروطه هو — نفس المهارة اللي ورا شغلي في استلام الأكواد القديمة.",
      "points": [
        "موديول HMS شغال على Odoo",
        "تطوير ERP جوه أعراف المنصة",
        "مهارات متعاد استخدامها في شغل العملاء"
      ]
    }
  }
};

export default content;
