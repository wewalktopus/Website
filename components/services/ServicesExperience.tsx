'use client';

import { useMemo, useState, type ComponentType, type SVGProps } from 'react';
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

type MonthlyPlan = {
  id: 'core' | 'boost' | 'prime' | 'premium';
  name: string;
  price: string;
  tagline: string;
  mostPopular?: boolean;
  highlights: string[];
};

type ProjectService = {
  title: string;
  price: string;
  deliverables: string[];
};

type ServiceCategory = {
  id: 'branding' | 'websites' | 'content' | 'campaigns';
  label: string;
  subtitle: string;
  services: ProjectService[];
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const monthlyPlans: MonthlyPlan[] = [
  {
    id: 'core',
    name: 'CORE',
    price: 'Rs5,000 - Rs18,000/month',
    tagline: 'Beginner-friendly launch tier for consistent presence.',
    highlights: [
      '1 platform managed (Instagram or Facebook)',
      '8 posts/month (~2/week) with branded copy and custom graphics',
      'Basic branding kit included + monthly performance report',
      'Email and WhatsApp support (48hr response)',
    ],
  },
  {
    id: 'boost',
    name: 'BOOST',
    price: 'Rs21,000 - Rs38,000/month',
    tagline: 'Momentum tier for multi-channel growth and stronger output.',
    mostPopular: true,
    highlights: [
      '2 platforms managed + 12-16 posts/month',
      '2-4 Reels/short-form videos scripted, edited, captioned',
      'Google Business Profile management + bi-weekly analytics',
      'Basic Meta/Google ad management (+15-20% on ad spend)',
    ],
  },
  {
    id: 'prime',
    name: 'PRIME',
    price: 'Rs45,000 - Rs60,000/month',
    tagline: 'Scale tier with ad operations and dedicated ownership.',
    highlights: [
      '3-4 platforms + 25-30 posts/month + 6-8 premium Reels',
      'Advanced content creation and platform-native formats',
      'Basic website included (design + hosting setup)',
      'Weekly KPI dashboard + dedicated account manager',
    ],
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: 'Rs80,000 - Rs1,20,000/month',
    tagline: 'Exclusive growth engine with full-channel command.',
    highlights: [
      'All platforms managed + unlimited posts + 12+ premium Reels',
      'Full multi-page website + comprehensive SEO',
      'End-to-end ad campaigns with A/B testing (+15-20% on ad spend)',
      'Live analytics dashboard + weekly strategy calls + escalation team',
    ],
  },
];

const serviceCategories: ServiceCategory[] = [
  {
    id: 'branding',
    label: 'Branding and Identity',
    subtitle: 'Own your brand language before you scale your reach.',
    services: [
      {
        title: 'Logo Design',
        price: 'Rs7,000 - Rs10,000',
        deliverables: [
          '3-5 distinct logo concepts with 2-3 revision rounds',
          'AI, EPS, SVG, PNG, JPG file handover',
          'Brand guideline notes for colors, fonts, and usage rules',
          '50% deposit upfront and 50% on final approval',
        ],
      },
      {
        title: 'Basic Branding Kit',
        price: 'Rs12,000 - Rs19,000',
        deliverables: [
          'Primary, secondary, and monochrome logo variants',
          'Defined palette in HEX, RGB, and CMYK',
          '2-3 font pairings with practical usage guidance',
          '1-2 page style board PDF with up to 3 revisions',
        ],
      },
      {
        title: 'Brand Identity Kit',
        price: 'Rs25,000 - Rs32,000',
        deliverables: [
          'Full Brand Bible multi-page guideline document',
          'Business card, letterhead, and envelope print-ready designs',
          'Email signature + Canva/Figma social templates',
          'Presentation master template + collateral revisions',
        ],
      },
    ],
  },
  {
    id: 'websites',
    label: 'Websites and Digital Assets',
    subtitle: 'From fast brochures to full marketplace infrastructure.',
    services: [
      {
        title: 'Static Website',
        price: 'Rs14,000 - Rs25,000',
        deliverables: [
          '4-6 page responsive custom design (no templates)',
          'Fast pre-rendered architecture with on-page SEO',
          'Contact form, Google Maps, and social link setup',
          '14-day post-launch bug warranty with managed deployment',
        ],
      },
      {
        title: 'Dynamic Website (CMS)',
        price: 'Rs20,000 - Rs35,000',
        deliverables: [
          'WordPress or equivalent CMS with custom backend dashboard',
          'Dynamic modules for blogs, team directory, and portfolio',
          'Integrated SEO tools (Yoast/RankMath) in scalable build',
          'Admin training + recorded tutorial + 30-day warranty',
        ],
      },
      {
        title: 'Marketplace / E-Commerce Website',
        price: 'Rs40,000 - Rs1,00,000',
        deliverables: [
          'Custom storefront with filtering, cart, and checkout',
          'Payment gateway, inventory, and customer/vendor dashboards',
          'Master admin panel with SSL and data encryption',
          '30-day warranty with 40% - 30% - 30% milestone billing',
        ],
      },
      {
        title: 'Website Management',
        price: 'Rs2,999/month',
        deliverables: [
          'Core/plugin updates and proactive security patching',
          '24/7 uptime monitoring and automated database backups',
          'Up to 2 hours/month minor content updates',
          'Monthly health report; cancel anytime with 30-day notice',
        ],
      },
    ],
  },
  {
    id: 'content',
    label: 'Content and Social Media',
    subtitle: 'Creative output engineered for discoverability and conversion.',
    services: [
      {
        title: 'Single Social Media Post',
        price: 'Rs500 - Rs1,500',
        deliverables: [
          'Custom graphic/carousel up to 5 slides',
          'Platform-optimized sizes (Instagram, LinkedIn, and more)',
          'Caption + CTA + hashtag research included',
          '2-3 day delivery, 1 revision, 100% upfront payment',
        ],
      },
      {
        title: 'Reel / Shorts Video',
        price: 'Rs2,000 - Rs8,000',
        deliverables: [
          'Script with high-retention first 3-second hook',
          'Editing with transitions, color grade, and effects',
          'Animated captions, trending audio, and sound design',
          '5-7 day turnaround and 2 revisions after footage receipt',
        ],
      },
      {
        title: 'Content Calendar',
        price: 'Rs4,000 - Rs7,000',
        deliverables: [
          '30-day plan with channels, cadence, and content pillars',
          'Post concepts with hooks and visual direction per slot',
          'Timing recommendations with hashtag pools',
          'Delivered in Notion/Trello/Sheets in 7-10 days',
        ],
      },
      {
        title: 'Social Media Audit',
        price: 'Rs3,000 - Rs6,000',
        deliverables: [
          'Profile optimization and performance deep-dive',
          'Competitor benchmarking across 2-3 competitors',
          'Bottleneck mapping for hooks, timing, hashtags, branding',
          'Actionable PDF growth roadmap + 30-minute consultation',
        ],
      },
    ],
  },
  {
    id: 'campaigns',
    label: 'Campaigns and Creatives',
    subtitle: 'Launch-focused production and measurable campaign execution.',
    services: [
      {
        title: 'Ad Campaign Setup',
        price: 'Rs5,000 - Rs15,000',
        deliverables: [
          'Pixel/Tag setup for Meta, Google, and LinkedIn',
          'Audience architecture with Core, Custom, Lookalike pools',
          'Campaign structure, budget logic, and A/B framework',
          'Ad policy checks; ongoing optimization is separate retainer',
        ],
      },
      {
        title: 'Product Photoshoot',
        price: 'Rs8,000 - Rs20,000',
        deliverables: [
          'Pre-shoot strategy with mood board and art direction',
          'Studio-grade capture with professional lighting setup',
          'Retouching with color correction/background cleanup',
          'High-res and web-ready delivery with one revision round',
        ],
      },
      {
        title: 'Festive / Promo Campaign',
        price: 'Rs8,000 - Rs20,000',
        deliverables: [
          'Theme strategy for festive, launch, or promo cycles',
          'Hero banners and social creative suite',
          'Urgency-led copywriting and rollout sequencing',
          '2 revisions with strict 24-48 hour feedback windows',
        ],
      },
      {
        title: 'Influencer Coordination',
        price: 'Rs10,000 - Rs30,000 (management fee only)',
        deliverables: [
          'Influencer discovery and authenticity vetting',
          'Outreach, negotiation, and contract workflow',
          'Briefing, deliverable QA, and go-live governance',
          'Analytics report with 50% deposit and 50% launch billing',
        ],
      },
    ],
  },
];

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

const categoryIcons: Record<ServiceCategory['id'], ComponentType<SVGProps<SVGSVGElement>>> = {
  branding: Sparkles,
  websites: Globe2,
  content: Megaphone,
  campaigns: BriefcaseBusiness,
};

export function ServicesExperience() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory['id']>('branding');

  const selectedCategory = useMemo(
    () => serviceCategories.find((category) => category.id === activeCategory) ?? serviceCategories[0],
    [activeCategory],
  );

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
            More than marketing. We build growth engines.
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
            {monthlyPlans.map((plan, index) => {
              const isPremium = plan.id === 'premium';
              const isCore = plan.id === 'core';

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

                  <ul className="mt-5 space-y-3">
                    {plan.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2 text-sm leading-relaxed">
                        <CheckCircle2 className={['mt-0.5 h-4 w-4 shrink-0', isPremium ? 'text-[#F3A28E]' : 'text-[#D94F2B]'].join(' ')} />
                        <span className={isPremium ? 'text-white/90' : 'text-[#1F1F1F]'}>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 border-t border-white/20 pt-5">
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

                  {isCore ? (
                    <span className="mt-2 text-[11px] uppercase tracking-[0.12em] text-[#6A6A6A]">Best for first-stage consistency</span>
                  ) : null}
                </motion.article>
              );
            })}
          </div>
        </div>

        <Card className="border-[#D8CEBC] bg-[#FBF7EF] p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <p className="text-sm text-[#3C3C3C]">
              <span className="font-semibold text-[#1A1A1A]">Important note:</span> Upgrading your plan never removes your existing services - new tier features are added on top.
            </p>
            <p className="text-sm text-[#3C3C3C]">
              <span className="font-semibold text-[#1A1A1A]">Ad Spend Note:</span> Ad spend is billed directly to you by the platforms. Walktopus charges a 15-20% management fee on total ad spend.
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
          {serviceCategories.map((category) => {
            const Icon = categoryIcons[category.id];
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
                key={service.title}
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
