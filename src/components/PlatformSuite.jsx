"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { REVEAL_VIEWPORT, revealDelay, REVEAL_DURATION } from '../lib/motion';
import { useTranslation } from 'react-i18next';
import {
  FaLayerGroup,
  FaPalette,
  FaExternalLinkAlt,
  FaServer,
  FaCertificate,
  FaCreditCard,
  FaLanguage,
  FaShieldAlt,
} from 'react-icons/fa';
import { LMS_SUITE } from './Projects';
import { coverMeta } from '../lib/cover-meta';

const SHARED_CAPABILITIES = [
  { key: 'engine', icon: <FaServer /> },
  { key: 'accreditation', icon: <FaCertificate /> },
  { key: 'payments', icon: <FaCreditCard /> },
  { key: 'rtl', icon: <FaLanguage /> },
  { key: 'roles', icon: <FaShieldAlt /> },
  { key: 'branding', icon: <FaPalette /> },
];

const PlatformSuite = () => {
  const { t } = useTranslation();

  return (
    <section id="platform-suite" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background ambiance */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[rgb(var(--primary))]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[rgb(var(--primary))] font-bold tracking-widest uppercase text-sm mb-4">
            <FaLayerGroup />
            {t('platform_suite.label')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[rgb(var(--foreground))] tracking-tight">
            {t('platform_suite.title')}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] max-w-3xl mx-auto text-lg leading-relaxed">
            {t('platform_suite.subtitle')}
          </p>
        </motion.div>

        {/* Shared engine capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl border border-[rgb(var(--border))]/50 p-6 md:p-8 mb-12"
        >
          <h3 className="text-lg font-bold text-[rgb(var(--foreground))] mb-6 text-center">
            {t('platform_suite.shared_title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SHARED_CAPABILITIES.map((cap, index) => (
              <motion.div
                key={cap.key}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
                className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-[rgb(var(--muted))]/10 border border-[rgb(var(--border))]/40"
              >
                <span className="w-10 h-10 rounded-lg flex items-center justify-center bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/20">
                  {cap.icon}
                </span>
                <span className="text-xs font-semibold text-[rgb(var(--foreground))] leading-snug">
                  {t(`platform_suite.capabilities.${cap.key}`)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Branded deployments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LMS_SUITE.members.map((member, index) => (
            <motion.a
              key={member.slug}
              href={member.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL_VIEWPORT}
              transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
              whileHover={{ y: -6 }}
              className="group glass-card rounded-2xl overflow-hidden border border-[rgb(var(--border))]/50 hover:border-[rgb(var(--primary))]/40 transition-colors flex flex-col"
            >
              <div className="relative aspect-video bg-[rgb(var(--scrim))] overflow-hidden border-b border-[rgb(var(--border))]/30 flex items-center justify-center p-4">
                <div
                  className="absolute inset-x-0 top-0 h-1 z-10"
                  style={{ backgroundColor: member.accent }}
                />
                <Image
                  src={member.image}
                  alt={member.name}
                  width={coverMeta(member.image).w}
                  height={coverMeta(member.image).h}
                  sizes="(min-width: 768px) 30vw, 90vw"
                  placeholder={coverMeta(member.image).blur ? 'blur' : 'empty'}
                  blurDataURL={coverMeta(member.image).blur}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                />
              </div>

              <div className="p-5 flex flex-col gap-2 flex-grow text-start">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-lg font-bold text-[rgb(var(--foreground))]">
                    {member.name}
                  </h4>
                  <FaExternalLinkAlt className="text-[rgb(var(--muted-foreground))] group-hover:text-[rgb(var(--primary))] transition-colors shrink-0" />
                </div>
                <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed flex-grow">
                  {t(`platform_suite.members.${member.slug}`)}
                </p>
                <span className="text-xs text-[rgb(var(--primary))] font-medium break-all mt-2">
                  {member.url.replace(/^https?:\/\/|\/$/g, '')}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-[rgb(var(--muted-foreground))] mt-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t('platform_suite.footnote')}
        </motion.p>
      </div>
    </section>
  );
};

export default PlatformSuite;
