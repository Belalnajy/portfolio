import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaPython,
  FaBootstrap,
  FaDatabase,
  FaFilm
} from 'react-icons/fa';
import {
  SiDjango,
  SiPostgresql,
  SiJquery,
  SiTailwindcss,
  SiOdoo,
  SiNextdotjs,
  SiNestjs,
  SiTypescript,
  SiMongodb,
  SiPrisma,
  SiSocketdotio,
  SiNodedotjs,
  SiExpress
} from 'react-icons/si';
import ProjectSkeleton from './skeletons/ProjectSkeleton';

const getTechIcon = tech => {
  const iconMap = {
    HTML: <FaHtml5 className="text-[#E34F26]" />,
    CSS: <FaCss3Alt className="text-[#1572B6]" />,
    JavaScript: <FaJs className="text-[#F7DF1E]" />,
    React: <FaReact className="text-[#61DAFB]" />,
    Python: <FaPython className="text-[#3776AB]" />,
    Django: <SiDjango className="text-[#092E20]" />,
    PostgreSQL: <SiPostgresql className="text-[#336791]" />,
    jQuery: <SiJquery className="text-[#0769AD]" />,
    Tailwind: <SiTailwindcss className="text-[#06B6D4]" />,
    Bootstrap: <FaBootstrap className="text-[#7952B3]" />,
    "TMDB API": <FaFilm className="text-[#01D277]" />,
    Odoo: <SiOdoo className="text-[#714B67]" />,
    "Next.js": <SiNextdotjs className="text-[#000000]" />,
    NestJS: <SiNestjs className="text-[#E0234E]" />,
    TypeScript: <SiTypescript className="text-[#3178C6]" />,
    MongoDB: <SiMongodb className="text-[#47A248]" />,
    Prisma: <SiPrisma className="text-[#2D3748]" />,
    "Socket.io": <SiSocketdotio className="text-[#010101]" />,
    "Node.js": <SiNodedotjs className="text-[#339933]" />,
    "Express.js": <SiExpress className="text-[#000000]" />,
    TypeORM: <FaDatabase className="text-[#FE0803]" />,
    "Nx Monorepo": <FaCode className="text-[#143055]" />,
    Leaflet: <FaCode className="text-[#199900]" />,
    AI: <FaCode className="text-[#FF6F00]" />,
  };
  return (
    iconMap[tech] || <FaCode className="text-[rgb(var(--muted-foreground))]" />
  );
};

