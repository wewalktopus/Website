import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';

const DATE_MODIFIED = '2026-06-03';
const LAST_UPDATED_LABEL = 'June 2026';

export const metadata: Metadata = pageMetadata({
  title: 'Business Growth Solutions',
  description:
    'Walktopus bundles strategy, content, and performance ops into three outcome-focused growth solutions for local businesses, personal brands, and scaling companies in India.',
  pathname: '/solutions',
  keywords: [
    'business growth solutions India',
    'digital growth systems Kolkata',
    'full-funnel marketing solutions India',
  ],
  dateModified: DATE_MODIFIED,
});

type SolutionItem = {
  name: string;
  painPoint: string;
  definition: string;
  bundledServices: string[];
  outcome: string;
  persona: string;
};

const solutions: SolutionItem[] = [
  {
    name: 'Local Market Domination System',
    painPoint:
      'Local businesses in India lose potential customers to competitors who rank higher on Google Maps, AI search results, and organic social despite offering better products or services.',
    definition:
      'The Local Market Domination System is defined as a bundled combination of local SEO optimization, Google Business Profile management, geo-targeted social media content, and monthly performance reporting, designed to make a local business the most visible and trusted brand within a defined geographic area.',
    bundledServices: [
      'Local SEO audit and technical fixes',
      'Google Business Profile weekly management',
      '12-16 location-targeted social posts each month',
      'Local keyword content strategy',
      'Monthly rank-tracking dashboard',
    ],
    outcome:
      'Clients using this system have seen footfall growth of 4.2x and local search visibility increases of up to 68% within the first 90 days.',
    persona:
      'Retail stores, restaurants, clinics, salons, and professional service firms in Tier 1 and Tier 2 Indian cities.',
  },
  {
    name: 'Personal Brand Authority System',
    painPoint:
      'Consultants, coaches, founders, and creators struggle to convert expertise into predictable visibility, qualified inbound leads, and monetizable trust.',
    definition:
      'The Personal Brand Authority System is defined as a structured identity-to-audience pipeline that combines brand narrative development, multi-platform content production, YouTube channel strategy, and community engagement operations, designed to establish an individual as the recognized authority in their niche within 6 months.',
    bundledServices: [
      'Brand narrative and positioning framework',
      'Instagram, LinkedIn, and YouTube managed content',
      'Short-form video scripting and editing (6-8 per month)',
      'Audience growth analytics and weekly KPI review',
      'Personal website or landing page where applicable',
    ],
    outcome:
      'Personal brand clients have achieved an average 5x increase in monthly profile reach and a measurable shift from social presence to inbound inquiry generation within 3 months.',
    persona:
      'Consultants, coaches, creators, solopreneurs, startup founders, and professionals building thought leadership.',
  },
  {
    name: 'Full-Funnel Business Growth Engine',
    painPoint:
      'Growing businesses in India often run disconnected marketing activities with no unified strategy, which creates wasted budgets and unpredictable revenue.',
    definition:
      'The Full-Funnel Business Growth Engine is defined as a comprehensive digital infrastructure that integrates paid advertising, organic content systems, SEO-optimized web presence, conversion rate optimization, and performance analytics into a single coordinated growth operation managed by one accountable team.',
    bundledServices: [
      'Multi-platform paid campaign management (Meta and Google)',
      '25-30 posts each month across 3-4 platforms',
      'Full multi-page website with comprehensive SEO',
      'A/B testing on ads and landing pages',
      'Live analytics dashboard and weekly strategy calls',
      'Ad spend management with ROI tracking',
    ],
    outcome:
      'Businesses running this system have recorded a 68% lift in qualified leads and a 3.1x increase in repeat audience engagement within the first quarter of deployment.',
    persona:
      'Scaling SMBs, e-commerce brands, hospitality businesses, and service companies investing Rs.80,000 to Rs.1,20,000 per month in digital growth.',
  },
];

