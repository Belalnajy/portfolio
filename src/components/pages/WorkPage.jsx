'use client';
import SiteShell from '../SiteShell';
import Projects from '../Projects';
import Skills from '../Skills';
import Certifications from '../Certifications';

/** The complete body of work: full archive with filters, skills, certificates. */
const WorkPage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    {/* Clears the fixed navbar; Projects carries its own heading. Below
        768 the page opens 32px under the (shorter) phone header. */}
    <div className="pt-16 m-page-top">
      <Projects />
      <Skills />
      <Certifications />
    </div>
  </SiteShell>
);

export default WorkPage;