const projects = [
  {
    title: "Scientific Journal Management System",
    description:
      "A full-stack double-blind peer-review system for managing academic journals for a Saudi University. Built with React, NestJS, TypeORM, and PostgreSQL within an Nx Monorepo architecture.",
    image: "/journal.png",
    tags: [
      "React",
      "NestJS",
      "TypeORM",
      "PostgreSQL",
      "TypeScript",
      "Nx Monorepo",
    ],
    features: [
      "Four user roles: Admin, Editor, Reviewer, Researcher with JWT authentication",
      "Double-blind peer-review system",
      "Research submission and automated evaluation scoring",
      "Issue management and online payments integration",
      "PDF preview, QR code generation, and automated acceptance certificates",
      "Advanced permission handling and role-based access control",
    ],
    github: "#",
    live: "https://upafa-edu.net/",
    category: "Full Stack",
  },
  {
    title: "Pro Fleet – Intelligent Fleet Management System",
    description:
      "A multilingual fleet management platform with real-time GPS tracking, analytics, and role-based dashboards for a Saudi startup. Features AI chatbot and interactive maps.",
    image: "/profleet.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Socket.io",
      "PostgreSQL",
      "Leaflet",
    ],
    features: [
      "Real-time GPS tracking with interactive Leaflet maps",
      "AI chatbot for smart user assistance",
      "Multilingual support with RTL for Arabic",
      "Role-based dashboards and analytics",
      "Automated billing and payment processing",
      "Live shipment tracking and fleet operations management",
    ],
    github: "#",
    live: "https://pro-fleet.vercel.app/",
    category: "Full Stack",
  },
  {
    title: "Clinic Management System (ITI Graduation Project)",
    description:
      "A comprehensive clinic management system with smart appointment scheduling, role-based dashboards, and real-time analytics. Features AI chatbot using Hugging Face.",
    image: "/clinic.png",
    tags: ["React", "Django", "PostgreSQL", "Tailwind", "AI"],
    features: [
      "Smart appointment scheduling and reminders",
      "AI chatbot for patient assistance and booking",
      "Role-based dashboards for doctors, staff, and patients",
      "Real-time analytics and reporting",
      "Prescription and billing management",
      "User authentication and role-based access control",
    ],
    github: "#",
    live: "https://clinic-project-2.vercel.app/",
    category: "Full Stack",
  },

  {
    title: "Manqla – Interior Design Web App",
    description:
      "A modern interior design showcase web app built for a Saudi company. Features animations, RTL support, and dynamic sliders for a smooth user experience.",
    image: "/manqla.png",
    tags: ["React", "Tailwind", "TypeScript"],
    features: [
      "Responsive design with RTL (Arabic) support",
      "Animated hero sections and sliders",
      "Interactive components for product exploration",
      "Email contact form integrated with EmailJS",
    ],
    github: "#",
    live: "https://www.manqla.com/",
    category: "Frontend",
  },
  {
    title: "Orca – Premium Clothing Brand E-commerce Website",
    description:
      "A full-featured, modern e-commerce platform for a premium clothing startup. Features product browsing, cart/wishlist management, JWT-secured authentication, and Paymob payment integration.",
    image: "/orca.png",
    tags: ["Next.js", "Tailwind", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Modern responsive UI with dark/light mode",
      "Product catalog with advanced filtering",
      "Cart and wishlist management",
      "JWT-secured authentication and authorization",
      "Paymob payment integration",
      "Smooth animations using Framer Motion",
    ],
    github: "#",
    live: "#",
    category: "Full Stack",
  },
  {
    title: "Amarna Travel – Website Customization",
    description:
      "Enhanced the official website of Amarna Travel (built using TrekkSoft CMS) for a better Arabic user experience and visual consistency.",
    image: "/amarna.png",
    tags: ["CMS", "RTL", "Customization"],
    features: [
      "RTL adjustments for Arabic content",
      "Improved layout and section structure",
      "Cross-platform UI consistency",
    ],
    github: "#",
    live: "https://amarna-travel.trekksoft.com/ar",
    category: "Frontend",
  },
  {
    title: "Inventory Management System",
    description:
      "A role-based inventory system using HTML, CSS, JavaScript, Bootstrap, Django, and PostgreSQL.",
    image: "/inventory.png",
    tags: ["Django", "PostgreSQL", "Bootstrap", "JavaScript"],
    features: [
      "Role-based access control",
      "Real-time stock management",
      "Order processing and shipment tracking",
      "Supplier and customer management",
      "Reporting and analytics",
      "User authentication and role-based access control",
    ],
    github:
      "https://github.com/ChaoticMaximoff/Inventory-Management-System-ITI-Django-Project",
    live: "#",
    category: "Full Stack",
  },
  {
    title: "CinemaScore",
    description:
      "A dynamic web app for movie/TV show lists with TMDB API integration.",
    image: "/cinemascore.png",
    tags: ["React", "Bootstrap", "TMDB API"],
    features: [
      "Movie/TV show browsing",
      "Watchlist functionality",
      "Advanced search capabilities",
      "Language switching support",
    ],
    github: "https://github.com/HamsEldakrory/Movies-App-react-project",
    live: "https://movies-app-react-project-mocha.vercel.app/",
    category: "Frontend",
  },
  {
    title: "Movie Web Application",
    description:
      "A dynamic movie web application using HTML, CSS, JavaScript, jQuery, and Tailwind CSS.",
    image: "/movies.png",
    tags: ["HTML", "CSS", "JavaScript", "jQuery", "Tailwind"],
    features: [
      "Responsive UI for browsing",
      "Interactive features",
      "Real-time updates",
      "Enhanced user experience",
    ],
    github: "https://github.com/Belalnajy/movieswebsiteproject",
    live: "https://movieswebsiteproject.vercel.app/",
    category: "Frontend",
  },
  {
    title: "Hospital Management System",
    description:
      "An HMS module for patients, departments, and doctors using Odoo.",
    image: "/HMS.png",
    tags: ["Odoo", "Python", "PostgreSQL"],
    features: [
      "Patient records management",
      "Department organization",
      "Automated email validation",
      "CRM integration",
    ],
    github: "#",
    live: "#",
    category: "Backend",
  },
  {
    title: "Bookstore Web Application",
    description:
      "A comprehensive bookstore web application with interactive UI.",
    image: "/book.png",
    tags: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"],
    features: [
      "Interactive browsing interface",
      "Client-side validation",
      "Dynamic content updates",
      "Enhanced user experience",
    ],
    github: "https://github.com/Sara-Elagder/Front-end-ITI",
    live: "https://bookstoredeploytest.vercel.app/",
    category: "Frontend",
  },
  {
    title: "Library Management System",
    description:
      "A comprehensive LMS using Django and PostgreSQL for efficient library operations.",
    image: "/library.png",
    tags: ["Django", "PostgreSQL", "Python"],
    features: [
      "Book cataloging system",
      "CRUD operations for books",
      "Category management",
      "Search functionality",
    ],
    github: "https://github.com/Belalnajy/LMSProject",
    live: "#",
    category: "Full Stack",
  },
];

