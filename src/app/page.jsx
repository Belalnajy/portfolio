'use client';

import App from '../App';
import HomeJsonLd from '../components/HomeJsonLd';
import en from '../locales/en';

export default function Page() {
  return (
    <>
      <HomeJsonLd lang="en" />
      <App lang="en" bundle={en} />
    </>
  );
}
