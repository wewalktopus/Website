import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { TEAM } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { absoluteUrl, breadcrumbSchema, pageMetadata, personSchema } from '@/lib/seo';

const sukomal = TEAM.find((member) => member.name === 'Sukomal Debnath');
const sukomalProfile = sukomal?.profile;

export const metadata: Metadata = pageMetadata({
  title: 'Sukomal Debnath - Co-founder & Director, DGEN Technologies',
  description:
    'Sukomal Debnath co-founded Walktopus in Kolkata and serves as Director of Dgen Technologies Private Limited. Learn about his vision for digital marketing and entrepreneurship.',
  pathname: '/about/sukomal',
  keywords: ['Sukomal Debnath Walktopus', 'co-founder Kolkata', 'Dgen Technologies Private Limited'],
});

const sukomalSchema = personSchema(
  'Sukomal Debnath',
  'Co-founder and Director, Dgen Technologies Private Limited',
  'Sukomal Debnath co-founded Walktopus in Kolkata and leads the strategy and infrastructure behind Dgen Technologies Private Limited.',
  absoluteUrl(sukomal?.imagePath ?? '/images/team/sukomal-debnath.jpeg'),
  absoluteUrl('/about/sukomal'),
  {
    worksFor: 'Dgen Technologies Private Limited',
    sameAs: [
      'https://linkedin.com/company/walktopus',
      'https://www.instagram.com/walktopus',
    ],
  },
);

const sukomalCrumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Sukomal Debnath', path: '/about/sukomal' },
]);

export default function SukomalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sukomalSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sukomalCrumbs) }} />
      <div className="mx-auto w-full max-w-7xl space-y-24 px-6 py-24 lg:py-32">
      <Link href="/about" className="inline-flex items-center gap-2 text-[var(--color-accent)] hover:underline">
        ← Back to Leadership
      </Link>

      <section className="grid gap-16 md:grid-cols-2">
        <div className="relative h-96">
          <Image
            src={sukomal?.imagePath ?? '/images/team/sukomal-debnath.jpeg'}
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
            <p className="mt-2 text-xl font-semibold text-[var(--color-soft-gray)]">{sukomalProfile?.headingTitle ?? 'Co-founder & Director, Dgen Technologies Private Limited, Kolkata'}</p>
          </div>

          <div className="space-y-4 text-[var(--color-text)]">
            {(sukomalProfile?.introParagraphs ?? []).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="space-y-3 border-l-4 border-[var(--color-accent)] pl-6 py-4">
            <h3 className="font-bold text-[var(--color-text-dark)]">{sukomalProfile?.keySectionTitle ?? 'Key Responsibilities'}</h3>
            <ul className="space-y-2 text-sm text-[var(--color-soft-gray)]">
              {(sukomalProfile?.keyPoints ?? []).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {(sukomalProfile?.storySections ?? []).map((section) => (
        <section key={section.title} className="space-y-6 rounded-lg border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-8">
          <h2 className="text-2xl font-bold">{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[var(--color-text)]">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <section className="space-y-8">
        <h2 className="text-3xl font-bold">{sukomalProfile?.beyondTitle ?? 'Beyond Walktopus & DGEN'}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {(sukomalProfile?.beyondItems ?? []).map((item) => (
            <div key={item.title} className="space-y-2">
              <h3 className="font-bold text-[var(--color-text-dark)]">{item.title}</h3>
              <p className="text-sm text-[var(--color-soft-gray)]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-4 rounded-lg border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] py-12 px-6">
        <h3 className="text-center text-xl font-bold">{sukomalProfile?.ctaTitle ?? 'Ready to grow with Walktopus?'}</h3>
        <p className="text-center text-[var(--color-soft-gray)]">{sukomalProfile?.ctaText ?? "Let's discuss how Sukomal and the team can accelerate your growth"}</p>
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
    </>
  );
}
