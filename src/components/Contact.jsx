"use client";
import { useState, useRef, useMemo, useEffect } from 'react';
import { m } from 'framer-motion';
import Reveal from './Reveal';
import { revealDelay, REVEAL_DURATION } from '../lib/motion';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaWhatsapp,
  FaRegClock,
} from 'react-icons/fa';
import SectionHeading from './SectionHeading';
import { useTranslation } from 'react-i18next';
import { useSite } from './SiteShell';
import { whatsappUrl } from './WhatsAppButton';

// Read at build time (NEXT_PUBLIC_* is inlined). No placeholder fallbacks: a
// build without them used to ship 'service_xxxxxxx' and fail on every submit
// with a generic error, so nobody noticed the form was dead.
const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};
const EMAILJS_CONFIGURED = Object.values(EMAILJS).every(Boolean);

// Bounds on what the form will send, so it cannot be used to mail a novel.
const MAX_LENGTH = { name: 100, email: 254, message: 5000 };
// Nobody reads the form, types three fields and submits this fast; scripts
// do. A faster submit is delayed until this much time has passed, not refused.
const MIN_FILL_TIME_MS = 3000;

const Contact = () => {
  const { showNotification } = useSite();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const honeypotRef = useRef(null);
  // When the form became usable, for the minimum-fill-time check.
  const mountedAt = useRef(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EMAILJS_CONFIGURED) {
      console.error('Contact form: the NEXT_PUBLIC_EMAILJS_* variables were not set when this build was made.');
      showNotification?.(t('contact.notifications.unavailable'), 'error');
      return;
    }

    // Honeypot: the field is invisible and unreachable for people, so only a
    // script fills it. Answer as if it worked and send nothing.
    if (honeypotRef.current?.value) {
      showNotification?.(t('contact.notifications.success'), 'success');
      setFormData({ name: '', email: '', message: '' });
      return;
    }

    setLoading(true);

    try {
      // Submitted faster than a person plausibly fills three fields: hold the
      // send until the minimum time has passed instead of refusing it. A quick
      // (autofilled) visitor only sees "Sending…" for a moment longer, and
      // a script that posts the form the instant it loads still has to wait.
      const remaining = MIN_FILL_TIME_MS - (Date.now() - mountedAt.current);
      if (remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining));

      // The SDK is only needed once someone actually submits.
      const { default: emailjs } = await import('@emailjs/browser');
      // Named fields rather than the whole form, so the honeypot never
      // reaches the email template.
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        { name: formData.name, email: formData.email, message: formData.message },
        EMAILJS.publicKey,
      );

      showNotification?.(t('contact.notifications.success'), 'success');

      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending email:', error);
      showNotification?.(t('contact.notifications.error'), 'error');
    } finally {
      setLoading(false);
    }
  };

  // The number stays out of the markup until the visitor asks for it, so
  // scrapers crawling the page never see a tel: link. The WhatsApp link gets
  // the same treatment: attached after hydration, absent from the static HTML.
  const [revealedPhone, setRevealedPhone] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    mountedAt.current = Date.now();
    setMounted(true);
  }, []);

  const contactInfo = useMemo(
    () => [
      {
        icon: <FaWhatsapp />,
        title: t('contact.info.whatsapp'),
        value: t('contact.info.whatsapp_cta'),
        href: mounted ? whatsappUrl(t('contact.whatsapp_message', { defaultValue: t('whatsapp.message') })) : null,
        highlight: true,
      },
      {
        icon: <FaEnvelope />,
        title: t('contact.info.email'),
        value: 'belalnajy9@gmail.com',
        href: 'mailto:belalnajy9@gmail.com',
      },
      {
        icon: <FaPhone />,
        title: t('contact.info.phone'),
        // Revealed on click. A plain tel: link on a public page gets scraped.
        value: '01201369949',
        href: 'tel:+201201369949',
        reveal: true,
      },
      {
        icon: <FaMapMarkerAlt />,
        title: t('contact.info.location'),
        value: t('contact.info.alexandria'),
        href: null,
      },
      {
        icon: <FaLinkedin />,
        title: t('contact.info.linkedin'),
        value: 'linkedin.com/in/belalnajy',
        href: 'https://linkedin.com/in/belalnajy',
      },
    ],
    [t, mounted],
  );

  return (
    <section id="contact" className="m-section relative text-start">
      <div className="shell relative z-10">
        <SectionHeading
          className="max-w-6xl mx-auto"
          eyebrow={t('mHome.eyebrow.contact')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}>
          {/* The reply-time promise, next to the way in. Prices are quoted
              per project, so the line says that too, without a number. */}
          <p className="mt-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[rgb(var(--muted-foreground))]">
            <FaRegClock aria-hidden="true" className="text-[rgb(var(--primary))]" />
            <span className="font-semibold text-[rgb(var(--foreground))]">{t('contact.reply_time')}</span>
            <span aria-hidden="true" className="max-md:hidden">·</span>
            <span className="max-md:basis-full max-md:ps-6">{t('contact.quote_note')}</span>
          </p>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-md:gap-7 max-w-6xl mx-auto">
          {/* Phones: the ways in as a 2x2 grid of tiles (WhatsApp, email,
              phone, LinkedIn), each tile the link itself, and the city as
              one line under them. Five 115px rows used to come first. */}
          <Reveal y={16} duration={0.5} className="md:hidden">
            <ul className="grid grid-cols-2 gap-3" aria-label={t('mHome.contact_ways')}>
              {contactInfo
                .filter((item) => item.href || item.reveal)
                .map((item) => {
                  const showNumber = item.reveal && revealedPhone;
                  const isEmail = item.href?.startsWith('mailto:');
                  const tileClass =
                    'm-card press flex flex-col items-start gap-3 h-full min-h-[116px] p-4! text-start';
                  const inner = (
                    <>
                      <span
                        aria-hidden="true"
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-lg ${
                          item.highlight
                            ? 'bg-[#25D366]/15 text-[#25D366] [:root[data-theme=light]_&]:text-[#128C4A]'
                            : 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]'
                        }`}>
                        {item.icon}
                      </span>
                      <span className="min-w-0 w-full">
                        <span className="block font-semibold text-[rgb(var(--foreground))] leading-tight">{item.title}</span>
                        <span
                          // The address may not truncate: on a 360px phone it
                          // breaks once, before the @, onto a second line.
                          className={`block w-fit max-w-full mt-1 text-xs ${isEmail ? 'leading-snug' : 'truncate'} ${
                            item.reveal && !showNumber ? 'text-[rgb(var(--primary))] font-semibold' : 'text-[rgb(var(--muted-foreground))]'
                          }`}
                          dir={item.highlight || (item.reveal && !showNumber) ? undefined : 'ltr'}>
                          {item.reveal && !showNumber
                            ? t('contact.info.show_phone')
                            : item.highlight
                              ? t('contact.info.whatsapp_cta')
                              : isEmail
                                ? (
                                  <>
                                    {item.value.split('@')[0]}
                                    <wbr />@{item.value.split('@')[1]}
                                  </>
                                )
                                : item.value.replace(/^linkedin\.com\/in\//, '')}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={item.title}>
                      {item.reveal && !showNumber ? (
                        <button type="button" onClick={() => setRevealedPhone(true)} className={`${tileClass} w-full`}>
                          {inner}
                        </button>
                      ) : (
                        <a
                          href={item.href ?? undefined}
                          target={item.href?.startsWith('http') ? '_blank' : undefined}
                          rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={tileClass}>
                          {inner}
                        </a>
                      )}
                    </li>
                  );
                })}
            </ul>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))]">
              <FaMapMarkerAlt aria-hidden="true" className="text-[rgb(var(--primary))]" />
              {t('contact.info.alexandria')}
            </p>
          </Reveal>

          {/* Contact Information */}
          <Reveal x={isArabic ? 20 : -20} duration={0.5}
            className="space-y-6 max-md:hidden">
            {contactInfo.map((item, index) => (
              <Reveal
                as={m.div}
                x={isArabic ? 20 : -20}
                delay={revealDelay(index)}
                key={index}
                // Still read by Framer for the hover animation below.
                transition={{ duration: REVEAL_DURATION, delay: revealDelay(index) }}
                whileHover={{ y: -5, scale: 1.02 }}
                // The link or button inside stretches over the card (its
                // ::after), so the whole card is the tap target it looks
                // like; the location card has nothing to open and is not
                // dressed as clickable.
                className={`focus-card relative flex items-start gap-6 glass-card glass-hover p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[rgb(var(--border))]/50 ${
                  item.href || item.reveal ? 'cursor-pointer' : ''
                }`}>
                <div
                  className={`p-4 rounded-xl border flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${
                    item.highlight
                      ? 'bg-[#25D366]/15 border-[#25D366]/40'
                      : 'bg-[rgb(var(--primary))]/10 border-[rgb(var(--border))]'
                  }`}>
                  <div className={`text-3xl ${item.highlight ? 'text-[#25D366]' : 'text-[rgb(var(--primary))]'}`}>{item.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[rgb(var(--foreground))] mb-2 text-start">
                    {item.title}
                  </h3>
                  {item.reveal && !revealedPhone ? (
                    <button
                      type="button"
                      onClick={() => setRevealedPhone(true)}
                      className="text-[rgb(var(--primary))] hover:underline transition-colors text-start block min-h-[44px] after:absolute after:inset-0 after:content-[''] after:rounded-xl">
                      {t('contact.info.show_phone')}
                    </button>
                  ) : item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith('http') ? '_blank' : undefined
                      }
                      rel={
                        item.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      // Addresses and handles are Latin and left-to-right in
                      // either language; dir="ltr" keeps "@" and "." in place.
                      dir={item.reveal || item.highlight ? undefined : 'ltr'}
                      className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors text-start block after:absolute after:inset-0 after:content-[''] after:rounded-xl">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[rgb(var(--muted-foreground))] text-start">
                      {item.value}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </Reveal>

          {/* Contact Form */}
          <Reveal x={isArabic ? -20 : 20} duration={0.5}
            className="glass-card m-card max-md:shadow-[var(--elev-2)]! p-8 rounded-xl">
            <h3 className="md:hidden type-h3 font-display font-bold text-[rgb(var(--foreground))] mb-4">
              {t('mHome.form_title')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6 max-md:space-y-4">
              {/* Honeypot. Off-screen rather than display:none (some bots skip
                  those), out of the tab order and hidden from assistive tech. */}
              <div aria-hidden="true" className="absolute -start-[9999px] w-px h-px overflow-hidden">
                <input
                  ref={honeypotRef}
                  type="text"
                  name="hp_note"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-[rgb(var(--foreground))] font-medium mb-2 max-md:mb-1.5 max-md:text-sm text-start">
                  {t('contact.form.name')}
                  {/* Required, shown; the field's own `required` says it to
                      assistive tech, so the mark itself is hidden from it. */}
                  <span aria-hidden="true" className="text-[rgb(var(--destructive))] ms-1">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  maxLength={MAX_LENGTH.name}
                  className="w-full glass-card border border-[rgb(var(--border-control))]! rounded-lg px-4 py-3 max-md:min-h-12 max-md:text-base max-md:rounded-[0.875rem] max-md:shadow-none! text-[rgb(var(--foreground))] focus:border-[rgb(var(--primary))] transition-colors text-start"
                  placeholder={t('contact.form.placeholders.name')}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-[rgb(var(--foreground))] font-medium mb-2 max-md:mb-1.5 max-md:text-sm text-start">
                  {t('contact.form.email')}
                  {/* Required, shown; the field's own `required` says it to
                      assistive tech, so the mark itself is hidden from it. */}
                  <span aria-hidden="true" className="text-[rgb(var(--destructive))] ms-1">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  dir="ltr"
                  maxLength={MAX_LENGTH.email}
                  className="w-full glass-card border border-[rgb(var(--border-control))]! rounded-lg px-4 py-3 max-md:min-h-12 max-md:text-base max-md:rounded-[0.875rem] max-md:shadow-none! text-[rgb(var(--foreground))] focus:border-[rgb(var(--primary))] transition-colors text-start"
                  placeholder={t('contact.form.placeholders.email')}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-[rgb(var(--foreground))] font-medium mb-2 max-md:mb-1.5 max-md:text-sm text-start">
                  {t('contact.form.message')}
                  {/* Required, shown; the field's own `required` says it to
                      assistive tech, so the mark itself is hidden from it. */}
                  <span aria-hidden="true" className="text-[rgb(var(--destructive))] ms-1">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={MAX_LENGTH.message}
                  rows="4"
                  className="w-full glass-card border border-[rgb(var(--border-control))]! rounded-lg px-4 py-3 max-md:text-base max-md:rounded-[0.875rem] max-md:shadow-none! text-[rgb(var(--foreground))] focus:border-[rgb(var(--primary))] transition-colors resize-none text-start"
                  placeholder={t('contact.form.placeholders.message')}
                />
              </div>
              <m.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                className={`press w-full py-3 max-md:min-h-[52px] rounded-lg max-md:rounded-[var(--radius-btn)] max-md:text-[17px] font-semibold transition-all ${
                  loading
                    ? 'bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] cursor-not-allowed opacity-70'
                    : 'bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-hover))] hover:shadow-lg hover:shadow-[rgb(var(--accent))]/50'
                } text-[rgb(var(--primary-foreground))]`}>
                {/* Ink on copper, as .btn-primary: the light on-scrim text
                    was 2.2–2.7:1 on this gradient in the dark theme. */}
                {loading ? t('contact.form.sending') : t('contact.form.submit')}
              </m.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
