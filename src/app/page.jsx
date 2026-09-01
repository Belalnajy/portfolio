'use client';

import HomePage from '../components/pages/HomePage';
import HomeJsonLd from '../components/HomeJsonLd';
import en from '../locales/en';

export default function Page() {
  return (
    <>
      <HomeJsonLd lang="en" />
      <HomePage lang="en" bundle={en} />
    </>
  );
}
