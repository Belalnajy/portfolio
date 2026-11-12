import { FaPlus } from 'react-icons/fa';
import SectionHeading from './SectionHeading';
import { FAQ_ITEMS } from '../content/faq';

const HEADINGS = {
  en: { title: 'Frequently asked questions', subtitle: 'The short answers clients ask for most.' },
  ar: { title: 'أسئلة شائعة', subtitle: 'إجابات مختصرة لأكتر الأسئلة اللي بتوصلني من العملاء.' },
};

/**
 * The visible twin of the FAQPage structured data in HomeJsonLd: both read
 * src/content/faq.js, so what search and answer engines are told is exactly
 * what a visitor can read. Native <details> keeps every answer in the server
 * HTML and works without JavaScript.
 */
const HomeFaq = ({ lang = 'en' }) => {
  const { title, subtitle } = HEADINGS[lang];

  return (
    <section id="faq" className="py-20 relative text-start">
      <div className="shell relative z-10">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="space-y-3 max-w-3xl">
          {FAQ_ITEMS[lang].map(({ question, answer }) => (
            <details
              key={question}
              className="group glass-card rounded-2xl border border-[rgb(var(--border))]/50 open:border-[rgb(var(--primary))]/40 transition-colors">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 sm:p-6 font-semibold text-[rgb(var(--foreground))] [&::-webkit-details-marker]:hidden">
                <h3 className="text-base sm:text-lg">{question}</h3>
                <FaPlus
                  aria-hidden="true"
                  className="shrink-0 text-sm text-[rgb(var(--primary))] transition-transform group-open:rotate-45"
                />
              </summary>
              <p className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 text-[rgb(var(--muted-foreground))] leading-relaxed">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFaq;
