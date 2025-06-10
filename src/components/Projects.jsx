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
  SiOdoo
} from 'react-icons/si';

const getTechIcon = (tech) => {
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
    'TMDB API': <FaFilm className="text-[#01D277]" />,
    Odoo: <SiOdoo className="text-[#714B67]" />
  };
  return (
    iconMap[tech] || <FaCode className="text-[rgb(var(--muted-foreground))]" />
  );
};

const projects = [
  {
    title: 'Clinic Management System (ITI Graduation Project)',
    description:
      'A comprehensive clinic management system using Django and PostgreSQL.',
    image: '/clinic.png',
    tags: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Django',
      'PostgreSQL',
      'Tailwind'
    ],
    features: [
      'Patient registration and management',
      'Appointment scheduling and reminders',
      'Doctor and staff management',
      'Prescription management',
      'Billing and invoicing',
      'Reporting and analytics',
      'User authentication and role-based access control'
    ],
    github: '#',
    live: 'https://clinic-project-2.vercel.app/',
    category: 'Full Stack'
  },

  {
    title: 'Manqla – Interior Design Web App',
    description:
      'A modern interior design showcase web app built for a Saudi company. Features animations, RTL support, and dynamic sliders for a smooth user experience.',
    image: '/manqla.png',
    tags: ['React', 'Tailwind', 'TypeScript'],
    features: [
      'Responsive design with RTL (Arabic) support',
      'Animated hero sections and sliders',
      'Interactive components for product exploration',
      'Email contact form integrated with EmailJS'
    ],
    github: '#',
    live: 'https://www.manqla.com/',
    category: 'Frontend'
  },
  {
    title: 'Premium Clothing Brand E-commerce Website',
    description:
      'A full-stack e-commerce solution for a clothing startup with product browsing, cart/wishlist management, and secure Paymob payment integration.',
    image: '/orca.png',
    tags: ['Next.js', 'Tailwind', 'React', 'Django', 'SQLite', 'JWT'],
    features: [
      'Modern responsive UI with light/dark mode',
      'Product catalog, wishlist, and cart',
      'Paymob payment integration',
      'JWT-secured RESTful APIs',
      'Order processing and user authentication'
    ],
    github: '#',
    live: '#',
    category: 'Full Stack'
  },
  {
    title: 'Amarna Travel – Website Customization',
    description:
      'Enhanced the official website of Amarna Travel (built using TrekkSoft CMS) for a better Arabic user experience and visual consistency.',
    image: '/amarna.png',
    tags: ['CMS', 'RTL', 'Customization'],
    features: [
      'RTL adjustments for Arabic content',
      'Improved layout and section structure',
      'Cross-platform UI consistency'
    ],
    github: '#',
    live: 'https://amarna-travel.trekksoft.com/ar',
    category: 'Frontend'
  },
  {
    title: 'Inventory Management System',
    description:
      'A role-based inventory system using HTML, CSS, JavaScript, Bootstrap, Django, and PostgreSQL.',
    image: '/inventory.png',
    tags: ['Django', 'PostgreSQL', 'Bootstrap', 'JavaScript'],
    features: [
      'Role-based access control',
      'Real-time stock management',
      'Order processing and shipment tracking',
      'Supplier and customer management',
      'Reporting and analytics',
      'User authentication and role-based access control'
    ],
    github:
      'https://github.com/ChaoticMaximoff/Inventory-Management-System-ITI-Django-Project',
    live: '#',
    category: 'Full Stack'
  },
  {
    title: 'CinemaScore',
    description:
      'A dynamic web app for movie/TV show lists with TMDB API integration.',
    image: '/cinemascore.png',
    tags: ['React', 'Bootstrap', 'TMDB API'],
    features: [
      'Movie/TV show browsing',
      'Watchlist functionality',
      'Advanced search capabilities',
      'Language switching support'
    ],
    github: 'https://github.com/HamsEldakrory/Movies-App-react-project',
    live: 'https://movies-app-react-project-mocha.vercel.app/',
    category: 'Frontend'
  },
  {
    title: 'Movie Web Application',
    description:
      'A dynamic movie web application using HTML, CSS, JavaScript, jQuery, and Tailwind CSS.',
    image: '/movies.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Tailwind'],
    features: [
      'Responsive UI for browsing',
      'Interactive features',
      'Real-time updates',
      'Enhanced user experience'
    ],
    github: 'https://github.com/Belalnajy/movieswebsiteproject',
    live: 'https://movieswebsiteproject.vercel.app/',
    category: 'Frontend'
  },
  {
    title: 'Hospital Management System',
    description:
      'An HMS module for patients, departments, and doctors using Odoo.',
    image: '/HMS.png',
    tags: ['Odoo', 'Python', 'PostgreSQL'],
    features: [
      'Patient records management',
      'Department organization',
      'Automated email validation',
      'CRM integration'
    ],
    github: '#',
    live: '#',
    category: 'Backend'
  },
  {
    title: 'Bookstore Web Application',
    description:
      'A comprehensive bookstore web application with interactive UI.',
    image: '/book.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap'],
    features: [
      'Interactive browsing interface',
      'Client-side validation',
      'Dynamic content updates',
      'Enhanced user experience'
    ],
    github: 'https://github.com/Sara-Elagder/Front-end-ITI',
    live: 'https://bookstoredeploytest.vercel.app/',
    category: 'Frontend'
  },
  {
    title: 'Library Management System',
    description:
      'A comprehensive LMS using Django and PostgreSQL for efficient library operations.',
    image: '/library.png',
    tags: ['Django', 'PostgreSQL', 'Python'],
    features: [
      'Book cataloging system',
      'CRUD operations for books',
      'Category management',
      'Search functionality'
    ],
    github: 'https://github.com/Belalnajy/LMSProject',
    live: '#',
    category: 'Full Stack'
  }
];

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group relative bg-[rgb(var(--card))] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.category === 'Frontend'
              ? 'bg-blue-500/20 text-blue-400'
              : project.category === 'Backend'
              ? 'bg-green-500/20 text-green-400'
              : 'bg-purple-500/20 text-purple-400'
          }`}>
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
          {project.tags.map((tech, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.2 }}
              className="group/icon relative">
              <div className="text-xl">{getTechIcon(tech)}</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[rgb(var(--background))] text-[rgb(var(--foreground))] text-xs py-1 px-2 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-30">
                {tech}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] px-3 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {project.features.map((feature, i) => (
            <p
              key={i}
              className="text-[rgb(var(--muted-foreground))] text-sm flex items-start">
              <FaCode className="mr-2 mt-1 text-[rgb(var(--primary))]" />
              {feature}
            </p>
          ))}
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
  return (
    <section id="projects" className="py-20 bg-[rgb(var(--background))]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            Here are some of my notable projects that showcase my skills and
            experience in software development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
