const content = {
  "en": {
    "title": "A Double-Blind Peer-Review System for a Saudi University",
    "summary": "A full-stack platform managing the academic journal lifecycle — submission, double-blind review, scoring, issues and payments — built with React, NestJS, TypeORM and PostgreSQL in an Nx monorepo.",
    "facts": {
      "role": "Full-stack developer",
      "scope": "Peer-review workflows, four-role permission model, payments, certificates",
      "audience": "Researchers, reviewers and editors of a university journal"
    },
    "challenge": {
      "body": "Double-blind review is an integrity mechanism: authors and reviewers must never see each other's identities, while editors see everything. Encoding that into software means the permission model is the product — one leak in a query breaks the blindness. On top of that: submissions, scoring, issue assembly, payments and official acceptance certificates.",
      "points": [
        "Double-blind anonymity enforced by the data model itself",
        "Four roles — Admin, Editor, Reviewer, Researcher — with strict boundaries",
        "Automated evaluation scoring",
        "Official documents that must be verifiable"
      ]
    },
    "approach": {
      "body": "I built it in an Nx monorepo — React frontend, NestJS with TypeORM on PostgreSQL — with JWT authentication and advanced role-based permission handling designed around the blindness requirement. Research moves through submission, assignment, review and automated scoring; accepted papers get PDF previews, QR codes and generated acceptance certificates.",
      "points": [
        "Nx monorepo: React + NestJS + TypeORM + PostgreSQL",
        "Permission model built around double-blind anonymity",
        "Submission-to-scoring automated workflow",
        "PDF preview, QR generation, automated certificates"
      ]
    },
    "delivered": {
      "body": "The journal's complete editorial machine, from submission to published issue.",
      "points": [
        "Double-blind peer-review workflows",
        "Research submission with automated evaluation scoring",
        "Issue management and online payments",
        "QR-verified acceptance certificates"
      ]
    },
    "outcome": {
      "body": "The system is live at upafa-edu.net running the journal's editorial process for a Saudi university — academic-grade integrity requirements delivered as working software.",
      "points": [
        "Live at upafa-edu.net",
        "Editorial lifecycle fully digitized",
        "Review integrity enforced by design"
      ]
    }
  },
  "ar": {
    "title": "نظام تحكيم سري مزدوج لجامعة سعودية",
    "summary": "منصة متكاملة بتدير دورة حياة المجلة الأكاديمية — التقديم والتحكيم السري المزدوج والتقييم والأعداد والمدفوعات — مبنية بـ React و NestJS و TypeORM و PostgreSQL في Nx Monorepo.",
    "facts": {
      "role": "مطور Full-Stack",
      "scope": "دورات التحكيم، نموذج صلاحيات بأربعة أدوار، مدفوعات، شهادات",
      "audience": "باحثون ومحكمون ومحررون في مجلة جامعية"
    },
    "challenge": {
      "body": "التحكيم السري المزدوج آلية نزاهة: المؤلف والمحكم عمرهم ما يشوفوا هوية بعض، بينما المحرر شايف كل حاجة. ترجمة ده لسوفتوير معناها إن نموذج الصلاحيات هو المنتج نفسه — تسريب واحد في استعلام بيكسر السرية. وفوق ده: تقديمات وتقييم وتجميع أعداد ومدفوعات وشهادات قبول رسمية.",
      "points": [
        "سرية مزدوجة بيفرضها نموذج البيانات نفسه",
        "أربعة أدوار — أدمن ومحرر ومحكم وباحث — بحدود صارمة",
        "تقييم آلي للأبحاث",
        "مستندات رسمية لازم تكون قابلة للتحقق"
      ]
    },
    "approach": {
      "body": "بنيته في Nx Monorepo — واجهة React وخلفية NestJS مع TypeORM على PostgreSQL — بمصادقة JWT ومعالجة صلاحيات متقدمة متصممة حوالين شرط السرية. البحث بيتحرك من التقديم للتعيين للتحكيم للتقييم الآلي؛ والأبحاث المقبولة بتاخد معاينة PDF ورموز QR وشهادات قبول مولّدة.",
      "points": [
        "Nx Monorepo: React + NestJS + TypeORM + PostgreSQL",
        "نموذج صلاحيات مبني حوالين السرية المزدوجة",
        "دورة مؤتمتة من التقديم للتقييم",
        "معاينة PDF وتوليد QR وشهادات آلية"
      ]
    },
    "delivered": {
      "body": "ماكينة التحرير الكاملة للمجلة، من التقديم للعدد المنشور.",
      "points": [
        "دورات تحكيم سري مزدوج",
        "تقديم أبحاث بتقييم آلي",
        "إدارة الأعداد ومدفوعات أونلاين",
        "شهادات قبول بتحقق QR"
      ]
    },
    "outcome": {
      "body": "النظام شغال على upafa-edu.net بيدير العملية التحريرية لمجلة جامعة سعودية — متطلبات نزاهة أكاديمية اتسلّمت كسوفتوير شغال.",
      "points": [
        "شغال على upafa-edu.net",
        "دورة التحرير مرقمنة بالكامل",
        "نزاهة التحكيم مفروضة بالتصميم"
      ]
    }
  }
};

export default content;
