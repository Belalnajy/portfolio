export const metadata = {
  title: 'Privacy',
  description:
    'What belalnagy.com collects: contact form messages, cookie-less analytics events and your theme and language choice. No tracking cookies, no advertising, nothing sold or shared.',
  alternates: {
    canonical: '/privacy',
    languages: { en: '/privacy', ar: '/ar/privacy', 'x-default': '/privacy' },
  },
  robots: { index: true, follow: true },
};

export default function PrivacyLayout({ children }) {
  return children;
}
