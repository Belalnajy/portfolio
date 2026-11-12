'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';
import { track } from '@vercel/analytics';
import Reveal from './Reveal';
import { whatsappUrl } from './WhatsAppButton';
import { brandColor } from '../lib/brand-colors';

/**
 * A slim call-to-action band between home sections: one line of copy, then
 * WhatsApp and a quote request. `copy` picks the wording from cta_band.<copy>
 * so each band can speak to the section above it.
 *
 * The WhatsApp href is attached after hydration, like the floating button,
 * so the number is never in the prerendered HTML.
 */
const CtaBand = ({ copy }) => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    // A plain div: a band is a nudge between sections, not a landmark.
    <div className="shell py-6">
      <Reveal y={16}
        className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8 rounded-2xl border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/[0.06] px-6 py-6 md:px-8 text-start">
        <div className="flex-1 min-w-0">
          <p className="font-display text-lg sm:text-xl font-bold text-[rgb(var(--foreground))] leading-snug">
            {t(`cta_band.${copy}.title`)}
          </p>
          <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
            {t(`cta_band.${copy}.body`)}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <a
            href={mounted ? whatsappUrl(t('whatsapp.message')) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_click', { placement: `band_${copy}` })}
            style={{ backgroundColor: brandColor('WhatsApp') }}
            className="inline-flex items-center gap-2 min-h-[48px] px-5 rounded-xl font-semibold text-[rgb(var(--scrim))] shadow-md transition-transform active:scale-[0.98]">
            <FaWhatsapp aria-hidden="true" className="text-lg" />
            {t('contact.info.whatsapp_cta')}
          </a>
          <a
            href="#contact"
            onClick={() => track('quote_click', { placement: `band_${copy}` })}
            className="inline-flex items-center min-h-[48px] px-5 rounded-xl font-semibold border border-[rgb(var(--border-control))] text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors">
            {t('packages.cta')}
          </a>
        </div>
      </Reveal>
    </div>
  );
};

export default CtaBand;
