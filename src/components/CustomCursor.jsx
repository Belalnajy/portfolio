"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState(null);
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    // Touch devices never show the custom cursor (CSS hides it too), so skip
    // the listeners entirely.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    // Delegated, so elements mounted later (the project modal, the mobile
    // menu, lazy sections, archive cards) get the hover treatment too.
    const INTERACTIVE = "a, button, [role='button'], input, textarea, .cursor-pointer";
    const handleMouseOver = e => {
      setCursorVariant(e.target.closest(INTERACTIVE) ? "hover" : "default");
    };

    window.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Nothing renders until the pointer has actually moved, so the rings don't
  // sit in the top-left corner on first paint.
  if (!mousePosition) return null;

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
        <div className="w-full h-full rounded-full border-2 border-[rgb(var(--accent))] opacity-50" />
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
        <div className="w-full h-full rounded-full bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] opacity-30 blur-sm" />
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
        <div className="w-full h-full rounded-full bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))]" />
      </motion.div>
    </>
  );
};

export default CustomCursor;
