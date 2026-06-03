import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://walktopus.in';
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/solutions`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about/walktopus`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    {
      url: `${baseUrl}/blog/what-is-local-seo-for-indian-businesses`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/social-media-management-for-local-businesses-india`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.72,
    },
    {
      url: `${baseUrl}/blog/personal-branding-guide-for-indian-professionals`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.72,
    },
    {
      url: `${baseUrl}/blog/how-to-choose-a-digital-marketing-agency-in-kolkata`,
      lastModified,
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
