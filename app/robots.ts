import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://walktopus.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/_vercel/', '/static/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/_vercel/', '/static/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/opengraph-image', '/logo.png', '/logo-transparent.png', '/apple-icon', '/icon'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}