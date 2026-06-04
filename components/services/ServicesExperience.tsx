import Link from 'next/link';
import { ArrowRight, CheckCircle2, Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import type { PricingAudience, PricingAudienceContent, PricingServiceCategory } from '@/types';

export type ServicesFaqItem = {
  question: string;
  answer: string;
};

export const servicesFaqItems: ServicesFaqItem[] = [
  {
    question: 'What is included in Walktopus BOOST plan for social media management?',
    answer:
      'The BOOST plan includes an expanded managed content and optimization scope designed for businesses that need higher consistency and measurable momentum compared with entry plans. Deliverables typically include multi-platform content operations, structured posting rhythm, creative refinement cycles, and weekly performance review checkpoints tied to reach quality and lead intent. The plan focuses on outcome movement before volume expansion, which is why reporting clarity is built into delivery. Walktopus applies the same accountability structure that supports published growth outcomes such as 5x profile reach in authority programs and stronger inquiry quality when content and funnel systems are aligned over month-level cycles.',
  },
  {
    question: 'Can I upgrade my Walktopus plan mid-month without losing current deliverables?',
    answer:
      'Walktopus supports plan upgrades without deleting or invalidating already delivered work, so continuity is preserved when growth requirements change. Mid-cycle upgrades are structured to add capability layers rather than replace completed outputs, which protects execution momentum and reporting consistency. The transition includes revised scope mapping, KPI alignment, and next-cycle prioritization so new deliverables begin with operational clarity. Businesses typically use this option when campaign traction improves faster than expected or when expansion requires additional channels. This no-reset upgrade logic aligns with the Walktopus service model where clients can scale execution intensity while keeping historical performance context and accountability intact.',
  },
  {
    question: 'Does Walktopus charge separately for ad spend on Meta and Google campaigns?',
    answer:
      'Walktopus management fees and platform media spend are handled separately so ad budget ownership remains transparent for the client at all times. Businesses pay media spend directly to platforms such as Meta and Google from client-controlled ad accounts, while Walktopus manages strategy, optimization, and reporting. This structure prevents budget opacity and makes ROI assessment easier because platform invoices and management outputs are independently visible. Operationally, campaign performance is reviewed weekly against agreed KPIs, then adjusted based on audience response and conversion data. In integrated programs, this model has supported improved lead quality and sustained funnel efficiency when paired with disciplined creative testing and conversion optimization workflows.',
  },
  {
    question: 'How does Walktopus handle content revisions?',
    answer:
      'Walktopus includes revision cycles in service delivery so content quality improves through structured iteration instead of ad hoc feedback loops. Revision handling starts with approved strategic direction, then moves through draft review, change requests, and final publishing readiness checks. This sequence is designed to reduce production waste while preserving brand consistency and speed. Weekly or bi-weekly reporting windows keep revision performance measurable and prevent bottlenecks from spreading across campaigns. Businesses receive practical governance over edits without losing deployment rhythm. Revision systems are especially important in multi-channel execution because consistent quality control supports stronger audience trust, repeat engagement behavior, and long-term conversion outcomes.',
  },
  {
    question: 'What is the minimum contract length for a monthly growth partnership?',
    answer:
      'Monthly growth partnerships are structured to produce measurable momentum over operational cycles rather than one-off activity bursts, so the recommended commitment usually covers at least one full quarterly optimization period. A quarter allows enough time for baseline measurement, channel calibration, conversion refinement, and reporting-based iteration. Shorter windows can launch execution but often underrepresent actual performance potential because algorithm and audience response effects accumulate over time. Walktopus therefore positions monthly plans as ongoing systems with clear checkpoints instead of isolated monthly tasks. This approach aligns with published outcome patterns such as 68% lead lift and 5x reach growth that emerge when execution consistency is maintained.',
  },
  {
    question: 'Does Walktopus work with businesses outside Kolkata?',
    answer:
      'Walktopus serves businesses across India and not only Kolkata, while maintaining strong strategic depth in regional West Bengal market behavior and local intent patterns. National engagements are supported through remote-first workflows, fixed reporting cadence, and unified KPI governance that keeps decision-makers aligned across locations. Geography-specific messaging, keyword targeting, and channel priority are adapted to each market rather than copied from one region to another. This allows the same delivery framework to support both city-level discovery goals and broader multi-state growth objectives. Outcome benchmarks used across engagements include 4.2x local footfall growth and 68% qualified lead lift when execution remains coordinated and accountable.',
  },
];

const engagementStandards = [
  'Dedicated account manager',
  'Weekly or bi-weekly reporting',
  'WhatsApp support',
  'Revision cycles',
  'Performance tracking setup',
] as const;

interface ServicesExperienceProps {
  content: PricingAudienceContent;
  audience: PricingAudience;
  countryCode?: string;
}

function renderCategory(category: PricingServiceCategory, index: number) {
  return (
    <ScrollReveal key={category.id} delay={0.08 * index}>
      <article className="overflow-hidden rounded-2xl border border-[var(--color-bg-secondary)] bg-white/90 shadow-sm backdrop-blur-sm">
        <div className="border-b border-[var(--color-bg-secondary)] bg-[linear-gradient(135deg,var(--color-bg-light),#fff)] px-6 py-6 md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-accent)]">Service Category</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--color-text-dark)] md:text-3xl">{category.label}</h3>
          <p className="mt-3 max-w-3xl text-[var(--color-text)]">{category.subtitle}</p>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-2 md:p-6">
          {category.services.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)]/70 p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <h4 className="text-xl font-bold text-[var(--color-text-dark)]">{service.title}</h4>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-accent)]">{service.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--color-text)]">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </article>
    </ScrollReveal>
  );
}

