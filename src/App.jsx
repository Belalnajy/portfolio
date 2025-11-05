import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import InteractiveTimeline from "./components/InteractiveTimeline";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import ScrollProgress from "./components/ScrollProgress";
import Notification from "./components/Notification";
import ParticlesBackground from "./components/ParticlesBackground";
import CustomCursor from "./components/CustomCursor";
import AnimatedStats from "./components/AnimatedStats";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Certifications from "./components/Certifications";
import Services from "./components/Services";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import DarkModeToggle from "./components/DarkModeToggle";
import Testimonials from "./components/Testimonials";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    isVisible: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const showNotification = (message, type = "success") => {
    setNotification({
      message,
      type,
      isVisible: true,
    });

    setTimeout(() => {
      setNotification(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const handleDownloadCV = async () => {
    try {
      const response = await fetch("/Belal_Nagy_CV.pdf");
      if (!response.ok) throw new Error("Failed to download CV");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Belal_Nagy_CV.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showNotification("CV downloaded successfully!");
    } catch (error) {
      console.error("Error downloading CV:", error);
      showNotification("Failed to download CV. Please try again.", "error");
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors duration-300 relative">
        <CustomCursor />
        <ParticlesBackground />
        <DarkModeToggle />
        <ThemeSwitcher />
        <ScrollProgress />
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
        />
        <Navbar onDownloadCV={handleDownloadCV} />
        <main className="relative z-10">
          <Hero onDownloadCV={handleDownloadCV} />
          <About />
          <AnimatedStats />
          <InteractiveTimeline />
          <Certifications />
          <Projects />
          <Skills />
          <Services />
          <Testimonials />
          <Contact showNotification={showNotification} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
