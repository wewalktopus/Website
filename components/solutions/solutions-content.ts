export type SolutionSystem = {
  name: string;
  label: string;
  summary: string;
  definition: string;
  bundledServices: string[];
  outcome: string;
  persona: string;
  planIds: string[];
};

export type SolutionMetric = {
  value: string;
  label: string;
  detail: string;
};

export type SolutionFaqItem = {
  question: string;
  answer: string;
};

export type SolutionProcessStep = {
  name: string;
  description: string;
};

export const solutionSystems: SolutionSystem[] = [
  {
    name: 'Local Market Domination System',
    label: 'For location-led businesses',
    summary:
      'A visibility engine for clinics, hospitality brands, retailers, and service businesses that need to own local search and social attention.',
    definition:
      'The Local Market Domination System bundles local SEO optimization, Google Business Profile management, geo-targeted content, and monthly reporting into one coordinated growth system for a defined geographic market.',
    bundledServices: [
      'Local SEO audit and technical fixes',
      'Google Business Profile weekly management',
      'Location-targeted social content calendar',
      'Local keyword content strategy',
      'Monthly rank-tracking dashboard',
    ],
    outcome:
      'Clients using this system have seen footfall growth of 4.2x and local search visibility increases of up to 68% within the first 90 days.',
    persona:
      'Retail stores, restaurants, clinics, salons, and professional service firms in Tier 1 and Tier 2 Indian cities.',
    planIds: ['boost', 'prime'],
  },
  {
    name: 'Personal Brand Authority System',
    label: 'For founders and experts',
    summary:
      'A trust-building content system for consultants, creators, founders, and coaches who need consistent authority and inbound demand.',
    definition:
      'The Personal Brand Authority System combines narrative strategy, multi-platform content, video publishing, and community engagement into a structured authority pipeline.',
    bundledServices: [
      'Brand narrative and positioning framework',
      'Instagram, LinkedIn, and YouTube managed content',
      'Short-form video scripting and editing',
      'Audience growth analytics and KPI review',
      'Personal website or landing page where applicable',
    ],
    outcome:
      'Personal brand clients have achieved an average 5x increase in monthly profile reach and a measurable shift from social presence to inbound inquiry generation within 3 months.',
    persona:
      'Consultants, coaches, creators, solopreneurs, startup founders, and professionals building thought leadership.',
    planIds: ['core', 'boost'],
  },
  {
    name: 'Full-Funnel Business Growth Engine',
    label: 'For scaling companies',
    summary:
      'A high-ownership operating model that aligns paid, organic, website, and analytics workflows under one accountable team.',
    definition:
      'The Full-Funnel Business Growth Engine integrates paid advertising, organic content systems, SEO-led web presence, CRO, and performance analytics into a single coordinated operating layer.',
    bundledServices: [
      'Multi-platform paid campaign management',
      'Cross-platform content production',
      'SEO-led website and landing page improvements',
      'A/B testing on ads and conversion pages',
      'Live analytics dashboard and weekly strategy calls',
    ],
    outcome:
      'Businesses running this system have recorded a 68% lift in qualified leads and a 3.1x increase in repeat audience engagement within the first quarter of deployment.',
    persona:
      'Scaling SMBs, e-commerce brands, hospitality businesses, and service companies investing seriously in digital growth.',
    planIds: ['prime', 'premium'],
  },
];

export const solutionMetrics: SolutionMetric[] = [
  {
    value: '4.2x',
    label: 'Local footfall growth',
    detail: 'Recorded after search visibility, local content, and reputation workflows were aligned.',
  },
  {
    value: '68%',
    label: 'Qualified lead lift',
    detail: 'Observed after funnel architecture, messaging, and conversion tracking were standardized.',
  },
  {
    value: '3.1x',
    label: 'Repeat engagement gain',
    detail: 'Measured for hospitality and service brands running coordinated content and paid cycles.',
  },
  {
    value: '5x',
    label: 'Profile reach expansion',
    detail: 'Achieved in authority-building programs with disciplined short-form and narrative systems.',
  },
];

export const solutionFaqItems: SolutionFaqItem[] = [
  {
    question: 'What is the difference between a Walktopus service and a Walktopus solution?',
    answer:
      'A service is a focused execution unit. A solution is a coordinated operating system that aligns multiple services against one business outcome, with shared reporting and ownership.',
  },
  {
    question: 'How quickly do solution programs start showing measurable movement?',
    answer:
      'Directional signals usually appear in the first reporting cycle through visibility, engagement quality, or conversion-path improvements. Stronger commercial outcomes compound over the next 60 to 90 days when execution stays integrated.',
  },
  {
    question: 'Can Walktopus map a solution to a smaller starting budget?',
    answer:
      'Yes. The operating model can phase investment around the biggest constraint first, then expand once the initial system is performing. That keeps the solution strategic without forcing unnecessary volume early.',
  },
  {
    question: 'Do you manage ad spend directly?',
    answer:
      'Walktopus manages strategy, optimization, and reporting while clients retain ownership of media spend inside their own Meta and Google accounts for transparency and continuity.',
  },
];

export const integrationItems = [
  'Google Analytics 4 and Search Console for attribution, visibility, and intent tracking',
  'Meta Ads and Google Ads for coordinated paid acquisition systems',
  'WordPress, Shopify, and custom websites for conversion-focused page experiences',
  'Zoho, HubSpot, and lightweight CRMs for lead routing and sales handoff clarity',
  'Canva and Figma workflows for faster creative production with brand control',
  'WhatsApp, forms, and booking systems to reduce inquiry drop-off after first contact',
] as const;

export const processSteps: SolutionProcessStep[] = [
  {
    name: 'Discovery',
    description:
      'We audit your current funnel, channel performance, buyer intent signals, and reporting gaps to identify the growth constraint that matters most right now.',
  },
  {
    name: 'System Design',
    description:
      'We map the right mix of content, SEO, web, and ad operations into a single plan with clear ownership, KPIs, and reporting rhythm.',
  },
  {
    name: 'Launch',
    description:
      'Your approved system goes live in synchronized weekly cycles, with publishing, optimization, and testing tied back to one outcome dashboard.',
  },
  {
    name: 'Scale',
    description:
      'We reallocate effort toward the best-performing channels, creatives, and conversion paths so momentum compounds without wasted spend.',
  },
];