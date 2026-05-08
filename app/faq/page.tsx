export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQS } from '@/lib/constants';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'FAQ',
  description:
    'Frequently asked questions about Walktopus digital marketing services, SEO support, social media management, local search visibility, and personal branding services in Kolkata and across India.',
  pathname: '/faq',
  keywords: ['digital marketing FAQ', 'SEO agency questions Kolkata', 'social media management FAQ India'],
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
        title="Questions people ask before they choose a growth partner"
        subtitle="Clear answers about digital marketing, SEO, social media management, personal branding, and local business growth for brands in Kolkata and across India."
      />

      <div className="mt-12 grid gap-4">
        {FAQS.map((item, index) => (
          <article key={item.question} className="border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">Question {index + 1}</p>
            <h2 className="mt-3 text-2xl font-bold text-[var(--color-text-dark)]">{item.question}</h2>
            <p className="mt-4 max-w-4xl text-base leading-7 text-[var(--color-soft-gray)]">{item.answer}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 border border-[var(--color-bg-secondary)] bg-[var(--color-text-dark)] p-8 text-[var(--color-bg)]">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">Need a direct answer?</p>
        <h2 className="mt-3 text-3xl font-bold">Tell us your goals and we will point you to the right growth plan.</h2>
        <p className="mt-4 max-w-3xl text-sm text-[var(--color-bg-secondary)]">
          If you are comparing SEO agencies in Kolkata, looking for social media management for your business, or planning personal branding support, our contact page is the fastest next step.
        </p>
        <Link href="/contact" className="mt-6 inline-flex border border-[var(--color-bg)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition hover:bg-[var(--color-bg)] hover:text-[var(--color-text-dark)]">
          Book a Free Consultation
        </Link>
      </div>
    </div>
  );
}