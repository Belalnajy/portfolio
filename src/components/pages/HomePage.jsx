'use client';
import SiteShell from '../SiteShell';
import Hero from '../Hero';
import About from '../About';
import Projects from '../Projects';
import BrandLogos from '../BrandLogos';
import Testimonials from '../Testimonials';
import HowWeStart from '../HowWeStart';
import CtaBand from '../CtaBand';
import HomeFaq from '../HomeFaq';
import Contact from '../Contact';

/**
 * The short landing page, in the order a client decides: the offer, the
 * proof (four flagship projects, the clients, the reviews), how a project
 * starts (or a stuck one is rescued), who Belal is, the common questions,
 * and a way in. WhatsApp/quote bands sit between the runs, so the next step
 * is never more than a scroll away. The experience timeline and the platform
 * suite live on /cv; the full archive on /work; the offer on /services.
 */
const HomePage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    <Hero />
    <Projects variant="home" />
    <BrandLogos />
    <Testimonials />
    <CtaBand copy="proof" />
    <HowWeStart />
    <About />
    <CtaBand copy="questions" />
    <HomeFaq lang={lang} />
    <Contact />
  </SiteShell>
);

export default HomePage;
