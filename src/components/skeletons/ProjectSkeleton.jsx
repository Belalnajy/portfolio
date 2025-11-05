import { motion } from 'framer-motion';

const ProjectSkeleton = ({ index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-[rgb(var(--card))] rounded-xl overflow-hidden shadow-lg">
      {/* Category Badge Skeleton */}
      <div className="absolute top-4 left-4 z-20">
        <div className="h-6 w-20 bg-[rgb(var(--muted))] rounded-full animate-pulse" />
      </div>

      {/* Image Skeleton */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
        <div className="w-full h-full bg-[rgb(var(--muted))] animate-pulse" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title Skeleton */}
        <div className="h-7 bg-[rgb(var(--muted))] rounded-md mb-3 animate-pulse w-3/4" />
        
        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-[rgb(var(--muted))] rounded animate-pulse w-full" />
          <div className="h-4 bg-[rgb(var(--muted))] rounded animate-pulse w-5/6" />
        </div>

        {/* Tech Stack Icons Skeleton */}
        <div className="flex flex-wrap gap-3 mb-4">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="w-8 h-8 bg-[rgb(var(--muted))] rounded-full animate-pulse"
            />
          ))}
        </div>

        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="h-6 w-16 bg-[rgb(var(--muted))] rounded-full animate-pulse"
            />
          ))}
        </div>

        {/* Features Skeleton */}
        <div className="space-y-2 mb-6">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="flex items-start">
              <div className="w-4 h-4 bg-[rgb(var(--muted))] rounded mr-2 mt-1 animate-pulse" />
              <div className="h-4 bg-[rgb(var(--muted))] rounded animate-pulse flex-1" />
            </div>
          ))}
        </div>

        {/* Links Skeleton */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-[rgb(var(--border))]">
          <div className="w-6 h-6 bg-[rgb(var(--muted))] rounded-full animate-pulse" />
          <div className="w-6 h-6 bg-[rgb(var(--muted))] rounded-full animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectSkeleton;
