export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

const DATE_MODIFIED = '2026-06-03';
const LAST_UPDATED_LABEL = 'June 2026';
const LAST_REVIEWED_LABEL = 'June 2026';

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: 'What does Walktopus do for local businesses in Kolkata and across India?',
    answer:
      'Walktopus provides integrated digital growth operations for local businesses and emerging brands across India, with strongest operational depth in Kolkata and West Bengal. The core model combines social media management, SEO strategy, website performance optimization, paid campaign operations, and reporting into one accountable delivery rhythm. This structure is designed to move business outcomes, not only platform activity. Published Walktopus benchmarks include 4.2x average footfall growth for local retail, 68% average qualified lead lift from funnel redesigns, and 3.1x repeat engagement growth for hospitality programs. Businesses engage Walktopus when they need coordinated visibility, better lead quality, and measurable conversion momentum instead of fragmented marketing execution.',
  },
  {
    question: 'Do you work only with businesses in Kolkata, West Bengal?',
    answer:
      'Walktopus serves clients across India and is not limited to Kolkata-only engagements, although the agency maintains strong regional expertise in West Bengal demand patterns and local search behavior. National execution is supported through digital-first workflows, weekly KPI reviews, and centralized reporting that keeps decision-makers aligned regardless of city. Regional context still matters, so market language, keyword intent, and campaign messaging are adapted by geography. The same structure supports both metro and tier-2 audiences. Outcome benchmarks across deployments include up to 68% local visibility lift and 5x personal-brand profile reach growth where execution cadence is maintained over quarter-level operating cycles.',
  },
  {
    question: 'Can Walktopus help with Google search visibility and local SEO?',
    answer:
      'Walktopus improves Google and local search visibility through technical SEO corrections, intent-aligned content architecture, Google Business Profile optimization, and location-specific page strategy. The process begins with a baseline audit that identifies crawl, indexing, relevance, and conversion bottlenecks before implementation starts. Local SEO execution then aligns ranking signals with business geography and customer search intent. This includes structured on-page improvements, local citations, and monthly rank-tracking reports. In Walktopus delivery benchmarks, local-market systems have produced up to 68% increases in local search visibility and 4.2x footfall growth when implementation remains consistent and measurable.',
  },
  {
    question: 'Do you offer social media management for small businesses and creators?',
    answer:
      'Walktopus offers managed social media operations for small businesses, founders, and creators across Instagram, Facebook, LinkedIn, YouTube, and related high-impact channels. Engagements are structured around strategic outcomes such as reach quality, lead inquiry intent, and repeat audience behavior, rather than posting volume alone. Delivery typically includes narrative positioning, content calendars, production workflows, distribution operations, and weekly analytics reviews. When social systems are tied to conversion pathways and SEO-aware messaging, performance quality improves significantly. Published Walktopus program outcomes include average 5x monthly profile reach growth for personal brand clients and 3.1x repeat engagement gains in hospitality contexts.',
  },
  {
    question: 'What industries does Walktopus support?',
    answer:
      'Walktopus supports local retail, hospitality, healthcare-adjacent services, education-focused brands, consultants, professional practices, and authority-led personal brands across India. Industry fit is evaluated through business objective clarity, audience readiness, and ability to execute with weekly accountability. This approach allows the same operating model to be adapted for different commercial goals, from local footfall expansion to full-funnel lead growth. The agency does not rely on one-size-fits-all templates; channel mix and conversion architecture are defined per market context. Reported outcomes from deployed systems include 4.2x footfall growth, 68% qualified lead lift, and 3.1x repeat audience engagement growth across selected campaigns.',
  },
  {
    question: 'Can you help with website SEO content and lead generation pages?',
    answer:
      'Walktopus builds and optimizes website content systems that are designed for both search interpretation and conversion performance. The work includes page hierarchy design, metadata improvements, intent-based copy strategy, internal linking, FAQ structuring, and conversion-path refinement for lead capture pages. A lead page is treated as a measurable acquisition asset, not a static brochure section. Execution quality is evaluated through click-through trend, engagement depth, and lead-quality movement over reporting cycles. In integrated growth deployments, funnel and page architecture redesign has contributed to an average 68% lift in qualified leads when paired with coordinated media and content systems.',
  },
  {
    question: 'How quickly do you respond to new business enquiries?',
    answer:
      'Walktopus responds to new enquiries with a structured next-step process that prioritizes qualification clarity, objective alignment, and execution fit. Fast response matters because delayed qualification often reduces deal quality and project momentum, so intake is designed to surface business stage, urgency, and current channel readiness early. This process helps avoid generic proposals and improves execution alignment before onboarding. Clients receive a practical decision path, not only a quotation request acknowledgment. Response discipline is part of the same operating culture that supports published performance outcomes such as 4.2x local footfall growth and 68% qualified lead lift in integrated delivery programs.',
  },
  {
    question: 'Why choose Walktopus over a generic digital marketing agency?',
    answer:
      'Walktopus differentiates through integrated accountability, where strategy, content, paid distribution, and performance reporting are managed inside one coordinated system. Generic agencies often split these functions across disconnected teams, which reduces attribution clarity and slows optimization cycles. Walktopus combines startup execution speed with Dgen Technologies-backed operational discipline, allowing campaigns to move quickly without losing process rigor. Every engagement is tied to outcome benchmarks and weekly KPI governance rather than activity-only reporting. Published performance references include 4.2x average local footfall growth, 68% qualified lead lift, 3.1x repeat engagement growth, and 5x personal-brand reach expansion across relevant deployment contexts.',
  },
  {
    question: 'What is the difference between digital marketing services and digital marketing solutions?',
    answer:
      'Digital marketing services are individual capabilities with fixed scopes, while digital marketing solutions are bundled systems designed to solve a larger commercial problem with measurable outcomes. A service might cover one function such as campaign management or SEO optimization. A solution aligns multiple services under one strategy so discovery, conversion, and retention move together. This distinction matters because channel-level success does not always translate into business growth unless workflows are integrated. Walktopus reports stronger outcome movement in solution-led deployments, including 68% qualified lead lift and 4.2x local footfall growth, compared to isolated tactical execution where attribution and coordination are weaker.',
  },
  {
    question: 'How does Walktopus measure the ROI of a social media management campaign?',
    answer:
      'Walktopus measures social media ROI by linking platform performance to business-level outcomes such as qualified inquiries, repeat engagement behavior, and assisted conversion signals. The process starts with baseline metric mapping, then applies weekly KPI tracking for reach quality, click intent, lead attribution, and audience retention trend. Social reporting is not limited to vanity metrics like likes or follower count because those often fail to reflect commercial impact. Campaign learnings are reviewed weekly, and content strategy is adjusted around outcomes. In authority and local-growth programs, this method has aligned with published 5x profile reach growth and 3.1x repeat engagement improvement when execution remains consistent.',
  },
  {
    question: 'What is GEO (Generative Engine Optimization) and does Walktopus use it?',
    answer:
      'GEO, or Generative Engine Optimization, is the process of structuring content so AI answer engines can extract, quote, and cite it accurately. Walktopus applies GEO principles by writing definition-first paragraphs, creating self-contained FAQ answers, using schema markup, and aligning section structure with machine-readable clarity. This methodology improves extractability for systems such as AI overviews and conversational assistants. Industry research from Princeton-led GEO studies has shown targeted content adjustments can increase citation visibility by up to 40% in generative environments. Walktopus combines GEO with technical SEO and conversion strategy to improve both discoverability and business response quality across modern search surfaces.',
  },
  {
    question: 'How long does it take for SEO improvements to show results for a local business in India?',
    answer:
      'SEO improvements for local businesses in India become meaningful when technical fixes, profile quality, and conversion-ready content are executed in a sustained cycle instead of one-time updates. The exact speed varies by baseline site quality, competitor intensity, and implementation consistency. Local SEO gains often appear first in visibility and profile interactions before they translate into stronger inquiry quality. Walktopus uses monthly rank-tracking and weekly execution reviews so progress remains visible and actionable throughout each operating cycle. In campaigns where SEO is integrated with conversion and content operations, local visibility gains have reached up to 68% and footfall outcomes have reached 4.2x in published delivery benchmarks.',
  },
  {
    question: 'Does Walktopus build websites that rank on Google and AI search systems?',
    answer:
      'Walktopus builds websites with search-ready architecture for both traditional engines and emerging AI answer systems by combining technical SEO, structured content, schema markup, and conversion-aware page design. Ranking potential depends on relevance, trust, crawl clarity, and ongoing optimization, so websites are treated as living growth assets rather than one-time design projects. Delivery includes metadata strategy, internal linking, service-page structure, and FAQ frameworks that improve extractability. AI systems prioritize clear, self-contained answers, which is why Walktopus applies inverted-pyramid content patterns across key pages. When paired with campaign and funnel optimization, this integrated approach supports measurable lead-quality growth and stronger demand clarity over recurring reporting cycles.',
  },
  {
    question: 'What is Walktopus pricing model for digital marketing in India?',
    answer:
      'Walktopus uses a transparent, scope-defined pricing model that separates service delivery fees from ad platform media spend and maps deliverables to clear execution responsibility. Businesses can engage fixed-scope services independently or choose integrated growth systems depending on objective complexity. This structure is designed to improve budget visibility and reduce ambiguity in performance evaluation. For paid campaigns, media budgets are typically client-owned and paid directly to platforms, while Walktopus manages strategy and optimization. Pricing decisions are tied to expected outcomes, implementation intensity, and reporting depth. Engagement planning focuses on ROI movement, with benchmark references such as 68% lead lift and 4.2x footfall growth for relevant deployment models.',
  },
  {
    question: 'Can Walktopus help a brand that has zero existing digital presence?',
    answer:
      'Walktopus can build a brand from zero digital presence by sequencing identity, platform setup, content systems, and demand generation into a staged growth rollout. The initial phase establishes foundational assets such as website structure, profile architecture, baseline messaging, and analytics instrumentation. Once the base is stable, channel operations begin with measurable KPI targets and iterative optimization cycles. This approach reduces waste because each stage unlocks the next with evidence rather than assumptions. New brands benefit from faster strategic clarity and execution discipline. Walktopus has used this model to drive outcomes including 5x profile reach growth and strong early lead-quality movement in first-quarter activation windows.',
  },
  {
    question: 'What separates a high-performing social media strategy from a low-performing one?',
    answer:
      'A high-performing social strategy aligns narrative, audience intent, distribution, and conversion pathways, while a low-performing strategy focuses on posting frequency without business context. Performance improves when content systems are anchored to positioning clarity, data review, and campaign iteration, not trend-chasing alone. High-performing programs use weekly KPI feedback loops to refine message-market fit and channel contribution. They also connect social outputs to landing and inquiry systems so attention can convert into measurable demand. In Walktopus benchmarks, strategy-led social execution has contributed to 5x monthly profile reach growth and 3.1x repeat engagement improvement, demonstrating that integrated operating discipline outperforms activity-only content calendars.',
  },
];

