'use client';

import { useEffect, useMemo, useState, type ComponentType, type SVGProps } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  Brush,
  CheckCircle2,
  ClipboardList,
  Gauge,
  Globe2,
  Megaphone,
  Rocket,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { PricingAudience, PricingAudienceContent, PricingServiceCategory } from '@/types';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const trustPillars = [
  {
    title: 'Strategic Thinking',
    description: 'Data-driven strategies built around your actual goals.',
    icon: Brain,
  },
  {
    title: 'Creative Excellence',
    description: 'Distinctive visuals that stop the scroll.',
    icon: Brush,
  },
  {
    title: 'Performance Driven',
    description: 'Every decision is tied to measurable outcomes.',
    icon: TrendingUp,
  },
  {
    title: 'Measurable Results',
    description: 'Transparent reporting so ROI is always visible.',
    icon: Target,
  },
] as const;

const processSteps = [
  {
    title: 'Discovery and Audit',
    description: 'We learn your business, audience, and goals with a full digital presence audit.',
    icon: Search,
  },
  {
    title: 'Strategy and Setup',
    description: 'Data-backed channel plan, tools, and content framework designed from scratch.',
    icon: ClipboardList,
  },
  {
    title: 'Execution',
    description: 'Content production, campaign launches, platform management, and audience engagement.',
    icon: Rocket,
  },
  {
    title: 'Optimization and Reporting',
    description: 'Continuous improvement with transparent reporting on what is working and why.',
    icon: Gauge,
  },
] as const;

const categoryIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  branding: Sparkles,
  websites: Globe2,
  content: Megaphone,
  campaigns: BriefcaseBusiness,
};

function getCategoryIcon(categoryId: string): ComponentType<SVGProps<SVGSVGElement>> {
  return categoryIcons[categoryId] ?? Sparkles;
}

interface ServicesExperienceProps {
  content: PricingAudienceContent;
  audience: PricingAudience;
  countryCode?: string;
}

