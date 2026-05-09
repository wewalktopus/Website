'use client';

// TODO IMAGES: Replace placeholders before launch
// - services-hero: needs custom editorial brand visual
// - social-pillar: needs platform strategy illustration
// - web-pillar: needs website analytics and CRO mockup
// - growth-pillar: needs campaign dashboard render

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  Megaphone,
  MousePointerClick,
  Rocket,
  Search,
  TrendingUp,
  Users,
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const pillars = [
  {
    id: 'social',
    title: 'Omnichannel Social Media Management',
    subtitle: 'Strategize. Manage. Engage. Grow.',
    description:
      'We run coordinated social operations across Instagram, Facebook, LinkedIn, Threads, and X so your brand moves with one narrative and one measurable growth plan.',
    bullets: ['Channel-specific content calendars', 'Community and inbox management', 'Creative direction and storytelling systems'],
    icon: Megaphone,
    imageSeed: 'walktopus-services-social-pillar',
    imageAlt: 'Omnichannel social media campaign planning board',
  },
  {
    id: 'web',
    title: 'Web Identity and Domain Solutions',
    subtitle: 'Your digital real estate, engineered for conversion.',
    description:
      'From SEO architecture to CRO and analytics, we turn websites into high-intent conversion engines that clearly communicate your offer and capture qualified leads.',
    bullets: ['SEO and metadata architecture', 'Landing page conversion optimization', 'Domain, hosting, and technical hygiene audits'],
    icon: Globe2,
    imageSeed: 'walktopus-services-web-pillar',
    imageAlt: 'Website performance and SEO dashboard for service brand',
  },
  {
    id: 'growth',
    title: 'Growth and Promotion Campaigns',
    subtitle: 'Launch fast. Scale intelligently.',
    description:
      'For physical products and service launches, we build campaign systems with budget control, audience intelligence, and ROI visibility from day one.',
    bullets: ['Paid media planning and optimization', 'Launch funnels and offer positioning', 'Weekly performance reporting and iteration'],
    icon: TrendingUp,
    imageSeed: 'walktopus-services-growth-pillar',
    imageAlt: 'Campaign analytics chart and growth projection interface',
  },
] as const;

const platforms = ['Instagram', 'Facebook', 'LinkedIn', 'Threads', 'X', 'YouTube'] as const;

const executionFramework = [
  {
    title: 'Discovery and Positioning',
    description: 'Audience research, competitive landscape, baseline audits, and clear positioning for your business model.',
    icon: Search,
  },
  {
    title: 'System Design',
    description: 'Channel architecture, content engines, and conversion journeys mapped to measurable objectives.',
    icon: MousePointerClick,
  },
  {
    title: 'Execution Sprint',
    description: 'Creative production, deployment, campaign launches, and cross-channel optimization each week.',
    icon: Rocket,
  },
  {
    title: 'Scale and Reporting',
    description: 'Performance dashboards, retention insights, and strategic pivots to sustain long-term growth.',
    icon: BarChart3,
  },
] as const;

const serviceModules = [
  {
    id: 'content-engine',
    title: 'Content Engine and Creative Ops',
    summary: 'A repeatable content system that balances relevance, consistency, and speed.',
    details: [
      'Monthly campaign themes and weekly execution plans',
      'Short-form and long-form content mapping',
      'Creative quality control with platform-specific variants',
    ],
  },
  {
    id: 'lead-funnel',
    title: 'Lead Capture and Nurture Funnels',
    summary: 'Conversion-focused paths from audience attention to qualified enquiries.',
    details: [
      'Landing page and form experience optimization',
      'Offer sequencing for cold, warm, and hot audiences',
      'Attribution-aware campaign tracking and CRM handoff',
    ],
  },
  {
    id: 'performance',
    title: 'Performance Analytics and Decision Layer',
    summary: 'Clean reporting that prioritizes outcomes, not vanity metrics.',
    details: [
      'KPI dashboards tailored to business stage and goals',
      'Weekly hypothesis reviews and optimization loops',
      'Budget allocation recommendations backed by data',
    ],
  },
] as const;

const goalProfiles = [
  {
    id: 'leads',
    label: 'Lead Generation',
    outcomes: ['High-intent lead pipeline', 'Faster enquiry response loop', 'Lower cost per qualified lead'],
  },
  {
    id: 'awareness',
    label: 'Brand Awareness',
    outcomes: ['Consistent cross-channel messaging', 'Audience recall growth', 'Share-of-voice visibility'],
  },
  {
    id: 'launch',
    label: 'Product or Service Launch',
    outcomes: ['Pre-launch audience warming', 'Launch-week conversion burst', 'Post-launch retention plan'],
  },
] as const;

