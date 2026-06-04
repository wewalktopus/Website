export const dynamic = 'force-static';

import type { Metadata } from 'next';

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
      <TrustBanner />
      <ServicesSnapshot />
      <SocialProof />
      <CapabilityMatrix />
      <ScrollytellingPlaybook />
      <CaseStudiesTeaser />
      <IndustryOutcomes />
      <FinalCta />
    </>
  );
}

