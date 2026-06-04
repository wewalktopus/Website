export const dynamic = 'force-static';

import type { Metadata } from 'next';
import dynamicImport from 'next/dynamic';

import { HeroSection } from '@/components/home/HeroSection';
import { TrustBanner } from '@/components/home/TrustBanner';
import { ServicesSnapshot } from '@/components/home/ServicesSnapshot';
import { pageMetadata } from '@/lib/seo';

const SocialProof = dynamicImport(() => import('@/components/home/SocialProof').then((mod) => mod.SocialProof));
const CapabilityMatrix = dynamicImport(() => import('@/components/home/CapabilityMatrix').then((mod) => mod.CapabilityMatrix));
const ScrollytellingPlaybook = dynamicImport(() => import('@/components/home/ScrollytellingPlaybook').then((mod) => mod.ScrollytellingPlaybook));
const CaseStudiesTeaser = dynamicImport(() => import('@/components/home/CaseStudiesTeaser').then((mod) => mod.CaseStudiesTeaser));
const IndustryOutcomes = dynamicImport(() => import('@/components/home/IndustryOutcomes').then((mod) => mod.IndustryOutcomes));
const FinalCta = dynamicImport(() => import('@/components/home/FinalCta').then((mod) => mod.FinalCta));

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

