export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/constants';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { breadcrumbSchema, pageMetadata, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Blogs',
  description:
    'Read Walktopus blog articles on digital marketing, local SEO, social media strategy, YouTube growth, personal branding, and website content for businesses and creators in India.',
  pathname: '/blogs',
  keywords: ['digital marketing blog India', 'SEO blog Kolkata', 'social media strategy articles'],
});

const blogListingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Walktopus Blog',
  description:
    'Insights on digital marketing, local SEO, personal branding, and content systems for businesses and individuals.',
  url: absoluteUrl('/blogs'),
  blogPost: BLOG_POSTS.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: absoluteUrl(`/blogs/${post.slug}`),
    datePublished: post.publishedAt,
  })),
};

const crumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Blogs', path: '/blogs' },
]);

export default function BlogsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <SectionHeader
        eyebrow="Insights"
        title="Search-friendly marketing insights for growing brands"
        subtitle="Practical articles on local SEO, digital marketing, YouTube discoverability, social media growth, and personal branding for businesses and individuals."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => (
          <article key={post.slug} className="flex h-full flex-col border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)]">
            <PlaceholderImage
              seed={post.imageSeed}
              width={1200}
              height={800}
              alt={post.title}
              className="h-56"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.12em] text-[var(--color-soft-gray)]">
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[var(--color-text-dark)]">
                <Link href={`/blogs/${post.slug}`} className="transition hover:text-[var(--color-accent)]">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-4 flex-1 text-sm leading-7 text-[var(--color-soft-gray)]">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {post.keywords.slice(0, 2).map((keyword) => (
                  <span
                    key={keyword}
                    className="border border-[var(--color-bg-secondary)] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-text)]"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <Link
                href={`/blogs/${post.slug}`}
                className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-accent)] transition hover:text-[var(--color-text-dark)]"
              >
                Read article
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}