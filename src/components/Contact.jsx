import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin
} from "react-icons/fa";

const Contact = ({ showNotification }) => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_xxxxxxx";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_xxxxxxx";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "your_public_key";

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);

      showNotification?.("Message sent successfully! I'll get back to you soon.", "success");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending email:", error);
      showNotification?.(
        "Failed to send message. Please try again or email me directly.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            Get In Touch
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg">
            Feel free to reach out for collaborations or just a friendly hello 
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6">
            {[
              {
                icon: <FaEnvelope />,
                title: "Email",
                value: "belalnajy9@gmail.com",
                href: "mailto:belalnajy9@gmail.com",
                color: "blue"
              },
              {
                icon: <FaPhone />,
                title: "Phone",
                value: "01201369949",
                href: "tel:01201369949",
                color: "purple"
              },
              {
                icon: <FaMapMarkerAlt />,
                title: "Location",
                value: "Alexandria, Egypt",
                href: null,
                color: "pink"
              },
              {
                icon: <FaLinkedin />,
                title: "LinkedIn",
                value: "linkedin.com/in/belalnajy",
                href: "https://linkedin.com/in/belalnajy",
                color: "cyan"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-start space-x-4 glass-card glass-hover p-6 rounded-xl cursor-pointer">
                <div className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 p-4 rounded-lg`}>
                  <div className="text-white text-2xl">{item.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[rgb(var(--foreground))] mb-2">{item.title}</h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[rgb(var(--muted-foreground))]">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 rounded-xl">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[rgb(var(--foreground))] font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full glass-card border border-[rgb(var(--border))] rounded-lg px-4 py-3 text-[rgb(var(--foreground))] focus:outline-none focus:border-[rgb(var(--primary))] transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[rgb(var(--foreground))] font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full glass-card border border-[rgb(var(--border))] rounded-lg px-4 py-3 text-[rgb(var(--foreground))] focus:outline-none focus:border-[rgb(var(--primary))] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-[rgb(var(--foreground))] font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full glass-card border border-[rgb(var(--border))] rounded-lg px-4 py-3 text-[rgb(var(--foreground))] focus:outline-none focus:border-[rgb(var(--primary))] transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  loading
                    ? "bg-gradient-to-r from-blue-400 to-purple-400 cursor-not-allowed opacity-70"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50"
                } text-white`}>
                {loading ? "Sending..." : "Send Message "}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
