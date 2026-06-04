'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import {
  integrationItems,
  processSteps,
  solutionFaqItems,
  solutionMetrics,
  solutionSystems,
} from '@/components/solutions/solutions-content';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { PricingAudience, PricingAudienceContent, PricingMonthlyPlan } from '@/types';

interface SolutionsExperienceProps {
  audience: PricingAudience;
  countryCode?: string;
  content: PricingAudienceContent;
}

const sectionTransition = { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } as const;

function findPlan(planId: string, plans: PricingMonthlyPlan[]) {
  return plans.find((plan) => plan.id === planId);
}

function parseMetricValue(value: string): { target: number; decimals: number; suffix: string } {
  const numericPart = value.replace(/[^0-9.]/g, '');
  const decimals = numericPart.includes('.') ? numericPart.split('.')[1].length : 0;
  const target = Number.parseFloat(numericPart);
  const suffix = value.replace(numericPart, '');

  return {
    target: Number.isFinite(target) ? target : 0,
    decimals,
    suffix,
  };
}

function MetricCounter({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState('0');
  const parsed = useMemo(() => parseMetricValue(value), [value]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const node = ref.current;
    let frameId = 0;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || started) {
          return;
        }

        started = true;
        const duration = 1200;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = parsed.target * eased;
          setDisplay(current.toFixed(parsed.decimals));

          if (progress < 1) {
            frameId = requestAnimationFrame(tick);
          }
        };

        frameId = requestAnimationFrame(tick);
      },
      { threshold: 0.45 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [parsed.decimals, parsed.target]);

  return (
    <p ref={ref} className="text-4xl font-extrabold text-[var(--color-text-dark)]">
      {display}
      {parsed.suffix}
    </p>
  );
}

