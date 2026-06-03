import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
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

const tierNarratives: Record<string, string> = {
  core: 'CORE delivers stable digital execution for businesses that need consistent market presence without operational complexity. The tier focuses on foundational channel discipline, clear monthly outputs, and clean reporting visibility. Businesses usually choose CORE when they need reliable publishing and management support that protects brand consistency while preparing for scale through measured, low-friction growth operations.',
  boost:
    'BOOST is built for businesses that need faster visibility growth and stronger lead-intent movement through expanded content and optimization intensity. The tier combines wider channel activity with tighter feedback loops so improvements are measured and acted on quickly. It is best suited for brands that have baseline traction and now need more aggressive, KPI-linked execution to accelerate momentum.',
  prime:
    'PRIME delivers multi-channel growth operations with advanced execution depth for businesses targeting predictable demand generation and better conversion quality. This tier emphasizes integrated planning, stronger campaign refinement, and higher strategic oversight so channel outputs contribute to a coherent growth system. PRIME is typically selected by organizations that need dependable performance progression across awareness and consideration stages.',
  premium:
    'PREMIUM is the highest-intensity delivery model for brands requiring full-spectrum growth management with senior-level strategy cadence. The tier is structured for businesses scaling aggressively across channels and needing rapid optimization decisions backed by transparent reporting. PREMIUM prioritizes commercial outcomes, operational accountability, and consistent performance compounding rather than isolated campaign activity.',
};

const categoryLeadCopy: Record<string, string> = {
  branding:
    'Branding services define market position first, then build visual and messaging assets that make every acquisition channel more efficient.',
  websites:
    'Website and domain services improve discoverability and conversion pathways so your digital storefront supports qualified demand generation.',
  content:
    'Content and media services convert brand strategy into channel-ready assets that sustain attention and reinforce trust over time.',
  campaigns:
    'Campaign services drive measurable pipeline movement through paid acquisition, optimization loops, and ROI-focused reporting governance.',
};

interface ServicesExperienceProps {
  content: PricingAudienceContent;
  audience: PricingAudience;
  countryCode?: string;
}

