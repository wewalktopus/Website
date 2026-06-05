import 'server-only';

const DEFAULT_SITE_URL = 'https://www.walktopus.in';
export type UnsubscribeScope = 'newsletter' | 'all';

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
}

export function buildUnsubscribeUrl(email: string, scope: UnsubscribeScope = 'all'): string {
  return `${getSiteUrl()}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}&scope=${scope}`;
}

export function withUnsubscribeFooter(contentHtml: string, recipientEmail: string): string {
  const footer = `
    <hr style="margin:24px 0;border:0;border-top:1px solid #e5e7eb;" />
    <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.5;">
      You are receiving this email from Walktopus.
      <a href="${buildUnsubscribeUrl(recipientEmail, 'newsletter')}" style="color:#ef4d30;text-decoration:underline;">Unsubscribe from newsletter</a>
      &nbsp;|&nbsp;
      <a href="${buildUnsubscribeUrl(recipientEmail, 'all')}" style="color:#ef4d30;text-decoration:underline;">Unsubscribe from all campaigns</a>
    </p>
  `;

  return `${contentHtml}${footer}`;
}
