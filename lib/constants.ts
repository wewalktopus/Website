export const BRAND = {
  name: 'Walktopus',
  tagline: 'Amplify Your Digital Presence. Drive Measurable Growth.',
  founded: 'December 2025',
  parent: 'Dgen Technologies Private Limited',
  parentShort: 'Dgen Technologies',
  mission: 'To help every small and local business unlock their true digital potential.',
  origin:
    "Started to manage Sukomal Travel, a personal travel brand, and grew into a full-service digital marketing agency.",
  email: 'wewalktopus@gmail.com',
  phone: '+91 XXXXX XXXXX',
  location: 'Kolkata, West Bengal, India',
  social: {
    instagram: 'https://www.instagram.com/walktopus',
    youtube: 'https://www.youtube.com/@WeWalktopus',
    linkedin: 'https://linkedin.com/company/walktopus',
    facebook: 'https://facebook.com/walktopus',
    twitter: 'https://x.com/walktopus',
    threads: 'https://threads.net/@walktopus',
  },
} as const;

export const TEAM = [
  {
    name: 'Sneha Dey',
    title: 'Operations Lead',
    bio: 'Driving Walktopus campaigns and client relationships with precision and passion.',
    placeholderSeed: 'walktopus-sneha',
  },
  {
    name: 'Sukomal Debnath',
    title: 'Co-founder and Director, Dgen Technologies',
    bio: 'The mind behind Walktopus. Started with one travel account, built a company.',
    placeholderSeed: 'walktopus-sukomal',
  },
  {
    name: 'Sagnik Mandal',
    title: 'Co-founder',
    bio: 'Co-architect of the Walktopus vision and growth strategy.',
    placeholderSeed: 'walktopus-sagnik',
  },
] as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'For Businesses', href: '/for-businesses' },
  { label: 'For Individuals', href: '/for-individuals' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const SERVICES = [
  {
    id: 'social-media',
    title: 'Social Media Mastery',
    description:
      'End-to-end management across Instagram, Facebook, LinkedIn, Threads, and X with strategy, content, and community.',
  },
  {
    id: 'web-identity',
    title: 'Web and Domain Management',
    description:
      'Digital real estate management with SEO, analytics, CRO, and domain strategy for a stronger online presence.',
  },
  {
    id: 'growth-campaigns',
    title: 'Growth and Promotion',
    description:
      'Data-driven campaigns for product launches and service scaling with full ROI tracking and ad spend management.',
  },
] as const;

export const BUSINESS_BENEFITS = [
  'Lead-focused campaign architecture',
  'Performance-first content strategy',
  'Multichannel paid and organic growth',
  'Conversion rate optimization for landing pages',
  'Monthly dashboards with measurable KPIs',
  'Scalable brand systems for expansion',
] as const;

export const INDIVIDUAL_JOURNEY = ['Discovery', 'Strategy', 'Execution', 'Growth'] as const;

export const FAQS = [
  {
    question: 'What does Walktopus do for local businesses in Kolkata and across India?',
    answer:
      'Walktopus helps local businesses, startups, and service brands grow online with social media management, SEO strategy, content systems, paid growth campaigns, and website performance support built for Indian markets.',
  },
  {
    question: 'Do you work only with businesses in Kolkata, West Bengal?',
    answer:
      'No. Walktopus is based in Kolkata, West Bengal, and we actively support brands across India while keeping strong expertise in local SEO, regional audience targeting, and city-level digital marketing.',
  },
  {
    question: 'Can Walktopus help with Google search visibility and local SEO?',
    answer:
      'Yes. We improve search visibility through technical SEO recommendations, content planning, keyword targeting, local landing page messaging, conversion-focused website structure, and better search intent alignment.',
  },
  {
    question: 'Do you offer social media management for small businesses and creators?',
    answer:
      'Yes. We manage Instagram, Facebook, LinkedIn, Threads, X, and YouTube workflows for small businesses, founders, consultants, and personal brands that need consistent growth and stronger audience engagement.',
  },
  {
    question: 'What industries does Walktopus support?',
    answer:
      'We support retail businesses, hospitality brands, local services, consultants, coaches, creators, and emerging startups that need measurable digital marketing results without enterprise bloat.',
  },
  {
    question: 'Can you help with website SEO content and lead generation pages?',
    answer:
      'Yes. We can help shape crawlable service pages, landing pages, metadata, internal linking, conversion messaging, and SEO-friendly content structures that make websites easier for Google and AI search systems to understand.',
  },
  {
    question: 'How quickly do you respond to new business enquiries?',
    answer:
      'We aim to respond within 24 hours with a clear next step, whether you need a strategy call, a quote, or guidance on the right service mix for your business or personal brand.',
  },
  {
    question: 'Why choose Walktopus over a generic digital marketing agency?',
    answer:
      'Walktopus combines startup speed, local market understanding, performance-led execution, and the technical backing of Dgen Technologies Private Limited. That gives clients both creative agility and operational reliability.',
  },
] as const;

export const BLOG_POSTS = [
  {
    slug: 'digital-marketing-for-local-businesses-in-kolkata',
    title: 'Digital Marketing for Local Businesses in Kolkata: Where to Start in 2026',
    description:
      'A practical guide for Kolkata small businesses that want stronger Google visibility, better local reach, and measurable digital growth without wasting budget.',
    excerpt:
      'Learn how local businesses in Kolkata can build a crawlable website, improve Google visibility, and combine social media with SEO for steady lead generation.',
    publishedAt: '2026-05-08',
    readTime: '6 min read',
    category: 'Local SEO',
    imageSeed: 'walktopus-blog-kolkata-local-seo',
    keywords: [
      'digital marketing agency in Kolkata',
      'local business marketing Kolkata',
      'SEO agency West Bengal',
      'small business digital marketing India',
    ],
    sections: [
      {
        heading: 'Start with a website Google can actually understand',
        body:
          'Many local businesses invest in design before they invest in search clarity. A crawlable website needs clear service pages, location-led headings, strong metadata, helpful internal links, descriptive image alt text, and content that answers real customer questions.',
      },
      {
        heading: 'Match local search intent with location-aware content',
        body:
          'If your audience searches for a digital marketing agency in Kolkata, social media marketing in West Bengal, or website SEO for local businesses in India, your pages should reflect those intents naturally. That means writing for real search behavior instead of vague branding language.',
      },
      {
        heading: 'Combine local SEO with social proof and conversion design',
        body:
          'Traffic alone is not a growth strategy. Add proof points, service clarity, FAQs, contact paths, and trust signals so that Google visitors, AI search systems, and human prospects all understand why your business is credible and relevant.',
      },
    ],
  },
  {
    slug: 'youtube-instagram-seo-for-small-brands',
    title: 'How Small Brands Can Use YouTube and Instagram Together for Discoverability',
    description:
      'A discoverability framework for small brands using YouTube, Instagram, and search-friendly content to expand reach and improve brand recall.',
    excerpt:
      'YouTube and Instagram work better together when your content topics, metadata, and landing pages align with how people search and compare brands.',
    publishedAt: '2026-05-08',
    readTime: '5 min read',
    category: 'Content Strategy',
    imageSeed: 'walktopus-blog-youtube-instagram',
    keywords: [
      'YouTube marketing for small business',
      'Instagram content strategy India',
      'video SEO for brands',
      'content marketing agency Kolkata',
    ],
    sections: [
      {
        heading: 'Turn short-form content into search assets',
        body:
          'Instagram drives attention, but YouTube gives your brand long-tail discovery. When both channels share the same customer problems, keywords, and call to action, they create a stronger search footprint.',
      },
      {
        heading: 'Use landing pages to capture intent beyond social platforms',
        body:
          'Your content should point viewers to pages that explain services, showcase results, and answer objections. That is where SEO, GEO, and conversion design overlap. Search engines and AI assistants prefer pages with clear structure and direct answers.',
      },
      {
        heading: 'Build consistency instead of chasing every trend',
        body:
          'For most small businesses and creators, sustained publishing around a few proven topics produces better results than random posting. A strong topic cluster helps both search ranking and audience memory.',
      },
    ],
  },
  {
    slug: 'personal-branding-seo-for-founders-and-creators',
    title: 'Personal Branding SEO for Founders, Consultants, and Creators',
    description:
      'How founders and creators can strengthen personal brand search visibility with authority pages, structured content, and better digital positioning.',
    excerpt:
      'Personal branding works better when your profile, website, and content are aligned around authority, trust, and search intent.',
    publishedAt: '2026-05-08',
    readTime: '7 min read',
    category: 'Personal Branding',
    imageSeed: 'walktopus-blog-personal-branding',
    keywords: [
      'personal branding agency India',
      'founder brand strategy Kolkata',
      'creator SEO services',
      'LinkedIn personal brand growth',
    ],
    sections: [
      {
        heading: 'Own your branded search results',
        body:
          'When someone searches your name, the first page of results should explain who you are, what you do, and why you are worth trusting. That requires a clear homepage, about page, service narrative, and well-structured supporting content.',
      },
      {
        heading: 'Create authority signals across platforms',
        body:
          'LinkedIn, YouTube, Instagram, and your own website should reinforce one positioning story. That consistency helps Google understand your expertise and helps prospects move from awareness to enquiry faster.',
      },
      {
        heading: 'Make your expertise easy to quote, crawl, and remember',
        body:
          'Structured FAQs, educational blogs, descriptive metadata, and well-labelled imagery improve how search engines and AI systems interpret your content. That is what makes modern personal branding more discoverable and durable.',
      },
    ],
  },
] as const;