export function ServicesExperience({ content, audience, countryCode }: ServicesExperienceProps) {
  const currency = audience === 'india' ? 'INR' : 'USD';

  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(239,77,48,0.12),transparent_35%),radial-gradient(circle_at_20%_30%,rgba(58,55,55,0.08),transparent_35%),linear-gradient(180deg,#faf8f2_0%,#f5f3ec_35%,#f8f7f4_100%)]" />

      <div className="mx-auto w-full max-w-7xl space-y-20 px-6 py-20 lg:space-y-24 lg:py-28">
        <ScrollReveal>
          <section className="relative overflow-hidden rounded-3xl border border-[var(--color-bg-secondary)] bg-white/80 p-8 shadow-sm backdrop-blur-sm md:p-12 lg:p-14">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[var(--color-text)]/10 blur-3xl" />

            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] px-3 py-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">
                <Sparkles className="h-3.5 w-3.5" /> Services Hub
              </p>
              <h1 className="mt-5 max-w-5xl text-4xl font-extrabold leading-tight tracking-tight text-[var(--color-text-dark)] md:text-6xl">
                Premium Digital Marketing Services Built for Measurable Growth
              </h1>
              <p className="mt-6 max-w-4xl text-lg leading-8 text-[var(--color-text)]">
                Walktopus combines strategy, content, campaigns, and conversion systems into service frameworks that are easy to choose, easy to execute, and easy to track.
              </p>

              <div className="mt-8 grid gap-4 rounded-2xl border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)]/80 p-4 md:grid-cols-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--color-soft-gray)]">Pricing audience</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-text-dark)]">
                    {audience === 'india' ? 'India' : 'International'} ({currency})
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--color-soft-gray)]">Country signal</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-text-dark)]">{countryCode || 'Not available'}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--color-soft-gray)]">Pricing source</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-text-dark)]">Live pricing configuration service</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/contact">Book a Free Strategy Call</Button>
                <Button href="/solutions" variant="secondary">
                  Compare Outcome-Focused Solutions
                </Button>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <section className="rounded-3xl border border-[var(--color-bg-secondary)] bg-white/70 p-7 shadow-sm backdrop-blur-sm md:p-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-text-dark)] md:text-4xl">
              What is included in every Walktopus engagement?
            </h2>
            <p className="mt-4 max-w-4xl text-[var(--color-text)]">
              Every engagement starts with operational standards that protect clarity, delivery rhythm, and performance accountability.
            </p>
            <ul className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {engagementStandards.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] px-4 py-4 text-sm text-[var(--color-text)]"
                >
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>

        <section>
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6">
              <div className="max-w-4xl">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-accent)]">Monthly Partnerships</p>
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[var(--color-text-dark)] md:text-5xl">
                  Choose your growth tier
                </h2>
                <p className="mt-4 text-[var(--color-text)]">
                  All pricing, tier names, taglines, and deliverable highlights below are mapped from your active pricing configuration.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {content.monthlyPlans.map((plan, index) => (
              <ScrollReveal key={plan.id} delay={0.07 * index}>
                <Card
                  className={[
                    'relative overflow-hidden rounded-2xl border p-6',
                    plan.mostPopular ? 'border-[var(--color-accent)] shadow-[0_12px_28px_rgba(239,77,48,0.14)]' : '',
                    plan.id === 'premium' ? 'border-[var(--color-text-dark)] bg-[var(--color-text-dark)] text-[var(--color-bg)]' : 'bg-white/90',
                  ].join(' ')}
                >
                  {plan.mostPopular ? (
                    <span className="absolute right-4 top-4 rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-white">
                      Most Popular
                    </span>
                  ) : null}

                  <p className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">
                    <Rocket className="h-3.5 w-3.5" /> {plan.name}
                  </p>
                  <p className="mt-3 text-2xl font-extrabold tracking-tight">{plan.price}</p>
                  <p className="mt-4 text-sm leading-7">{plan.tagline}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {plan.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-[var(--color-bg-secondary)] pt-4">
                    <Button href={`/contact?plan=${plan.id}#quote-form`} className="w-full justify-center">
                      Choose {plan.name}
                    </Button>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <ScrollReveal delay={0.08}>
              <div className="rounded-2xl border border-[var(--color-bg-secondary)] bg-white/80 p-5 text-sm text-[var(--color-text)] shadow-sm">
                <p className="font-semibold text-[var(--color-text-dark)]">Upgrade policy</p>
                <p className="mt-2">{content.notes.upgradeNote}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.14}>
              <div className="rounded-2xl border border-[var(--color-bg-secondary)] bg-white/80 p-5 text-sm text-[var(--color-text)] shadow-sm">
                <p className="font-semibold text-[var(--color-text-dark)]">Ad spend policy</p>
                <p className="mt-2">{content.notes.adSpendNote}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section>
          <ScrollReveal>
            <h2 className="text-4xl font-extrabold tracking-tight text-[var(--color-text-dark)] md:text-5xl">
              One-time services and project execution
            </h2>
            <p className="mt-4 max-w-4xl text-[var(--color-text)]">
              Service cards below are generated from your pricing configuration categories and can be engaged independently or combined with monthly retainers.
            </p>
          </ScrollReveal>
          <div className="mt-10 grid gap-6">{content.serviceCategories.map((category, index) => renderCategory(category, index))}</div>
        </section>

        <section>
          <ScrollReveal>
            <h2 className="text-4xl font-extrabold tracking-tight text-[var(--color-text-dark)] md:text-5xl">
              Questions businesses ask before onboarding
            </h2>
            <p className="mt-4 max-w-4xl text-[var(--color-text)]">
              Quick answers to common pre-engagement concerns for faster decision making.
            </p>
          </ScrollReveal>
          <div className="mt-8 grid gap-4">
            {servicesFaqItems.map((item, index) => (
              <ScrollReveal key={item.question} delay={0.04 * (index % 4)}>
                <article className="rounded-2xl border border-[var(--color-bg-secondary)] bg-white/80 p-6 shadow-sm md:p-8">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">Question {index + 1}</p>
                  <h3 className="mt-2 text-2xl font-bold text-[var(--color-text-dark)]">{item.question}</h3>
                  <p className="mt-4 text-[var(--color-text)]">{item.answer}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <ScrollReveal>
          <section className="rounded-3xl border border-[var(--color-bg-secondary)] bg-[linear-gradient(135deg,var(--color-bg-light),#fff)] p-8 md:p-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-text-dark)] md:text-4xl">
              Deep-dive resources before you choose
            </h2>
            <p className="mt-4 max-w-3xl text-[var(--color-text)]">
              Explore detailed guides on SEO, social growth, and personal branding frameworks.
            </p>
            <ul className="mt-6 grid gap-3 text-[var(--color-text)]">
              <li>
                <Link
                  href="/blog/what-is-local-seo-for-indian-businesses"
                  className="group inline-flex items-center gap-2 text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
                >
                  What local SEO for small businesses in India includes and how it improves discoverability
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/social-media-management-for-local-businesses-india"
                  className="group inline-flex items-center gap-2 text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
                >
                  Social media management frameworks that support local business demand generation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/personal-branding-guide-for-indian-professionals"
                  className="group inline-flex items-center gap-2 text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
                >
                  Personal branding system design for Indian founders and professionals
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            </ul>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
