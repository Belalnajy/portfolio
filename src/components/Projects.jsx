"use client";
import { useState, useEffect, useMemo, useRef } from 'react';
import { m } from 'framer-motion';
import { track } from '@vercel/analytics';
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
  SiDocker,
  SiFirebase,
  SiVercel,
  SiRedux,
  SiReactquery,
  SiNx,
  SiRadixui,
  SiApple,
  SiAppstore,
  SiPwa,
  SiCodemagic,
  SiLeaflet,
  SiPuppeteer,
  SiTypeorm,
  SiKnexdotjs,
  SiGooglegemini,
} from 'react-icons/si';
import {
  FaGithub,
  FaExternalLinkAlt,
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
  FaPlug,
  FaUpload,
  FaCreditCard,
  FaLanguage,
  FaSearch,
  FaBell,
  FaCogs,
  FaSlidersH,
  FaCubes,
  FaApple,
  FaArrowRight,
  FaArrowLeft,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

// Only needed once a card is opened, so it stays out of the first load.
const ProjectModal = dynamic(() => import('./ProjectModal'), { ssr: false });
import { brandColor } from '../lib/brand-colors';
import { CASE_STUDIES, CASE_STUDY_SLUGS, INDUSTRIES } from '../lib/case-studies';
import DeviceFrame, { frameKind, hostOf } from './DeviceFrame';
import { asArray } from '../lib/as-array';
import ProjectKindLabel from './ProjectKindLabel';
import SectionHeading from './SectionHeading';

// Every technology in the registry has a mark here: a brand icon where one
// exists, otherwise a plain glyph for what it is (an upload, a payment, a
// language). Anything missing renders as a neutral text chip (see
// getTechIcon), never as a generic </> icon that says nothing.
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
  'TypeORM': SiTypeorm,
  'Nx Monorepo': SiNx,
  'Leaflet': SiLeaflet,
  'AI': FaRobot,
  'Flask': SiFlask,
  // SQLAlchemy has a mark, but at icon size it is an unreadable smudge; it
  // shows as a text chip instead.
  'Cloudinary': SiCloudinary,
  'Turborepo': SiTurborepo,
  'Puppeteer': SiPuppeteer,
  'QRCode': FaQrcode,
  'Recharts': FaChartLine,
  'Knex.js': SiKnexdotjs,
  'OpenAI': SiOpenai,
  'Vite': SiVite,
  'Radix UI': SiRadixui,
  'Nodemailer': FaEnvelope,
  'FastAPI': SiFastapi,
  'Gemini': SiGooglegemini,
  'Celery': SiCelery,
  'Redis': SiRedis,
  'Framer Motion': SiFramer,
  'MyFatoorah': FaCreditCard,
  'NELC': FaGraduationCap,
  'SCFHS': FaHospital,
  'Multer': FaUpload,
  'Excel Processing': FaFileExcel,
  'React Native': FaReact,
  'Android': FaAndroid,
  'Google Play': FaGooglePlay,
  'REST API': FaPlug,
  'Bug Fixing': FaBug,
  'UI/UX Redesign': FaMobileAlt,
  'Tajweed': FaQuran,
  'Laravel': SiLaravel,
  'PHP': SiPhp,
  'Docker': SiDocker,
  'Firebase': SiFirebase,
  'Vercel': SiVercel,
  'Vercel Serverless': SiVercel,
  'Redux': SiRedux,
  'React Query': SiReactquery,
  'iOS': SiApple,
  'App Store': SiAppstore,
  'App Store Connect API': SiAppstore,
  'PWA': SiPwa,
  'Codemagic': SiCodemagic,
  'Service Worker': FaCogs,
  'Web Push': FaBell,
  'SEO': FaSearch,
  'RTL': FaLanguage,
  'i18next': FaLanguage,
  'CMS': FaCubes,
  'Customization': FaSlidersH,
};

