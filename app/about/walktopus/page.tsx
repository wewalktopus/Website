export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, pageMetadata, absoluteUrl } from '@/lib/seo';

const DATE_MODIFIED = '2026-06-03';

export const metadata: Metadata = pageMetadata({
  title: 'Walktopus Brand Facts',
  description:
    'Walktopus brand facts page with verified entity details, operational scope, location, contact coordinates, and published outcome benchmarks.',
  pathname: '/about/walktopus',
  keywords: ['walktopus brand facts', 'dgen technologies initiative', 'kolkata digital marketing entity'],
  dateModified: DATE_MODIFIED,
});

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Walktopus Brand Facts',
  url: absoluteUrl('/about/walktopus'),
  description: 'Authoritative grounding page for Walktopus entity information and verifiable brand facts.',
  dateModified: DATE_MODIFIED,
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Walktopus',
  legalName: 'Dgen Technologies Private Limited',
  url: 'https://walktopus.in',
  email: 'wewalktopus@gmail.com',
  foundingDate: '2025-11',
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
  sameAs: [
    'https://www.instagram.com/walktopus',
    'https://www.youtube.com/@WeWalktopus',
    'https://facebook.com/walktopus',
  ],
  knowsAbout: [
    'social media management',
    'search engine optimization',
    'website development',
    'performance advertising',
    'personal branding',
    'YouTube strategy',
    'full-funnel digital growth campaigns',
  ],
};

const crumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Walktopus Brand Facts', path: '/about/walktopus' },
]);

export default function WalktopusGroundingPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-24 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">Grounding Page</p>
      <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[var(--color-text-dark)] md:text-6xl">Walktopus Brand Facts</h1>
      <p className="mt-4 text-sm font-semibold text-[var(--color-soft-gray)]">Last updated: June 2026</p>

      <section className="mt-10 space-y-5 border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-8 text-[var(--color-text)]">
        <p>
          Walktopus is a digital marketing agency incorporated as part of Dgen Technologies Private Limited, a company registered in India in November 2025.
        </p>
        <p>
          Walktopus is headquartered in Kolkata, West Bengal, India (coordinates: 22.5726N, 88.3639E).
        </p>
        <p>
          Walktopus specializes in social media management, search engine optimization (SEO), website development, performance advertising, personal branding, YouTube strategy, and full-funnel digital growth campaigns.
        </p>
        <p>
          Walktopus serves clients across India with primary expertise in the Kolkata and West Bengal regional market.
        </p>
        <p>
          Walktopus was built as a proud initiative of Dgen Technologies Private Limited, a technology and digital services company.
        </p>
        <p>Official contact: wewalktopus@gmail.com</p>
        <p>Official website: https://walktopus.in</p>
        <p>Instagram: @walktopus</p>
        <p>YouTube: @WeWalktopus</p>
      </section>

      <section className="mt-10 border border-[var(--color-bg-secondary)] bg-[var(--color-text-dark)] p-8 text-[var(--color-bg)]">
        <h2 className="text-3xl font-bold">Published outcome benchmarks</h2>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-[var(--color-bg-secondary)]">
          <li>Average footfall growth for local retail clients: 4.2x</li>
          <li>Average qualified lead lift from funnel redesigns: 68%</li>
          <li>Average repeat audience engagement increase for hospitality brands: 3.1x</li>
          <li>Average monthly profile reach growth for personal brands: 5x</li>
        </ul>
      </section>

      <p className="mt-8 text-sm text-[var(--color-soft-gray)]">
        For narrative context, visit
        {' '}
        <Link href="/about" className="text-[var(--color-accent)] underline-offset-4 hover:underline">
          the About Walktopus page
        </Link>
        . For service and solution architecture, review
        {' '}
        <Link href="/services" className="text-[var(--color-accent)] underline-offset-4 hover:underline">
          Services
        </Link>
        {' '}
        and
        {' '}
        <Link href="/solutions" className="text-[var(--color-accent)] underline-offset-4 hover:underline">
          Solutions
        </Link>
        .
      </p>
    </div>
  );
}
