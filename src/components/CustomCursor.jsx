import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseEnter = () => setCursorVariant("hover");
    const handleMouseLeave = () => setCursorVariant("default");

    window.addEventListener("mousemove", mouseMove);

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, .cursor-pointer"
    );

    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1,
      opacity: 1
    },
    hover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      scale: 2,
      opacity: 0.8
    }
  };

  return (
    <>
      {/* Outer cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999]"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25
        }}>
        <div className="w-full h-full rounded-full border-2 border-blue-500 opacity-50" />
      </motion.div>

      {/* Middle cursor ring with gradient */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: cursorVariant === "hover" ? 1.5 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}>
        <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-sm" />
      </motion.div>

      {/* Inner cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: cursorVariant === "hover" ? 0 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 50
        }}>
        <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
      </motion.div>
    </>
  );
};

export default CustomCursor;
