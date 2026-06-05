import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { TEAM } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { absoluteUrl, breadcrumbSchema, pageMetadata, personSchema } from '@/lib/seo';

const sagnik = TEAM.find((member) => member.name === 'Sagnik Mandal');
const sagnikProfile = sagnik?.profile;

export const metadata: Metadata = pageMetadata({
  title: 'Sagnik Mandal - Co-founder, Walktopus',
  description:
    'Sagnik Mandal co-founded Walktopus in Kolkata and serves as co-architect of the platform and growth strategy. Learn about his vision for digital marketing.',
  pathname: '/about/sagnik',
  keywords: ['Sagnik Mandal Walktopus', 'co-founder Kolkata', 'growth strategy India'],
});

const sagnikSchema = personSchema(
  'Sagnik Mandal',
  'Co-founder, Walktopus',
  'Sagnik Mandal co-founded Walktopus in Kolkata and shapes the platform and growth strategy behind the brand.',
  absoluteUrl(sagnik?.imagePath ?? '/images/team/sagnik-mandal.png'),
  absoluteUrl('/about/sagnik'),
  {
    worksFor: 'Walktopus',
    sameAs: [
      'https://linkedin.com/company/walktopus',
      'https://www.instagram.com/walktopus',
    ],
  },
);

const sagnikCrumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Sagnik Mandal', path: '/about/sagnik' },
]);

export default function SagnikPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sagnikSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sagnikCrumbs) }} />
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
            <p className="mt-2 text-xl font-semibold text-[var(--color-soft-gray)]">{sagnikProfile?.headingTitle ?? 'Co-founder at Walktopus, Kolkata, India'}</p>
          </div>

          <div className="space-y-4 text-[var(--color-text)]">
            {(sagnikProfile?.introParagraphs ?? []).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="space-y-3 border-l-4 border-[var(--color-accent)] pl-6 py-4">
            <h3 className="font-bold text-[var(--color-text-dark)]">{sagnikProfile?.keySectionTitle ?? 'Key Focus Areas'}</h3>
            <ul className="space-y-2 text-sm text-[var(--color-soft-gray)]">
              {(sagnikProfile?.keyPoints ?? []).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {(sagnikProfile?.storySections ?? []).map((section) => (
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
        <h2 className="text-3xl font-bold">{sagnikProfile?.beyondTitle ?? 'Beyond Walktopus'}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {(sagnikProfile?.beyondItems ?? []).map((item) => (
            <div key={item.title} className="space-y-2">
              <h3 className="font-bold text-[var(--color-text-dark)]">{item.title}</h3>
              <p className="text-sm text-[var(--color-soft-gray)]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-4 rounded-lg border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] py-12 px-6">
        <h3 className="text-center text-xl font-bold">{sagnikProfile?.ctaTitle ?? "Let's build your growth strategy"}</h3>
        <p className="text-center text-[var(--color-soft-gray)]">{sagnikProfile?.ctaText ?? 'Connect with Sagnik and the team to discuss your growth roadmap'}</p>
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
