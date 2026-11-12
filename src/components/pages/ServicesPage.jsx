'use client';
import SiteShell from '../SiteShell';
import Services from '../Services';
import RtlDemo from '../RtlDemo';
import Packages from '../Packages';
import Contact from '../Contact';

/** The commercial page: what Belal offers, how the process runs, the packages, and a direct line. */
const ServicesPage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    {/* Clears the fixed navbar; Services carries its own heading. Below
        768 the page opens 32px under the (shorter) phone header. */}
    <div className="pt-16 m-page-top">
      <Services />
      {/* Arabic/RTL is one of the services above; this is it working, rather
          than another paragraph claiming it does. */}
      <div className="container mx-auto px-5 sm:px-6 max-w-6xl pb-20 max-md:pb-14">
        <RtlDemo />
      </div>
      <Packages />
      <Contact />
    </div>
  </SiteShell>
);

export default ServicesPage;
