"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { resolvePreferredLanguage } from './i18n';
import { useTranslation } from 'react-i18next';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import InteractiveTimeline from './components/InteractiveTimeline';
import Projects from './components/Projects';
import PlatformSuite from './components/PlatformSuite';
import SectionErrorBoundary from './components/SectionErrorBoundary';
import HowIWork from './components/HowIWork';
import Packages from './components/Packages';
import BrandLogos from './components/BrandLogos';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import Notification from './components/Notification';
import ParticlesBackground from './components/ParticlesBackground';
import CustomCursor from './components/CustomCursor';
import AnimatedStats from './components/AnimatedStats';
import ThemeSwitcher from './components/ThemeSwitcher';
import Certifications from './components/Certifications';
import Services from './components/Services';
import LazyMount from './components/LazyMount';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';
import Testimonials from './components/Testimonials';
import AIAssistant from './components/AIAssistant';

// three.js + drei only ship in their own chunk, requested when the section is
// actually about to be seen (see LazyMount below).
const LaptopShowcase3D = dynamic(() => import('./components/LaptopShowcase3D'), {
  ssr: false,
});

function App() {
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false,
  });

  const { i18n } = useTranslation();

  // Apply the stored/browser language only after hydration, so the first render
  // matches the prerendered English markup. Runs behind the loading screen.
  useEffect(() => {
    const preferred = resolvePreferredLanguage();
    if (preferred !== i18n.language) {
      i18n.changeLanguage(preferred);
    }
  }, [i18n]);

  useEffect(() => {
    document.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language, i18n]);

  const showNotification = (message, type = 'success') => {
    setNotification({
      message,
      type,
      isVisible: true,
    });

    setTimeout(() => {
      setNotification((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const handleDownloadCV = async () => {
    try {
      const response = await fetch('/Belal_Nagy_CV.pdf');
      if (!response.ok) throw new Error('Failed to download CV');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Belal_Nagy_CV.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showNotification('CV downloaded successfully!');
    } catch (error) {
      console.error('Error downloading CV:', error);
      showNotification('Failed to download CV. Please try again.', 'error');
    }
  };

  return (
    // reducedMotion="user" drops transform and layout animations for anyone who
    // has asked their OS to reduce motion, without touching opacity fades.
    <MotionConfig reducedMotion="user">
      {/* overflow-x-clip contains the decorative entrance offsets and blurred
          blobs, which otherwise let the page pan sideways on phones in RTL.
          `clip` rather than `hidden` so no scroll container is created. */}
      <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors duration-300 relative overflow-x-clip">
        <CustomCursor />
        <ParticlesBackground />
        <DarkModeToggle />
        <ThemeSwitcher />
        <ScrollProgress />
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() =>
            setNotification((prev) => ({ ...prev, isVisible: false }))
          }
        />
        <Navbar onDownloadCV={handleDownloadCV} />
        <main className="relative z-10">
          <Hero onDownloadCV={handleDownloadCV} />
          <About />
          {/* The suite is the strongest proof on the page, so it sits above the
              31-card project grid rather than below it. */}
          <PlatformSuite />
          <Projects />
          {/* Pulls an HDR map from an external CDN; contained so a failed fetch
              cannot tear down the rest of the page. Mounted lazily so the
              three.js chunk is only downloaded when the section approaches. */}
          <SectionErrorBoundary>
            <LazyMount minHeight={480}>
              <LaptopShowcase3D />
            </LazyMount>
          </SectionErrorBoundary>
          <BrandLogos />
          <Skills />
          <InteractiveTimeline />
          <AnimatedStats />
          <Certifications />
          <Services />
          <HowIWork />
          <Packages />
          <Testimonials />
          <Contact showNotification={showNotification} />
          <AIAssistant />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
