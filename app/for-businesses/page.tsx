export const dynamic = 'force-static';

import type { Metadata } from 'next';
import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Globe2,
  Megaphone,
  Rocket,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { BUSINESS_BENEFITS, INDIVIDUAL_JOURNEY } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { pageMetadata, aggregateOfferSchema, breadcrumbSchema } from '@/lib/seo';
import { DEFAULT_PRICING_CONFIG } from '@/lib/pricing-config';

const packageIcons = [Rocket, Megaphone, Globe2, Sparkles] as const;

const monthlyPackages = DEFAULT_PRICING_CONFIG.india.monthlyPlans;

export const metadata: Metadata = pageMetadata({
  title: 'Solutions for Businesses',
  description:
    'Explore Walktopus business growth solutions with structured monthly partnerships, clear deliverables, and high-accountability execution from strategy to scale.',
  pathname: '/for-businesses',
  keywords: [
    'digital marketing packages Kolkata',
    'business growth solutions India',
    'social media management pricing India',
  ],
});

const offerSchema = aggregateOfferSchema(monthlyPackages.map((pkg) => ({ name: pkg.name, price: pkg.price })));

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
        <section className="relative overflow-hidden border border-(--color-bg-secondary) bg-(--color-bg-light) p-8 md:p-12">
          <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-(--color-accent)/10 blur-3xl" />
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-(--color-accent)">Business Growth Solutions</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            Scale your business with a system built for measurable growth.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-(--color-soft-gray)">
            This page now reflects the latest package information, execution model, and delivery scope. Start with the right tier, then scale without rebuilding your marketing foundation.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact">Book a Strategy Call</Button>
            <Button href="/services" variant="secondary">
              View Full Services
            </Button>
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          <Card className="h-full">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center border border-(--color-bg-secondary) bg-white/70 text-(--color-accent)">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">For Businesses</p>
                <h2 className="mt-1 text-3xl leading-tight">Scale Your Business. Dominate Your Market.</h2>
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

          <Card className="h-full">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center border border-(--color-bg-secondary) bg-white/70 text-(--color-accent)">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">For Individuals</p>
                <h2 className="mt-1 text-3xl leading-tight">Build Your Brand. Own Your Audience.</h2>
              </div>
            </div>

            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {INDIVIDUAL_JOURNEY.map((step, index) => (
                <li key={step} className="border border-(--color-bg-secondary) bg-white/60 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">Step {index + 1}</p>
                  <p className="mt-2 text-xl leading-tight">{step}</p>
                </li>
              ))}
            </ol>
          </Card>
        </section>

        <section className="mt-20">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-(--color-accent)">Updated Monthly Partnerships</p>
          <h2 className="mt-3 max-w-4xl text-4xl leading-tight md:text-5xl">Choose the growth tier that matches your current stage.</h2>
          <p className="mt-4 max-w-3xl text-(--color-soft-gray)">
            Package information below is synced with our latest service structure. You can start with one tier and upgrade anytime without losing continuity.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-4">
            {monthlyPackages.map((pkg, index) => {
              const Icon = packageIcons[index % packageIcons.length];

              return (
                <Card
                  key={pkg.id}
                  className={[
                    'relative flex h-full flex-col',
                    pkg.mostPopular ? 'border-(--color-accent) shadow-md shadow-(--color-accent)/20' : '',
                  ].join(' ')}
                >
                  {pkg.mostPopular ? (
                    <span className="absolute -top-3 left-6 bg-(--color-accent) px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white">
                      Most Popular
                    </span>
                  ) : null}

                  <div className="flex h-11 w-11 items-center justify-center border border-(--color-bg-secondary) bg-white/70 text-(--color-accent)">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-4xl uppercase leading-none">{pkg.name}</h3>
                  <p className="mt-4 border-t border-(--color-bg-secondary) pt-4 text-2xl font-semibold">{pkg.price}</p>
                  <p className="mt-3 text-sm text-(--color-soft-gray)">{pkg.tagline}</p>

                  <ul className="mt-5 space-y-3">
                    {pkg.highlights.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <Button href={`/contact?plan=${pkg.id}#quote-form`} className="w-full justify-center">
                      Choose {pkg.name}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="border border-(--color-bg-secondary) bg-(--color-bg-light) p-6">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">Ad Spend Note</p>
              <p className="mt-2 text-sm text-(--color-text)">
                Ad spend is separate. Clients pay ad platforms directly, and Walktopus charges <span className="font-semibold text-(--color-accent)">15-20%</span> as a management fee.
              </p>
            </div>
            <div className="border border-(--color-bg-secondary) bg-(--color-bg-light) p-6">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">Regional Pricing</p>
              <p className="mt-2 text-sm text-(--color-text)">
                India pricing is shown here in INR. For international visitors, USD pricing is auto-selected on the Services page based on client location.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 border border-(--color-bg-secondary) bg-[#2B2B2B] p-8 text-white md:p-10">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center border border-white/20 bg-white/5 text-[#FFB39F]">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#FFB39F]">Execution Model</p>
              <h2 className="mt-2 text-4xl leading-tight">Strategy, execution, reporting, and optimization in one rhythm.</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BUSINESS_BENEFITS.map((benefit) => (
              <article key={benefit} className="border border-white/20 bg-white/5 p-4">
                <p className="text-sm text-white/90">{benefit}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" className="group">
              Book a Strategy Call{' '}
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
            <Button href="/services" variant="secondary" className="border-white text-white hover:bg-white hover:text-[#111111]">
              View Service Pillars
            </Button>
            <Button href="/for-individuals" variant="ghost" className="text-[#FFB39F] hover:text-white">
              Individual Solutions
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
