"use client";
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REVEAL_VIEWPORT, revealDelay, REVEAL_DURATION } from '../lib/motion';
import {
  FaCode,
  FaDatabase,
  FaTools,
  FaServer,
  FaPython,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaGitAlt,
  FaDocker,
  FaLinux,
  FaShieldAlt,
  FaProjectDiagram,
  FaGraduationCap,
  FaSearch,
  FaTimes
} from 'react-icons/fa';
import SkillSkeleton from './skeletons/SkillSkeleton';
import {
  SiDjango,
  SiPostgresql,
  SiMysql,
  SiJavascript,
  SiTailwindcss,
  SiApache,
  SiRedhat,
  SiNextdotjs,
  SiNestjs,
  SiTypescript,
  SiMongodb,
  SiPrisma,
  SiSocketdotio,
  SiNginx,
  SiVercel,
  SiNotion,
  SiExpress
} from 'react-icons/si';
import { useTranslation } from 'react-i18next';
import { brandColor } from '../lib/brand-colors';

const SkillCard = ({ category, index }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
      transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
      className="bg-[rgb(var(--card))] p-6 rounded-xl border border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] transition-all duration-300 hover:shadow-lg hover:shadow-[rgb(var(--primary))]/10">
      <div className={`flex items-center mb-6 ${isArabic ? 'space-x-reverse' : ''}`}>
        <div className="bg-[rgb(var(--primary))]/10 p-3 rounded-lg">
          {category.icon}
        </div>
        <h3 className={`text-xl font-bold ${isArabic ? 'mr-4 text-right' : 'ml-4 text-left'}`}>
          {category.title}
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {category.skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
          viewport={REVEAL_VIEWPORT}
            transition={{ duration: REVEAL_DURATION, delay: revealDelay(i) }}
            className={`flex items-center gap-2 p-3 rounded-lg hover:bg-[rgb(var(--muted))] transition-colors duration-200 group ${isArabic ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
            <div className="bg-[rgb(var(--background))] p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
              {skill.icon}
            </div>
            <p className="text-[rgb(var(--foreground))] font-semibold text-sm">
              {skill.name}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  // Content comes from the local i18n bundle, so there is nothing to wait for.
  const [loading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const skillCategories = useMemo(() => [
    {
      id: 'Languages',
      title: t('skills.categories.languages'),
      icon: <FaCode className="text-4xl text-primary" />,
      skills: [
        { name: 'Python', icon: <FaPython className="text-2xl" style={{ color: brandColor('Python') }} />, level: 90, years: '3+' },
        { name: 'JavaScript', icon: <SiJavascript className="text-2xl" style={{ color: brandColor('JavaScript') }} />, level: 85, years: '2+' },
        { name: 'TypeScript', icon: <SiJavascript className="text-2xl" style={{ color: brandColor('TypeScript') }} />, level: 80, years: '1+' },
        { name: 'HTML5', icon: <FaHtml5 className="text-2xl" style={{ color: brandColor('HTML5') }} />, level: 95, years: '3+' },
        { name: 'CSS3', icon: <FaCss3Alt className="text-2xl" style={{ color: brandColor('CSS3') }} />, level: 90, years: '3+' }
      ]
    },
    {
      id: 'Frameworks',
      title: t('skills.categories.frameworks'),
      icon: <FaTools className="text-4xl text-primary" />,
      skills: [
        { name: 'Django', icon: <SiDjango className="text-2xl" style={{ color: brandColor('Django') }} />, level: 90, years: '3+' },
        { name: 'Flask', icon: <FaPython className="text-2xl" style={{ color: brandColor('Flask') }} />, level: 75, years: '2+' },
        { name: 'Django REST Framework', icon: <SiDjango className="text-2xl" style={{ color: brandColor('Django REST Framework') }} />, level: 88, years: '2+' },
        { name: 'Next.js', icon: <SiNextdotjs className="text-2xl" style={{ color: brandColor('Next.js') }} />, level: 82, years: '1+' },
        { name: 'React.js', icon: <FaReact className="text-2xl" style={{ color: brandColor('React.js') }} />, level: 85, years: '2+' },
        { name: 'Node.js', icon: <FaServer className="text-2xl" style={{ color: brandColor('Node.js') }} />, level: 80, years: '2+' },
        { name: 'Express.js', icon: <SiExpress className="text-2xl" style={{ color: brandColor('Express.js') }} />, level: 78, years: '1+' },
        { name: 'NestJS', icon: <SiNestjs className="text-2xl" style={{ color: brandColor('NestJS') }} />, level: 75, years: '1+' },
        { name: 'Odoo', icon: <FaCode className="text-2xl" style={{ color: brandColor('Odoo') }} />, level: 70, years: '1+' },
        { name: 'jQuery', icon: <FaCode className="text-2xl" style={{ color: brandColor('jQuery') }} />, level: 80, years: '2+' },
        { name: 'Bootstrap', icon: <FaBootstrap className="text-2xl" style={{ color: brandColor('Bootstrap') }} />, level: 90, years: '3+' },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-2xl" style={{ color: brandColor('Tailwind CSS') }} />, level: 92, years: '2+' }
      ]
    },
    {
      id: 'DevOps',
      title: t('skills.categories.devops'),
      icon: <FaServer className="text-4xl text-primary" />,
      skills: [
        { name: 'Docker', icon: <FaDocker className="text-2xl" style={{ color: brandColor('Docker') }} />, level: 85, years: '2+' },
        { name: 'Git', icon: <FaGitAlt className="text-2xl" style={{ color: brandColor('Git') }} />, level: 90, years: '3+' },
        { name: 'GitHub', icon: <FaCode className="text-2xl" style={{ color: brandColor('GitHub') }} />, level: 88, years: '3+' },
        { name: 'Linux', icon: <FaLinux className="text-2xl" style={{ color: brandColor('Linux') }} />, level: 85, years: '3+' },
        { name: 'Shell Scripting', icon: <FaCode className="text-2xl" style={{ color: brandColor('Shell Scripting') }} />, level: 80, years: '2+' },
        { name: 'Bash', icon: <FaLinux className="text-2xl" style={{ color: brandColor('Bash') }} />, level: 82, years: '2+' },
        { name: 'Apache', icon: <SiApache className="text-2xl" style={{ color: brandColor('Apache') }} />, level: 75, years: '2+' },
        { name: 'Nginx', icon: <SiNginx className="text-2xl" style={{ color: brandColor('Nginx') }} />, level: 78, years: '1+' },
        { name: 'Vercel', icon: <SiVercel className="text-2xl" style={{ color: brandColor('Vercel') }} />, level: 85, years: '1+' },
        { name: 'Red Hat', icon: <SiRedhat className="text-2xl" style={{ color: brandColor('Red Hat') }} />, level: 70, years: '1+' }
      ]
    },
    {
      id: 'Databases',
      title: t('skills.categories.databases'),
      icon: <FaDatabase className="text-4xl text-primary" />,
      skills: [
        { name: 'PostgreSQL', icon: <SiPostgresql className="text-2xl" style={{ color: brandColor('PostgreSQL') }} />, level: 85, years: '2+' },
        { name: 'MySQL', icon: <SiMysql className="text-2xl" style={{ color: brandColor('MySQL') }} />, level: 80, years: '2+' },
        { name: 'MongoDB', icon: <SiMongodb className="text-2xl" style={{ color: brandColor('MongoDB') }} />, level: 78, years: '1+' },
        { name: 'SQLite', icon: <FaDatabase className="text-2xl" style={{ color: brandColor('SQLite') }} />, level: 82, years: '2+' },
        { name: 'Prisma', icon: <SiPrisma className="text-2xl" style={{ color: brandColor('Prisma') }} />, level: 75, years: '1+' },
        { name: 'TypeORM', icon: <FaDatabase className="text-2xl" style={{ color: brandColor('TypeORM') }} />, level: 72, years: '1+' }
      ]
    },
    {
      id: 'RealTime',
      title: t('skills.categories.realtime'),
      icon: <FaServer className="text-4xl text-primary" />,
      skills: [
        { name: 'Socket.io', icon: <SiSocketdotio className="text-2xl" style={{ color: brandColor('Socket.io') }} />, level: 75, years: '1+' },
        { name: 'REST APIs', icon: <FaCode className="text-2xl" style={{ color: brandColor('REST APIs') }} />, level: 90, years: '3+' }
      ]
    },
    {
      id: 'Cybersecurity',
      title: t('skills.categories.cybersecurity'),
      icon: <FaShieldAlt className="text-4xl text-primary" />,
      skills: [
        { name: 'Network Security', icon: <FaShieldAlt className="text-2xl" style={{ color: brandColor('Network Security') }} />, level: 70, years: '1+' },
        { name: 'Red Hat Admin 1', icon: <SiRedhat className="text-2xl" style={{ color: brandColor('Red Hat Admin 1') }} />, level: 68, years: '1+' }
      ]
    },
    {
      id: 'Management',
      title: t('skills.categories.management'),
      icon: <FaProjectDiagram className="text-4xl text-primary" />,
      skills: [
        { name: 'Agile', icon: <FaProjectDiagram className="text-2xl" style={{ color: brandColor('Agile') }} />, level: 85, years: '2+' },
        { name: 'Trello', icon: <FaProjectDiagram className="text-2xl" style={{ color: brandColor('Trello') }} />, level: 80, years: '2+' },
        { name: 'Notion', icon: <SiNotion className="text-2xl" style={{ color: brandColor('Notion') }} />, level: 75, years: '1+' }
      ]
    },
    {
      id: 'Soft',
      title: t('skills.categories.soft'),
      icon: <FaGraduationCap className="text-4xl text-primary" />,
      skills: [
        { name: t('skills.soft_skills.communication'), icon: <FaCode className="text-2xl text-[rgb(var(--accent))]" />, level: 90, years: '3+' },
        { name: t('skills.soft_skills.presentation'), icon: <FaCode className="text-2xl text-[rgb(var(--accent))]" />, level: 85, years: '2+' },
        { name: t('skills.soft_skills.problem_solving'), icon: <FaCode className="text-2xl text-[rgb(var(--accent))]" />, level: 92, years: '3+' },
        { name: t('skills.soft_skills.time_management'), icon: <FaCode className="text-2xl text-[rgb(var(--accent))]" />, level: 88, years: '3+' },
        { name: t('skills.soft_skills.adaptability'), icon: <FaCode className="text-2xl text-[rgb(var(--accent))]" />, level: 90, years: '3+' }
      ]
    }
  ], [t]);

  // Get unique categories for filter tabs
  const filterTabs = useMemo(() => [
    { id: 'All', label: t('skills.categories.all') },
    ...skillCategories.map(cat => ({ id: cat.title, label: cat.title }))
  ], [skillCategories, t]);

  // Filter skills based on selected category and search query
  const filteredCategories = useMemo(() => skillCategories.filter(category => {
    const matchesCategory = selectedCategory === 'All' || category.title === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.skills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  }), [skillCategories, selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">{t('skills.title')}</h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-auto mb-8">
          <div className="relative">
            <FaSearch className={`absolute ${isArabic ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-[rgb(var(--muted-foreground)))]`} />
            <input
              type="text"
              placeholder={t('skills.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full ${isArabic ? 'pr-12 pl-12 text-right' : 'pl-12 pr-12 text-left'} py-3 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl focus:outline-none focus:border-[rgb(var(--primary))] transition-colors duration-300 text-[rgb(var(--foreground)))]`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute ${isArabic ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors`}>
                <FaTimes />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12">
          {filterTabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
          viewport={REVEAL_VIEWPORT}
              transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 sm:px-6 min-h-[44px] rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === tab.id
                  ? 'bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))] shadow-lg shadow-[rgb(var(--primary))]/30'
                  : 'bg-[rgb(var(--card))] text-[rgb(var(--foreground))] border border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]'
              }`}>
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkillSkeleton key={index} index={index} />
              ))}
            </motion.div>
          ) : filteredCategories.length > 0 ? (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.map((category, index) => (
                <SkillCard key={category.id} category={category} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12">
              <p className="text-[rgb(var(--muted-foreground))] text-lg">
                {t('skills.no_results', { query: searchQuery })}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Skills;
