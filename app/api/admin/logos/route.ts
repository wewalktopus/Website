import { NextRequest, NextResponse } from 'next/server';
import { hasPermission, verifyAdminRequest } from '@/lib/admin-auth';
import {
  createCompanyLogo,
  listCompanyLogos,
  reorderCompanyLogos,
} from '@/lib/company-logos';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(session.role, 'logos:read')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const logos = await listCompanyLogos();
    return NextResponse.json({ logos });
  } catch (err) {
    console.error('[admin/logos GET]', err);
    return NextResponse.json({ error: 'Failed to load logos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(session.role, 'logos:write')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const alt = formData.get('alt');
    const href = formData.get('href');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Logo file is required' }, { status: 400 });
    }

    const logos = await createCompanyLogo({
      file,
      alt: typeof alt === 'string' ? alt : null,
      href: typeof href === 'string' ? href : null,
    });

    return NextResponse.json({ success: true, logos }, { status: 201 });
  } catch (err) {
    console.error('[admin/logos POST]', err);
    const message = err instanceof Error ? err.message : 'Failed to upload logo';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(session.role, 'logos:write')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const orderedIds: unknown = body?.orderedIds;

    if (!Array.isArray(orderedIds) || !orderedIds.every((id) => typeof id === 'string')) {
      return NextResponse.json({ error: 'orderedIds must be an array of logo ids' }, { status: 400 });
    }

    const logos = await reorderCompanyLogos(orderedIds);
    return NextResponse.json({ success: true, logos });
  } catch (err) {
    console.error('[admin/logos PUT]', err);
    const message = err instanceof Error ? err.message : 'Failed to reorder logos';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
