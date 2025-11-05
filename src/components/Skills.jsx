import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: <FaCode className="text-4xl text-primary" />,
    skills: [
      {
        name: 'Python',
        icon: <FaPython className="text-2xl text-[#3776AB]" />,
        level: 90,
        years: '3+'
      },
      {
        name: 'JavaScript',
        icon: <SiJavascript className="text-2xl text-[#F7DF1E]" />,
        level: 85,
        years: '2+'
      },
      {
        name: 'TypeScript',
        icon: <SiJavascript className="text-2xl text-[#3178C6]" />,
        level: 80,
        years: '1+'
      },
      { 
        name: 'HTML5', 
        icon: <FaHtml5 className="text-2xl text-[#E34F26]" />,
        level: 95,
        years: '3+'
      },
      { 
        name: 'CSS3', 
        icon: <FaCss3Alt className="text-2xl text-[#1572B6]" />,
        level: 90,
        years: '3+'
      }
    ]
  },
  {
    title: 'Frameworks & Libraries',
    icon: <FaTools className="text-4xl text-primary" />,
    skills: [
      {
        name: 'Django',
        icon: <SiDjango className="text-2xl text-[#092E20]" />,
        level: 90,
        years: '3+'
      },
      { 
        name: 'Flask', 
        icon: <FaPython className="text-2xl text-[#000000]" />,
        level: 75,
        years: '2+'
      },
      {
        name: 'Django REST Framework',
        icon: <SiDjango className="text-2xl text-[#44B78B]" />,
        level: 88,
        years: '2+'
      },
      {
        name: 'Next.js',
        icon: <SiNextdotjs className="text-2xl text-[#000000]" />,
        level: 82,
        years: '1+'
      },
      {
        name: 'React.js',
        icon: <FaReact className="text-2xl text-[#61DAFB]" />,
        level: 85,
        years: '2+'
      },
      {
        name: 'Node.js',
        icon: <FaServer className="text-2xl text-[#339933]" />,
        level: 80,
        years: '2+'
      },
      {
        name: 'Express.js',
        icon: <SiExpress className="text-2xl text-[#000000]" />,
        level: 78,
        years: '1+'
      },
      {
        name: 'NestJS',
        icon: <SiNestjs className="text-2xl text-[#E0234E]" />,
        level: 75,
        years: '1+'
      },
      { 
        name: 'Odoo', 
        icon: <FaCode className="text-2xl text-[#814C94]" />,
        level: 70,
        years: '1+'
      },
      { 
        name: 'jQuery', 
        icon: <FaCode className="text-2xl text-[#0769AD]" />,
        level: 80,
        years: '2+'
      },
      {
        name: 'Bootstrap',
        icon: <FaBootstrap className="text-2xl text-[#7952B3]" />,
        level: 90,
        years: '3+'
      },
      {
        name: 'Tailwind CSS',
        icon: <SiTailwindcss className="text-2xl text-[#06B6D4]" />,
        level: 92,
        years: '2+'
      }
    ]
  },
  {
    title: 'DevOps & Tools',
    icon: <FaServer className="text-4xl text-primary" />,
    skills: [
      {
        name: 'Docker',
        icon: <FaDocker className="text-2xl text-[#2496ED]" />,
        level: 85,
        years: '2+'
      },
      { 
        name: 'Git', 
        icon: <FaGitAlt className="text-2xl text-[#F05032]" />,
        level: 90,
        years: '3+'
      },
      { 
        name: 'GitHub', 
        icon: <FaCode className="text-2xl text-[#181717]" />,
        level: 88,
        years: '3+'
      },
      { 
        name: 'Linux', 
        icon: <FaLinux className="text-2xl text-[#FCC624]" />,
        level: 85,
        years: '3+'
      },
      {
        name: 'Shell Scripting',
        icon: <FaCode className="text-2xl text-[#89E051]" />,
        level: 80,
        years: '2+'
      },
      { 
        name: 'Bash', 
        icon: <FaLinux className="text-2xl text-[#4EAA25]" />,
        level: 82,
        years: '2+'
      },
      {
        name: 'Apache',
        icon: <SiApache className="text-2xl text-[#D22128]" />,
        level: 75,
        years: '2+'
      },
      {
        name: 'Nginx',
        icon: <SiNginx className="text-2xl text-[#009639]" />,
        level: 78,
        years: '1+'
      },
      {
        name: 'Vercel',
        icon: <SiVercel className="text-2xl text-[#000000]" />,
        level: 85,
        years: '1+'
      },
      {
        name: 'Red Hat',
        icon: <SiRedhat className="text-2xl text-[#EE0000]" />,
        level: 70,
        years: '1+'
      }
    ]
  },
  {
    title: 'Databases & ORMs',
    icon: <FaDatabase className="text-4xl text-primary" />,
    skills: [
      {
        name: 'PostgreSQL',
        icon: <SiPostgresql className="text-2xl text-[#4169E1]" />,
        level: 85,
        years: '2+'
      },
      { 
        name: 'MySQL', 
        icon: <SiMysql className="text-2xl text-[#4479A1]" />,
        level: 80,
        years: '2+'
      },
      {
        name: 'MongoDB',
        icon: <SiMongodb className="text-2xl text-[#47A248]" />,
        level: 78,
        years: '1+'
      },
      {
        name: 'SQLite',
        icon: <FaDatabase className="text-2xl text-[#003B57]" />,
        level: 82,
        years: '2+'
      },
      {
        name: 'Prisma',
        icon: <SiPrisma className="text-2xl text-[#2D3748]" />,
        level: 75,
        years: '1+'
      },
      {
        name: 'TypeORM',
        icon: <FaDatabase className="text-2xl text-[#FE0803]" />,
        level: 72,
        years: '1+'
      }
    ]
  },
  {
    title: 'Real-Time & APIs',
    icon: <FaServer className="text-4xl text-primary" />,
    skills: [
      {
        name: 'Socket.io',
        icon: <SiSocketdotio className="text-2xl text-[#010101]" />,
        level: 75,
        years: '1+'
      },
      {
        name: 'REST APIs',
        icon: <FaCode className="text-2xl text-[#61DAFB]" />,
        level: 90,
        years: '3+'
      }
    ]
  },

  {
    title: 'Cybersecurity',
    icon: <FaShieldAlt className="text-4xl text-primary" />,
    skills: [
      {
        name: 'Network Security',
        icon: <FaShieldAlt className="text-2xl text-[#4CAF50]" />,
        level: 70,
        years: '1+'
      },
      {
        name: 'Red Hat Admin 1',
        icon: <SiRedhat className="text-2xl text-[#EE0000]" />,
        level: 68,
        years: '1+'
      }
    ]
  },
  {
    title: 'Project Management',
    icon: <FaProjectDiagram className="text-4xl text-primary" />,
    skills: [
      {
        name: 'Agile',
        icon: <FaProjectDiagram className="text-2xl text-[#0079BF]" />,
        level: 85,
        years: '2+'
      },
      {
        name: 'Trello',
        icon: <FaProjectDiagram className="text-2xl text-[#0079BF]" />,
        level: 80,
        years: '2+'
      },
      {
        name: 'Notion',
        icon: <SiNotion className="text-2xl text-[#000000]" />,
        level: 75,
        years: '1+'
      }
    ]
  },
  {
    title: 'Soft Skills',
    icon: <FaGraduationCap className="text-4xl text-primary" />,
    skills: [
      {
        name: 'Communication',
        icon: <FaCode className="text-2xl text-[#2196F3]" />,
        level: 90,
        years: '3+'
      },
      {
        name: 'Presentation',
        icon: <FaCode className="text-2xl text-[#FF9800]" />,
        level: 85,
        years: '2+'
      },
      {
        name: 'Problem Solving',
        icon: <FaCode className="text-2xl text-[#4CAF50]" />,
        level: 92,
        years: '3+'
      },
      {
        name: 'Time Management',
        icon: <FaCode className="text-2xl text-[#9C27B0]" />,
        level: 88,
        years: '3+'
      },
      {
        name: 'Adaptability',
        icon: <FaCode className="text-2xl text-[#FF5722]" />,
        level: 90,
        years: '3+'
      }
    ]
  }
];

