import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const logos = [
  '21-secondary-logo.png', 'CME-logo.png', 'DiaMonitor-logo.png',
  'KMBC-logo.png', 'amarna-logo.png', 'baserah-logo.png',
  'dmagni-logo.png', 'indstrz-logo.png', 'manqla-logo.png',
  'nextstop-logo.png', 'profleet-logo.png', 'quotemate-logo.png',
  'rabzan-logo.svg', 'sf-logo.png', 'sonomedix-logo.png',
  'uduipa-logo.png', 'upafa-edu-logo.png', 'waferlee.png'
];

const row1 = logos.slice(0, 9);
const row2 = logos.slice(9, 18);

const MarqueeRow = ({ items, direction }) => {
  // Duplicate the array to create the infinite looping effect
  const duplicatedItems = [...items, ...items];
  const animationClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';
  
  return (
    <div className="marquee-container flex overflow-hidden w-full select-none py-3 relative" dir="ltr">
      {/* Fading gradient masks for the edges */}
      <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-[rgb(var(--background))] to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-[rgb(var(--background))] to-transparent z-20 pointer-events-none"></div>

      <div className={`flex w-max gap-4 md:gap-8 px-2 md:px-4 ${animationClass}`}>
        {duplicatedItems.map((logo, index) => (
          <div
            key={index}
            className="w-40 md:w-64 h-28 md:h-36 flex-shrink-0 relative group glass-card p-6 md:p-8 rounded-2xl flex justify-center items-center hover:bg-[rgb(var(--background))]/50 transition-all duration-300">
            <img
              src={`/logos/${logo}`}
              alt={`Brand logo`}
              className="max-w-full max-h-full object-contain transition-all duration-500 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 drop-shadow-sm"
              style={{ filter: 'drop-shadow(0px 0px 15px rgba(var(--foreground), 0.6))' }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const BrandLogos = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 relative overflow-hidden" id="brands">
      {/* Injecting CSS Keyframes directly for the Marquee */}
      <style>
        {`
          @keyframes marquee-left {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
          .animate-marquee-left {
            animation: marquee-left 40s linear infinite;
          }
          .animate-marquee-right {
            animation: marquee-right 40s linear infinite;
          }
          .marquee-container:hover .animate-marquee-left,
          .marquee-container:hover .animate-marquee-right {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Background ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-[rgb(var(--primary))]/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
      <div className="container mx-auto px-0 md:px-4 relative z-10 w-full max-w-[100vw]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20 px-4">
          <span className="text-[rgb(var(--primary))] font-bold tracking-widest uppercase text-sm mb-4 block">
            {t('brands.label')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-[rgb(var(--foreground))] tracking-tight">
            {t('brands.title')}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            {t('brands.subtitle')}
          </p>
        </motion.div>

        {/* The Marquee Display */}
        <div className="flex flex-col gap-4 w-full">
          <MarqueeRow items={row1} direction="left" />
          <MarqueeRow items={row2} direction="right" />
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;
