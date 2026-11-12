// The Framer Motion feature bundle, loaded on demand by MotionProvider.
// `domMax` rather than the smaller `domAnimation`: the site uses shared-layout
// animations (the navbar pill, the project filter) and drag (the project
// sheet on phones), which only the full set carries.
export { domMax as default } from 'framer-motion';
