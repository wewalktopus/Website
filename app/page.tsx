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
    'Walktopus is a digital marketing agency in Kolkata offering social media management, SEO-ready websites, personal branding, YouTube strategy, and growth campaigns for businesses and individuals across India.',
  pathname: '/',
  keywords: [
    'digital marketing company Kolkata',
    'social media management Kolkata',
    'SEO-friendly website agency India',
    'growth marketing for local business',
  ],
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
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