/** Rough perceived lightness (0–1) of a #RRGGBB colour. */
const lightness = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Renders a technology mark in its own brand colour, sourced from
 * src/lib/brand-colors.js. Anything without a known brand colour falls back to
 * --brand-neutral, which follows the palette. A technology with no mark at
 * all returns null: where the name is written beside the mark that is
 * enough, and icon-only rows use TechMark, which shows a text chip instead.
 */
export const getTechIcon = (tech) => {
  const Icon = TECH_ICONS[tech];
  if (!Icon) return null;
  const color = brandColor(tech);
  if (!color) return <Icon className="text-[rgb(var(--brand-neutral))]" />;
  const l = lightness(color);
  // Black marks (Next.js, Express, Vercel) are monochrome brands: drawn in
  // the text colour, as those brands show themselves on dark backgrounds.
  if (l < 0.12) return <Icon className="text-[rgb(var(--foreground))]" />;
  // Dark but coloured (Django, Nx, OpenAI, Prisma): the brand hue, lifted
  // towards white in the dark theme only (.brand-lift in globals.css).
  if (l < 0.25) return <Icon className="brand-lift" style={{ '--brand': color }} />;
  return <Icon style={{ color }} />;
};

/**
 * One technology in an icon-only row: the mark, named for assistive tech and
 * on hover, or a small neutral chip with the name when there is no mark.
 */
