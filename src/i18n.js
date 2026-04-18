import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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
        description_1: 'Passionate about building ',
        description_2: 'scalable, high-performance web applications',
        description_3: ' and transforming complex ideas into ',
        description_4: 'intuitive, elegant user experiences',
        description_5: '. Currently crafting impactful digital solutions at ',
        company: 'S&F',
        view_projects: 'View Projects',
        contact_me: 'Contact Me',
        download_cv: 'Download CV',
        follow_me: 'Follow me on Arabic platforms'
      },
      about: {
        title: 'About Me',
        subtitle: 'Full Stack Developer experienced in building scalable, multilingual web applications',
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
        summary_p1: 'Full Stack Developer experienced in building <1>scalable, multilingual web applications</1> using React.js, Next.js, Django, NestJS, and PostgreSQL. Currently working at <3>S&F (Saudi Arabia)</3> developing full-stack applications and backend services for web and mobile platforms.',
        summary_p2: 'Completed the ITI Full Stack program and served as an <1>External Instructor at ITI</1>, teaching Front-End Development to <3>200+ students</3>. Delivered AI-integrated, RTL-ready platforms for Saudi startups and universities, focused on modern UI/UX and real-time systems.',
        summary_p3: 'Passionate about creating efficient, scalable solutions with expertise in multilingual platforms, real-time features, and modern development practices. Always eager to learn new technologies and deliver production-ready applications.',
        highlights: {
          fast_learner: {
            title: 'Fast Learner',
            desc: 'Quick to adapt to new technologies and frameworks'
          },
          passionate: {
            title: 'Passionate',
            desc: 'Love building elegant solutions to complex problems'
          },
          creative: {
            title: 'Creative',
            desc: 'Always thinking of innovative ways to improve UX'
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
          backend: 'Backend'
        },
        modal: {
          technologies: 'Technologies',
          features: 'Key Features & Highlights',
          live_link: 'Visit Live Project',
          source_code: 'View Source Code'
        },
        items: {
          indstrz: {
            title: 'Indstrz – B2B Industrial Marketplace',
            desc: 'A scalable full-stack B2B procurement platform with end-to-end digital RFQ workflows, real-time negotiations, and automated conversation management.',
            features: [
              'End-to-end digital RFQ workflows between buyers and verified vendors',
              'Real-time messaging and notifications using Socket.io',
              'Secure RBAC with JWT token revocation and multi-role management',
              'Modular Application Factory Pattern with layered architecture'
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
              'Co-founded a B2B Industrial Marketplace focused on streamlining industrial procurement',
              'Architected the digital RFQ workflow and real-time negotiation engine',
              'Led the technical development of the platform using Next.js, Flask, and PostgreSQL'
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
              'Taught Front-End Development (HTML, CSS, JavaScript) to more than 200 students',
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
        students: 'Students Taught'
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
          }
        ]
      },
      testimonials: {
        title: 'What People Say',
        subtitle: "Feedback from clients, students, and colleagues I've worked with",
        positive_reviews: 'Positive Reviews',
        reviews_count: 'Reviews',
        view_review: 'View Full Review on {{platform}}',
        follow_me: 'Follow me on platforms',
        items: {
          ahmed_e: {
            text: 'The work was exactly as I wanted in a reasonable time, not the last interaction with Engineer Belal, God willing.',
            role: 'Client - Khamsat',
            date: '4 months ago'
          },
          amal_a: {
            text: 'Masha Allah on the speed and quick response, you did what was required and more. Thank you!',
            role: 'Client - Khamsat',
            date: '2 months ago'
          },
          ahmed_y: {
            text: 'Excellent',
            role: 'Client - Khamsat',
            date: '1 month ago'
          },
          aseel_a: {
            text: 'Brother Belal, thank you for your effort. I am honored to work with you in other future projects for your good treatment and I advise everyone to deal with you. His work is perfect and excellent.',
            role: 'Project Owner - Mostaql',
            date: '1 month ago'
          },
          abo_m: {
            text: 'Thank you for your efforts.',
            role: 'Client - Khamsat',
            date: '27 days ago'
          },
          royal_eagles: {
            text: 'High-end service and a very respectable person.',
            role: 'Client - Khamsat',
            date: '1 month ago'
          },
          nouf_a: {
            text: "I thank the engineer for his honesty, work, and speed of response. I will be with him in all my future work, God willing.",
            role: 'Client - Khamsat',
            date: '1 month ago'
          },
          ahmed_a: {
            text: 'Excellent experience with Engineer Belal, professional in dealing, cooperative, and responds to changes with flexibility. He completed the work with high quality and communication was smooth throughout.',
            role: 'Client - Khamsat',
            date: '2 months ago'
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
          alexandria: 'Alexandria, Egypt'
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
        skills: 'Skills',
        services: 'Services',
        testimonials: 'Testimonials',
        contact: 'Contact',
        download_cv: 'Download CV'
      },
      footer: {
        about_title: 'Belal Nagy',
        about_text: 'Full Stack Developer passionate about building scalable, high-performance web applications and transforming complex ideas into elegant user experiences.',
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
        description_1: 'شغوف ببناء ',
        description_2: 'تطبيقات ويب عالية الأداء وقابلة للتوسع',
        description_3: ' وتحويل الأفكار المعقدة إلى ',
        description_4: 'تجارب مستخدم بديهية وأنيقة',
        description_5: '. أقوم حالياً بابتكار حلول رقمية مؤثرة في ',
        company: 'S&F',
        view_projects: 'عرض المشاريع',
        contact_me: 'تواصل معي',
        download_cv: 'تحميل CV',
        follow_me: 'تابعني على المنصات العربية'
      },
      about: {
        title: 'عني',
        subtitle: 'مطور Full Stack ذو خبرة في بناء تطبيقات ويب قابلة للتوسع ومتعددة اللغات',
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
        summary_p1: 'مطور Full Stack محترف في بناء <1>تطبيقات ويب قابلة للتوسع ومتعددة اللغات</1> باستخدام React.js، Next.js، Django، NestJS، و PostgreSQL. أعمل حالياً في <3>شركة S&F (السعودية)</3> على تطوير تطبيقات شاملة وخدمات خلفية للمواقع ومنصات الجوال.',
        summary_p2: 'خريج برنامج الـ ITI المكثف، وعملت كـ <1>محاضر خارجي (External Instructor)</1> في معهد تكنولوجيا المعلومات (ITI)، حيث قمت بتدريس تطوير الواجهات الأمامية لأكثر من <3>200 طالب</3>. قمت بتسليم منصات متكاملة مع الذكاء الاصطناعي وتدعم الـ RTL للشركات الناشئة والجامعات السعودية.',
        summary_p3: 'شغوف بابتكار حلول فعالة وقابلة للتطوير، مع خبرة خاصة في المنصات متعددة اللغات، الأنظمة اللحظية (Real-time)، وأحدث ممارسات التطوير. دائماً ما أسعى لتعلم تكنولوجيات جديدة وتقديم تطبيقات جاهزة للإنتاج.',
        highlights: {
          fast_learner: {
            title: 'سرعة التعلم',
            desc: 'القدرة على التكيف السريع مع التقنيات وإطارات العمل الجديدة'
          },
          passionate: {
            title: 'الشغف',
            desc: 'حب بناء حلول أنيقة للمشكلات البرمجية المعقدة'
          },
          creative: {
            title: 'الإبداع',
            desc: 'التفكير الدائم في طرق ابتكارية لتحسين تجربة المستخدم'
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
          backend: 'Backend'
        },
        modal: {
          technologies: 'التقنيات المستخدمة',
          features: 'أهم المميزات والخصائص',
          live_link: 'زيارة المشروع',
          source_code: 'عرض الكود المصدري'
        },
        items: {
          indstrz: {
            title: 'Indstrz – منصة تجارة صناعية B2B',
            desc: 'منصة مشتريات B2B متكاملة وقابلة للتوسع تدعم دورات عمل RFQ الرقمية، المفاوضات اللحظية، وإدارة المحادثات المؤتمتة.',
            features: [
              'دورات عمل RFQ رقمية متكاملة بين المشترين والموردين المعتمدين',
              'نظام مراسلة وإشعارات لحظي باستخدام Socket.io',
              'نظام صلاحيات RBAC آمن مع إدارة الجلسات وتعدد الأدوار',
              'هندسة برمجية قائمة على Modular Application Factory Pattern'
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
              'شريك مؤسس لمنصة Indstrz، وهي سوق صناعي B2B يهدف لتسهيل عمليات التوريد الصناعي',
              'تصميم وبرمجة دورة عمل طلبات العروض (RFQ) الرقمية ومحرك المفاوضات اللحظية',
              'قيادة التطوير التقني للمنصة باستخدام Next.js و Flask و PostgreSQL'
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
              'تدريس تطوير واجهات المواقع (HTML, CSS, JavaScript) لأكثر من 200 طالباً',
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
        students: 'طالباً تم تدريسهم'
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
          }
        ]
      },
      testimonials: {
        title: 'ماذا يقول الناس',
        subtitle: 'آراء العملاء والطلاب والزملاء الذين عملت معهم ولهم كل التقدير',
        positive_reviews: 'تقييمات إيجابية',
        reviews_count: 'تقييماً',
        view_review: 'عرض التقييم الكامل على {{platform}}',
        follow_me: 'تابعني على المنصات الرقمية',
        items: {
          ahmed_e: {
            text: 'الشغل زي ما كنت عايزة بالظبط في وقت مناسب مع آخر تعامل مش بالمهندس بلال إن شاء الله',
            role: 'عميل - خمسات',
            date: 'منذ 4 أشهر'
          },
          amal_a: {
            text: 'ما شاء الله على السرعة والاستجابة السريعة وسويت المطلوب وأكثر شكراً لك',
            role: 'عميلة - خمسات',
            date: 'منذ شهرين'
          },
          ahmed_y: {
            text: 'ممتاز',
            role: 'عميل - خمسات',
            date: 'منذ شهر'
          },
          aseel_a: {
            text: 'أخي بلال على مجهودك المبذول، أتشرف بالعمل معك خلال مشاريع مستقبلية أخرى لحسن تعاملك وأنصح كل شخص بالتعامل معك. عمله متقن وممتاز وأشكرك.',
            role: 'صاحب مشروع - مستقل',
            date: 'منذ شهر'
          },
          abo_m: {
            text: 'شكرا لكم على جهودكم',
            role: 'عميل - خمسات',
            date: 'منذ 27 يوم'
          },
          royal_eagles: {
            text: 'خدمة راقية وشخص محترم جدااااا',
            role: 'عميل - خمسات',
            date: 'منذ شهر'
          },
          nouf_a: {
            text: "اشكر المهندس على امانته وشغله وسرعه الاستجابه. بكون معاه في كل شغلي القادم بإذن الله",
            role: 'عميلة - خمسات',
            date: 'منذ شهر'
          },
          ahmed_a: {
            text: 'تجربة ممتازة مع المهندس بلال احترافي في التعامل ومتعاون ويستجيب للتغييرات بكل مرونة. أنجز العمل بجودة عالية والتواصل كان سلس طوال فترة التنفيذ',
            role: 'عميل - خمسات',
            date: 'منذ شهرين'
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
          alexandria: 'الإسكندرية، مصر'
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
        skills: 'مهاراتي',
        services: 'خدماتي',
        testimonials: 'قالوا عني',
        contact: 'تواصل معي',
        download_cv: 'تحميل السيرة الذاتية'
      },
      footer: {
        about_title: 'بلال ناجي',
        about_text: 'مطور ويب متكامل (Full Stack) شغوف ببناء تطبيقات ويب متكاملة، عالية الأداء، وتحويل الأفكار المعقدة إلى تجارب مستخدم أنيقة وسلسة.',
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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
