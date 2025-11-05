import { motion } from 'framer-motion';

const SkillSkeleton = ({ index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[rgb(var(--card))] p-6 rounded-xl border border-[rgb(var(--border))]">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="bg-[rgb(var(--muted))] p-3 rounded-lg animate-pulse">
          <div className="w-10 h-10" />
        </div>
        <div className="h-6 bg-[rgb(var(--muted))] rounded-md ml-4 animate-pulse w-40" />
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div
            key={i}
            className="flex items-center space-x-2 p-3 rounded-lg">
            <div className="bg-[rgb(var(--muted))] p-2 rounded-lg animate-pulse">
              <div className="w-8 h-8" />
            </div>
            <div className="h-4 bg-[rgb(var(--muted))] rounded animate-pulse w-20" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillSkeleton;