export function ServicesExperience({ content, audience, countryCode }: ServicesExperienceProps) {
  const [activeCategory, setActiveCategory] = useState<string>(content.serviceCategories[0]?.id ?? '');

  useEffect(() => {
    if (!content.serviceCategories.some((category) => category.id === activeCategory)) {
      setActiveCategory(content.serviceCategories[0]?.id ?? '');
    }
  }, [activeCategory, content.serviceCategories]);

  const selectedCategory = useMemo(
    () => content.serviceCategories.find((category) => category.id === activeCategory) ?? content.serviceCategories[0],
    [activeCategory, content.serviceCategories],
  );

  const currencyLabel = audience === 'india' ? 'INR' : 'USD';

  return (
    <div className="relative mx-auto w-full max-w-7xl scroll-smooth space-y-24 px-6 pb-10 pt-6 lg:space-y-28">
      <section className="relative overflow-hidden border border-[#D8CEBC] bg-[#F5F0E8] p-8 md:p-12 lg:p-16">
        <div className="pointer-events-none absolute -left-28 -top-24 h-72 w-72 rounded-full bg-[#D94F2B]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#1A1A1A]/8 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(217,79,43,0.16),transparent_48%),repeating-linear-gradient(90deg,rgba(26,26,26,0.05)_0_1px,transparent_1px_22px)]" />

        <ScrollReveal className="relative z-10 max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#D94F2B]">Vision. Precision. Velocity.</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[0.96] [font-family:var(--font-display)] text-[#1A1A1A] md:text-6xl">
            Everything Your Brand Needs to Grow.
          </h1>
          <div className="mt-6 h-1 w-20 bg-[#D94F2B]" />
          <p className="mt-7 max-w-2xl text-base text-[#353535] md:text-xl">
            From a single social post to a full-scale marketplace - Walktopus handles it all under one roof.
          </p>
          <p className="mt-4 max-w-2xl text-sm font-medium uppercase tracking-[0.08em] text-[#505050]">
            Showing prices for {audience === 'india' ? 'India' : 'International'} clients ({currencyLabel})
            {countryCode ? ` | Country: ${countryCode}` : ''}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" className="bg-[#D94F2B] hover:bg-[#BE3F1F]">
              Book a Free Strategy Call <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button href="#pricing" variant="secondary" className="border-[#1A1A1A] text-[#1A1A1A]">
              View Pricing
            </Button>
          </div>
        </ScrollReveal>
      </section>

      <section id="pricing" className="scroll-mt-28 space-y-8">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#D94F2B]">Monthly Growth Partnerships</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-[#1A1A1A] md:text-5xl">Choose your growth tier</h2>
          <p className="mt-4 max-w-3xl text-lg text-[#4B4B4B]">
            Choose your growth tier - upgrade anytime, keep everything you had.
          </p>
        </ScrollReveal>

        <div className="-mx-6 overflow-x-auto px-6 pb-2">
          <div className="grid min-w-6xl grid-cols-4 gap-5 lg:min-w-0 lg:grid-cols-4">
            {content.monthlyPlans.map((plan, index) => {
              const isPremium = plan.id === 'premium';

              return (
                <motion.article
                  key={plan.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className={[
                    'relative flex h-full flex-col border p-6 transition-colors duration-300',
                    isPremium
                      ? 'border-[#1F1F1F] bg-[#2B2B2B] text-white'
                      : plan.mostPopular
                        ? 'border-[#D94F2B] bg-[#FFF8F4]'
                        : 'border-[#D8CEBC] bg-[#FAF5EC]',
                  ].join(' ')}
                >
                  {plan.mostPopular ? (
                    <span className="absolute right-4 top-4 bg-[#D94F2B] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                      Most Popular
                    </span>
                  ) : null}

                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#D94F2B]">{plan.name}</p>
                  <p className={['mt-3 text-xl font-black', isPremium ? 'text-white' : 'text-[#1A1A1A]'].join(' ')}>{plan.price}</p>
                  <p className={['mt-3 text-sm', isPremium ? 'text-white/80' : 'text-[#555555]'].join(' ')}>{plan.tagline}</p>
                  {plan.id === 'core' ? (
                    <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-[#6A6A6A]">Ideal starter tier</p>
                  ) : null}

                  <ul className="mt-5 space-y-3">
                    {plan.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2 text-sm leading-relaxed">
                        <CheckCircle2 className={['mt-0.5 h-4 w-4 shrink-0', isPremium ? 'text-[#F3A28E]' : 'text-[#D94F2B]'].join(' ')} />
                        <span className={isPremium ? 'text-white/90' : 'text-[#1F1F1F]'}>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto border-t border-white/20 pt-5">
                    <Button
                      href={`/contact?plan=${plan.id}#quote-form`}
                      variant={isPremium ? 'secondary' : 'primary'}
                      className={[
                        'w-full justify-center border uppercase',
                        isPremium
                          ? 'border-white text-white hover:bg-white hover:text-[#111111]'
                          : 'bg-[#D94F2B] text-white hover:bg-[#BE3F1F]',
                      ].join(' ')}
                    >
                      Choose {plan.name}
                    </Button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <Card className="border-[#D8CEBC] bg-[#FBF7EF] p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <p className="text-sm text-[#3C3C3C]">
              <span className="font-semibold text-[#1A1A1A]">Important note:</span> {content.notes.upgradeNote}
            </p>
            <p className="text-sm text-[#3C3C3C]">
              <span className="font-semibold text-[#1A1A1A]">Ad Spend Note:</span> {content.notes.adSpendNote}
            </p>
          </div>
        </Card>
      </section>

      <section id="project-services" className="scroll-mt-28 space-y-8">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#D94F2B]">One-Time and Project Services</p>
          <h2 className="mt-3 max-w-4xl text-4xl font-black text-[#1A1A1A] md:text-5xl">Need something specific? We have it covered.</h2>
          <p className="mt-4 max-w-3xl text-lg text-[#4B4B4B]">
            From a logo to a full marketplace, pick a category and inspect pricing with key deliverables.
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap gap-3">
          {content.serviceCategories.map((category: PricingServiceCategory) => {
            const Icon = getCategoryIcon(category.id);
            const isActive = category.id === activeCategory;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={[
                  'inline-flex items-center gap-2 border px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-colors duration-300',
                  isActive
                    ? 'border-[#D94F2B] bg-[#D94F2B] text-white'
                    : 'border-[#D8CEBC] bg-[#F5F0E8] text-[#1A1A1A] hover:border-[#D94F2B]',
                ].join(' ')}
                aria-pressed={isActive}
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        {selectedCategory ? (
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
            className="space-y-6"
          >
            <Card className="border-[#D8CEBC] bg-[#FCF9F2] p-5">
              <div className="flex items-center gap-3">
                <span className="h-2 w-10 bg-[#D94F2B]" />
                <p className="font-semibold text-[#2B2B2B]">{selectedCategory.subtitle}</p>
              </div>
            </Card>

            <div className="grid gap-5 md:grid-cols-2">
              {selectedCategory.services.map((service) => (
                <motion.article
                  key={service.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.25, ease }}
                  className="border border-[#D8CEBC] bg-[#FCF8F0] p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-extrabold text-[#1A1A1A]">{service.title}</h3>
                    <span className="shrink-0 border border-[#D94F2B]/30 bg-[#D94F2B]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#B73B1F]">
                      {service.price}
                    </span>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {service.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-2 text-sm text-[#2A2A2A]">
                        <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[#D94F2B]" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </motion.div>
        ) : null}
      </section>

      <section className="space-y-6 rounded-sm border border-[#D8CEBC] bg-[#2B2B2B] p-8 text-white md:p-10">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#FFB39F]">Why Walktopus?</p>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">Growth execution with strategic discipline.</h2>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trustPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="border border-white/20 bg-white/5 p-5"
              >
                <Icon className="h-5 w-5 text-[#FFB39F]" />
                <h3 className="mt-4 text-xl font-bold">{pillar.title}</h3>
                <p className="mt-3 text-sm text-white/80">{pillar.description}</p>
              </motion.article>
            );
          })}
        </div>

        <p className="text-sm text-white/85">
          Integrated team of strategists, designers, developers and marketers - end-to-end solutions under one roof.
        </p>
      </section>

      <section className="space-y-8">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#D94F2B]">Our Process</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-black text-[#1A1A1A] md:text-5xl">How It Works</h2>
        </ScrollReveal>

        <div className="grid gap-4 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.45, delay: index * 0.08, ease }}
                className="border border-[#D8CEBC] bg-[#F9F3E8] p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-[#A24A34]">0{index + 1}</span>
                  <Icon className="h-5 w-5 text-[#D94F2B]" />
                </div>
                <h3 className="mt-4 text-2xl font-extrabold text-[#1A1A1A]">{step.title}</h3>
                <p className="mt-3 text-sm text-[#373737]">{step.description}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 border border-[#D8CEBC] bg-[#111111] p-8 text-white md:p-12">
        <ScrollReveal className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#FFB39F]">Need Something Custom?</p>
          <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">Need Something Custom?</h2>
          <p className="mt-5 max-w-3xl text-base text-white/80 md:text-lg">
            We build bespoke scopes for unique requirements. Tell us your goal and we will build a package around it.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact#quote-form" variant="primary" className="bg-[#D94F2B] hover:bg-[#BE3F1F]">
              Book a Free Strategy Call <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button href="/contact#quote-form" variant="secondary" className="border-white text-white hover:bg-white hover:text-[#111111]">
              Get a Custom Proposal
            </Button>
          </div>
          <div className="mt-6 border-t border-white/20 pt-6">
            <p className="font-mono text-xs uppercase tracking-[0.13em] text-white/70">Proud Initiative by Dgen Technologies Private Limited</p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
