import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { sendNewBlogEmailToSubscribers } from '@/lib/blog-newsletter';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function normalizeImageUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getFirebaseAdminDb();
  const url = new URL(req.url);
  const status = url.searchParams.get('status');

  let query = db.collection('blogs').orderBy('createdAt', 'desc') as FirebaseFirestore.Query;
  if (status) query = query.where('status', '==', status);

  const snapshot = await query.get();
  const blogs = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.()?.toISOString() ?? null,
    updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() ?? null,
  }));

  return NextResponse.json({ blogs });
}

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role === 'viewer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { title, excerpt, content, imageUrl, status: postStatus } = await req.json();
  const normalizedImageUrl = normalizeImageUrl(imageUrl);

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
  }

  const db = getFirebaseAdminDb();
  const slug = slugify(title) + '-' + Date.now().toString(36);

  const ref = await db.collection('blogs').add({
    title,
    slug,
    excerpt: excerpt ?? '',
    content,
    imageUrl: normalizedImageUrl,
    status: postStatus === 'published' ? 'published' : 'draft',
    author: session.uid,
    authorName: session.name,
    newsletterSentAt: null,
    newsletterSentCount: 0,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  if (postStatus === 'published') {
    try {
      const { sent, failed } = await sendNewBlogEmailToSubscribers({
        title,
        slug,
        excerpt: excerpt ?? '',
        imageUrl: normalizedImageUrl,
      });

      await ref.update({
        newsletterSentAt: FieldValue.serverTimestamp(),
        newsletterSentCount: sent,
        newsletterFailedCount: failed,
        updatedAt: FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('[admin/blogs POST] Failed to send blog newsletter emails', error);
      await ref.update({
        newsletterFailedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
    }
  }

  return NextResponse.json({ success: true, id: ref.id, slug });
}
