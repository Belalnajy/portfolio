import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        timeline: 'Experience',
        projects: 'Projects',
        testimonials: 'Testimonials',
        contact: 'Contact',
        download_cv: 'Download CV'
      },
      hero: {
        welcome: 'Welcome to my portfolio',
        greeting_start: 'Hi, I\'m ',
        name: 'Belal Nagy',
        i_am_a: 'I\'m a ',
        description_1: 'I build web platforms from zero, and take over existing codebases that need fixing. ',
        description_2: '31 projects',
        description_3: ' for ',
        description_4: '27 clients',
        description_5: ' across Egypt and the Gulf.',
        view_projects: 'View Projects',
        contact_me: 'Contact Me',
        download_cv: 'Download CV',
        follow_me: 'Follow me on Arabic platforms'
      },
      about: {
        title: 'About Me',
        subtitle: 'Full-stack developer in Alexandria, Egypt. Next.js, Laravel, NestJS, Node.js, Django, PostgreSQL.',
        personal_info: 'Personal Information',
        professional_summary: 'Professional Summary',
        labels: {
          name: 'Name',
          role: 'Role',
          education: 'Education',
          location: 'Location'
        },
        values: {
          name: 'Belal Nagy',
          role: 'Full Stack Developer',
          education: 'Bachelor of Business (MIS)',
          location: 'Alexandria, Egypt'
        },
        summary_p1: 'Full-stack developer based in <1>Alexandria, Egypt</1>. I work in Next.js, Laravel, NestJS, Node.js, Django and PostgreSQL. I am currently a full-stack developer at <3>S&F in Saudi Arabia</3>.',
        summary_p2: 'I am the sole developer on <1>Bilqalam Institute</1>, a production learning platform serving thousands of enrolled students. It handles student enrollment and management, billing and invoicing, and the admin reporting dashboards the institute runs on. I built it and I maintain it alone, in <3>Next.js and Laravel</3>.',
        summary_p3: 'I also built a multi-tenant LMS engine that runs as <1>three separately branded accredited platforms</1>, Injaz, HC Holding and Mada Education, on one hardened Django and PostgreSQL core. I co-founded Indstrz, a B2B industrial platform, and taught front-end development to <3>240+ students</3> as an external instructor at ITI. Arabic and RTL work goes into every project I ship, including the financial and data-heavy interfaces.',
        highlights: {
          sole_developer: {
            title: 'Sole developer on production systems',
            desc: 'Bilqalam serves thousands of students on a platform I built and maintain alone.'
          },
          multi_tenant: {
            title: 'Multi-tenant architecture',
            desc: 'One LMS engine, three accredited client platforms, one deployment pipeline.'
          },
          arabic_first: {
            title: 'Arabic-first',
            desc: 'Full RTL across dashboards, invoices and reports, not just landing pages.'
          }
        }
      },
      projects: {
        title: 'Featured Projects',
        subtitle: 'Here are some of my notable projects that showcase my skills and experience',
        search_placeholder: 'Search projects by name...',
        no_results: 'No projects found matching your criteria',
        view_details: 'View Details',
        categories: {
          all: 'All',
          fullstack: 'Full Stack',
          frontend: 'Frontend',
          backend: 'Backend',
          mobile: 'Mobile'
        },
        modal: {
          technologies: 'Technologies',
          features: 'Key Features & Highlights',
          live_link: 'Visit Live Project',
          source_code: 'View Source Code',
          case_study: 'Read the Case Study',
          close: 'Close',
          suite_title: 'Same Engine, Different Brands',
          suite_desc: 'This platform is one deployment of a shared LMS engine I built and maintain. Each client runs its own branded instance — distinct visual identity, accreditation and content — on top of the same accredited training, payment and certification core.'
        },
        items: {
          bilqalam: {
            title: 'Bilqalam Institute, Online Qur’an & Arabic Academy',
            desc: 'A production learning platform for an institute teaching Qur’an, Arabic and Islamic studies online, serving thousands of enrolled students. I am the sole developer. I built the student enrollment and management system, the billing and invoicing, and the admin reporting dashboards the institute runs on, and I maintain the platform alone.',
            features: [
              'Sole developer, built and maintained alone',
              'In production, serving thousands of enrolled students',
              'Student enrollment and management system',
              'Billing and invoicing',
              'Admin reporting dashboards the institute runs on',
              'Fully Arabic and RTL, including the financial and data-heavy views',
              'Built in Next.js and Laravel'
            ]
          },
          medicta: {
            title: 'Medicta – Healthcare Booking App (Code Redesign)',
            desc: 'An Android app for booking doctor appointments and browsing clinic services, published on Google Play. I re-architected the existing codebase and worked through its functional defects — refactoring the app structure while fixing broken flows across booking, authentication and data handling.',
            features: [
              'Full code redesign: restructured the app into clear, maintainable layers',
              'Systematic fixing of functional bugs across booking, auth and data flows',
              'Refactored API integration layer with consistent error and loading states',
              'Improved state management to remove stale-data and race-condition bugs',
              'UI/UX cleanup for smoother navigation and faster perceived performance',
              'Live on Google Play under the package com.medicta'
            ]
          },
          mada: {
            title: 'Mada Education – Accredited Training Platform',
            desc: 'An accredited e-learning and training platform running on the same LMS engine as Injaz and HC Holding, with its own visual identity and course catalogue. Video-based lessons, assessments, payments and automated certificates.',
            features: [
              'Course catalogue with video lessons, progress tracking and per-lesson quizzes',
              'Automated certificate issuance with unique IDs and online verification',
              'Payment gateway integration with shopping cart and discount coupons',
              'Multi-role dashboards for administrators, instructors and trainees',
              'Celery + Redis async processing for notifications, exports and reports',
              'Independent brand theme layered over the shared, accredited LMS core'
            ]
          },
          mutlq: {
            title: 'Mutlq – Corporate Showcase Website',
            desc: 'A corporate showcase and digital-identity website presenting the organisation’s services and delivered work, built as a fast, fully RTL Arabic experience with a distinct visual identity.',
            features: [
              'Brand-led landing experience with services and project gallery sections',
              'Fully RTL Arabic layout with responsive design across all breakpoints',
              'Content-managed sections so pages can be updated without code changes',
              'SEO and performance optimisation for fast first paint',
              'Integrated contact and enquiry flow'
            ]
          },
          toyo228: {
            title: 'Toyo228 – B2B Auto Parts Platform',
            desc: 'A B2B e-commerce platform connecting Toyota spare parts wholesalers with retail shops, featuring bulk search via Excel uploads, multi-panel dashboards, and a Turborepo monorepo architecture.',
            features: [
              'Multi-role panels: Admin, Wholesaler, and Retail Shop dashboards',
              'Bulk part search via Excel file upload with template downloads',
              'Shared TypeScript interfaces across frontend and backend via monorepo',
              'JWT authentication with httpOnly cookies and ownership guards',
              'Image gallery with drag-and-drop upload and server-side optimization'
            ]
          },
          motors: {
            title: 'Motors – Premium Car Marketplace',
            desc: 'A full-stack Arabic car marketplace platform for buying and selling new, used, and damaged vehicles with advanced search filters, user dashboards, and WhatsApp seller integration.',
            features: [
              'Advanced vehicle filtering by brand, price, fuel type, and condition',
              'User dashboard for managing car listings with full CRUD operations',
              'Image gallery with multi-photo upload and primary image selection',
              'RTL-first dark theme design optimized for the Saudi market',
              'WhatsApp integration for direct buyer-to-seller communication'
            ]
          },
          injaz: {
            title: 'Injaz – Medical Education LMS',
            desc: 'A comprehensive Learning Management System for SCFHS-accredited medical training courses with video-based learning, MCQ assessments, certificate generation, and NELC integration for the Saudi healthcare sector.',
            features: [
              'SCFHS-accredited video courses with progress tracking and quizzes',
              'Automated certificate generation with unique IDs and verification system',
              'MyFatoorah payment gateway integration with shopping cart and coupons',
              'NELC (National E-Learning Center) integration for course accreditation',
              'Celery + Redis async task processing for email notifications and reports',
              'Bilingual Arabic/English interface with full RTL support'
            ]
          },
          hcholding: {
            title: 'HC Holding – Health Cluster Training Center',
            desc: 'A specialized LMS platform for the Health Cluster Holding Company in Makkah, providing SCFHS-accredited CPR, BLS, First Aid, and nursing training courses with automated certification.',
            features: [
              'SCFHS-accredited healthcare training (CPR, BLS, First Aid, TOT)',
              'Video-based learning with per-video quiz assessments and progress tracking',
              'Automated certificate issuance with QR code verification',
              'MyFatoorah payment integration with bank transfer receipt upload',
              'NELC integration for national e-learning compliance and reporting',
              'Multi-role system: Admin, Instructor, and Trainee dashboards'
            ]
          },
          indstrz: {
            title: 'Indstrz, B2B Industrial Platform',
            desc: 'A B2B procurement platform with digital RFQ workflows, real-time negotiation and automated conversation management. Selected for the Venture Ready Program, implemented by Plug and Play with support from GIZ Egypt and ITIDA, hosted at Creativa Innovation Hubs in Alexandria.',
            features: [
              'Selected for the Venture Ready Program by Plug and Play, with GIZ Egypt and ITIDA support',
              'Hosted at Creativa Innovation Hubs in Alexandria',
              'Digital RFQ workflows between buyers and verified vendors',
              'Real-time messaging and notifications using Socket.io',
              'Role-based access control with JWT token revocation',
              'Layered architecture using a modular application factory pattern'
            ]
          },
          uduipa: {
            title: 'UDUIPA – University Union Digital Platform',
            desc: 'Official academic union platform for centralized membership management and automated verification workflows using a high-performance monorepo.',
            features: [
              'Centralized membership management and official academic verification',
              'Scalable RBAC system with secure JWT authentication',
              'Automated document pipelines for PDF generation and QR codes',
              'Fully localized RTL UI (Arabic, English, French) with analytics'
            ]
          },
          waferlee: {
            title: 'Waferlee – Community Deals & Coupons',
            desc: "Discovery platform enabling community deal voting, submissions, and moderation with a custom 'Temperature' algorithm for trending content.",
            features: [
              "Robust voting engine with custom 'Temperature' algorithm",
              'Real-time community voting, deal submissions, and moderation',
              'Secure interactions with RBAC and Google ReCAPTCHA',
              'Automated email flows and multi-channel notifications'
            ]
          },
          baserah: {
            title: 'Baserah AI – Intelligent HR Platform',
            desc: 'Full-stack AI HR platform automating KPI extraction, assessment generation, and talent evaluation from unstructured data.',
            features: [
              'Automated competency and KPI extraction from job descriptions',
              'AI-driven MCQ generation and structured talent evaluation',
              'Localized Arabic/English interface for large organizations',
              'High-performance NoSQL backend with modular async workflows'
            ]
          },
          sf_portal: {
            title: 'S&F Digital Portfolio – Corporate Portal',
            desc: 'Premium corporate portal consolidating investment inquiries, store requests, and job applications for multiple business verticals.',
            features: [
              'Modular UI library and interactive components using Framer Motion',
              'Consolidated multi-vertical requests into a single platform',
              'Robust multi-part form handling and real-time validation',
              'Integrated with Django REST API for critical business workflows'
            ]
          },
          journal: {
            title: 'Scientific Journal Management System',
            desc: 'A full-stack double-blind peer-review system for managing academic journals for a Saudi University. Built with React, NestJS, TypeORM, and PostgreSQL within an Nx Monorepo architecture.',
            features: [
              'Four user roles: Admin, Editor, Reviewer, Researcher with JWT authentication',
              'Double-blind peer-review system',
              'Research submission and automated evaluation scoring',
              'Issue management and online payments integration',
              'PDF preview, QR code generation, and automated acceptance certificates',
              'Advanced permission handling and role-based access control'
            ]
          },
          profleet: {
            title: 'Pro Fleet – Intelligent Fleet Management System',
            desc: 'A multilingual fleet management platform with real-time GPS tracking, analytics, and role-based dashboards for a Saudi startup. Features AI chatbot and interactive maps.',
            features: [
              'Real-time GPS tracking with interactive Leaflet maps',
              'AI chatbot for smart user assistance',
              'Multilingual support with RTL for Arabic',
              'Role-based dashboards and analytics',
              'Automated billing and payment processing',
              'Live shipment tracking and fleet operations management'
            ]
          },
          clinic: {
            title: 'Clinic Management System (ITI Graduation Project)',
            desc: 'A comprehensive clinic management system with smart appointment scheduling, role-based dashboards, and real-time analytics. Features AI chatbot using Hugging Face.',
            features: [
              'Smart appointment scheduling and reminders',
              'AI chatbot for patient assistance and booking',
              'Role-based dashboards for doctors, staff, and patients',
              'Real-time analytics and reporting',
              'Prescription and billing management',
              'User authentication and role-based access control'
            ]
          },
          manqla: {
            title: 'Manqla – Interior Design Web App',
            desc: 'A modern interior design showcase web app built for a Saudi company. Features animations, RTL support, and dynamic sliders for a smooth user experience.',
            features: [
              'Responsive design with RTL (Arabic) support',
              'Animated hero sections and sliders',
              'Interactive components for product exploration',
              'Email contact form integrated with EmailJS'
            ]
          },
          orca: {
            title: 'Orca – Premium Clothing Brand E-commerce Website',
            desc: 'A full-featured, modern e-commerce platform for a premium clothing startup. Features product browsing, cart/wishlist management, JWT-secured authentication, and Paymob payment integration.',
            features: [
              'Modern responsive UI with dark/light mode',
              'Product catalog with advanced filtering',
              'Cart and wishlist management',
              'JWT-secured authentication and authorization',
              'Paymob payment integration',
              'Smooth animations using Framer Motion'
            ]
          },
          amarna: {
            title: 'Amarna Travel – Website Customization',
            desc: 'Enhanced the official website of Amarna Travel (built using TrekkSoft CMS) for a better Arabic user experience and visual consistency.',
            features: [
              'RTL adjustments for Arabic content',
              'Improved layout and section structure',
              'Cross-platform UI consistency'
            ]
          },
          inventory: {
            title: 'Inventory Management System',
            desc: 'A role-based inventory system using HTML, CSS, JavaScript, Bootstrap, Django, and PostgreSQL.',
            features: [
              'Role-based access control',
              'Real-time stock management',
              'Order processing and shipment tracking',
              'Supplier and customer management',
              'Reporting and analytics'
            ]
          },
          cinemascore: {
            title: 'CinemaScore',
            desc: 'A dynamic web app for movie/TV show lists with TMDB API integration.',
            features: [
              'Movie/TV show browsing',
              'Watchlist functionality',
              'Advanced search capabilities',
              'Language switching support'
            ]
          },
          movieweb: {
            title: 'Movie Web Application',
            desc: 'A dynamic movie web application using HTML, CSS, JavaScript, jQuery, and Tailwind CSS.',
            features: [
              'Responsive UI for browsing',
              'Interactive features',
              'Real-time updates',
              'Enhanced user experience'
            ]
          },
          hms_odoo: {
            title: 'Hospital Management System',
            desc: 'An HMS module for patients, departments, and doctors using Odoo.',
            features: [
              'Patient records management',
              'Department organization',
              'Automated email validation',
              'CRM integration'
            ]
          },
          bookstore: {
            title: 'Bookstore Web Application',
            desc: 'A comprehensive bookstore web application with interactive UI.',
            features: [
              'Interactive browsing interface',
              'Client-side validation',
              'Dynamic content updates'
            ]
          },
          library: {
            title: 'Library Management System',
            desc: 'A comprehensive LMS using Django and PostgreSQL for efficient library operations.',
            features: [
              'Book cataloging system',
              'CRUD operations for books',
              'Category management',
              'Search functionality'
            ]
          },
          alva_ai: {
            title: 'Alva AI (PULSE) – Marketing Automation',
            desc: 'AI-powered marketing automation platform generating localized content for Saudi social media markets using GPT-4o-mini and real-time enrichment.',
            features: [
              'AI content generation for TikTok, Instagram, X, Snapchat, and WhatsApp',
              'Advanced localized prompt engineering for Saudi colloquial Arabic',
              'Real-time hashtag enrichment via SerpAPI integration',
              'Layered backend with subscription-based entitlements and throttling'
            ]
          },
          sonomedix: {
            title: 'Sonomedix News – Medical Media Portal',
            desc: 'A professional medical news platform focusing on healthcare, beauty, and pediatric updates with dynamic content management.',
            features: [
              'Exclusive medical articles and clinical highlights',
              'Advanced healthcare categories and semantic tagging',
              'High-performance news engine with real-time updates',
              'Clean, modern medical UI for professional practitioners'
            ]
          },
          nextstop: {
            title: 'NextStop Visa – Travel & Visa Services',
            desc: 'A visa assistance platform focusing on UK ETA and international travel documents with automated eligibility checking.',
            features: [
              'Intelligent UK ETA eligibility checker tool',
              'Streamlined online application forms and document handling',
              'Multi-visa support for global international travels',
              'Real-time application status tracking and notifications'
            ]
          },
          kmbc: {
            title: 'KMBC – Kuwait Modern Building Company',
            desc: 'A corporate engineering and construction website for leading building projects in Kuwait.',
            features: [
              'Comprehensive construction project portfolio showcase',
              'Industrial service listings and technical capabilities',
              'Professional architectural design and 3D visual highlights',
              'Modern corporate identity for major engineering firms'
            ]
          },
          rabzan: {
            title: 'Rabzan Trading – Global Logistics Solutions',
            desc: 'A premium logistics platform specializing in global trade and sourcing services from China with quality assurance.',
            features: [
              'Global sourcing, verification, and international shipping',
              'Rigorous quality control inspection and vendor audits',
              'End-to-end supply chain optimization and management',
              'Premium Dark UI experience for industrial procurement'
            ]
          },
          sems: {
            title: 'Tahsili Platform – Saudi Educational Portal',
            desc: 'An educational platform designed for Saudi students to excel in Tahsili exams through structured learning and tracking.',
            features: [
              'Student performance dashboard and analytics',
              'Comprehensive study materials and interactive lectures',
              'Automated exam simulation and results analysis',
              'Personalized learning paths and progress tracking'
            ]
          },
          quotemate: {
            title: 'QuoteMate – AI-Powered RFQ Solutions',
            desc: 'An intelligent platform that leverages AI to transform unstructured RFQ requests into professional quote documents.',
            features: [
              'AI-driven data extraction from PDF and image RFQs',
              'Automated professional quote generation in seconds',
              'Seamless document structuring and database archiving',
              'Optimized workflow for industrial sales teams'
            ]
          },
          dmagni: {
            title: 'Dmagni – AI Virtual Try-on Fashion',
            desc: 'A cutting-edge AI fashion platform allowing users to virtually try on clothes in seconds for a revolutionary e-commerce experience.',
            features: [
              'Realistic AI-powered virtual clothes fitting simulation',
              '15-second simulation speed for high-volume retailers',
              'Compatibility with various outfit styles and body types',
              'SaaS model for modular integration into e-commerce sites'
            ]
          },
          cme: {
            title: 'Itimad Tibbi – Accredited CME Hours Platform',
            desc: 'A professional medical education system for tracking SCFHS-accredited hours and certifications in Saudi Arabia.',
            features: [
              'SCFHS-accredited medical training courses and exams',
              'Instant certificate generation and verification system',
              'Personalized hours tracking dashboard for clinicians',
              'Automated synchronization with licensing databases'
            ]
          },
          dpms: {
            title: 'DiaMonitor – Advanced Diabetes SaaS',
            desc: 'A data-driven SaaS platform for diabetes management with real-time glucose monitoring and professional healthcare insights.',
            features: [
              'Real-time data synchronization with CGM and IoT devices',
              'Dedicated Doctor and Patient interactive health portals',
              'Predictive analytics for glucose trends and health alerts',
              'Modern, intuitive healthcare dashboard and reporting'
            ]
          }
        }
      },
      laptop_showcase: {
        label: 'Interactive Preview',
        title: 'Experience My Work in 3D',
        subtitle: 'Explore my featured projects through an immersive 3D laptop showcase. Hover and interact with the model to see the details.',
        features: {
          responsive: 'Responsive & Adaptive',
          performance: 'High Performance',
          modern: 'Modern Tech Stack',
          rtl: 'Full RTL Support'
        }
      },
      platform_suite: {
        label: 'Product Suite',
        title: 'One Engine, Many Brands',
        subtitle: 'Instead of rebuilding an LMS for every client, I built one accredited training engine and deploy it as separate branded platforms — each with its own visual identity, content and accreditation, sharing a single hardened core.',
        shared_title: 'What Every Deployment Inherits',
        capabilities: {
          engine: 'Shared Django + PostgreSQL Core',
          accreditation: 'Accreditation & Certificates',
          payments: 'Payments & Coupons',
          rtl: 'Bilingual AR/EN with RTL',
          roles: 'Multi-Role Dashboards',
          branding: 'Per-Client Theming'
        },
        members: {
          injaz: 'Continuing medical education for the Saudi healthcare sector, SCFHS-accredited with NELC integration.',
          hcholding: 'Health Cluster Holding training centre in Makkah — CPR, BLS, First Aid and nursing programmes.',
          mada: 'Accredited general training and e-learning platform with its own catalogue and brand identity.'
        },
        footnote: 'One codebase, one deployment pipeline, one security model — three products. New clients launch in days instead of months, and every fix or feature lands across the whole suite at once.'
      },
      brands: {
        label: 'Partners in Growth',
        title: 'Trusted By Innovators',
        subtitle: 'A curated collection of digital platforms, applications, and corporate identities we have empowered towards digital excellence.'
      },
      skills: {
        title: 'Skills & Expertise',
        subtitle: 'A comprehensive overview of my technical skills and areas of expertise with proficiency levels.',
        search_placeholder: 'Search skills...',
        no_results: 'No skills found matching "{{query}}"',
        categories: {
          all: 'All',
          languages: 'Programming Languages',
          frameworks: 'Frameworks & Libraries',
          devops: 'DevOps & Tools',
          databases: 'Databases & ORMs',
          realtime: 'Real-Time & APIs',
          cybersecurity: 'Cybersecurity',
          management: 'Project Management',
          soft: 'Soft Skills'
        },
        soft_skills: {
          communication: 'Communication',
          presentation: 'Presentation',
          problem_solving: 'Problem Solving',
          time_management: 'Time Management',
          adaptability: 'Adaptability'
        }
      },
      timeline: {
        title: 'Experience & Education',
        subtitle: 'My professional journey and academic background',
        labels: {
          work: 'Work',
          education: 'Education'
        },
        items: [
          {
            title: 'Co-Founder',
            company: 'Indstrz',
            location: 'Remote, Egypt',
            period: '01/2024 - Present',
            description: [
              'Co-founded a B2B industrial platform for industrial procurement',
              'Selected for the Venture Ready Program, implemented by Plug and Play with support from GIZ Egypt and ITIDA, hosted at Creativa Innovation Hubs in Alexandria',
              'Built the digital RFQ workflow and the real-time negotiation engine',
              'Led technical development using Next.js, Flask and PostgreSQL'
            ]
          },
          {
            title: 'Full Stack Developer',
            company: 'S&F (Saudi Arabia)',
            location: 'Remote, Saudi Arabia',
            period: '07/2025 - Present',
            description: [
              'Built and maintained full-stack applications using Django, Node.js, React.js, and PostgreSQL',
              'Designed and deployed backend services & RESTful APIs for web and mobile apps',
              'Improved database performance and ensured application scalability'
            ]
          },
          {
            title: 'External Instructor - Front-End Development',
            company: 'Information Technology Institute (ITI)',
            location: 'Remote, Egypt',
            period: '07/2025 - 10/2025',
            description: [
              'Taught Front-End Development (HTML, CSS, JavaScript) to more than 240 students',
              'Designed and delivered practical coding sessions and real-world project guidance'
            ]
          },
          {
            title: 'Freelance Web Developer',
            company: 'Self-Employed',
            location: 'Remote, Egypt',
            period: '03/2025 - Present',
            description: [
              'Built full-stack, production-ready web apps for Gulf clients',
              'Delivered scalable, multilingual, and RTL-supported platforms',
              'Used React, Next.js, NestJS, Django, and PostgreSQL'
            ]
          },
          {
            title: 'Full Stack Development Using Python Intern',
            company: 'Information Technology Institute (ITI)',
            location: 'Hybrid, Egypt',
            period: '11/2024 - 04/2025',
            description: [
              'Worked on hands-on projects covering Python, Django, databases, and front-end technologies'
            ]
          },
          {
            title: 'IT Infrastructure Intern',
            company: 'Al Ezz Dekheila Steel Co. EZDK',
            location: 'Alexandria, Egypt',
            period: '09/2022 - 10/2022',
            description: [
              'Gained hands-on experience in IT infrastructure and software development',
              'Assisted in software development tasks and IT support'
            ]
          },
          {
            title: 'Bachelor of Business (MIS)',
            company: 'Alexandria University',
            location: 'Alexandria, Egypt',
            period: '07/2019 - 07/2023',
            description: [
              'Graduated with Very Good (GPA: 3.265)',
              'Graduation Project: Jewellery Store Website | Grade: A'
            ]
          }
        ]
      },
      stats: {
        projects: 'Projects Completed',
        technologies: 'Technologies Mastered',
        years: 'Years of Experience',
        students: 'Students Taught',
        clients: 'Clients Served'
      },
      certifications: {
        title: 'Courses & Certifications',
        subtitle: 'Professional development and continuous learning journey',
        items: {
          python_django: 'The Python and Django Learning Guide',
          intro_python: 'Introduction to Python',
          docker: 'Docker Training Course for the Absolute Beginner',
          git_github: 'Git and GitHub',
          web_dev: 'Web Development Challenger Track',
          ui_ux: 'Mobile App Design Course UI/UX',
          redhat: 'Red Hat System Administration I',
          android: 'Android Application Development'
        }
      },
      services: {
        title: 'Services I Offer',
        subtitle: 'Comprehensive web development services tailored to bring your ideas to life',
        ready: 'Ready to start your project?',
        get_in_touch: 'Get in Touch',
        list: [
          {
            title: 'Full-Stack Custom Development',
            desc: 'End-to-end development of high-performance web applications using modern stacks like React, Next.js, Django, and NestJS.',
            features: [
              'SaaS & Enterprise Solutions',
              'E-commerce Platforms',
              'Progressive Web Apps (PWA)',
              'Scalable Cloud Architecture'
            ]
          },
          {
            title: 'AI & Backend Engineering',
            desc: 'Building robust server-side infrastructures and integrating AI-driven features for automation and intelligent data processing.',
            features: [
              'Secure REST & GraphQL APIs',
              'AI Chatbots & LLM Integration',
              'Database Design & Optimization',
              'Real-time Data Systems'
            ]
          },
          {
            title: 'Modern UI/UX & RTL Localization',
            desc: 'Creating pixel-perfect, accessible, and fast-loading interfaces with specialized support for Arabic (RTL) and multilingual markets.',
            features: [
              'Multilingual & RTL Mastery',
              'Advanced Framer Motion Animations',
              'SEO & Performance Optimization',
              'Responsive & Adaptive Design'
            ]
          },
          {
            title: 'Security & DevOps Strategy',
            desc: 'Ensuring your applications are secure, stable, and ready for growth with enterprise-grade security and automated deployment lines.',
            features: [
              'JWT & Role-Based Security',
              'CI/CD & Docker Workflows',
              'Load Balancing & Scaling',
              'Technical Consultation'
            ]
          },
          {
            title: 'Legacy Code Takeover & Technical Audit',
            desc: 'I take over inherited and abandoned codebases. The audit comes first, so you know what is wrong and what it costs before any work starts.',
            features: [
              'Full audit of an inherited codebase with a written report',
              'A clear estimate of what it costs to fix, before any work starts',
              'Bug fixing, refactoring and performance work on live systems',
              'Taking over projects abandoned by a previous developer'
            ]
          }
        ]
      },
      process: {
        label: 'How I Work',
        title: 'From First Call to Live Product',
        subtitle: 'A predictable process with a clear deliverable at every step, so you always know what is happening and what comes next.',
        steps: {
          discovery: {
            title: '1. Discovery Call',
            desc: 'We talk through the goal, the users and the constraints. I ask the awkward questions early — budget, deadlines, integrations — so nothing surprises us later.',
            deliverable: 'Deliverable: written scope summary'
          },
          blueprint: {
            title: '2. Scope & Blueprint',
            desc: 'I turn the conversation into a concrete plan: features broken into phases, the data model, the stack, and a realistic timeline with milestones.',
            deliverable: 'Deliverable: proposal + timeline'
          },
          build: {
            title: '3. Build in Milestones',
            desc: 'Development happens in reviewable chunks, not one big reveal. You get a staging link from the first milestone and can follow progress the whole way.',
            deliverable: 'Deliverable: staging link per milestone'
          },
          review: {
            title: '4. Review & Hardening',
            desc: 'Your feedback on each milestone gets folded in, then I test the flows end to end — validation, permissions, edge cases, mobile, and RTL.',
            deliverable: 'Deliverable: tested, fixed build'
          },
          launch: {
            title: '5. Launch',
            desc: 'Deployment, domain and SSL, environment configuration, SEO basics and analytics. I hand over the repository, credentials and a short walkthrough.',
            deliverable: 'Deliverable: live site + handover'
          },
          support: {
            title: '6. Post-Launch Support',
            desc: 'A warranty window after launch for any defect in what was delivered, plus an optional retainer for ongoing features and maintenance.',
            deliverable: 'Deliverable: warranty + optional retainer'
          }
        }
      },
      packages: {
        label: 'Packages',
        title: 'Ways We Can Work Together',
        subtitle: 'Three common shapes for a project. Every engagement is scoped to what you actually need — these are starting points, not boxes.',
        most_popular: 'Most Popular',
        on_request: 'Quote on request',
        cta: 'Request a Quote',
        footnote: 'Not sure which fits? Send me a short description of your project and I will reply with a recommended scope, timeline and price — no obligation.',
        tiers: {
          landing: {
            name: 'Website & Landing Page',
            tagline: 'A fast, polished marketing presence that converts visitors and looks right on every screen.',
            price: '',
            timeline: 'Typically 1–2 weeks',
            features: [
              'Custom design — no recycled templates',
              'Fully responsive, mobile-first build',
              'Bilingual Arabic/English with full RTL',
              'SEO fundamentals and performance tuning',
              'Contact form and WhatsApp integration',
              'Deployment, domain and SSL setup'
            ]
          },
          platform: {
            name: 'Full-Stack Platform',
            tagline: 'A complete product with accounts, dashboards, payments and an admin panel — built to grow.',
            price: '',
            timeline: 'Typically 4–10 weeks',
            features: [
              'Everything in the website package',
              'Custom backend, database design and REST APIs',
              'Authentication with role-based dashboards',
              'Payment gateway and invoicing integration',
              'Admin panel with reports and exports',
              'Optional AI features and real-time updates',
              'Staging environment and milestone reviews'
            ]
          },
          retainer: {
            name: 'Ongoing Partner',
            tagline: 'A monthly arrangement for teams that need continuous development, not a one-off delivery.',
            price: '',
            timeline: 'Monthly, cancel anytime',
            features: [
              'Reserved development hours each month',
              'New features and iterative improvements',
              'Bug fixing and performance monitoring',
              'Dependency and security updates',
              'Priority response times',
              'Technical consultation and code review'
            ]
          }
        }
      },
      case_studies: {
        label: 'Case Study',
        back: 'Back to Projects',
        visit: 'Visit Live Site',
        cta_title: 'Have a project like this in mind?',
        cta_subtitle: 'Tell me what you are building and I will come back with a recommended scope, timeline and price.',
        cta_button: 'Start a Conversation',
        facts: {
          role: 'My Role',
          scope: 'Scope',
          audience: 'Audience'
        },
        sections: {
          challenge: 'The Challenge',
          approach: 'The Approach',
          delivered: 'What I Built',
          outcome: 'The Outcome',
          stack: 'Technology Stack'
        },
        bilqalam: {
          title: 'Bilqalam Institute, an Online Academy Built and Run by One Developer',
          summary: 'A production learning platform for an institute teaching Qur’an, Arabic and Islamic studies online, serving thousands of enrolled students. I am the sole developer on it.',
          facts: {
            role: 'Sole developer, built and maintained alone',
            scope: 'Enrollment and student management, billing and invoicing, admin reporting',
            audience: 'Thousands of enrolled students'
          },
          challenge: {
            body: 'An institute at this size cannot run on spreadsheets and chat messages. It needs to enroll students, track who is in which programme, bill them, issue invoices and give administrators numbers they can act on. All of it has to work in Arabic, including the financial and data-heavy views that most templates handle badly.',
            points: [
              'Thousands of enrolled students to track',
              'Billing and invoicing tied to enrollment',
              'Administrators need reporting they can act on',
              'Arabic and RTL in financial and data-heavy views'
            ]
          },
          approach: {
            body: 'I built it as one system rather than separate tools bolted together, so enrollment, billing and reporting read from the same data. The frontend is Next.js and the backend is Laravel. RTL was designed in from the start rather than retrofitted, because the tables, invoices and report views are where right-to-left layouts usually break.',
            points: [
              'Enrollment, billing and reporting on shared data',
              'Next.js frontend, Laravel backend',
              'RTL designed in from the start, not retrofitted',
              'One developer, so the architecture stays consistent'
            ]
          },
          delivered: {
            body: 'The institute runs its day-to-day operations on the platform. I built every part of it and I maintain it alone.',
            points: [
              'Student enrollment and management system',
              'Billing and invoicing',
              'Admin reporting dashboards the institute runs on',
              'Fully Arabic and RTL, including the financial and data-heavy views',
              'In production, serving thousands of enrolled students'
            ]
          },
          outcome: {
            body: 'The platform is in production and the institute operates on it. It is the project I point to when a client asks whether I can build and carry a real system on my own, because that is exactly what it is.',
            points: [
              'In production and in daily use',
              'Built and maintained by one developer',
              'Operations consolidated into a single system'
            ]
          }
        }
      },
      testimonials: {
        title: 'What People Say',
        subtitle: "Feedback from clients, students, and colleagues I've worked with",
        positive_reviews: 'Positive Reviews',
        reviews_count: 'Reviews',
        view_review: 'View Full Review on {{platform}}',
        follow_me: 'Follow me on platforms',
        time: {
          days: '{{count}} days ago',
          month_one: '1 month ago',
          months: '{{count}} months ago',
          months_many: '{{count}} months ago',
          year_one: '1 year ago',
          years: '{{count}} years ago'
        },
        items: {
          salman_a: {
            text: 'Creative and respectful — it was a pleasure working together.',
            role: 'Client - Khamsat'
          },
          amsb_a: {
            text: 'A highly experienced person, excellent manners, fast delivery, and an honest advisor. Thank you so much, Engineer Belal.',
            role: 'Client - Khamsat'
          },
          abu_w: {
            text: 'I want to express my complete satisfaction with the delivered work. Belal has high competence and clear expertise, executing exactly what was required with precision and professionalism. The service quality was excellent and exceeded expectations, with great attention to the finest details. Communication was fast and clear throughout the project, with continuous follow-up and care to explain every step. He also met the delivery deadline — in fact he finished in record time without compromising quality. A professional developer you can rely on, delivering outstanding results with full confidence.',
            role: 'Client - Khamsat'
          },
          ahmed_e: {
            text: 'The work was exactly as I wanted in a reasonable time, not the last interaction with Engineer Belal, God willing.',
            role: 'Client - Khamsat'
          },
          amal_a: {
            text: 'Masha Allah on the speed and quick response, you did what was required and more. Thank you!',
            role: 'Client - Khamsat'
          },
          ahmed_y: {
            text: 'Excellent',
            role: 'Client - Khamsat'
          },
          aseel_a: {
            text: 'Brother Belal, thank you for your effort. I am honored to work with you in other future projects for your good treatment and I advise everyone to deal with you. His work is perfect and excellent.',
            role: 'Project Owner - Mostaql'
          },
          abo_m: {
            text: 'Thank you for your efforts.',
            role: 'Client - Khamsat'
          },
          royal_eagles: {
            text: 'High-end service and a very respectable person.',
            role: 'Client - Khamsat'
          },
          nouf_a: {
            text: "I thank the engineer for his honesty, work, and speed of response. I will be with him in all my future work, God willing.",
            role: 'Client - Khamsat'
          },
          ahmed_a: {
            text: 'Excellent experience with Engineer Belal, professional in dealing, cooperative, and responds to changes with flexibility. He completed the work with high quality and communication was smooth throughout.',
            role: 'Client - Khamsat'
          }
        }
      },
      contact: {
        title: 'Get In Touch',
        subtitle: 'Feel free to reach out for collaborations or just a friendly hello',
        info: {
          email: 'Email',
          phone: 'Phone',
          location: 'Location',
          linkedin: 'LinkedIn',
          alexandria: 'Alexandria, Egypt',
          show_phone: 'Show phone number'
        },
        form: {
          name: 'Name',
          email: 'Email',
          message: 'Message',
          placeholders: {
            name: 'Your Name',
            email: 'your@email.com',
            message: 'Your message...'
          },
          submit: 'Send Message',
          sending: 'Sending...'
        },
        notifications: {
          success: "Message sent successfully! I'll get back to you soon.",
          error: 'Failed to send message. Please try again or email me directly.'
        }
      },
      nav: {
        home: 'Home',
        about: 'About',
        timeline: 'Timeline',
        projects: 'Projects',
        suite: 'Product Suite',
        skills: 'Skills',
        services: 'Services',
        process: 'Process',
        packages: 'Packages',
        testimonials: 'Testimonials',
        contact: 'Contact',
        download_cv: 'Download CV'
      },
      footer: {
        about_title: 'Belal Nagy',
        about_text: 'I build web platforms from zero, and take over existing codebases that need fixing. 31 projects for 27 clients across Egypt and the Gulf.',
        quick_links: 'Quick Links',
        services: 'Services',
        get_in_touch: 'Get in Touch',
        follow_me: 'Follow me on platforms',
        back_to_top: 'Back to Top',
        freelance_notice: 'Designed & Developed by Belal Nagy | Open for freelance opportunities'
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        about: 'عني',
        skills: 'المهارات',
        timeline: 'الخبرة',
        projects: 'المشاريع',
        testimonials: 'آراء العملاء',
        contact: 'اتصل بي',
        download_cv: 'تحميل CV'
      },
      hero: {
        welcome: 'مرحباً بك في معرض أعمالي',
        greeting_start: 'أهلاً، أنا ',
        name: 'بلال ناجي',
        i_am_a: 'أنا ',
        description_1: 'أبني منصات ويب من الصفر، وأستلم الأكواد القائمة اللي محتاجة إصلاح. ',
        description_2: '٣١ مشروعاً',
        description_3: ' لـ ',
        description_4: '٢٧ عميلاً',
        description_5: ' في مصر والخليج.',
        view_projects: 'عرض المشاريع',
        contact_me: 'تواصل معي',
        download_cv: 'تحميل CV',
        follow_me: 'تابعني على المنصات العربية'
      },
      about: {
        title: 'عني',
        subtitle: 'مطور Full-Stack من الإسكندرية، مصر. Next.js و Laravel و NestJS و Node.js و Django و PostgreSQL.',
        personal_info: 'المعلومات الشخصية',
        professional_summary: 'الملخص المهني',
        labels: {
          name: 'الاسم',
          role: 'الدور الوظيفي',
          education: 'التعليم',
          location: 'الموقع'
        },
        values: {
          name: 'بلال ناجي',
          role: 'مطور Full Stack',
          education: 'بكالوريوس أعمال (نظم معلومات)',
          location: 'الإسكندرية، مصر'
        },
        summary_p1: 'مطور Full-Stack مقيم في <1>الإسكندرية، مصر</1>. أشتغل بـ Next.js و Laravel و NestJS و Node.js و Django و PostgreSQL. حالياً مطور Full-Stack في <3>شركة S&F بالسعودية</3>.',
        summary_p2: 'أنا المطور الوحيد على <1>معهد بالقلم</1>، منصة تعليمية تعمل فعلياً وتخدم آلاف الطلاب المسجلين. المنصة بتدير تسجيل الطلاب وإدارتهم، والفوترة وإصدار الفواتير، ولوحات التقارير الإدارية اللي المعهد بيشتغل عليها. أنا بنيتها وبصيانتها لوحدي، بـ <3>Next.js و Laravel</3>.',
        summary_p3: 'كمان بنيت محرك LMS متعدد المستأجرين بيشتغل كـ <1>ثلاث منصات معتمدة بهويات منفصلة</1>، الإنجاز والتجمع الصحي القابضة ومدى التعليمية، فوق نواة واحدة من Django و PostgreSQL. شاركت في تأسيس Indstrz، منصة صناعية B2B، ودرّست تطوير الواجهات الأمامية لـ <3>أكثر من ٢٤٠ طالباً</3> كمحاضر خارجي في ITI. شغل العربية والـ RTL موجود في كل مشروع بسلّمه، بما فيه الواجهات المالية والمليانة بيانات.',
        highlights: {
          sole_developer: {
            title: 'مطور وحيد على أنظمة في الإنتاج',
            desc: 'بالقلم بيخدم آلاف الطلاب على منصة بنيتها وبصيانتها لوحدي.'
          },
          multi_tenant: {
            title: 'معمارية متعددة المستأجرين',
            desc: 'محرك LMS واحد، ثلاث منصات معتمدة لعملاء مختلفين، وخط نشر واحد.'
          },
          arabic_first: {
            title: 'العربية أولاً',
            desc: 'دعم RTL كامل في لوحات التحكم والفواتير والتقارير، مش في صفحات الهبوط بس.'
          }
        }
      },
      projects: {
        title: 'أبرز المشاريع',
        subtitle: 'إليك بعض المشاريع المميزة التي تعكس مهاراتي وخبرتي التقنية',
        search_placeholder: 'ابحث عن المشاريع بالاسم...',
        no_results: 'لم يتم العثور على مشاريع تطابق بحثك',
        view_details: 'عرض التفاصيل',
        categories: {
          all: 'الكل',
          fullstack: 'Full Stack',
          frontend: 'Frontend',
          backend: 'Backend',
          mobile: 'تطبيقات الموبايل'
        },
        modal: {
          technologies: 'التقنيات المستخدمة',
          features: 'أهم المميزات والخصائص',
          live_link: 'زيارة المشروع',
          source_code: 'عرض الكود المصدري',
          case_study: 'اقرأ دراسة الحالة',
          close: 'إغلاق',
          suite_title: 'نفس المحرك… هويات بصرية مختلفة',
          suite_desc: 'هذه المنصة واحدة من عدة نسخ تعمل على محرك LMS واحد قمت ببنائه وتطويره. كل عميل لديه نسخته الخاصة بهوية بصرية ومحتوى واعتمادات مستقلة، فوق نفس النواة الموحّدة للتدريب المعتمد والدفع وإصدار الشهادات.'
        },
        items: {
          bilqalam: {
            title: 'معهد بالقلم، أكاديمية القرآن واللغة العربية أونلاين',
            desc: 'منصة تعليمية تعمل فعلياً لمعهد متخصص في تعليم القرآن الكريم واللغة العربية والعلوم الشرعية أونلاين، وبتخدم آلاف الطلاب المسجلين. أنا المطور الوحيد عليها. بنيت نظام تسجيل الطلاب وإدارتهم، والفوترة وإصدار الفواتير، ولوحات التقارير الإدارية اللي المعهد بيشتغل عليها، وبصيانة المنصة لوحدي.',
            features: [
              'مطور وحيد، بنيتها وبصيانتها لوحدي',
              'تعمل فعلياً وتخدم آلاف الطلاب المسجلين',
              'نظام تسجيل الطلاب وإدارتهم',
              'الفوترة وإصدار الفواتير',
              'لوحات التقارير الإدارية اللي المعهد بيشتغل عليها',
              'عربية و RTL بالكامل، بما فيها الواجهات المالية والمليانة بيانات',
              'مبنية بـ Next.js و Laravel'
            ]
          },
          medicta: {
            title: 'Medicta – تطبيق حجز المواعيد الطبية (إعادة هيكلة الكود)',
            desc: 'تطبيق أندرويد لحجز مواعيد الأطباء واستعراض الخدمات الطبية، منشور على Google Play. قمت بإعادة تصميم وهيكلة الكود القائم ومعالجة الأخطاء الوظيفية فيه — إعادة تنظيم بنية التطبيق مع إصلاح المسارات المعطلة في الحجز والمصادقة والتعامل مع البيانات.',
            features: [
              'إعادة تصميم كامل للكود: تنظيم التطبيق في طبقات واضحة وقابلة للصيانة',
              'إصلاح منهجي للأخطاء الوظيفية في مسارات الحجز والمصادقة والبيانات',
              'إعادة هيكلة طبقة التكامل مع الـ API مع توحيد حالات الخطأ والتحميل',
              'تحسين إدارة الحالة (State) للتخلص من مشاكل البيانات القديمة والتعارضات',
              'تحسين واجهة وتجربة المستخدم لتنقل أسلس وأداء أسرع',
              'متاح فعلياً على Google Play باسم الحزمة com.medicta'
            ]
          },
          mada: {
            title: 'مدى التعليمية – منصة تدريب معتمدة',
            desc: 'منصة تعلم إلكتروني وتدريب معتمد تعمل على نفس محرك الـ LMS المستخدم في الإنجاز والتجمع الصحي، مع هوية بصرية وكتالوج دورات خاص بها. تعلم بالفيديو، اختبارات، مدفوعات، وشهادات مؤتمتة.',
            features: [
              'كتالوج دورات مع دروس فيديو وتتبع للتقدم واختبارات لكل درس',
              'إصدار شهادات مؤتمت بأرقام فريدة ونظام تحقق إلكتروني',
              'تكامل بوابة دفع مع سلة تسوق ونظام كوبونات خصم',
              'لوحات تحكم متعددة الأدوار للإدارة والمدربين والمتدربين',
              'معالجة غير متزامنة باستخدام Celery + Redis للإشعارات والتقارير',
              'ثيم وهوية مستقلة فوق نفس النواة المعتمدة للمنصة'
            ]
          },
          mutlq: {
            title: 'مطلق – الموقع التعريفي والهوية الرقمية',
            desc: 'موقع تعريفي يستعرض خدمات الجهة وأعمالها المنجزة، مبني كتجربة عربية سريعة تدعم الـ RTL بالكامل مع هوية بصرية مميزة.',
            features: [
              'تجربة هبوط قائمة على الهوية مع أقسام للخدمات ومعرض الأعمال',
              'تصميم عربي RTL بالكامل ومتجاوب مع جميع المقاسات',
              'أقسام قابلة للإدارة من لوحة التحكم بدون تعديل الكود',
              'تحسين محركات البحث والأداء لسرعة تحميل عالية',
              'نظام تواصل وطلب استفسار متكامل'
            ]
          },
          toyo228: {
            title: 'Toyo228 – منصة قطع غيار تويوتا B2B',
            desc: 'منصة تجارة إلكترونية B2B تربط تجار الجملة لقطع غيار تويوتا الأصلية بمحلات التجزئة، مع خاصية البحث بالجملة عبر ملفات Excel ولوحات تحكم متعددة الأدوار وبنية Turborepo.',
            features: [
              'لوحات تحكم متعددة الأدوار: لوحة المدير، لوحة تاجر الجملة، ولوحة المتجر',
              'بحث بالجملة عن القطع عبر رفع ملفات Excel مع قوالب جاهزة للتحميل',
              'واجهات TypeScript مشتركة بين الـ Frontend والـ Backend عبر Monorepo',
              'مصادقة JWT آمنة مع httpOnly Cookies ونظام حماية الملكية',
              'معرض صور متطور مع رفع Drag & Drop وتحسين تلقائي من السيرفر'
            ]
          },
          motors: {
            title: 'Motors – سوق السيارات الفاخرة',
            desc: 'منصة عربية متكاملة لبيع وشراء السيارات الجديدة والمستعملة والمصدومة مع فلاتر بحث متقدمة، لوحات تحكم للمستخدمين، وتكامل WhatsApp للتواصل المباشر.',
            features: [
              'فلاتر بحث متقدمة حسب الماركة، السعر، نوع الوقود، والحالة',
              'لوحة تحكم كاملة لإدارة إعلانات السيارات (إنشاء، تعديل، حذف)',
              'معرض صور مع رفع صور متعددة واختيار الصورة الرئيسية',
              'تصميم داكن احترافي RTL مُحسّن للسوق السعودي',
              'تكامل WhatsApp للتواصل المباشر بين المشتري والبائع'
            ]
          },
          injaz: {
            title: 'الإنجاز – منصة التعليم الطبي المستمر',
            desc: 'نظام إدارة تعلم متكامل (LMS) لدورات التدريب الطبي المعتمدة من الهيئة السعودية للتخصصات الصحية (SCFHS) مع تعلم بالفيديو، اختبارات MCQ، شهادات مؤتمتة، وتكامل مع المركز الوطني للتعلم الإلكتروني (NELC).',
            features: [
              'دورات فيديو معتمدة من SCFHS مع تتبع التقدم واختبارات تفاعلية',
              'توليد شهادات مؤتمت بأرقام فريدة ونظام تحقق إلكتروني',
              'تكامل بوابة دفع MyFatoorah مع سلة تسوق ونظام كوبونات خصم',
              'تكامل مع المركز الوطني للتعلم الإلكتروني (NELC) لاعتماد الدورات',
              'معالجة مهام غير متزامنة باستخدام Celery + Redis للإشعارات والتقارير',
              'واجهة ثنائية اللغة (عربي/إنجليزي) مع دعم كامل للـ RTL'
            ]
          },
          hcholding: {
            title: 'التجمع الصحي القابضة – مركز التدريب الصحي',
            desc: 'منصة تعلم إلكتروني متخصصة لشركة التجمع الصحي القابضة في مكة المكرمة، تقدم دورات تدريبية معتمدة من SCFHS في الإنعاش القلبي (CPR)، دعم الحياة (BLS)، الإسعافات الأولية، ومهارات التمريض.',
            features: [
              'تدريب صحي معتمد من SCFHS (إنعاش قلبي، دعم حياة، إسعافات أولية، TOT)',
              'تعلم بالفيديو مع اختبارات لكل فيديو وتتبع تقدم المتدرب',
              'إصدار شهادات مؤتمت مع رمز QR للتحقق الإلكتروني',
              'تكامل دفع MyFatoorah مع رفع إيصالات التحويل البنكي',
              'تكامل NELC للامتثال الوطني للتعلم الإلكتروني وإعداد التقارير',
              'نظام متعدد الأدوار: لوحات تحكم للمدير والمدرب والمتدرب'
            ]
          },
          indstrz: {
            title: 'Indstrz، منصة صناعية B2B',
            desc: 'منصة مشتريات B2B بدورات عمل RFQ رقمية ومفاوضات لحظية وإدارة محادثات مؤتمتة. تم اختيارها ضمن برنامج Venture Ready، المنفَّذ بواسطة Plug and Play بدعم من GIZ Egypt و ITIDA، ومستضاف في مراكز Creativa للابتكار بالإسكندرية.',
            features: [
              'مختارة ضمن برنامج Venture Ready من Plug and Play بدعم GIZ Egypt و ITIDA',
              'مستضافة في مراكز Creativa للابتكار بالإسكندرية',
              'دورات عمل RFQ رقمية بين المشترين والموردين المعتمدين',
              'نظام مراسلة وإشعارات لحظي باستخدام Socket.io',
              'نظام صلاحيات قائم على الأدوار مع إبطال توكن JWT',
              'معمارية طبقية بنمط Modular Application Factory'
            ]
          },
          uduipa: {
            title: 'UDUIPA – المنصة الرقمية للاتحاد الجامعي',
            desc: 'المنصة الرسمية للاتحاد الأكاديمي لإدارة العضويات المركزية ودورات التحقق المؤتمتة باستخدام بنية Monorepo عالية الأداء.',
            features: [
              'إدارة مركزية للعضويات والتحقق الأكاديمي الرسمي',
              'نظام صلاحيات واسع النطاق مع مصادقة JWT آمنة',
              'دورات معالجة مستندات مؤتمتة لتوليد الـ PDF ورموز QR',
              'واجهة مستخدم كاملة تدعم الـ RTL (عربي، إنجليزي، فرنسي) مع التحليلات'
            ]
          },
          waferlee: {
            title: 'Waferlee – منصة العروض والكوبونات المجتمعية',
            desc: 'منصة تتيح للمجتمع التصويت على العروض وتقديمها، مع خوارزمية "Temperature" مخصصة لتحديد المحتوى الأكثر رواجاً.',
            features: [
              'محرك تصويت قوي مع خوارزمية مخصصة للتريند',
              'تصويت مجتمعي لحظي، تقديم عروض، وإدارة رقابية',
              'تفاعلات آمنة مع نظام RBAC و Google ReCAPTCHA',
              'دورات بريد إلكتروني مؤتمتة وإشعارات متعددة القنوات'
            ]
          },
          baserah: {
            title: 'Baserah AI – منصة الموارد البشرية الذكية',
            desc: 'منصة ذكاء اصطناعي لـ HR تؤتمت استخراج مؤشرات الأداء (KPIs)، توليد التقييمات، وتقييم المواهب من البيانات غير المنظمة.',
            features: [
              'استخراج تلقائي للكفاءات ومؤشرات الأداء من الأوصاف الوظيفية',
              'توليد أسئلة MCQ مدعوم بالذكاء الاصطناعي وتقييم هيكلي للمواهب',
              'واجهة مستخدم عربية/إنجليزية مخصصة للمنظمات الكبرى',
              'خلفية برمجية عالية الأداء NoSQL مع دورات عمل برمجية غير متزامنة'
            ]
          },
          sf_portal: {
            title: 'بوابة S&F الرقمية – البوابة المؤسسية',
            desc: 'بوابة مؤسسية فاخرة توحد طلبات الاستثمار، طلبات المتاجر، وطلبات التوظيف لمختلف قطاعات الأعمال.',
            features: [
              'مكتبة واجهة مستخدم موديولر ومكونات تفاعلية باستخدام Framer Motion',
              'توحيد طلبات القطاعات المختلفة في منصة واحدة',
              'معالجة استمارات معقدة مع تحقق لحظي من البيانات',
              'تكامل مع Django REST API لدورات العمل الحساسة'
            ]
          },
          journal: {
            title: 'نظام إدارة المجلات العلمية',
            desc: 'نظام متكامل لإدارة المجلات الأكاديمية بنظام التحكيم السري المزدوج لجامعة سعودية. بني باستخدام React و NestJS.',
            features: [
              'أربعة أدوار للمستخدمين (مدير، محرر، محكم، باحث) مع مصادقة JWT',
              'نظام تحكيم سري مزدوج (Double-blind peer-review)',
              'تقديم الأبحاث ونظام تقييم ومفاضلة مؤتمت',
              'إدارة الأعداد وتكامل مع أنظمة الدفع الإلكتروني',
              'معاينة PDF، توليد QR، وشهادات قبول نشر تلقائية',
              'نظام متقدم لإدارة الصلاحيات والوصول'
            ]
          },
          profleet: {
            title: 'Pro Fleet – نظام إدارة الأساطيل الذكي',
            desc: 'منصة متعددة اللغات لإدارة الأساطيل مع تتبع GPS لحظي، تحليلات، ولوحات تحكم مخصصة لشركة ناشئة سعودية.',
            features: [
              'تتبع GPS لحظي مع خرائط Leaflet تفاعلية',
              'شات بوت ذكاء اصطناعي لمساعدة المستخدمين',
              'دعم كامل للغات مع نظام RTL للعربية',
              'لوحات تحكم قائمة على الأدوار وتحليلات متقدمة',
              'فوترة مؤتمتة ومعالجة عمليات الدفع',
              'تتبع الشحنات المباشر وإدارة عمليات الأسطول'
            ]
          },
          clinic: {
            title: 'نظام إدارة العيادات (مشروع تخرج ITI)',
            desc: 'نظام شامل لإدارة العيادات مع جدولة مواعيد ذكية، لوحات تحكم، وتحليلات لحظية. يتضمن مساعد ذكاء اصطناعي.',
            features: [
              'جدولة ذكية للمواعيد مع نظام تذكير',
              'شات بوت ذكاء اصطناعي لمساعدة المرضى والحجز',
              'لوحات تحكم للأطباء والموظفين والمرضى',
              'تحليلات وتقارير لحظية',
              'إدارة الروشتات الطبية والفوترة',
              'نظام مصادقة مستخدم وصلاحيات وصول متقدم'
            ]
          },
          manqla: {
            title: 'Manqla – تطبيق التصميم الداخلي',
            desc: 'تطبيق ويب لاستعراض أعمال التصميم الداخلي لشركة سعودية. يتميز بالأنيميشن ودعم الـ RTL وتجربة مستخدم سلسة.',
            features: [
              'تصميم متجاوب مع دعم كامل للغة العربية (RTL)',
              'أقسام Hero وسلايدرز متحركة',
              'مكونات تفاعلية لاستكشاف المنتجات',
              'استمارة تواصل متكاملة مع EmailJS'
            ]
          },
          orca: {
            title: 'Orca – متجر إلكتروني لعلامة تجارية فاخرة',
            desc: 'منصة تجارة إلكترونية كاملة وعصرية لبراند ملابس ناشئ. تتضمن تصفح المنتجات، إدارة السلة، ومصادقة JWT وتكامل مع Paymob.',
            features: [
              'واجهة مستخدم عصرية مع وضع ليلي/نهاري',
              'كاتالوج منتجات مع فلاتر متقدمة',
              'إدارة سلة التسوق وقائمة الأمنيات',
              'نظام مصادقة وصلاحيات آمن (JWT)',
              'تكامل مع بوابة دفع Paymob',
              'أنيميشن سلس باستخدام Framer Motion'
            ]
          },
          amarna: {
            title: 'Amarna Travel – تخصيص وتطوير الموقع',
            desc: 'تحسين وتطوير الموقع الرسمي لشركة Amarna Travel لتحسين تجربة المستخدم العربية وضمان الاتساق البصري.',
            features: [
              'تعديلات RTL لمحتوى اللغة العربية',
              'تحسين الهيكل العام وتوزيع الأقسام',
              'ضمان اتساق واجهة المستخدم عبر المنصات'
            ]
          },
          inventory: {
            title: 'نظام إدارة المخازن',
            desc: 'نظام إدارة مخازن قائم على الأدوار مبني باستخدام Django و PostgreSQL و Bootstrap.',
            features: [
              'نظام صلاحيات متقدم (RBAC)',
              'إدارة المخزون والكميات بشكل لحظي',
              'معالجة الطلبات وتتبع الشحنات',
              'إدارة الموردين والعملاء',
              'نظام تقارير وتحليلات مفصل'
            ]
          },
          cinemascore: {
            title: 'CinemaScore',
            desc: 'تطبيق ويب تفاعلي لاستعراض قوائم الأفلام والبرامج التلفزيونية مع تكامل TMDB API.',
            features: [
              'تصفح الأفلام والعروض التلفزيونية',
              'خاصية قائمة المشاهدة (Watchlist)',
              'إمكانيات بحث متقدمة',
              'دعم كامل لتبديل اللغات'
            ]
          },
          movieweb: {
            title: 'تطبيق ويب للأفلام',
            desc: 'تطبيق أفلام تفاعلي يعتمد على HTML، CSS، JavaScript، jQuery، و Tailwind CSS.',
            features: [
              'واجهة مستخدم متجاوبة تماماً',
              'خصائص تفاعلية متقدمة',
              'تحديثات بيانات لحظية',
              'تجربة مستخدم محسنة'
            ]
          },
          hms_odoo: {
            title: 'نظام إدارة المستشفيات (Odoo)',
            desc: 'موديول HMS متكامل للمرضى والأقسام والأطباء باستخدام منصة Odoo.',
            features: [
              'إدارة سجلات المرضى والملفات الطبية',
              'تنظيم الأقسام والكوادر الطبية',
              'تحقق مؤتمت من بيانات البريد الإلكتروني',
              'تكامل مع نظام إدارة علاقات العملاء CRM'
            ]
          },
          bookstore: {
            title: 'تطبيق ويب لمتجر كتب',
            desc: 'تطبيق متكامل لمتجر كتب مع واجهة مستخدم تفاعلية وسلسة.',
            features: [
              'واجهة تصفح تفاعلية للكتب',
              'تحقق من البيانات من جهة العميل (Client-side)',
              'تحديثات محتوى ديناميكية'
            ]
          },
          library: {
            title: 'نظام إدارة المكتبات',
            desc: 'نظام شامل لإدارة المكتبات باستخدام Django و PostgreSQL لعمليات بحث وفهرسة فعالة.',
            features: [
              'نظام كامل لفهرسة وتصنيف الكتب',
              'عمليات CRUD كاملة للكتب والمؤلفين',
              'إدارة التصنيفات والأقسام',
              'محرك بحث داخلي سريع'
            ]
          },
          alva_ai: {
            title: 'Alva AI (PULSE) – أتمتة التسويق الذكي',
            desc: 'منصة أتمتة تسويق تعتمد على الذكاء الاصطناعي لتوليد محتوى مخصص للسوق السعودي باستخدام GPT-4o-mini.',
            features: [
              'توليد محتوى ذكي لـ TikTok، Instagram، X، و WhatsApp',
              'هندسة أوامر (Prompting) متخصصة للهجة السعودية العامية',
              'إثراء الهاشتاجات لحظياً عبر التكامل مع SerpAPI',
              'نظام خلفي متطور يدعم الاشتراكات وتحديد سعة الاستخدام'
            ]
          },
          sonomedix: {
            title: 'سونو NEWS – بوابة الإعلام الطبي',
            desc: 'منصة إخبارية طبية احترافية تركز على الرعاية الصحية، الجمال، وتحديثات طب الأطفال مع إدارة محتوى ديناميكية.',
            features: [
              'مقالات طبية حصرية وأهم التطورات السريرية',
              'تصنيفات طبية متقدمة ونظام وسوم ذكي',
              'محرك إخباري عالي الأداء مع تحديثات لحظية',
              'واجهة طبية عصرية مصممة للممارسين المحترفين'
            ]
          },
          nextstop: {
            title: 'NextStop Visa – خدمات السفر والتأشيرات',
            desc: 'منصة مساعدة في استخراج التأشيرات تركز على الـ UK ETA ووثائق السفر الدولية مع فحص الأهلية المؤتمت.',
            features: [
              'أداة فحص أهلية ذكية لـ UK ETA',
              'نماذج تقديم إلكترونية مبسطة ومعالجة آمنة للمستندات',
              'دعم لعدة تأشيرات للرحلات الدولية حول العالم',
              'تتبع حالة الطلب لحظياً مع نظام إشعارات بريدي'
            ]
          },
          kmbc: {
            title: 'KMBC – الشركة الحديثة لبناء وتشييد المدن',
            desc: 'موقع مؤسسي هندسي لشركة مقاولات وإنشاءات رائدة في الكويت.',
            features: [
              'معرض شامل لمشاريع التشييد والإنشاء والمقاولات',
              'قوائم الخدمات الصناعية والقدرات التقنية للشركة',
              'تصميم معماري احترافي مع إبراز التفاصيل الهندسية',
              'هوية مؤسسية عصرية تليق بكبرى شركات الهندسة'
            ]
          },
          rabzan: {
            title: 'ربزان للتجارة – حلول اللوجستيات العالمية',
            desc: 'منصة لوجستية رائدة متخصصة في التجارة العالمية وخدمات التوريد من الصين مع ضمان الجودة.',
            features: [
              'توريد عالمي، تحقق من الموردين، وشحن دولي',
              'فحص صارم للجودة ومراجعة للموردين في الصين',
              'تحسين وإدارة سلاسل الإمداد من البداية للنهاية',
              'تجربة واجهة داكنة فاخرة للمشتريات الصناعية'
            ]
          },
          sems: {
            title: 'Tahsili Platform – منصة التحصيلي التعليمية',
            desc: 'منصة تعليمية مصممة للطلاب السعوديين للتفوق في اختبارات التحصيلي من خلال تعلم وتتبع منظم.',
            features: [
              'لوحة تحكم وتحليلات لأداء الطالب التعليمي',
              'مواد دراسية شاملة ومحاضرات تفاعلية مكثفة',
              'محاكاة مؤتمتة للاختبارات وتحليل دقيق للنتائج',
              'مسارات تعلم مخصصة وتتبع دقيق للتقدم'
            ]
          },
          quotemate: {
            title: 'QuoteMate – حلول التسعير بالذكاء الاصطناعي',
            desc: 'منصة ذكية تعتمد على الذكاء الاصطناعي لتحويل طلبات الـ RFQ غير المنظمة إلى وثائق تسعير احترافية.',
            features: [
              'استخراج بيانات مدعوم بالذكاء الاصطناعي من الـ PDF والصور',
              'توليد عروض أسعار احترافية مؤتمتة في ثوانٍ معدودة',
              'هيكلة المستندات بشكل سلس وأرشفتها في قاعدة البيانات',
              'تحسين دورة المبيعات لفرق البيع الصناعية'
            ]
          },
          dmagni: {
            title: 'DMAGNI – قياس الملابس الافتراضي بالذكاء الاصطناعي',
            desc: 'منصة متطورة تتيح للمستخدمين قياس الملابس افتراضياً في ثوانٍ لتجربة تجارة إلكترونية ثورية.',
            features: [
              'محاكاة واقعية لقياس الملابس مدعومة بالذكاء الاصطناعي',
              'سرعة محاكاة تصل لـ 15 ثانية لتناسب كبار تجار التجزئة',
              'توافق مع مختلف أنماط الملابس وأنواع الأجسام',
              'نموذج SaaS للتكامل السلس مع مواقع التجارة الإلكترونية'
            ]
          },
          cme: {
            title: 'اعتماد طبي – منصة ساعات الـ CME المعتمدة',
            desc: 'نظام تعليم طبي احترافي لتتبع ساعات الـ CME المعتمدة من الهيئة السعودية للتخصصات الصحية (SCFHS).',
            features: [
              'دورات واختبارات تدريب طبي معتمدة من SCFHS',
              'نظام توليد وتحقق فوري من الشهادات الطبية',
              'لوحة تحكم مخصصة للأطباء لتتبع الساعات المكتسبة',
              'تزامن مؤتمت مع قواعد بيانات التراخيص المهنية'
            ]
          },
          dpms: {
            title: 'DiaMonitor – منصة إدارة السكري المتقدمة',
            desc: 'منصة SaaS قائمة على البيانات لإدارة مرض السكري مع مراقبة لحظية للسكر ورؤى صحية احترافية.',
            features: [
              'مزامنة بيانات لحظية مع أجهزة الـ CGM وإنترنت الأشياء',
              'بوابات تفاعلية مخصصة لكل من الطبيب والمريض',
              'تحليلات تنبؤية لاتجاهات السكر وتنبيهات صحية ذكية',
              'لوحة تحكم صحية حديثة وبديهية مع نظام تقارير'
            ]
          }
        }
      },
      laptop_showcase: {
        label: 'معاينة تفاعلية',
        title: 'استعرض أعمالي بتقنية ثلاثية الأبعاد',
        subtitle: 'استكشف مشاريعي المميزة من خلال عرض لابتوب ثلاثي الأبعاد تفاعلي. حرّك الماوس وتفاعل مع النموذج لرؤية التفاصيل.',
        features: {
          responsive: 'تصميم متجاوب',
          performance: 'أداء عالي',
          modern: 'تقنيات حديثة',
          rtl: 'دعم كامل للعربية'
        }
      },
      platform_suite: {
        label: 'حزمة منتجات',
        title: 'محرك واحد… علامات تجارية متعددة',
        subtitle: 'بدلاً من إعادة بناء نظام LMS لكل عميل، بنيت محرك تدريب معتمد واحد وأطلقه كمنصات مستقلة — كل واحدة بهويتها البصرية ومحتواها واعتماداتها، فوق نواة واحدة مجرّبة ومستقرة.',
        shared_title: 'ما ترثه كل نسخة من المحرك',
        capabilities: {
          engine: 'نواة موحّدة Django + PostgreSQL',
          accreditation: 'الاعتمادات وإصدار الشهادات',
          payments: 'المدفوعات وكوبونات الخصم',
          rtl: 'ثنائية اللغة ودعم RTL',
          roles: 'لوحات تحكم متعددة الأدوار',
          branding: 'ثيم وهوية لكل عميل'
        },
        members: {
          injaz: 'التعليم الطبي المستمر لقطاع الرعاية الصحية السعودي، معتمدة من SCFHS ومتكاملة مع NELC.',
          hcholding: 'مركز تدريب التجمع الصحي القابضة في مكة — إنعاش قلبي، دعم حياة، إسعافات أولية وتمريض.',
          mada: 'منصة تدريب وتعلم إلكتروني معتمدة بكتالوج دورات وهوية بصرية خاصة بها.'
        },
        footnote: 'كود واحد، خط نشر واحد، ونموذج أمان واحد — وثلاثة منتجات. العميل الجديد ينطلق في أيام بدلاً من شهور، وأي إصلاح أو ميزة جديدة تصل لكل المنصات في نفس الوقت.'
      },
      brands: {
        label: 'شركاء النجاح',
        title: 'بثقة المبتكرين',
        subtitle: 'مجموعة مختارة من المنصات الرقمية، التطبيقات، والهويات المؤسسية التي ساهمنا في تمكينها نحو التميز الرقمي.'
      },
      skills: {
        title: 'المهارات والخبرات',
        subtitle: 'نظرة شاملة على مهاراتي التقنية ومجالات خبرتي مع مستويات الإتقان.',
        search_placeholder: 'ابحث عن المهارات...',
        no_results: 'لم يتم العثور على مهارات تطابق "{{query}}"',
        categories: {
          all: 'الكل',
          languages: 'لغات البرمجة',
          frameworks: 'أطر العمل والمكتبات',
          devops: 'DevOps والأدوات',
          databases: 'قواعد البيانات و ORM',
          realtime: 'الأنظمة اللحظية والـ APIs',
          cybersecurity: 'الأمن السيبراني',
          management: 'إدارة المشاريع',
          soft: 'المهارات الناعمة'
        },
        soft_skills: {
          communication: 'مهارات التواصل',
          presentation: 'مهارات العرض والتقديم',
          problem_solving: 'حل المشكلات',
          time_management: 'إدارة الوقت',
          adaptability: 'المرونة والتكيف'
        }
      },
      timeline: {
        title: 'الخبرات والتعليم',
        subtitle: 'رحلتي المهنية وخلفيتي الأكاديمية',
        labels: {
          work: 'عمل',
          education: 'تعليم'
        },
        items: [
          {
            title: 'شريك مؤسس (Co-Founder)',
            company: 'Indstrz',
            location: 'عن بُعد، مصر',
            period: '01/2024 - الحالي',
            description: [
              'شريك مؤسس لمنصة Indstrz، منصة صناعية B2B للتوريد الصناعي',
              'تم اختيار المنصة ضمن برنامج Venture Ready، المنفَّذ بواسطة Plug and Play بدعم من GIZ Egypt و ITIDA، ومستضاف في مراكز Creativa للابتكار بالإسكندرية',
              'بناء دورة عمل طلبات العروض (RFQ) الرقمية ومحرك المفاوضات اللحظية',
              'قيادة التطوير التقني باستخدام Next.js و Flask و PostgreSQL'
            ]
          },
          {
            title: 'مطور ويب متكامل (Full Stack)',
            company: 'شركة S&F (السعودية)',
            location: 'عن بُعد، المملكة العربية السعودية',
            period: '07/2025 - الحالي',
            description: [
              'بناء وتطوير تطبيقات متكاملة باستخدام Django، Node.js، React.js، و PostgreSQL',
              'تصميم ونشر خدمات الـ Backend و RESTful APIs لتطبيقات الويب والموبايل',
              'تحسين أداء قواعد البيانات وضمان قابلية توسع التطبيقات'
            ]
          },
          {
            title: 'محاضر خارجي - تطوير واجهات المواقع (Front-End)',
            company: 'معهد تكنولوجيا المعلومات (ITI)',
            location: 'عن بُعد، مصر',
            period: '07/2025 - 10/2025',
            description: [
              'تدريس تطوير واجهات المواقع (HTML, CSS, JavaScript) لأكثر من 240 طالباً',
              'تصميم وتقديم جلسات برمجية عملية وإرشاد الطلاب في مشاريع حقيقية'
            ]
          },
          {
            title: 'مطور ويب مستقل (Freelance)',
            company: 'عمل حر',
            location: 'عن بُعد، مصر',
            period: '03/2025 - الحالي',
            description: [
              'بناء تطبيقات ويب متكاملة وجاهزة للنشر لعملاء في منطقة الخليج',
              'تسليم منصات قابلة للتوسع تدعم اللغات المتعددة واتجاه RTL',
              'استخدام تقنيات React, Next.js, NestJS, Django, و PostgreSQL'
            ]
          },
          {
            title: 'متدرب تطوير ويب متكامل باستخدام بايثون',
            company: 'معهد تكنولوجيا المعلومات (ITI)',
            location: 'هجين، مصر',
            period: '11/2024 - 04/2025',
            description: [
              'العمل على مشاريع تطبيقية تشمل بايثون، ديجانجو، قواعد البيانات، وتقنيات الواجهة الأمامية'
            ]
          },
          {
            title: 'متدرب في البنية التحتية لتكنولوجيا المعلومات',
            company: 'شركة عز الدخيلة للصلب (EZDK)',
            location: 'الإسكندرية، مصر',
            period: '09/2022 - 10/2022',
            description: [
              'اكتساب خبرة عملية في البنية التحتية لتكنولوجيا المعلومات وتطوير البرمجيات',
              'المساعدة في مهام تطوير البرمجيات والدعم الفني للمنظومة'
            ]
          },
          {
            title: 'بكالوريوس التجارة (نظم المعلومات الإدارية)',
            company: 'جامعة الإسكندرية',
            location: 'الإسكندرية، مصر',
            period: '07/2019 - 07/2023',
            description: [
              'التخرج بتقدير جيد جداً (المعدل التراكمي: 3.265)',
              'مشروع التخرج: موقع متجر مجوهرات | التقدير: امتياز (A)'
            ]
          }
        ]
      },
      stats: {
        projects: 'مشروع تم إنجازه',
        technologies: 'تقنية تم إتقانها',
        years: 'سنوات الخبرة',
        students: 'طالباً تم تدريسهم',
        clients: 'عميل تم خدمتهم'
      },
      certifications: {
        title: 'الدورات والشهادات',
        subtitle: 'رحلة التطوير المهني والتعلم المستمر',
        items: {
          python_django: 'دليل تعلم بايثون ودجانجو',
          intro_python: 'مقدمة في لغة بايثون',
          docker: 'دورة تدريب دوكر للمبتدئين',
          git_github: 'Git و GitHub',
          web_dev: 'مسار تحدي تطوير الويب',
          ui_ux: 'دورة تصميم تطبيقات الموبايل UI/UX',
          redhat: 'إدارة نظم Red Hat I',
          android: 'تطوير تطبيقات الأندرويد'
        }
      },
      services: {
        title: 'الخدمات التي أقدمها',
        subtitle: 'خدمات تطوير ويب متكاملة مصممة خصيصاً لتحويل أفكارك إلى واقع',
        ready: 'هل أنت مستعد لبدء مشروعك؟',
        get_in_touch: 'تواصل معي',
        list: [
          {
            title: 'تطوير مخصص متكامل (Full-Stack)',
            desc: 'تطوير تطبيقات ويب عالية الأداء من البداية للنهاية باستخدام تقنيات حديثة مثل React و Next.js و Django و NestJS.',
            features: [
              'حلول SaaS والمؤسسات',
              'منصات التجارة الإلكترونية',
              'تطبيقات الويب التقدمية (PWA)',
              'بنية سحابية قابلة للتوسع'
            ]
          },
          {
            title: 'الذكاء الاصطناعي وهندسة الـ Backend',
            desc: 'بناء بنيات تحتية قوية للخوادم ودمج ميزات الذكاء الاصطناعي للأتمتة ومعالجة البيانات الذكية.',
            features: [
              'REST & GraphQL APIs آمنة',
              'روبوتات الدردشة وتكامل LLM',
              'تصميم وتحسين قواعد البيانات',
              'أنظمة البيانات اللحظية'
            ]
          },
          {
            title: 'واجهات حديثة ودعم RTL',
            desc: 'إنشاء واجهات دقيقة، سهلة الوصول، وسريعة التحميل مع دعم متخصص للغة العربية (RTL) والأسواق متعددة اللغات.',
            features: [
              'إتقان الأنظمة متعددة اللغات و RTL',
              'أنيميشن متطور باستخدام Framer Motion',
              'تحسين محركات البحث SEO والأداء',
              'تصميم متجاوب ومتكيف'
            ]
          },
          {
            title: 'الأمن واستراتيجية الـ DevOps',
            desc: 'ضمان أمان واستقرار تطبيقاتك وجاهزيتها للنمو بفضل معايير أمان احترافية وخطوط نشر مؤتمتة.',
            features: [
              'أمان مبني على JWT والأدوار',
              'تدفقات عمل CI/CD و Docker',
              'موازنة الأحمال والتوسع',
              'استشارات تقنية متخصصة'
            ]
          },
          {
            title: 'استلام الأكواد القديمة والتدقيق التقني',
            desc: 'أستلم المشاريع الموروثة والمتوقفة. التدقيق بيجي الأول، عشان تعرف إيه الغلط وإيه تكلفته قبل ما يبدأ أي شغل.',
            features: [
              'تدقيق كامل للكود الموروث مع تقرير مكتوب',
              'تقدير واضح لتكلفة الإصلاح قبل بدء أي عمل',
              'إصلاح الأخطاء وإعادة الهيكلة وتحسين الأداء على أنظمة تعمل فعلياً',
              'استلام المشاريع اللي سابها مطور سابق'
            ]
          }
        ]
      },
      process: {
        label: 'طريقة عملي',
        title: 'من أول مكالمة لحد إطلاق المنتج',
        subtitle: 'خطوات واضحة ومخرَج محدد لكل مرحلة، فتعرف في أي وقت إحنا فين وإيه الخطوة الجاية.',
        steps: {
          discovery: {
            title: '١. مكالمة تعريفية',
            desc: 'نتكلم عن الهدف والمستخدمين والقيود. أسأل الأسئلة الصعبة من البداية — الميزانية، المواعيد، التكاملات — فمفيش مفاجآت بعد كده.',
            deliverable: 'المخرَج: ملخص مكتوب للنطاق'
          },
          blueprint: {
            title: '٢. تحديد النطاق والمخطط',
            desc: 'أحوّل الكلام لخطة ملموسة: المميزات مقسّمة لمراحل، تصميم قاعدة البيانات، التقنيات المستخدمة، وجدول زمني واقعي بمراحل تسليم.',
            deliverable: 'المخرَج: عرض فني + جدول زمني'
          },
          build: {
            title: '٣. التنفيذ على مراحل',
            desc: 'التطوير بيحصل على دفعات تقدر تراجعها، مش تسليم واحد في الآخر. بتاخد رابط تجريبي من أول مرحلة وتتابع الشغل خطوة بخطوة.',
            deliverable: 'المخرَج: رابط تجريبي لكل مرحلة'
          },
          review: {
            title: '٤. المراجعة والتجهيز',
            desc: 'ملاحظاتك على كل مرحلة بتتنفذ، وبعدها أختبر المسارات من البداية للنهاية — التحقق، الصلاحيات، الحالات الاستثنائية، الموبايل، والـ RTL.',
            deliverable: 'المخرَج: نسخة مختبَرة ومظبوطة'
          },
          launch: {
            title: '٥. الإطلاق',
            desc: 'النشر، الدومين والـ SSL، إعداد البيئة، أساسيات الـ SEO والتحليلات. وأسلّمك الريبو وبيانات الدخول وشرح سريع للنظام.',
            deliverable: 'المخرَج: موقع شغّال + تسليم كامل'
          },
          support: {
            title: '٦. الدعم بعد الإطلاق',
            desc: 'فترة ضمان بعد الإطلاق لأي خطأ في اللي تم تسليمه، مع إمكانية عقد شهري للتطوير المستمر والصيانة.',
            deliverable: 'المخرَج: ضمان + عقد شهري اختياري'
          }
        }
      },
      packages: {
        label: 'الباكدجات',
        title: 'طرق نشتغل بيها مع بعض',
        subtitle: 'ثلاث صيغ شائعة للمشاريع. كل مشروع بيتحدد نطاقه حسب احتياجك الفعلي — دي نقط بداية مش قوالب جاهزة.',
        most_popular: 'الأكثر طلباً',
        on_request: 'السعر حسب النطاق',
        cta: 'اطلب عرض سعر',
        footnote: 'مش متأكد إيه المناسب؟ ابعتلي وصف سريع لمشروعك وهرد عليك بنطاق مقترح وجدول زمني وسعر — بدون أي التزام.',
        tiers: {
          landing: {
            name: 'موقع وصفحة هبوط',
            tagline: 'حضور تسويقي سريع ومتقن يحوّل الزائر لعميل ويظهر صح على كل الشاشات.',
            price: '',
            timeline: 'عادةً ١–٢ أسبوع',
            features: [
              'تصميم مخصص — بدون قوالب مُعاد استخدامها',
              'تصميم متجاوب بالكامل ومبني للموبايل أولاً',
              'ثنائي اللغة عربي/إنجليزي بدعم RTL كامل',
              'أساسيات تحسين محركات البحث وتحسين الأداء',
              'استمارة تواصل وتكامل مع WhatsApp',
              'النشر وإعداد الدومين والـ SSL'
            ]
          },
          platform: {
            name: 'منصة متكاملة (Full-Stack)',
            tagline: 'منتج كامل بحسابات ولوحات تحكم ومدفوعات ولوحة إدارة — مبني ليكبر معاك.',
            price: '',
            timeline: 'عادةً ٤–١٠ أسابيع',
            features: [
              'كل اللي في باكدج الموقع',
              'Backend مخصص وتصميم قاعدة بيانات و REST APIs',
              'نظام مصادقة ولوحات تحكم حسب الأدوار',
              'تكامل بوابة دفع ونظام فواتير',
              'لوحة إدارة مع تقارير وتصدير بيانات',
              'مميزات ذكاء اصطناعي وتحديثات لحظية (اختياري)',
              'بيئة تجريبية ومراجعة لكل مرحلة'
            ]
          },
          retainer: {
            name: 'شريك تطوير مستمر',
            tagline: 'اتفاق شهري للفرق اللي محتاجة تطوير متواصل، مش تسليم لمرة واحدة.',
            price: '',
            timeline: 'شهرياً، وتقدر توقف في أي وقت',
            features: [
              'ساعات تطوير محجوزة لك كل شهر',
              'مميزات جديدة وتحسينات مستمرة',
              'إصلاح الأخطاء ومراقبة الأداء',
              'تحديثات المكتبات والثغرات الأمنية',
              'أولوية في سرعة الاستجابة',
              'استشارات تقنية ومراجعة كود'
            ]
          }
        }
      },
      case_studies: {
        label: 'دراسة حالة',
        back: 'رجوع للمشاريع',
        visit: 'زيارة الموقع',
        cta_title: 'عندك مشروع شبه ده؟',
        cta_subtitle: 'قوللي إنت بتبني إيه وهرجع لك بنطاق مقترح وجدول زمني وسعر.',
        cta_button: 'ابدأ الحديث',
        facts: {
          role: 'دوري في المشروع',
          scope: 'نطاق العمل',
          audience: 'الجمهور المستهدف'
        },
        sections: {
          challenge: 'التحدي',
          approach: 'المنهجية',
          delivered: 'اللي تم بناؤه',
          outcome: 'النتيجة',
          stack: 'التقنيات المستخدمة'
        },
        bilqalam: {
          title: 'معهد بالقلم، أكاديمية أونلاين بناها ويديرها مطور واحد',
          summary: 'منصة تعليمية تعمل فعلياً لمعهد متخصص في تعليم القرآن الكريم واللغة العربية والعلوم الشرعية أونلاين، وبتخدم آلاف الطلاب المسجلين. أنا المطور الوحيد عليها.',
          facts: {
            role: 'المطور الوحيد، بنيتها وبصيانتها لوحدي',
            scope: 'تسجيل الطلاب وإدارتهم، الفوترة والفواتير، التقارير الإدارية',
            audience: 'آلاف الطلاب المسجلين'
          },
          challenge: {
            body: 'معهد بحجم ده مش ممكن يشتغل على ملفات إكسل ورسايل واتساب. محتاج يسجّل الطلاب، ويعرف مين في أي برنامج، ويحصّل منهم، ويصدر فواتير، ويدي الإدارة أرقام تقدر تتصرف على أساسها. وكل ده لازم يشتغل بالعربي، بما فيه الواجهات المالية والمليانة بيانات اللي أغلب القوالب بتفشل فيها.',
            points: [
              'آلاف الطلاب المسجلين محتاجين متابعة',
              'فوترة وفواتير مربوطة بالتسجيل',
              'الإدارة محتاجة تقارير تقدر تتصرف عليها',
              'عربية و RTL في الواجهات المالية والمليانة بيانات'
            ]
          },
          approach: {
            body: 'بنيتها كنظام واحد مش أدوات متلزقة ببعض، فالتسجيل والفوترة والتقارير بيقروا من نفس البيانات. الواجهة بـ Next.js والخلفية بـ Laravel. الـ RTL اتصمم من البداية مش اتضاف بعدين، لأن الجداول والفواتير وشاشات التقارير هي بالظبط المكان اللي بيتكسر فيه التخطيط من اليمين لليسار.',
            points: [
              'التسجيل والفوترة والتقارير على نفس البيانات',
              'واجهة Next.js وخلفية Laravel',
              'RTL مصمم من البداية مش مضاف لاحقاً',
              'مطور واحد، فالمعمارية فضلت متسقة'
            ]
          },
          delivered: {
            body: 'المعهد بيدير شغله اليومي على المنصة. بنيت كل جزء فيها وبصيانتها لوحدي.',
            points: [
              'نظام تسجيل الطلاب وإدارتهم',
              'الفوترة وإصدار الفواتير',
              'لوحات التقارير الإدارية اللي المعهد بيشتغل عليها',
              'عربية و RTL بالكامل، بما فيها الواجهات المالية والمليانة بيانات',
              'تعمل فعلياً وتخدم آلاف الطلاب المسجلين'
            ]
          },
          outcome: {
            body: 'المنصة شغالة فعلياً والمعهد بيشتغل عليها. دي المشروع اللي بشاور عليه لما عميل يسألني أقدر أبني نظام حقيقي وأشيله لوحدي ولا لأ، لأن ده بالظبط اللي هو.',
            points: [
              'تعمل فعلياً وفي استخدام يومي',
              'مبنية ومُصانة بواسطة مطور واحد',
              'توحيد العمليات في نظام واحد'
            ]
          }
        }
      },
      testimonials: {
        title: 'ماذا يقول الناس',
        subtitle: 'آراء العملاء والطلاب والزملاء الذين عملت معهم ولهم كل التقدير',
        positive_reviews: 'تقييمات إيجابية',
        reviews_count: 'تقييماً',
        view_review: 'عرض التقييم الكامل على {{platform}}',
        follow_me: 'تابعني على المنصات الرقمية',
        time: {
          days: 'منذ {{count}} يوم',
          month_one: 'منذ شهر',
          months: 'منذ {{count}} أشهر',
          months_many: 'منذ {{count}} شهراً',
          year_one: 'منذ سنة',
          years: 'منذ {{count}} سنوات'
        },
        items: {
          salman_a: {
            text: 'مبدع و محترم، سعدنا بهذا التعاون',
            role: 'عميل - خمسات'
          },
          amsb_a: {
            text: 'شخص ذو خبرة عالية، أخلاق راقية، سريع في التنفيذ.. وناصح أمين.. شكراً جزيلاً لك باشمهندس بلال.',
            role: 'عميل - خمسات'
          },
          abu_w: {
            text: 'أود أن أعبّر عن مدى رضاي الكامل عن العمل المقدم، حيث يتمتع الأخ بلال بكفاءة عالية وخبرة واضحة في تنفيذ المطلوب بدقة واحترافية. جودة الخدمة ممتازة جدًا وتفوقت على التوقعات مع اهتمام كبير بأدق التفاصيل، كما كان التواصل سريعًا وواضحًا طوال فترة المشروع مع متابعة مستمرة وحرص على توضيح كل خطوة. بالإضافة إلى ذلك، تم الالتزام بوقت التسليم بل وإنجاز العمل في وقت قياسي دون التأثير على الجودة، مبرمج محترف يمكن الاعتماد عليه ويقدم نتائج مميزة بكل ثقة',
            role: 'عميل - خمسات'
          },
          ahmed_e: {
            text: 'الشغل زي ما كنت عايزة بالظبط في وقت مناسب مع آخر تعامل مش بالمهندس بلال إن شاء الله',
            role: 'عميل - خمسات'
          },
          amal_a: {
            text: 'ما شاء الله على السرعة والاستجابة السريعة وسويت المطلوب وأكثر شكراً لك',
            role: 'عميلة - خمسات'
          },
          ahmed_y: {
            text: 'ممتاز',
            role: 'عميل - خمسات'
          },
          aseel_a: {
            text: 'أخي بلال على مجهودك المبذول، أتشرف بالعمل معك خلال مشاريع مستقبلية أخرى لحسن تعاملك وأنصح كل شخص بالتعامل معك. عمله متقن وممتاز وأشكرك.',
            role: 'صاحب مشروع - مستقل'
          },
          abo_m: {
            text: 'شكرا لكم على جهودكم',
            role: 'عميل - خمسات'
          },
          royal_eagles: {
            text: 'خدمة راقية وشخص محترم جدااااا',
            role: 'عميل - خمسات'
          },
          nouf_a: {
            text: "اشكر المهندس على امانته وشغله وسرعه الاستجابه. بكون معاه في كل شغلي القادم بإذن الله",
            role: 'عميلة - خمسات'
          },
          ahmed_a: {
            text: 'تجربة ممتازة مع المهندس بلال احترافي في التعامل ومتعاون ويستجيب للتغييرات بكل مرونة. أنجز العمل بجودة عالية والتواصل كان سلس طوال فترة التنفيذ',
            role: 'عميل - خمسات'
          }
        }
      },
      contact: {
        title: 'تواصل معي',
        subtitle: 'لا تتردد في التواصل معي للتعاون في مشروع جديد أو حتى لإلقاء التحية',
        info: {
          email: 'البريد الإلكتروني',
          phone: 'رقم الهاتف',
          location: 'الموقع',
          linkedin: 'لينكد إن',
          alexandria: 'الإسكندرية، مصر',
          show_phone: 'إظهار رقم الهاتف'
        },
        form: {
          name: 'الاسم',
          email: 'البريد الإلكتروني',
          message: 'الرسالة',
          placeholders: {
            name: 'اسمك الكريم',
            email: 'your@email.com',
            message: 'اكتب رسالتك هنا...'
          },
          submit: 'إرسال الرسالة',
          sending: 'جاري الإرسال...'
        },
        notifications: {
          success: 'تم إرسال الرسالة بنجاح! سأرد عليك في أقرب وقت.',
          error: 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى أو مراسلتي مباشرة.'
        }
      },
      nav: {
        home: 'الرئيسية',
        about: 'عني',
        timeline: 'المسار',
        projects: 'أعمالي',
        suite: 'حزمة المنتجات',
        skills: 'مهاراتي',
        services: 'خدماتي',
        process: 'طريقة عملي',
        packages: 'الباكدجات',
        testimonials: 'قالوا عني',
        contact: 'تواصل معي',
        download_cv: 'تحميل السيرة الذاتية'
      },
      footer: {
        about_title: 'بلال ناجي',
        about_text: 'أبني منصات ويب من الصفر، وأستلم الأكواد القائمة اللي محتاجة إصلاح. ٣١ مشروعاً لـ ٢٧ عميلاً في مصر والخليج.',
        quick_links: 'روابط سريعة',
        services: 'الخدمات',
        get_in_touch: 'تواصل معي',
        follow_me: 'تابعني على المنصات الرقمية',
        back_to_top: 'العودة للأعلى',
        freelance_notice: 'تصميم وتطوير بلال ناجي | متاح لعروض العمل الحر'
      }
    }
  }
};

export const SUPPORTED_LANGUAGES = ['en', 'ar'];
export const DEFAULT_LANGUAGE = 'en';
// Same key the browser language-detector used, so returning visitors keep their choice.
export const LANGUAGE_STORAGE_KEY = 'i18nextLng';

/**
 * The page is statically prerendered, so detection can't run before the first
 * render — the server would emit English markup while the client rendered
 * Arabic, and every translated string would fail hydration. Instead i18next
 * always initialises in English (matching the prerendered HTML) and the stored
 * or browser language is applied after mount, behind the loading screen.
 */
export const resolvePreferredLanguage = () => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.includes(stored)) return stored;
  } catch {
    // localStorage can throw in private mode — fall through to the browser language.
  }

  const navigatorLanguage = window.navigator?.language || '';
  const base = navigatorLanguage.split('-')[0];
  return SUPPORTED_LANGUAGES.includes(base) ? base : DEFAULT_LANGUAGE;
};

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  interpolation: {
    escapeValue: false
  }
});

// The detector plugin used to persist this; keep the behaviour without it.
if (typeof window !== 'undefined') {
  i18n.on('languageChanged', (language) => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore write failures — the language still applies for this session.
    }
  });
}

export default i18n;
