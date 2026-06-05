'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronDown, Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import type { PricingAudienceContent, PricingServiceCategory } from '@/types';
import { servicesFaqItems } from '@/components/services/servicesFaqItems';

const engagementStandards = [
  'Dedicated account manager',
  'Weekly or bi-weekly reporting',
  'WhatsApp support',
  'Revision cycles',
  'Performance tracking setup',
] as const;

interface ServicesExperienceProps {
  content: PricingAudienceContent;
}

function renderCategory(category: PricingServiceCategory) {
  return (
    <ScrollReveal key={category.id}>
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

function renderCompactCategory(category: PricingServiceCategory) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-bg-secondary)] bg-white/90 shadow-sm">
      <div className="border-b border-[var(--color-bg-secondary)] bg-[linear-gradient(135deg,var(--color-bg-light),#fff)] px-4 py-4 md:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)]">Service Category</p>
        <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--color-text-dark)]">{category.label}</h3>
        <p className="mt-2 text-sm text-[var(--color-text)]">{category.subtitle}</p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {category.services.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)]/70 p-4"
            >
              <h4 className="text-base font-bold leading-tight text-[var(--color-text-dark)]">{service.title}</h4>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent)]">{service.price}</p>
              <ul className="mt-3 space-y-1.5 text-xs text-[var(--color-text)] md:text-sm">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ServicesExperience({ content }: ServicesExperienceProps) {
  const [activeCategoryId, setActiveCategoryId] = useState(content.serviceCategories[0]?.id ?? '');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const activeCategory = useMemo(
    () => content.serviceCategories.find((category) => category.id === activeCategoryId) ?? content.serviceCategories[0],
    [activeCategoryId, content.serviceCategories],
  );

  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(239,77,48,0.12),transparent_35%),radial-gradient(circle_at_20%_30%,rgba(58,55,55,0.08),transparent_35%),linear-gradient(180deg,#faf8f2_0%,#f5f3ec_35%,#f8f7f4_100%)]" />

      <div className="mx-auto w-full max-w-7xl space-y-20 px-6 pb-20 pt-0 lg:space-y-24 lg:pb-28 lg:pt-0">
        <ScrollReveal>
          <section className="relative flex min-h-[100svh] items-center overflow-hidden rounded-3xl border border-[var(--color-bg-secondary)] bg-white/80 p-8 shadow-sm backdrop-blur-sm md:p-12 lg:p-14">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[var(--color-text)]/10 blur-3xl" />

            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] px-3 py-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-dark)]">
                <Sparkles className="h-3.5 w-3.5" /> Services Hub
              </p>
              <h1 className="mt-5 max-w-5xl text-4xl font-extrabold leading-tight tracking-tight text-[var(--color-text-dark)] md:text-6xl">
                Premium Digital Marketing Services Built for Measurable Growth
              </h1>
              <p className="mt-6 max-w-4xl text-lg leading-8 text-[var(--color-text)]">
                Walktopus combines strategy, content, campaigns, and conversion systems into service frameworks that are easy to choose, easy to execute, and easy to track.
              </p>

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

        <section id="monthly-plans">
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
                  id={plan.id}
                  className={[
                    'relative flex h-full flex-col overflow-hidden rounded-2xl border p-6',
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
                  <div className="mt-auto border-t border-[var(--color-bg-secondary)] pt-4">
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

        <section className="h-[100svh] max-h-[100svh] overflow-hidden rounded-3xl border border-[var(--color-bg-secondary)] bg-white/70 p-4 shadow-sm backdrop-blur-sm md:p-6">
          <div className="grid h-full min-h-0 gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="flex min-h-0 flex-col rounded-2xl border border-[var(--color-bg-secondary)] bg-white/80 p-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--color-text-dark)]">One-time services and project execution</h2>
              <p className="mt-2 text-sm text-[var(--color-text)]">
                Pick a category to view compact options in the right panel.
              </p>

              <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
                <div className="grid gap-2">
                  {content.serviceCategories.map((category) => {
                    const isActive = category.id === activeCategoryId;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setActiveCategoryId(category.id)}
                        className={[
                          'rounded-xl border px-3 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-300 md:text-sm',
                          isActive
                            ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-black shadow-[0_8px_22px_rgba(239,77,48,0.25)]'
                            : 'border-[var(--color-bg-secondary)] bg-white text-[var(--color-text-dark)] hover:border-[var(--color-accent)]',
                        ].join(' ')}
                      >
                        {category.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            <div className="min-h-0">{activeCategory ? renderCompactCategory(activeCategory) : null}</div>
          </div>
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
                <article className="overflow-hidden rounded-2xl border border-[var(--color-bg-secondary)] bg-white/80 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex((current) => (current === index ? null : index))}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8"
                  >
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">Question {index + 1}</p>
                      <h3 className="mt-2 text-xl font-bold text-[var(--color-text-dark)] md:text-2xl">{item.question}</h3>
                    </div>
                    <ChevronDown
                      className={[
                        'h-5 w-5 shrink-0 text-[var(--color-accent)] transition-transform duration-300',
                        openFaqIndex === index ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                  </button>
                  <div
                    className={[
                      'grid transition-all duration-300 ease-out',
                      openFaqIndex === index ? 'grid-rows-[1fr] border-t border-[var(--color-bg-secondary)]' : 'grid-rows-[0fr]',
                    ].join(' ')}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 py-5 text-[var(--color-text)] md:px-8 md:py-6">{item.answer}</p>
                    </div>
                  </div>
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
