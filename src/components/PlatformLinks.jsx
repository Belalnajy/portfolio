"use client";
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PLATFORMS = [
  {
    nameAr: 'مستقل',
    nameEn: 'Mostaql',
    url: 'https://mostaql.com/u/belalnagy',
    logo: '/mostqal.webp'
  },
  {
    nameAr: 'خمسات',
    nameEn: 'Khamsat',
    url: 'https://khamsat.com/user/belalnajy',
    logo: '/khamsat.webp'
  },
  {
    nameAr: 'نفذلي',
    nameEn: 'Nafezly',
    url: 'https://www.nafezly.com/u/belalnajy',
    logo: '/nafzly.webp'
  }
];

const PlatformLinks = ({ variant = 'default' }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  // Primary label follows the page language; the other script rides along in
  // the full-card variant instead of the name being printed twice.
  const platforms = PLATFORMS.map((p) => ({
    ...p,
    name: isArabic ? p.nameAr : p.nameEn,
    altName: isArabic ? p.nameEn : p.nameAr,
  }));

  if (variant === 'compact') {
    // For Hero section - horizontal compact
    return (
      <div className="flex items-center gap-3 flex-wrap justify-center">
        {platforms.map((platform) => (
          <motion.a
            key={platform.url}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgb(var(--card))] border-2 border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] transition-all shadow-md hover:shadow-lg">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src={platform.logo} alt={platform.name} loading="lazy" className="logo-mark w-full h-full object-contain" />
            </div>
            <span className="text-sm font-medium text-[rgb(var(--foreground))]">{platform.name}</span>
          </motion.a>
        ))}
      </div>
    );
  }

  if (variant === 'footer') {
    // For Footer - simple links
    return (
      <div className="flex flex-wrap items-center justify-center gap-4">
        {platforms.map((platform) => (
          <motion.a
            key={platform.url}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-all">
            <div className="w-6 h-6 flex items-center justify-center">
              <img src={platform.logo} alt={platform.name} loading="lazy" className="logo-mark w-full h-full object-contain" />
            </div>
            <span className="text-sm font-medium">{platform.name}</span>
          </motion.a>
        ))}
      </div>
    );
  }

  // Default variant - full cards
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {platforms.map((platform) => (
        <motion.a
          key={platform.url}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-[rgb(var(--card))] border-2 border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] transition-all shadow-lg hover:shadow-xl">
          <div className="w-12 h-12 flex items-center justify-center bg-[rgb(var(--card))] rounded-lg p-2">
            <img src={platform.logo} alt={platform.name} loading="lazy" className="logo-mark w-full h-full object-contain" />
          </div>
          <div className="text-left">
            <p className="font-bold text-[rgb(var(--foreground))] text-sm">
              {platform.name}
            </p>
            <p className="text-xs text-[rgb(var(--muted-foreground))]">
              {platform.altName}
            </p>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default PlatformLinks;
