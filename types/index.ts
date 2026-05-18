export type LeadType = 'business' | 'individual';

export type BudgetRange = '<25k' | '25k-1L' | '1L-5L' | '5L+';

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
