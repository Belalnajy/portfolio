const content = {
  "en": {
    "title": "Indstrz, a B2B Industrial Procurement Platform Built From Zero",
    "summary": "A B2B platform I co-founded that digitizes industrial procurement: buyers post RFQs, verified vendors respond, and both sides negotiate in real time. Selected for the Venture Ready Program by Plug and Play with support from GIZ Egypt and ITIDA.",
    "facts": {
      "role": "Co-founder and technical lead",
      "scope": "Digital RFQ workflow, real-time negotiation engine, platform architecture",
      "audience": "Industrial buyers and verified vendors"
    },
    "challenge": {
      "body": "Industrial procurement still runs on phone calls, spreadsheets and long email chains. Requesting quotes is slow, comparing offers is manual, and negotiations leave no trail. The platform had to move that whole cycle online — RFQs, vendor responses and live negotiation — and stay responsive with many conversations running at once.",
      "points": [
        "Traditional RFQ cycles are slow and untracked",
        "Negotiation needed to happen live, not over email",
        "Many concurrent conversations to handle smoothly",
        "Vendors must be verified before they can respond"
      ]
    },
    "approach": {
      "body": "I led the technical build with Next.js on the frontend and a Flask backend on PostgreSQL, structured as a layered architecture with a modular application factory pattern so features stay isolated and testable. Real-time messaging and notifications run over Socket.io, and access control is role-based with JWT token revocation.",
      "points": [
        "Next.js frontend, Flask and PostgreSQL backend",
        "Layered, modular application factory architecture",
        "Socket.io for live messaging and notifications",
        "Role-based access control with JWT revocation"
      ]
    },
    "delivered": {
      "body": "The core of the platform is the digital RFQ workflow between buyers and verified vendors, wrapped in real-time negotiation and automated conversation management.",
      "points": [
        "Digital RFQ workflows between buyers and verified vendors",
        "Real-time negotiation engine with live notifications",
        "Automated conversation management",
        "Secure role-based access for every account type"
      ]
    },
    "outcome": {
      "body": "Indstrz was selected for the Venture Ready Program, implemented by Plug and Play with support from GIZ Egypt and ITIDA, and hosted at Creativa Innovation Hubs in Alexandria — external validation of both the product and the build.",
      "points": [
        "Selected for the Venture Ready Program by Plug and Play",
        "Supported by GIZ Egypt and ITIDA",
        "Hosted at Creativa Innovation Hubs in Alexandria"
      ]
    }
  },
  "ar": {
    "title": "Indstrz، منصة مشتريات صناعية B2B مبنية من الصفر",
    "summary": "منصة B2B شاركت في تأسيسها بترقمن المشتريات الصناعية: المشتري ينشر طلب عرض أسعار (RFQ)، والموردون المعتمدون يردوا، والطرفين يتفاوضوا لحظياً. تم اختيارها ضمن برنامج Venture Ready من Plug and Play بدعم GIZ Egypt و ITIDA.",
    "facts": {
      "role": "شريك مؤسس وقائد تقني",
      "scope": "دورة RFQ رقمية، محرك تفاوض لحظي، معمارية المنصة",
      "audience": "مشترون صناعيون وموردون معتمدون"
    },
    "challenge": {
      "body": "المشتريات الصناعية لسه شغالة بالتليفونات والشيتات وسلاسل الإيميلات الطويلة. طلب عروض الأسعار بطيء، ومقارنة العروض يدوية، والمفاوضات مبيتسجلش منها حاجة. المنصة كان لازم تنقل الدورة دي كلها أونلاين — طلبات العروض وردود الموردين والتفاوض المباشر — وتفضل سريعة مع محادثات كتير شغالة في نفس الوقت.",
      "points": [
        "دورات RFQ التقليدية بطيئة وغير موثقة",
        "التفاوض لازم يحصل لحظياً مش على الإيميل",
        "محادثات متزامنة كتير لازم تتعامل بسلاسة",
        "الموردون لازم يتم اعتمادهم قبل ما يردوا"
      ]
    },
    "approach": {
      "body": "قدت البناء التقني بواجهة Next.js وخلفية Flask على PostgreSQL، بمعمارية طبقية بنمط Modular Application Factory عشان كل ميزة تفضل معزولة وقابلة للاختبار. المراسلة والإشعارات اللحظية شغالة بـ Socket.io، والصلاحيات قائمة على الأدوار مع إبطال توكن JWT.",
      "points": [
        "واجهة Next.js وخلفية Flask و PostgreSQL",
        "معمارية طبقية بنمط Modular Application Factory",
        "Socket.io للمراسلة والإشعارات اللحظية",
        "صلاحيات قائمة على الأدوار مع إبطال JWT"
      ]
    },
    "delivered": {
      "body": "قلب المنصة هو دورة الـ RFQ الرقمية بين المشترين والموردين المعتمدين، ومعاها تفاوض لحظي وإدارة محادثات مؤتمتة.",
      "points": [
        "دورات RFQ رقمية بين المشترين والموردين المعتمدين",
        "محرك تفاوض لحظي مع إشعارات مباشرة",
        "إدارة محادثات مؤتمتة",
        "صلاحيات آمنة قائمة على الأدوار لكل نوع حساب"
      ]
    },
    "outcome": {
      "body": "تم اختيار Indstrz ضمن برنامج Venture Ready، المنفَّذ بواسطة Plug and Play بدعم من GIZ Egypt و ITIDA، ومستضاف في مراكز Creativa للابتكار بالإسكندرية — اعتراف خارجي بالمنتج وطريقة بنائه.",
      "points": [
        "مختارة ضمن برنامج Venture Ready من Plug and Play",
        "بدعم من GIZ Egypt و ITIDA",
        "مستضافة في مراكز Creativa للابتكار بالإسكندرية"
      ]
    }
  }
};

export default content;
