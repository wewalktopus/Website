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
}: {
  title: string;
  description: string;
  pathname: string;
  keywords?: readonly string[];
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