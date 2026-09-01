"use client";
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { REVEAL_VIEWPORT, LONG_LIST_VIEWPORT, revealDelay, REVEAL_DURATION } from '../lib/motion';
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
  SiCelery,
  SiRedis,
  SiFramer,
  SiLaravel,
  SiPhp,
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
  FaCar,
  FaGraduationCap,
  FaHospital,
  FaFileExcel,
  FaCertificate,
  FaAndroid,
  FaGooglePlay,
  FaMobileAlt,
  FaQuran,
  FaBug,
} from 'react-icons/fa';
import ProjectSkeleton from './skeletons/ProjectSkeleton';
import ProjectModal from './ProjectModal';
import { useTranslation } from 'react-i18next';
import { brandColor } from '../lib/brand-colors';
import { coverMeta } from '../lib/cover-meta';
import { CASE_STUDY_SLUGS } from '../lib/case-studies';

export const TECH_ICONS = {
  'HTML': FaHtml5,
  'CSS': FaCss3Alt,
  'JavaScript': FaJs,
  'React': FaReact,
  'Python': FaPython,
  'Django': SiDjango,
  'PostgreSQL': SiPostgresql,
  'jQuery': SiJquery,
  'Tailwind': SiTailwindcss,
  'Bootstrap': FaBootstrap,
  'TMDB API': FaFilm,
  'Odoo': SiOdoo,
  'Next.js': SiNextdotjs,
  'NestJS': SiNestjs,
  'TypeScript': SiTypescript,
  'MongoDB': SiMongodb,
  'Prisma': SiPrisma,
  'Socket.io': SiSocketdotio,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'TypeORM': FaDatabase,
  'Nx Monorepo': FaCode,
  'Leaflet': SiOpenlayers,
  'AI': FaCode,
  'Flask': SiFlask,
  'SQLAlchemy': FaDatabase,
  'Cloudinary': SiCloudinary,
  'Turborepo': SiTurborepo,
  'Puppeteer': FaRobot,
  'QRCode': FaQrcode,
  'Recharts': FaChartLine,
  'Knex.js': FaDatabase,
  'OpenAI': SiOpenai,
  'Vite': SiVite,
  'Radix UI': FaCode,
  'Nodemailer': FaEnvelope,
  'FastAPI': SiFastapi,
  'Gemini': FaRobot,
  'Celery': SiCelery,
  'Redis': SiRedis,
  'Framer Motion': SiFramer,
  'MyFatoorah': FaCode,
  'NELC': FaGraduationCap,
  'SCFHS': FaHospital,
  'Multer': FaCode,
  'Excel Processing': FaFileExcel,
  'React Native': FaReact,
  'Android': FaAndroid,
  'Google Play': FaGooglePlay,
  'REST API': FaCode,
  'Bug Fixing': FaBug,
  'UI/UX Redesign': FaMobileAlt,
  'Tajweed': FaQuran,
  'Laravel': SiLaravel,
  'PHP': SiPhp,
};

/**
 * Renders a technology mark in its own brand colour, sourced from
 * src/lib/brand-colors.js. Anything without a known brand colour falls back to
 * --brand-neutral, which follows the palette.
 */
export const getTechIcon = (tech) => {
  const Icon = TECH_ICONS[tech] || FaCode;
  const color = brandColor(tech);
  return color ? (
    <Icon style={{ color }} />
  ) : (
    <Icon className="text-[rgb(var(--brand-neutral))]" />
  );
};

/**
 * One Django LMS engine deployed under several brands — each client gets its own
 * visual identity while sharing accreditation, payments and certification logic.
 * Single source of truth: consumed by ProjectModal and the PlatformSuite section.
 */
export const LMS_SUITE = {
  key: 'lms_suite',
  members: [
    {
      slug: 'injaz',
      name: 'Injaz',
      url: 'https://lms-injaz.com/',
      image: '/injaz.webp',
      accent: 'rgb(var(--accent))',
    },
    {
      slug: 'hcholding',
      name: 'HC Holding',
      url: 'https://lms-hcholding.org/',
      image: '/hcholding.webp',
      accent: 'rgb(var(--success))',
    },
    {
      slug: 'mada',
      name: 'Mada Education',
      url: 'https://mada-education.com/',
      image: '/mada.webp',
      accent: 'rgb(var(--accent-hover))',
    },
  ],
};

