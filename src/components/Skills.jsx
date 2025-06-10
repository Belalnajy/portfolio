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
import {
  SiDjango,
  SiPostgresql,
  SiMysql,
  SiJavascript,
  SiTailwindcss,
  SiApache,
  SiRedhat
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
        name: 'React.js',
        icon: <FaReact className="text-2xl text-[#61DAFB]" />
      },
      {
        name: 'Node.js',
        icon: <FaServer className="text-2xl text-[#339933]" />
      },
      {
        name: 'Express.js',
        icon: <FaServer className="text-2xl text-[#000000]" />
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
        name: 'Red Hat',
        icon: <SiRedhat className="text-2xl text-[#EE0000]" />
      }
    ]
  },
  {
    title: 'Databases',
    icon: <FaDatabase className="text-4xl text-primary" />,
    skills: [
      {
        name: 'PostgreSQL',
        icon: <SiPostgresql className="text-2xl text-[#4169E1]" />
      },
      { name: 'MySQL', icon: <SiMysql className="text-2xl text-[#4479A1]" /> }
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
        name: 'Trello',
        icon: <FaProjectDiagram className="text-2xl text-[#0079BF]" />
      }
    ]
  },
  {
    title: 'Soft Skills',
    icon: <FaGraduationCap className="text-4xl text-primary" />,
    skills: [
      {
        name: 'Communication Skills',
        icon: <FaCode className="text-2xl text-[#2196F3]" />
      },
      {
        name: 'Presentation Skills',
        icon: <FaCode className="text-2xl text-[#FF9800]" />
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
          {skillCategories.map((category, index) => (
            <SkillCard key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