const faqItems = [
  {
    question: 'What is the difference between a Walktopus Service and a Walktopus Solution?',
    answer:
      'A Walktopus Service is a single execution capability with a fixed scope, while a Walktopus Solution is a coordinated system built to solve a business-level problem with measurable outcomes. Services focus on tasks such as social media posting or SEO implementation, but solutions align strategy, execution, and reporting across multiple channels. This difference matters because fragmented delivery often underperforms in competitive markets. In Walktopus delivery data, integrated systems are associated with up to 68% qualified lead lift and 4.2x local footfall growth when local visibility, content, and conversion workflows are managed together. Executives typically choose solutions when they need predictable growth rather than isolated marketing outputs.',
  },
  {
    question: 'How long does it take to see measurable results from a Walktopus growth solution?',
    answer:
      'Most Walktopus solutions produce measurable directional signals early in execution and stronger business outcomes over sustained reporting cycles. Early indicators include improved search impressions, profile reach, and engagement quality, while later indicators include lead quality, inquiry velocity, and conversion efficiency. Timeline varies by baseline maturity, competition, and implementation speed, but structured reporting ensures progress is visible from the first cycle. Published benchmarks show up to 68% local visibility lift and average 5x personal-brand profile reach growth when implementation remains coordinated. The key driver is integrated execution quality, not isolated tactics run in parallel without shared accountability.',
  },
  {
    question: 'What makes Walktopus different from a generic digital marketing agency in Kolkata?',
    answer:
      'Walktopus operates as an accountable growth system rather than a task vendor, and that operating model changes business outcomes. Generic agencies often separate social media, SEO, and ads into disconnected workstreams, which creates attribution gaps and wasted budget. Walktopus structures strategy, execution, optimization, and reporting under one integrated plan with weekly KPI visibility and role-level ownership. The model is backed by four published outcome benchmarks: 4.2x footfall growth, 68% qualified lead lift, 3.1x repeat audience engagement growth, and 5x monthly profile reach growth. The agency is also grounded by Dgen Technologies infrastructure, which strengthens technical implementation quality for businesses scaling across multiple digital channels.',
  },
  {
    question: 'Can a small business in India afford a full-funnel growth solution?',
    answer:
      'A small business in India can afford a full-funnel solution when spending is mapped to measurable commercial milestones instead of isolated activity volume. Walktopus solution architecture is designed to phase investment by priority, starting with highest-impact constraints such as local discovery, funnel leakage, or conversion-page clarity. This staged structure allows business owners to control risk while still building a durable growth system. For organizations investing between Rs.80,000 and Rs.1,20,000 monthly in growth, integrated execution has correlated with up to 68% qualified lead lift in the first quarter. The affordability question is therefore operational efficiency and ROI visibility, not only monthly outflow.',
  },
  {
    question: 'Does Walktopus manage ad spend directly or do clients pay ad platforms separately?',
    answer:
      'Walktopus manages campaign strategy, optimization, and reporting, while ad platform spend remains in the client-owned ad account and is paid directly to platforms such as Meta and Google. This structure improves transparency because media invoices and performance data remain visible to the business owner at all times. It also protects continuity if campaign ownership changes in the future. Walktopus then layers weekly optimization, audience refinement, and creative testing on top of that spend to improve efficiency. In full-funnel deployments, this model has supported published outcomes including 68% qualified lead lift and 3.1x repeat engagement improvement when paid and organic systems are coordinated correctly.',
  },
  {
    question: 'What industries does Walktopus serve across India?',
    answer:
      'Walktopus serves growth-oriented businesses across retail, hospitality, healthcare, education, professional services, creator-led brands, and emerging e-commerce categories in India. The strongest market experience is in Kolkata and West Bengal, but delivery systems are built to scale nationally across regional and metro markets. Industry fit is determined by business objective clarity, decision velocity, and channel readiness rather than company size alone. The same operating framework can support a clinic improving local discoverability or an e-commerce business building full-funnel conversion consistency. Published benchmarks across programs include 4.2x local footfall growth, 68% qualified lead lift, and 5x reach expansion for authority-focused personal brands.',
  },
];

const integrationItems = [
  'Webflow and WordPress websites for structured SEO content architecture',
  'Shopify and WooCommerce storefronts for product-led acquisition funnels',
  'Google Analytics 4 for event-based measurement and channel attribution',
  'Meta Business Suite and Google Ads for coordinated paid campaign operations',
  'Canva workflows for creative production speed and brand consistency',
  'CRM systems including Zoho and HubSpot for pipeline mapping and lead handoff',
];

