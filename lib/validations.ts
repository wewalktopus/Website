import { z } from 'zod';

export const ContactSchema = z
      .object({
    type: z.enum(['business', 'individual']).optional(),
    name: z.string().optional(),
    company: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    services: z.array(z.string()).optional(),
    budgetRange: z.enum(['<25k', '25k-1L', '1L-5L', '5L+']).optional(),
    message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
    honeypot: z.string().optional(),
      });

export const NewsletterSchema = z.object({
  email: z.string().email(),
});
