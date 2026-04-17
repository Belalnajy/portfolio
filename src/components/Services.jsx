import { motion } from "framer-motion";
import { useMemo } from "react";
import {
  FaLaptopCode,
  FaServer,
  FaGlobe,
  FaShieldAlt,
} from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const services = useMemo(() => {
    const list = t('services.list', { returnObjects: true });
    const config = [
      { icon: <FaLaptopCode />, color: "from-blue-600 to-cyan-400" },
      { icon: <FaServer />, color: "from-emerald-600 to-teal-400" },
      { icon: <FaGlobe />, color: "from-purple-600 to-pink-400" },
      { icon: <FaShieldAlt />, color: "from-orange-600 to-amber-400" },
    ];

    return list.map((item, index) => ({
      ...item,
      ...config[index]
    }));
  }, [t]);

  return (
    <section id="services" className="py-20 relative text-start">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            {t('services.title')}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg leading-relaxed">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card glass-hover p-6 rounded-xl cursor-pointer group">
              {/* Icon */}
              <div className="mb-6 flex justify-start">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} text-white text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))] transition-colors text-start">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[rgb(var(--muted-foreground))] mb-4 leading-relaxed text-start">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="text-sm text-[rgb(var(--foreground))] flex items-start text-start">
                    <span className={`text-[rgb(var(--primary))] ${isArabic ? 'ml-2' : 'mr-2'} mt-1`}>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover Effect Line */}
              <div
                className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${service.color} rounded-full transition-all duration-500`}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center">
          <p className="text-[rgb(var(--muted-foreground))] text-lg mb-6">
            {t('services.ready')}
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
            {t('services.get_in_touch')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
