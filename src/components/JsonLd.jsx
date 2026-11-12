/**
 * One structured-data block. JSON.stringify leaves `<` alone, so a stray
 * `</script>` inside any string (a case-study sentence, an FAQ answer) would
 * close the tag and spill the rest into the page; `<` is the same
 * character to a JSON parser and inert to the HTML parser.
 */
export const serializeJsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

const JsonLd = ({ data }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
);

export default JsonLd;
