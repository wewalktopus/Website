import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { hasPermission, verifyAdminRequest } from '@/lib/admin-auth';
import { uploadImageToImgBB } from '@/lib/imgbb';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(session.role, 'blogs:write')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Image file is required' }, { status: 400 });
    }

    const imageName = `blog-${randomUUID().replace(/-/g, '').slice(0, 16)}`;
    const upload = await uploadImageToImgBB(file, { imageName });
    return NextResponse.json({ success: true, imageUrl: upload.url });
  } catch (error) {
    console.error('[admin/blogs/upload]', error);
    const message = error instanceof Error ? error.message : 'Failed to upload image';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
