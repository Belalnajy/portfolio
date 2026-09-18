"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { REVEAL_VIEWPORT } from '../lib/motion';
import { FaArrowRight, FaCheck, FaTimes, FaFileInvoiceDollar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

/**
 * A live demo of the thing that is hard to prove on a portfolio: that Arabic
 * support survives past the landing page.
 *
 * The invoice below is real markup rendered twice over — the visitor flips the
 * direction and flips between the naive treatment and the correct one, and
 * watches four specific things break and un-break. Every failure shown here is
 * a real one, reproducible in any browser:
 *
 *   1. Physical CSS (text-align: left, margin-left) does not follow direction,
 *      so a flipped layout keeps its alignment and its gutters on the old side.
 *   2. Directional icons have to mirror. An arrow that means "next" points the
 *      wrong way in RTL unless it is flipped.
 *   3. Two unisolated runs that sit in neighbouring cells read as one token:
 *      the quantity and the product code collide into "12OIL-4471".
 *   4. Table columns mirror with the direction, but physical alignment leaves
 *      the numeric column hanging off the wrong edge.
 *
 * The fixes are the boring correct ones: logical properties, mirrored icons,
 * <bdi> around foreign runs, and dir="ltr" on numeric cells.
 */

/**
 * Deliberately car parts, not web work.
 *
 * The first draft billed for an admin dashboard, a payment integration and
 * monthly support — which on the services page, directly above the packages,
 * read as a published rate card. It is not one, and the packages quote per
 * project on purpose. Spare parts carry the same demo payload (Arabic names,
 * Latin SKUs, a two-digit quantity, decimal prices) with nothing to mistake
 * for a price list, and they match the kind of catalogue these platforms
 * actually hold.
 *
 * The arithmetic is real: 12x85 + 2x420 + 1x610 = 2,470.
 */
const ROWS = [
  { item: 'فلتر زيت', sku: 'OIL-4471', qty: 12, price: '85.00' },
  { item: 'طقم فرامل أمامي', sku: 'BRK-2208', qty: 2, price: '420.00' },
  { item: 'بطارية 70 أمبير', sku: 'BAT-7015', qty: 1, price: '610.00' },
];

const TOTAL = '2,470.00';
const CURRENCY = 'SAR';

/**
 * The invoice's own chrome stays Arabic in both languages, because the
 * document under test is an Arabic invoice — translating its labels would
 * quietly remove the thing being demonstrated. Only the controls and the
 * commentary follow the visitor's language.
 */
const DOC = {
  invoice: 'فاتورة',
  invoiceNo: 'رقم',
  next: 'التالي',
  item: 'البند',
  qty: 'الكمية',
  price: 'السعر',
  total: 'الإجمالي',
};

const Toggle = ({ options, value, onChange, label }) => (
  <div
    role="group"
    aria-label={label}
    className="inline-flex rounded-xl bg-[rgb(var(--muted))]/30 border border-[rgb(var(--border))] p-1">
    {options.map((option) => (
      <button
        key={String(option.value)}
        type="button"
        onClick={() => onChange(option.value)}
        aria-pressed={value === option.value}
        className={`px-4 min-h-[38px] rounded-lg text-sm font-semibold transition-colors ${
          value === option.value
            ? 'bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))]'
            : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
        }`}>
        {option.label}
      </button>
    ))}
  </div>
);

const RtlDemo = () => {
  const { t } = useTranslation();
  const [dir, setDir] = useState('rtl');
  const [correct, setCorrect] = useState(false);

  const isRtl = dir === 'rtl';
  // Only the naive treatment in RTL actually misbehaves; that pairing is the
  // whole point of the demo.
  const broken = isRtl && !correct;

  const checks = ['alignment', 'icons', 'bidi', 'numerals'];

  return (
    <motion.section
      id="rtl-demo"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.5 }}
      className="scroll-mt-24">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 text-[rgb(var(--primary))] font-bold tracking-widest uppercase text-xs sm:text-sm mb-3">
          <FaFileInvoiceDollar />
          {t('rtl_demo.label')}
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--foreground))] tracking-tight mb-3">
          {t('rtl_demo.title')}
        </h3>
        <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto leading-relaxed">
          {t('rtl_demo.subtitle')}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        <Toggle
          label={t('rtl_demo.direction')}
          value={dir}
          onChange={setDir}
          options={[
            { value: 'ltr', label: 'LTR' },
            { value: 'rtl', label: 'RTL' },
          ]}
        />
        <Toggle
          label={t('rtl_demo.treatment')}
          value={correct}
          onChange={setCorrect}
          options={[
            { value: false, label: t('rtl_demo.naive') },
            { value: true, label: t('rtl_demo.correct') },
          ]}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 items-start">
        {/* The invoice under test */}
        <div className="lg:col-span-2">
          <div
            dir={dir}
            className={`rounded-2xl border p-5 sm:p-6 bg-[rgb(var(--card))] transition-colors ${
              broken
                ? 'border-[rgb(var(--destructive))]/40'
                : 'border-[rgb(var(--success))]/30'
            }`}>
            {/* Header: alignment + a directional icon */}
            <div
              className={`flex items-center justify-between gap-3 pb-4 mb-4 border-b border-[rgb(var(--border))] ${
                correct ? 'text-start' : 'text-left'
              }`}>
              <div className={correct ? 'text-start' : 'text-left'}>
                <p className="font-bold text-[rgb(var(--foreground))]">{DOC.invoice}</p>
                <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">
                  {/* A Latin run inside an RTL line: isolated, or not. */}
                  {correct ? (
                    <>
                      {DOC.invoiceNo} <bdi dir="ltr">INV-2026-0412</bdi>
                    </>
                  ) : (
                    <>{DOC.invoiceNo} INV-2026-0412</>
                  )}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--primary))] ${
                  correct ? '' : 'flex-row'
                }`}>
                {DOC.next}
                <FaArrowRight className={correct && isRtl ? 'rotate-180' : ''} />
              </span>
            </div>

            {/* Line items */}
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[rgb(var(--muted-foreground))] text-xs">
                  <th className={`pb-2 font-semibold ${correct ? 'text-start' : 'text-left'}`}>
                    {DOC.item}
                  </th>
                  <th className={`pb-2 font-semibold ${correct ? 'text-end' : 'text-right'}`}>
                    {DOC.qty}
                  </th>
                  <th className={`pb-2 font-semibold ${correct ? 'text-end' : 'text-right'}`}>
                    {DOC.price}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.sku} className="border-t border-[rgb(var(--border))]/60">
                    <td className={`py-2.5 text-[rgb(var(--foreground))] ${correct ? 'text-start' : 'text-left'}`}>
                      {row.item}{' '}
                      {correct ? (
                        <bdi dir="ltr" className="text-xs text-[rgb(var(--muted-foreground))]">
                          {row.sku}
                        </bdi>
                      ) : (
                        <span className="text-xs text-[rgb(var(--muted-foreground))]">{row.sku}</span>
                      )}
                    </td>
                    <td
                      className={`py-2.5 text-[rgb(var(--muted-foreground))] ${correct ? 'text-end' : 'text-right'}`}
                      dir={correct ? 'ltr' : undefined}>
                      {row.qty}
                    </td>
                    <td
                      className={`py-2.5 text-[rgb(var(--foreground))] tabular-nums ${correct ? 'text-end' : 'text-right'}`}
                      dir={correct ? 'ltr' : undefined}>
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total: the currency + amount pair that bidi reorders */}
            <div
              className={`flex items-center justify-between pt-4 mt-2 border-t border-[rgb(var(--border))] ${
                correct ? 'text-start' : 'text-left'
              }`}>
              <span className="font-semibold text-[rgb(var(--foreground))]">{DOC.total}</span>
              <span className="font-bold text-lg text-[rgb(var(--primary))]">
                {correct ? (
                  <bdi dir="ltr">
                    {CURRENCY} {TOTAL}
                  </bdi>
                ) : (
                  <>
                    {CURRENCY} {TOTAL}
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* What to look at */}
        <aside className="glass-card rounded-2xl border border-[rgb(var(--border))]/60 p-5 text-start">
          <p className="font-bold text-[rgb(var(--foreground))] mb-4">
            {broken ? t('rtl_demo.breaking') : t('rtl_demo.holding')}
          </p>
          <ul className="space-y-3">
            {checks.map((key) => (
              <li key={key} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    broken
                      ? 'bg-[rgb(var(--destructive))]/15 text-[rgb(var(--destructive))]'
                      : 'bg-[rgb(var(--success))]/15 text-[rgb(var(--success))]'
                  }`}>
                  {broken ? <FaTimes /> : <FaCheck />}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-[rgb(var(--foreground))]">
                    {t(`rtl_demo.checks.${key}.title`)}
                  </span>
                  <span className="block text-xs text-[rgb(var(--muted-foreground))] leading-relaxed mt-0.5">
                    {broken
                      ? t(`rtl_demo.checks.${key}.broken`)
                      : t(`rtl_demo.checks.${key}.fixed`)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[rgb(var(--muted-foreground))] leading-relaxed mt-5 pt-4 border-t border-[rgb(var(--border))]/60">
            {t('rtl_demo.footnote')}
          </p>
          <p className="text-[11px] text-[rgb(var(--muted-foreground))]/70 mt-3">
            {t('rtl_demo.sample_note')}
          </p>
        </aside>
      </div>
    </motion.section>
  );
};

export default RtlDemo;
