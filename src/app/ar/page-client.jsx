'use client';

import HomePage from '../../components/pages/HomePage';
import ar from '../../locales/ar';

// See src/app/(en)/page-client.jsx: the locale stays a shared, cached chunk
// instead of being serialised into the page's HTML.
export default function ArabicHomePageClient() {
  return <HomePage lang="ar" bundle={ar} />;
}
