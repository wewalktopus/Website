'use client';

import { ScrollReveal } from '@/components/common/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';

// TODO IMAGES: Replace placeholders before launch
// - outcomes-main: needs branded campaign dashboard visual

const outcomes = [
  { industry: 'Local Retail', result: '4.2x', detail: 'Footfall growth after localized campaign cycles' },
  { industry: 'Professional Services', result: '68%', detail: 'Qualified lead lift from funnel redesign' },
  { industry: 'Hospitality', result: '3.1x', detail: 'Increase in repeat audience engagement' },
  { industry: 'Personal Brands', result: '5x', detail: 'Average monthly profile reach growth' },
] as const;

export function IndustryOutcomes() {
  return (
    <section className="mx-auto flex w-full max-w-7xl items-center px-6 py-24 lg:min-h-screen lg:py-28">
      <ScrollReveal>
        <SectionHeader
          eyebrow="Industry Results"
          title="Built for ambitious local businesses and creators"
          subtitle="Our systems are designed to work across industries without losing the nuance that makes your brand unique."
        />
      </ScrollReveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <ScrollReveal>
          <PlaceholderImage
            seed="walktopus-outcomes"
            width={1200}
            height={800}
            alt="Walktopus campaign outcomes dashboard"
            className="h-full min-h-[360px]"
          />
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {outcomes.map((item, index) => (
            <ScrollReveal key={item.industry} delay={index * 0.08}>
              <div className="border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-6">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">{item.industry}</p>
                <p className="mt-3 text-4xl font-extrabold text-[var(--color-text-dark)]">{item.result}</p>
                <p className="mt-2 text-sm text-[var(--color-soft-gray)]">{item.detail}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
