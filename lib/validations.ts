import { z } from 'zod';

export const ContactSchema = z
      .object({
        type: z.enum(['business', 'individual']),
        name: z.string().min(2).max(100),
        company: z.string().max(100).optional(),
        email: z.string().email(),
        phone: z.string().regex(/^[+]?[\d\s\-()]{7,15}$/),
        services: z.array(z.string()).min(1),
        budgetRange: z.enum(['<25k', '25k-1L', '1L-5L', '5L+']).optional(),
        message: z.string().min(10).max(2000),
      });

export const NewsletterSchema = z.object({
  email: z.string().email(),
});
