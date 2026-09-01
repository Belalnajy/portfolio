"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { brandColor } from '../lib/brand-colors';

// Same number the contact card reveals on click; kept in one place.
export const WHATSAPP_NUMBER = '201201369949';

export const whatsappUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/**
 * Floating WhatsApp launcher — the first channel Gulf clients reach for.
 *
 * The href is attached only after hydration so the number never appears in
 * the prerendered HTML, matching the click-to-reveal treatment the phone
 * number already gets against scrapers.
 */
const WhatsAppButton = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <motion.a
      href={mounted ? whatsappUrl(t('whatsapp.message')) : undefined}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp.aria')}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{ backgroundColor: brandColor('WhatsApp') }}
      className="fixed right-4 md:right-6 bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.5rem)] md:bottom-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center text-[rgb(var(--scrim))] shadow-lg shadow-[#25D366]/40 group">
      <FaWhatsapp size={30} />

      {/* Tooltip */}
      <span className="absolute right-full mr-4 px-3 py-1 bg-[rgb(var(--card))] border border-[rgb(var(--border))] text-[rgb(var(--foreground))] text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {t('whatsapp.aria')}
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
