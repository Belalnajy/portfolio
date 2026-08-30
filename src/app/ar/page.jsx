'use client';

import App from '../../App';
import ar from '../../locales/ar';

export default function ArabicPage() {
  // The root <html> is stamped lang/dir after hydration by AppContent; this
  // wrapper carries the correct direction for the prerendered paint too.
  return (
    <div lang="ar" dir="rtl">
      <App lang="ar" bundle={ar} />
    </div>
  );
}
