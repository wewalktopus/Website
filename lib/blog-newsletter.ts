import 'server-only';

import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import { getResend } from '@/lib/resend';
import { withUnsubscribeFooter } from '@/lib/email-unsubscribe';

const DEFAULT_SITE_URL = 'https://www.walktopus.in';

interface BlogNewsletterInput {
  title: string;
  slug: string;
  excerpt?: string | null;
  imageUrl?: string | null;
}

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
}

function renderBlogEmailHtml(input: BlogNewsletterInput): string {
  const blogUrl = `${getSiteUrl()}/blogs/${input.slug}`;
  const imageBlock = input.imageUrl
    ? `<img src="${input.imageUrl}" alt="${input.title}" style="width:100%;max-width:640px;height:auto;border-radius:12px;display:block;margin:0 auto 20px;" />`
    : '';

  return `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;padding:24px;background:#ffffff;color:#111827;">
      <p style="margin:0 0 10px;color:#ef4d30;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Walktopus Blog Update</p>
      <h1 style="margin:0 0 12px;font-size:28px;line-height:1.25;">${input.title}</h1>
      <p style="margin:0 0 18px;color:#4b5563;font-size:15px;line-height:1.6;">${input.excerpt || 'A new article has been published on Walktopus. Read it now.'}</p>
      ${imageBlock}
      <a href="${blogUrl}" style="display:inline-block;background:#ef4d30;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:700;">
        Read This Article
      </a>
    </div>
  `;
}

export async function sendNewBlogEmailToSubscribers(input: BlogNewsletterInput): Promise<{ sent: number; failed: number }> {
  const db = getFirebaseAdminDb();
  const subscribersSnapshot = await db.collection('newsletter_subscribers').get();

  const recipients = subscribersSnapshot.docs
    .map((doc) => {
      const data = doc.data();
      const email = typeof data?.email === 'string' ? data.email : null;
      const newsletterPref =
        typeof data?.emailPreferences?.newsletter === 'boolean'
          ? data.emailPreferences.newsletter
          : Boolean(data?.active ?? true);

      if (!email || !email.includes('@') || !newsletterPref) {
        return null;
      }

      return email;
    })
    .filter((email): email is string => Boolean(email));

  if (!recipients.length) {
    return { sent: 0, failed: 0 };
  }

  const resend = getResend();
  const fromAddress = process.env.RESEND_FROM_EMAIL ?? 'hello@walktopus.in';
  const baseHtml = renderBlogEmailHtml(input);

  const settled = await Promise.allSettled(
    recipients.map((email) =>
      resend.emails.send({
        from: fromAddress,
        to: email,
        subject: `New on Walktopus: ${input.title}`,
        html: withUnsubscribeFooter(baseHtml, email),
      }),
    ),
  );

  const sent = settled.filter((result) => result.status === 'fulfilled').length;
  const failed = settled.length - sent;

  return { sent, failed };
}
