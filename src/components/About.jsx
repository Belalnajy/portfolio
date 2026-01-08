import { motion } from 'framer-motion';
import {
  FaUser,
  FaCode,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaRocket,
  FaHeart,
  FaLightbulb,
} from 'react-icons/fa';

const About = () => {
  const highlights = [
    {
      icon: <FaRocket />,
      title: 'Fast Learner',
      description: 'Quick to adapt to new technologies and frameworks',
    },
    {
      icon: <FaHeart />,
      title: 'Passionate',
      description: 'Love building elegant solutions to complex problems',
    },
    {
      icon: <FaLightbulb />,
      title: 'Creative',
      description: 'Always thinking of innovative ways to improve UX',
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            About Me
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg">
            Full Stack Developer experienced in building scalable, multilingual
            web applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6">
            <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Personal Information
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: <FaUser />,
                  label: 'Name',
                  value: 'Belal Nagy',
                  color: 'blue',
                },
                {
                  icon: <FaCode />,
                  label: 'Role',
                  value: 'Full Stack Developer',
                  color: 'purple',
                },
                {
                  icon: <FaGraduationCap />,
                  label: 'Education',
                  value: 'Bachelor of Business (MIS)',
                  color: 'pink',
                },
                {
                  icon: <FaMapMarkerAlt />,
                  label: 'Location',
                  value: 'Alexandria, Egypt',
                  color: 'cyan',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center space-x-4 glass-card glass-hover p-4 rounded-xl cursor-pointer">
                  <div
                    className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 p-3 rounded-lg`}>
                    <div className="text-white text-xl">{item.icon}</div>
                  </div>
                  <div>
                    <h4 className="text-[rgb(var(--foreground))] font-semibold">
                      {item.label}
                    </h4>
                    <p className="text-[rgb(var(--muted-foreground))]">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6">
            <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professional Summary
            </h3>
            <div className="glass-card p-6 rounded-xl space-y-4">
              <p className="text-[rgb(var(--foreground))] leading-relaxed">
                Full Stack Developer experienced in building{' '}
                <span className="text-[rgb(var(--primary))] font-semibold">
                  scalable, multilingual web applications
                </span>{' '}
                using React.js, Next.js, Django, NestJS, and PostgreSQL.
                Currently working at{' '}
                <span className="text-[rgb(var(--primary))] font-semibold">
                  S&F (Saudi Arabia)
                </span>{' '}
                developing full-stack applications and backend services for web
                and mobile platforms.
              </p>
              <p className="text-[rgb(var(--foreground))] leading-relaxed">
                Completed the ITI Full Stack program and served as an{' '}
                <span className="text-[rgb(var(--primary))] font-semibold">
                  External Instructor at ITI
                </span>
                , teaching Front-End Development to{' '}
                <span className="text-[rgb(var(--primary))] font-semibold">
                  200+ students
                </span>
                . Delivered AI-integrated, RTL-ready platforms for Saudi
                startups and universities, focused on modern UI/UX and real-time
                systems.
              </p>
              <p className="text-[rgb(var(--foreground))] leading-relaxed">
                Passionate about creating efficient, scalable solutions with
                expertise in multilingual platforms, real-time features, and
                modern development practices. Always eager to learn new
                technologies and deliver production-ready applications.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="glass-card glass-hover p-6 rounded-xl text-center cursor-pointer">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl mb-4">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold mb-2 text-[rgb(var(--foreground))]">
                {item.title}
              </h4>
              <p className="text-[rgb(var(--muted-foreground))]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
