import { motion } from "framer-motion";
import {
  FaUser,
  FaCode,
  FaGraduationCap,
  FaMapMarkerAlt
} from "react-icons/fa";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Software Engineer passionate about creating efficient and scalable
            solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <FaUser className="text-blue-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Name</h4>
                  <p className="text-gray-400">Belal Nagy</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <FaCode className="text-blue-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Role</h4>
                  <p className="text-gray-400">Software Engineer</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <FaGraduationCap className="text-blue-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Education</h4>
                  <p className="text-gray-400">Bachelor of Business (MIS)</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <FaMapMarkerAlt className="text-blue-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Location</h4>
                  <p className="text-gray-400">Alexandria, Egypt</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">
              Professional Summary
            </h3>
            <div className="prose prose-invert">
              <p className="text-gray-300 leading-relaxed">
                I am a dedicated Software Engineer with experience in full-stack
                development, specializing in Python, Django, and modern web
                technologies. Currently enhancing my skills at the Information
                Technology Institute (ITI) while working on hands-on projects.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                My background in Management Information Systems, combined with
                practical experience in emergency response and IT
                infrastructure, has given me a unique perspective on
                problem-solving and crisis management.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                I'm passionate about creating efficient, scalable solutions and
                turning complex problems into elegant applications. Always eager
                to learn new technologies and take on challenging projects.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