const ProjectCard = ({ project, index, onClick }) => {
  const { t } = useTranslation();
  const cover = coverMeta(project.image);
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={LONG_LIST_VIEWPORT}
      transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      className="group relative glass-card rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-[rgb(var(--primary))]/30 flex flex-col h-full bg-[rgb(var(--background))]">
      {/* Sleek Image Container with inner padding */}
      <div className="relative w-full aspect-video bg-[rgb(var(--scrim))] p-4 pb-0 flex items-end justify-center overflow-hidden border-b border-[rgb(var(--border))]/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[rgb(var(--accent))]/10 via-[rgb(var(--scrim))]/0 to-[rgb(var(--scrim))] opacity-50 z-0" />

        <Image
          src={project.image}
          alt={project.title}
          width={cover.w}
          height={cover.h}
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 90vw"
          placeholder={cover.blur ? 'blur' : 'empty'}
          blurDataURL={cover.blur}
          className="relative z-10 w-[90%] h-auto object-contain rounded-t-xl transform group-hover:-translate-y-2 transition-transform duration-500 will-change-transform drop-shadow-[0_-5px_15px_rgba(0,0,0,0.5)]"
        />

        {/* One concrete outcome, so the card says what the project did and
            not only what it was built with. */}
        {project.impact && (
          <span className="absolute top-3 start-3 z-20 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[rgb(var(--scrim))]/80 text-[rgb(var(--on-scrim))] border border-[rgb(var(--on-scrim))]/15 backdrop-blur-sm">
            {project.impact}
          </span>
        )}

        {/* Hover Glass Overlay - Click to View */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[rgb(var(--scrim))]/60 backdrop-blur-[2px]">
          <span className="px-6 py-2 rounded-full glass-card text-[rgb(var(--on-scrim))] text-sm font-semibold tracking-wider flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
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
  const { t } = useTranslation();
  // Content comes from the local i18n bundle, so there is nothing to wait for.
  const [loading] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showArchive, setShowArchive] = useState(false);

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
    { id: 'Mobile', label: t('projects.categories.mobile') },
  ];

  const projectsData = useMemo(
    () => [
      {
        slug: 'bilqalam',
        featured: true,
        title: t('projects.items.bilqalam.title'),
        impact: t('projects.items.bilqalam.impact', { defaultValue: '' }),
        description: t('projects.items.bilqalam.desc'),
        image: '/bilqalam.webp',
        tags: ['Next.js', 'React', 'Laravel', 'PHP', 'Tailwind'],
        features: t('projects.items.bilqalam.features', {
          returnObjects: true,
        }),
        github: '#',
        live: 'https://bilqalaminstitute.net/',
        caseStudy: '/case-study/bilqalam',
        category: 'Full Stack',
      },
      {
        slug: 'medicta',
        featured: true,
        title: t('projects.items.medicta.title'),
        impact: t('projects.items.medicta.impact', { defaultValue: '' }),
        description: t('projects.items.medicta.desc'),
        image: '/medicta.webp',
        tags: [
          'React Native',
          'Android',
          'REST API',
          'UI/UX Redesign',
          'Bug Fixing',
          'Google Play',
        ],
        features: t('projects.items.medicta.features', { returnObjects: true }),
        github: '#',
        live: 'https://play.google.com/store/apps/details?id=com.medicta',
        category: 'Mobile',
      },
      {
        slug: 'toyo228',
        featured: true,
        title: t('projects.items.toyo228.title'),
        impact: t('projects.items.toyo228.impact', { defaultValue: '' }),
        description: t('projects.items.toyo228.desc'),
        image: '/toyo228.webp',
        tags: [
          'Next.js',
          'NestJS',
          'TypeORM',
          'PostgreSQL',
          'TypeScript',
          'Turborepo',
          'Multer',
          'Excel Processing',
        ],
        features: t('projects.items.toyo228.features', { returnObjects: true }),
        github: '#',
        live: 'http://toyo228.com/en',
        category: 'Full Stack',
      },
      {
        slug: 'injaz',
        featured: true,
        title: t('projects.items.injaz.title'),
        impact: t('projects.items.injaz.impact', { defaultValue: '' }),
        description: t('projects.items.injaz.desc'),
        image: '/injaz.webp',
        tags: [
          'Django',
          'PostgreSQL',
          'Python',
          'Celery',
          'Redis',
          'MyFatoorah',
          'NELC',
          'SCFHS',
        ],
        features: t('projects.items.injaz.features', { returnObjects: true }),
        github: '#',
        live: 'https://lms-injaz.com/',
        category: 'Full Stack',
        suite: LMS_SUITE,
      },
      {
        slug: 'hcholding',
        title: t('projects.items.hcholding.title'),
        description: t('projects.items.hcholding.desc'),
        image: '/hcholding.webp',
        tags: [
          'Django',
          'PostgreSQL',
          'Python',
          'Celery',
          'Redis',
          'MyFatoorah',
          'NELC',
          'SCFHS',
        ],
        features: t('projects.items.hcholding.features', { returnObjects: true }),
        github: '#',
        live: 'https://lms-hcholding.org/',
        category: 'Full Stack',
        suite: LMS_SUITE,
      },
      {
        slug: 'mada',
        title: t('projects.items.mada.title'),
        description: t('projects.items.mada.desc'),
        image: '/mada.webp',
        tags: [
          'Django',
          'PostgreSQL',
          'Python',
          'Celery',
          'Redis',
          'MyFatoorah',
          'Tailwind',
        ],
        features: t('projects.items.mada.features', { returnObjects: true }),
        github: '#',
        live: 'https://mada-education.com/',
        category: 'Full Stack',
        suite: LMS_SUITE,
      },
      {
        slug: 'mutlq',
        title: t('projects.items.mutlq.title'),
        description: t('projects.items.mutlq.desc'),
        image: '/mutlq.webp',
        tags: ['Django', 'PostgreSQL', 'Tailwind', 'JavaScript'],
        features: t('projects.items.mutlq.features', { returnObjects: true }),
        github: '#',
        live: 'https://mutlq.org/',
        category: 'Frontend',
      },
      {
        slug: 'indstrz',
        featured: true,
        caseStudy: '/case-study/indstrz',
        title: t('projects.items.indstrz.title'),
        impact: t('projects.items.indstrz.impact', { defaultValue: '' }),
        description: t('projects.items.indstrz.desc'),
        image: '/indstrz.webp',
        tags: [
          'Next.js',
          'React',
          'Flask',
          'PostgreSQL',
          'Socket.io',
          'SQLAlchemy',
          'Cloudinary',
        ],
        features: t('projects.items.indstrz.features', { returnObjects: true }),
        github: '#',
        live: 'https://indstrz.com/en',
        category: 'Full Stack',
      },
      {
        slug: 'sonomedix',
        title: t('projects.items.sonomedix.title'),
        description: t('projects.items.sonomedix.desc'),
        image: '/sonomedix.webp',
        tags: ['React', 'Tailwind', 'Node.js', 'Express.js', 'MongoDB'],
        features: t('projects.items.sonomedix.features', {
          returnObjects: true,
        }),
        github: '#',
        live: 'https://sonomedix.cloud/',
        category: 'Full Stack',
      },
      {
        slug: 'kmbc',
        title: t('projects.items.kmbc.title'),
        description: t('projects.items.kmbc.desc'),
        image: '/kmbc.webp',
        tags: ['Next.js', 'Tailwind', 'Framer Motion', 'React'],
        features: t('projects.items.kmbc.features', { returnObjects: true }),
        github: '#',
        live: 'https://www.kmbc-kw.com/',
        category: 'Frontend',
      },
      {
        slug: 'rabzan',
        title: t('projects.items.rabzan.title'),
        description: t('projects.items.rabzan.desc'),
        image: '/rabzan.webp',
        tags: ['React', 'Tailwind', 'JavaScript'],
        features: t('projects.items.rabzan.features', { returnObjects: true }),
        github: '#',
        live: 'https://www.rabzan.com/',
        category: 'Frontend',
      },
      {
        slug: 'manqla',
        title: t('projects.items.manqla.title'),
        description: t('projects.items.manqla.desc'),
        image: '/manqla.webp',
        tags: ['React', 'Tailwind', 'TypeScript'],
        features: t('projects.items.manqla.features', { returnObjects: true }),
        github: '#',
        live: 'https://www.manqla.com/',
        category: 'Frontend',
      },
      {
        slug: 'sems',
        title: t('projects.items.sems.title'),
        description: t('projects.items.sems.desc'),
        image: '/sems.webp',
        tags: ['Next.js', 'Tailwind', 'React', 'TypeScript'],
        features: t('projects.items.sems.features', { returnObjects: true }),
        github: '#',
        live: 'https://sems-project.vercel.app/',
        category: 'Full Stack',
      },
      {
        slug: 'nextstop',
        title: t('projects.items.nextstop.title'),
        description: t('projects.items.nextstop.desc'),
        image: '/nextstop.webp',
        tags: ['Next.js', 'Tailwind', 'Vercel', 'React'],
        features: t('projects.items.nextstop.features', {
          returnObjects: true,
        }),
        github: '#',
        live: 'https://next-stop-project-nine.vercel.app/',
        category: 'Frontend',
      },
      {
        slug: 'quotemate',
        title: t('projects.items.quotemate.title'),
        description: t('projects.items.quotemate.desc'),
        image: '/quotemate.webp',
        tags: ['Next.js', 'Tailwind', 'AI', 'OpenAI', 'React'],
        features: t('projects.items.quotemate.features', {
          returnObjects: true,
        }),
        github: '#',
        live: 'https://quote-mateapp.vercel.app/',
        category: 'Full Stack',
      },
      {
        slug: 'dmagni',
        title: t('projects.items.dmagni.title'),
        description: t('projects.items.dmagni.desc'),
        image: '/dmagni.webp',
        tags: ['Next.js', 'Tailwind', 'AI', 'React'],
        features: t('projects.items.dmagni.features', { returnObjects: true }),
        github: '#',
        live: 'https://dmagni-project.vercel.app/',
        category: 'Full Stack',
      },
      {
        slug: 'cme',
        title: t('projects.items.cme.title'),
        description: t('projects.items.cme.desc'),
        image: '/cme.webp',
        tags: ['Next.js', 'Tailwind', 'React', 'PostgreSQL'],
        features: t('projects.items.cme.features', { returnObjects: true }),
        github: '#',
        live: 'https://cmehours.online/',
        category: 'Full Stack',
      },
      {
        slug: 'dpms',
        title: t('projects.items.dpms.title'),
        description: t('projects.items.dpms.desc'),
        image: '/dpms.webp',
        tags: ['Next.js', 'Tailwind', 'React', 'PostgreSQL'],
        features: t('projects.items.dpms.features', { returnObjects: true }),
        github: '#',
        live: 'https://dpms-rust.vercel.app/',
        category: 'Full Stack',
      },
      {
        slug: 'motors',
        featured: true,
        title: t('projects.items.motors.title'),
        impact: t('projects.items.motors.impact', { defaultValue: '' }),
        description: t('projects.items.motors.desc'),
        image: '/motors.webp',
        tags: [
          'Next.js',
          'NestJS',
          'TypeORM',
          'PostgreSQL',
          'TypeScript',
          'Multer',
        ],
        features: t('projects.items.motors.features', { returnObjects: true }),
        github: '#',
        live: 'https://motorksa.org/',
        category: 'Full Stack',
      },
      {
        slug: 'uduipa',
        featured: true,
        caseStudy: '/case-study/uduipa',
        title: t('projects.items.uduipa.title'),
        impact: t('projects.items.uduipa.impact', { defaultValue: '' }),
        description: t('projects.items.uduipa.desc'),
        image: '/uduipa.webp',
        tags: [
          'Next.js',
          'NestJS',
          'TypeScript',
          'PostgreSQL',
          'Turborepo',
          'Cloudinary',
          'Puppeteer',
          'Recharts',
        ],
        features: t('projects.items.uduipa.features', { returnObjects: true }),
        github: '#',
        live: 'https://uduipa.com',
        category: 'Full Stack',
      },
      {
        slug: 'waferlee',
        title: t('projects.items.waferlee.title'),
        description: t('projects.items.waferlee.desc'),
        image: '/waferlee.webp',
        tags: [
          'Next.js',
          'NestJS',
          'TypeORM',
          'PostgreSQL',
          'Tailwind',
          'Radix UI',
          'Framer Motion',
        ],
        features: t('projects.items.waferlee.features', {
          returnObjects: true,
        }),
        github: '#',
        live: 'https://waferlee.ae',
        category: 'Full Stack',
      },
      {
        slug: 'baserah',
        title: t('projects.items.baserah.title'),
        description: t('projects.items.baserah.desc'),
        image: '/baserah.webp',
        tags: ['FastAPI', 'Python', 'MongoDB', 'AI', 'Gemini'],
        features: t('projects.items.baserah.features', { returnObjects: true }),
        github: '#',
        live: 'https://baserah.ai/',
        category: 'Full Stack',
      },
      {
        slug: 'sf_portal',
        title: t('projects.items.sf_portal.title'),
        description: t('projects.items.sf_portal.desc'),
        image: '/smartfast.webp',
        tags: [
          'React',
          'TypeScript',
          'Vite',
          'Radix UI',
          'Tailwind',
          'Django',
          'Recharts',
        ],
        features: t('projects.items.sf_portal.features', {
          returnObjects: true,
        }),
        github: '#',
        live: 'https://smart-fast.com/',
        category: 'Full Stack',
      },
      {
        slug: 'journal',
        title: t('projects.items.journal.title'),
        description: t('projects.items.journal.desc'),
        image: '/journal.webp',
        tags: [
          'React',
          'NestJS',
          'TypeORM',
          'PostgreSQL',
          'TypeScript',
          'Nx Monorepo',
        ],
        features: t('projects.items.journal.features', { returnObjects: true }),
        github: '#',
        live: 'https://upafa-edu.net/',
        category: 'Full Stack',
      },
      {
        slug: 'profleet',
        featured: true,
        caseStudy: '/case-study/profleet',
        title: t('projects.items.profleet.title'),
        impact: t('projects.items.profleet.impact', { defaultValue: '' }),
        description: t('projects.items.profleet.desc'),
        image: '/profleet.webp',
        tags: [
          'Next.js',
          'TypeScript',
          'Prisma',
          'Socket.io',
          'PostgreSQL',
          'Leaflet',
        ],
        features: t('projects.items.profleet.features', {
          returnObjects: true,
        }),
        github: '#',
        live: 'https://pro-fleet.vercel.app/',
        category: 'Full Stack',
      },
      {
        slug: 'clinic',
        title: t('projects.items.clinic.title'),
        description: t('projects.items.clinic.desc'),
        image: '/clinic.webp',
        tags: ['React', 'Django', 'PostgreSQL', 'Tailwind', 'AI'],
        features: t('projects.items.clinic.features', { returnObjects: true }),
        github: '#',
        live: 'https://clinic-project-2.vercel.app/',
        category: 'Full Stack',
      },

      {
        slug: 'orca',
        title: t('projects.items.orca.title'),
        description: t('projects.items.orca.desc'),
        image: '/orca.webp',
        tags: ['Next.js', 'Tailwind', 'Node.js', 'Express.js', 'MongoDB'],
        features: t('projects.items.orca.features', { returnObjects: true }),
        github: '#',
        live: 'https://orcastore.vercel.app/',
        category: 'Full Stack',
      },
      {
        slug: 'amarna',
        title: t('projects.items.amarna.title'),
        description: t('projects.items.amarna.desc'),
        image: '/amarna.webp',
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
        image: '/inventory.webp',
        tags: ['Django', 'PostgreSQL', 'Bootstrap', 'JavaScript'],
        features: t('projects.items.inventory.features', {
          returnObjects: true,
        }),
        github:
          'https://github.com/ChaoticMaximoff/Inventory-Management-System-ITI-Django-Project',
        live: '#',
        category: 'Full Stack',
      },
      {
        slug: 'cinemascore',
        title: t('projects.items.cinemascore.title'),
        description: t('projects.items.cinemascore.desc'),
        image: '/cinemascore.webp',
        tags: ['React', 'Bootstrap', 'TMDB API'],
        features: t('projects.items.cinemascore.features', {
          returnObjects: true,
        }),
        github: 'https://github.com/HamsEldakrory/Movies-App-react-project',
        live: 'https://movies-app-react-project-mocha.vercel.app/',
        category: 'Frontend',
      },
      {
        slug: 'movieweb',
        title: t('projects.items.movieweb.title'),
        description: t('projects.items.movieweb.desc'),
        image: '/movies.webp',
        tags: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Tailwind'],
        features: t('projects.items.movieweb.features', {
          returnObjects: true,
        }),
        github: 'https://github.com/Belalnajy/movieswebsiteproject',
        live: 'https://movieswebsiteproject.vercel.app/',
        category: 'Frontend',
      },
      {
        slug: 'hms_odoo',
        title: t('projects.items.hms_odoo.title'),
        description: t('projects.items.hms_odoo.desc'),
        image: '/HMS.webp',
        tags: ['Odoo', 'Python', 'PostgreSQL'],
        features: t('projects.items.hms_odoo.features', {
          returnObjects: true,
        }),
        github: '#',
        live: '#',
        category: 'Backend',
      },
      {
        slug: 'bookstore',
        title: t('projects.items.bookstore.title'),
        description: t('projects.items.bookstore.desc'),
        image: '/book.webp',
        tags: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap'],
        features: t('projects.items.bookstore.features', {
          returnObjects: true,
        }),
        github: 'https://github.com/Sara-Elagder/Front-end-ITI',
        live: 'https://bookstoredeploytest.vercel.app/',
        category: 'Frontend',
      },
      {
        slug: 'library',
        title: t('projects.items.library.title'),
        description: t('projects.items.library.desc'),
        image: '/library.webp',
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
        image: '/alva.webp',
        tags: [
          'React',
          'Node.js',
          'Express.js',
          'Knex.js',
          'OpenAI',
          'Tailwind',
          'Vite',
        ],
        features: t('projects.items.alva_ai.features', { returnObjects: true }),
        github: '#',
        live: '#',
        category: 'Full Stack',
      },
    ].map((project) => ({
      ...project,
      // Every project in the case-study registry gets its long-form page,
      // driven by the same source that builds the routes and the sitemap.
      caseStudy: CASE_STUDY_SLUGS.includes(project.slug)
        ? `/case-study/${project.slug}`
        : project.caseStudy,
    })),
    [t],
  );

  const filteredProjects = projectsData.filter((project) => {
    const matchesFilter = filter === 'All' || project.category === filter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // The default view curates the strongest work; filtering or searching always
  // looks through the complete archive so nothing becomes unreachable.
  const isDefaultView = filter === 'All' && searchTerm.trim() === '';
  const visibleProjects =
    isDefaultView && !showArchive
      ? filteredProjects.filter((project) => project.featured)
      : filteredProjects;

  return (
    <section id="projects" className="py-20 relative min-h-screen">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
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
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between max-w-5xl mx-auto">
          {/* Segmented control — wraps into rows on phones instead of scrolling
              off-screen, so every category stays reachable. */}
          <div className="flex flex-wrap justify-center gap-1 p-1 bg-[rgb(var(--muted))]/30 backdrop-blur-md rounded-2xl md:rounded-full border border-[rgb(var(--border))]/50 relative w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`relative px-4 sm:px-6 min-h-[44px] rounded-full text-sm font-medium transition-colors z-10 whitespace-nowrap ${
                  filter === category.id
                    ? 'text-[rgb(var(--on-scrim))]'
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
          ) : visibleProjects.length > 0 ? (
            visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
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
              <p className="text-xl">{t('projects.no_results')}</p>
            </motion.div>
          )}
        </div>

        {/* Archive toggle — only meaningful in the curated default view */}
        {isDefaultView && (
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            {!showArchive && (
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                {t('projects.featured_note')}
              </p>
            )}
            <button
              onClick={() => setShowArchive((prev) => !prev)}
              className="px-8 py-3 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--muted))]/30 hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors text-sm font-semibold text-[rgb(var(--foreground))]">
              {showArchive
                ? t('projects.show_featured')
                : t('projects.show_all', { count: projectsData.length })}
            </button>
          </div>
        )}
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
