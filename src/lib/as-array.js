/**
 * `t(key, { returnObjects: true })` hands back the key itself, a string, when
 * the key is missing from the bundle. Calling `.map` on that throws and takes
 * the page down, so list-shaped translations go through this first: a missing
 * list renders as an empty one instead.
 */
export const asArray = (value) => (Array.isArray(value) ? value : []);
