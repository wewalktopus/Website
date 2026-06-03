import type { Metadata } from 'next';
import { BRAND } from '@/lib/constants';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://walktopus.in';

const defaultKeywords = [
  'digital marketing agency in Kolkata',
  'digital marketing agency in West Bengal',
  'SEO agency in Kolkata',
  'social media marketing agency India',
  'local SEO services India',
  'personal branding services India',
  'YouTube marketing agency',
  'website growth agency',
  'lead generation agency Kolkata',
  'Dgen Technologies Private Limited',
];

export function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

export function pageMetadata({
  title,
  description,
  pathname,
  keywords = [],
  dateModified = '2026-06-03',
}: {
  title: string;
  description: string;
  pathname: string;
  keywords?: readonly string[];
  dateModified?: string;
}): Metadata {
  const url = absoluteUrl(pathname);
  // Ensure canonical URL doesn't have trailing slash (except for root)
  const canonicalPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  const canonicalUrl = absoluteUrl(canonicalPath);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url,
      siteName: BRAND.name,
      title,
      description,
      modifiedTime: dateModified,
      images: [
        {
          url: absoluteUrl('/opengraph-image'),
          width: 1200,
          height: 630,
          alt: `${title} | ${BRAND.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl('/opengraph-image')],
      creator: '@walktopus',
      site: '@walktopus',
    },
    other: {
      dateModified,
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BRAND.name,
  url: siteUrl,
  logo: absoluteUrl('/logo-transparent.png'),
  sameAs: Object.values(BRAND.social),
  parentOrganization: {
    '@type': 'Organization',
    name: BRAND.parent,
  },
  description:
    'Walktopus is a digital marketing and growth agency helping local businesses, startups, and individuals grow through SEO, social media management, YouTube strategy, and performance campaigns.',
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: BRAND.name,
  image: absoluteUrl('/opengraph-image'),
  url: siteUrl,
  telephone: BRAND.phone,
  email: BRAND.email,
  areaServed: ['Kolkata', 'West Bengal', 'India'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kolkata',
    addressRegion: 'West Bengal',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 22.5726,
    longitude: 88.3639,
  },
  knowsAbout: defaultKeywords,
  priceRange: '$$',
};

// Service Schema - for each service offering
export function serviceSchema(
  name: string,
  description: string,
  serviceId: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: 'Digital Marketing',
    provider: {
      '@type': 'LocalBusiness',
      name: BRAND.name,
      url: siteUrl,
    },
    areaServed: ['Kolkata', 'West Bengal', 'India'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${name} Packages`,
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Core Package',
          price: '₹15,999',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          name: 'Boost Package',
          price: '₹24,999',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          name: 'Prime Package',
          price: '₹29,999',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          name: 'Premium Package',
          price: '₹49,999',
          priceCurrency: 'INR',
        },
      ],
    },
  };
}

// Product/Offer Schema - for pricing packages
export function offerSchema(
  packageName: string,
  price: string,
  description: string,
) {
  const priceNumber = price.match(/\d+,?\d*/)?.[0]?.replace(',', '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: packageName,
    price: priceNumber,
    priceCurrency: 'INR',
    description,
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'LocalBusiness',
      name: BRAND.name,
      url: siteUrl,
    },
  };
}

// Person Schema - for team members (E-E-A-T signals)
export function personSchema(
  name: string,
  title: string,
  bio: string,
  imageUrl: string,
  url?: string,
  options?: {
    worksFor?: string;
    worksForUrl?: string;
    sameAs?: string[];
  },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: title,
    description: bio,
    image: imageUrl,
    url: url || siteUrl,
    worksFor: {
      '@type': 'Organization',
      name: options?.worksFor ?? BRAND.name,
      url: options?.worksForUrl ?? siteUrl,
    },
    sameAs: options?.sameAs ?? [
      'https://linkedin.com/company/walktopus',
      'https://www.instagram.com/walktopus',
    ],
  };
}

// AggregateOffer Schema - for package comparisons
export function aggregateOfferSchema(packages: Array<{ name: string; price: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    name: 'Walktopus Digital Marketing Packages',
    description:
      'Monthly partnership packages for social media management, SEO, and growth campaigns',
    priceCurrency: 'INR',
    lowPrice: packages
      .map((p) => parseInt(p.price.match(/\d+/)?.[0] || '0'))
      .sort((a, b) => a - b)[0],
    highPrice: packages
      .map((p) => parseInt(p.price.match(/\d+/)?.[0] || '0'))
      .sort((a, b) => b - a)[0],
    offerCount: packages.length,
    offers: packages.map((pkg) => {
      const priceNum = parseInt(pkg.price.match(/\d+/)?.[0] || '0');
      return {
        '@type': 'Offer',
        name: pkg.name,
        price: priceNum.toString(),
        priceCurrency: 'INR',
      };
    }),
  };
}

// Extended Organization Schema with trust/authority signals (E-E-A-T)
export const extendedOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BRAND.name,
  url: siteUrl,
  logo: absoluteUrl('/logo-transparent.png'),
  foundingDate: '2025-12-01',
  description: BRAND.mission,
  areaServed: ['Kolkata', 'West Bengal', 'India', 'Asia'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    telephone: BRAND.phone,
    email: BRAND.email,
    areaServed: 'IN',
    availableLanguage: ['en-IN', 'en'],
  },
  parentOrganization: {
    '@type': 'Organization',
    name: BRAND.parent,
    url: 'https://dgentechnologies.com',
  },
  knowsAbout: defaultKeywords,
  slogan: BRAND.tagline,
  sameAs: Object.values(BRAND.social),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '127',
  },
  socialProfile: Object.values(BRAND.social),
};