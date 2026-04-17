import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  SiExpress,
  SiFlask,
  SiCloudinary,
  SiTurborepo,
  SiOpenai,
  SiVite,
  SiFastapi,
  SiOpenlayers,
} from 'react-icons/si';
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
  FaFilm,
  FaQrcode,
  FaEnvelope,
  FaChartLine,
  FaRobot,
} from 'react-icons/fa';
import ProjectSkeleton from './skeletons/ProjectSkeleton';
import ProjectModal from './ProjectModal';
import { useTranslation } from 'react-i18next';

export const getTechIcon = (tech) => {
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
    Odoo: <SiOdoo className="text-[#714B67]" />,
    'Next.js': <SiNextdotjs className="text-[#000000]" />,
    NestJS: <SiNestjs className="text-[#E0234E]" />,
    TypeScript: <SiTypescript className="text-[#3178C6]" />,
    MongoDB: <SiMongodb className="text-[#47A248]" />,
    Prisma: <SiPrisma className="text-[#2D3748]" />,
    'Socket.io': <SiSocketdotio className="text-[#010101]" />,
    'Node.js': <SiNodedotjs className="text-[#339933]" />,
    'Express.js': <SiExpress className="text-[#000000]" />,
    TypeORM: <FaDatabase className="text-[#FE0803]" />,
    'Nx Monorepo': <FaCode className="text-[#143055]" />,
    Leaflet: <SiOpenlayers className="text-[#199900]" />,
    AI: <FaCode className="text-[#FF6F00]" />,
    Flask: <SiFlask className="text-[#000000]" />,
    SQLAlchemy: <FaDatabase className="text-[#D71F00]" />,
    Cloudinary: <SiCloudinary className="text-[#3448C5]" />,
    Turborepo: <SiTurborepo className="text-[#EF4444]" />,
    Puppeteer: <FaRobot className="text-[#40B5A2]" />,
    QRCode: <FaQrcode className="text-[#000000]" />,
    Recharts: <FaChartLine className="text-[#22B5BF]" />,
    'Knex.js': <FaDatabase className="text-[#E16426]" />,
    OpenAI: <SiOpenai className="text-[#412991]" />,
    Vite: <SiVite className="text-[#646CFF]" />,
    'Radix UI': <FaCode className="text-[#161616]" />,
    Nodemailer: <FaEnvelope className="text-[#339933]" />,
    FastAPI: <SiFastapi className="text-[#05998B]" />,
    Gemini: <FaRobot className="text-[#4285F4]" />,
  };
  return (
    iconMap[tech] || <FaCode className="text-[rgb(var(--muted-foreground))]" />
  );
};

