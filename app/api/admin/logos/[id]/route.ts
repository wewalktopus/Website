import { NextRequest, NextResponse } from 'next/server';
import { hasPermission, verifyAdminRequest } from '@/lib/admin-auth';
import { deleteCompanyLogo, updateCompanyLogo } from '@/lib/company-logos';

export const runtime = 'nodejs';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(session.role, 'logos:write')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const formData = await req.formData();
    const file = formData.get('file');
    const alt = formData.get('alt');
    const href = formData.get('href');

    const logos = await updateCompanyLogo(id, {
      file: file instanceof File ? file : null,
      alt: typeof alt === 'string' ? alt : undefined,
      href: typeof href === 'string' ? href : undefined,
    });

    return NextResponse.json({ success: true, logos });
  } catch (err) {
    console.error('[admin/logos/:id PATCH]', err);
    const message = err instanceof Error ? err.message : 'Failed to update logo';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(session.role, 'logos:write')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const logos = await deleteCompanyLogo(id);
    return NextResponse.json({ success: true, logos });
  } catch (err) {
    console.error('[admin/logos/:id DELETE]', err);
    const message = err instanceof Error ? err.message : 'Failed to delete logo';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
