import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

type Folder = 'inbox' | 'sent' | 'draft';

function getFolder(url: URL): Folder {
  const raw = (url.searchParams.get('folder') ?? 'inbox').toLowerCase();
  if (raw === 'sent' || raw === 'draft') return raw;
  return 'inbox';
}

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const db = getFirebaseAdminDb();
    const url = new URL(req.url);
    const folder = getFolder(url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50', 10), 200);

    if (folder === 'inbox') {
      return NextResponse.json({ messages: [], folder, source: 'resend' });
    }

    const snapshot = await db.collection('email_messages').orderBy('createdAt', 'desc').limit(limit * 4).get();

    const messages = snapshot.docs
      .map((doc) => {
        const data = doc.data() as Record<string, unknown>;
        return {
          id: doc.id,
          ...data,
          folder: typeof data.folder === 'string' ? data.folder : 'draft',
          createdAt:
            data.createdAt && typeof (data.createdAt as { toDate?: () => Date }).toDate === 'function'
              ? (data.createdAt as { toDate: () => Date }).toDate().toISOString()
              : null,
          updatedAt:
            data.updatedAt && typeof (data.updatedAt as { toDate?: () => Date }).toDate === 'function'
              ? (data.updatedAt as { toDate: () => Date }).toDate().toISOString()
              : null,
        };
      })
      .filter((message) => message.folder === folder)
      .slice(0, limit);

    return NextResponse.json({ messages, folder });
  } catch (error) {
    console.error('[admin/email/mailboxes GET]', error);
    return NextResponse.json({ error: 'Failed to load mailbox' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role === 'viewer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const body = (await req.json()) as {
      id?: string;
      subject?: string;
      body?: string;
      to?: string[];
      senderProfile?: string;
      senderLocalPart?: string;
      templateId?: string | null;
    };

    const db = getFirebaseAdminDb();
    const payload = {
      folder: 'draft',
      subject: (body.subject ?? '').trim(),
      body: body.body ?? '',
      to: Array.isArray(body.to) ? body.to.filter((value) => typeof value === 'string') : [],
      toCount: Array.isArray(body.to) ? body.to.length : 0,
      senderProfile: body.senderProfile ?? 'professional',
      senderLocalPart: body.senderLocalPart ?? 'hello',
      templateId: body.templateId ?? null,
      createdBy: session.uid,
      createdByEmail: session.email,
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (body.id) {
      const ref = db.collection('email_messages').doc(body.id);
      await ref.set(payload, { merge: true });
      return NextResponse.json({ success: true, id: body.id, updated: true });
    }

    const ref = await db.collection('email_messages').add({
      ...payload,
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true, id: ref.id, created: true });
  } catch (error) {
    console.error('[admin/email/mailboxes POST]', error);
    return NextResponse.json({ error: 'Failed to save draft' }, { status: 500 });
  }
}
