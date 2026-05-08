export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { TEAM } from '@/lib/constants';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn the Walktopus origin story and how Dgen Technologies powers our growth mission.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-24 px-6 py-24 lg:py-32">
      <section>
        <SectionHeader
          eyebrow="Our Story"
          title="From one travel account to a full growth agency"
          subtitle="Walktopus started in December 2025 with a simple question: why not build your own marketing company to run your own brand?"
        />
        <blockquote className="mt-8 border-l-4 border-[var(--color-accent)] pl-6 text-2xl font-bold text-[var(--color-text-dark)]">
          Why not manage my own account through my own marketing company?
        </blockquote>
      </section>

      <section className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4 text-[var(--color-soft-gray)]">
          <p>Co-founded by Sukomal Debnath and Sagnik Mandal, Walktopus evolved from a practical idea into a growth partner for small businesses and individuals.</p>
          <p>As a subsidiary of Dgen Technologies Private Limited, Walktopus combines technical infrastructure with strategic marketing execution.</p>
          <p className="font-semibold text-[var(--color-text)]">Every small business deserves a big digital presence.</p>
        </div>
        <PlaceholderImage seed="walktopus-about" width={1200} height={800} alt="About Walktopus" className="h-72" />
      </section>

      <section>
        <h2 className="text-4xl font-extrabold">Leadership</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TEAM.map((member) => (
            <article key={member.name} className="border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-4">
              <PlaceholderImage seed={member.placeholderSeed} width={400} height={400} alt={member.name} className="h-56" />
              <h3 className="mt-4 text-xl font-bold">{member.name}</h3>
              <p className="text-sm font-semibold text-[var(--color-accent)]">{member.title}</p>
              <p className="mt-2 text-sm text-[var(--color-soft-gray)]">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
