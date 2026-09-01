'use client';

import CaseStudy from '../../../components/CaseStudy';
import { CASE_STUDIES } from '../../../lib/case-studies';
import en from '../../../locales/en';

// The locale is imported statically so it stays one shared, cached chunk
// across every case-study page instead of being serialized into each one.
export default function CaseStudyPageClient({ slug, narrative, nav }) {
  return (
    <CaseStudy
      slug={slug}
      {...CASE_STUDIES[slug]}
      narrative={narrative}
      nav={nav}
      lang="en"
      bundle={en}
    />
  );
}
