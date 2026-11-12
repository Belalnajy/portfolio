'use client';

import HomePage from '../../components/pages/HomePage';
import en from '../../locales/en';

// The locale is imported here, on the client side of the boundary, so it is
// one shared and cached chunk (the same one /work, /services and the rest
// load) instead of being serialised into the home page's HTML as a prop.
export default function HomePageClient() {
  return <HomePage lang="en" bundle={en} />;
}
