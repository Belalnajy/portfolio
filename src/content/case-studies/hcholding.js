const content = {
  "en": {
    "title": "HC Holding, a Training Center for the Makkah Health Cluster",
    "summary": "A specialized LMS for the Health Cluster Holding Company in Makkah, delivering SCFHS-accredited CPR, BLS, First Aid and nursing courses with automated, QR-verified certification. Runs on the same LMS engine as Injaz and Mada Education under its own brand.",
    "facts": {
      "role": "Sole developer of the platform and the shared LMS engine",
      "scope": "Accredited healthcare training, QR certificates, payments, NELC reporting",
      "audience": "Healthcare staff of the Makkah Health Cluster"
    },
    "challenge": {
      "body": "Life-support training — CPR, BLS, First Aid — is training people rely on in emergencies, so the accreditation and the certificate behind it have to be beyond question. The platform needed per-video assessment, verifiable certification, and payment flows that include bank transfers with receipt upload, all reported through NELC.",
      "points": [
        "SCFHS-accredited life-support and nursing curricula",
        "Certificates verifiable by QR code",
        "Bank-transfer payments with receipt upload alongside MyFatoorah",
        "NELC compliance reporting"
      ]
    },
    "approach": {
      "body": "Rather than building from zero, I deployed the accredited LMS engine I built for this family of platforms — Django and PostgreSQL at the core, Celery and Redis for async work — and layered HC Holding's own brand, catalogue and payment configuration on top. Per-video quizzes gate progress, and certificates are issued automatically with QR verification.",
      "points": [
        "Shared accredited engine, independent brand and catalogue",
        "Video learning with per-video quiz gates",
        "Automated certificates with QR verification",
        "MyFatoorah plus bank-transfer receipt flow"
      ]
    },
    "delivered": {
      "body": "A complete accredited training center for a healthcare organization, live under its own identity.",
      "points": [
        "SCFHS-accredited CPR, BLS, First Aid and TOT training",
        "Progress tracking with per-video assessments",
        "QR-verified automated certification",
        "Admin, Instructor and Trainee dashboards",
        "NELC integration for national compliance"
      ]
    },
    "outcome": {
      "body": "The platform runs in production at lms-hcholding.org for the Health Cluster in Makkah. Launching it on the shared engine took days of brand and configuration work, not months of rebuilding.",
      "points": [
        "In production at lms-hcholding.org",
        "Accredited healthcare training for a government-linked cluster",
        "Launched in days on the shared engine, not months"
      ]
    }
  },
  "ar": {
    "title": "التجمع الصحي القابضة، مركز تدريب لتجمع مكة الصحي",
    "summary": "منصة LMS متخصصة لشركة التجمع الصحي القابضة في مكة المكرمة، بتقدم دورات معتمدة من SCFHS في الإنعاش القلبي ودعم الحياة والإسعافات الأولية والتمريض، بشهادات مؤتمتة بتحقق QR. شغالة على نفس محرك الإنجاز ومدى بهويتها الخاصة.",
    "facts": {
      "role": "المطور الوحيد للمنصة والمحرك المشترك",
      "scope": "تدريب صحي معتمد، شهادات QR، مدفوعات، تقارير NELC",
      "audience": "الكوادر الصحية في تجمع مكة الصحي"
    },
    "challenge": {
      "body": "تدريب دعم الحياة — CPR و BLS والإسعافات الأولية — ده تدريب الناس بتعتمد عليه في الطوارئ، فالاعتماد والشهادة اللي وراه لازم يكونوا فوق الشك. المنصة كانت محتاجة تقييم بعد كل فيديو، وشهادات قابلة للتحقق، ومسارات دفع تشمل التحويل البنكي برفع الإيصال، وكل ده بيترفع لـ NELC.",
      "points": [
        "مناهج دعم حياة وتمريض معتمدة من SCFHS",
        "شهادات قابلة للتحقق برمز QR",
        "دفع بالتحويل البنكي مع رفع الإيصال جنب MyFatoorah",
        "تقارير امتثال لـ NELC"
      ]
    },
    "approach": {
      "body": "بدل البناء من الصفر، نشرت محرك الـ LMS المعتمد اللي بنيته لعيلة المنصات دي — Django و PostgreSQL في النواة، و Celery و Redis للشغل غير المتزامن — وركّبت فوقه هوية التجمع الصحي وكتالوجه وإعدادات الدفع بتاعته. الاختبارات بعد كل فيديو بتتحكم في التقدم، والشهادات بتصدر أوتوماتيكياً بتحقق QR.",
      "points": [
        "محرك معتمد مشترك، وهوية وكتالوج مستقلين",
        "تعلم بالفيديو مع بوابات اختبار لكل فيديو",
        "شهادات مؤتمتة بتحقق QR",
        "MyFatoorah + مسار تحويل بنكي بالإيصال"
      ]
    },
    "delivered": {
      "body": "مركز تدريب معتمد متكامل لمؤسسة صحية، شغال بهويته الخاصة.",
      "points": [
        "تدريب معتمد من SCFHS: CPR و BLS وإسعافات أولية و TOT",
        "تتبع تقدم مع تقييم بعد كل فيديو",
        "شهادات مؤتمتة بتحقق QR",
        "لوحات تحكم للأدمن والمدرب والمتدرب",
        "تكامل NELC للامتثال الوطني"
      ]
    },
    "outcome": {
      "body": "المنصة شغالة فعلياً على lms-hcholding.org لتجمع مكة الصحي. إطلاقها على المحرك المشترك خد أيام من شغل الهوية والإعدادات، مش شهور من إعادة البناء.",
      "points": [
        "تعمل فعلياً على lms-hcholding.org",
        "تدريب صحي معتمد لتجمع مرتبط بجهة حكومية",
        "إطلاق في أيام على المحرك المشترك بدل شهور"
      ]
    }
  }
};

export default content;
