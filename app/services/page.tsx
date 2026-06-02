import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { ServicesExperience } from '@/components/services/ServicesExperience';
import { pageMetadata, breadcrumbSchema, absoluteUrl } from '@/lib/seo';
import { DEFAULT_PRICING_CONFIG, resolveAudienceFromCountry } from '@/lib/pricing-config';
import type { PricingAudience, PricingAudienceContent } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = pageMetadata({
  title: 'Digital Marketing Services and Pricing',
  description:
    'Explore Walktopus monthly growth partnerships and one-time digital marketing services with transparent pricing for branding, websites, social media content, ad campaigns, and influencer coordination.',
  pathname: '/services',
  keywords: [
    'digital marketing services pricing Kolkata',
    'social media management packages India',
    'branding and website development services Kolkata',
    'ad campaign management services India',
    'growth marketing retainer plans',
  ],
});

const crumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
]);

function extractPriceRange(raw: string): { min: number; max: number } {
  const matches = raw.match(/\d[\d,]*/g) ?? [];
  const numbers = matches
    .map((value) => Number.parseInt(value.replace(/,/g, ''), 10))
    .filter((value) => Number.isFinite(value));

  if (!numbers.length) return { min: 0, max: 0 };
  if (numbers.length === 1) return { min: numbers[0], max: numbers[0] };

  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}

function createServicesPageSchema(content: PricingAudienceContent, audience: PricingAudience) {
  const currency = audience === 'india' ? 'INR' : 'USD';

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Walktopus Growth Services',
    serviceType: 'Digital Marketing Services',
    areaServed: ['India', 'International'],
    provider: {
      '@type': 'Organization',
      name: 'Walktopus',
      url: absoluteUrl('/'),
      parentOrganization: {
        '@type': 'Organization',
        name: 'Dgen Technologies Private Limited',
      },
    },
    description:
      'Monthly growth partnerships and one-time project services for branding, websites, social media, ad campaigns, and performance-led growth.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Walktopus Services Catalog',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Monthly Growth Partnerships',
          itemListElement: content.monthlyPlans.map((plan) => {
            const range = extractPriceRange(plan.price);
            return {
              '@type': 'Offer',
              name: plan.name,
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: range.min,
                maxPrice: range.max,
                priceCurrency: currency,
                billingDuration: 'P1M',
              },
            };
          }),
        },
        {
          '@type': 'OfferCatalog',
          name: 'One-Time and Project Services',
          itemListElement: content.serviceCategories
            .flatMap((category) => category.services)
            .slice(0, 8)
            .map((service) => {
              const range = extractPriceRange(service.price);
              return {
                '@type': 'Offer',
                name: service.title,
                priceCurrency: currency,
                price: range.min === range.max ? String(range.min) : `${range.min}-${range.max}`,
              };
            }),
        },
      ],
    },
  };
}

const servicesFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does upgrading remove current services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Upgrading your plan never removes your existing services. New tier features are added on top.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is ad spend included in monthly plan pricing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Ad spend is billed directly to the client by ad platforms. Walktopus charges a 15-20% management fee on top of total ad spend.',
      },
    },
  ],
};

async function getPricingForRequest(): Promise<{
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
    console.error('[services/page] pricing fetch failed:', error);
    return {
      audience,
      countryCode: country,
      content: DEFAULT_PRICING_CONFIG[audience],
    };
  }
}

export default async function ServicesPage() {
  const pricing = await getPricingForRequest();
  const servicesPageSchema = createServicesPageSchema(pricing.content, pricing.audience);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <ServicesExperience
        content={pricing.content}
        audience={pricing.audience}
        countryCode={pricing.countryCode}
      />
    </>
  );
}
