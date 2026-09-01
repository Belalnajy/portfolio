'use client';

import BlogPage from '../../../components/pages/BlogPage';
import ar from '../../../locales/ar';

export default function ArabicBlogPage() {
  return (
    <div lang="ar" dir="rtl">
      <BlogPage lang="ar" bundle={ar} />
    </div>
  );
}
