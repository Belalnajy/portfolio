import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex items-start gap-6 p-6 bg-[rgb(var(--card))] rounded-xl border border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] transition-colors duration-300">
      <div className="flex-shrink-0 w-12 h-12 bg-[rgb(var(--primary))]/10 rounded-lg flex items-center justify-center">
        <div className="text-[rgb(var(--primary))]">
          {experience.icon}
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">
            {experience.title}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-sm ${experience.type ===
            "work"
              ? "bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]"
              : "bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent-foreground))]"}`}>
            {experience.type === "work" ? "Work" : "Education"}
          </span>
        </div>
        <div className="flex items-center text-[rgb(var(--primary))] mb-3">
          <FaBuilding className="mr-2" />
          <p>
            {experience.company}
          </p>
        </div>
        <div className="flex items-center text-[rgb(var(--muted-foreground))] text-sm mb-4">
          <div className="flex items-center mr-4">
            <FaMapMarkerAlt className="mr-1" />
            <span>
              {experience.location}
            </span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1" />
            <span>
              {experience.period}
            </span>
          </div>
        </div>
        <ul className="space-y-2">
          {experience.description.map((item, i) =>
            <li
              key={i}
              className="text-[rgb(var(--muted-foreground))] flex items-start">
              <span className="mr-2 mt-1.5 text-[rgb(var(--primary))]">•</span>
              <span>
                {item}
              </span>
            </li>
          )}
        </ul>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
