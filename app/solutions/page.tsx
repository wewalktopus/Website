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
export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';

const dateModified = '2026-06-03';
const lastUpdatedLabel = 'June 2026';

type Solution = {
  name: string;
  painPoint: string;
  definition: string;
  bundledServices: string[];
  outcome: string;
  whoFor: string;
};

const solutions: Solution[] = [
  {
    name: 'Local Market Domination System',
    painPoint:
      'Local businesses in India lose potential customers to competitors who rank higher on Google Maps, AI search results, and organic social despite better products or services.',
    definition:
      'The Local Market Domination System is defined as a bundled combination of local SEO optimization, Google Business Profile management, geo-targeted social media content, and monthly performance reporting, designed to make a local business the most visible and trusted brand within a defined geographic area.',
    bundledServices: [
      'Local SEO audit with technical remediation and implementation support',
      'Google Business Profile weekly optimization and post management',
      '12-16 location-targeted social media posts per month',
      'Local keyword content strategy aligned to high-intent searches',
      'Monthly rank-tracking and visibility dashboard',
    ],
    outcome:
      'Clients using this system have seen average footfall growth of 4.2x and local search visibility improvements of up to 68% within the first 90 days.',
    whoFor:
      'Retail stores, restaurants, clinics, salons, and professional service firms in Tier 1 and Tier 2 Indian cities.',
  },
  {
    name: 'Personal Brand Authority System',
    painPoint:
      'Consultants, coaches, founders, and creators often struggle to convert expertise into consistent visibility, qualified leads, and monetizable audience trust.',
    definition:
      'The Personal Brand Authority System is defined as a structured identity-to-audience pipeline that combines brand narrative development, multi-platform content production, YouTube channel strategy, and community engagement operations, designed to establish an individual as the recognized authority in their niche within 6 months.',
    bundledServices: [
      'Brand narrative and positioning framework built around expertise',
      'Instagram, LinkedIn, and YouTube managed content systems',
      'Short-form video scripting and editing for 6-8 videos each month',
      'Audience growth analytics with weekly KPI reviews',
      'Personal website or landing page creation where applicable',
    ],
    outcome:
      'Personal brand clients have reported an average 5x increase in monthly profile reach and a measurable shift from social visibility to inbound inquiry generation within 3 months.',
    whoFor:
      'Consultants, coaches, creators, solopreneurs, startup founders, and professionals building thought leadership.',
  },
  {
    name: 'Full-Funnel Business Growth Engine',
    painPoint:
      'Growing businesses in India frequently run disconnected marketing efforts that waste budget and create unpredictable lead flow and revenue outcomes.',
    definition:
      'The Full-Funnel Business Growth Engine is defined as a comprehensive digital infrastructure that integrates paid advertising, organic content systems, SEO-optimized web presence, conversion rate optimization, and performance analytics into a single, coordinated growth operation managed by one accountable team.',
    bundledServices: [
      'Multi-platform paid campaign management across Meta and Google',
      '25-30 posts each month across 3-4 business-critical platforms',
      'Full multi-page website with comprehensive on-page SEO foundations',
      'A/B testing for ads, creatives, and landing page conversion paths',
      'Live analytics dashboard with weekly strategy calls and ROI tracking',
    ],
    outcome:
      'Businesses running this system have recorded an average 68% lift in qualified leads and a 3.1x increase in repeat audience engagement in the first quarter.',
    whoFor:
      'Scaling SMBs, e-commerce brands, hospitality businesses, and service companies investing INR 80,000-INR 1,20,000 per month in digital growth.',
  },
];

const process = [
  {
    title: 'Discovery',
    content:
      'Discovery establishes the full commercial and marketing baseline before execution begins. The team audits channel performance, current acquisition cost, conversion flow, and competitor positioning, then maps bottlenecks against business priorities. Outputs include a market context brief, a data baseline sheet, and a quantified opportunity model that sets clear targets for the next quarter.',
  },
  {
    title: 'Strategy',
    content:
      'Strategy converts audit insights into one coordinated operating plan tied to business outcomes. Walktopus defines audience segments, message architecture, channel priorities, and execution cadence for organic and paid systems. Outputs include a 90-day growth roadmap, KPI tree, content calendar, campaign architecture, and a governance rhythm that aligns decision-makers with the delivery team.',
  },
  {
    title: 'Execution',
    content:
      'Execution activates the agreed plan through managed production, publishing, campaign operations, and iterative optimization. The team deploys platform-native content, ad experiments, landing improvements, and conversion tracking while maintaining weekly reporting discipline. Outputs include published assets, active campaign sets, creative test logs, and clear action notes that keep implementation accountable and transparent.',
  },
  {
    title: 'Growth',
    content:
      'Growth scales what is already proving measurable impact and removes what is inefficient. Walktopus expands high-performing audience cohorts, doubles down on profitable creative angles, and refines conversion pathways using continuous data review. Outputs include scale recommendations, revised ROI projections, retention-focused engagement plans, and a next-cycle optimization framework for predictable long-term performance gains.',
  },
] as const;

