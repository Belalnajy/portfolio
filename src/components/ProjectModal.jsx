import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCode } from 'react-icons/fa';
import { getTechIcon } from './Projects';
import { useTranslation } from 'react-i18next';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 pointer-events-none">
            <motion.div
              layoutId={`project-card-${project.title}`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl shadow-2xl pointer-events-auto border border-[rgb(var(--border))]/50 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 bg-black/40 hover:bg-black/80 backdrop-blur-md rounded-full text-white transition-colors"
                aria-label="Close modal"
              >
                <FaTimes size={20} />
              </button>

              {/* Cover Image Container */}
              <div className="relative w-full bg-[#0a0a0a] border-b border-[rgb(var(--border))]/30">
                <div className="w-full pt-[45%] md:pt-[40%] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[1]" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-x-0 bottom-0 max-h-[90%] mx-auto object-contain rounded-t-lg shadow-2xl transform origin-bottom hover:scale-105 transition-transform duration-700 pointer-events-none"
                    loading="lazy"
                  />
                  
                  {/* Category Badge Floating over image */}
                  <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 z-10">
                    <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-lg">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 md:p-10 bg-[rgb(var(--background))]">
                <div className="flex flex-col md:flex-row gap-8">
                    
                  {/* Main Details */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--foreground))] mb-4 text-start">
                        {project.title}
                      </h2>
                      <p className="text-lg text-[rgb(var(--muted-foreground))] leading-relaxed text-start">
                        {project.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4 text-start">
                      <h3 className="text-xl font-semibold text-[rgb(var(--foreground))] border-b border-[rgb(var(--border))]/50 pb-2">
                        {t('projects.modal.features')}
                      </h3>
                      <ul className="space-y-3">
                        {project.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-[rgb(var(--muted-foreground))]"
                          >
                            <FaCode className="mt-1 text-[rgb(var(--primary))] shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Sidebar (Tech & Links) */}
                  <div className="w-full md:w-1/3 flex flex-col gap-8 text-start">
                    {/* Technologies */}
                    <div className="p-6 rounded-xl glass-card bg-[rgb(var(--muted))]/10 border border-[rgb(var(--border))]/50">
                      <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-4">
                        {t('projects.modal.technologies')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 bg-[rgb(var(--background))] px-3 py-1.5 rounded-lg border border-[rgb(var(--border))]/50 text-sm font-medium text-[rgb(var(--foreground))]"
                          >
                            <span>{getTechIcon(tag)}</span>
                            <span>{tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                      {project.live !== '#' && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                          <FaExternalLinkAlt /> {t('projects.modal.live_link')}
                        </a>
                      )}
                      {project.github !== '#' && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 px-4 glass-card hover:bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] border border-[rgb(var(--border))] rounded-lg font-semibold transition-all hover:shadow-md hover:-translate-y-0.5"
                        >
                          <FaGithub size={20} /> {t('projects.modal.source_code')}
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
