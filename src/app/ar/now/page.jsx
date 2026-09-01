'use client';

import NowPage from '../../../components/pages/NowPage';
import ar from '../../../locales/ar';

export default function ArabicNowPage() {
  return (
    <div lang="ar" dir="rtl">
      <NowPage lang="ar" bundle={ar} />
    </div>
  );
}
