'use client';

import CaseStudy from '../../../components/CaseStudy';
import { CASE_STUDIES } from '../../../lib/case-studies';
import en from '../../../locales/en';

export default function Page() {
  return <CaseStudy slug="profleet" {...CASE_STUDIES.profleet} lang="en" bundle={en} />;
}
