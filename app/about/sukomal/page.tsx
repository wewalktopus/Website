import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Sukomal Debnath - Co-founder & Director, DGEN Technologies',
  description:
    'Sukomal Debnath co-founded Walktopus and serves as Director of DGEN Technologies. Learn about his vision for digital marketing and entrepreneurship.',
  pathname: '/about/sukomal',
});

export default function SukomalPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-24 px-6 py-24 lg:py-32">
      <Link href="/about" className="inline-flex items-center gap-2 text-[var(--color-accent)] hover:underline">
        ← Back to Leadership
      </Link>

      <section className="grid gap-16 md:grid-cols-2">
        <div className="relative h-96">
          <Image
            src="/images/team/sukomal-debnath.jpg"
            alt="Sukomal Debnath, Co-founder and Director at Walktopus"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-[var(--color-bg)]/10 mix-blend-multiply" />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">Leadership</p>
            <h1 className="mt-2 text-5xl font-extrabold leading-tight">Sukomal Debnath</h1>
            <p className="mt-2 text-xl font-semibold text-[var(--color-soft-gray)]">Co-founder & Director, DGEN Technologies</p>
          </div>

          <div className="space-y-4 text-[var(--color-text)]">
            <p>
              Sukomal Debnath is the visionary founder of Walktopus. His entrepreneurial journey began with a simple question 
              while managing Sukomal Travel, his personal brand: <span className="italic font-semibold">"Why not build my own 
              marketing company to run my own account?"</span>
            </p>
            <p>
              That spark of an idea in December 2025 evolved into Walktopus—a full-service growth agency dedicated to helping 
              small businesses and creators build their digital presence. As Director of DGEN Technologies Private Limited, 
              Sukomal provides the strategic and technical infrastructure that powers Walktopus at scale.
            </p>
          </div>

          <div className="space-y-3 border-l-4 border-[var(--color-accent)] pl-6 py-4">
            <h3 className="font-bold text-[var(--color-text-dark)]">Key Responsibilities</h3>
            <ul className="space-y-2 text-sm text-[var(--color-soft-gray)]">
              <li>• Strategic direction and vision for Walktopus</li>
              <li>• Leadership of DGEN Technologies infrastructure</li>
              <li>• Business development and partnership strategy</li>
              <li>• Growth roadmap and scaling operations</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-lg border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-8">
        <h2 className="text-2xl font-bold">The Origin Story</h2>
        <div className="space-y-4 text-[var(--color-text)]">
          <p>
            Sukomal's entrepreneurial journey is deeply personal. Managing Sukomal Travel—a personal travel and lifestyle 
            brand—he realized the gap between having great content and struggling to amplify it effectively through existing 
            platforms and agencies.
          </p>
          <p>
            That realization led to a powerful idea: build his own marketing company. But rather than keeping it personal, 
            Sukomal envisioned something bigger—a platform that could help <span className="font-semibold">every small 
            business and creator</span> achieve the same level of digital amplification.
          </p>
          <p>
            Walktopus was born from this vision in December 2025, and with the backing of DGEN Technologies Private Limited, 
            it quickly grew into a trusted partner for growth-focused brands across India.
          </p>
        </div>
      </section>

      <section className="space-y-6 rounded-lg border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-8">
        <h2 className="text-2xl font-bold">Philosophy & Vision</h2>
        <p className="text-[var(--color-text)]">
          Sukomal believes that <span className="font-semibold">every small business deserves a big digital presence.</span> 
          He rejects the idea that premium marketing is only for large corporations. Instead, he's committed to democratizing 
          growth—making world-class marketing strategies, execution, and results accessible to startups, local businesses, 
          and individual creators.
        </p>
        <p className="text-[var(--color-text)]">
          His leadership approach combines scrappy startup energy with corporate discipline—nimble enough to adapt quickly, 
          structured enough to scale sustainably.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Beyond Walktopus & DGEN</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-bold text-[var(--color-text-dark)]">Interests</h3>
            <p className="text-sm text-[var(--color-soft-gray)]">Digital strategy, brand building, travel, entrepreneurship, market disruption</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-[var(--color-text-dark)]">Mission</h3>
            <p className="text-sm text-[var(--color-soft-gray)]">Transforming how small businesses and creators approach digital growth</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-4 rounded-lg border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] py-12 px-6">
        <h3 className="text-center text-xl font-bold">Ready to grow with Walktopus?</h3>
        <p className="text-center text-[var(--color-soft-gray)]">Let's discuss how Sukomal and the team can accelerate your growth</p>
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
