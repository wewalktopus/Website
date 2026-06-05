import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin-auth';

export const runtime = 'nodejs';

function getApiKey(): string {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is missing');
  }
  return apiKey;
}

function normalizeEmailList(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input.filter((value): value is string => typeof value === 'string').map((value) => value.trim()).filter(Boolean);
  }
  if (typeof input === 'string') {
    return input.split(',').map((value) => value.trim()).filter(Boolean);
  }
  return [];
}

function extractPreview(item: Record<string, unknown>): string {
  const text = typeof item.text === 'string' ? item.text : '';
  const html = typeof item.html === 'string' ? item.html : '';
  if (text.trim()) return text.slice(0, 220);
  if (html.trim()) return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 220);
  return '';
}

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const url = new URL(req.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50', 10), 200);

    const response = await fetch(`https://api.resend.com/emails?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${getApiKey()}`,
      },
      cache: 'no-store',
    });

    const payload = (await response.json().catch(() => ({}))) as { data?: unknown[]; error?: unknown };
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch inbox from Resend', details: payload.error ?? null }, { status: 502 });
    }

    const data = Array.isArray(payload.data) ? payload.data : [];
    const companyAddress = (process.env.RESEND_FROM_EMAIL ?? 'hello@walktopus.in').split('@')[1] ?? 'walktopus.in';

    const messages = data
      .map((entry) => (entry && typeof entry === 'object' ? (entry as Record<string, unknown>) : null))
      .filter((entry): entry is Record<string, unknown> => Boolean(entry))
      .map((entry) => {
        const to = normalizeEmailList(entry.to);
        return {
          id: String(entry.id ?? ''),
          folder: 'inbox',
          from: typeof entry.from === 'string' ? entry.from : 'unknown@sender',
          to,
          toLine: to.join(', '),
          toCount: to.length,
          subject: typeof entry.subject === 'string' ? entry.subject : 'No subject',
          preview: extractPreview(entry),
          createdAt: typeof entry.created_at === 'string' ? entry.created_at : null,
          status: typeof entry.last_event === 'string' ? entry.last_event : 'received',
        };
      })
      .filter((message) =>
        message.to.some((email) => email.toLowerCase().includes(`@${companyAddress.toLowerCase()}`)) ||
        message.from.toLowerCase().includes(`@${companyAddress.toLowerCase()}`),
      );

    return NextResponse.json({ messages, source: 'resend' });
  } catch (error) {
    console.error('[admin/email/inbox GET]', error);
    return NextResponse.json({ error: 'Unable to load inbox from Resend' }, { status: 500 });
  }
}
