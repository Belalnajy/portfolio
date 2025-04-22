import { motion } from "framer-motion";
import { FaLaptopCode, FaGraduationCap } from "react-icons/fa";
import ExperienceCard from "./ExperienceCard";

const Experience = () => {
  const experiences = [
    {
      title: "Full Stack Development Using Python Intern",
      company: "Information Technology Institute (ITI)",
      location: "Egypt",
      period: "11/2024 - 04/2025",
      type: "work",
      icon: <FaLaptopCode />,
      description: [
        "Worked on hands-on projects covering Python, Django, databases, and front-end technologies"
      ]
    },
    {
      title: "Emergency Call Center Operator",
      company: "Ministry of Interior - Najda Unit",
      location: "Egypt",
      period: "12/2023 - 12/2024",
      type: "work",
      icon: <FaLaptopCode />,
      description: [
        "Handled emergency calls and provided immediate support in both Arabic and English",
        "Managed sensitive calls related to security, medical, and criminal incidents",
        "Operated under pressure and efficiently handled crisis situations"
      ]
    },
    {
      title: "IT Infrastructure Intern",
      company: "Al Ezz Dekheila Steel Co. EZDK",
      location: "Alexandria, Egypt",
      period: "09/2022 - 10/2022",
      type: "work",
      icon: <FaLaptopCode />,
      description: [
        "Gained hands-on experience in IT infrastructure and software development in a corporate setting",
        "Assisted in software development tasks and IT support"
      ]
    },
    {
      title:
        "Bachelor of Business (English Section), Management Information System(MIS)",
      company: "Alexandria University",
      location: "Alexandria, Egypt",
      period: "07/2019 - 07/2023",
      type: "education",
      icon: <FaGraduationCap />,
      description: [
        "Graduated with a Very Good grade",
        "Graduation Project: A Jewellery Store Website (Grade: A)"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Experience & Education</h2>
          <p className="text-[rgb(var(--muted-foreground))]">
            My professional journey and academic background
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((experience, index) =>
            <ExperienceCard key={index} experience={experience} index={index} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
