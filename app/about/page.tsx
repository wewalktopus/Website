export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Image from 'next/image';
import { TEAM } from '@/lib/constants';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { pageMetadata, personSchema, breadcrumbSchema, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About Walktopus',
  description:
    'Learn how Walktopus started in Kolkata, how Dgen Technologies Private Limited powers the company, and why our mission is built around helping small businesses and creators grow online.',
  pathname: '/about',
  keywords: [
    'about Walktopus',
    'Walktopus founders Kolkata',
    'Walktopus initiative by Dgen Technologies',
    'Kolkata marketing agency story',
  ],
});

const leaderPaths = {
  'Sneha Dey': '/about/sneha',
  'Sukomal Debnath': '/about/sukomal',
  'Sagnik Mandal': '/about/sagnik',
} as const;

const teamSchemas = TEAM.map((member) =>
  personSchema(
    member.name,
    member.title,
    member.bio,
    absoluteUrl(member.imagePath),
    absoluteUrl(leaderPaths[member.name as keyof typeof leaderPaths]),
  ),
);

const crumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]);

export default function AboutPage() {
  return (
    <>
      {teamSchemas.map((schema, idx) => (
        <script
          key={`team-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
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
          <p>Co-founded by Sukomal Debnath and Sagnik Mandal, Walktopus evolved in Kolkata from a practical idea into a growth partner for small businesses and individuals across India.</p>
          <p>Walktopus is a proud initiative by Dgen Technologies Private Limited.</p>
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
            <a
              key={member.name}
              href={leaderPaths[member.name as keyof typeof leaderPaths]}
              className="group cursor-pointer transition-all duration-300 hover:shadow-lg"
            >
              <article className="border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-4">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.imagePath}
                    alt={`${member.name}, ${member.title} at Walktopus in Kolkata, India`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-top grayscale-[20%] transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[var(--color-bg)]/15 mix-blend-multiply" />
                </div>
                <h3 className="mt-4 text-xl font-bold group-hover:text-[var(--color-accent)] transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-[var(--color-accent)]">{member.title}</p>
                <p className="mt-2 text-sm text-[var(--color-soft-gray)]">{member.bio}</p>
              </article>
            </a>
          ))}
        </div>
      </section>
      </div>
    </>
  );
}
