export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { Compass, Rocket, Sparkles, TrendingUp } from 'lucide-react';
import { INDIVIDUAL_JOURNEY } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { pageMetadata } from '@/lib/seo';

const journeyIcons = [Compass, Sparkles, Rocket, TrendingUp] as const;

export const metadata: Metadata = pageMetadata({
  title: 'Personal Branding Services',
  description:
    'Walktopus helps creators, founders, consultants, and professionals build personal brands with content strategy, social growth, authority positioning, and search-friendly digital presence.',
  pathname: '/for-individuals',
  keywords: ['personal branding services India', 'creator marketing agency Kolkata', 'founder brand strategy'],
});

export default function ForIndividualsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:py-32">
      <h1 className="font-display text-6xl uppercase leading-tight sm:text-7xl">Build Your Brand. Own Your Audience.</h1>
      <p className="mt-6 max-w-3xl text-lg text-[var(--color-soft-gray)]">
        For creators, consultants, and professionals ready to build authority, increase reach, and convert visibility into opportunities through a stronger and more searchable digital presence.
      </p>

      <ol className="mt-12 grid gap-4 md:grid-cols-4">
        {INDIVIDUAL_JOURNEY.map((step, idx) => (
          <li key={step} className="border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-6">
            <span className="flex h-10 w-10 items-center justify-center border border-[var(--color-bg-secondary)] bg-white/60 text-[var(--color-accent)]">
              {(() => {
                const Icon = journeyIcons[idx % journeyIcons.length];
                return <Icon className="h-5 w-5" />;
              })()}
            </span>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">Step {idx + 1}</p>
            <p className="mt-3 text-xl font-bold">{step}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12">
        <Button href="/contact">Start Your Personal Brand Journey</Button>
      </div>
    </div>
  );
}
