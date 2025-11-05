import { motion } from "framer-motion";
import {
  FaCode,
  FaLaptopCode,
  FaMobile,
  FaDatabase,
  FaServer,
  FaPaintBrush,
  FaRocket,
  FaChartLine,
  FaGlobe,
  FaCogs,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: <FaLaptopCode />,
      title: "Full Stack Development",
      description:
        "End-to-end web application development using modern technologies like React, Next.js, Django, NestJS, and PostgreSQL.",
      features: [
        "Custom Web Applications",
        "RESTful API Development",
        "Database Design & Optimization",
        "Authentication & Authorization",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaCode />,
      title: "Frontend Development",
      description:
        "Building responsive, interactive, and user-friendly interfaces with modern frameworks and best practices.",
      features: [
        "React.js & Next.js Applications",
        "Responsive UI/UX Design",
        "Performance Optimization",
        "Cross-browser Compatibility",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FaServer />,
      title: "Backend Development",
      description:
        "Robust and scalable server-side solutions with secure APIs and efficient database management.",
      features: [
        "Django & NestJS APIs",
        "Database Architecture",
        "Server Configuration",
        "API Integration",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FaMobile />,
      title: "Mobile-Ready Solutions",
      description:
        "Developing mobile-responsive web applications and backend services for mobile apps.",
      features: [
        "Progressive Web Apps (PWA)",
        "Mobile-First Design",
        "Backend for Mobile Apps",
        "Real-time Features",
      ],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <FaGlobe />,
      title: "Multilingual & RTL Support",
      description:
        "Building applications with full support for multiple languages and Right-to-Left (RTL) layouts.",
      features: [
        "Arabic & English Support",
        "RTL Layout Implementation",
        "i18n Integration",
        "Cultural Adaptation",
      ],
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <FaDatabase />,
      title: "Database Management",
      description:
        "Designing and optimizing databases for performance, scalability, and data integrity.",
      features: [
        "PostgreSQL & MySQL",
        "MongoDB & NoSQL",
        "Query Optimization",
        "Data Migration",
      ],
      color: "from-yellow-500 to-amber-500",
    },
    {
      icon: <FaRocket />,
      title: "Deployment & DevOps",
      description:
        "Setting up CI/CD pipelines, containerization, and cloud deployment for seamless delivery.",
      features: [
        "Docker Containerization",
        "Vercel & Cloud Deployment",
        "Server Configuration",
        "Performance Monitoring",
      ],
      color: "from-teal-500 to-cyan-500",
    },
    {
      icon: <FaCogs />,
      title: "API Integration",
      description:
        "Integrating third-party services and APIs to extend application functionality.",
      features: [
        "Payment Gateway Integration",
        "Social Media APIs",
        "Email Services (EmailJS)",
        "Custom API Development",
      ],
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <FaPaintBrush />,
      title: "UI/UX Design Implementation",
      description:
        "Transforming designs into pixel-perfect, interactive web experiences.",
      features: [
        "Figma to Code",
        "Animation & Transitions",
        "Modern Design Systems",
        "Accessibility Standards",
      ],
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: <FaShieldAlt />,
      title: "Security & Authentication",
      description:
        "Implementing secure authentication systems and protecting applications from vulnerabilities.",
      features: [
        "JWT Authentication",
        "Role-Based Access Control",
        "Data Encryption",
        "Security Best Practices",
      ],
      color: "from-red-500 to-orange-500",
    },
    {
      icon: <FaChartLine />,
      title: "Performance Optimization",
      description:
        "Analyzing and improving application performance for better user experience.",
      features: [
        "Code Optimization",
        "Database Query Tuning",
        "Caching Strategies",
        "Load Time Reduction",
      ],
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <FaUsers />,
      title: "Consulting & Training",
      description:
        "Providing technical guidance and training for teams and individuals.",
      features: [
        "Code Review & Mentoring",
        "Technical Consultation",
        "Frontend Training",
        "Best Practices Guidance",
      ],
      color: "from-emerald-500 to-green-500",
    },
  ];

  return (
    <section id="services" className="py-20 relative">

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            Services I Offer
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg">
            Comprehensive web development services tailored to bring your ideas
            to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card glass-hover p-6 rounded-xl cursor-pointer group">
              {/* Icon */}
              <div className="mb-6">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} text-white text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))] transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[rgb(var(--muted-foreground))] mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="text-sm text-[rgb(var(--foreground))] flex items-start">
                    <span className="text-[rgb(var(--primary))] mr-2 mt-1">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover Effect Line */}
              <div
                className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${service.color} rounded-full transition-all duration-500`}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center">
          <p className="text-[rgb(var(--muted-foreground))] text-lg mb-6">
            Ready to start your project?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
            Get in Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
