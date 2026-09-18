'use client';

import PrivacyPage from '../../../components/pages/PrivacyPage';
import ar from '../../../locales/ar';

export default function ArabicPrivacyPage() {
  return (
    <div lang="ar" dir="rtl">
      <PrivacyPage lang="ar" bundle={ar} />
    </div>
  );
}
