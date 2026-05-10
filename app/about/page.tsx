export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Image from 'next/image';
import { TEAM } from '@/lib/constants';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About Walktopus',
  description:
    'Learn how Walktopus started in Kolkata, how Dgen Technologies Private Limited powers the company, and why our mission is built around helping small businesses and creators grow online.',
  pathname: '/about',
  keywords: ['about Walktopus', 'Dgen Technologies subsidiary', 'Kolkata marketing agency story'],
});

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
        <PlaceholderImage
          seed="walktopus-about"
          width={1200}
          height={800}
          alt="Walktopus team story and digital marketing agency roots in Kolkata"
          className="h-72"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </section>

      <section>
        <h2 className="text-4xl font-extrabold">Leadership</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TEAM.map((member) => (
            <article key={member.name} className="border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-4">
              {member.imagePath ? (
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={member.imagePath}
                    alt={`${member.name}, ${member.title} at Walktopus`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-top grayscale-[20%]"
                  />
                  <div className="absolute inset-0 bg-[var(--color-bg)]/15 mix-blend-multiply" />
                </div>
              ) : (
                <PlaceholderImage
                  seed={member.placeholderSeed}
                  width={400}
                  height={400}
                  alt={`${member.name}, ${member.title} at Walktopus`}
                  className="h-56"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              )}
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
