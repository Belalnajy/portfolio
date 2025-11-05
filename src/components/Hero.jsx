import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import MagneticButton from "./MagneticButton";
import PlatformLinks from "./PlatformLinks";

const Hero = ({ onDownloadCV }) => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[rgb(var(--background))] py-16 sm:py-24">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] bg-[size:20px_20px] opacity-10" />
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              <span className="inline-block px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
                Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-[rgb(var(--foreground))]">
              Hi, I'm Belal Nagy
            </motion.h1>

            <div className="text-2xl md:text-3xl mb-8 h-12 flex items-center">
              <span className="text-[rgb(var(--muted-foreground))] mr-2">
                I'm a{" "}
              </span>
              <span className="text-[rgb(var(--primary))] font-bold">
                <TypeAnimation
                  sequence={[
                    "Full Stack Developer",
                    2000,
                    "Software Engineer",
                    2000,
                    "Web Developer",
                    2000,
                    "Problem Solver",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </div>

            <p className="text-lg text-[rgb(var(--foreground))] mb-8 leading-relaxed max-w-xl">
              Passionate about building{" "}
              <span className="text-[rgb(var(--primary))] font-semibold">
                scalable, high-performance web applications
              </span>{" "}
              and transforming complex ideas into{" "}
              <span className="text-[rgb(var(--primary))] font-semibold">
                intuitive, elegant user experiences
              </span>
              . Currently crafting impactful digital solutions at{" "}
              <span className="text-[rgb(var(--primary))] font-semibold">
                S&amp;F
              </span>.
            </p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-4 mb-8">
              <motion.a
                href="https://github.com/Belalnajy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-blue-500/50">
                <FaGithub className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/belalnajy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-gradient-to-r from-[#0A66C2] to-[#004182] text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                <FaLinkedin className="w-6 h-6" />
              </motion.a>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap gap-4">
              <Link
                to="projects"
                spy={true}
                smooth={true}
                duration={300}
                offset={-70}>
                <MagneticButton className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                  View Projects
                </MagneticButton>
              </Link>
              <Link
                to="contact"
                spy={true}
                smooth={true}
                duration={300}
                offset={-70}>
                <MagneticButton className="border-2 border-blue-500 text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all">
                  Contact Me
                </MagneticButton>
              </Link>
              <MagneticButton
                onClick={onDownloadCV}
                className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all inline-flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download CV
              </MagneticButton>
            </motion.div>

            {/* Platform Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-8">
              <p className="text-[rgb(var(--muted-foreground))] text-sm mb-3 text-center md:text-left">
                Follow me on Arabic platforms
              </p>
              <PlatformLinks variant="compact" />
            </motion.div>
          </motion.div>

          {/* Image Container */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative">
            <div className="relative w-full max-w-md mx-auto lg:max-w-full">
              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-2xl animate-pulse animation-delay-2000" />

              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative">
                <div className="w-full aspect-square rounded-full border-4 border-blue-500/30 overflow-hidden">
                  <img
                    src="/hero.png"
                    alt="Belal Nagy"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
