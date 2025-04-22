import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

const Notification = ({ message, type = "success", isVisible, onClose }) => {
  const icons = {
    success: <FaCheckCircle className="text-green-400 text-xl" />,
    error: <FaExclamationCircle className="text-red-400 text-xl" />
  };

  return (
    <AnimatePresence>
      {isVisible &&
        <motion.div
          initial={{ opacity: 0, y: -50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -50, x: "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-24 left-1/2 z-50">
          <div
            className={`bg-gray-800 border ${type === "success"
              ? "border-green-500"
              : "border-red-500"} rounded-lg shadow-lg p-4 flex items-center space-x-3 min-w-[300px] backdrop-blur-sm`}>
            {icons[type]}
            <p className="text-white flex-grow">
              {message}
            </p>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors focus:outline-none">
              <FaTimes />
            </button>
          </div>
        </motion.div>}
    </AnimatePresence>
  );
};

export default Notification;