const TechMark = ({ tech, className = '' }) => {
  const icon = getTechIcon(tech);
  return icon ? (
    <span title={tech} role="img" aria-label={tech} className={className}>
      {icon}
    </span>
  ) : (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--muted))]/30 text-[11px] font-medium leading-5 text-[rgb(var(--muted-foreground))]" dir="ltr">
      {tech}
    </span>
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
      image: '/covers/injaz.webp',
      accent: 'rgb(var(--accent))',
    },
    {
      slug: 'hcholding',
      name: 'HC Holding',
      url: 'https://lms-hcholding.org/',
      image: '/covers/hcholding.webp',
      accent: 'rgb(var(--success))',
    },
    {
      slug: 'mada',
      name: 'Mada Education',
      url: 'https://mada-education.com/',
      image: '/covers/mada.webp',
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

/**
 * The one secondary link a project gets beside "Case study": the live site,
 * or the App Store for the mobile app, or the source only when nothing is
 * live. Anything else (the second store, the source of a live project) is on
 * the case-study page, so no row, card or sheet offers more than two actions.
 */
export const secondaryLink = (project) => {
  if (project.appStore) return { href: project.appStore, type: 'app_store', label: 'projects.modal.app_store', Icon: FaApple };
  if (project.live) return { href: project.live, type: 'live', label: 'projects.modal.live_link', Icon: FaExternalLinkAlt };
  if (project.github) return { href: project.github, type: 'github', label: 'projects.modal.source_code', Icon: FaGithub };
  return null;
};

/** Analytics for the two project actions; `placement` says which surface. */
export const trackCaseStudy = (project, placement) =>
  track('case_study_open', { project: project.slug, placement });
export const trackSecondary = (project, link, placement) =>
  track('project_link', { project: project.slug, type: link.type, placement });

/**
 * Below 768px every row and card is one .m-card-flush (globals.css: the
 * shared card surface, media flush to its edge; a no-op from 768 up, so the
 * desktop layout keeps its own classes).
 */
/** The flush screen at the top of a mobile card: no frame edge of its own. */
const M_FLUSH_FRAME = 'max-md:rounded-none max-md:border-0 max-md:border-b max-md:shadow-none';

/** The solid index chip that replaces the outline numerals on phones. */
export const IndexChip = ({ n, className = '' }) => (
  <span
    dir="ltr"
    aria-hidden="true"
    className={`inline-flex items-center justify-center h-6 min-w-8 px-2 rounded-full text-xs font-bold tabular-nums bg-[rgb(var(--accent))]/12 text-[rgb(var(--accent))] ring-1 ring-inset ring-[rgb(var(--accent))]/25 ${className}`}>
    {String(n).padStart(2, '0')}
  </span>
);

/** The secondary action's short label for the two-up row on phones. */
const SHORT_LABEL = { live: 'mPages.live_short', app_store: 'mPages.app_store_short', github: 'mPages.source_short' };

const ProjectCard = ({ project, index, onClick, headingAs: CardHeading = 'h3' }) => (
  // The whole card opens the details, through one real button: the title.
  // Its ::after stretches over the card, so a click anywhere still works,
  // while keyboard and screen-reader users get a named, focusable control
  // (the card used to be a clickable <div> nobody could reach by keyboard).
  <Reveal y={20} delay={revealDelay(index)} long
    className={`press focus-card group relative glass-card rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-[rgb(var(--primary))]/30 motion-safe:hover:-translate-y-1 flex flex-col h-full bg-[rgb(var(--background))] m-card-flush`}>
    {/* The screen fills the card's width: a thin margin, no letterbox.
        On phones it runs flush to the card's edges. */}
    <div className="p-3 pb-0 max-md:p-0">
      <DeviceFrame
        src={project.image}
        alt={project.title}
        kind={frameKind(project.image, project.mockups)}
        host={hostOf(project.live)}
        // A third of the 1152px column from 1280, half of the container
        // from 768, all of it below; less the gutters (the screen is flush
        // to the card on phones).
        sizes="(min-width: 1280px) 344px, (min-width: 768px) 452px, calc(100vw - 40px)"
        className={M_FLUSH_FRAME}
        imageClassName="transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
        alignBar
      />
    </div>

    {/* Content */}
    <div className="p-5 md:p-6 flex flex-col flex-grow text-start">
      {/* One concrete outcome, so the card says what the project did and
          not only what it was built with. */}
      {project.impact && (
        <span className="self-start mb-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[rgb(var(--muted))]/40 text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))]">
          {project.impact}
        </span>
      )}
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

      {/* No flex-grow here: a clamped paragraph taller than its two lines
          shows the third line under the ellipsis. The icons' mt-auto
          keeps the rows aligned instead. */}
      <p className="text-[rgb(var(--muted-foreground))] text-sm mb-6 line-clamp-2 leading-relaxed">
        {project.description}
      </p>

      {/* Minimal Tech Icons only (No redundant text pills) */}
      <div className="flex flex-wrap items-center gap-3 mt-auto relative z-10 pointer-events-none">
        {project.tags.slice(0, 6).map((tech) => (
          <TechMark
            key={tech}
            tech={tech}
            className="text-lg opacity-70 group-hover:opacity-100 transition-opacity"
          />
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

/**
 * Editorial row for the curated default view: oversized index, screenshot,
 * one-line impact and two routes out: the case study, and the live product
 * (see secondaryLink). The archive and any filtered view keep the denser
 * card grid.
 */
const FeaturedRow = ({ project, index, isArabic, headingAs: RowHeading = 'h3', eager = false, rise = false, clamp = false }) => {
  const { t } = useTranslation();
  const flip = index % 2 === 1;
  const caseStudyHref = `${isArabic ? '/ar' : ''}${project.caseStudy}`;
  const secondary = secondaryLink(project);
  const placement = 'row';

  return (
    // The first row of /work is the page's largest paint: it rises in from the
    // first frame instead of waiting, transparent, for the scroll observer.
    // Below 768px the row is one card: the screen flush at the top, then the
    // copy and an equal-width pair of actions.
    <Reveal as="article" y={32} duration={0.55} rise={rise}
      className={`group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center max-md:gap-0 m-card-flush`}>
      {/* Screenshot: the larger share of the row from 1280 up. */}
      <div className={`lg:col-span-7 xl:col-span-8 ${flip ? 'lg:order-2' : ''}`}>
        {/* A pointer shortcut to the case study; kept out of the tab order
            and the accessibility tree, since the "Case study" link below is
            the same destination with a name. */}
        <a
          href={caseStudyHref}
          onClick={() => trackCaseStudy(project, 'row_screen')}
          tabIndex={-1}
          aria-hidden="true"
          className="block max-md:transition-opacity max-md:active:opacity-80">
          <DeviceFrame
            src={project.image}
            alt={project.title}
            kind={frameKind(project.image, project.mockups)}
            host={hostOf(project.live)}
            // 8 of 12 columns of the 1152px column from 1280, 7 of 12 from
            // 1024, then the full container width; on phones the screen is
            // flush to the card, so the viewport less the 20px gutters.
            sizes="(min-width: 1280px) 755px, (min-width: 1024px) 560px, (min-width: 768px) 720px, calc(100vw - 40px)"
            // The first row is the LCP element: fetched with the document
            // instead of waiting for lazy-load to discover it.
            preload={eager}
            style={{ viewTransitionName: `cover-${project.slug}` }}
            className={`transition-colors duration-300 group-hover:border-[rgb(var(--primary))]/40 ${M_FLUSH_FRAME}`}
            imageClassName="transition-transform duration-500 motion-safe:group-hover:scale-[1.015]"
          />
        </a>
      </div>

      {/* Copy */}
      <div className={`lg:col-span-5 xl:col-span-4 text-start max-md:p-5 ${flip ? 'lg:order-1' : ''}`}>
        {/* The block follows the page direction (start side in Arabic too);
            only the digits themselves are marked left-to-right. On phones a
            small solid chip replaces the outline numeral. */}
        <p className="max-md:hidden font-display text-5xl md:text-6xl font-bold text-outline leading-none mb-4 select-none">
          <span dir="ltr">{String(index + 1).padStart(2, '0')}</span>
        </p>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <IndexChip n={index + 1} className="md:hidden" />
          {project.impact && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[rgb(var(--muted))]/40 text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))]">
              {project.impact}
            </span>
          )}
          {/* Featured rows are client work today; the label keeps it honest if that changes. */}
          <ProjectKindLabel kind={project.kind} />
        </div>
        <RowHeading className="font-display text-2xl md:text-3xl font-bold text-[rgb(var(--foreground))] mb-3 leading-tight max-md:text-[1.375rem] max-md:leading-[1.3] max-md:mb-2 max-md:rtl:leading-[1.6]">
          {project.title}
        </RowHeading>
        <p className={`text-[rgb(var(--muted-foreground))] leading-relaxed mb-5 max-md:mb-4 ${clamp ? 'max-md:line-clamp-3' : ''}`}>
          {project.description}
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-6 text-lg max-md:mb-5">
          {project.tags.slice(0, 6).map((tech) => (
            <TechMark key={tech} tech={tech} />
          ))}
        </div>
        {/* Two routes out. On phones they are an equal-width pair, the case
            study filled as the primary. */}
        <div className={`flex flex-wrap gap-3 max-md:grid ${secondary ? 'max-md:grid-cols-2' : 'max-md:grid-cols-1'}`}>
          <a
            href={caseStudyHref}
            onClick={() => trackCaseStudy(project, placement)}
            className="press inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl font-semibold text-sm bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/30 hover:bg-[rgb(var(--primary))]/20 transition-colors max-md:justify-center max-md:min-h-12 max-md:px-3 max-md:rounded-[var(--radius-btn,0.875rem)] max-md:bg-[rgb(var(--accent))] max-md:text-[rgb(var(--accent-contrast))] max-md:border-transparent">
            <span className="md:hidden">{t('mPages.case_study_short')}</span>
            <span className="max-md:hidden">{t('projects.modal.case_study')}</span>
            {/* Every row has these controls: the project name makes each
                one distinct in a links list. */}
            <span className="sr-only">: {project.title}</span>
          </a>
          {secondary && (
            <a
              href={secondary.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSecondary(project, secondary, placement)}
              className="press inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl font-semibold text-sm border border-[rgb(var(--border-control))] text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors max-md:justify-center max-md:min-h-12 max-md:px-3 max-md:rounded-[var(--radius-btn,0.875rem)]">
              <secondary.Icon aria-hidden="true" className="text-xs shrink-0" />
              <span className="md:hidden">{t(SHORT_LABEL[secondary.type])}</span>
              <span className="max-md:hidden">{t(secondary.label)}</span>
              <span className="sr-only">: {project.title}</span>
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
};

// Grid pages render in steps of this size; a sentinel near the bottom of the
// grid loads the next step, so 30+ cards never mount (or decode images) at once.
const GRID_PAGE_SIZE = 12;

const scrollBehavior = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

/**
 * variant="home": the four flagship editorial rows plus a link into /work —
 * no filters, search or archive. variant="full" (default) is the complete
 * archive experience used on /work.
 */
const Projects = ({ variant = 'full' }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const isHome = variant === 'home';
  const Arrow = isArabic ? FaArrowLeft : FaArrowRight;
  const Heading = isHome ? 'h2' : 'h1';
  const itemHeading = isHome ? 'h3' : 'h2';
  const [industry, setIndustry] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showArchive, setShowArchive] = useState(false);
  const [gridLimit, setGridLimit] = useState(GRID_PAGE_SIZE);
  const sentinelRef = useRef(null);
  const resultsRef = useRef(null);
  // Set when the archive toggle opens the full grid, so focus can follow the
  // content instead of staying on a button now 38 cards further down.
  const focusResultsRef = useRef(false);
  const searchRef = useRef(null);
  const railRef = useRef(null);
  // True once a ?industry= link has been applied (or found absent); until
  // then the results are hidden (see IndustryLinkGuard).
  const [linkResolved, setLinkResolved] = useState(false);

  // A new filter, search or archive toggle starts the grid from page one again.
  useEffect(() => {
    setGridLimit(GRID_PAGE_SIZE);
  }, [industry, searchTerm, showArchive]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  // A filter can be linked to: /work?industry=healthcare opens on it, and
  // choosing one updates the address (replaceState: no history entry per
  // click). Read after hydration, so the prerendered page stays static and
  // unfiltered; IndustryLinkGuard keeps the results hidden until the filter
  // has been applied here, so the featured rows do not flash first.
  useEffect(() => {
    if (isHome) return;
    const wanted = new URLSearchParams(window.location.search).get('industry');
    if (INDUSTRIES.includes(wanted)) setIndustry(wanted);
    setLinkResolved(true);
  }, [isHome]);

  // Runs after the commit that rendered the filtered grid, so the results
  // are shown already filtered.
  useEffect(() => {
    if (linkResolved) document.documentElement.removeAttribute('data-industry-link');
  }, [linkResolved]);

  const chooseIndustry = (id) => {
    setIndustry(id);
    const url = new URL(window.location.href);
    if (id === 'all') url.searchParams.delete('industry');
    else url.searchParams.set('industry', id);
    window.history.replaceState(window.history.state, '', url);
    // On a phone the chip rail sticks under the header once the list is
    // scrolled. A new filter then starts its list at the top, just under the
    // rail, instead of leaving the reader somewhere in the middle of it.
    const rail = railRef.current;
    if (!rail || !window.matchMedia('(max-width: 767.98px)').matches) return;
    requestAnimationFrame(() => {
      const results = document.getElementById('project-results');
      if (!results) return;
      const railBottom = rail.getBoundingClientRect().bottom;
      const top = results.getBoundingClientRect().top;
      if (top < railBottom) window.scrollBy({ top: top - railBottom - 12, behavior: scrollBehavior() });
    });
  };

  // Keeps the chosen chip in view inside the rail (a ?industry= link can
  // open on one that starts off screen). Horizontal only: measured from the
  // boxes, so it is the same in both directions.
  useEffect(() => {
    const rail = railRef.current;
    const chip = rail?.querySelector('[aria-pressed="true"]');
    if (!rail || !chip || rail.scrollWidth <= rail.clientWidth) return;
    const box = rail.getBoundingClientRect();
    const own = chip.getBoundingClientRect();
    const pad = 20;
    const shift =
      own.left < box.left + pad ? own.left - box.left - pad
        : own.right > box.right - pad ? own.right - box.right + pad
          : 0;
    if (shift) rail.scrollBy({ left: shift, behavior: scrollBehavior() });
  }, [industry]);

  // The empty state's way out: everything back to the default view, and
  // focus to the search, since the button that was pressed disappears.
  const clearFilters = () => {
    chooseIndustry('all');
    setSearchTerm('');
    searchRef.current?.focus();
  };

  // Every card is derived from the case-study registry: slug, cover, stack,
  // links, industry and featured flag are typed once, in
  // src/lib/case-studies.js, and only the wording comes from the locale
  // bundle. The cards used to carry their own copy of those facts, and 12
  // stacks and one live URL had drifted from the registry.
  const projectsData = useMemo(
    () =>
      CASE_STUDY_SLUGS.map((slug) => {
        const { image, mockups, stack, liveUrl, appStoreUrl, github, industry: sector, featured, kind } = CASE_STUDIES[slug];
        return {
          slug,
          featured: Boolean(featured),
          title: t(`projects.items.${slug}.title`),
          impact: t(`projects.items.${slug}.impact`, { defaultValue: '' }),
          description: t(`projects.items.${slug}.desc`),
          features: asArray(t(`projects.items.${slug}.features`, { returnObjects: true })),
          image,
          mockups: mockups ?? [],
          tags: stack,
          // null, not a '#' placeholder, when there is nothing to link to.
          live: liveUrl ?? null,
          appStore: appStoreUrl ?? null,
          github: github ?? null,
          industry: sector,
          kind,
          caseStudy: `/case-study/${slug}`,
          ...(LMS_SUITE_SLUGS.has(slug) && { suite: LMS_SUITE }),
        };
      }).sort(byArchiveOrder),
    [t],
  );

  // Industry buttons, each with how many projects it holds. "All" has no
  // count: unfiltered, /work shows the featured rows, not all 38, and the
  // archive toggle below already says how many there are in total.
  const industries = [
    { id: 'all', count: null },
    ...INDUSTRIES.map((id) => ({ id, count: projectsData.filter((project) => project.industry === id).length })),
  ];

  // The search also reads the stack, which is where the old Full Stack /
  // Frontend / Backend buttons went: "Django" or "React Native" still finds
  // the work, without a row of buttons that only meant something to developers.
  const query = searchTerm.trim().toLowerCase();
  const filteredProjects = projectsData.filter((project) => {
    const matchesFilter = industry === 'all' || project.industry === industry;
    const matchesSearch =
      !query ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some((tech) => tech.toLowerCase().includes(query));
    return matchesFilter && matchesSearch;
  });

  // The default view curates the strongest work; filtering or searching always
  // looks through the complete archive so nothing becomes unreachable.
  const isDefaultView = industry === 'all' && query === '';
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
    // Opened by a tap or a click, focus still moves to the first card, but
    // without the keyboard ring (it drew an orange frame round the card on
    // phones); by keyboard the ring shows as usual.
    const byPointer = focusResultsRef.current === 'pointer';
    focusResultsRef.current = false;
    resultsRef.current?.querySelector('button')?.focus(byPointer ? { focusVisible: false } : undefined);
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
    <section id="projects" className={`py-20 relative ${isHome ? 'max-md:py-14' : 'min-h-screen max-md:pt-0 max-md:pb-14'}`}>
      <div className="container mx-auto px-6 max-sm:px-5 relative z-10">
        {/* On /work this is the top of the page and its h1, so it moves from
            the first paint without a fade; on the home page it is a section
            heading and a scroll reveal. */}
        <SectionHeading
          as={Heading}
          rise={!isHome}
          className="max-w-6xl mx-auto"
          eyebrow={t(isHome ? 'mPages.eyebrow.featured' : 'mPages.eyebrow.work')}
          title={t(isHome ? 'projects.title' : 'projects.archive_title')}
          subtitle={t('projects.subtitle')}
        />

        {/* Industry filter and search. From 768 up the industries are
            toggle buttons that wrap onto a second line rather than scroll off
            it, and the search sits at the end of the row from lg up. Below
            768 the search comes first and the same buttons become a rail of
            chips that sticks under the header while the list scrolls: the
            wrapper is `display: contents` there, so the rail's sticky box is
            the whole section, not this block. */}
        {!isHome && (
        <Reveal y={20} duration={0.5} delay={0.2} immediate
          className="mb-12 flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start lg:justify-between max-w-6xl mx-auto max-md:contents">
          {/* Search */}
          <div className="relative w-full lg:w-72 shrink-0 md:order-last max-md:mb-3">
            <FaSearch aria-hidden="true" className="md:hidden pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-sm text-[rgb(var(--muted-foreground))]" />
            {/* 16px text: anything smaller makes iOS zoom the page on focus. */}
            <input
              ref={searchRef}
              type="search"
              aria-label={t('a11y.search_projects')}
              aria-controls="project-results"
              placeholder={t('projects.search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full min-h-[44px] px-5 py-2.5 rounded-full bg-[rgb(var(--background))] border border-[rgb(var(--border-control))] focus:border-[rgb(var(--primary))] focus:ring-1 focus:ring-[rgb(var(--primary))]/50 outline-none transition-all shadow-sm text-base text-[rgb(var(--foreground))] max-md:min-h-12 max-md:ps-10 max-md:bg-[rgb(var(--surface))] max-md:border-[rgb(var(--border-subtle))]"
            />
          </div>

          {/* The rail's backdrop runs edge to edge under the sticky header,
              a solid fill with a hairline (no blur: the header and the tab
              bar already blur); the chips scroll inside it, faded at both
              ends. */}
          <div className="md:contents max-md:sticky max-md:z-20 max-md:top-[var(--header-h)] max-md:-mx-5 sm:max-md:-mx-6 max-md:mb-5 max-md:bg-[rgb(var(--background))] max-md:border-b max-md:border-[rgb(var(--border-subtle))] max-md:transition-transform max-md:duration-[260ms] max-md:ease-[var(--ease-out)] motion-safe:max-md:[html[data-header=hidden]:not([data-menu-open]):not([data-sheet-open])_&]:-translate-y-[var(--header-h)]">
            <div
              ref={railRef}
              role="group"
              aria-label={t('a11y.filter_projects')}
              className="flex md:flex-wrap gap-2 max-md:overflow-x-auto max-md:overscroll-x-contain max-md:snap-x max-md:snap-proximity max-md:px-5 sm:max-md:px-6 max-md:scroll-px-5 max-md:py-2.5 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden max-md:[mask-image:linear-gradient(to_right,transparent,black_14px,black_calc(100%-14px),transparent)]">
              {industries.map(({ id, count }) => {
                const active = industry === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => chooseIndustry(id)}
                    className={`press relative shrink-0 snap-start inline-flex items-center gap-2 px-4 min-h-[44px] rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${
                      active
                        ? 'border-transparent text-[rgb(var(--accent-contrast))]'
                        : 'border-[rgb(var(--border))] bg-[rgb(var(--muted))]/20 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:border-[rgb(var(--border-control))] max-md:bg-[rgb(var(--surface))] max-md:border-[rgb(var(--border-subtle))] max-md:text-[rgb(var(--foreground))]'
                    }`}>
                    {active && (
                      <m.span
                        aria-hidden="true"
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-[rgb(var(--primary))] shadow-md rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative">{t(`projects.industries.${id}`)}</span>
                    {/* The count is a visual hint; the status line below
                        announces the result once a button is chosen. */}
                    {count !== null && (
                      <span aria-hidden="true" dir="ltr" className={`relative text-xs tabular-nums ${active ? 'opacity-80' : 'opacity-60'}`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
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
          <div id="project-results" className="space-y-20 lg:space-y-28 max-w-6xl mx-auto max-md:space-y-4">
            {visibleProjects.map((project, index) => (
              <FeaturedRow
                key={project.slug}
                project={project}
                index={index}
                isArabic={isArabic}
                headingAs={itemHeading}
                // The home page is a preview: three lines of description on
                // a phone; /work gives the whole paragraph.
                clamp={isHome}
                // On /work the first screen is the page's LCP element (measured
                // at 390 and 1440), so it alone is preloaded and rises
                // in without a fade. On the home page it is not: the hero
                // heading is the LCP at 390 and 1440 and the first row sits
                // below the fold, so preloading it would only compete with
                // the hero's fonts.
                eager={!isHome && index === 0}
                rise={!isHome && index === 0}
              />
            ))}
          </div>
        ) : (
          <>
          {/* The same 1152px column as the heading, filters and rows, so
              the grid no longer starts left of everything above it. */}
          <div id="project-results" ref={resultsRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-md:gap-3 max-w-6xl mx-auto">
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center gap-6 py-20 text-[rgb(var(--muted-foreground))]">
                {/* The status line already announces this. */}
                <p aria-hidden="true" className="text-xl">{t('projects.no_results')}</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="min-h-[44px] px-6 rounded-full border border-[rgb(var(--border-control))] text-sm font-semibold text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors">
                  {t('projects.clear_filters')}
                </button>
              </m.div>
            )}
          </div>
          {/* Progressive-load sentinel: also a real button, so keyboard and
              find-in-page users are not stuck with only the first page. */}
          {hasMoreGrid && (
            <div ref={sentinelRef} className="mt-12 max-md:mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setGridLimit((prev) => prev + GRID_PAGE_SIZE)}
                className="press max-md:w-full max-md:min-h-12 min-h-[44px] px-8 py-3 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--muted))]/30 hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors text-sm font-semibold text-[rgb(var(--foreground))]">
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
          <div className="mt-16 max-md:mt-6 flex justify-center">
            <a
              href={`${isArabic ? '/ar' : ''}/work`}
              className="press inline-flex items-center gap-2 min-h-[44px] px-8 py-3.5 rounded-full border border-[rgb(var(--border-control))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors text-sm font-semibold text-[rgb(var(--foreground))] max-md:w-full max-md:justify-center max-md:min-h-12 max-md:rounded-[var(--radius-btn,0.875rem)] max-md:bg-[rgb(var(--surface))] max-md:border-[rgb(var(--border-subtle))]">
              {t('projects.view_all', { count: projectsData.length })}
              <Arrow aria-hidden="true" className="md:hidden text-xs text-[rgb(var(--accent))]" />
            </a>
          </div>
        )}

        {/* Archive toggle — only meaningful in the curated default view */}
        {!isHome && isDefaultView && (
          <div className="mt-12 max-md:mt-8 flex flex-col items-center gap-3 text-center">
            {!showArchive && (
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                {t('projects.featured_note')}
              </p>
            )}
            <button
              type="button"
              aria-expanded={showArchive}
              aria-controls="project-results"
              onClick={(event) => {
                // A click with no pointer behind it (detail 0) came from the
                // keyboard; see the focus effect above.
                focusResultsRef.current = showArchive ? false : event.detail === 0 ? 'keyboard' : 'pointer';
                setShowArchive((prev) => !prev);
              }}
              className="press max-md:w-full max-md:min-h-12 min-h-[44px] px-8 py-3 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--muted))]/30 hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors text-sm font-semibold text-[rgb(var(--foreground))]">
              {showArchive
                ? t('projects.show_featured')
                : t('projects.show_all', { count: projectsData.length })}
            </button>
          </div>
        )}
      </div>

      {/* Only the archive cards open the sheet; the home rows link straight
          to the case study, so the home page never loads it. */}
      {!isHome && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
export default Projects;
