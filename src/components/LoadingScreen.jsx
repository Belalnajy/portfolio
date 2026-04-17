import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 12 + 1; 
      
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            if (onLoadingComplete) onLoadingComplete();
          }, 1000);
        }, 700);
      } else {
        setProgress(Math.floor(current));
      }
    }, 60);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100vh",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-8 md:p-16 bg-[rgb(var(--background))] text-[rgb(var(--foreground))] overflow-hidden"
        >
          {/* Subtle Grid Background for texture adapting to theme */}
          <div className="absolute inset-0 w-full h-full bg-[linear-gradient(rgb(var(--foreground)/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--foreground)/0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />

          {/* Top Section */}
          <div className="flex justify-between items-start w-full relative z-10 overflow-hidden">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2, duration: 0.6 }}
               className="text-xs md:text-sm tracking-[0.3em] uppercase font-light text-[rgb(var(--muted-foreground))]"
             >
               Belal Nagy
             </motion.div>
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3, duration: 0.6 }}
               className="text-xs md:text-sm tracking-[0.3em] uppercase font-light text-[rgb(var(--primary))]"
             >
               Digital Portfolio
             </motion.div>
          </div>

          {/* Massive Center Counter */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-end pointer-events-none z-10">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-[35vw] md:text-[25vw] font-bold leading-none tracking-tighter"
              style={{
                // Hollow outline text, filling up with solid color as it finishes
                WebkitTextStroke: progress === 100 ? "0px transparent" : "2px rgb(var(--foreground) / 0.15)",
                color: progress === 100 ? "rgb(var(--foreground))" : "transparent",
                transition: "color 0.8s ease, -webkit-text-stroke 0.8s ease"
              }}
            >
              {progress}
            </motion.h1>
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5, duration: 1 }}
              className="text-2xl md:text-5xl font-light text-[rgb(var(--muted-foreground))] mb-[5vw] md:mb-[3vw] ml-2"
            >
              %
            </motion.span>
          </div>

          {/* Bottom Section: Progress Line */}
          <div className="w-full flex flex-col gap-6 relative z-10">
             <div className="flex justify-between items-end">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4, duration: 0.6 }}
                 className="text-[10px] md:text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-[0.4em]"
               >
                 Loading Experience
               </motion.div>
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: progress === 100 ? 1 : 0, y: progress === 100 ? 0 : 20 }}
                 transition={{ duration: 0.5 }}
                 className="text-[10px] md:text-xs text-[rgb(var(--primary))] uppercase tracking-[0.2em]"
               >
                 System Ready
               </motion.div>
             </div>
             
             {/* Sleek Line Progress */}
             <div className="w-full h-[1px] md:h-[2px] bg-[rgb(var(--border))] relative overflow-hidden rounded-full">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-[rgb(var(--foreground))] transition-shadow"
                  style={{ boxShadow: "0 0 15px rgb(var(--foreground) / 0.4)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
