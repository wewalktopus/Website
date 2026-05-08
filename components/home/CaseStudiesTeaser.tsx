import { Card } from '@/components/ui/Card';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { SectionHeader } from '@/components/ui/SectionHeader';

const studies = [
  { title: 'Local Retail Expansion', seed: 'walktopus-case1' },
  { title: 'Personal Brand Breakthrough', seed: 'walktopus-case2' },
  { title: 'Service Business Launch', seed: 'walktopus-case3' },
];

export function CaseStudiesTeaser() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:py-32">
      <SectionHeader
        eyebrow="Selected Work"
        title="Growth stories in motion"
        subtitle="A preview of campaign systems and execution frameworks we deploy to deliver predictable momentum."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {studies.map((study) => (
          <Card key={study.seed} className="p-0">
            <PlaceholderImage seed={study.seed} width={800} height={600} alt={study.title} className="h-52" />
            <div className="p-6">
              <h3 className="text-xl font-bold">{study.title}</h3>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
