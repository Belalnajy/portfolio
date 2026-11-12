"use client";
import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  FaTimes,
  FaPaperPlane,
  FaUserAstronaut,
  FaProjectDiagram,
  FaCode,
  FaLanguage,
  FaEnvelope,
  FaDatabase,
  FaGraduationCap,
  FaLightbulb,
  FaCheckCircle,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useEscapeLayer } from '../lib/useEscapeLayer';

const FaqAssistant = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const panelRef = useRef(null);
  const launcherRef = useRef(null);
  // Whatever had focus when the panel opened (the desktop launcher or the
  // phone dock's FAQ item), so closing can hand focus back.
  const openerRef = useRef(null);

  const openPanel = () => {
    openerRef.current = document.activeElement;
    setIsOpen(true);
  };

  // Below xl the contact dock owns the only visible launcher; it asks
  // for the panel with an event so neither component has to know the other.
  useEffect(() => {
    const open = () => {
      openerRef.current = document.activeElement;
      setIsOpen(true);
    };
    window.addEventListener('faq:open', open);
    return () => window.removeEventListener('faq:open', open);
  }, []);

  // A non-modal dialog: focus moves into it on open, Escape closes it, and
  // focus returns to the control that opened it (or, if that is gone, as the
  // dock's menu item is once the dock folds, to the dock's own button).
  useEffect(() => {
    if (!isOpen) return undefined;
    const root = document.documentElement;
    const launcher = launcherRef.current;
    const panel = panelRef.current;
    root.setAttribute('data-faq-open', '');
    panel?.focus({ preventScroll: true });
    return () => {
      root.removeAttribute('data-faq-open');
      // A non-modal panel: if focus already went elsewhere on the page (the
      // contact form, say), closing must not pull it back.
      const current = document.activeElement;
      if (current && current !== document.body && !panel?.contains(current)) return;
      const opener = openerRef.current;
      const visible = (el) => el && el.isConnected && el.getClientRects().length > 0;
      const target = visible(opener)
        ? opener
        : [launcher, document.querySelector('#contact-dock > button[aria-expanded]')].find(visible);
      target?.focus({ preventScroll: true });
    };
  }, [isOpen]);
  useEscapeLayer(isOpen, () => setIsOpen(false));
  const [language, setLanguage] = useState(null); // 'en' or 'ar'
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Welcome! Please choose your preferred language / أهلاً بك! يرجى اختيار اللغة المفضل',
      sender: 'bot',
      isLanguageSelect: true,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState('HR');
  const chatEndRef = useRef(null);
  // The pretend "typing" pause before an answer; cleared on unmount so it
  // never sets state on a component that is gone.
  const replyTimer = useRef(null);
  useEffect(() => () => clearTimeout(replyTimer.current), []);

  const knowledgeBase = {
    en: [
      {
        question: 'Tell me about Indstrz',
        id: 'project_indstrz',
        category: 'Projects',
        icon: <FaProjectDiagram />,
        answer:
          'Indstrz is a B2B Industrial Marketplace built with Next.js and Flask. It features real-time RFQ workflows and Socket.io messaging. I solved complex negotiation bottlenecks by implementing a modular backend that handles high-concurrency requests smoothly.',
      },
      {
        question: 'What is UDUIPA?',
        id: 'project_uduipa',
        category: 'Projects',
        icon: <FaProjectDiagram />,
        answer:
          'UDUIPA is an official platform built with Turborepo, made to manage thousands of memberships and automate PDF/QR generation. It demonstrates my ability to build reliable, large-scale production systems for academic institutions.',
      },
      {
        question: 'Inventory Management System?',
        id: 'project_inventory',
        category: 'Results',
        icon: <FaDatabase />,
        answer:
          'A robust Inventory Management System deployed on Railway. I used Django and PostgreSQL to create a scalable solution for real-time stock tracking and role-based access control, solving traditional inventory errors.',
      },
      {
        question: 'How do you solve problems?',
        id: 'problem_solving',
        category: 'Approach',
        icon: <FaLightbulb />,
        answer:
          'I focus on building practical solutions that impact the business. For example, in Baserah, I reduced manual HR evaluation time by 70% by architecting automated logic that extracts KPIs and generates assessments from raw data.',
      },
      {
        question: 'Backend Knowledge?',
        id: 'backend',
        category: 'Tech',
        icon: <FaCode />,
        answer:
          'I specialize in NestJS, Django, and Flask, using layered architectures and RBAC for secure, scalable systems.',
      },
      // --- Projects ---
      {
        question: 'Indstrz - B2B Marketplace',
        id: 'project_indstrz',
        category: 'Projects',
        icon: <FaProjectDiagram />,
        answer:
          'A high-scale B2B procurement platform built with Next.js and Flask. I architected the digital RFQ workflow and implemented real-time negotiation channels using Socket.io, streamlining the industrial supply chain.',
      },
      {
        question: 'Most Challenging Project?',
        id: 'challenging_project',
        category: 'Projects',
        icon: <FaLightbulb />,
        answer:
          'Indstrz was highly complex due to the multi-role RFQ flow. I solved it by creating a state-driven negotiation engine that handles complex business logic and real-time updates seamlessly.',
      },
      {
        question: 'UDUIPA - Academic Union',
        id: 'project_uduipa',
        category: 'Projects',
        icon: <FaGraduationCap />,
        answer:
          'An official platform managing thousands of memberships. I used a Turborepo monorepo (Next.js/NestJS) to automate document generation and QR verification, demonstrating enterprise-grade reliability.',
      },
      {
        question: 'Orca - Premium E-commerce',
        id: 'project_orca',
        category: 'Projects',
        icon: <FaProjectDiagram />,
        answer:
          'A full-featured clothing brand store with JWT-secured auth and Paymob integration. It showcases my ability to build polished consumer-facing apps with complex state management and secure payments.',
      },

      // --- Results ---
      {
        question: 'Inventory System on Railway',
        id: 'project_inventory',
        category: 'Results',
        icon: <FaDatabase />,
        answer:
          'I built and deployed a robust Inventory Management system on Railway using Django and PostgreSQL. It features real-time stock tracking and RBAC, solving critical data entry errors for small-scale industrial units.',
      },
      {
        question: 'Impact at Baserah AI',
        id: 'baserah_impact',
        category: 'Results',
        icon: <FaCheckCircle />,
        answer:
          'Reduced manual HR evaluation time by 70% by designing automated logic layers that extract KPIs from job descriptions and generate structured assessments using LLM-driven pipelines.',
      },
      {
        question: 'Production Deployment Exp?',
        id: 'deployment_exp',
        category: 'Results',
        icon: <FaEnvelope />,
        answer:
          'I have extensive experience deploying apps to Railway, Vercel, and VPS. I ensure applications are production-ready with proper logging, error handling, and environment configuration.',
      },
      {
        question: 'LMS Success (ITI)',
        id: 'iti_success',
        category: 'Results',
        icon: <FaCheckCircle />,
        answer:
          'Developed a Scientific Journal System for a Saudi University which successfully handles double-blind peer reviews and automated certification, significantly speeding up the academic publishing cycle.',
      },

      // --- Approach ---
      {
        question: 'How do you solve problems?',
        id: 'problem_solving',
        category: 'Approach',
        icon: <FaLightbulb />,
        answer:
          "I prioritize business value. I don't just write code; I identify bottlenecks, like negotiation latency in Indstrz, and architect logical solutions like automated RFQ pipelines to solve them.",
      },
      {
        question: 'Ensuring Code Quality?',
        id: 'code_quality',
        category: 'Approach',
        icon: <FaCheckCircle />,
        answer:
          'I follow Clean Code principles and use layered architectures (NestJS/Django) to separate concerns. This makes the codebase maintainable, testable, and easy to scale for other developers.',
      },
      {
        question: 'Clean Architecture Logic',
        id: 'clean_architecture',
        category: 'Approach',
        icon: <FaCode />,
        answer:
          'I use layered architectures (NestJS/Django) to ensure scalability. By separating concerns between business logic, data access, and UI, I build maintainable systems that grow with the user base.',
      },
      {
        question: 'User Experience Strategy',
        id: 'ux_strategy',
        category: 'Approach',
        icon: <FaUserAstronaut />,
        answer:
          'UX is not just about looks; it is about flow and accessibility. I implement mobile-first, responsive designs with smooth micro-animations to create a premium, intuitive feel that increases user engagement.',
      },

      // --- Tech ---
      {
        question: 'Why Next.js / React 19?',
        id: 'why_nextjs',
        category: 'Tech',
        icon: <FaCode />,
        answer:
          'I use Next.js for its superior SEO, performance (SSR/ISR), and developer experience. React 19 allows me to use advanced features like Server Actions to build faster, more secure full-stack apps.',
      },
      {
        question: 'Backend Mastery?',
        id: 'backend_tech',
        category: 'Tech',
        icon: <FaDatabase />,
        answer:
          'I specialize in NestJS and Django for their robustness. I build secure REST & GraphQL APIs with proper RBAC, JWT authentication, and optimized database queries using TypeORM or Prisma.',
      },
      {
        question: 'How is this FAQ built?',
        id: 'assistant_tech_stack',
        category: 'Tech',
        icon: <FaCode />,
        answer:
          'This FAQ widget is hand-built with React 19, Framer Motion, and Tailwind CSS: curated answers, not an AI chatbot. It demonstrates my ability to handle complex state, bilingual RTL logic, and premium UI animations without heavy external libraries.',
      },

      // --- HR & General ---
      {
        question: 'Why hire Belal?',
        id: 'hr_why',
        category: 'HR',
        icon: <FaCheckCircle />,
        answer:
          'I build real systems and keep them running myself: Bilqalam Institute serves thousands of students on a platform I built and still maintain alone. I work in Arabic and English, take over projects other developers left behind, and you deal with me directly from the first call to launch.',
      },
      {
        question: 'Can you show me projects?',
        id: 'value_clarity',
        category: 'HR',
        icon: <FaProjectDiagram />,
        answer:
          'Absolutely! I can show you my top Web and React projects, explain my custom backend architectures, and show you live products and demos.',
      },
      {
        question: 'Do you take freelance projects?',
        id: 'hr_availability',
        category: 'HR',
        icon: <FaEnvelope />,
        answer:
          'Yes. Alongside my full-time job as a Software Engineer at ezSec, I take freelance projects with a clear scope: new platforms, internal systems, and taking over existing projects that need fixing. The contact form or WhatsApp is the easiest way to start.',
      },
    ],
    ar: [
      // --- المشاريع ---
      {
        question: 'مشروع Indstrz (سوق صناعي)',
        id: 'project_indstrz_ar',
        category: 'Projects',
        icon: <FaProjectDiagram />,
        answer:
          'منصة B2B ضخمة مبنية بـ Next.js مع Flask. صممت نظام الـ RFQ الرقمي بالكامل ودعمت التفاوض المباشر بـ Socket.io، وده حل مشكلة بطء التوريد التقليدي في قطاع الصناعة.',
      },
      {
        question: 'أصعب مشروع واجهته؟',
        id: 'challenging_project_ar',
        category: 'Projects',
        icon: <FaLightbulb />,
        answer:
          'مشروع Indstrz كان فيه تعقيد كبير في تدفق البيانات بين المورد والمشتري. حليت المشكلة بتصميم "محرك تفاوض" بيعتمد على الحالات (State-driven) وتحديثات اللحظة الواحدة، وده ضمن استقرار النظام.',
      },
      {
        question: 'منصة UDUIPA (اتحاد رسمي)',
        id: 'project_uduipa_ar',
        category: 'Projects',
        icon: <FaGraduationCap />,
        answer:
          'منصة رسمية بتدير آلاف العضويات. استخدمت Turborepo لأتمتة إصدار الشهادات والـ QR Codes، وده بيثبت قدرتي على بناء أنظمة Enterprise موثوقة وشغالة فعلاً.',
      },
      {
        question: 'متجر Orca (براند ملابس)',
        id: 'project_orca_ar',
        category: 'Projects',
        icon: <FaProjectDiagram />,
        answer:
          'متجر إلكتروني متكامل للبراندات الفاخرة، مع ربط بوابة دفع Paymob ونظام تأمين JWT. بيوري مهاراتي في بناء تطبيقات موجهة للمستهلك النهائي بتجربة مستخدم عالمية.',
      },

      // --- نتائج فعلية ---
      {
        question: 'نظام مخازن (Deployed on Railway)',
        id: 'project_inventory_ar',
        category: 'Results',
        icon: <FaDatabase />,
        answer:
          'قمت ببناء ونشر نظام إدارة مخازن متكامل على Railway باستخدام Django مع PostgreSQL. النظام بيوفر تتبع لحظي للمخزون ودقة عالية في البيانات، وحل مشاكل التسجيل اليدوي المتكررة.',
      },
      {
        question: 'تأثير حقيقي في Baserah AI',
        id: 'baserah_impact_ar',
        category: 'Results',
        icon: <FaCheckCircle />,
        answer:
          'قدرت أقلل وقت تقييم الـ HR بنسبة 70% من خلال تصميم Logic برمجي بيستخرج مؤشرات الأداء (KPIs) وبيولد التقييمات أوتوماتيكياً من وصف الوظيفة، وده وفر مجهود بشري ضخم.',
      },
      {
        question: 'خبرتك في نشر المشاريع؟',
        id: 'deployment_exp_ar',
        category: 'Results',
        icon: <FaEnvelope />,
        answer:
          'عندي خبرة كبيرة في نشر التطبيقات على Railway، Vercel، VPS. بهتم جداً إن المشروع يكون Production-ready من حيث الـ Error handling والـ Logging عشان يشتغل بكفاءة دايماً.',
      },
      {
        question: 'نظام المجلات العلمية (نجاح)',
        id: 'iti_success_ar',
        category: 'Results',
        icon: <FaCheckCircle />,
        answer:
          'صممت نظام لإدارة المجلات العلمية لجامعة سعودية، بيقوم بعملية الـ Peer Review والتحكيم أوتوماتيكياً، وبأتمتة إصدار الشهادات، وده سرّع دورة النشر الأكاديمي بشكل ملحوظ.',
      },

      // --- أسلوب العمل ---
      {
        question: 'إزاي بتبدأ حل أي مشكلة؟',
        id: 'problem_solving_ar',
        category: 'Approach',
        icon: <FaLightbulb />,
        answer:
          'أهم حاجة هي "قيمة البيزنس". مش بس بكتب كود، أنا بحلل فين المشكلة - زي تأخير الرد في Indstrz - وبصمم حل برمجي (Automated RFQ) عشان يخلي العملية أسرع وأدق.',
      },
      {
        question: 'إزاي بتضمن جودة الكود؟',
        id: 'code_quality_ar',
        category: 'Approach',
        icon: <FaCheckCircle />,
        answer:
          'بتبع مبادئ الـ Clean Code وبستخدم الـ Layered Architectures (NestJS/Django). ده بيخلي الكود منظم، سهل الاختبار (Testable)، وسهل لأي مهندس تاني يكمل عليه ويطوره.',
      },
      {
        question: 'منطق الـ Clean Architecture',
        id: 'clean_architecture_ar',
        category: 'Approach',
        icon: <FaCode />,
        answer:
          'بستخدم الـ Layered Architectures (NestJS/Django) لضمان قابلية النظام للتوسع. لما بفصل الـ Logic عن الـ UI وعن الـ Database، ببني نظام قوي وسهل التعديل مهما كبر المشروع.',
      },
      {
        question: 'استراتيجية تجربة المستخدم',
        id: 'ux_strategy_ar',
        category: 'Approach',
        icon: <FaUserAstronaut />,
        answer:
          'الـ UX بالنسبة لي هو "سهولة وتدفق". بصمم واجهات Responsive وبضيف Micro-animations عشان المستخدم يحس بمنتج Premium واحترافي، وده اللي بيرفع نسبة التفاعل مع الموقع.',
      },

      // --- التقنيات ---
      {
        question: 'ليه Next.js / React 19؟',
        id: 'why_nextjs_ar',
        category: 'Tech',
        icon: <FaCode />,
        answer:
          'بفضل Next.js عشان قوته في الـ SEO والسرعة في التحميل (SSR). واستخدام React 19 بيخليني أستغل مميزات زي Server Actions لبناء تطبيقات Full-Stack أسرع وأكثر أماناً.',
      },
      {
        question: 'خبرتك في الـ Backend؟',
        id: 'backend_tech_ar',
        category: 'Tech',
        icon: <FaDatabase />,
        answer:
          'متخصص في بناء Backend قوي بـ NestJS أو Django. بصمم APIs آمنة (REST/GraphQL) مع نظام صلاحيات متقدم (RBAC) واستعلامات قاعدة بيانات محسنة جداً بأدوات زي Prisma أو TypeORM.',
      },
      {
        question: 'التقنيات المستخدمة هنا؟',
        id: 'assistant_tech_stack_ar',
        category: 'Tech',
        icon: <FaCode />,
        answer:
          'الأداة دي مبنية بـ React 19، Framer Motion، Tailwind. بتوري مهاراتي في التعامل مع الـ Complex State والـ RTL وتقديم UI فاخر من غير مكتبات تقيلة.',
      },

      // --- HR ---
      {
        question: 'ليه بلال تحديداً؟',
        id: 'hr_why_ar',
        category: 'HR',
        icon: <FaCheckCircle />,
        answer:
          'لأني أبني أنظمة حقيقية وأتولى تشغيلها بنفسي: معهد بالقلم يخدم آلاف الطلاب على منصة بنيتها وأتولى صيانتها بمفردي. أعمل بالعربي والإنجليزي، وأستلم المشاريع التي تركها مطورون آخرون، وتتعامل معي مباشرة من أول مكالمة حتى الإطلاق.',
      },
      {
        question: 'أقدر أعرف إيه هنا؟',
        id: 'value_clarity_ar',
        category: 'HR',
        icon: <FaProjectDiagram />,
        answer:
          'أنا هنا عشان أوريك أهم مشاريع بلال في الويب والـ React، مهاراته التقنية، وإزاي بيحول المشاكل المعقدة لبرامج سهلة الاستخدام وحلول عملية فعلاً.',
      },
      {
        question: 'هل تأخذ مشاريع فريلانس؟',
        id: 'hr_availability_ar',
        category: 'HR',
        icon: <FaEnvelope />,
        answer:
          'نعم. إلى جانب عملي بدوام كامل مهندس برمجيات في ezSec، آخذ مشاريع فريلانس بنطاق واضح: منصات جديدة، وأنظمة داخلية، واستلام مشاريع قائمة تحتاج إلى إصلاح. أسهل طريقة للبدء هي نموذج التواصل أو واتساب.',
      },
    ],
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    const greeting =
      lang === 'en'
        ? "I can show you Belal's top Web & React projects, technical skills, and how he solves business problems. How can I help you?"
        : 'أقدر أوريك أهم مشاريع بلال في الويب والـ React، مهاراته التقنية، وإزاي بيحل مشاكل البيزنس برمجياً. أقدر أساعدك بإيه؟';

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: lang === 'en' ? 'English 🇺🇸' : 'العربية 🇪🇬',
        sender: 'user',
      },
      { id: Date.now() + 1, text: greeting, sender: 'bot' },
    ]);
  };

  const handleQuestionClick = (q) => {
    if (isTyping) return;

    const userMessage = { id: Date.now(), text: q.question, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);

    clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => {
      const botMessage = { id: Date.now() + 1, text: q.answer, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.5rem)] md:bottom-6 xl:bottom-24 end-4 md:end-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <m.div
            ref={panelRef}
            id="faq-panel"
            role="dialog"
            aria-labelledby="faq-panel-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="focus:outline-none mb-4 w-[calc(100vw-2rem)] max-w-[350px] md:w-[400px] h-[70dvh] max-h-[500px] flex flex-col shadow-2xl rounded-2xl overflow-hidden border border-[rgb(var(--primary))]/40 bg-[rgb(var(--card))]">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[rgb(var(--accent))]/15 to-[rgb(var(--accent-hover))]/10 flex items-center justify-between border-b border-[rgb(var(--border))]">
              <div className="flex items-center gap-3">
                <div aria-hidden="true" className="p-2 bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] rounded-lg text-[rgb(var(--accent-contrast))]">
                  <FaUserAstronaut />
                </div>
                <div>
                  <h2 id="faq-panel-title" className="font-bold text-[rgb(var(--foreground))]">
                    {t('faq.title')}
                  </h2>
                  <p className="text-xs text-[rgb(var(--success))]">
                    {t('faq.subtitle')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={t('a11y.faq_close')}
                className="shrink-0 w-11 h-11 -me-2 flex items-center justify-center rounded-lg text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--destructive))] transition-colors">
                <FaTimes aria-hidden="true" size={18} />
              </button>
            </div>

            {/* Chat Body */}
            {/* role="log": new answers are read out as they arrive. Focusable
                so the conversation can be scrolled from the keyboard. */}
            <div
              role="log"
              aria-live="polite"
              aria-label={t('a11y.faq_conversation')}
              tabIndex={0}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-start">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-3">
                  <m.div
                    initial={{
                      opacity: 0,
                      x: msg.sender === 'user' ? 20 : -20,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] text-[rgb(var(--accent-contrast))] rounded-tr-none'
                          : 'glass-card text-[rgb(var(--foreground))] rounded-tl-none border border-[rgb(var(--border))]'
                      }`}
                      // Each bubble takes its direction from its own text and
                      // is voiced in the chat's language once one is chosen.
                      dir="auto"
                      lang={msg.isLanguageSelect ? undefined : language || undefined}>
                      {msg.text}
                    </div>
                  </m.div>

                  {msg.isLanguageSelect && !language && (
                    <div className="flex justify-center gap-4 mt-2">
                      <button
                        type="button"
                        lang="en"
                        onClick={() => handleLanguageSelect('en')}
                        className="min-h-[44px] px-4 py-2 bg-[rgb(var(--accent))] rounded-xl text-sm font-bold text-[rgb(var(--accent-contrast))] hover:bg-[rgb(var(--accent))] transition-all shadow-lg">
                        English <span aria-hidden="true">🇺🇸</span>
                      </button>
                      <button
                        type="button"
                        lang="ar"
                        onClick={() => handleLanguageSelect('ar')}
                        className="min-h-[44px] px-4 py-2 bg-[rgb(var(--accent))] rounded-xl text-sm font-bold text-[rgb(var(--accent-contrast))] hover:bg-[rgb(var(--accent))] transition-all shadow-lg font-arabic">
                        العربية <span aria-hidden="true">🇪🇬</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div aria-hidden="true" className="flex justify-start">
                  <div className="glass-card p-3 rounded-2xl rounded-tl-none border border-[rgb(var(--border))]">
                    <div className="flex gap-1">
                      <m.div
                        animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 1, 0] }}
                        transition={reduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 1 }}
                        className="w-1.5 h-1.5 bg-[rgb(var(--primary))] rounded-full"
                      />
                      <m.div
                        animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 1, 0] }}
                        transition={reduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="w-1.5 h-1.5 bg-[rgb(var(--primary))] rounded-full"
                      />
                      <m.div
                        animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 1, 0] }}
                        transition={reduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 1, delay: 0.4 }}
                        className="w-1.5 h-1.5 bg-[rgb(var(--primary))] rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions (Only show if language is selected) */}
            {language && (
              <div
                className="p-4 bg-[rgb(var(--background))]/50 border-t border-[rgb(var(--border))] space-y-3"
                lang={language}
                dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <div
                  role="group"
                  aria-label={t('a11y.faq_topics')}
                  className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar scroll-smooth">
                  {['HR', 'Projects', 'Results', 'Approach', 'Tech'].map(
                    (cat) => (
                      <button
                        key={cat}
                        type="button"
                        aria-pressed={activeCategory === cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`min-h-[44px] px-3 py-1 text-xs font-bold rounded-full transition-all whitespace-nowrap ${
                          activeCategory === cat
                            ? 'bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))]'
                            : 'glass-card text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                        }`}>
                        {cat === 'HR'
                          ? language === 'ar'
                            ? 'لـ HR'
                            : 'For HR'
                          : cat === 'Projects'
                          ? language === 'ar'
                            ? 'المشاريع'
                            : 'Projects'
                          : cat === 'Results'
                          ? language === 'ar'
                            ? 'نتايج فعلية'
                            : 'Results'
                          : cat === 'Approach'
                          ? language === 'ar'
                            ? 'أسلوب العمل'
                            : 'Approach'
                          : language === 'ar'
                          ? 'التقنيات'
                          : 'Tech Stack'}
                      </button>
                    )
                  )}
                </div>
                <div className="flex flex-wrap gap-2 max-h-[148px] overflow-y-auto custom-scrollbar pe-1">
                  {knowledgeBase[language]
                    .filter((q) => q.category === activeCategory)
                    .map((q) => (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => handleQuestionClick(q)}
                        disabled={isTyping}
                        className="flex items-center gap-2 min-h-[44px] px-3 py-1.5 text-sm glass-card border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))]/10 transition-all text-[rgb(var(--foreground))] rounded-full whitespace-nowrap">
                        <span aria-hidden="true" className="text-[rgb(var(--primary))]">
                          {q.icon}
                        </span>
                        <span>{q.question}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </m.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <m.button
        animate={
          !isOpen && !reduceMotion
            ? {
                y: [0, -10, 0],
              }
            : {}
        }
        transition={
          !isOpen && !reduceMotion
            ? {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : {}
        }
        ref={launcherRef}
        type="button"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => (isOpen ? setIsOpen(false) : openPanel())}
        aria-expanded={isOpen}
        // Only while the panel exists: it is unmounted when closed.
        aria-controls={isOpen ? 'faq-panel' : undefined}
        aria-label={t('faq.tooltip')}
        className="hidden xl:flex w-14 h-14 bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] rounded-full items-center justify-center text-[rgb(var(--accent-contrast))] shadow-lg relative group">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <m.div
              key="close"
              aria-hidden="true"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}>
              <FaTimes size={24} />
            </m.div>
          ) : (
            <m.div
              key="bot"
              aria-hidden="true"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}>
              <FaUserAstronaut size={28} />
            </m.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span aria-hidden="true" className="absolute -top-1 -end-1 w-4 h-4 bg-[rgb(var(--success))] rounded-full border-2 border-[rgb(var(--background))] animate-pulse" />
        )}

        {/* Tooltip */}
        {!isOpen && (
          <div aria-hidden="true" className="absolute end-full me-4 px-3 py-1 bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] text-[rgb(var(--accent-contrast))] text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {t('faq.tooltip')}
          </div>
        )}
      </m.button>
    </div>
  );
};

export default FaqAssistant;
