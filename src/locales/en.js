// English translation bundle.
// Loaded only on routes prerendered in this language; the other bundle is
// fetched on demand when the visitor switches (see src/i18n.js).
const en = {
    translation: {
      hero: {
        available: 'Available for new projects',
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
          education: 'Bachelor of Business (BIS)',
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
        show_all: 'Show the full archive ({{count}} projects)',
        show_featured: 'Show featured only',
        featured_note: 'A hand-picked selection — the full archive is one click away.',
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
            impact: 'Thousands of enrolled students',
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
            impact: 'Live on Google Play',
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
            impact: 'Bulk search & Excel import',
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
            impact: 'Full Arabic car marketplace',
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
            impact: 'SCFHS-accredited, NELC-integrated',
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
            impact: 'Plug and Play Venture Ready',
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
            impact: 'Thousands of memberships automated',
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
            impact: 'Real-time GPS tracking',
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
        categories: {
          all: 'All',
          languages: 'Programming Languages',
          frameworks: 'Frameworks & Libraries',
          devops: 'DevOps, Infra & Security',
          databases: 'Databases & APIs',
          soft: 'Workflow & Soft Skills'
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
            key: 'ezsec',
            title: 'Software Engineer',
            company: 'ezSec Inc (Canada)',
            location: 'Remote, Kitchener, Canada',
            period: '01/2026 - Present',
            employment: 'Full-time',
            description: [
              'Working remotely as a Software Engineer at a Canadian cybersecurity company specializing in easy-to-use cyber security solutions',
              'Building, maintaining, and shipping software products end-to-end within a fully remote team',
              'Handling DevOps tasks: deploying finished software to production servers, configuring environments, and keeping services running'
            ]
          },
          {
            key: 'indstrz',
            title: 'Co-Founder',
            company: 'Indstrz',
            location: 'Remote, Egypt',
            period: '01/2024 - Present',
            employment: 'Side venture',
            description: [
              'Co-founded a B2B industrial platform for industrial procurement',
              'Selected for the Venture Ready Program, implemented by Plug and Play with support from GIZ Egypt and ITIDA, hosted at Creativa Innovation Hubs in Alexandria',
              'Built the digital RFQ workflow and the real-time negotiation engine',
              'Led technical development using Next.js, Flask and PostgreSQL'
            ]
          },
          {
            key: 'sf',
            title: 'Full Stack Developer',
            company: 'S&F (Saudi Arabia)',
            location: 'Remote, Saudi Arabia',
            period: '07/2025 - Present',
            employment: 'Part-time',
            description: [
              'Built and maintained full-stack applications using Django, Node.js, React.js, and PostgreSQL',
              'Designed and deployed backend services & RESTful APIs for web and mobile apps',
              'Improved database performance and ensured application scalability'
            ]
          },
          {
            key: 'iti_instructor',
            title: 'External Instructor - Front-End Development',
            company: 'Information Technology Institute (ITI)',
            location: 'Remote, Egypt',
            period: '07/2025 - 10/2025',
            employment: 'Contract',
            description: [
              'Taught Front-End Development (HTML, CSS, JavaScript) to more than 240 students',
              'Designed and delivered practical coding sessions and real-world project guidance'
            ]
          },
          {
            key: 'freelance',
            title: 'Freelance Web Developer',
            company: 'Self-Employed',
            location: 'Remote, Egypt',
            period: '03/2025 - Present',
            employment: 'Freelance',
            description: [
              'Built full-stack, production-ready web apps for Gulf clients',
              'Delivered scalable, multilingual, and RTL-supported platforms',
              'Used React, Next.js, NestJS, Django, and PostgreSQL'
            ]
          },
          {
            key: 'iti_intern',
            title: 'Full Stack Development Using Python Intern',
            company: 'Information Technology Institute (ITI)',
            location: 'Hybrid, Egypt',
            period: '11/2024 - 04/2025',
            employment: 'Internship',
            description: [
              'Worked on hands-on projects covering Python, Django, databases, and front-end technologies'
            ]
          },
          {
            key: 'ezdk',
            title: 'IT Infrastructure Intern',
            company: 'Al Ezz Dekheila Steel Co. EZDK',
            location: 'Alexandria, Egypt',
            period: '09/2022 - 10/2022',
            employment: 'Internship',
            description: [
              'Gained hands-on experience in IT infrastructure and software development',
              'Assisted in software development tasks and IT support'
            ]
          },
          {
            key: 'alexu',
            title: 'Bachelor of Business (English Section) – Business Information Systems (BIS)',
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
          show_phone: 'Show phone number',
          whatsapp: 'WhatsApp',
          whatsapp_cta: 'Chat on WhatsApp'
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
          error: 'Failed to send message. Please email me directly at belalnajy9@gmail.com.'
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
        connect: 'Connect',
        freelance_notice: 'Designed & Developed by Belal Nagy | Open for freelance opportunities'
      },
      notifications: {
        cv_success: 'CV downloaded successfully!',
        cv_error: 'Failed to download CV. Please try again.'
      },
      whatsapp: {
        aria: 'Chat on WhatsApp',
        message: "Hi Belal, I found you through your portfolio and I'd like to discuss a project."
      },
      faq: {
        title: 'Quick FAQ',
        subtitle: 'Instant answers about Belal',
        tooltip: 'How can I help you?'
      }
    }
};

export default en;
