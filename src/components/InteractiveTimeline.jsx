import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const InteractiveTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'S&F (Saudi Arabia)',
      location: 'Remote, Saudi Arabia',
      period: '07/2025 - Present',
      type: 'work',
      icon: <FaBriefcase />,
      color: 'from-blue-500 to-cyan-500',
      description: [
        'Built and maintained full-stack applications using Django, Node.js, React.js, and PostgreSQL',
        'Designed and deployed backend services & RESTful APIs for web and mobile apps',
        'Improved database performance and ensured application scalability',
      ],
    },
    {
      title: 'External Instructor - Front-End Development',
      company: 'Information Technology Institute (ITI)',
      location: 'Remote, Egypt',
      period: '07/2025 - 10/2025',
      type: 'work',
      icon: <FaLaptopCode />,
      color: 'from-purple-500 to-pink-500',
      description: [
        'Taught Front-End Development (HTML, CSS, JavaScript) to more than 200 students',
        'Designed and delivered practical coding sessions and real-world project guidance',
      ],
    },
    {
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      location: 'Remote, Egypt',
      period: '03/2025 - Present',
      type: 'work',
      icon: <FaLaptopCode />,
      color: 'from-green-500 to-emerald-500',
      description: [
        'Built full-stack, production-ready web apps for Gulf clients',
        'Delivered scalable, multilingual, and RTL-supported platforms',
        'Used React, Next.js, NestJS, Django, and PostgreSQL',
      ],
    },
    {
      title: 'Full Stack Development Using Python Intern',
      company: 'Information Technology Institute (ITI)',
      location: 'Hybrid, Egypt',
      period: '11/2024 - 04/2025',
      type: 'education',
      icon: <FaGraduationCap />,
      color: 'from-orange-500 to-red-500',
      description: [
        'Worked on hands-on projects covering Python, Django, databases, and front-end technologies',
      ],
    },
    {
      title: 'IT Infrastructure Intern',
      company: 'Al Ezz Dekheila Steel Co. EZDK',
      location: 'Alexandria, Egypt',
      period: '09/2022 - 10/2022',
      type: 'work',
      icon: <FaBriefcase />,
      color: 'from-yellow-500 to-amber-500',
      description: [
        'Gained hands-on experience in IT infrastructure and software development',
        'Assisted in software development tasks and IT support',
      ],
    },
    {
      title: 'Bachelor of Business (MIS)',
      company: 'Alexandria University',
      location: 'Alexandria, Egypt',
      period: '07/2019 - 07/2023',
      type: 'education',
      icon: <FaGraduationCap />,
      color: 'from-indigo-500 to-purple-500',
      description: [
        'Graduated with Very Good (GPA: 3.265)',
        'Graduation Project: Jewellery Store Website | Grade: A',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            Experience & Education
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg">
            My professional journey and academic background
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[rgb(var(--primary))]/40 via-[rgb(var(--primary))]/20 to-[rgb(var(--primary))]/40 hidden md:block" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}>
                {/* Content */}
                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className={`glass-card glass-hover p-6 rounded-xl cursor-pointer relative ${
                      activeIndex === index
                        ? 'ring-2 ring-[rgb(var(--primary))] shadow-xl shadow-[rgb(var(--primary))]/20'
                        : ''
                    }`}>
                    <div className="flex items-start justify-between mb-4 gap-3">
                      <div className="flex items-start flex-1 min-w-0">
                        <div className="w-14 h-14 rounded-xl bg-[rgb(var(--primary))]/10 flex items-center justify-center text-[rgb(var(--primary))] text-xl mr-4 border border-[rgb(var(--primary))]/20 flex-shrink-0">
                          {exp.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-[rgb(var(--foreground))] mb-1 leading-tight">
                            {exp.title}
                          </h3>
                          <p className="text-[rgb(var(--primary))] text-sm font-semibold">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                      {/* Type badge */}
                      <div className="flex-shrink-0">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))] whitespace-nowrap">
                          {exp.type === 'work' ? '💼 Work' : '🎓 Education'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 text-xs text-[rgb(var(--muted-foreground))] mb-4 relative">
                      <span className="flex items-center gap-1 bg-[rgb(var(--muted))]/50 px-3 py-1.5 rounded-full whitespace-nowrap">
                        <span>📅</span> {exp.period}
                      </span>
                      <span className="flex items-center gap-1 bg-[rgb(var(--muted))]/50 px-3 py-1.5 rounded-full whitespace-nowrap">
                        <span>📍</span> {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-2.5 relative">
                      {exp.description.map((desc, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-sm flex items-start text-[rgb(var(--foreground))] leading-relaxed">
                          <span className="text-[rgb(var(--primary))] mr-2 mt-0.5 font-bold">
                            ▸
                          </span>
                          <span>{desc}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Center Dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 items-center justify-center">
                  <motion.div
                    animate={{
                      scale: activeIndex === index ? 1.3 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-6 h-6 rounded-full ${
                      activeIndex === index
                        ? 'bg-[rgb(var(--primary))] ring-4 ring-[rgb(var(--primary))]/30 shadow-xl shadow-[rgb(var(--primary))]/50'
                        : 'bg-[rgb(var(--foreground))] ring-4 ring-[rgb(var(--background))] shadow-lg'
                    }`}
                  />
                </div>

                {/* Spacer */}
                <div className="w-full md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTimeline;
