import 'server-only';

import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import type { BlogPost } from '@/types';

type FirestoreBlog = Omit<BlogPost, 'createdAt' | 'updatedAt'> & {
  createdAt: { toDate?: () => Date } | null;
  updatedAt: { toDate?: () => Date } | null;
};

function toIso(value: FirestoreBlog['createdAt'] | FirestoreBlog['updatedAt']): string {
  return value?.toDate?.()?.toISOString() ?? new Date().toISOString();
}

function makeReadTime(content: string): string {
  const words = content
    .replace(/<[^>]*>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.round(words / 180))} min read`;
}

function mapBlog(doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>): BlogPost {
  const data = doc.data() as FirestoreBlog;
  const normalizedImageUrl = typeof data.imageUrl === 'string' && data.imageUrl.trim() ? data.imageUrl.trim() : null;
  return {
    id: doc.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt ?? data.description ?? '',
    description: data.description ?? data.excerpt ?? '',
    content: data.content,
    status: data.status,
    author: data.author,
    authorName: data.authorName,
    category: data.category ?? 'Blog',
    readTime: data.readTime ?? makeReadTime(data.content ?? ''),
    imageUrl: normalizedImageUrl,
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  };
}

export async function getPublishedBlogs(): Promise<BlogPost[]> {
  try {
    const db = getFirebaseAdminDb();
    const snapshot = await db.collection('blogs').orderBy('createdAt', 'desc').get();

    return snapshot.docs
      .map(mapBlog)
      .filter((blog) => blog.status === 'published');
  } catch (error) {
    console.error('[public-blogs] Failed to fetch published blogs:', error);
    return [];
  }
}

export async function getPublishedBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const db = getFirebaseAdminDb();
    const snapshot = await db.collection('blogs').where('slug', '==', slug).limit(1).get();
    const doc = snapshot.docs[0];

    if (!doc) {
      return null;
    }

    const blog = mapBlog(doc);
    return blog.status === 'published' ? blog : null;
  } catch (error) {
    console.error(`[public-blogs] Failed to fetch blog by slug: ${slug}`, error);
    return null;
  }
}