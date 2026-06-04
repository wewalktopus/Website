import type { Metadata } from 'next';
import { SolutionsExperience } from '@/components/solutions/SolutionsExperience';
import {
  processSteps,
  solutionFaqItems,
  solutionSystems,
} from '@/components/solutions/solutions-content';
import { getPricingForRequest } from '@/lib/public-pricing';
import { absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';
import type { PricingAudience, PricingAudienceContent } from '@/types';

const DATE_MODIFIED = '2026-06-04';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = pageMetadata({
  title: 'Business Growth Solutions',
  description:
    'Walktopus bundles strategy, content, SEO, paid media, and performance ops into premium growth solutions for local businesses, personal brands, and scaling companies.',
  pathname: '/solutions',
  keywords: [
    'business growth solutions India',
    'digital growth systems Kolkata',
    'full-funnel marketing solutions India',
    'local business marketing systems',
  ],
  dateModified: DATE_MODIFIED,
});

const solutionServiceSchema = solutionSystems.map((solution) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: solution.name,
  serviceType: 'Digital Growth Solution',
  description: solution.definition,
  areaServed: 'IN',
  provider: {
    '@type': 'Organization',
    name: 'Walktopus',
    legalName: 'Dgen Technologies Private Limited',
    url: absoluteUrl('/'),
  },
  audience: {
    '@type': 'Audience',
    audienceType: solution.persona,
  },
}));

const solutionFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: solutionFaqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const solutionHowToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How Walktopus deploys a business growth solution',
  description: 'Discovery to scale framework for integrated digital growth operations.',
  step: processSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.description,
  })),
};

const crumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/solutions' },
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

function createSolutionsPageSchema(content: PricingAudienceContent, audience: PricingAudience) {
  const currency = audience === 'india' ? 'INR' : 'USD';

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Walktopus Business Growth Solutions',
    serviceType: 'Outcome-Focused Digital Growth Solutions',
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
      'Integrated growth systems for local market visibility, personal brand authority, and full-funnel business growth, connected to live Walktopus pricing plans.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Walktopus Solutions and Plans',
      itemListElement: content.monthlyPlans.map((plan) => {
        const range = extractPriceRange(plan.price);

        return {
          '@type': 'Offer',
          name: plan.name,
          description: plan.tagline,
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
  };
}

export default async function SolutionsPage() {
  const pricing = await getPricingForRequest();
  const solutionsPageSchema = createSolutionsPageSchema(pricing.content, pricing.audience);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionsPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionHowToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      {solutionServiceSchema.map((schema, index) => (
        <script
          key={`solution-service-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <SolutionsExperience content={pricing.content} audience={pricing.audience} countryCode={pricing.countryCode} />
    </>
  );
}
