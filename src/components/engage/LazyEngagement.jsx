'use client';
import dynamic from 'next/dynamic';

/**
 * The reactions-and-comments block, kept out of the page's first JavaScript:
 * its code arrives after hydration, and it asks the API for nothing until it
 * nears the viewport (see Engagement.jsx).
 */
const LazyEngagement = dynamic(() => import('./Engagement'), { ssr: false });

export default LazyEngagement;
