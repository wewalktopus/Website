export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { BUSINESS_BENEFITS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Digital Marketing for Businesses',
  description:
    'Walktopus helps businesses in Kolkata and across India scale with lead generation systems, SEO content, paid growth campaigns, conversion-focused landing pages, and performance-first social media.',
  pathname: '/for-businesses',
  keywords: ['B2B digital marketing agency Kolkata', 'lead generation agency India', 'ROI-focused marketing agency'],
});

export default function ForBusinessesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:py-32">
      <h1 className="font-display text-6xl uppercase leading-tight sm:text-7xl">Scale Your Business. Dominate Your Market.</h1>
      <p className="mt-6 max-w-3xl text-lg text-[var(--color-soft-gray)]">
        We design and execute campaigns that maximize lead quality, improve conversion economics, and unlock repeatable growth for ambitious businesses in Kolkata, West Bengal, and across India.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {BUSINESS_BENEFITS.map((benefit) => (
          <Card key={benefit}>
            <p className="font-semibold">{benefit}</p>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <Button href="/contact">Book a Strategy Call</Button>
      </div>
    </div>
  );
}
