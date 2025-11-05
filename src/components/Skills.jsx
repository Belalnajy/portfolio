import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  FaGraduationCap
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
        icon: <FaPython className="text-2xl text-[#3776AB]" />
      },
      {
        name: 'JavaScript',
        icon: <SiJavascript className="text-2xl text-[#F7DF1E]" />
      },
      {
        name: 'TypeScript',
        icon: <SiJavascript className="text-2xl text-[#3178C6]" />
      },
      { name: 'HTML5', icon: <FaHtml5 className="text-2xl text-[#E34F26]" /> },
      { name: 'CSS3', icon: <FaCss3Alt className="text-2xl text-[#1572B6]" /> }
    ]
  },
  {
    title: 'Frameworks & Libraries',
    icon: <FaTools className="text-4xl text-primary" />,
    skills: [
      {
        name: 'Django',
        icon: <SiDjango className="text-2xl text-[#092E20]" />
      },
      { name: 'Flask', icon: <FaPython className="text-2xl text-[#000000]" /> },
      {
        name: 'Django REST Framework',
        icon: <SiDjango className="text-2xl text-[#44B78B]" />
      },
      {
        name: 'Next.js',
        icon: <SiNextdotjs className="text-2xl text-[#000000]" />
      },
      {
        name: 'React.js',
        icon: <FaReact className="text-2xl text-[#61DAFB]" />
      },
      {
        name: 'Node.js',
        icon: <FaServer className="text-2xl text-[#339933]" />
      },
      {
        name: 'Express.js',
        icon: <SiExpress className="text-2xl text-[#000000]" />
      },
      {
        name: 'NestJS',
        icon: <SiNestjs className="text-2xl text-[#E0234E]" />
      },
      { name: 'Odoo', icon: <FaCode className="text-2xl text-[#814C94]" /> },
      { name: 'jQuery', icon: <FaCode className="text-2xl text-[#0769AD]" /> },
      {
        name: 'Bootstrap',
        icon: <FaBootstrap className="text-2xl text-[#7952B3]" />
      },
      {
        name: 'Tailwind CSS',
        icon: <SiTailwindcss className="text-2xl text-[#06B6D4]" />
      }
    ]
  },
  {
    title: 'DevOps & Tools',
    icon: <FaServer className="text-4xl text-primary" />,
    skills: [
      {
        name: 'Docker',
        icon: <FaDocker className="text-2xl text-[#2496ED]" />
      },
      { name: 'Git', icon: <FaGitAlt className="text-2xl text-[#F05032]" /> },
      { name: 'GitHub', icon: <FaCode className="text-2xl text-[#181717]" /> },
      { name: 'Linux', icon: <FaLinux className="text-2xl text-[#FCC624]" /> },
      {
        name: 'Shell Scripting',
        icon: <FaCode className="text-2xl text-[#89E051]" />
      },
      { name: 'Bash', icon: <FaLinux className="text-2xl text-[#4EAA25]" /> },
      {
        name: 'Apache',
        icon: <SiApache className="text-2xl text-[#D22128]" />
      },
      {
        name: 'Nginx',
        icon: <SiNginx className="text-2xl text-[#009639]" />
      },
      {
        name: 'Vercel',
        icon: <SiVercel className="text-2xl text-[#000000]" />
      },
      {
        name: 'Red Hat',
        icon: <SiRedhat className="text-2xl text-[#EE0000]" />
      }
    ]
  },
  {
    title: 'Databases & ORMs',
    icon: <FaDatabase className="text-4xl text-primary" />,
    skills: [
      {
        name: 'PostgreSQL',
        icon: <SiPostgresql className="text-2xl text-[#4169E1]" />
      },
      { name: 'MySQL', icon: <SiMysql className="text-2xl text-[#4479A1]" /> },
      {
        name: 'MongoDB',
        icon: <SiMongodb className="text-2xl text-[#47A248]" />
      },
      {
        name: 'SQLite',
        icon: <FaDatabase className="text-2xl text-[#003B57]" />
      },
      {
        name: 'Prisma',
        icon: <SiPrisma className="text-2xl text-[#2D3748]" />
      },
      {
        name: 'TypeORM',
        icon: <FaDatabase className="text-2xl text-[#FE0803]" />
      }
    ]
  },
  {
    title: 'Real-Time & APIs',
    icon: <FaServer className="text-4xl text-primary" />,
    skills: [
      {
        name: 'Socket.io',
        icon: <SiSocketdotio className="text-2xl text-[#010101]" />
      },
      {
        name: 'REST APIs',
        icon: <FaCode className="text-2xl text-[#61DAFB]" />
      }
    ]
  },

  {
    title: 'Cybersecurity',
    icon: <FaShieldAlt className="text-4xl text-primary" />,
    skills: [
      {
        name: 'Network Security',
        icon: <FaShieldAlt className="text-2xl text-[#4CAF50]" />
      },
      {
        name: 'Red Hat Admin 1',
        icon: <SiRedhat className="text-2xl text-[#EE0000]" />
      }
    ]
  },
  {
    title: 'Project Management',
    icon: <FaProjectDiagram className="text-4xl text-primary" />,
    skills: [
      {
        name: 'Agile',
        icon: <FaProjectDiagram className="text-2xl text-[#0079BF]" />
      },
      {
        name: 'Trello',
        icon: <FaProjectDiagram className="text-2xl text-[#0079BF]" />
      },
      {
        name: 'Notion',
        icon: <SiNotion className="text-2xl text-[#000000]" />
      }
    ]
  },
  {
    title: 'Soft Skills',
    icon: <FaGraduationCap className="text-4xl text-primary" />,
    skills: [
      {
        name: 'Communication',
        icon: <FaCode className="text-2xl text-[#2196F3]" />
      },
      {
        name: 'Presentation',
        icon: <FaCode className="text-2xl text-[#FF9800]" />
      },
      {
        name: 'Problem Solving',
        icon: <FaCode className="text-2xl text-[#4CAF50]" />
      },
      {
        name: 'Time Management',
        icon: <FaCode className="text-2xl text-[#9C27B0]" />
      },
      {
        name: 'Adaptability',
        icon: <FaCode className="text-2xl text-[#FF5722]" />
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
      className="bg-[rgb(var(--card))] p-6 rounded-xl border border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] transition-colors duration-300 ">
      <div className="flex items-center mb-6">
        <div className="bg-[rgb(var(--primary))]/10 p-3 rounded-lg">
          {category.icon}
        </div>
        <h3 className="text-xl font-bold ml-4">{category.title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {category.skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[rgb(var(--muted))] transition-colors duration-200">
            <div className="bg-[rgb(var(--background))] p-2 rounded-lg">
              {skill.icon}
            </div>
            <p className="text-[rgb(var(--foreground))] font-semibold">
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

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and areas of
            expertise.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <SkillSkeleton key={index} index={index} />
              ))
            : skillCategories.map((category, index) => (
                <SkillCard key={index} category={category} index={index} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
