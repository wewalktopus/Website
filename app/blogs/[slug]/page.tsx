export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { getPublishedBlogBySlug } from '@/lib/public-blogs';
import { absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);

  if (!post) {
    return pageMetadata({
      title: 'Blog Article',
      description: 'Walktopus marketing article.',
      pathname: '/blogs',
    });
  }

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    pathname: `/blogs/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl ? post.imageUrl : absoluteUrl('/opengraph-image'),
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Walktopus',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Walktopus',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo-transparent.png'),
      },
    },
    mainEntityOfPage: absoluteUrl(`/blogs/${post.slug}`),
  };

  const crumbs = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
    { name: post.title, path: `/blogs/${post.slug}` },
  ]);

  return (
    <article className="mx-auto w-full max-w-4xl px-6 py-24 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">{post.category ?? 'Blog'}</p>
      <h1 className="mt-4 text-5xl font-extrabold leading-tight text-(--color-text-dark) sm:text-6xl">{post.title}</h1>
      <div className="mt-6 flex flex-wrap gap-4 text-sm text-(--color-soft-gray)">
        <span>{new Date(post.createdAt).toLocaleDateString('en-IN')}</span>
        <span>{post.readTime ?? '5 min read'}</span>
      </div>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-(--color-soft-gray)">{post.excerpt}</p>

      <PlaceholderImage
        seed={post.slug}
        src={post.imageUrl}
        width={1200}
        height={800}
        alt={post.title}
        className="mt-10 h-90"
        sizes="(min-width: 1024px) 896px, 100vw"
      />

      <div className="prose prose-lg mt-12 max-w-none prose-headings:text-[var(--color-text-dark)] prose-p:text-[var(--color-soft-gray)] prose-a:text-[var(--color-accent)]">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  );
}