export function SolutionsExperience({ content }: SolutionsExperienceProps) {
  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_top_left,rgba(239,77,48,0.16),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(58,55,55,0.14),transparent_30%),linear-gradient(180deg,rgba(238,234,217,0.72),rgba(238,234,217,0))]" />
      <div className="pointer-events-none absolute left-[-8rem] top-40 h-64 w-64 rounded-full border border-[var(--color-accent)]/20" />
      <motion.div
        className="pointer-events-none absolute right-[-5rem] top-24 h-72 w-72 rounded-full bg-[var(--color-accent)]/10 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.68, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 py-20 lg:gap-24 lg:py-28">
        <section className="grid min-h-[calc(100vh-6rem)] items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={sectionTransition}
              className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-accent)] shadow-sm backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Outcome-led growth systems
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...sectionTransition, delay: 0.08 }}
              className="mt-6 max-w-5xl font-display text-5xl uppercase leading-[0.94] text-[var(--color-text-dark)] sm:text-6xl lg:text-7xl"
            >
              Premium solution systems built to move the metric that matters next.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...sectionTransition, delay: 0.16 }}
              className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-soft-gray)]"
            >
              Walktopus turns strategy, content, paid distribution, SEO, and conversion ops into one accountable growth layer. Instead of stacking disconnected tasks, you get a modern operating system matched to your stage, market, and growth pressure.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...sectionTransition, delay: 0.24 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button href="/contact#quote-form">Book a Strategy Call</Button>
              <Button href="/services#monthly-plans" variant="secondary">
                Compare Live Plans
              </Button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...sectionTransition, delay: 0.32 }}
              className="mt-8 text-sm text-[var(--color-soft-gray)]"
            >
              Trusted by businesses across India and beyond with region-aware growth planning.
            </motion.p>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...sectionTransition, delay: 0.2 }}
            className="border border-[var(--color-bg-secondary)] bg-[var(--color-text-dark)] p-7 text-[var(--color-bg)] shadow-2xl"
          >
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">Why teams switch</p>
            <h2 className="mt-3 text-2xl font-bold">Less fragmented marketing. More measurable momentum.</h2>
            <ul className="mt-6 space-y-3 text-sm text-white/78">
              {[
                'One strategy across content, SEO, paid media, and conversion pages',
                'Weekly visibility into what is working, what is leaking, and what changes next',
                'Plan recommendations tailored to your growth stage and market goals',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-sm text-white/70">Best fit for teams choosing outcomes over channel-by-channel outsourcing.</p>
            </div>
          </motion.aside>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {solutionMetrics.map((metric, index) => (
            <ScrollReveal key={metric.label} delay={index * 0.06}>
              <Card className="h-full border-white/50 bg-white/70 backdrop-blur">
                <MetricCounter value={metric.value} />
                <p className="mt-3 text-lg font-semibold text-[var(--color-text-dark)]">{metric.label}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-soft-gray)]">{metric.detail}</p>
              </Card>
            </ScrollReveal>
          ))}
        </section>

        <section>
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-accent)]">Choose your operating model</p>
              <h2 className="mt-4 text-4xl font-extrabold text-[var(--color-text-dark)] md:text-5xl">
                Three premium systems for three very different growth constraints.
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--color-soft-gray)]">
                Each solution is mapped to a business problem, a delivery shape, and the monthly partnerships most commonly used to run it.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            {solutionSystems.map((solution, index) => {
              const linkedPlans = solution.planIds
                .map((planId) => findPlan(planId, content.monthlyPlans))
                .filter((plan): plan is PricingMonthlyPlan => Boolean(plan));

              return (
                <ScrollReveal key={solution.name} delay={index * 0.08}>
                  <Card className="group relative h-full overflow-hidden border-[var(--color-bg-secondary)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(238,234,217,0.82))] p-0 shadow-sm hover:-translate-y-1 hover:shadow-2xl">
                    <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-accent),rgba(239,77,48,0.1))]" />
                    <div className="flex h-full flex-col p-8">
                      <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">{solution.label}</p>
                      <h3 className="mt-3 text-3xl font-bold text-[var(--color-text-dark)]">{solution.name}</h3>
                      <p className="mt-4 text-[var(--color-soft-gray)]">{solution.summary}</p>

                      <div className="mt-6 grid gap-4 border-y border-[var(--color-bg-secondary)]/80 py-5 text-sm">
                        <div>
                          <p className="font-semibold uppercase tracking-[0.08em] text-[var(--color-text-dark)]">Best for</p>
                          <p className="mt-2 leading-7 text-[var(--color-soft-gray)]">{solution.persona}</p>
                        </div>
                        <div>
                          <p className="font-semibold uppercase tracking-[0.08em] text-[var(--color-text-dark)]">Business shift</p>
                          <p className="mt-2 leading-7 text-[var(--color-soft-gray)]">{solution.outcome}</p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <p className="font-semibold uppercase tracking-[0.08em] text-[var(--color-text-dark)]">Included engines</p>
                        <ul className="mt-3 space-y-2 text-sm text-[var(--color-soft-gray)]">
                          {solution.bundledServices.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 rounded-sm border border-[var(--color-bg-secondary)] bg-white/70 p-4">
                        <p className="font-semibold text-[var(--color-text-dark)]">Plans commonly used to power this system</p>
                        <div className="mt-3 flex flex-wrap gap-3">
                          {linkedPlans.map((plan) => (
                            <Link
                              key={plan.id}
                              href={`/services#${plan.id}`}
                              className="inline-flex items-center gap-2 border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] px-3 py-2 text-sm text-[var(--color-text-dark)] transition-colors hover:border-[var(--color-accent)]"
                            >
                              <span className="font-semibold">{plan.name}</span>
                              <span className="text-[var(--color-soft-gray)]">{plan.price}</span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <Button
                          href={`/contact?plan=${linkedPlans[0]?.id ?? 'boost'}#quote-form`}
                          className="w-full justify-center px-4 py-3 text-xs tracking-[0.06em]"
                        >
                          Build This System
                        </Button>
                        <Button
                          href="/services#monthly-plans"
                          variant="secondary"
                          className="w-full justify-center px-4 py-3 text-xs tracking-[0.06em]"
                        >
                          Compare Plans
                        </Button>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)]">
          <ScrollReveal className="border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-8 md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-accent)]">Plan bridge</p>
            <h2 className="mt-4 text-3xl font-extrabold text-[var(--color-text-dark)] md:text-4xl">Choose the partnership tier that matches your current growth intensity.</h2>
            <p className="mt-4 max-w-3xl text-[var(--color-soft-gray)]">
              Compare the most selected monthly partnerships first, then go deeper on the full services page before booking your strategy call.
            </p>

            <div className="mt-8 grid gap-4 xl:grid-cols-2">
              {content.monthlyPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ ...sectionTransition, delay: index * 0.06 }}
                >
                  <Link
                    href={`/services#${plan.id}`}
                    className={cn(
                      'block border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
                      plan.mostPopular
                        ? 'border-[var(--color-accent)] bg-white'
                        : 'border-[var(--color-bg-secondary)] bg-white/70',
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">{plan.name}</p>
                        <p className="mt-2 text-2xl font-bold text-[var(--color-text-dark)]">{plan.price}</p>
                      </div>
                      {plan.mostPopular ? <span className="bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-white">Most selected</span> : null}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[var(--color-soft-gray)]">{plan.tagline}</p>
                    <ul className="mt-4 space-y-2 text-sm text-[var(--color-soft-gray)]">
                      {plan.highlights.slice(0, 3).map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </Link>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="border border-[var(--color-bg-secondary)] bg-[var(--color-text-dark)] p-8 text-[var(--color-bg)] md:p-10" delay={0.08}>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-accent)]">Decision clarity</p>
            <h2 className="mt-4 text-3xl font-extrabold">Pick your system first. Scale with confidence next.</h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-white/78">
              <p>Use this page to identify the right operating model for your stage.</p>
              <p>Then compare execution depth across plans and lock the fastest path to results.</p>
              <p>Every recommendation is aligned to measurable demand, conversion, and growth momentum.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/services#monthly-plans" className="justify-center">See Full Pricing</Button>
              <Button href="/contact#quote-form" variant="secondary" className="justify-center border-white text-white hover:bg-white hover:text-[var(--color-text-dark)]">
                Get a Custom Brief
              </Button>
            </div>
          </ScrollReveal>
        </section>

        <section>
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-accent)]">Delivery model</p>
              <h2 className="mt-4 text-4xl font-extrabold text-[var(--color-text-dark)] md:text-5xl">A premium workflow that keeps strategy, execution, and proof in the same room.</h2>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.name} delay={index * 0.06}>
                <article className="relative h-full border border-[var(--color-bg-secondary)] bg-white/70 p-6 backdrop-blur">
                  <div className="absolute left-6 top-0 h-10 w-px bg-[linear-gradient(180deg,var(--color-accent),transparent)]" />
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-accent)]">Step {index + 1}</p>
                  <h3 className="mt-5 text-2xl font-bold text-[var(--color-text-dark)]">{step.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-soft-gray)]">{step.description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <ScrollReveal className="border border-[var(--color-bg-secondary)] bg-[var(--color-text-dark)] p-8 text-[var(--color-bg)] md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-accent)]">Stack compatibility</p>
            <h2 className="mt-4 text-3xl font-extrabold">Your current tools can stay. The operating discipline changes.</h2>
            <ul className="mt-8 grid gap-3 text-sm text-white/78">
              {integrationItems.map((item) => (
                <li key={item} className="flex items-start gap-3 border border-white/10 bg-white/5 p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal className="border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-8 md:p-10" delay={0.08}>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-accent)]">Executive FAQ</p>
            <h2 className="mt-4 text-3xl font-extrabold text-[var(--color-text-dark)]">The short answers buyers need before they move.</h2>
            <div className="mt-8 space-y-4">
              {solutionFaqItems.map((item, index) => (
                <article key={item.question} className="overflow-hidden border border-[var(--color-bg-secondary)] bg-white/85">
                  <button
                    type="button"
                    onClick={() => setOpenFaq((prev) => (prev === index ? -1 : index))}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={openFaq === index}
                  >
                    <h3 className="text-lg font-bold text-[var(--color-text-dark)]">{item.question}</h3>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 shrink-0 text-[var(--color-accent)] transition-transform duration-300',
                        openFaq === index ? 'rotate-180' : '',
                      )}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? 'auto' : 0,
                      opacity: openFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[var(--color-bg-secondary)]/70 px-5 py-4">
                      <p className="text-sm leading-7 text-[var(--color-soft-gray)]">{item.answer}</p>
                    </div>
                  </motion.div>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </section>

        <ScrollReveal>
          <section className="border border-[var(--color-bg-secondary)] bg-[linear-gradient(135deg,var(--color-text-dark),#22211f)] p-8 text-[var(--color-bg)] shadow-2xl md:p-12">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-accent)]">Next step</p>
                <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight">If the problem is clear, the system should be too. Let’s map yours.</h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-white/76">
                  Choose the right monthly partnership, or start with a custom strategy brief and let us map the most efficient operating model for your growth stage.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Button href="/services#monthly-plans">See Pricing</Button>
                <Button href="/contact#quote-form" variant="secondary" className="border-white text-white hover:bg-white hover:text-[var(--color-text-dark)]">
                  Start the Brief
                </Button>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}