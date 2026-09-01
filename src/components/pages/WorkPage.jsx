'use client';
import SiteShell from '../SiteShell';
import Projects from '../Projects';
import Skills from '../Skills';
import Certifications from '../Certifications';

/** The complete body of work: full archive with filters, skills, certificates. */
const WorkPage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    {/* Clears the fixed navbar; Projects carries its own heading. */}
    <div className="pt-16">
      <Projects />
      <Skills />
      <Certifications />
    </div>
  </SiteShell>
);

export default WorkPage;
