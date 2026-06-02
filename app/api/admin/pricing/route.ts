import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import { DEFAULT_PRICING_CONFIG, normalizePricingConfig } from '@/lib/pricing-config';
import type { PricingConfig } from '@/types';

export const runtime = 'nodejs';

const SETTINGS_COLLECTION = 'site_settings';
const PRICING_DOC_ID = 'pricing_config';

function withMetadata(config: PricingConfig, raw: FirebaseFirestore.DocumentData | undefined): PricingConfig {
  const updatedAt = raw?.updatedAt?.toDate?.()?.toISOString?.() ?? null;
  const updatedBy = typeof raw?.updatedBy === 'string' ? raw.updatedBy : null;

  return {
    ...config,
    updatedAt,
    updatedBy,
  };
}

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const db = getFirebaseAdminDb();
    const ref = db.collection(SETTINGS_COLLECTION).doc(PRICING_DOC_ID);
    const doc = await ref.get();

    if (!doc.exists) {
      return NextResponse.json({ config: DEFAULT_PRICING_CONFIG });
    }

    const data = doc.data() ?? {};
    const sourceConfig = data.config ?? data;
    const config = normalizePricingConfig(sourceConfig);

    return NextResponse.json({ config: withMetadata(config, data) });
  } catch (error) {
    console.error('[admin/pricing] GET error:', error);
    return NextResponse.json({ error: 'Failed to load pricing config' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role === 'viewer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const body = await req.json();
    const config = normalizePricingConfig(body?.config ?? body);

    const db = getFirebaseAdminDb();
    const ref = db.collection(SETTINGS_COLLECTION).doc(PRICING_DOC_ID);

    await ref.set(
      {
        config,
        updatedBy: session.uid,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    const doc = await ref.get();
    const data = doc.data() ?? {};
    const saved = normalizePricingConfig((data as { config?: unknown }).config ?? data);

    return NextResponse.json({ success: true, config: withMetadata(saved, data) });
  } catch (error) {
    console.error('[admin/pricing] PUT error:', error);
    return NextResponse.json({ error: 'Failed to save pricing config' }, { status: 500 });
  }
}
