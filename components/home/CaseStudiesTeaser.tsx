import { Card } from '@/components/ui/Card';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/common/ScrollReveal';

// TODO IMAGES: Replace placeholders before launch
// - case-study-1: needs real local retail campaign creative
// - case-study-2: needs personal brand growth snapshot
// - case-study-3: needs service launch campaign visual

const studies = [
  { title: 'Local Retail Expansion', seed: 'walktopus-case1' },
  { title: 'Personal Brand Breakthrough', seed: 'walktopus-case2' },
  { title: 'Service Business Launch', seed: 'walktopus-case3' },
];

export function CaseStudiesTeaser() {
  return (
    <section className="mx-auto flex w-full max-w-7xl items-center px-6 py-24 lg:min-h-screen lg:py-28">
      <ScrollReveal>
        <SectionHeader
          eyebrow="Selected Work"
          title="Growth stories in motion"
          subtitle="A preview of campaign systems and execution frameworks we deploy to deliver predictable momentum."
        />
      </ScrollReveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {studies.map((study, index) => (
          <ScrollReveal key={study.seed} delay={index * 0.08}>
            <Card className="p-0">
              <PlaceholderImage seed={study.seed} width={800} height={600} alt={study.title} className="h-52" />
              <div className="p-6">
                <h3 className="text-xl font-bold">{study.title}</h3>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
