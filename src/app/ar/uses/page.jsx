'use client';

import UsesPage from '../../../components/pages/UsesPage';
import ar from '../../../locales/ar';

export default function ArabicPage() {
  return (
    <div lang="ar" dir="rtl">
      <UsesPage lang="ar" bundle={ar} />
    </div>
  );
}
