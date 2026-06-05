import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { TEAM } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { absoluteUrl, breadcrumbSchema, pageMetadata, personSchema } from '@/lib/seo';

const sneha = TEAM.find((member) => member.name === 'Sneha Dey');
const snehaProfile = sneha?.profile;

export const metadata: Metadata = pageMetadata({
  title: 'Sneha Dey - Operations Lead, Walktopus',
  description:
    'Sneha Dey drives Walktopus campaigns and client relationships from Kolkata, India with precision and passion. Learn about her journey and vision.',
  pathname: '/about/sneha',
  keywords: ['Sneha Dey Walktopus', 'operations lead Kolkata', 'Walktopus Kolkata India'],
});

const snehaSchema = personSchema(
  'Sneha Dey',
  'Operations Lead',
  'Sneha Dey drives Walktopus campaigns and client relationships from Kolkata, India with precision and measurable execution.',
  absoluteUrl(sneha?.imagePath ?? '/images/team/sneha-dey.png'),
  absoluteUrl('/about/sneha'),
  {
    worksFor: 'Walktopus',
    sameAs: [
      'https://linkedin.com/company/walktopus',
      'https://www.instagram.com/walktopus',
    ],
  },
);

const snehaCrumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Sneha Dey', path: '/about/sneha' },
]);

export default function SnehaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(snehaSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(snehaCrumbs) }} />
      <div className="mx-auto w-full max-w-7xl space-y-24 px-6 py-24 lg:py-32">
      <Link href="/about" className="inline-flex items-center gap-2 text-[var(--color-accent)] hover:underline">
        ← Back to Leadership
      </Link>

      <section className="grid gap-16 md:grid-cols-2">
        <div className="relative h-96">
          <Image
            src={sneha?.imagePath ?? '/images/team/sneha-dey.png'}
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
            <p className="mt-2 text-xl font-semibold text-[var(--color-soft-gray)]">{snehaProfile?.headingTitle ?? 'Operations Lead at Walktopus, Kolkata, India'}</p>
          </div>

          <div className="space-y-4 text-[var(--color-text)]">
            {(snehaProfile?.introParagraphs ?? []).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="space-y-3 border-l-4 border-[var(--color-accent)] pl-6 py-4">
            <h3 className="font-bold text-[var(--color-text-dark)]">{snehaProfile?.keySectionTitle ?? 'Key Responsibilities'}</h3>
            <ul className="space-y-2 text-sm text-[var(--color-soft-gray)]">
              {(snehaProfile?.keyPoints ?? []).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {(snehaProfile?.storySections ?? []).map((section) => (
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
        <h2 className="text-3xl font-bold">{snehaProfile?.beyondTitle ?? 'Beyond Walktopus'}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {(snehaProfile?.beyondItems ?? []).map((item) => (
            <div key={item.title} className="space-y-2">
              <h3 className="font-bold text-[var(--color-text-dark)]">{item.title}</h3>
              <p className="text-sm text-[var(--color-soft-gray)]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-4 rounded-lg border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] py-12 px-6">
        <h3 className="text-center text-xl font-bold">{snehaProfile?.ctaTitle ?? 'Ready to work with Walktopus?'}</h3>
        <p className="text-center text-[var(--color-soft-gray)]">{snehaProfile?.ctaText ?? "Let's discuss your growth goals with Sneha and the team"}</p>
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
