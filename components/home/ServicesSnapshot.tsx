import { SERVICES } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function ServicesSnapshot() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:py-32">
      <SectionHeader
        eyebrow="Service Pillars"
        title="Built for growth at every stage"
        subtitle="From social reach to full funnel performance, our systems are designed to create measurable business outcomes."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {SERVICES.map((service) => (
          <Card key={service.id}>
            <h3 className="text-2xl font-bold">{service.title}</h3>
            <p className="mt-4 text-[var(--color-soft-gray)]">{service.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
