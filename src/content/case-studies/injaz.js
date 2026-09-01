const content = {
  "en": {
    "title": "Injaz, an Accredited Medical Education LMS for Saudi Arabia",
    "summary": "A comprehensive LMS for SCFHS-accredited medical training courses: video-based learning, MCQ assessments, automated certificate generation, MyFatoorah payments and NELC integration. One of three branded platforms running on an LMS engine I built and maintain.",
    "facts": {
      "role": "Sole developer of the platform and the shared LMS engine",
      "scope": "Accredited courses, assessments, certificates, payments, NELC/SCFHS integration",
      "audience": "Healthcare professionals earning SCFHS-accredited hours"
    },
    "challenge": {
      "body": "Medical education in Saudi Arabia is regulated: courses must be SCFHS-accredited, reported through NELC, and certificates must be verifiable. That means an LMS here is not videos and quizzes — it is compliance infrastructure with learning on top, and payments have to work with the local gateway ecosystem.",
      "points": [
        "SCFHS accreditation requirements built into the product",
        "NELC integration for national e-learning compliance",
        "Certificates must be unique and verifiable",
        "Local payments via MyFatoorah with carts and coupons"
      ]
    },
    "approach": {
      "body": "I built it on a hardened Django and PostgreSQL core with Celery and Redis handling the async work — notifications, report generation, exports — so the learning experience never waits on background jobs. Certificates are generated automatically with unique IDs and an online verification system. The same engine powers HC Holding and Mada Education under their own brands.",
      "points": [
        "Django + PostgreSQL core, Celery + Redis async processing",
        "Automated certificates with unique IDs and verification",
        "MyFatoorah payment gateway with cart and coupons",
        "Multi-tenant engine shared with two sibling platforms"
      ]
    },
    "delivered": {
      "body": "A full accredited-training pipeline, from enrollment and video lessons to assessment, payment and verified certification.",
      "points": [
        "SCFHS-accredited video courses with progress tracking and quizzes",
        "MCQ assessment engine",
        "Automated certificate generation and verification",
        "NELC integration for course accreditation",
        "Bilingual Arabic/English interface with full RTL"
      ]
    },
    "outcome": {
      "body": "Injaz runs in production at lms-injaz.com serving the Saudi healthcare sector. Because it shares one engine with two other platforms, every improvement lands across the whole suite at once.",
      "points": [
        "In production at lms-injaz.com",
        "Serving SCFHS-accredited training at national compliance standards",
        "One engine, three branded platforms, one deployment pipeline"
      ]
    }
  },
  "ar": {
    "title": "الإنجاز، منصة تعليم طبي معتمدة للسعودية",
    "summary": "نظام إدارة تعلم متكامل لدورات التدريب الطبي المعتمدة من هيئة التخصصات الصحية (SCFHS): تعلم بالفيديو، اختبارات MCQ، شهادات مؤتمتة، مدفوعات MyFatoorah، وتكامل مع NELC. واحدة من ثلاث منصات بهويات مختلفة شغالة على محرك LMS بنيته وبصونه.",
    "facts": {
      "role": "المطور الوحيد للمنصة والمحرك المشترك",
      "scope": "دورات معتمدة، اختبارات، شهادات، مدفوعات، تكامل NELC/SCFHS",
      "audience": "ممارسون صحيون بيحصّلوا ساعات معتمدة من SCFHS"
    },
    "challenge": {
      "body": "التعليم الطبي في السعودية منظّم بقوانين: الدورات لازم تكون معتمدة من SCFHS، وبيتم رفع تقاريرها عبر NELC، والشهادات لازم تكون قابلة للتحقق. يعني الـ LMS هنا مش فيديوهات واختبارات — ده بنية امتثال تنظيمي وفوقها تعليم، والمدفوعات لازم تشتغل مع بوابات الدفع المحلية.",
      "points": [
        "متطلبات اعتماد SCFHS مبنية جوه المنتج",
        "تكامل NELC للامتثال الوطني للتعلم الإلكتروني",
        "الشهادات لازم تكون فريدة وقابلة للتحقق",
        "مدفوعات محلية عبر MyFatoorah مع سلة وكوبونات"
      ]
    },
    "approach": {
      "body": "بنيتها على نواة Django و PostgreSQL محصّنة، مع Celery و Redis بيتولوا الشغل غير المتزامن — الإشعارات وتوليد التقارير والتصدير — فتجربة التعلم عمرها ما بتستنى مهام الخلفية. الشهادات بتتولد أوتوماتيكياً بأرقام فريدة ونظام تحقق أونلاين. ونفس المحرك بيشغّل التجمع الصحي ومدى التعليمية بهوياتهم الخاصة.",
      "points": [
        "نواة Django + PostgreSQL مع معالجة غير متزامنة بـ Celery + Redis",
        "شهادات مؤتمتة بأرقام فريدة ونظام تحقق",
        "بوابة دفع MyFatoorah مع سلة وكوبونات",
        "محرك متعدد المستأجرين مشترك مع منصتين شقيقتين"
      ]
    },
    "delivered": {
      "body": "دورة تدريب معتمد كاملة، من التسجيل ودروس الفيديو للاختبار والدفع والشهادة الموثقة.",
      "points": [
        "دورات فيديو معتمدة من SCFHS مع تتبع تقدم واختبارات",
        "محرك اختبارات MCQ",
        "توليد شهادات مؤتمت مع نظام تحقق",
        "تكامل NELC لاعتماد الدورات",
        "واجهة ثنائية اللغة عربي/إنجليزي مع RTL كامل"
      ]
    },
    "outcome": {
      "body": "الإنجاز شغالة فعلياً على lms-injaz.com وبتخدم القطاع الصحي السعودي. ولأنها بتتشارك محرك واحد مع منصتين تانيين، أي تحسين بينزل على المنظومة كلها مرة واحدة.",
      "points": [
        "تعمل فعلياً على lms-injaz.com",
        "تدريب معتمد من SCFHS بمعايير الامتثال الوطنية",
        "محرك واحد، ثلاث منصات، وخط نشر واحد"
      ]
    }
  }
};

export default content;