const solutionFaqs = [
  {
    question: 'What is the difference between a Walktopus Service and a Walktopus Solution?',
    answer:
      'A Walktopus Service is an individual execution capability, while a Walktopus Solution is an outcome-engineered system that combines multiple services under one accountable strategy. Services are ideal when a business needs one specific function such as social media management or website optimization. Solutions are designed for complex growth goals that require channel integration, weekly governance, and coordinated reporting. In practical terms, a service can improve one performance variable, whereas a solution is structured to move multiple business metrics together, including footfall, lead quality, and repeat engagement. This distinction is why solution engagements are framed around quantified outcomes such as 4.2x footfall growth and 68% qualified lead lift, rather than isolated activity delivery.',
  },
  {
    question: 'How long does it take to see measurable results from a Walktopus growth solution?',
    answer:
      'Most businesses begin seeing measurable directional improvement within the first 30 to 45 days, and stronger outcome signals typically consolidate between 60 and 90 days. The timeline depends on baseline visibility, current conversion quality, and speed of implementation on web and ad systems. Local visibility and discovery metrics often move first, followed by lead quality and repeat engagement once campaign loops stabilize. Walktopus uses weekly KPI reviews and monthly performance reporting to track progress against defined targets, so clients can evaluate trajectory early rather than waiting for quarter-end surprises. Published performance benchmarks include up to 68% local visibility lift and 3.1x repeat audience engagement in first-quarter deployments when execution cadence is maintained.',
  },
  {
    question: 'What makes Walktopus different from a generic digital marketing agency in Kolkata?',
    answer:
      'Walktopus operates as a coordinated growth system partner instead of a task vendor, which means strategy, content, media, and analytics are managed as one accountable unit. Many agencies deliver channel activity in silos, but Walktopus aligns every output to business outcome metrics and decision cadence from day one. The operating model combines local market understanding with full-funnel execution discipline and weekly KPI accountability. Walktopus is also built as an initiative of Dgen Technologies Private Limited, giving campaigns stronger technical and process infrastructure than a typical lightweight agency model. This integrated structure has supported measurable results including 4.2x footfall growth for local retail programs and 5x profile reach growth for personal brand systems.',
  },
  {
    question: 'Can a small business in India afford a full-funnel growth solution?',
    answer:
      'A small business in India can adopt a full-funnel growth solution when the engagement is scoped around business constraints and stage-specific priorities rather than unnecessary channel complexity. Walktopus structures solution design around commercial feasibility, expected acquisition targets, and implementation readiness, so the stack is right-sized to available operating bandwidth. Businesses do not need enterprise infrastructure to run an integrated system; they need disciplined execution and measurable reporting. For many brands, the most efficient path is starting with a targeted local or authority-focused system, then scaling into broader full-funnel operations as performance validates investment. This staged approach is designed to improve predictability and reduce waste while still building toward outcomes such as 68% lead lift and stronger repeat engagement.',
  },
  {
    question: 'Does Walktopus manage ad spend directly or do clients pay ad platforms separately?',
    answer:
      'Clients pay advertising platform budgets directly, while Walktopus manages campaign strategy, deployment, optimization, and reporting as part of the solution engagement. This structure keeps spend ownership transparent and gives businesses full visibility into media allocations across channels such as Meta and Google. Operationally, Walktopus handles audience architecture, creative testing, bid optimization, and conversion analysis, then reports performance against agreed KPI targets on a weekly cadence. Separating platform spend from management operations protects financial clarity and enables cleaner ROI evaluation. The same governance model is used across solution systems, including full-funnel deployments that have produced up to 68% qualified lead lift and stronger engagement retention across quarter-level reporting periods.',
  },
  {
    question: 'What industries does Walktopus serve across India?',
    answer:
      'Walktopus supports growth programs for local retail, hospitality, healthcare-adjacent services, professional practices, e-commerce operators, and expertise-led personal brands across India. The strongest concentration of market experience is in Kolkata and West Bengal, where localized demand behavior and regional search intent are deeply integrated into campaign planning. Industry fit is evaluated by business model clarity, service or product-market relevance, and readiness to execute with weekly accountability. Because solutions are modular, the same architecture can be adapted for city-level footfall goals, authority-building mandates, or full-funnel lead generation systems. Reported cross-sector outcomes include 4.2x local footfall growth, 3.1x repeat audience engagement in hospitality contexts, and 5x monthly profile reach gains for personal brand engagements.',
  },
];

const crumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/solutions' },
]);

const solutionsFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: solutionFaqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const solutionsServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Walktopus Growth Solutions',
  itemListElement: solutions.map((solution, index) => ({
    '@type': 'Service',
    position: index + 1,
    name: solution.name,
    serviceType: 'Digital Growth Solution',
    provider: {
      '@type': 'Organization',
      name: 'Walktopus',
      parentOrganization: {
        '@type': 'Organization',
        name: 'Dgen Technologies Private Limited',
      },
    },
    areaServed: 'IN',
    description: solution.definition,
    audience: {
      '@type': 'BusinessAudience',
      audienceType: solution.whoFor,
    },
  })),
};

const solutionsHowToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How Walktopus deploys a business growth solution',
  description:
    'A four-stage implementation model used to deploy Walktopus business growth solutions from baseline diagnosis to scaling.',
  step: process.map((item) => ({
    '@type': 'HowToStep',
    name: item.title,
    text: item.content,
  })),
};

export const metadata: Metadata = pageMetadata({
  title: 'Business Growth Solutions for Indian Companies',
  description:
    'Walktopus bundles strategy, content, and performance operations into three outcome-focused growth solutions for local businesses, personal brands, and scaling companies in India.',
  pathname: '/solutions',
  keywords: [
    'business growth solutions India',
    'local market domination strategy',
    'full funnel growth system for SMBs',
    'personal brand authority system India',
  ],
  dateModified,
});

