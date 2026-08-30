'use client';

import CaseStudy from '../../../components/CaseStudy';
import { CASE_STUDIES } from '../../../lib/case-studies';
import en from '../../../locales/en';

export default function Page() {
  return <CaseStudy slug="uduipa" {...CASE_STUDIES.uduipa} lang="en" bundle={en} />;
}
