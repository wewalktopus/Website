export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { ServicesExperience } from '@/components/services/ServicesExperience';
import { pageMetadata, breadcrumbSchema, absoluteUrl } from '@/lib/seo';

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

const servicesPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Walktopus Growth Services',
  serviceType: 'Digital Marketing Services',
  areaServed: ['Kolkata', 'West Bengal', 'India'],
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
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'CORE',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: 5000,
              maxPrice: 18000,
              priceCurrency: 'INR',
              billingDuration: 'P1M',
            },
          },
          {
            '@type': 'Offer',
            name: 'BOOST',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: 21000,
              maxPrice: 38000,
              priceCurrency: 'INR',
              billingDuration: 'P1M',
            },
          },
          {
            '@type': 'Offer',
            name: 'PRIME',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: 45000,
              maxPrice: 60000,
              priceCurrency: 'INR',
              billingDuration: 'P1M',
            },
          },
          {
            '@type': 'Offer',
            name: 'PREMIUM',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: 80000,
              maxPrice: 120000,
              priceCurrency: 'INR',
              billingDuration: 'P1M',
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'One-Time and Project Services',
        itemListElement: [
          { '@type': 'Offer', name: 'Logo Design', priceCurrency: 'INR', price: '7000-10000' },
          { '@type': 'Offer', name: 'Static Website', priceCurrency: 'INR', price: '14000-25000' },
          { '@type': 'Offer', name: 'Reel / Shorts Video', priceCurrency: 'INR', price: '2000-8000' },
          { '@type': 'Offer', name: 'Ad Campaign Setup', priceCurrency: 'INR', price: '5000-15000' },
          { '@type': 'Offer', name: 'Influencer Coordination (Management Fee)', priceCurrency: 'INR', price: '10000-30000' },
        ],
      },
    ],
  },
};

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

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <ServicesExperience />
    </>
  );
}