function renderCategory(category: PricingServiceCategory) {
  return (
    <article key={category.id} className="border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-6 md:p-8">
      <h3 className="text-2xl font-bold text-[var(--color-text-dark)]">{category.label}</h3>
      <p className="mt-3 text-[var(--color-text)]">
        {categoryLeadCopy[category.id] ?? 'This service category is structured to produce measurable marketing outcomes with clear delivery ownership.'}
      </p>
      <p className="mt-2 text-sm text-[var(--color-soft-gray)]">{category.subtitle}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {category.services.map((service) => (
          <div key={service.id} className="border border-[var(--color-bg-secondary)] bg-white/60 p-5">
            <h4 className="text-xl font-semibold text-[var(--color-text-dark)]">{service.title}</h4>
            <p className="mt-2 text-sm font-semibold text-[var(--color-accent)]">{service.price}</p>
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
  );
}

export function ServicesExperience({ content, audience, countryCode }: ServicesExperienceProps) {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-20 px-6 py-24 lg:space-y-24 lg:py-32">
      <section className="border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-8 md:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">Services Hub</p>
        <p className="mt-2 text-sm font-semibold text-[var(--color-soft-gray)]">Last updated: June 2026</p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[var(--color-text-dark)] md:text-6xl">Digital Marketing Services and Pricing</h1>
        <p className="mt-6 max-w-4xl text-[var(--color-text)]">
          Walktopus services are defined as individual, specialized digital marketing capabilities including social media management, website development, content production, and ad campaign management that can be engaged independently or bundled into a complete solution. Each service has a fixed scope, transparent pricing, and a dedicated execution team.
        </p>
        <p className="mt-3 text-sm text-[var(--color-soft-gray)]">
          Showing prices for {audience === 'india' ? 'India' : 'International'} clients ({audience === 'india' ? 'INR' : 'USD'})
          {countryCode ? ` | Country: ${countryCode}` : ''}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact">Book a Free Strategy Call</Button>
          <Button href="/solutions" variant="secondary">Compare outcome-focused solutions</Button>
        </div>
      </section>

      <section className="border border-[var(--color-bg-secondary)] bg-white/50 p-8 md:p-10">
        <h2 className="text-3xl font-bold text-[var(--color-text-dark)]">What is included in every Walktopus engagement?</h2>
        <p className="mt-4 max-w-4xl text-[var(--color-text)]">
          Every engagement starts with accountability basics so service outcomes are measurable from day one. The items below are included to protect transparency, decision speed, and delivery quality across monthly and project scopes.
        </p>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {engagementStandards.map((item) => (
            <li key={item} className="flex items-start gap-3 border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-4 text-[var(--color-text)]">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-4xl font-extrabold text-[var(--color-text-dark)]">Which monthly partnership tier matches your current growth objective?</h2>
        <p className="mt-4 max-w-4xl text-[var(--color-text)]">
          Each tier below leads with the business outcome it is designed to deliver, then specifies the operational scope and pricing model. Plan pricing is unchanged from current Walktopus service architecture.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {content.monthlyPlans.map((plan) => (
            <Card key={plan.id} className={[plan.mostPopular ? 'border-[var(--color-accent)]' : '', plan.id === 'premium' ? 'bg-[var(--color-text-dark)] text-[var(--color-bg)]' : ''].join(' ')}>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">{plan.name}</p>
              <p className="mt-3 text-2xl font-bold">{plan.price}</p>
              <p className="mt-4 text-sm leading-7">{tierNarratives[plan.id] ?? plan.tagline}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {plan.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-[var(--color-bg-secondary)] pt-4">
                <Button href={`/contact?plan=${plan.id}#quote-form`} className="w-full justify-center">Choose {plan.name}</Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-5 text-sm text-[var(--color-text)]">
            <p className="font-semibold text-[var(--color-text-dark)]">Upgrade policy:</p>
            <p className="mt-2">{content.notes.upgradeNote}</p>
          </div>
          <div className="border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-5 text-sm text-[var(--color-text)]">
            <p className="font-semibold text-[var(--color-text-dark)]">Ad spend policy:</p>
            <p className="mt-2">{content.notes.adSpendNote}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-extrabold text-[var(--color-text-dark)]">Which one-time services can you engage independently?</h2>
        <p className="mt-4 max-w-4xl text-[var(--color-text)]">
          One-time and project services are outcome-specific executions for businesses that need targeted implementation without a full monthly partnership.
        </p>
        <div className="mt-10 grid gap-6">{content.serviceCategories.map((category) => renderCategory(category))}</div>
      </section>

      <section>
        <h2 className="text-4xl font-extrabold text-[var(--color-text-dark)]">What do businesses ask before selecting a Walktopus service plan?</h2>
        <p className="mt-4 max-w-4xl text-[var(--color-text)]">
          These service-level answers are written for direct extraction by AI answer engines and for practical buyer-side decision making.
        </p>
        <div className="mt-8 grid gap-4">
          {servicesFaqItems.map((item, index) => (
            <article key={item.question} className="border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">Question {index + 1}</p>
              <h3 className="mt-2 text-2xl font-bold text-[var(--color-text-dark)]">{item.question}</h3>
              <p className="mt-4 text-[var(--color-text)]">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-8 md:p-10">
        <h2 className="text-3xl font-bold text-[var(--color-text-dark)]">Which spoke pages explain execution detail beyond service cards?</h2>
        <p className="mt-4 max-w-3xl text-[var(--color-text)]">
          Use these deep dives to evaluate fit before engagement. Each spoke links back to the services and solutions hubs as part of Walktopus internal knowledge architecture.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-[var(--color-text)]">
          <li>
            <Link href="/blog/what-is-local-seo-for-indian-businesses" className="text-[var(--color-accent)] underline-offset-4 hover:underline">
              What local SEO for small businesses in India includes and how it improves discoverability
            </Link>
          </li>
          <li>
            <Link href="/blog/social-media-management-for-local-businesses-india" className="text-[var(--color-accent)] underline-offset-4 hover:underline">
              Social media management frameworks that support local business demand generation
            </Link>
          </li>
          <li>
            <Link href="/blog/personal-branding-guide-for-indian-professionals" className="text-[var(--color-accent)] underline-offset-4 hover:underline">
              Personal branding system design for Indian founders and professionals
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