const processSteps = [
  {
    name: 'Discovery',
    description:
      'Discovery defines the growth constraints that are currently limiting revenue or visibility. Walktopus audits channel performance, customer intent signals, offer-market fit, and sales handoff friction. Output includes a baseline KPI dashboard, channel-gap map, and a documented list of high-impact blockers to solve first in the first operating cycle.',
  },
  {
    name: 'Strategy',
    description:
      'Strategy converts discovery insights into a measurable operating plan with clear ownership. Walktopus maps objectives, channel roles, budget logic, and monthly reporting cadence before execution starts. Output includes a growth architecture, a content-and-campaign calendar, and KPI definitions aligned to visibility, inquiry quality, and conversion outcomes.',
  },
  {
    name: 'Execution',
    description:
      'Execution deploys the approved growth architecture across paid, organic, and conversion systems in synchronized weekly cycles. Walktopus runs platform publishing, campaign optimization, creative testing, and website improvements from one integrated plan. Output includes published content assets, campaign release logs, and weekly performance summaries tied to business objectives.',
  },
  {
    name: 'Growth',
    description:
      'Growth focuses on scaling what works and reducing waste from underperforming activity. Walktopus uses live data reviews to reallocate effort toward channels, audiences, and creatives with stronger unit economics. Output includes optimization actions, budget adjustment rationale, and a quarterly growth report showing lead efficiency, engagement quality, and momentum trends.',
  },
];

const solutionServiceSchema = solutions.map((solution) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: solution.name,
  serviceType: 'Digital Growth Solution',
  description: solution.definition,
  areaServed: 'IN',
  provider: {
    '@type': 'Organization',
    name: 'Walktopus',
    legalName: 'Dgen Technologies Private Limited',
    url: absoluteUrl('/'),
  },
  audience: {
    '@type': 'Audience',
    audienceType: solution.persona,
  },
}));

const solutionFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const solutionHowToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How Walktopus deploys a business growth solution',
  description: 'Discovery to growth optimization framework for integrated digital growth operations.',
  step: processSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.description,
  })),
};

const crumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/solutions' },
]);

