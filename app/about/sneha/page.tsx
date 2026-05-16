import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Sneha Dey - Operations Lead, Walktopus',
  description:
    'Sneha Dey drives Walktopus campaigns and client relationships with precision and passion. Learn about her journey and vision.',
  pathname: '/about/sneha',
});

export default function SnehaPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-24 px-6 py-24 lg:py-32">
      <Link href="/about" className="inline-flex items-center gap-2 text-[var(--color-accent)] hover:underline">
        ← Back to Leadership
      </Link>

      <section className="grid gap-16 md:grid-cols-2">
        <div className="relative h-96">
          <Image
            src="/images/team/sneha-dey.png"
            alt="Sneha Dey, Operations Lead at Walktopus"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-[var(--color-bg)]/10 mix-blend-multiply" />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">Leadership</p>
            <h1 className="mt-2 text-5xl font-extrabold leading-tight">Sneha Dey</h1>
            <p className="mt-2 text-xl font-semibold text-[var(--color-soft-gray)]">Operations Lead</p>
          </div>

          <div className="space-y-4 text-[var(--color-text)]">
            <p>
              Sneha Dey is the operational backbone of Walktopus, driving campaigns and client relationships with precision, 
              strategic thinking, and a passion for delivering measurable results.
            </p>
            <p>
              With a focus on execution excellence and team leadership, Sneha ensures that every client receives the highest 
              level of attention and strategy. She bridges the gap between vision and reality, turning growth ambitions into 
              tangible outcomes.
            </p>
          </div>

          <div className="space-y-3 border-l-4 border-[var(--color-accent)] pl-6 py-4">
            <h3 className="font-bold text-[var(--color-text-dark)]">Key Responsibilities</h3>
            <ul className="space-y-2 text-sm text-[var(--color-soft-gray)]">
              <li>• Managing day-to-day campaigns and client relationships</li>
              <li>• Ensuring quality execution across all service pillars</li>
              <li>• Leading team coordination and project delivery</li>
              <li>• Driving operational efficiency and scalability</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-lg border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-8">
        <h2 className="text-2xl font-bold">Philosophy & Approach</h2>
        <p className="text-[var(--color-text)]">
          Sneha believes that the best marketing comes from understanding your clients deeply—their goals, their challenges, 
          and their market realities. She approaches every campaign with a data-driven mindset while maintaining the creativity 
          and adaptability that modern marketing demands.
        </p>
        <p className="text-[var(--color-text)]">
          Her leadership style emphasizes transparency, continuous improvement, and celebrating wins—big and small.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Beyond Walktopus</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-bold text-[var(--color-text-dark)]">Interests</h3>
            <p className="text-sm text-[var(--color-soft-gray)]">Digital strategy, team leadership, creative problem-solving</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-[var(--color-text-dark)]">Passion</h3>
            <p className="text-sm text-[var(--color-soft-gray)]">Empowering small businesses and helping them achieve their growth potential</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-4 rounded-lg border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] py-12 px-6">
        <h3 className="text-center text-xl font-bold">Ready to work with Walktopus?</h3>
        <p className="text-center text-[var(--color-soft-gray)]">Let's discuss your growth goals with Sneha and the team</p>
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
