"use client";
import { useEffect, useRef, useState } from 'react';

/**
 * Mounts its children only once the placeholder scrolls near the viewport, so
 * heavy below-the-fold sections (the three.js showcase) stay out of the
 * initial JS payload and never load for visitors who don't reach them.
 */
const LazyMount = ({ children, rootMargin = '600px', minHeight = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  if (visible) return children;
  return <div ref={ref} style={minHeight ? { minHeight } : undefined} />;
};

export default LazyMount;
