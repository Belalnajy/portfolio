const content = {
  "en": {
    "title": "Baserah AI, Turning Unstructured HR Data into Evaluations",
    "summary": "A full-stack AI HR platform that automates competency and KPI extraction from job descriptions, generates assessments, and evaluates talent in a structured way — bilingual for large organizations.",
    "facts": {
      "role": "Full-stack developer",
      "scope": "AI extraction pipelines, assessment generation, evaluation workflows",
      "audience": "HR teams in large Arabic/English organizations"
    },
    "challenge": {
      "body": "HR teams sit on piles of unstructured text — job descriptions, requirements, evaluation notes — and turning that into measurable competencies and fair assessments is slow manual work. The platform had to extract structure reliably from that text and produce assessments an HR team can actually defend.",
      "points": [
        "Job descriptions arrive as unstructured text",
        "Competencies and KPIs extracted consistently, not ad hoc",
        "Assessments generated, not hand-written per role",
        "Arabic and English on equal footing"
      ]
    },
    "approach": {
      "body": "The backend is FastAPI on MongoDB with modular async workflows, using Gemini-powered AI for the extraction and generation steps: competencies and KPIs pulled from job descriptions, MCQ assessments generated from them, and talent evaluated against the extracted structure.",
      "points": [
        "FastAPI + MongoDB with modular async workflows",
        "AI extraction of competencies and KPIs",
        "AI-driven MCQ generation",
        "Structured, repeatable talent evaluation"
      ]
    },
    "delivered": {
      "body": "An HR pipeline that goes from raw text to structured evaluation.",
      "points": [
        "Automated competency and KPI extraction from job descriptions",
        "AI-generated assessments",
        "Structured talent evaluation workflows",
        "Localized Arabic/English interface"
      ]
    },
    "outcome": {
      "body": "Baserah turns days of manual HR analysis into an automated pipeline — an example of the applied-AI backend work I build beyond classic CRUD platforms.",
      "points": [
        "Manual extraction work automated end to end",
        "Consistent, structured evaluations",
        "Applied AI in a production backend architecture"
      ]
    }
  },
  "ar": {
    "title": "Baserah AI، تحويل بيانات HR غير المنظمة لتقييمات",
    "summary": "منصة ذكاء اصطناعي متكاملة للموارد البشرية بتؤتمت استخراج الجدارات ومؤشرات الأداء من الوصف الوظيفي، وبتولّد التقييمات، وبتقيّم المواهب بشكل منظم — ثنائية اللغة للمؤسسات الكبيرة.",
    "facts": {
      "role": "مطور Full-Stack",
      "scope": "خطوط استخراج بالذكاء الاصطناعي، توليد تقييمات، دورات تقييم",
      "audience": "فرق الموارد البشرية في مؤسسات كبيرة عربية/إنجليزية"
    },
    "challenge": {
      "body": "فرق الـ HR قاعدة على أكوام نصوص غير منظمة — أوصاف وظيفية ومتطلبات وملاحظات تقييم — وتحويل ده لجدارات قابلة للقياس وتقييمات عادلة شغل يدوي بطيء. المنصة كان لازم تستخرج البنية من النص ده بشكل موثوق وتنتج تقييمات فريق الـ HR يقدر يدافع عنها.",
      "points": [
        "الأوصاف الوظيفية بتوصل كنص غير منظم",
        "استخراج الجدارات والـ KPIs بشكل متسق مش عشوائي",
        "التقييمات بتتولد مش بتتكتب يدوياً لكل وظيفة",
        "العربي والإنجليزي على قدم المساواة"
      ]
    },
    "approach": {
      "body": "الخلفية FastAPI على MongoDB بدورات عمل غير متزامنة معيارية، وخطوات الاستخراج والتوليد بتشتغل بذكاء اصطناعي مبني على Gemini: الجدارات والـ KPIs بتتسحب من الوصف الوظيفي، واختبارات MCQ بتتولد منها، والمواهب بتتقيّم على البنية المستخرجة.",
      "points": [
        "FastAPI + MongoDB بدورات عمل غير متزامنة معيارية",
        "استخراج الجدارات والـ KPIs بالذكاء الاصطناعي",
        "توليد اختبارات MCQ آلياً",
        "تقييم مواهب منظم وقابل للتكرار"
      ]
    },
    "delivered": {
      "body": "خط HR كامل من النص الخام للتقييم المنظم.",
      "points": [
        "استخراج مؤتمت للجدارات والـ KPIs من الأوصاف الوظيفية",
        "تقييمات مولّدة بالذكاء الاصطناعي",
        "دورات عمل تقييم مواهب منظمة",
        "واجهة معرّبة عربي/إنجليزي"
      ]
    },
    "outcome": {
      "body": "بصيرة بتحوّل أيام من التحليل اليدوي لخط مؤتمت — نموذج لشغل الـ AI التطبيقي في الباك إند اللي ببنيه أبعد من منصات الـ CRUD التقليدية.",
      "points": [
        "شغل الاستخراج اليدوي اتأتمت بالكامل",
        "تقييمات متسقة ومنظمة",
        "ذكاء اصطناعي تطبيقي في معمارية باك إند إنتاجية"
      ]
    }
  }
};

export default content;
