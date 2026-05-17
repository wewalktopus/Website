export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { ServicesExperience } from '@/components/services/ServicesExperience';
import { pageMetadata, serviceSchema, breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Digital Marketing Services',
  description:
    'Explore Walktopus services for social media management, website SEO, domain strategy, conversion optimization, YouTube content support, and growth campaigns for businesses and creators.',
  pathname: '/services',
  keywords: ['social media management services', 'SEO services Kolkata', 'growth marketing campaigns India'],
});

const socialMediaService = serviceSchema(
  'Social Media Mastery',
  'End-to-end management across Instagram, Facebook, LinkedIn, Threads, and X with strategy, content creation, community engagement, and data-driven optimization.',
  'social-media',
);

const webIdentityService = serviceSchema(
  'Web and Domain Management',
  'Digital real estate management with SEO optimization, website analytics, conversion rate optimization, and comprehensive domain strategy for stronger online presence.',
  'web-identity',
);

const growthService = serviceSchema(
  'Growth and Promotion Campaigns',
  'Data-driven campaigns for product launches and service scaling with full ROI tracking, paid advertising management, and performance analytics.',
  'growth-campaigns',
);

const crumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
]);

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(socialMediaService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webIdentityService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(growthService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <ServicesExperience />
    </>
  );
}
