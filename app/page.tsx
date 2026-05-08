export const dynamic = 'force-static';

import { HeroSection } from '@/components/home/HeroSection';
import { TrustBanner } from '@/components/home/TrustBanner';
import { ServicesSnapshot } from '@/components/home/ServicesSnapshot';
import { SocialProof } from '@/components/home/SocialProof';
import { CaseStudiesTeaser } from '@/components/home/CaseStudiesTeaser';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBanner />
      <ServicesSnapshot />
      <SocialProof />
      <CaseStudiesTeaser />
    </>
  );
}