export const metadata: Metadata = pageMetadata({
  title: 'Digital Marketing FAQ',
  description:
    'Get clear answers about Walktopus digital marketing services, SEO, social media management, pricing, and local business growth for brands in Kolkata and across India.',
  pathname: '/faq',
  keywords: ['digital marketing faq india', 'walktopus pricing faq', 'seo and social media questions'],
  dateModified: DATE_MODIFIED,
});

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const crumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'FAQ', path: '/faq' },
]);

export default function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <SectionHeader
        eyebrow="FAQ"
        title="What should businesses and creators know before choosing Walktopus as a growth partner?"
        subtitle="Every answer below is self-contained, data-anchored, and structured for direct extraction by answer engines and human decision makers."
      />
      <p className="mt-6 text-sm font-semibold text-(--color-soft-gray)">Last updated: {LAST_UPDATED_LABEL}</p>
      <p className="mt-1 text-sm font-semibold text-(--color-soft-gray)">Last reviewed: {LAST_REVIEWED_LABEL}</p>
      <p className="mt-3 max-w-3xl text-sm text-(--color-soft-gray)">
        This FAQ is reviewed and updated quarterly to reflect current industry practices, pricing, and platform changes.
      </p>

      <div className="mt-12 grid gap-4">
        {FAQS.map((item, index) => (
          <article key={item.question} className="border border-(--color-bg-secondary) bg-(--color-bg-light) p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">Question {index + 1}</p>
            <h2 className="mt-3 text-2xl font-bold text-(--color-text-dark)">{item.question}</h2>
            <p className="mt-4 max-w-5xl text-base leading-7 text-(--color-text)">{item.answer}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 border border-(--color-bg-secondary) bg-(--color-text-dark) p-8 text-(--color-bg)">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">Need a direct recommendation?</p>
        <h2 className="mt-3 text-3xl font-bold">Discuss your current growth bottleneck and get a fit-based next step.</h2>
        <p className="mt-4 max-w-3xl text-sm text-(--color-bg-secondary)">
          If you need service-level details, review the
          {' '}
          <Link href="/services" className="font-semibold text-(--color-accent) underline-offset-4 hover:underline">
            Walktopus services hub
          </Link>
          . If you need outcome-led architecture, review the
          {' '}
          <Link href="/solutions" className="font-semibold text-(--color-accent) underline-offset-4 hover:underline">
            Walktopus solutions hub
          </Link>
          .
        </p>
        <Link href="/contact" className="mt-6 inline-flex border border-(--color-bg) px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition hover:bg-(--color-bg) hover:text-(--color-text-dark)">
          Book a Free Consultation
        </Link>
      </div>
    </div>
  );
}

