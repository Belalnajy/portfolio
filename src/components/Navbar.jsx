import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = ({ onDownloadCV }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-[rgb(var(--background))] shadow-lg"
        : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#home" className="text-xl font-bold">
              Belal Nagy
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item =>
              <a
                key={item.label}
                href={item.href}
                className="hover:text-primary transition-colors duration-200">
                {item.label}
              </a>
            )}
            <button
              onClick={onDownloadCV}
              className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors duration-200">
              Download CV
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-[rgb(var(--muted))] transition-colors duration-200"
              aria-label="Toggle menu">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen &&
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-[rgb(var(--background))] shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item =>
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 rounded-md hover:bg-[rgb(var(--muted))] transition-colors duration-200"
                onClick={() => setIsOpen(false)}>
                {item.label}
              </a>
            )}
            <div className="px-3 py-2">
              <button
                onClick={onDownloadCV}
                className="w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors duration-200">
                Download CV
              </button>
            </div>
          </div>
        </motion.div>}
    </motion.nav>
  );
};

export default Navbar;
