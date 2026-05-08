import { SERVICES } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Gauge, Megaphone, Orbit } from 'lucide-react';

const serviceIcons = {
  'social-media': Megaphone,
  'web-identity': Orbit,
  'growth-campaigns': Gauge,
} as const;

export function ServicesSnapshot() {
  return (
    <section className="mx-auto flex w-full max-w-7xl items-center px-6 py-24 lg:min-h-screen lg:py-28">
      <SectionHeader
        eyebrow="Service Pillars"
        title="Built for growth at every stage"
        subtitle="From social reach to full funnel performance, our systems are designed to create measurable business outcomes."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {SERVICES.map((service) => {
          const Icon = serviceIcons[service.id];

          return (
          <Card key={service.id}>
            <div className="flex h-12 w-12 items-center justify-center border border-[var(--color-bg-secondary)] bg-white/60 text-[var(--color-accent)]">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-bold">{service.title}</h3>
            <p className="mt-4 text-[var(--color-soft-gray)]">{service.description}</p>
          </Card>
          );
        })}
      </div>
    </section>
  );
}
