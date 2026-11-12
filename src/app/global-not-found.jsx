import RootDocument from '../components/RootDocument';
import NotFound from '../components/NotFound';
import { FONT_VARIABLES } from '../lib/fonts-en';
import './globals.css';

/**
 * The 404 page for every URL that matches no route, in either language tree.
 *
 * With two root layouts there is no single layout a not-found.jsx could
 * render in, and a catch-all route calling notFound() turns every probe for
 * /wp-login.php into an uncacheable server render with an empty HTML shell.
 * global-not-found (experimental.globalNotFound in next.config.js) is
 * prerendered once and served statically for all of them. The price is one
 * document for both languages: see NotFound and RootDocument for how a miss
 * under /ar still ends up Arabic and right-to-left.
 *
 * It does not go through pageMetadata(): a 404 must not carry a canonical,
 * hreflang or og:url. Next adds the noindex robots tag itself.
 */
export const metadata = {
  title: 'Page not found · الصفحة غير موجودة | Belal Nagy',
  description: 'This page does not exist.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
  },
};

export default function GlobalNotFound() {
  return (
    <RootDocument lang="en" variant="not-found" fontVariables={FONT_VARIABLES}>
      <NotFound />
    </RootDocument>
  );
}