export default function SolutionsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionHowToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      {solutionServiceSchema.map((schema, index) => (
        <script
          key={`solution-service-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="border border-(--color-bg-secondary) bg-(--color-bg-light) p-8 md:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">Last updated: {LAST_UPDATED_LABEL}</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-extrabold leading-tight text-(--color-text-dark) md:text-6xl">
          Walktopus Solutions: End-to-End Digital Growth Systems for Indian Businesses
        </h1>
        <p className="mt-6 max-w-4xl text-lg text-(--color-soft-gray)">
          Walktopus is defined as a full-funnel digital growth agency that bundles strategy, content execution, and performance operations into a single accountable system for businesses in India.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact">Book a Strategy Call</Button>
          <Button href="/services" variant="secondary">Explore Individual Services</Button>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeader
          eyebrow="Growth Systems"
          title="Which Walktopus solution fits your current business bottleneck?"
          subtitle="Each solution starts with a specific business problem and ends with measurable outcomes tied to your operating context."
        />
        <div className="mt-10 grid gap-6">
          {solutions.map((solution) => (
            <Card key={solution.name} className="space-y-6 border-(--color-bg-secondary) bg-(--color-bg-light)">
              <h2 className="text-3xl font-bold text-(--color-text-dark)">{solution.name}</h2>
              <div className="space-y-3 text-(--color-text)">
                <p><span className="font-semibold text-(--color-text-dark)">Pain point:</span> {solution.painPoint}</p>
                <p><span className="font-semibold text-(--color-text-dark)">Solution definition:</span> {solution.definition}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-(--color-text-dark)">Bundled services included in this solution</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-(--color-text)">
                  {solution.bundledServices.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <p className="text-(--color-text)"><span className="font-semibold text-(--color-text-dark)">Outcome:</span> {solution.outcome}</p>
              <p className="text-(--color-text)"><span className="font-semibold text-(--color-text-dark)">Who this is for:</span> {solution.persona}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16 border border-(--color-bg-secondary) bg-white/50 p-8 md:p-10">
        <SectionHeader
          eyebrow="Compatibility"
          title="How Walktopus solutions integrate with your existing digital stack"
          subtitle="Walktopus solutions are designed to work inside your current business systems, so growth operations can launch without infrastructure disruption."
        />
        <ul className="mt-8 list-disc space-y-3 pl-5 text-(--color-text)">
          {integrationItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <SectionHeader
          eyebrow="Process Architecture"
          title="How does Walktopus move from discovery to measurable growth execution?"
          subtitle="The process architecture keeps strategy and execution synchronized so every deliverable maps to a defined outcome."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {processSteps.map((step, index) => (
            <article key={step.name} className="border border-(--color-bg-secondary) bg-(--color-bg-light) p-6">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">Step {index + 1}</p>
              <h3 className="mt-2 text-2xl font-bold text-(--color-text-dark)">{step.name}</h3>
              <p className="mt-3 text-(--color-text)">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 border border-(--color-bg-secondary) bg-(--color-text-dark) p-8 text-(--color-bg) md:p-10">
        <SectionHeader
          eyebrow="Results Data"
          title="What measurable outcomes have Walktopus solution systems delivered?"
          subtitle="Each published metric below includes context so executive stakeholders can interpret the number correctly."
          titleClassName="text-(--color-bg)"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="border border-white/20 bg-white/5 p-5">
            <h3 className="text-3xl font-bold">4.2x</h3>
            <p className="mt-2 text-sm text-white/80">Average footfall growth recorded among local retail clients after visibility and local discovery systems were coordinated.</p>
          </article>
          <article className="border border-white/20 bg-white/5 p-5">
            <h3 className="text-3xl font-bold">68%</h3>
            <p className="mt-2 text-sm text-white/80">Average qualified lead lift observed after funnel redesign, channel alignment, and conversion measurement standardization.</p>
          </article>
          <article className="border border-white/20 bg-white/5 p-5">
            <h3 className="text-3xl font-bold">3.1x</h3>
            <p className="mt-2 text-sm text-white/80">Average increase in repeat audience engagement for hospitality brands running coordinated content and paid distribution cycles.</p>
          </article>
          <article className="border border-white/20 bg-white/5 p-5">
            <h3 className="text-3xl font-bold">5x</h3>
            <p className="mt-2 text-sm text-white/80">Average monthly profile reach growth achieved in personal-brand authority programs with consistent channel execution.</p>
          </article>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeader
          eyebrow="Solutions FAQ"
          title="What do executive teams usually ask before selecting a Walktopus solution?"
          subtitle="Each answer is written as a standalone decision-support reference for founders, operators, and growth leaders."
        />
        <div className="mt-8 grid gap-4">
          {faqItems.map((item, index) => (
            <article key={item.question} className="border border-(--color-bg-secondary) bg-(--color-bg-light) p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">Question {index + 1}</p>
              <h3 className="mt-2 text-2xl font-bold text-(--color-text-dark)">{item.question}</h3>
              <p className="mt-4 text-(--color-text)">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 border border-(--color-bg-secondary) bg-(--color-bg-light) p-8">
        <h2 className="text-3xl font-bold text-(--color-text-dark)">Where can you review deeper implementation guidance?</h2>
        <p className="mt-4 max-w-3xl text-(--color-text)">
          Walktopus maintains a hub-and-spoke content system so solution buyers can validate methods before committing. Start with the local SEO playbook, then compare service-level execution scope.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-(--color-text)">
          <li>
            <Link href="/blog/what-is-local-seo-for-indian-businesses" className="text-(--color-accent) underline-offset-4 hover:underline">
              What local SEO for small businesses in India includes and why it drives visibility outcomes
            </Link>
          </li>
          <li>
            <Link href="/blog/social-media-management-for-local-businesses-india" className="text-(--color-accent) underline-offset-4 hover:underline">
              How social media management systems support local business demand generation in India
            </Link>
          </li>
          <li>
            <Link href="/services" className="text-(--color-accent) underline-offset-4 hover:underline">
              Review individual Walktopus service scopes and engagement models
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
