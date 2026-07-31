const SITE_URL = 'https://belalnagy.com';

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/case-study/bilqalam`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
