'use client';

import CvPage from '../../../components/pages/CvPage';
import ar from '../../../locales/ar';

export default function ArabicCvPage() {
  return (
    <div lang="ar" dir="rtl">
      <CvPage lang="ar" bundle={ar} />
    </div>
  );
}
