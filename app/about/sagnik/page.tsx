import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { TEAM } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { pageMetadata } from '@/lib/seo';

const sagnik = TEAM.find((member) => member.name === 'Sagnik Mandal');

export const metadata: Metadata = pageMetadata({
  title: 'Sagnik Mandal - Co-founder, Walktopus',
  description:
    'Sagnik Mandal co-founded Walktopus and serves as co-architect of the platform and growth strategy. Learn about his vision for digital marketing.',
  pathname: '/about/sagnik',
});

export default function SagnikPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-24 px-6 py-24 lg:py-32">
      <Link href="/about" className="inline-flex items-center gap-2 text-[var(--color-accent)] hover:underline">
        ← Back to Leadership
      </Link>

      <section className="grid gap-16 md:grid-cols-2">
        <div className="relative h-96">
          <Image
            src={sagnik?.imagePath ?? '/images/team/sagnik-mandal.png'}
            alt="Sagnik Mandal, Co-founder at Walktopus"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-[var(--color-bg)]/10 mix-blend-multiply" />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">Leadership</p>
            <h1 className="mt-2 text-5xl font-extrabold leading-tight">Sagnik Mandal</h1>
            <p className="mt-2 text-xl font-semibold text-[var(--color-soft-gray)]">Co-founder</p>
          </div>

          <div className="space-y-4 text-[var(--color-text)]">
            <p>
              Sagnik Mandal is the co-architect of Walktopus's vision and growth strategy. Working alongside Sukomal Debnath, 
              Sagnik brings a strategic mindset and operational expertise that has been instrumental in transforming the 
              company's initial idea into a scalable, results-driven growth agency.
            </p>
            <p>
              With a deep focus on strategy, market positioning, and sustainable growth, Sagnik ensures that every decision 
              Walktopus makes is backed by data, insight, and a clear understanding of market opportunities.
            </p>
          </div>

          <div className="space-y-3 border-l-4 border-[var(--color-accent)] pl-6 py-4">
            <h3 className="font-bold text-[var(--color-text-dark)]">Key Focus Areas</h3>
            <ul className="space-y-2 text-sm text-[var(--color-soft-gray)]">
              <li>• Strategic planning and market positioning</li>
              <li>• Growth strategy and scaling frameworks</li>
              <li>• Client success and partnership development</li>
              <li>• Innovation and service expansion</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-lg border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-8">
        <h2 className="text-2xl font-bold">Strategic Vision</h2>
        <div className="space-y-4 text-[var(--color-text)]">
          <p>
            Sagnik's approach to growth is methodical and data-centric. He believes that the best marketing outcomes come from 
            a combination of clear strategic thinking, flawless execution, and continuous optimization based on real performance data.
          </p>
          <p>
            As co-founder, Sagnik has been pivotal in defining Walktopus's service pillars—Social Media Mastery, Web Identity & 
            Domain Solutions, and Growth & Promotion Campaigns. Each pillar reflects a deep understanding of what small businesses 
            and creators actually need to grow online.
          </p>
        </div>
      </section>

      <section className="space-y-6 rounded-lg border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-8">
        <h2 className="text-2xl font-bold">Philosophy & Approach</h2>
        <p className="text-[var(--color-text)]">
          Sagnik is a strong believer in the power of <span className="font-semibold">intentional strategy over tactical chaos.</span> 
          In a world of constant platform changes and algorithm updates, he emphasizes building enduring systems that adapt smartly 
          without losing focus on core business objectives.
        </p>
        <p className="text-[var(--color-text)]">
          His leadership style is collaborative, transparent, and growth-oriented—bringing out the best in teams while maintaining 
          a relentless focus on delivering measurable results for every client.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Beyond Walktopus</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-bold text-[var(--color-text-dark)]">Interests</h3>
            <p className="text-sm text-[var(--color-soft-gray)]">Digital strategy, market trends, growth systems, data analytics, entrepreneurship</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-[var(--color-text-dark)]">Belief</h3>
            <p className="text-sm text-[var(--color-soft-gray)]">Great strategy + flawless execution = unstoppable growth</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-4 rounded-lg border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] py-12 px-6">
        <h3 className="text-center text-xl font-bold">Let's build your growth strategy</h3>
        <p className="text-center text-[var(--color-soft-gray)]">Connect with Sagnik and the team to discuss your growth roadmap</p>
        <Link href="/contact">
          <Button variant="primary">Book a Consultation</Button>
        </Link>
      </section>

      <div className="flex justify-center">
        <Link href="/about" className="text-[var(--color-accent)] hover:underline">
          ← Back to Leadership
        </Link>
      </div>
    </div>
  );
}
