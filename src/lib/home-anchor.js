/**
 * A link to a section of the home page, in the language being read.
 *
 * `/ar/#contact` is not the Arabic home page: the server 308-redirects it to
 * `/ar#contact`, so the link reloaded the page even when the reader was
 * already on it. The Arabic home is `/ar`, the English one `/`.
 */
export const homeAnchor = (isArabic, id) => (isArabic ? `/ar#${id}` : `/#${id}`);
