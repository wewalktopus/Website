import type { Metadata } from 'next';
import { ServicesExperience, servicesFaqItems } from '@/components/services/ServicesExperience';
import { getPricingForRequest } from '@/lib/public-pricing';
import { pageMetadata, breadcrumbSchema, absoluteUrl } from '@/lib/seo';
import type { PricingAudience, PricingAudienceContent } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = pageMetadata({
  title: 'Digital Marketing Services and Pricing',
  description:
    'Walktopus offers transparent digital marketing plans from Rs.5,000 per month, covering social media management, website SEO, ad campaigns, and branding for Indian businesses.',
  pathname: '/services',
  keywords: [
    'digital marketing services pricing Kolkata',
    'social media management packages India',
    'branding and website development services Kolkata',
    'ad campaign management services India',
    'growth marketing retainer plans',
  ],
  dateModified: '2026-06-03',
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
  mainEntity: servicesFaqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const servicesHowToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to engage Walktopus services',
  description: 'Select a service model, confirm deliverable scope, execute, and optimize with recurring performance reporting.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Select engagement model',
      text: 'Choose either fixed-scope services or monthly growth partnerships based on your current business objective.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Define deliverables and KPIs',
      text: 'Lock scope, reporting cadence, and measurable outcomes before production starts.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Execute and review',
      text: 'Run delivery with weekly or bi-weekly reviews, then optimize based on performance data.',
    },
  ],
};

export default async function ServicesPage() {
  const pricing = await getPricingForRequest();
  const servicesPageSchema = createServicesPageSchema(pricing.content, pricing.audience);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesHowToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <ServicesExperience
        content={pricing.content}
        audience={pricing.audience}
        countryCode={pricing.countryCode}
      />
    </>
  );
}
