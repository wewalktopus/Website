import { SERVICES } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { Gauge, Megaphone, Orbit } from 'lucide-react';

const serviceIcons = {
  'social-media': Megaphone,
  'web-identity': Orbit,
  'growth-campaigns': Gauge,
} as const;

export function ServicesSnapshot() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col px-6 py-24 lg:min-h-screen lg:justify-center lg:py-28">
      <ScrollReveal>
        <SectionHeader
          eyebrow="Service Pillars"
          title="Built for growth at every stage"
          subtitle="From social reach to full funnel performance, our systems are designed to create measurable business outcomes."
          titleClassName="[font-family:var(--font-anton)]"
        />
      </ScrollReveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {SERVICES.map((service, index) => {
          const Icon = serviceIcons[service.id];
          return (
            <ScrollReveal key={service.id} delay={index * 0.1}>
              <Card className="h-full">
                <div className="flex h-12 w-12 items-center justify-center border border-(--color-bg-secondary) bg-white/60 text-(--color-accent)">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
                <p className="mt-4 text-(--color-soft-gray)">{service.description}</p>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
