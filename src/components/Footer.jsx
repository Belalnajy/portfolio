import { Link } from "react-scroll";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaArrowUp,
} from "react-icons/fa";
import PlatformLinks from "./PlatformLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
    { name: "Skills", to: "skills" },
    { name: "Services", to: "services" },
    { name: "Testimonials", to: "testimonials" },
    { name: "Contact", to: "contact" },
  ];

  const services = [
    "Full Stack Development",
    "Frontend Development",
    "Backend Development",
    "API Development",
    "Database Design",
    "UI/UX Implementation",
  ];

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      text: "belalnajy9@gmail.com",
      href: "mailto:belalnajy9@gmail.com",
    },
    {
      icon: <FaMapMarkerAlt />,
      text: "Alexandria, Egypt",
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: <FaGithub />,
      href: "https://github.com/Belalnajy",
      label: "GitHub",
      color: "hover:text-gray-400",
    },
    {
      icon: <FaLinkedin />,
      href: "https://linkedin.com/in/belalnajy",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: <FaEnvelope />,
      href: "mailto:belalnajy9@gmail.com",
      label: "Email",
      color: "hover:text-red-400",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[rgb(var(--card))] text-[rgb(var(--foreground))] pt-16 pb-8 overflow-hidden border-t border-[rgb(var(--border))]">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] bg-[size:20px_20px] opacity-5" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Belal Nagy
            </h3>
            <p className="text-[rgb(var(--muted-foreground))] mb-6 leading-relaxed">
              Full Stack Developer passionate about building scalable,
              high-performance web applications and transforming complex ideas
              into elegant user experiences.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) =>
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] ${social.color} transition-all shadow-lg hover:shadow-xl`}
                  aria-label={social.label}>
                  <div className="text-xl">
                    {social.icon}
                  </div>
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            <h3 className="text-xl font-bold mb-4 text-[rgb(var(--foreground))]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) =>
                <li key={index}>
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    duration={300}
                    offset={-70}
                    className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors cursor-pointer inline-block hover:translate-x-2 transform duration-200">
                    ▸ {link.name}
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className="text-xl font-bold mb-4 text-[rgb(var(--foreground))]">
              Services
            </h3>
            <ul className="space-y-2">
              {services.map((service, index) =>
                <li
                  key={index}
                  className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors cursor-pointer">
                  ▸ {service}
                </li>
              )}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}>
            <h3 className="text-xl font-bold mb-4 text-[rgb(var(--foreground))]">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) =>
                <li key={index} className="flex items-start space-x-3">
                  <div className="text-[rgb(var(--primary))] mt-1">
                    {info.icon}
                  </div>
                  {info.href
                    ? <a
                        href={info.href}
                        className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors">
                        {info.text}
                      </a>
                    : <span className="text-[rgb(var(--muted-foreground))]">
                        {info.text}
                      </span>}
                </li>
              )}
            </ul>

            {/* Newsletter or CTA */}
            <div className="mt-6">
              <Link
                to="contact"
                spy={true}
                smooth={true}
                duration={300}
                offset={-70}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                  Contact Me
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-[rgb(var(--border))] mb-8" />

        {/* Platform Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 text-center">
          <h4 className="text-lg font-bold mb-4 text-[rgb(var(--foreground))]">
            Follow me on Arabic platforms
          </h4>
          <PlatformLinks variant="footer" />
        </motion.div>

        {/* Divider */}
        <div className="border-t border-[rgb(var(--border))] mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[rgb(var(--muted-foreground))] text-sm text-center md:text-left">
            © {currentYear} Belal Nagy. All rights reserved. Built using React &
            Tailwind CSS
          </motion.p>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center space-x-2 bg-[rgb(var(--muted))] hover:bg-[rgb(var(--primary))] text-[rgb(var(--foreground))] hover:text-white px-4 py-2 rounded-lg transition-all shadow-lg hover:shadow-xl"
            aria-label="Back to top">
            <span className="text-sm font-medium">Back to Top</span>
            <FaArrowUp />
          </motion.button>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center">
          <p className="text-[rgb(var(--muted-foreground))] text-xs">
            Designed & Developed by Belal Nagy | Open for freelance
            opportunities
          </p>
        </motion.div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
    </footer>
  );
};

export default Footer;
