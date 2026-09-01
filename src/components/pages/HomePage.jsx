'use client';
import SiteShell from '../SiteShell';
import Hero from '../Hero';
import About from '../About';
import InteractiveTimeline from '../InteractiveTimeline';
import PlatformSuite from '../PlatformSuite';
import Projects from '../Projects';
import BrandLogos from '../BrandLogos';
import Testimonials from '../Testimonials';
import Contact from '../Contact';

/**
 * The slim landing page: who Belal is, the proof that matters, four flagship
 * projects, and a way to get in touch. The full archive lives on /work and
 * the commercial offer on /services.
 */
const HomePage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    <Hero />
    <About />
    <InteractiveTimeline />
    <PlatformSuite />
    <Projects variant="home" />
    <BrandLogos />
    <Testimonials />
    <Contact />
  </SiteShell>
);

export default HomePage;
