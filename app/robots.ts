import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://walktopus.in';
  const host = new URL(baseUrl).host;
  const restrictedPaths = ['/api/', '/superadmin/', '/admin/', '/_vercel/', '/_next/'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: restrictedPaths,
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: restrictedPaths,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: restrictedPaths,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: restrictedPaths,
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: restrictedPaths,
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: restrictedPaths,
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: restrictedPaths,
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: restrictedPaths,
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: restrictedPaths,
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: restrictedPaths,
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: restrictedPaths,
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: restrictedPaths,
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: restrictedPaths,
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: restrictedPaths,
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'MetaInspector',
        allow: '/',
      },
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
      {
        userAgent: 'Bytespider',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host,
  };
}