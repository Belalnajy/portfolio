/**
 * Root layout for /admin: the owner's moderation page. Not part of the
 * public site (no shell, no fonts, no analytics), never indexed, and not in
 * the sitemap.
 */
export const metadata = {
  title: 'Comments · admin',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0b0f14', color: '#e8edf2', font: '16px/1.6 system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
