import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://walktopus.in';

  return {
    rules: [
      // General crawlers - allow everything except api routes
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/_vercel/', '/static/'],
      },
      // Google Search
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/_vercel/', '/static/'],
      },
      // Google Images
      {
        userAgent: 'Googlebot-Image',
        allow: ['/opengraph-image', '/logo.png', '/logo-transparent.png', '/apple-icon', '/icon'],
      },
      // AI & Generative Engine Crawlers - Explicitly allow for better AI indexing
      {
        userAgent: 'CCBot', // Common Crawl
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot', // Perplexity AI
        allow: '/',
      },
      {
        userAgent: 'GPTBot', // OpenAI GPT
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot', // Anthropic Claude
        allow: '/',
      },
      {
        userAgent: 'Google-Extended', // Google AI crawlers
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended', // Apple AI crawlers
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai', // Anthropic crawlers
        allow: '/',
      },
      {
        userAgent: 'bingbot', // Microsoft Bing
        allow: '/',
      },
      {
        userAgent: 'Slurp', // Yahoo
        allow: '/',
      },
      {
        userAgent: 'DuckDuckBot', // DuckDuckGo
        allow: '/',
      },
      {
        userAgent: 'Teoma', // Ask.com
        allow: '/',
      },
      {
        userAgent: 'facebookexternalhit', // Facebook
        allow: '/',
      },
      {
        userAgent: 'MetaInspector', // Meta tools
        allow: '/',
      },
      // Block bad actors
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}