import { motion } from 'framer-motion';

const ExperienceSkeleton = ({ index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[rgb(var(--card))] p-6 rounded-xl border border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] transition-colors duration-300">
      <div className="flex items-start space-x-4">
        {/* Icon Skeleton */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-[rgb(var(--muted))] rounded-lg animate-pulse" />
        </div>

        <div className="flex-1">
          {/* Title Skeleton */}
          <div className="h-6 bg-[rgb(var(--muted))] rounded-md mb-2 animate-pulse w-3/4" />
          
          {/* Company Skeleton */}
          <div className="h-4 bg-[rgb(var(--muted))] rounded animate-pulse w-1/2 mb-2" />
          
          {/* Period & Location Skeleton */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-3 bg-[rgb(var(--muted))] rounded animate-pulse w-24" />
            <div className="h-3 bg-[rgb(var(--muted))] rounded animate-pulse w-32" />
          </div>

          {/* Description Skeleton */}
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start">
                <div className="w-2 h-2 bg-[rgb(var(--muted))] rounded-full mr-2 mt-2 animate-pulse" />
                <div className="h-4 bg-[rgb(var(--muted))] rounded animate-pulse flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceSkeleton;