const SkillCard = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[rgb(var(--card))] p-6 rounded-xl border border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] transition-all duration-300 hover:shadow-lg hover:shadow-[rgb(var(--primary))]/10">
      <div className="flex items-center mb-6">
        <div className="bg-[rgb(var(--primary))]/10 p-3 rounded-lg">
          {category.icon}
        </div>
        <h3 className="text-xl font-bold ml-4">{category.title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {category.skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[rgb(var(--muted))] transition-colors duration-200 group">
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
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Get unique categories for filter tabs
  const categories = ['All', ...skillCategories.map(cat => cat.title)];

  // Filter skills based on selected category and search query
  const filteredCategories = skillCategories.filter(category => {
    const matchesCategory = selectedCategory === 'All' || category.title === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.skills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">Skills & Expertise</h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and areas of expertise with proficiency levels.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-auto mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[rgb(var(--muted-foreground))]" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl focus:outline-none focus:border-[rgb(var(--primary))] transition-colors duration-300 text-[rgb(var(--foreground))]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors">
                <FaTimes />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[rgb(var(--primary))] text-white shadow-lg shadow-[rgb(var(--primary))]/30'
                  : 'bg-[rgb(var(--card))] text-[rgb(var(--foreground))] border border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]'
              }`}>
              {category}
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
                <SkillCard key={category.title} category={category} index={index} />
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
                No skills found matching "{searchQuery}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Skills;
