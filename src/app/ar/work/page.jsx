'use client';

import WorkPage from '../../../components/pages/WorkPage';
import ar from '../../../locales/ar';

export default function ArabicWorkPage() {
  return (
    <div lang="ar" dir="rtl">
      <WorkPage lang="ar" bundle={ar} />
    </div>
  );
}
