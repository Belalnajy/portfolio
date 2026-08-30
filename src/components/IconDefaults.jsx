"use client";
import { IconContext } from 'react-icons';

// Every react-icons glyph on the site is decorative — the control or text
// beside it carries the meaning — so hide them all from assistive tech in one
// place. Icon-only controls carry their own aria-label.
const ICON_DEFAULTS = { attr: { 'aria-hidden': 'true', focusable: 'false' } };

const IconDefaults = ({ children }) => (
  <IconContext.Provider value={ICON_DEFAULTS}>{children}</IconContext.Provider>
);

export default IconDefaults;
