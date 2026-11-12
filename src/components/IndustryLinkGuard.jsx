/**
 * Rendered by the /work layouts, ahead of the page: when the address carries
 * ?industry=…, marks the document so globals.css hides the results until
 * Projects.jsx has applied that filter (it removes the mark). The page stays
 * fully static; only this line reads the query, before first paint. If the
 * app never takes over, the mark goes after 3 seconds and the default view
 * shows.
 */
const SCRIPT = `(function(){if(!/[?&]industry=/.test(location.search))return;var r=document.documentElement;r.setAttribute('data-industry-link','');setTimeout(function(){r.removeAttribute('data-industry-link')},3000)})()`;

export default function IndustryLinkGuard() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
