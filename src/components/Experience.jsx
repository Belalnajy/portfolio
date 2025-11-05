import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaGraduationCap } from 'react-icons/fa';
import ExperienceCard from './ExperienceCard';
import ExperienceSkeleton from './skeletons/ExperienceSkeleton';

const Experience = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'S&F (Saudi Arabia)',
      location: 'Remote, Saudi Arabia',
      period: '07/2025 - Present',
      type: 'work',
      icon: <FaLaptopCode />,
      description: [
        'Built and maintained full-stack applications using Django, Node.js, React.js, and PostgreSQL',
        'Designed and deployed backend services & RESTful APIs for web and mobile apps',
        'Improved database performance and ensured application scalability',
        'Collaborated with a remote agile team to deliver core product features'
      ]
    },
    {
      title: 'External Instructor - Front-End Development',
      company: 'Information Technology Institute (ITI)',
      location: 'Remote, Egypt',
      period: '07/2025 - 10/2025',
      type: 'work',
      icon: <FaLaptopCode />,
      description: [
        'Taught Front-End Development (HTML, CSS, JavaScript) to more than 200 students',
        'Designed and delivered practical coding sessions and real-world project guidance'
      ]
    },
    {
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      location: 'Remote, Egypt',
      period: '03/2025 - Present',
      type: 'work',
      icon: <FaLaptopCode />,
      description: [
        'Built full-stack, production-ready web apps for Gulf clients, including Saudi startups and universities',
        'Delivered scalable, multilingual, and RTL-supported platforms like fleet, journal, and e-commerce systems',
        'Used React, Next.js, NestJS, Django, and PostgreSQL with focus on performance and modern UI/UX',
        'Implemented real-time features to enhance business operations'
      ]
    },
    {
      title: 'Full Stack Development Using Python Intern',
      company: 'Information Technology Institute (ITI)',
      location: 'Hybrid, Egypt',
      period: '11/2024 - 04/2025',
      type: 'work',
      icon: <FaLaptopCode />,
      description: [
        'Worked on hands-on projects covering Python, Django, databases, and front-end technologies'
      ]
    },
    {
      title: 'IT Infrastructure Intern',
      company: 'Al Ezz Dekheila Steel Co. EZDK',
      location: 'Alexandria, Egypt',
      period: '09/2022 - 10/2022',
      type: 'work',
      icon: <FaLaptopCode />,
      description: [
        'Gained hands-on experience in IT infrastructure and software development in a corporate setting',
        'Assisted in software development tasks and IT support'
      ]
    },
    {
      title:
        'Bachelor of Business (English Section), Management Information System(MIS)',
      company: 'Alexandria University',
      location: 'Alexandria, Egypt',
      period: '07/2019 - 07/2023',
      type: 'education',
      icon: <FaGraduationCap />,
      description: [
        'Graduated with Very Good (GPA: 3.265)',
        'Graduation Project: Jewellery Store Website | Grade: A'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Experience & Education</h2>
          <p className="text-[rgb(var(--muted-foreground))]">
            My professional journey and academic background
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ExperienceSkeleton key={index} index={index} />
              ))
            : experiences.map((experience, index) => (
                <ExperienceCard key={index} experience={experience} index={index} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
