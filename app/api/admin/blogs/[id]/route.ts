import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { sendNewBlogEmailToSubscribers } from '@/lib/blog-newsletter';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const db = getFirebaseAdminDb();
  const doc = await db.collection('blogs').doc(id).get();

  if (!doc.exists) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });

  return NextResponse.json({
    blog: {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate?.()?.toISOString() ?? null,
      updatedAt: doc.data()?.updatedAt?.toDate?.()?.toISOString() ?? null,
    },
  });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role === 'viewer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const db = getFirebaseAdminDb();
  const docRef = db.collection('blogs').doc(id);
  const prevDoc = await docRef.get();

  if (!prevDoc.exists) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  const prevData = prevDoc.data() as Record<string, unknown>;
  const updates: Record<string, unknown> = { updatedAt: FieldValue.serverTimestamp() };

  for (const key of ['title', 'excerpt', 'content', 'status', 'imageUrl']) {
    if (key in body) updates[key] = body[key];
  }

  await docRef.update(updates);

  const isTransitionToPublished = body.status === 'published' && prevData.status !== 'published';
  const alreadySent = Boolean(prevData.newsletterSentAt);

  if (isTransitionToPublished && !alreadySent) {
    const nextTitle = typeof body.title === 'string' ? body.title : String(prevData.title ?? 'New Walktopus Blog Post');
    const nextSlug = typeof prevData.slug === 'string' ? prevData.slug : '';
    const nextExcerpt = typeof body.excerpt === 'string'
      ? body.excerpt
      : (typeof prevData.excerpt === 'string' ? prevData.excerpt : '');
    const nextImageUrl = typeof body.imageUrl === 'string'
      ? body.imageUrl
      : (typeof prevData.imageUrl === 'string' ? prevData.imageUrl : null);

    if (nextSlug) {
      try {
        const { sent, failed } = await sendNewBlogEmailToSubscribers({
          title: nextTitle,
          slug: nextSlug,
          excerpt: nextExcerpt,
          imageUrl: nextImageUrl,
        });

        await docRef.update({
          newsletterSentAt: FieldValue.serverTimestamp(),
          newsletterSentCount: sent,
          newsletterFailedCount: failed,
          updatedAt: FieldValue.serverTimestamp(),
        });
      } catch (error) {
        console.error('[admin/blogs PATCH] Failed to send blog newsletter emails', error);
        await docRef.update({
          newsletterFailedAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });
      }
    }
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role === 'viewer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const db = getFirebaseAdminDb();
  await db.collection('blogs').doc(id).delete();
  return NextResponse.json({ success: true });
}
