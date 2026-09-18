'use client';

import TestimonialsPage from '../../../components/pages/TestimonialsPage';
import ar from '../../../locales/ar';

export default function ArabicPage() {
  return (
    <div lang="ar" dir="rtl">
      <TestimonialsPage lang="ar" bundle={ar} />
    </div>
  );
}
