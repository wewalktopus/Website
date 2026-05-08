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

export default function HomePage() {
  return (
    <>
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
