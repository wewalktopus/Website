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
