export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { ServicesExperience } from '@/components/services/ServicesExperience';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Digital Marketing Services',
  description:
    'Explore Walktopus services for social media management, website SEO, domain strategy, conversion optimization, YouTube content support, and growth campaigns for businesses and creators.',
  pathname: '/services',
  keywords: ['social media management services', 'SEO services Kolkata', 'growth marketing campaigns India'],
});

export default function ServicesPage() {
  return <ServicesExperience />;
}
