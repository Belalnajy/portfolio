'use client';

import CaseStudy from '../../../components/CaseStudy';
import { CASE_STUDIES } from '../../../lib/case-studies';
import en from '../../../locales/en';

export default function Page() {
  return <CaseStudy slug="bilqalam" {...CASE_STUDIES.bilqalam} lang="en" bundle={en} />;
}
