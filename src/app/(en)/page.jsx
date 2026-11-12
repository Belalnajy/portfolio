// Server component: the JSON-LD below belongs in the HTML, not in the client
// bundle. The page itself, and its translations, sit behind page-client.jsx.
import HomePageClient from './page-client';
import HomeJsonLd from '../../components/HomeJsonLd';

export default function Page() {
  return (
    <>
      <HomeJsonLd lang="en" />
      <HomePageClient />
    </>
  );
}