export default function SolutionsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-20 px-6 py-24 lg:space-y-24 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionsFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionsServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionsHowToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <section className="relative overflow-hidden border border-(--color-bg-secondary) bg-(--color-bg-light) p-8 md:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">Solutions Hub</p>
        <p className="mt-3 text-sm font-semibold text-(--color-soft-gray)">Last updated: {lastUpdatedLabel}</p>
        <h1 className="mt-4 max-w-5xl text-5xl font-extrabold leading-[0.95] text-(--color-text-dark) sm:text-6xl lg:text-7xl">
          Walktopus Solutions: End-to-End Digital Growth Systems for Indian Businesses
        </h1>
        <p className="mt-6 max-w-4xl text-lg text-(--color-soft-gray)">
          Walktopus is defined as a full-funnel digital growth agency that bundles strategy, content execution, and performance operations into a single accountable system for businesses in India.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact">Book a Strategy Call</Button>
          <Button href="/services" variant="secondary">Review specialized service capabilities</Button>
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Solution Architecture"
          title="Which Walktopus solution system matches your growth bottleneck?"
          subtitle="Each solution starts with a clear business problem, then maps service bundles to quantified outcomes and buyer-fit criteria."
        />
        <div className="mt-10 grid gap-8">
          {solutions.map((solution) => (
            <article key={solution.name} className="border border-(--color-bg-secondary) bg-(--color-bg-light) p-8 md:p-10">
              <h2 className="text-3xl font-extrabold text-(--color-text-dark)">{solution.name}</h2>
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-(--color-text-dark)">Pain point this solution resolves</h3>
                  <p className="text-(--color-soft-gray)">{solution.painPoint}</p>
                  <h3 className="text-xl font-bold text-(--color-text-dark)">How this solution is defined</h3>
                  <p className="text-(--color-soft-gray)">{solution.definition}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-(--color-text-dark)">What is bundled inside this solution</h3>
                  <ul className="space-y-3">
                    {solution.bundledServices.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-(--color-soft-gray)">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-(--color-accent)" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 grid gap-4 border-t border-(--color-bg-secondary) pt-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-bold text-(--color-text-dark)">Expected business outcome</h3>
                  <p className="mt-2 text-(--color-soft-gray)">{solution.outcome}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-(--color-text-dark)">Who this system is built for</h3>
                  <p className="mt-2 text-(--color-soft-gray)">{solution.whoFor}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border border-(--color-bg-secondary) bg-(--color-bg-light) p-8 md:p-10">
        <SectionHeader
          eyebrow="Integration"
          title="How Walktopus solutions integrate with your existing stack"
          subtitle="Walktopus solutions are designed for compatibility-first execution, so your current tools remain usable while growth operations become more coordinated."
        />
        <p className="mt-8 text-(--color-soft-gray)">
          Integration support covers Webflow, WordPress, Shopify, WooCommerce, Google Analytics 4, Meta Business Suite, Google Ads, Canva, and CRM systems including Zoho and HubSpot. Existing assets are audited, mapped to measurable KPIs, and connected to reporting workflows so performance can be tracked without rebuilding your stack from zero.
        </p>
      </section>

      <section>
        <SectionHeader
          eyebrow="Process"
          title="How does the Walktopus solution delivery architecture work in practice?"
          subtitle="The four-step operating cycle starts with direct baseline clarity and then scales only what proves measurable impact."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {process.map((step, index) => (
            <article key={step.title} className="border border-(--color-bg-secondary) bg-(--color-bg-light) p-6">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">Step 0{index + 1}</p>
              <h3 className="mt-3 text-2xl font-bold text-(--color-text-dark)">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-(--color-soft-gray)">{step.content}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border border-(--color-bg-secondary) bg-(--color-text-dark) p-8 text-(--color-bg) md:p-10">
        <SectionHeader
          eyebrow="Results"
          title="What measurable outcomes have Walktopus solution systems produced?"
          subtitle="Each published benchmark is paired with deployment context so stakeholders can evaluate relevance before engagement."
          titleClassName="text-(--color-bg)"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="border border-(--color-bg-secondary)/30 bg-white/5 p-5">
            <h3 className="text-3xl font-extrabold text-(--color-bg)">4.2x</h3>
            <p className="mt-2 text-sm text-(--color-bg-secondary)">Average footfall growth in local retail campaigns after location-specific visibility optimization.</p>
          </article>
          <article className="border border-(--color-bg-secondary)/30 bg-white/5 p-5">
            <h3 className="text-3xl font-extrabold text-(--color-bg)">68%</h3>
            <p className="mt-2 text-sm text-(--color-bg-secondary)">Average qualified lead lift when funnel architecture and conversion pathways are redesigned.</p>
          </article>
          <article className="border border-(--color-bg-secondary)/30 bg-white/5 p-5">
            <h3 className="text-3xl font-extrabold text-(--color-bg)">3.1x</h3>
            <p className="mt-2 text-sm text-(--color-bg-secondary)">Average repeat audience engagement increase for hospitality-focused growth programs.</p>
          </article>
          <article className="border border-(--color-bg-secondary)/30 bg-white/5 p-5">
            <h3 className="text-3xl font-extrabold text-(--color-bg)">5x</h3>
            <p className="mt-2 text-sm text-(--color-bg-secondary)">Average monthly profile reach growth achieved in authority-led personal brand systems.</p>
          </article>
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="AEO FAQ"
          title="What executive teams ask before selecting a Walktopus growth solution"
          subtitle="Each answer is written for standalone extraction so AI answer engines and human buyers can evaluate fit quickly."
        />
        <div className="mt-10 grid gap-4">
          {solutionFaqs.map((item, index) => (
            <article key={item.question} className="border border-(--color-bg-secondary) bg-(--color-bg-light) p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">Question {index + 1}</p>
              <h3 className="mt-3 text-2xl font-bold text-(--color-text-dark)">{item.question}</h3>
              <p className="mt-4 text-(--color-soft-gray)">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border border-(--color-bg-secondary) bg-(--color-bg-light) p-8 md:p-10">
        <SectionHeader
          eyebrow="Knowledge Spokes"
          title="Which deep-dive guides should you read before choosing a solution architecture?"
          subtitle="These spoke pages provide implementation details and connect directly back to this solutions hub."
        />
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <Link href="/blog/what-is-local-seo-for-indian-businesses" className="group border border-(--color-bg-secondary) bg-white/60 p-5 transition hover:border-(--color-accent)">
            <p className="text-lg font-bold text-(--color-text-dark)">What is local SEO for small businesses in India?</p>
            <p className="mt-2 text-sm text-(--color-soft-gray)">Definition-first guide to local discoverability, ranking logic, and execution priorities.</p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-(--color-accent)">Read the local SEO spoke <ArrowUpRight className="ml-2 h-4 w-4" /></span>
          </Link>
          <Link href="/blog/personal-branding-guide-for-indian-professionals" className="group border border-(--color-bg-secondary) bg-white/60 p-5 transition hover:border-(--color-accent)">
            <p className="text-lg font-bold text-(--color-text-dark)">How can Indian professionals build authority through personal branding?</p>
            <p className="mt-2 text-sm text-(--color-soft-gray)">Framework for strategy, content cadence, and measurable authority signals.</p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-(--color-accent)">Review the authority spoke <ArrowUpRight className="ml-2 h-4 w-4" /></span>
          </Link>
        </div>
      </section>
    </div>
  );
}

