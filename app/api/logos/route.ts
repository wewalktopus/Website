import { NextResponse } from 'next/server';
import { listCompanyLogos } from '@/lib/company-logos';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const logos = await listCompanyLogos();

    return NextResponse.json(
      { logos },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    );
  } catch (err) {
    console.error('[logos GET]', err);
    return NextResponse.json({ logos: [] }, { status: 200 });
  }
}
