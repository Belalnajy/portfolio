import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import ScrollProgress from "./components/ScrollProgress";
import Notification from "./components/Notification";
import AOS from "aos";
import "aos/dist/aos.css";
import Certifications from "./components/Certifications";

function App() {
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    isVisible: false
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({
      message,
      type,
      isVisible: true
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
    <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors duration-300">
      <ScrollProgress />
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />
      <Navbar onDownloadCV={handleDownloadCV} />
      <main>
        <Hero onDownloadCV={handleDownloadCV} />
        <About />
        <Experience />
        <Certifications />
        <Projects />
        <Skills />
        <Contact showNotification={showNotification} />
      </main>
    </div>
  );
}

export default App;
