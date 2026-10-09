// Server component: the JSON-LD below belongs in the HTML, not in the client
// bundle, and HomePage carries its own 'use client' boundary.
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
