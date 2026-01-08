import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaProjectDiagram, FaCode, FaClock, FaAward } from 'react-icons/fa';

const Counter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}</span>;
};

const AnimatedStats = () => {
  const stats = [
    {
      icon: <FaProjectDiagram className="text-4xl" />,
      value: 20,
      suffix: '+',
      label: 'Projects Completed',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <FaCode className="text-4xl" />,
      value: 30,
      suffix: '+',
      label: 'Technologies Mastered',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <FaClock className="text-4xl" />,
      value: 2500,
      suffix: '+',
      label: 'Hours of Coding',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <FaAward className="text-4xl" />,
      value: 200,
      suffix: '+',
      label: 'Students Taught',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card glass-hover p-8 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/20 mb-4">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold mb-2 text-[rgb(var(--foreground))]">
                <Counter end={stat.value} />
                {stat.suffix}
              </h3>
              <p className="text-[rgb(var(--muted-foreground))]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
