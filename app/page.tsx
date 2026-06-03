export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';

import { HeroSection } from '@/components/home/HeroSection';
import { TrustBanner } from '@/components/home/TrustBanner';
import { ServicesSnapshot } from '@/components/home/ServicesSnapshot';
import { SocialProof } from '@/components/home/SocialProof';
import { CaseStudiesTeaser } from '@/components/home/CaseStudiesTeaser';
import { CapabilityMatrix } from '@/components/home/CapabilityMatrix';
import { ScrollytellingPlaybook } from '@/components/home/ScrollytellingPlaybook';
import { IndustryOutcomes } from '@/components/home/IndustryOutcomes';
import { FinalCta } from '@/components/home/FinalCta';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Digital Marketing Agency in Kolkata',
  description:
    'Walktopus is a Kolkata-based digital marketing agency helping local businesses and personal brands grow with social media, SEO, and performance campaigns across India.',
  pathname: '/',
  keywords: [
    'digital marketing company Kolkata',
    'social media management Kolkata',
    'SEO-friendly website agency India',
    'growth marketing for local business',
  ],
  dateModified: '2026-06-03',
});

const homePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Walktopus',
  url: 'https://walktopus.in',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://walktopus.in/services',
    },
  },
};

const homeOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Walktopus',
  legalName: 'Dgen Technologies Private Limited',
  url: 'https://walktopus.in',
  logo: 'https://walktopus.in/logo-transparent.png',
  description:
    'Walktopus is a digital marketing agency in Kolkata, India, specializing in social media management, SEO, website development, and growth campaigns for businesses and individuals.',
  foundingDate: '2025',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kolkata',
    addressRegion: 'West Bengal',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'wewalktopus@gmail.com',
    contactType: 'customer service',
  },
  sameAs: [
    'https://www.instagram.com/walktopus',
    'https://www.youtube.com/@WeWalktopus',
    'https://facebook.com/walktopus',
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeOrganizationSchema) }}
      />
      <HeroSection />
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="border border-(--color-bg-secondary) bg-(--color-bg-light) p-8 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">What is Walktopus?</p>
          <p className="mt-2 text-sm font-semibold text-(--color-soft-gray)">Last updated: June 2026</p>
          <p className="mt-4 max-w-5xl text-(--color-text)">
            Walktopus is defined as a performance-led digital marketing agency headquartered in Kolkata, West Bengal, India, incorporated under Dgen Technologies Private Limited in November 2025. The agency specializes in social media management, SEO strategy, website development, paid growth campaigns, and personal branding for businesses and individuals across India.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/services" className="font-semibold text-(--color-accent) underline-offset-4 hover:underline">
              Explore the Digital Marketing Services hub
            </Link>
            <span className="text-(--color-soft-gray)">|</span>
            <Link href="/solutions" className="font-semibold text-(--color-accent) underline-offset-4 hover:underline">
              Explore the Business Growth Solutions hub
            </Link>
            <span className="text-(--color-soft-gray)">|</span>
            <Link href="/faq" className="font-semibold text-(--color-accent) underline-offset-4 hover:underline">
              Explore the Digital Marketing Knowledge hub
            </Link>
          </div>
        </div>
      </section>
      <TrustBanner />
      <ServicesSnapshot />
      <SocialProof />
      <CapabilityMatrix />
      <ScrollytellingPlaybook />
      <CaseStudiesTeaser />
      <IndustryOutcomes />
      <section className="mx-auto w-full max-w-7xl px-6 pb-12">
        <div className="border border-(--color-bg-secondary) bg-white/50 p-6 text-sm text-(--color-soft-gray) md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">Backed by research</p>
          <p className="mt-3">
            Gartner has projected that up to 40% of B2B discovery queries will be handled by answer-engine style experiences by 2026, and Princeton-led GEO research reports that targeted extractability improvements can increase AI citation visibility by up to 40%.
          </p>
          <p className="mt-2">
            Walktopus content architecture is designed around these shifts through definition-first writing, schema markup, and answer-ready section structure.
          </p>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

