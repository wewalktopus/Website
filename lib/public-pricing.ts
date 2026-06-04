import { headers } from 'next/headers';
import { DEFAULT_PRICING_CONFIG, resolveAudienceFromCountry } from '@/lib/pricing-config';
import type { PricingAudience, PricingAudienceContent } from '@/types';

export async function getPricingForRequest(): Promise<{
  audience: PricingAudience;
  countryCode: string;
  content: PricingAudienceContent;
}> {
  const headerStore = await headers();
  const host = headerStore.get('x-forwarded-host') ?? headerStore.get('host') ?? '';
  const protocol = headerStore.get('x-forwarded-proto') ?? 'https';
  const country = (headerStore.get('x-vercel-ip-country') ?? headerStore.get('cf-ipcountry') ?? '').toUpperCase();
  const audience = resolveAudienceFromCountry(country);

  if (!host) {
    return {
      audience,
      countryCode: country,
      content: DEFAULT_PRICING_CONFIG[audience],
    };
  }

  try {
    const response = await fetch(`${protocol}://${host}/api/pricing?country=${country}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to load public pricing payload');
    }

    const payload = (await response.json()) as {
      audience?: PricingAudience;
      country?: string;
      content?: PricingAudienceContent;
    };

    return {
      audience: payload.audience ?? audience,
      countryCode: payload.country ?? country,
      content: payload.content ?? DEFAULT_PRICING_CONFIG[payload.audience ?? audience],
    };
  } catch (error) {
    console.error('[public-pricing] pricing fetch failed:', error);

    return {
      audience,
      countryCode: country,
      content: DEFAULT_PRICING_CONFIG[audience],
    };
  }
}