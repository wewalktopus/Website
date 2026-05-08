export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Digital Marketing Services',
  description:
    'Explore Walktopus services for social media management, website SEO, domain strategy, conversion optimization, YouTube content support, and growth campaigns for businesses and creators.',
  pathname: '/services',
  keywords: ['social media management services', 'SEO services Kolkata', 'growth marketing campaigns India'],
});

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-20 px-6 py-24 lg:py-32">
      <SectionHeader
        eyebrow="Services"
        title="Three pillars. One growth engine."
        subtitle="We build integrated digital systems that combine brand attention, conversion architecture, and scalable execution."
      />

      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h3 className="text-3xl font-bold">Omnichannel Social Media Management</h3>
          <p className="mt-4 text-[var(--color-soft-gray)]">Strategize, manage, engage, and grow across Instagram, Facebook, LinkedIn, Threads, and X.</p>
        </div>
        <PlaceholderImage
          seed="walktopus-services"
          width={1200}
          height={800}
          alt="Social media management services for local businesses and brands"
          className="h-72"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </section>

      <section className="grid items-center gap-10 md:grid-cols-2">
        <PlaceholderImage
          seed="walktopus-b2b"
          width={1200}
          height={800}
          alt="SEO-friendly website and domain management solutions"
          className="h-72 md:order-1"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
        <div className="md:order-2">
          <h3 className="text-3xl font-bold">Web Identity and Domain Solutions</h3>
          <p className="mt-4 text-[var(--color-soft-gray)]">Digital real estate management with SEO, analytics, CRO, and structured domain strategy.</p>
        </div>
      </section>

      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h3 className="text-3xl font-bold">Growth and Promotion Campaigns</h3>
          <p className="mt-4 text-[var(--color-soft-gray)]">Launch and scale with ROI tracking, ad spend optimization, and full-funnel campaign engineering.</p>
        </div>
        <PlaceholderImage
          seed="walktopus-individual"
          width={1200}
          height={800}
          alt="Growth campaign planning for product launches and service brands"
          className="h-72"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </section>
    </div>
  );
}
