import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaBuilding, FaChevronRight } from "react-icons/fa";

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex items-start gap-6 p-6 bg-[rgb(var(--card))] rounded-xl border border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] transition-colors duration-300">
      <div className="flex-shrink-0 w-14 h-14 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-[rgb(var(--border))]/50 shadow-sm p-2 transition-transform duration-300 group-hover:scale-110">
        {experience.logo ? (
          <img 
            src={experience.logo} 
            alt={experience.company} 
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-[rgb(var(--primary))] text-2xl">
            {experience.icon}
          </div>
        )}
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
              <FaChevronRight className="mr-2 mt-1.5 text-[rgb(var(--primary))] text-[10px] shrink-0" />
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
