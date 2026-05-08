export const BRAND = {
  name: 'Walktopus',
  tagline: 'Amplify Your Digital Presence. Drive Measurable Growth.',
  founded: 'December 2025',
  parent: 'DGEN Technologies Private Limited',
  parentShort: 'DGEN Technologies',
  mission: 'To help every small and local business unlock their true digital potential.',
  origin:
    "Started to manage Sukomal Travel, a personal travel brand, and grew into a full-service digital marketing agency.",
  email: 'hello@walktopus.in',
  phone: '+91 XXXXX XXXXX',
  location: 'Kolkata, West Bengal, India',
  social: {
    instagram: 'https://instagram.com/walktopus',
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
    title: 'Co-founder and Director, DGEN Technologies',
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
  { label: 'Services', href: '/services' },
  { label: 'For Businesses', href: '/for-businesses' },
  { label: 'For Individuals', href: '/for-individuals' },
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
