'use client';

import RescuePage from '../../../components/pages/RescuePage';
import ar from '../../../locales/ar';

export default function ArabicRescuePage() {
  return (
    <div lang="ar" dir="rtl">
      <RescuePage lang="ar" bundle={ar} />
    </div>
  );
}
