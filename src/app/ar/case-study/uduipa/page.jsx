'use client';

import CaseStudy from '../../../../components/CaseStudy';
import { CASE_STUDIES } from '../../../../lib/case-studies';
import ar from '../../../../locales/ar';

export default function ArabicPage() {
  return (
    <div lang="ar" dir="rtl">
      <CaseStudy slug="uduipa" {...CASE_STUDIES.uduipa} lang="ar" bundle={ar} />
    </div>
  );
}
