import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://walktopus.in';
  const stableLastModified = new Date('2026-06-04T00:00:00.000Z');

  return [
    { url: baseUrl, lastModified: stableLastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/services`, lastModified: stableLastModified, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/solutions`, lastModified: stableLastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/for-businesses`, lastModified: stableLastModified, changeFrequency: 'monthly', priority: 0.86 },
    { url: `${baseUrl}/for-individuals`, lastModified: stableLastModified, changeFrequency: 'monthly', priority: 0.84 },
    { url: `${baseUrl}/faq`, lastModified: stableLastModified, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/blogs`, lastModified: stableLastModified, changeFrequency: 'weekly', priority: 0.82 },
    { url: `${baseUrl}/about`, lastModified: stableLastModified, changeFrequency: 'monthly', priority: 0.74 },
    { url: `${baseUrl}/about/walktopus`, lastModified: stableLastModified, changeFrequency: 'monthly', priority: 0.73 },
    { url: `${baseUrl}/about/sukomal`, lastModified: stableLastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about/sagnik`, lastModified: stableLastModified, changeFrequency: 'monthly', priority: 0.69 },
    { url: `${baseUrl}/about/sneha`, lastModified: stableLastModified, changeFrequency: 'monthly', priority: 0.69 },
    { url: `${baseUrl}/contact`, lastModified: stableLastModified, changeFrequency: 'monthly', priority: 0.9 },
    {
      url: `${baseUrl}/blog/what-is-local-seo-for-indian-businesses`,
      lastModified: stableLastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/social-media-management-for-local-businesses-india`,
      lastModified: stableLastModified,
      changeFrequency: 'monthly',
      priority: 0.72,
    },
    {
      url: `${baseUrl}/blog/personal-branding-guide-for-indian-professionals`,
      lastModified: stableLastModified,
      changeFrequency: 'monthly',
      priority: 0.72,
    },
    {
      url: `${baseUrl}/blog/how-to-choose-a-digital-marketing-agency-in-kolkata`,
      lastModified: stableLastModified,
      changeFrequency: 'monthly',
      priority: 0.72,
    },
    ...BLOG_POSTS.map((post) => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ];
}
