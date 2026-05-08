import { NextRequest, NextResponse } from 'next/server';
import { NewsletterSchema } from '@/lib/validations';
import { newsletterRateLimit } from '@/lib/upstash';

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() ?? 'anonymous';

    const rate = await newsletterRateLimit.limit(`newsletter:${ip}`);
    if (!rate.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const result = NewsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully.' });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
