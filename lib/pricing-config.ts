import type {
  PricingAudience,
  PricingAudienceContent,
  PricingConfig,
  PricingMonthlyPlan,
  PricingProjectService,
  PricingServiceCategory,
} from '@/types';

const INDIA_MONTHLY_PLANS: PricingMonthlyPlan[] = [
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

const INDIA_SERVICE_CATEGORIES: PricingServiceCategory[] = [
  {
    id: 'branding',
    label: 'Branding and Identity',
    subtitle: 'Own your brand language before you scale your reach.',
    services: [
      {
        id: 'logo-design',
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
        id: 'basic-branding-kit',
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
        id: 'brand-identity-kit',
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
        id: 'static-website',
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
        id: 'dynamic-website-cms',
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
        id: 'marketplace-ecommerce-website',
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
        id: 'website-management',
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
        id: 'single-social-media-post',
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
        id: 'reel-shorts-video',
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
        id: 'content-calendar',
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
        id: 'social-media-audit',
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
        id: 'ad-campaign-setup',
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
        id: 'product-photoshoot',
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
        id: 'festive-promo-campaign',
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
        id: 'influencer-coordination',
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

const INTERNATIONAL_MONTHLY_PLANS: PricingMonthlyPlan[] = [
  {
    id: 'core',
    name: 'CORE',
    price: '$120 - $260/month',
    tagline: 'Starter tier for reliable brand visibility each month.',
    highlights: [
      '1 platform managed (Instagram or Facebook)',
      '8 posts/month (~2/week) with branded copy and custom graphics',
      'Branding starter assets + monthly performance report',
      'Email and WhatsApp support (48hr response)',
    ],
  },
  {
    id: 'boost',
    name: 'BOOST',
    price: '$320 - $520/month',
    tagline: 'Multi-channel tier for stronger content velocity and reach.',
    mostPopular: true,
    highlights: [
      '2 platforms managed + 12-16 posts/month',
      '2-4 short-form videos scripted, edited, and captioned',
      'Google Business Profile management + bi-weekly analytics',
      'Basic Meta/Google ad management (+15-20% on ad spend)',
    ],
  },
  {
    id: 'prime',
    name: 'PRIME',
    price: '$650 - $850/month',
    tagline: 'Growth tier with deeper execution and account ownership.',
    highlights: [
      '3-4 platforms + 25-30 posts/month + 6-8 premium short videos',
      'Advanced content execution for platform-native formats',
      'Basic website included (design + hosting setup)',
      'Weekly KPI dashboard + dedicated account manager',
    ],
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: '$1,150 - $1,650/month',
    tagline: 'Enterprise-grade growth with full-funnel execution.',
    highlights: [
      'All platforms managed + unlimited posts + 12+ premium short videos',
      'Full multi-page website + comprehensive SEO',
      'End-to-end ad campaigns with A/B testing (+15-20% on ad spend)',
      'Live analytics dashboard + weekly strategy calls + escalation support',
    ],
  },
];

const INTERNATIONAL_SERVICE_CATEGORIES: PricingServiceCategory[] = [
  {
    id: 'branding',
    label: 'Branding and Identity',
    subtitle: 'Build a clear identity before scaling acquisition.',
    services: [
      {
        id: 'logo-design',
        title: 'Logo Design',
        price: '$120 - $180',
        deliverables: INDIA_SERVICE_CATEGORIES[0].services[0].deliverables,
      },
      {
        id: 'basic-branding-kit',
        title: 'Basic Branding Kit',
        price: '$220 - $320',
        deliverables: INDIA_SERVICE_CATEGORIES[0].services[1].deliverables,
      },
      {
        id: 'brand-identity-kit',
        title: 'Brand Identity Kit',
        price: '$450 - $650',
        deliverables: INDIA_SERVICE_CATEGORIES[0].services[2].deliverables,
      },
    ],
  },
  {
    id: 'websites',
    label: 'Websites and Digital Assets',
    subtitle: 'From brochure sites to managed commerce experiences.',
    services: [
      {
        id: 'static-website',
        title: 'Static Website',
        price: '$260 - $420',
        deliverables: INDIA_SERVICE_CATEGORIES[1].services[0].deliverables,
      },
      {
        id: 'dynamic-website-cms',
        title: 'Dynamic Website (CMS)',
        price: '$350 - $620',
        deliverables: INDIA_SERVICE_CATEGORIES[1].services[1].deliverables,
      },
      {
        id: 'marketplace-ecommerce-website',
        title: 'Marketplace / E-Commerce Website',
        price: '$720 - $1,900',
        deliverables: INDIA_SERVICE_CATEGORIES[1].services[2].deliverables,
      },
      {
        id: 'website-management',
        title: 'Website Management',
        price: '$55/month',
        deliverables: INDIA_SERVICE_CATEGORIES[1].services[3].deliverables,
      },
    ],
  },
  {
    id: 'content',
    label: 'Content and Social Media',
    subtitle: 'Creative systems focused on retention and conversion.',
    services: [
      {
        id: 'single-social-media-post',
        title: 'Single Social Media Post',
        price: '$12 - $26',
        deliverables: INDIA_SERVICE_CATEGORIES[2].services[0].deliverables,
      },
      {
        id: 'reel-shorts-video',
        title: 'Reel / Shorts Video',
        price: '$35 - $140',
        deliverables: INDIA_SERVICE_CATEGORIES[2].services[1].deliverables,
      },
      {
        id: 'content-calendar',
        title: 'Content Calendar',
        price: '$60 - $120',
        deliverables: INDIA_SERVICE_CATEGORIES[2].services[2].deliverables,
      },
      {
        id: 'social-media-audit',
        title: 'Social Media Audit',
        price: '$50 - $110',
        deliverables: INDIA_SERVICE_CATEGORIES[2].services[3].deliverables,
      },
    ],
  },
  {
    id: 'campaigns',
    label: 'Campaigns and Creatives',
    subtitle: 'Campaign execution with measurable business outcomes.',
    services: [
      {
        id: 'ad-campaign-setup',
        title: 'Ad Campaign Setup',
        price: '$90 - $280',
        deliverables: INDIA_SERVICE_CATEGORIES[3].services[0].deliverables,
      },
      {
        id: 'product-photoshoot',
        title: 'Product Photoshoot',
        price: '$140 - $360',
        deliverables: INDIA_SERVICE_CATEGORIES[3].services[1].deliverables,
      },
      {
        id: 'festive-promo-campaign',
        title: 'Festive / Promo Campaign',
        price: '$140 - $360',
        deliverables: INDIA_SERVICE_CATEGORIES[3].services[2].deliverables,
      },
      {
        id: 'influencer-coordination',
        title: 'Influencer Coordination',
        price: '$180 - $520 (management fee only)',
        deliverables: INDIA_SERVICE_CATEGORIES[3].services[3].deliverables,
      },
    ],
  },
];

function cloneArray<T>(items: T[]): T[] {
  return items.map((item) => {
    if (Array.isArray(item)) {
      return cloneArray(item) as unknown as T;
    }
    if (item && typeof item === 'object') {
      return { ...(item as Record<string, unknown>) } as T;
    }
    return item;
  });
}

function cloneAudienceContent(content: PricingAudienceContent): PricingAudienceContent {
  return {
    monthlyPlans: content.monthlyPlans.map((plan) => ({
      ...plan,
      highlights: [...plan.highlights],
    })),
    serviceCategories: content.serviceCategories.map((category) => ({
      ...category,
      services: category.services.map((service) => ({
        ...service,
        deliverables: [...service.deliverables],
      })),
    })),
    notes: { ...content.notes },
  };
}

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  india: {
    monthlyPlans: cloneArray(INDIA_MONTHLY_PLANS),
    serviceCategories: cloneArray(INDIA_SERVICE_CATEGORIES),
    notes: {
      upgradeNote:
        'Upgrading your plan never removes your existing services - new tier features are added on top.',
      adSpendNote:
        'Ad spend is billed directly to you by the platforms. Walktopus charges a 15-20% management fee on total ad spend.',
    },
  },
  international: {
    monthlyPlans: cloneArray(INTERNATIONAL_MONTHLY_PLANS),
    serviceCategories: cloneArray(INTERNATIONAL_SERVICE_CATEGORIES),
    notes: {
      upgradeNote:
        'Plan upgrades retain your active services and add the new tier deliverables on top.',
      adSpendNote:
        'Ad spend is billed directly by each platform. Walktopus charges a 15-20% management fee on ad spend.',
    },
  },
  updatedAt: null,
  updatedBy: null,
};

function normalizeMonthlyPlans(input: unknown, fallback: PricingMonthlyPlan[]): PricingMonthlyPlan[] {
  if (!Array.isArray(input)) return fallback.map((plan) => ({ ...plan, highlights: [...plan.highlights] }));

  const normalized: PricingMonthlyPlan[] = [];

  input.forEach((raw, index) => {
    if (!raw || typeof raw !== 'object') return;
    const plan = raw as Record<string, unknown>;
    const fallbackPlan = fallback[index] ?? fallback[0];
    if (!fallbackPlan) return;

    normalized.push({
      id: typeof plan.id === 'string' && plan.id.trim() ? plan.id : fallbackPlan.id,
      name: typeof plan.name === 'string' && plan.name.trim() ? plan.name : fallbackPlan.name,
      price: typeof plan.price === 'string' && plan.price.trim() ? plan.price : fallbackPlan.price,
      tagline: typeof plan.tagline === 'string' ? plan.tagline : fallbackPlan.tagline,
      mostPopular: typeof plan.mostPopular === 'boolean' ? plan.mostPopular : Boolean(fallbackPlan.mostPopular),
      highlights: Array.isArray(plan.highlights)
        ? plan.highlights
            .filter((item): item is string => typeof item === 'string')
            .map((item) => item.trim())
            .filter(Boolean)
        : [...fallbackPlan.highlights],
    });
  });

  return normalized;
}

function normalizeServices(input: unknown, fallback: PricingProjectService[]): PricingProjectService[] {
  if (!Array.isArray(input)) {
    return fallback.map((service) => ({ ...service, deliverables: [...service.deliverables] }));
  }

  const normalized: PricingProjectService[] = [];

  input.forEach((raw, index) => {
    if (!raw || typeof raw !== 'object') return;
    const service = raw as Record<string, unknown>;
    const fallbackService = fallback[index] ?? fallback[0];
    if (!fallbackService) return;

    normalized.push({
      id: typeof service.id === 'string' && service.id.trim() ? service.id : fallbackService.id,
      title: typeof service.title === 'string' && service.title.trim() ? service.title : fallbackService.title,
      price: typeof service.price === 'string' && service.price.trim() ? service.price : fallbackService.price,
      deliverables: Array.isArray(service.deliverables)
        ? service.deliverables
            .filter((item): item is string => typeof item === 'string')
            .map((item) => item.trim())
            .filter(Boolean)
        : [...fallbackService.deliverables],
    });
  });

  return normalized;
}

function normalizeServiceCategories(input: unknown, fallback: PricingServiceCategory[]): PricingServiceCategory[] {
  if (!Array.isArray(input)) {
    return fallback.map((category) => ({
      ...category,
      services: category.services.map((service) => ({ ...service, deliverables: [...service.deliverables] })),
    }));
  }

  const normalized: PricingServiceCategory[] = [];

  input.forEach((raw, index) => {
    if (!raw || typeof raw !== 'object') return;
    const category = raw as Record<string, unknown>;
    const fallbackCategory = fallback[index] ?? fallback[0];
    if (!fallbackCategory) return;

    normalized.push({
      id: typeof category.id === 'string' && category.id.trim() ? category.id : fallbackCategory.id,
      label: typeof category.label === 'string' && category.label.trim() ? category.label : fallbackCategory.label,
      subtitle: typeof category.subtitle === 'string' ? category.subtitle : fallbackCategory.subtitle,
      services: normalizeServices(category.services, fallbackCategory.services),
    });
  });

  return normalized;
}

function normalizeAudienceContent(input: unknown, fallback: PricingAudienceContent): PricingAudienceContent {
  const data = input && typeof input === 'object' ? (input as Record<string, unknown>) : {};
  const notes = data.notes && typeof data.notes === 'object' ? (data.notes as Record<string, unknown>) : {};

  return {
    monthlyPlans: normalizeMonthlyPlans(data.monthlyPlans, fallback.monthlyPlans),
    serviceCategories: normalizeServiceCategories(data.serviceCategories, fallback.serviceCategories),
    notes: {
      upgradeNote:
        typeof notes.upgradeNote === 'string' && notes.upgradeNote.trim()
          ? notes.upgradeNote
          : fallback.notes.upgradeNote,
      adSpendNote:
        typeof notes.adSpendNote === 'string' && notes.adSpendNote.trim()
          ? notes.adSpendNote
          : fallback.notes.adSpendNote,
    },
  };
}

export function normalizePricingConfig(input: unknown): PricingConfig {
  const source = input && typeof input === 'object' ? (input as Record<string, unknown>) : {};

  const base: PricingConfig = {
    india: cloneAudienceContent(DEFAULT_PRICING_CONFIG.india),
    international: cloneAudienceContent(DEFAULT_PRICING_CONFIG.international),
    updatedAt: null,
    updatedBy: null,
  };

  return {
    india: normalizeAudienceContent(source.india, base.india),
    international: normalizeAudienceContent(source.international, base.international),
    updatedAt: typeof source.updatedAt === 'string' ? source.updatedAt : null,
    updatedBy: typeof source.updatedBy === 'string' ? source.updatedBy : null,
  };
}

export function resolveAudienceFromCountry(countryCode: string | null | undefined): PricingAudience {
  return (countryCode ?? '').toUpperCase() === 'IN' ? 'india' : 'international';
}

export function getDefaultPricingContentForAudience(audience: PricingAudience): PricingAudienceContent {
  return cloneAudienceContent(DEFAULT_PRICING_CONFIG[audience]);
}
