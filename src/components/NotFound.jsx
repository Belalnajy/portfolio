import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FaHome, FaRocket, FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[rgb(var(--background))]">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#dc2626_1px,transparent_1px)] bg-[size:30px_30px] opacity-10" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8">
            <motion.h1
              className="text-[150px] md:text-[250px] font-bold leading-none bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
              animate={{
                textShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.5)",
                  "0 0 40px rgba(239, 68, 68, 0.8)",
                  "0 0 20px rgba(239, 68, 68, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}>
              404
            </motion.h1>
          </motion.div>

          {/* Warning Icon */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block">
              <FaExclamationTriangle className="text-6xl text-yellow-400" />
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[rgb(var(--foreground))] mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-xl text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto mb-2">
              The page you're looking for seems to have wandered off into the
              digital void.
            </p>
            <p className="text-lg text-[rgb(var(--muted-foreground))]">
              Don't worry, even the best developers get lost sometimes! 🚀
            </p>
          </motion.div>

          {/* Animated Code Block */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-12 max-w-md mx-auto">
            <div className="glass-card p-6 rounded-xl text-left">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <code className="text-sm text-[rgb(var(--foreground))] font-mono">
                <span className="text-purple-400">if</span>
                <span className="text-white"> (</span>
                <span className="text-blue-400">pageNotFound</span>
                <span className="text-white">) {"{"}</span>
                <br />
                <span className="text-white ml-4">
                  return{" "}
                  <span className="text-green-400">"Go back home!"</span>;
                </span>
                <br />
                <span className="text-white">{"}"}</span>
              </code>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="home" spy={true} smooth={true} duration={300}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                <FaHome />
                <span>Go Back Home</span>
              </motion.button>
            </Link>

            <Link to="contact" spy={true} smooth={true} duration={300}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 border-2 border-blue-500 text-blue-400 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all">
                <FaRocket />
                <span>Contact Support</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Fun Fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-12">
            <p className="text-[rgb(var(--muted-foreground))] text-sm">
              💡 Fun Fact: 404 errors got their name from room 404 at CERN,
              where the web was born!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            x: [
              null,
              Math.random() * window.innerWidth,
            ],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default NotFound;
