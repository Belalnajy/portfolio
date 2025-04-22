import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="fixed bottom-6 right-6 bg-gray-800 dark:bg-gray-700 p-3 rounded-full shadow-lg z-50">
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}>
        {isDark
          ? <FaSun className="text-yellow-400 text-xl" />
          : <FaMoon className="text-blue-400 text-xl" />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
