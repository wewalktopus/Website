export type LeadType = 'business' | 'individual';

export type BudgetRange = '<25k' | '25k-1L' | '1L-5L' | '5L+';

export type LeadStatus = 'new' | 'contacted' | 'converted' | 'closed';

export type AdminRole = 'superadmin' | 'moderator' | 'viewer';

export interface ContactPayload {
  type: LeadType;
  name: string;
  company?: string;
  email: string;
  phone: string;
  services: string[];
  budgetRange?: BudgetRange;
  message: string;
  honeypot?: string;
}

export interface Lead {
  id: string;
  type: LeadType;
  name: string;
  company?: string | null;
  email: string;
  phone: string;
  services: string[];
  budgetRange?: BudgetRange | null;
  message: string;
  status: LeadStatus;
  source: string;
  ipHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  active: boolean;
  emailPreferences?: {
    newsletter: boolean;
    campaigns: boolean;
  };
  source: string;
  subscribedAt: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  name: string;
  role: AdminRole;
  active: boolean;
  createdAt: string;
  createdBy?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description?: string;
  content: string;
  status: 'draft' | 'published';
  author: string;
  authorName: string;
  category?: string;
  readTime?: string;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSession {
  uid: string;
  email: string;
  name: string;
  role: AdminRole;
}

export interface CompanyLogo {
  id: string;
  src: string;
  alt: string;
  href: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type PricingAudience = 'india' | 'international';

export interface PricingMonthlyPlan {
  id: string;
  name: string;
  price: string;
  tagline: string;
  mostPopular?: boolean;
  highlights: string[];
}

export interface PricingProjectService {
  id: string;
  title: string;
  price: string;
  deliverables: string[];
}

export interface PricingServiceCategory {
  id: string;
  label: string;
  subtitle: string;
  services: PricingProjectService[];
}

export interface PricingAudienceContent {
  monthlyPlans: PricingMonthlyPlan[];
  serviceCategories: PricingServiceCategory[];
  notes: {
    upgradeNote: string;
    adSpendNote: string;
  };
}

export interface PricingConfig {
  india: PricingAudienceContent;
  international: PricingAudienceContent;
  updatedAt?: string | null;
  updatedBy?: string | null;
}
