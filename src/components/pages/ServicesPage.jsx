'use client';
import SiteShell from '../SiteShell';
import Services from '../Services';
import Packages from '../Packages';
import Contact from '../Contact';

/** The commercial page: what Belal offers, how the process runs, the packages, and a direct line. */
const ServicesPage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    {/* Clears the fixed navbar; Services carries its own heading. */}
    <div className="pt-16">
      <Services />
      <Packages />
      <Contact />
    </div>
  </SiteShell>
);

export default ServicesPage;