const ProjectCard = ({ project, index, onClick }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
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
      layoutId={`project-card-${project.slug}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      className="group relative glass-card rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-[rgb(var(--primary))]/30 flex flex-col h-full bg-[rgb(var(--background))]">
      {/* Sleek Image Container with inner padding */}
      <div className="relative w-full aspect-video bg-[#0B0F19] p-4 pb-0 flex items-end justify-center overflow-hidden border-b border-[rgb(var(--border))]/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0B0F19]/0 to-[#0B0F19] opacity-50 z-0" />

        <img
          src={project.image}
          alt={project.title}
          className="relative z-10 w-[90%] h-auto object-contain rounded-t-xl transform group-hover:-translate-y-2 transition-transform duration-500 will-change-transform drop-shadow-[0_-5px_15px_rgba(0,0,0,0.5)]"
          loading="lazy"
        />

        {/* Hover Glass Overlay - Click to View */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
          <span className="px-6 py-2 rounded-full glass-card text-white text-sm font-semibold tracking-wider flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            {t('projects.view_details')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow text-start">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))] transition-colors line-clamp-1">
            {project.title}
          </h3>
        </div>

        <p className="text-[rgb(var(--muted-foreground))] text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Minimal Tech Icons only (No redundant text pills) */}
        <div className="flex flex-wrap gap-3 mt-auto relative z-10 pointer-events-none">
          {project.tags.slice(0, 6).map((tech, i) => (
            <div
              key={i}
              title={tech}
              className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">
              {getTechIcon(tech)}
            </div>
          ))}
          {project.tags.length > 6 && (
            <span className="text-xs text-[rgb(var(--muted-foreground))] flex items-center opacity-70 font-medium">
              +{project.tags.length - 6}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  const categories = [
    { id: 'All', label: t('projects.categories.all') },
    { id: 'Full Stack', label: t('projects.categories.fullstack') },
    { id: 'Frontend', label: t('projects.categories.frontend') },
    { id: 'Backend', label: t('projects.categories.backend') },
  ];

  const projectsData = useMemo(() => [
    {
      slug: 'indstrz',
      title: t('projects.items.indstrz.title'),
      description: t('projects.items.indstrz.desc'),
      image: '/indstrz.png',
      tags: ['Next.js', 'React', 'Flask', 'PostgreSQL', 'Socket.io', 'SQLAlchemy', 'Cloudinary'],
      features: t('projects.items.indstrz.features', { returnObjects: true }),
      github: '#',
      live: '#',
      category: 'Full Stack',
    },
    {
      slug: 'uduipa',
      title: t('projects.items.uduipa.title'),
      description: t('projects.items.uduipa.desc'),
      image: '/uduipa.png',
      tags: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Turborepo', 'Cloudinary', 'Puppeteer', 'Recharts'],
      features: t('projects.items.uduipa.features', { returnObjects: true }),
      github: '#',
      live: 'https://uduipa.com',
      category: 'Full Stack',
    },
    {
      slug: 'waferlee',
      title: t('projects.items.waferlee.title'),
      description: t('projects.items.waferlee.desc'),
      image: '/waferlee.png',
      tags: ['Next.js', 'NestJS', 'TypeORM', 'PostgreSQL', 'Tailwind', 'Radix UI', 'Framer Motion'],
      features: t('projects.items.waferlee.features', { returnObjects: true }),
      github: '#',
      live: 'https://waferlee.ae',
      category: 'Full Stack',
    },
    {
      slug: 'baserah',
      title: t('projects.items.baserah.title'),
      description: t('projects.items.baserah.desc'),
      image: '/baserah.png',
      tags: ['FastAPI', 'Python', 'MongoDB', 'AI', 'Gemini'],
      features: t('projects.items.baserah.features', { returnObjects: true }),
      github: '#',
      live: '#',
      category: 'Full Stack',
    },
    {
      slug: 'sf_portal',
      title: t('projects.items.sf_portal.title'),
      description: t('projects.items.sf_portal.desc'),
      image: '/smartfast.png',
      tags: ['React', 'TypeScript', 'Vite', 'Radix UI', 'Tailwind', 'Django', 'Recharts'],
      features: t('projects.items.sf_portal.features', { returnObjects: true }),
      github: '#',
      live: '#',
      category: 'Full Stack',
    },
    {
      slug: 'journal',
      title: t('projects.items.journal.title'),
      description: t('projects.items.journal.desc'),
      image: '/journal.png',
      tags: ['React', 'NestJS', 'TypeORM', 'PostgreSQL', 'TypeScript', 'Nx Monorepo'],
      features: t('projects.items.journal.features', { returnObjects: true }),
      github: '#',
      live: 'https://upafa-edu.net/',
      category: 'Full Stack',
    },
    {
      slug: 'profleet',
      title: t('projects.items.profleet.title'),
      description: t('projects.items.profleet.desc'),
      image: '/profleet.png',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io', 'PostgreSQL', 'Leaflet'],
      features: t('projects.items.profleet.features', { returnObjects: true }),
      github: '#',
      live: 'https://pro-fleet.vercel.app/',
      category: 'Full Stack',
    },
    {
      slug: 'clinic',
      title: t('projects.items.clinic.title'),
      description: t('projects.items.clinic.desc'),
      image: '/clinic.png',
      tags: ['React', 'Django', 'PostgreSQL', 'Tailwind', 'AI'],
      features: t('projects.items.clinic.features', { returnObjects: true }),
      github: '#',
      live: 'https://clinic-project-2.vercel.app/',
      category: 'Full Stack',
    },
    {
      slug: 'manqla',
      title: t('projects.items.manqla.title'),
      description: t('projects.items.manqla.desc'),
      image: '/manqla.png',
      tags: ['React', 'Tailwind', 'TypeScript'],
      features: t('projects.items.manqla.features', { returnObjects: true }),
      github: '#',
      live: 'https://www.manqla.com/',
      category: 'Frontend',
    },
    {
      slug: 'orca',
      title: t('projects.items.orca.title'),
      description: t('projects.items.orca.desc'),
      image: '/orca.png',
      tags: ['Next.js', 'Tailwind', 'Node.js', 'Express.js', 'MongoDB'],
      features: t('projects.items.orca.features', { returnObjects: true }),
      github: '#',
      live: '#',
      category: 'Full Stack',
    },
    {
      slug: 'amarna',
      title: t('projects.items.amarna.title'),
      description: t('projects.items.amarna.desc'),
      image: '/amarna.png',
      tags: ['CMS', 'RTL', 'Customization'],
      features: t('projects.items.amarna.features', { returnObjects: true }),
      github: '#',
      live: 'https://amarna-travel.trekksoft.com/ar',
      category: 'Frontend',
    },
    {
      slug: 'inventory',
      title: t('projects.items.inventory.title'),
      description: t('projects.items.inventory.desc'),
      image: '/inventory.png',
      tags: ['Django', 'PostgreSQL', 'Bootstrap', 'JavaScript'],
      features: t('projects.items.inventory.features', { returnObjects: true }),
      github: 'https://github.com/ChaoticMaximoff/Inventory-Management-System-ITI-Django-Project',
      live: '#',
      category: 'Full Stack',
    },
    {
      slug: 'cinemascore',
      title: t('projects.items.cinemascore.title'),
      description: t('projects.items.cinemascore.desc'),
      image: '/cinemascore.png',
      tags: ['React', 'Bootstrap', 'TMDB API'],
      features: t('projects.items.cinemascore.features', { returnObjects: true }),
      github: 'https://github.com/HamsEldakrory/Movies-App-react-project',
      live: 'https://movies-app-react-project-mocha.vercel.app/',
      category: 'Frontend',
    },
    {
      slug: 'movieweb',
      title: t('projects.items.movieweb.title'),
      description: t('projects.items.movieweb.desc'),
      image: '/movies.png',
      tags: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Tailwind'],
      features: t('projects.items.movieweb.features', { returnObjects: true }),
      github: 'https://github.com/Belalnajy/movieswebsiteproject',
      live: 'https://movieswebsiteproject.vercel.app/',
      category: 'Frontend',
    },
    {
      slug: 'hms_odoo',
      title: t('projects.items.hms_odoo.title'),
      description: t('projects.items.hms_odoo.desc'),
      image: '/HMS.png',
      tags: ['Odoo', 'Python', 'PostgreSQL'],
      features: t('projects.items.hms_odoo.features', { returnObjects: true }),
      github: '#',
      live: '#',
      category: 'Backend',
    },
    {
      slug: 'bookstore',
      title: t('projects.items.bookstore.title'),
      description: t('projects.items.bookstore.desc'),
      image: '/book.png',
      tags: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap'],
      features: t('projects.items.bookstore.features', { returnObjects: true }),
      github: 'https://github.com/Sara-Elagder/Front-end-ITI',
      live: 'https://bookstoredeploytest.vercel.app/',
      category: 'Frontend',
    },
    {
      slug: 'library',
      title: t('projects.items.library.title'),
      description: t('projects.items.library.desc'),
      image: '/library.png',
      tags: ['Django', 'PostgreSQL', 'Python'],
      features: t('projects.items.library.features', { returnObjects: true }),
      github: 'https://github.com/Belalnajy/LMSProject',
      live: '#',
      category: 'Full Stack',
    },
    {
      slug: 'alva_ai',
      title: t('projects.items.alva_ai.title'),
      description: t('projects.items.alva_ai.desc'),
      image: '/alva.png',
      tags: ['React', 'Node.js', 'Express.js', 'Knex.js', 'OpenAI', 'Tailwind', 'Vite'],
      features: t('projects.items.alva_ai.features', { returnObjects: true }),
      github: '#',
      live: '#',
      category: 'Full Stack',
    },
  ], [t]);

  const filteredProjects = projectsData.filter((project) => {
    const matchesFilter = filter === 'All' || project.category === filter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 relative min-h-screen">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            {t('projects.title')}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Filter & Search - Premium Segmented Control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between max-w-5xl mx-auto">
          {/* iOS-Style Segmented Control */}
          <div className="flex p-1 bg-[rgb(var(--muted))]/30 backdrop-blur-md rounded-full border border-[rgb(var(--border))]/50 relative overflow-x-auto w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors z-10 whitespace-nowrap ${
                  filter === category.id
                    ? 'text-white'
                    : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                }`}>
                {filter === category.id && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-[rgb(var(--primary))] shadow-lg rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-auto shrink-0">
            <input
              type="text"
              placeholder={t('projects.search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-72 px-5 py-2.5 rounded-full bg-[rgb(var(--background))] border border-[rgb(var(--border))] focus:border-[rgb(var(--primary))] focus:ring-1 focus:ring-[rgb(var(--primary))]/50 outline-none transition-all shadow-sm text-sm text-[rgb(var(--foreground))]"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <ProjectSkeleton key={index} index={index} />
            ))
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                onClick={setSelectedProject}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-20 text-[rgb(var(--muted-foreground))]">
              <p className="text-xl">
                {t('projects.no_results')}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
export default Projects;
