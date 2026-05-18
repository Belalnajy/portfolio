"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
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
          'UDUIPA (uduipa.com) is an official platform built with Turborepo. It manages thousands of memberships and automates PDF/QR generation. It demonstrates my ability to build reliable, large-scale production systems for academic institutions.',
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
          'An official platform (uduipa.com) managing thousands of memberships. I used a Turborepo monorepo (Next.js/NestJS) to automate document generation and QR verification, demonstrating enterprise-grade reliability.',
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
          "I prioritize business value. I don't just write code; I identify bottlenecks—like negotiation latency in Indstrz—and architect logical solutions like automated RFQ pipelines to solve them.",
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
        question: 'Assistant Tech Stack',
        id: 'assistant_tech_stack',
        category: 'Tech',
        icon: <FaCode />,
        answer:
          'This tool is built with React 19, Framer Motion, and Tailwind CSS. It demonstrates my ability to handle complex state, bilingual RTL logic, and premium UI animations without external heavy libraries.',
      },

      // --- HR & General ---
      {
        question: 'Why hire Belal?',
        id: 'hr_why',
        category: 'HR',
        icon: <FaCheckCircle />,
        answer:
          "I bring technical mastery, a business-first mindset, and production experience. I build tools that don't just work—they provide ROI and solve real human problems efficiently.",
      },
      {
        question: 'Can you show me projects?',
        id: 'value_clarity',
        category: 'HR',
        icon: <FaProjectDiagram />,
        answer:
          'Absolutely! I can show you my top Web and React projects, explain my custom backend architectures, and show you live demos currently serving real users in the market.',
      },
      {
        question: 'Work mode & Availability?',
        id: 'hr_availability',
        category: 'HR',
        icon: <FaEnvelope />,
        answer:
          "I'm currently open to full-time opportunities (Remote or On-site). I'm looking for a dynamic team where I can contribute my technical mastery in Full-Stack development and build scalable solutions.",
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
          'منصة B2B ضخمة مبنية بـ Next.js و Flask. صممت نظام الـ RFQ الرقمي بالكامل ودعمت التفاوض المباشر بـ Socket.io، وده حل مشكلة بطء التوريد التقليدي في قطاع الصناعة.',
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
          'منصة رسمية (uduipa.com) بتدير آلاف العضويات. استخدمت Turborepo لأتمتة إصدار الشهادات والـ QR Codes، وده بيثبت قدرتي على بناء أنظمة Enterprise موثوقة وشغالة فعلاً.',
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
          'قمت ببناء ونشر نظام إدارة مخازن متكامل على Railway باستخدام Django و PostgreSQL. النظام بيوفر تتبع لحظي للمخزون ودقة عالية في البيانات، وحل مشاكل التسجيل اليدوي المتكررة.',
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
          'عندي خبرة كبيرة في نشر التطبيقات على Railway و Vercel و VPS. بهتم جداً إن المشروع يكون Production-ready من حيث الـ Error handling والـ Logging عشان يشتغل بكفاءة دايماً.',
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
          'متخصص في بناء Backend قوي بـ NestJS و Django. بصمم APIs آمنة (REST/GraphQL) مع نظام صلاحيات متقدم (RBAC) واستعلامات قاعدة بيانات محسنة جداً بأدوات زي Prisma أو TypeORM.',
      },
      {
        question: 'التقنيات المستخدمة هنا؟',
        id: 'assistant_tech_stack_ar',
        category: 'Tech',
        icon: <FaCode />,
        answer:
          'الأداة دي مبنية بـ React 19 و Framer Motion و Tailwind. بتوري مهاراتي في التعامل مع الـ Complex State والـ RTL وتقديم UI فاخر من غير مكتبات تقيلة.',
      },

      // --- HR ---
      {
        question: 'ليه بلال تحديداً؟',
        id: 'hr_why_ar',
        category: 'HR',
        icon: <FaCheckCircle />,
        answer:
          'لأني بجمع بين التمكن التقني وعقلية البيزنس. أهدافي هي الـ ROI وزيادة الكفاءة، ومشاريعي السابقة بتثبت قدرتي على تحويل الاحتياجات لنتايج حقيقية وملموسة.',
      },
      {
        question: 'أقدر أعرف إيه هنا؟',
        id: 'value_clarity_ar',
        category: 'HR',
        icon: <FaProjectDiagram />,
        answer:
          'أنا هنا عشان أوريك أهم مشاريع بلال في الـ Web و React، مهاراته التقنية، وإزاي بيحول المشاكل المعقدة لبرامج سهلة الاستخدام وحلول عملية فعلاً.',
      },
      {
        question: 'متاح للعمل ونظام الشغل؟',
        id: 'hr_availability_ar',
        category: 'HR',
        icon: <FaEnvelope />,
        answer:
          'أنا متاح حالياً للفرص الوظيفية (Remote أو On-site). بدور على تحدي جديد في فريق عمل طموح، أقدر من خلاله أساهم بمهاراتي كمهندس Full-Stack في بناء منتجات تقنية قوية.',
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
        : 'أقدر أوريك أهم مشاريع بلال في الـ Web و React، مهاراته التقنية، وإزاي بيحل مشاكل البيزنس برمجياً. أقدر أساعدك بإيه؟';

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

    setTimeout(() => {
      const botMessage = { id: Date.now() + 1, text: q.answer, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] glass-card flex flex-col shadow-2xl rounded-2xl overflow-hidden border border-[rgb(var(--primary))]/40 bg-[rgb(var(--background))]/80 md:bg-transparent">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-between border-b border-[rgb(var(--border))]">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
                  <FaUserAstronaut />
                </div>
                <div>
                  <h3 className="font-bold text-[rgb(var(--foreground))]">
                    Belal Smart Assistant
                  </h3>
                  <p className="text-xs text-green-400">
                    Online | Smart Helper
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[rgb(var(--muted-foreground))] hover:text-red-500 transition-colors">
                <FaTimes size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div
              className={`flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar ${
                language === 'ar' ? 'text-right' : 'text-left'
              }`}>
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-3">
                  <motion.div
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
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-none'
                          : 'glass-card text-[rgb(var(--foreground))] rounded-tl-none border border-[rgb(var(--border))]'
                      }`}
                      dir={
                        language === 'ar' && msg.sender === 'bot'
                          ? 'rtl'
                          : 'ltr'
                      }>
                      {msg.text}
                    </div>
                  </motion.div>

                  {msg.isLanguageSelect && !language && (
                    <div className="flex justify-center space-x-4 mt-2">
                      <button
                        onClick={() => handleLanguageSelect('en')}
                        className="px-4 py-2 bg-blue-600 rounded-xl text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-lg">
                        English 🇺🇸
                      </button>
                      <button
                        onClick={() => handleLanguageSelect('ar')}
                        className="px-4 py-2 bg-purple-600 rounded-xl text-xs font-bold text-white hover:bg-purple-700 transition-all shadow-lg font-arabic">
                        العربية 🇪🇬
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="glass-card p-3 rounded-2xl rounded-tl-none border border-[rgb(var(--border))]">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-1.5 h-1.5 bg-[rgb(var(--primary))] rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: 0.2,
                        }}
                        className="w-1.5 h-1.5 bg-[rgb(var(--primary))] rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: 0.4,
                        }}
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
                dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <div className="flex space-x-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar scroll-smooth">
                  {['HR', 'Projects', 'Results', 'Approach', 'Tech'].map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1 text-[10px] uppercase font-bold rounded-full transition-all whitespace-nowrap ${
                          activeCategory === cat
                            ? 'bg-[rgb(var(--primary))] text-white'
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
                <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto custom-scrollbar pr-1">
                  {knowledgeBase[language]
                    .filter((q) => q.category === activeCategory)
                    .map((q) => (
                      <button
                        key={q.id}
                        onClick={() => handleQuestionClick(q)}
                        disabled={isTyping}
                        className="flex items-center space-x-2 px-3 py-1.5 text-xs glass-card border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))]/10 transition-all text-[rgb(var(--foreground))] rounded-full whitespace-nowrap">
                        <span className="text-[rgb(var(--primary))]">
                          {q.icon}
                        </span>
                        <span>{q.question}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        animate={
          !isOpen
            ? {
                y: [0, -10, 0],
              }
            : {}
        }
        transition={
          !isOpen
            ? {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : {}
        }
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/40 relative group border border-white/20">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}>
              <FaTimes size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}>
              <FaUserAstronaut size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[rgb(var(--background))] animate-pulse" />
        )}

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-4 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            How can I help you?
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default AIAssistant;