const ProjectCard = ({ project, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = e => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out"
      }}
      className="group relative glass-card glass-hover rounded-xl overflow-hidden shadow-lg transition-all duration-500">
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${project.category ===
          "Frontend"
            ? "bg-blue-500/20 text-blue-400"
            : project.category === "Backend"
              ? "bg-green-500/20 text-green-400"
              : "bg-purple-500/20 text-purple-400"}`}>
          {project.category}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-[1]" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-[rgb(var(--foreground))]">
          {project.title}
        </h3>
        <p className="text-[rgb(var(--muted-foreground))] mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack Icons */}
        <div className="flex flex-wrap gap-3 mb-4">
          {project.tags.map((tech, i) =>
            <motion.div
              key={i}
              whileHover={{ scale: 1.2 }}
              className="group/icon relative">
              <div className="text-xl">
                {getTechIcon(tech)}
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[rgb(var(--background))] text-[rgb(var(--foreground))] text-xs py-1 px-2 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-30">
                {tech}
              </div>
            </motion.div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) =>
            <span
              key={i}
              className="bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] px-3 py-1 rounded-full text-sm">
              {tag}
            </span>
          )}
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {project.features.map((feature, i) =>
            <p
              key={i}
              className="text-[rgb(var(--muted-foreground))] text-sm flex items-start">
              <FaCode className="mr-2 mt-1 text-[rgb(var(--primary))]" />
              {feature}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-[rgb(var(--border))]">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors">
            <FaGithub size={24} />
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors">
            <FaExternalLinkAlt size={22} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'All' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 relative">
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            Featured Projects
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg">
            Here are some of my notable projects that showcase my skills and experience
          </p>
        </motion.div>

        {/* Filter & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between max-w-4xl mx-auto">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map(category => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'glass-card text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]'
                }`}>
                {category}
              </motion.button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 px-4 py-2 rounded-lg glass-card border border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ProjectSkeleton key={index} index={index} />
              ))
            : filteredProjects.length > 0
              ? filteredProjects.map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))
              : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-20">
                    <p className="text-2xl text-[rgb(var(--muted-foreground))]">
                      No projects found matching your criteria
                    </p>
                  </motion.div>
                )}
        </div>
      </div>
    </section>
  );
};
export default Projects;
