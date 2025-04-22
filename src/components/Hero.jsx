import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Hero = ({ onDownloadCV }) => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 sm:py-24">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

      <div className="container mx-auto px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Hi, I'm Belal Nagy
            </h1>
            <div className="text-xl md:text-2xl text-gray-300 mb-8">
              <TypeAnimation
                sequence={[
                  "Software Engineer",
                  2000,
                  "Full Stack Developer",
                  2000,
                  "Problem Solver",
                  2000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
            <p className="text-lg text-gray-400 mb-6">
              Passionate about creating efficient, scalable solutions and
              turning complex problems into elegant applications.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mb-8">
              <motion.a
                href="https://github.com/Belalnajy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-white transition-colors">
                <FaGithub className="w-8 h-8" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/belalnajy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-[#0A66C2] transition-colors">
                <FaLinkedin className="w-8 h-8" />
              </motion.a>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="projects"
                spy={true}
                smooth={true}
                duration={300}
                offset={-70}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  View Projects
                </motion.button>
              </Link>
              <Link
                to="contact"
                spy={true}
                smooth={true}
                duration={300}
                offset={-70}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                  Contact Me
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDownloadCV}
                className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
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
              </motion.button>
            </div>
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
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
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