export function ServicesExperience() {
  const [activePillarId, setActivePillarId] = useState<(typeof pillars)[number]['id']>('social');
  const [openModuleId, setOpenModuleId] = useState<(typeof serviceModules)[number]['id'] | null>('content-engine');
  const [activeGoalId, setActiveGoalId] = useState<(typeof goalProfiles)[number]['id']>('leads');

  const activePillar = useMemo(() => pillars.find((pillar) => pillar.id === activePillarId) ?? pillars[0], [activePillarId]);
  const activeGoal = useMemo(() => goalProfiles.find((goal) => goal.id === activeGoalId) ?? goalProfiles[0], [activeGoalId]);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:py-32">
      <section className="relative flex min-h-screen items-center overflow-hidden border border-(--color-bg-secondary) bg-(--color-bg-light) p-8 md:p-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-(--color-accent)/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-(--color-text)/10 blur-3xl" />

        <ScrollReveal className="relative z-10 space-y-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-(--color-accent)">Services Portfolio</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-6xl">Strategic services built to grow your market share</h1>
            <div className="mt-4 h-0.75 w-12 bg-(--color-accent)" />
            <p className="mt-6 text-lg text-(--color-soft-gray)">
              From social channels to conversion systems, Walktopus builds growth infrastructure that helps businesses and creators move from visibility to
              measurable outcomes.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
            <p className="max-w-2xl text-lg text-(--color-soft-gray)">
              We do not run disconnected tactics. We architect integrated systems where content, channels, and conversion pathways support one another.
            </p>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <Button href="/for-businesses" variant="primary" className="group">
                Solutions for Businesses <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button href="/contact" variant="secondary">
                Book a Strategy Call
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ScrollReveal className="mt-24">
        <div className="rounded-sm border border-(--color-bg-secondary) bg-(--color-text-dark) p-6">
          <div className="flex flex-wrap items-center gap-3">
            {platforms.map((platform) => (
              <motion.span
                key={platform}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.25, ease }}
                className="cursor-default border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-(--color-bg)"
              >
                {platform}
              </motion.span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <section className="mt-24 min-h-screen">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Three Pillars"
            title="Choose your growth pillar"
            subtitle="Explore each pillar to see how strategy, creative execution, and performance intelligence work together."
          />
        </ScrollReveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <div className="space-y-4 border border-(--color-bg-secondary) bg-(--color-bg-light) p-4 md:p-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isActive = pillar.id === activePillarId;

              return (
                <motion.button
                  key={pillar.id}
                  type="button"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease }}
                  whileHover={{ x: 4 }}
                  className={[
                    'w-full text-left rounded-sm border p-6 transition-colors duration-300',
                    isActive
                      ? 'border-(--color-accent) bg-(--color-bg)'
                      : 'border-(--color-bg-secondary) bg-(--color-bg-light) hover:border-(--color-accent)',
                  ].join(' ')}
                  onClick={() => setActivePillarId(pillar.id)}
                  aria-pressed={isActive}
                >
                  <Icon className="h-6 w-6 text-(--color-accent)" aria-hidden="true" />
                  <h3 className="mt-4 text-2xl font-extrabold leading-tight">{pillar.title}</h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-(--color-soft-gray)">{pillar.subtitle}</p>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.4, ease }}
              className="grid gap-8 border border-(--color-bg-secondary) bg-(--color-bg-light) p-6 md:grid-cols-[1fr_1.1fr]"
            >
              <div className="space-y-6">
                <h4 className="text-3xl font-extrabold leading-tight">{activePillar.title}</h4>
                <p className="text-lg text-(--color-soft-gray)">{activePillar.description}</p>
                <ul className="space-y-3">
                  {activePillar.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-base text-(--color-text)">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-(--color-accent)" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Button href="/contact" variant="primary" className="group">
                  Discuss this service <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>

              <PlaceholderImage
                seed={activePillar.imageSeed}
                width={1200}
                height={800}
                alt={activePillar.imageAlt}
                className="h-80 md:h-full"
                sizes="(min-width: 768px) 55vw, 100vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="mt-24 min-h-screen border border-(--color-bg-secondary) bg-(--color-bg-light) p-6 md:p-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-hidden lg:pr-4">
            <ScrollReveal className="h-full">
              <div className="flex h-full flex-col justify-between">
                <SectionHeader
                  eyebrow="Execution Framework"
                  title="How we move from strategy to scale"
                  subtitle="A scrollytelling flow: each step enters as you move down, showing how strategy transforms into measurable growth."
                />
                <p className="mt-8 font-mono text-xs uppercase tracking-[0.15em] text-(--color-soft-gray)">Scroll to progress through each step</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-20 lg:space-y-28">
            {executionFramework.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0.2, y: 60, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.45 }}
                  transition={{ duration: 0.7, ease }}
                  className="min-h-[75vh]"
                >
                  <Card className="h-full p-6 md:p-8">
                    <div className="grid h-full gap-5 md:grid-cols-[auto_1fr] md:items-start">
                      <div className="flex h-12 w-12 items-center justify-center border border-(--color-bg-secondary) bg-white/50 text-(--color-accent)">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.15em] text-(--color-soft-gray)">Step {index + 1}</p>
                        <h3 className="mt-3 text-3xl font-extrabold leading-tight">{step.title}</h3>
                        <p className="mt-4 max-w-xl text-lg text-(--color-soft-gray)">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-24">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Interactive Modules"
            title="Inspect the core delivery modules"
            subtitle="Click each module to see what is included in production delivery."
          />
        </ScrollReveal>

        <div className="mt-10 space-y-4">
          {serviceModules.map((module) => {
            const isOpen = module.id === openModuleId;

            return (
              <div key={module.id} className="border border-(--color-bg-secondary) bg-(--color-bg-light)">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  onClick={() => setOpenModuleId((current) => (current === module.id ? null : module.id))}
                  aria-expanded={isOpen}
                >
                  <div>
                    <h3 className="text-2xl font-extrabold leading-tight">{module.title}</h3>
                    <p className="mt-2 text-(--color-soft-gray)">{module.summary}</p>
                  </div>
                  <span
                    className={[
                      'inline-flex h-8 w-8 shrink-0 items-center justify-center border border-(--color-bg-secondary) font-mono text-lg transition-transform duration-300',
                      isOpen ? 'rotate-45 border-(--color-accent) text-(--color-accent)' : '',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-(--color-bg-secondary) px-6 pb-6 pt-4">
                        <ul className="space-y-3">
                          {module.details.map((detail) => (
                            <li key={detail} className="flex items-start gap-3 text-(--color-text)">
                              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-(--color-accent)" aria-hidden="true" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-24">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Outcome Mapping"
            title="Pick a growth objective"
            subtitle="Select your goal and preview the likely strategic outcomes we target."
          />
        </ScrollReveal>

        <div className="mt-8 flex flex-wrap gap-3">
          {goalProfiles.map((goal) => {
            const isActive = goal.id === activeGoalId;

            return (
              <button
                key={goal.id}
                type="button"
                className={[
                  'border px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-300',
                  isActive
                    ? 'border-(--color-accent) bg-(--color-accent) text-white'
                    : 'border-(--color-bg-secondary) bg-(--color-bg-light) hover:border-(--color-accent)',
                ].join(' ')}
                onClick={() => setActiveGoalId(goal.id)}
                aria-pressed={isActive}
              >
                {goal.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeGoal.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4, ease }}
          className="mt-8 border border-(--color-bg-secondary) bg-(--color-bg-light) p-6"
        >
          <div className="flex items-start gap-3">
            <Users className="mt-1 h-5 w-5 text-(--color-accent)" aria-hidden="true" />
            <div>
              <h3 className="text-2xl font-extrabold">{activeGoal.label} Outcomes</h3>
              <ul className="mt-4 space-y-3">
                {activeGoal.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-(--color-accent)" aria-hidden="true" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mt-24 border border-(--color-bg-secondary) bg-(--color-text-dark) p-8 text-(--color-bg) md:p-10">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-(--color-accent)">Ready to Engage</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
            Build a marketing system that compounds month after month.
          </h2>
          <p className="mt-5 max-w-2xl text-(--color-bg)/80">
            Tell us your market, growth goals, and current bottlenecks. We will map the most relevant service combination for your stage.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" className="group">
              Book a Free Consultation <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button href="/for-individuals" variant="secondary" className="border-white text-white hover:bg-white hover:text-(--color-text-dark)">
              Solutions for Individuals
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

