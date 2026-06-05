export const BRAND_THEME = {
  primary: '#EF4D30',
  background: '#EEEAD9',
  textDark: '#2D2A2A',
  textMuted: '#AFA8A8',
} as const;

export const BRAND_ASSETS = {
  logo: '/logo.png',
  logoTransparent: '/logo-transparent.png',
  favicon: '/favicon.ico',
} as const;

export const COMPANY_INFO = {
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

export const TEAM_INFO = [
  {
    name: 'Sneha Dey',
    title: 'Operations Lead',
    bio: 'Driving Walktopus campaigns and client relationships with precision and passion.',
    placeholderSeed: 'walktopus-sneha',
    imagePath: '/images/team/sneha-dey.png',
  },
  {
    name: 'Sukomal Debnath',
    title: 'Co-founder and Director, Dgen Technologies',
    bio: 'The mind behind Walktopus. Started with one travel account, built a company.',
    placeholderSeed: 'walktopus-sukomal',
    imagePath: '/images/team/sukomal-debnath.jpeg',
  },
  {
    name: 'Sagnik Mandal',
    title: 'Co-founder',
    bio: 'Co-architect of the Walktopus vision and growth strategy.',
    placeholderSeed: 'walktopus-sagnik',
    imagePath: '/images/team/sagnik-mandal.png',
  },
] as const;
