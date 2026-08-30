/**
 * The canonical origin, in one place.
 *
 * It must match the primary domain configured in Vercel: belalnagy.com
 * 308-redirects to www.belalnagy.com, so canonical tags, hreflang alternates,
 * Open Graph URLs and the sitemap all have to name the www host. Pointing
 * them at the redirecting apex made every indexed URL a redirect hop.
 */
export const SITE_URL = 'https://www.belalnagy.com';
