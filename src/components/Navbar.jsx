import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import MagneticButton from "./MagneticButton";

const Navbar = ({ onDownloadCV }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = ["home", "about", "experience", "projects", "skills", "services", "testimonials", "contact"];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const navItems = [
    { label: "Home", to: "home" },
    { label: "About", to: "about" },
    { label: "Experience", to: "experience" },
    { label: "Projects", to: "projects" },
    { label: "Skills", to: "skills" },
    { label: "Services", to: "services" },
    { label: "Testimonials", to: "testimonials" },
    { label: "Contact", to: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled
        ? "bg-[rgb(var(--card))]/90 backdrop-blur-3xl shadow-2xl border-b border-[rgb(var(--border))]"
        : "bg-transparent"}`}>
      {/* Animated gradient line on top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        animate={{
          opacity: scrolled ? [0.3, 0.6, 0.3] : 0,
          scaleX: scrolled ? [0.8, 1, 0.8] : 0,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with enhanced animation */}
          <Link to="home" smooth={true} duration={500}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer group relative">
              <div className="relative">
                {/* Glow effect behind logo */}
                <motion.div
                  className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <span className="relative text-2xl font-bold text-[rgb(var(--foreground))] tracking-tight flex items-center gap-2">
                  <span className="bg-gradient-to-r from-[rgb(var(--foreground))] via-[rgb(var(--primary))] to-[rgb(var(--foreground))] bg-clip-text text-transparent">
                    Belal Nagy
                  </span>
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <HiSparkles className="w-4 h-4" />
                  </motion.span>
                </span>

                {/* Animated underline */}
                <motion.div
                  className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation - Enhanced pill design */}
          <div className="hidden md:flex items-center">
            <motion.div
              className="relative flex items-center gap-1 px-3 py-2 rounded-full bg-[rgb(var(--card))]/80 backdrop-blur-xl border border-[rgb(var(--border))] shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}>
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {navItems.map((item, index) =>
                <Link
                  key={item.label}
                  to={item.to}
                  spy={false}
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="cursor-pointer relative">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeSection ===
                    item.to
                      ? "text-[rgb(var(--primary))] font-semibold"
                      : "text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"}`}>
                    {/* Active indicator with gradient */}
                    {activeSection === item.to &&
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-full border border-blue-500/30"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />}
                    <span className="relative z-10">
                      {item.label}
                    </span>

                    {/* Hover dot indicator */}
                    <motion.span
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full opacity-0"
                      whileHover={{ opacity: 1, scale: 1.5 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </Link>
              )}
            </motion.div>
          </div>

          {/* CTA Button - Enhanced with gradient animation */}
          <div className="hidden md:flex items-center">
            <MagneticButton
              onClick={onDownloadCV}
              className="group relative px-6 py-2.5 rounded-full bg-[rgb(var(--primary))] text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[rgb(var(--primary))]/30 flex items-center gap-2 border-2 border-transparent hover:border-[rgb(var(--primary))]/50">
              {/* Animated gradient background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              <span className="relative z-10 flex items-center gap-2 group-hover:text-blue-500 transition-colors duration-300">
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}>
                  <FaDownload className="text-sm" />
                </motion.span>
                Resume
              </span>
            </MagneticButton>
          </div>

          {/* Mobile Navigation Button - Enhanced */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2.5 rounded-xl bg-[rgb(var(--card))]/80 border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] transition-all duration-200 overflow-hidden group"
              aria-label="Toggle menu">
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              <AnimatePresence mode="wait">
                {isOpen
                  ? <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}>
                      <FiX size={24} className="text-[rgb(var(--foreground))] relative z-10" />
                    </motion.div>
                  : <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}>
                      <FiMenu size={24} className="text-[rgb(var(--foreground))] relative z-10" />
                    </motion.div>}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Enhanced with modern design */}
      <AnimatePresence>
        {isOpen &&
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl bg-[rgb(var(--card))]/95 backdrop-blur-2xl border border-[rgb(var(--border))] shadow-2xl overflow-hidden">
            {/* Gradient accent on top */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />

            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) =>
                <Link
                  key={item.label}
                  to={item.to}
                  spy={false}
                  smooth={true}
                  duration={500}
                  offset={-100}
                  onClick={() => setIsOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative block px-5 py-3 rounded-xl text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-all duration-200 cursor-pointer font-medium overflow-hidden">
                    {/* Hover gradient background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.2 }}
                    />

                    {/* Border glow on hover */}
                    <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-500/30 transition-all duration-200" />

                    {/* Number indicator */}
                    <span className="relative z-10 flex items-center gap-3">
                      <span className="text-xs text-blue-500 font-mono opacity-50 group-hover:opacity-100 transition-opacity">
                        0{index + 1}
                      </span>
                      {item.label}
                    </span>

                    {/* Arrow indicator */}
                    <motion.span
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 opacity-0 group-hover:opacity-100"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.2 }}>
                      →
                    </motion.span>
                  </motion.div>
                </Link>
              )}

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{
                  delay: navItems.length * 0.05 + 0.1,
                  duration: 0.3,
                }}
                className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: navItems.length * 0.05 + 0.2,
                  duration: 0.3,
                }}
                className="pt-2">
                <button
                  onClick={() => {
                    onDownloadCV();
                    setIsOpen(false);
                  }}
                  className="relative w-full px-5 py-3 rounded-xl bg-[rgb(var(--primary))] text-white font-semibold overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 group">
                  {/* Animated gradient on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                    <FaDownload className="text-sm" />
                    Download Resume
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
