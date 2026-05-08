export const dynamic = 'force-static';

import { HeroSection } from '@/components/home/HeroSection';
import { TrustBanner } from '@/components/home/TrustBanner';
import { ServicesSnapshot } from '@/components/home/ServicesSnapshot';
import { SocialProof } from '@/components/home/SocialProof';
import { CaseStudiesTeaser } from '@/components/home/CaseStudiesTeaser';
import { CapabilityMatrix } from '@/components/home/CapabilityMatrix';
import { ScrollytellingPlaybook } from '@/components/home/ScrollytellingPlaybook';
import { IndustryOutcomes } from '@/components/home/IndustryOutcomes';
import { FinalCta } from '@/components/home/FinalCta';

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
