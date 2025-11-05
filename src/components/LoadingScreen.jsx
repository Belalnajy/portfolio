import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait a bit before hiding
          setTimeout(() => {
            setIsVisible(false);
            if (onLoadingComplete) onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgb(var(--background))] overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Animated Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] bg-[size:30px_30px] opacity-10" />
          </div>

          {/* Loading Content */}
          <div className="relative z-10 flex flex-col items-center space-y-8">
            {/* Logo/Name Animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center">
              <motion.h1
                className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}>
                BN
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[rgb(var(--muted-foreground))] text-lg mt-2">
                Belal Nagy
              </motion.p>
            </motion.div>

            {/* Animated Code Brackets */}
            <motion.div
              className="flex items-center space-x-4 text-4xl text-[rgb(var(--primary))]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}>
              <motion.span
                animate={{ x: [-10, 0, -10] }}
                transition={{ duration: 2, repeat: Infinity }}>
                {"<"}
              </motion.span>
              <motion.div
                className="flex space-x-1"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}>
                <span className="w-2 h-2 bg-[rgb(var(--primary))] rounded-full" />
                <span className="w-2 h-2 bg-purple-400 rounded-full" />
                <span className="w-2 h-2 bg-pink-400 rounded-full" />
              </motion.div>
              <motion.span
                animate={{ x: [10, 0, 10] }}
                transition={{ duration: 2, repeat: Infinity }}>
                {"/>"}
              </motion.span>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-64 md:w-80">
              <div className="relative h-2 bg-[rgb(var(--muted))] rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-sm opacity-50"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              {/* Progress Text */}
              <motion.p
                className="text-center text-[rgb(var(--muted-foreground))] text-sm mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}>
                Loading... {progress}%
              </motion.p>
            </div>

            {/* Loading Text Animation */}
            <motion.div
              className="flex space-x-2 text-[rgb(var(--muted-foreground))]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}>
                •
              </motion.span>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}>
                •
              </motion.span>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}>
                •
              </motion.span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="text-[rgb(var(--muted-foreground))] text-sm text-center max-w-md px-4">
              Full Stack Developer | Building Digital Experiences
            </motion.p>
          </div>

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
