import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
  lang: 'en',
  path: '/privacy',
  title: 'Privacy',
  description:
    'What belalnagy.com collects: contact form messages, cookie-less analytics events and your theme and language choice. No tracking cookies, no advertising, nothing sold or shared.',
  shareTitle: 'Privacy | Belal Nagy',
});

export default function PrivacyLayout({ children }) {
  return children;
}
