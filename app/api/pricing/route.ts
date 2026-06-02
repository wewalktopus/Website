import { NextRequest, NextResponse } from 'next/server';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import {
  DEFAULT_PRICING_CONFIG,
  normalizePricingConfig,
  resolveAudienceFromCountry,
} from '@/lib/pricing-config';

export const runtime = 'nodejs';

const SETTINGS_COLLECTION = 'site_settings';
const PRICING_DOC_ID = 'pricing_config';

function getCountryCode(req: NextRequest): string {
  const queryCountry = req.nextUrl.searchParams.get('country');
  if (queryCountry) return queryCountry.toUpperCase();

  const headerCountry = req.headers.get('x-vercel-ip-country') ?? req.headers.get('cf-ipcountry');
  return (headerCountry ?? '').toUpperCase();
}

export async function GET(req: NextRequest) {
  const country = getCountryCode(req);
  const audience = resolveAudienceFromCountry(country);

  try {
    const db = getFirebaseAdminDb();
    const ref = db.collection(SETTINGS_COLLECTION).doc(PRICING_DOC_ID);
    const doc = await ref.get();

    if (!doc.exists) {
      return NextResponse.json({
        audience,
        country,
        content: DEFAULT_PRICING_CONFIG[audience],
        updatedAt: null,
      });
    }

    const data = doc.data() ?? {};
    const sourceConfig = data.config ?? data;
    const config = normalizePricingConfig(sourceConfig);
    const updatedAt = data.updatedAt?.toDate?.()?.toISOString?.() ?? null;

    return NextResponse.json({
      audience,
      country,
      content: config[audience],
      updatedAt,
    });
  } catch (error) {
    console.error('[pricing] GET error:', error);

    return NextResponse.json({
      audience,
      country,
      content: DEFAULT_PRICING_CONFIG[audience],
      updatedAt: null,
    });
  }
}
