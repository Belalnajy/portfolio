// Server component: the JSON-LD below belongs in the HTML, not in the client
// bundle, and HomePage carries its own 'use client' boundary.
import HomePage from '../../components/pages/HomePage';
import HomeJsonLd from '../../components/HomeJsonLd';
import ar from '../../locales/ar';

export default function ArabicPage() {
  // The root <html> is stamped lang/dir after hydration by the shell; this
  // wrapper carries the correct direction for the prerendered paint too.
  return (
    <div lang="ar" dir="rtl">
      <HomeJsonLd lang="ar" />
      <HomePage lang="ar" bundle={ar} />
    </div>
  );
}
