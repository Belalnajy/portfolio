'use client';
import SiteShell from '../SiteShell';
import Services from '../Services';
import RtlDemo from '../RtlDemo';
import Packages from '../Packages';
import Contact from '../Contact';

/** The commercial page: what Belal offers, how the process runs, the packages, and a direct line. */
const ServicesPage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    {/* Clears the fixed navbar; Services carries its own heading. */}
    <div className="pt-16">
      <Services />
      {/* Arabic/RTL is one of the services above; this is it working, rather
          than another paragraph claiming it does. */}
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl pb-20">
        <RtlDemo />
      </div>
      <Packages />
      <Contact />
    </div>
  </SiteShell>
);

export default ServicesPage;
