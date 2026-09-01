'use client';

import ServicesPage from '../../../components/pages/ServicesPage';
import ar from '../../../locales/ar';

export default function ArabicServicesPage() {
  return (
    <div lang="ar" dir="rtl">
      <ServicesPage lang="ar" bundle={ar} />
    </div>
  );
}
