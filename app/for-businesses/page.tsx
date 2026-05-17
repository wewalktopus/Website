export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { ArrowUpRight, BriefcaseBusiness, CheckCircle2, Crown, Gem, Megaphone, Rocket, UserRound } from 'lucide-react';
import { BUSINESS_BENEFITS, INDIVIDUAL_JOURNEY } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { pageMetadata, aggregateOfferSchema, breadcrumbSchema } from '@/lib/seo';

const packageIcons = [Rocket, Megaphone, Crown] as const;

type MonthlyPackage = {
  name: string;
  price: string;
  details: readonly string[];
  popular?: boolean;
};

const monthlyPackages: readonly MonthlyPackage[] = [
  {
    name: 'Core',
    price: '₹5,499 / month',
    details: [
      '8 social media posts / month',
      '1 platform managed',
      'Basic branding kit',
      'Monthly report',
    ],
  },
  {
    name: 'Boost',
    price: '₹14,999 / month',
    details: [
      '16-20 posts / month',
      '2 platforms managed',
      '2-4 reels / month',
      'Google Business management',
      'Basic ad management',
      'Bi-weekly reporting',
    ],
    popular: true,
  },
  {
    name: 'Prime',
    price: '₹29,999 / month',
    details: [
      '25-30 posts / month',
      '3-4 platforms managed',
      '6-8 reels / month',
      'Basic website support',
      'Paid ad campaigns',
      'Weekly reporting',
    ],
  },
];

const premiumPackage = {
  name: 'Premium',
  price: '₹49,999 / month',
  details: [
    'Unlimited posts',
    'All major platforms',
    '12+ reels / month',
    'Full website plus SEO',
    'Full ad management',
    'Dedicated account manager',
  ],
} as const;

export const metadata: Metadata = pageMetadata({
  title: 'Solutions for Businesses and Individuals',
  description:
    'Walktopus offers one unified growth system for businesses and individuals with social media management, content execution, and monthly partnership packages built for clear outcomes.',
  pathname: '/for-businesses',
  keywords: [
    'digital marketing packages Kolkata',
    'business and personal brand marketing India',
    'social media management pricing India',
  ],
});

const allPackages = [...monthlyPackages, premiumPackage];
const offerSchema = aggregateOfferSchema(
  allPackages.map((pkg) => ({ name: pkg.name, price: pkg.price })),
);

const crumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/for-businesses' },
]);

export default function ForBusinessesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:py-32">
      <h1 className="font-display text-5xl uppercase leading-tight sm:text-6xl lg:text-7xl">
        One Growth System for Businesses and Individuals.
      </h1>
      <p className="mt-6 max-w-3xl text-lg text-(--color-soft-gray)">
        You asked for one page, so this is the single destination for both business growth and personal brand growth. Pick the track that fits your current stage and scale with a monthly execution partnership.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="/contact">Book a Free Consultation</Button>
        <Button href="/services" variant="secondary">
          Explore Services
        </Button>
      </div>

      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center border border-(--color-bg-secondary) bg-white/70 text-(--color-accent)">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">For Businesses</p>
              <h2 className="mt-1 text-3xl font-extrabold leading-tight">Scale Your Business. Dominate Your Market.</h2>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {BUSINESS_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-(--color-accent)" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center border border-(--color-bg-secondary) bg-white/70 text-(--color-accent)">
              <UserRound className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">For Individuals</p>
              <h2 className="mt-1 text-3xl font-extrabold leading-tight">Build Your Brand. Own Your Audience.</h2>
            </div>
          </div>

          <ol className="mt-6 grid gap-3 sm:grid-cols-2">
            {INDIVIDUAL_JOURNEY.map((step, index) => (
              <li key={step} className="border border-(--color-bg-secondary) bg-white/60 p-4">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">Step {index + 1}</p>
                <p className="mt-2 text-xl font-bold leading-tight">{step}</p>
              </li>
            ))}
          </ol>
        </Card>
      </section>

      <section className="mt-20">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-(--color-accent)">03 Monthly Growth Partnerships</p>
        <h2 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl">Flexible monthly packages designed to match your growth goals.</h2>
        <p className="mt-4 max-w-3xl text-(--color-soft-gray)">
          Start lean, then move up as your channel mix, output volume, and business objectives expand.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {monthlyPackages.map((pkg, index) => {
            const Icon = packageIcons[index % packageIcons.length];

            return (
              <Card
                key={pkg.name}
                className={pkg.popular ? 'relative border-(--color-accent) shadow-md shadow-(--color-accent)/20' : undefined}
              >
                {pkg.popular ? (
                  <span className="absolute -top-3 left-6 bg-(--color-accent) px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white">
                    Most Popular
                  </span>
                ) : null}
                <div className="flex h-11 w-11 items-center justify-center border border-(--color-bg-secondary) bg-white/70 text-(--color-accent)">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-4xl font-extrabold uppercase leading-none">{pkg.name}</h3>
                <p className="mt-4 border-t border-(--color-bg-secondary) pt-4 text-2xl font-bold">{pkg.price}</p>
                <ul className="mt-5 space-y-3">
                  {pkg.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        <Card className="mt-6">
          <div className="grid gap-6 md:grid-cols-[auto_1fr_auto_1fr] md:items-start">
            <div className="flex h-11 w-11 items-center justify-center border border-(--color-bg-secondary) bg-white/70 text-(--color-accent)">
              <Gem className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-4xl font-extrabold uppercase leading-none">{premiumPackage.name}</h3>
              <p className="mt-3 text-2xl font-bold">{premiumPackage.price}</p>
            </div>
            <ul className="space-y-3">
              {premiumPackage.details.slice(0, 3).map((detail) => (
                <li key={detail} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {premiumPackage.details.slice(3).map((detail) => (
                <li key={detail} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="mt-6 border border-(--color-bg-secondary) bg-(--color-bg-light) p-6">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">Note</p>
          <p className="mt-2 text-sm text-(--color-text)">
            Ad spend is separate. Clients pay ad platforms directly, and Walktopus charges <span className="font-bold text-(--color-accent)">15-20%</span> of ad spend as a management fee.
          </p>
        </div>
      </section>

      <div className="mt-12 flex flex-wrap gap-4">
        <Button href="/contact" className="group">
          Book a Strategy Call <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Button>
        <Button href="/services" variant="secondary">
          View Service Pillars
        </Button>
      </div>
      </div>
    </>
  );
}
