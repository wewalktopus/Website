export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/constants';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((entry) => entry.slug === slug);

  if (!post) {
    return pageMetadata({
      title: 'Blog Article',
      description: 'Walktopus marketing article.',
      pathname: '/blogs',
    });
  }

  return pageMetadata({
    title: post.title,
    description: post.description,
    pathname: `/blogs/${post.slug}`,
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: absoluteUrl('/opengraph-image'),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
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
    keywords: post.keywords.join(', '),
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

      <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">{post.category}</p>
      <h1 className="mt-4 text-5xl font-extrabold leading-tight text-(--color-text-dark) sm:text-6xl">{post.title}</h1>
      <div className="mt-6 flex flex-wrap gap-4 text-sm text-(--color-soft-gray)">
        <span>{post.publishedAt}</span>
        <span>{post.readTime}</span>
      </div>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-(--color-soft-gray)">{post.description}</p>

      <PlaceholderImage
        seed={post.imageSeed}
        width={1200}
        height={800}
        alt={post.title}
        className="mt-10 h-90"
        sizes="(min-width: 1024px) 896px, 100vw"
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {post.keywords.map((keyword) => (
          <span
            key={keyword}
            className="border border-(--color-bg-secondary) px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-(--color-text)"
          >
            {keyword}
          </span>
        ))}
      </div>

      <div className="mt-12 space-y-10">
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-3xl font-bold text-(--color-text-dark)">{section.heading}</h2>
            <p className="mt-4 text-base leading-8 text-(--color-soft-gray)">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}