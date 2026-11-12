"use client";
import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { m, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';
import { revealDelay } from '../lib/motion';
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
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

// Only needed once a card is opened, so it stays out of the first load.
const ProjectModal = dynamic(() => import('./ProjectModal'), { ssr: false });
import { brandColor } from '../lib/brand-colors';
import { coverMeta } from '../lib/cover-meta';
import { CASE_STUDIES, CASE_STUDY_SLUGS } from '../lib/case-studies';
import { asArray } from '../lib/as-array';
import ProjectKindLabel from './ProjectKindLabel';

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

/**
 * The featured run is editorial, not chronological: the two projects that
 * should be read first, then the strongest work that is actually running in
 * production. The home page shows the first four of these, so the order here
 * decides what most visitors ever see. Anything featured but unlisted sorts
 * to the end rather than jumping to the front.
 */
const FEATURED_ORDER = [
  'indstrz',
  'oxgym',
  'medicta',
  'bilqalam',
  'injaz',
  'opptmakers',
  'toyo228',
  'uduipa',
  'profleet',
  'motors',
];

/**
 * The order of the full archive grid, which is editorial too and differs from
 * the registry order (that one drives previous/next between case studies).
 * A project missing from this list sorts to the end, so a new registry entry
 * shows up without touching this file.
 */
const ARCHIVE_ORDER = [
  'opptmakers', 'opptmakers-platforms', 'bilqalam', 'medicta', 'toyo228',
  'injaz', 'hcholding', 'mada', 'mutlq', 'indstrz', 'sonomedix', 'kmbc',
  'rabzan', 'manqla', 'sems', 'nextstop', 'quotemate', 'dmagni', 'cme',
  'dpms', 'motors', 'uduipa', 'waferlee', 'baserah', 'sf_portal', 'journal',
  'oxgym', 'profleet', 'clinic', 'orca', 'amarna', 'inventory', 'cinemascore',
  'movieweb', 'hms_odoo', 'bookstore', 'library', 'alva_ai',
];

const rankIn = (order) => (slug) => {
  const index = order.indexOf(slug);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
};
const archiveRank = rankIn(ARCHIVE_ORDER);
const byArchiveOrder = (a, b) => archiveRank(a.slug) - archiveRank(b.slug);

const LMS_SUITE_SLUGS = new Set(LMS_SUITE.members.map((member) => member.slug));

const featuredRank = (slug) => {
  const index = FEATURED_ORDER.indexOf(slug);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
};

const byFeaturedOrder = (a, b) => featuredRank(a.slug) - featuredRank(b.slug);

const ProjectCard = ({ project, index, onClick, headingAs: CardHeading = 'h3' }) => {
  const { t } = useTranslation();
  const cover = coverMeta(project.image);

  return (
    // The whole card opens the details, through one real button: the title.
    // Its ::after stretches over the card, so a click anywhere still works,
    // while keyboard and screen-reader users get a named, focusable control
    // (the card used to be a clickable <div> nobody could reach by keyboard).
    <Reveal y={20} delay={revealDelay(index)} long
      className="focus-card group relative glass-card rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-[rgb(var(--primary))]/30 hover:-translate-y-1 flex flex-col h-full bg-[rgb(var(--background))]">
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
        <div aria-hidden="true" className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 bg-[rgb(var(--scrim))]/60 backdrop-blur-[2px]">
          <span className="px-6 py-2 rounded-full bg-[rgb(var(--scrim))]/85 border border-[rgb(var(--on-scrim))]/20 text-[rgb(var(--on-scrim))] text-sm font-semibold tracking-wider flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            {t('projects.view_details')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow text-start">
        <div className="flex justify-between items-start mb-2">
          <CardHeading className="text-xl font-bold text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))] transition-colors line-clamp-1">
            <button
              type="button"
              onClick={() => onClick(project)}
              className="text-start rounded-md after:absolute after:inset-0 after:z-30 after:content-[''] after:rounded-2xl focus-visible:outline-none">
              {project.title}
            </button>
          </CardHeading>
        </div>

        {/* Training, event and learning work is labelled, not passed off as client work. */}
        <ProjectKindLabel kind={project.kind} className="self-start mb-3" />

        <p className="text-[rgb(var(--muted-foreground))] text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Minimal Tech Icons only (No redundant text pills) */}
        <div className="flex flex-wrap gap-3 mt-auto relative z-10 pointer-events-none">
          {project.tags.slice(0, 6).map((tech, i) => (
            <div
              key={i}
              title={tech}
              role="img"
              aria-label={tech}
              className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">
              {getTechIcon(tech)}
            </div>
          ))}
          {project.tags.length > 6 && (
            <span className="text-xs text-[rgb(var(--muted-foreground))] flex items-center font-medium">
              +{project.tags.length - 6}
            </span>
          )}
        </div>
      </div>
    </Reveal>
  );
};

/**
 * Editorial row for the curated default view: oversized index, screenshot,
 * one-line impact and direct routes into the case study. The archive and any
 * filtered view keep the denser card grid.
 */
const FeaturedRow = ({ project, index, onClick, isArabic, headingAs: RowHeading = 'h3', eager = false }) => {
  const { t } = useTranslation();
  const cover = coverMeta(project.image);
  const flip = index % 2 === 1;
  const caseStudyHref = project.caseStudy
    ? `${isArabic ? '/ar' : ''}${project.caseStudy}`
    : null;

  return (
    // The first row of /work is the page's largest paint: it rises in from the
    // first frame instead of waiting, transparent, for the scroll observer.
    <Reveal as="article" y={32} duration={0.55} rise={eager}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
      {/* Screenshot */}
      <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        {/* A pointer shortcut to "View details" below; kept out of the tab
            order and the accessibility tree so each row is not three stops
            and two identical announcements. */}
        <button
          type="button"
          onClick={() => onClick(project)}
          tabIndex={-1}
          aria-hidden="true"
          className="block w-full cursor-pointer">
          <div className="relative rounded-2xl overflow-hidden border border-[rgb(var(--border))]/60 bg-[rgb(var(--scrim))] p-3 sm:p-4 transition-colors duration-300 group-hover:border-[rgb(var(--primary))]/40">
            <Image
              src={project.image}
              alt={project.title}
              width={cover.w}
              height={cover.h}
              sizes="(min-width: 1024px) 640px, 100vw"
              placeholder={cover.blur ? 'blur' : 'empty'}
              blurDataURL={cover.blur}
              // The first row is the LCP element on /work: fetch it with the
              // document instead of waiting for lazy-load to discover it.
              {...(eager && { loading: 'eager', fetchPriority: 'high' })}
              style={{ viewTransitionName: `cover-${project.slug}` }}
              className="w-full h-auto rounded-lg transition-transform duration-500 group-hover:scale-[1.015]"
            />
          </div>
        </button>
      </div>

      {/* Copy */}
      <div className={`lg:col-span-5 text-start ${flip ? 'lg:order-1' : ''}`}>
        {/* The block follows the page direction (start side in Arabic too);
            only the digits themselves are marked left-to-right. */}
        <p className="font-display text-6xl md:text-7xl font-bold text-outline leading-none mb-4 select-none">
          <span dir="ltr">{String(index + 1).padStart(2, '0')}</span>
        </p>
        {project.impact && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[rgb(var(--muted))]/40 text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))] mb-3">
            {project.impact}
          </span>
        )}
        {/* Featured rows are client work today; the label keeps it honest if that changes. */}
        <ProjectKindLabel kind={project.kind} className="mb-3 me-2" />
        <RowHeading className="font-display text-2xl md:text-3xl font-bold text-[rgb(var(--foreground))] mb-3 leading-tight">
          {project.title}
        </RowHeading>
        <p className="text-[rgb(var(--muted-foreground))] leading-relaxed mb-5">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-3 mb-6 text-lg">
          {project.tags.slice(0, 6).map((tech) => (
            <span key={tech} title={tech} role="img" aria-label={tech}>
              {getTechIcon(tech)}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {caseStudyHref && (
            <a
              href={caseStudyHref}
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl font-semibold text-sm bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/30 hover:bg-[rgb(var(--primary))]/20 transition-colors">
              {t('projects.modal.case_study')}
              {/* Every row has these three controls: the project name makes
                  each one distinct in a links list. */}
              <span className="sr-only">: {project.title}</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl font-semibold text-sm border border-[rgb(var(--border-control))] text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors">
              <FaExternalLinkAlt aria-hidden="true" className="text-xs" />
              {t('projects.modal.live_link')}
              <span className="sr-only">: {project.title}</span>
            </a>
          )}
          <button
            type="button"
            onClick={() => onClick(project)}
            className="inline-flex items-center min-h-[44px] px-5 py-2.5 rounded-xl font-semibold text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors">
            {t('projects.view_details')}
            <span className="sr-only">: {project.title}</span>
          </button>
        </div>
      </div>
    </Reveal>
  );
};

// Grid pages render in steps of this size; a sentinel near the bottom of the
// grid loads the next step, so 30+ cards never mount (or decode images) at once.
const GRID_PAGE_SIZE = 12;

/**
 * variant="home": the four flagship editorial rows plus a link into /work —
 * no filters, search or archive. variant="full" (default) is the complete
 * archive experience used on /work.
 */
const Projects = ({ variant = 'full' }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const isHome = variant === 'home';
  const Heading = isHome ? 'h2' : 'h1';
  const itemHeading = isHome ? 'h3' : 'h2';
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showArchive, setShowArchive] = useState(false);
  const [gridLimit, setGridLimit] = useState(GRID_PAGE_SIZE);
  const sentinelRef = useRef(null);
  const resultsRef = useRef(null);
  // Set when the archive toggle opens the full grid, so focus can follow the
  // content instead of staying on a button now 38 cards further down.
  const focusResultsRef = useRef(false);

  // A new filter, search or archive toggle starts the grid from page one again.
  useEffect(() => {
    setGridLimit(GRID_PAGE_SIZE);
  }, [filter, searchTerm, showArchive]);

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

  // Every card is derived from the case-study registry: slug, cover, stack,
  // live URL, category and featured flag are typed once, in
  // src/lib/case-studies.js, and only the wording comes from the locale
  // bundle. The cards used to carry their own copy of those facts, and 12
  // stacks and one live URL had drifted from the registry.
  const projectsData = useMemo(
    () =>
      CASE_STUDY_SLUGS.map((slug) => {
        const { image, stack, liveUrl, github, category, featured, kind } = CASE_STUDIES[slug];
        return {
          slug,
          featured: Boolean(featured),
          title: t(`projects.items.${slug}.title`),
          impact: t(`projects.items.${slug}.impact`, { defaultValue: '' }),
          description: t(`projects.items.${slug}.desc`),
          features: asArray(t(`projects.items.${slug}.features`, { returnObjects: true })),
          image,
          tags: stack,
          // null, not a '#' placeholder, when there is nothing to link to.
          live: liveUrl ?? null,
          github: github ?? null,
          category,
          kind,
          caseStudy: `/case-study/${slug}`,
          ...(LMS_SUITE_SLUGS.has(slug) && { suite: LMS_SUITE }),
        };
      }).sort(byArchiveOrder),
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
  const visibleProjects = isHome
    ? projectsData.filter((project) => project.featured).sort(byFeaturedOrder).slice(0, 4)
    : isDefaultView && !showArchive
      ? filteredProjects.filter((project) => project.featured).sort(byFeaturedOrder)
      : filteredProjects;

  const isGridView = !isHome && !(isDefaultView && !showArchive);
  const gridProjects = isGridView
    ? visibleProjects.slice(0, gridLimit)
    : visibleProjects;
  const hasMoreGrid = isGridView && visibleProjects.length > gridLimit;

  useEffect(() => {
    if (!showArchive || !focusResultsRef.current) return;
    focusResultsRef.current = false;
    resultsRef.current?.querySelector('button')?.focus();
  }, [showArchive]);

  // Load the next grid page when the sentinel scrolls near the viewport.
  // Re-observes after every page load: the re-render can replace the sentinel
  // node, and an observer on a detached node never fires again.
  useEffect(() => {
    // Without an observer the sentinel is still a button that loads the next page.
    if (!hasMoreGrid || !sentinelRef.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridLimit((prev) => prev + GRID_PAGE_SIZE);
        }
      },
      { rootMargin: '600px 0px' },
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMoreGrid, gridLimit]);

  return (
    <section id="projects" className="py-20 relative min-h-screen">
      <div className="container mx-auto px-4 relative z-10">
        {/* On /work this is the top of the page, so it animates from the first
            paint without a fade; on the home page it is a scroll reveal. */}
        <Reveal y={20} duration={0.5} rise={!isHome}
          className="text-center mb-16">
          {/* The page heading on /work; a section heading under the home hero. */}
          <Heading className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            {t(isHome ? 'projects.title' : 'projects.archive_title')}
          </Heading>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg">
            {t('projects.subtitle')}
          </p>
        </Reveal>

        {/* Filter & Search - Premium Segmented Control */}
        {!isHome && (
        <Reveal y={20} duration={0.5} delay={0.2} immediate
          className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between max-w-5xl mx-auto">
          {/* Segmented control — wraps into rows on phones instead of scrolling
              off-screen, so every category stays reachable. */}
          <div
            role="group"
            aria-label={t('a11y.filter_projects')}
            className="flex flex-wrap justify-center gap-1 p-1 bg-[rgb(var(--muted))]/30 backdrop-blur-md rounded-2xl md:rounded-full border border-[rgb(var(--border))]/50 relative w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={filter === category.id}
                onClick={() => setFilter(category.id)}
                className={`relative px-4 sm:px-6 min-h-[44px] rounded-full text-sm font-medium transition-colors z-10 whitespace-nowrap ${
                  filter === category.id
                    ? 'text-[rgb(var(--accent-contrast))]'
                    : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                  }`}>
                {filter === category.id && (
                  <m.div
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
            {/* 16px text: anything smaller makes iOS zoom the page on focus. */}
            <input
              type="search"
              aria-label={t('a11y.search_projects')}
              aria-controls="project-results"
              placeholder={t('projects.search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-72 min-h-[44px] px-5 py-2.5 rounded-full bg-[rgb(var(--background))] border border-[rgb(var(--border-control))] focus:border-[rgb(var(--primary))] focus:ring-1 focus:ring-[rgb(var(--primary))]/50 outline-none transition-all shadow-sm text-base text-[rgb(var(--foreground))]"
            />
          </div>
        </Reveal>
        )}

        {/* Announces what a filter or a search left on screen. */}
        {!isHome && (
          <p className="sr-only" role="status" aria-live="polite">
            {visibleProjects.length === 0
              ? t('projects.no_results')
              : t('a11y.projects_count', { count: visibleProjects.length })}
          </p>
        )}

        {isHome || (isDefaultView && !showArchive) ? (
          /* Curated view: editorial rows, one flagship per row. */
          <div id="project-results" className="space-y-20 lg:space-y-28 max-w-6xl mx-auto">
            {visibleProjects.map((project, index) => (
              <FeaturedRow
                key={project.slug}
                project={project}
                index={index}
                onClick={setSelectedProject}
                isArabic={isArabic}
                headingAs={itemHeading}
                eager={!isHome && index === 0}
              />
            ))}
          </div>
        ) : (
          <>
          <div id="project-results" ref={resultsRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {gridProjects.length > 0 ? (
              gridProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  // Stagger within the freshly loaded page, not the whole list.
                  index={index % GRID_PAGE_SIZE}
                  onClick={setSelectedProject}
                  headingAs={itemHeading}
                />
              ))
            ) : (
              <m.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20 text-[rgb(var(--muted-foreground))]">
                <p className="text-xl">{t('projects.no_results')}</p>
              </m.div>
            )}
          </div>
          {/* Progressive-load sentinel: also a real button, so keyboard and
              find-in-page users are not stuck with only the first page. */}
          {hasMoreGrid && (
            <div ref={sentinelRef} className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setGridLimit((prev) => prev + GRID_PAGE_SIZE)}
                className="min-h-[44px] px-8 py-3 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--muted))]/30 hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors text-sm font-semibold text-[rgb(var(--foreground))]">
                {t('projects.load_more', {
                  count: visibleProjects.length - gridLimit,
                })}
              </button>
            </div>
          )}
          </>
        )}

        {/* Home: one link into the full archive page */}
        {isHome && (
          <div className="mt-16 flex justify-center">
            <a
              href={`${isArabic ? '/ar' : ''}/work`}
              className="inline-flex items-center min-h-[44px] px-8 py-3.5 rounded-full border border-[rgb(var(--border-control))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors text-sm font-semibold text-[rgb(var(--foreground))]">
              {t('projects.view_all', { count: projectsData.length })}
            </a>
          </div>
        )}

        {/* Archive toggle — only meaningful in the curated default view */}
        {!isHome && isDefaultView && (
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            {!showArchive && (
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                {t('projects.featured_note')}
              </p>
            )}
            <button
              type="button"
              aria-expanded={showArchive}
              aria-controls="project-results"
              onClick={() => {
                focusResultsRef.current = !showArchive;
                setShowArchive((prev) => !prev);
              }}
              className="min-h-[44px] px-8 py-3 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--muted))]/30 hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors text-sm font-semibold text-[rgb(var(--foreground))]">
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
