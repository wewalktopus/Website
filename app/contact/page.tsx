export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { Instagram, Mail, MapPin, MessageCircleMore, Youtube } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { BRAND } from '@/lib/constants';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Walktopus',
  description:
    'Contact Walktopus to book a free consultation for digital marketing, SEO strategy, social media management, YouTube growth, website content, and personal branding support.',
  pathname: '/contact',
  keywords: ['contact digital marketing agency Kolkata', 'book SEO consultation India', 'marketing strategy call'],
});

export default function ContactPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[2fr_1fr] lg:py-32">
      <section>
        <h1 className="font-display text-6xl uppercase leading-tight sm:text-7xl">Get a Quote</h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-soft-gray)]">
          Tell us your goals and we will respond with a practical growth roadmap within 24 hours.
        </p>
        <div className="mt-10 border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-6 md:p-8">
          <ContactForm />
        </div>
      </section>

      <aside className="h-fit border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-8">
        <h2 className="text-2xl font-bold">Quick Contact</h2>
        <p className="mt-4 flex items-center gap-3 text-sm text-[var(--color-soft-gray)]">
          <Mail className="h-4 w-4 text-[var(--color-accent)]" />
          <span>{BRAND.email}</span>
        </p>
        <p className="mt-2 flex items-center gap-3 text-sm text-[var(--color-soft-gray)]">
          <Instagram className="h-4 w-4 text-[var(--color-accent)]" />
          <a href={BRAND.social.instagram} target="_blank" rel="noreferrer" className="text-[var(--color-text)] underline-offset-4 hover:underline">
            @walktopus
          </a>
        </p>
        <p className="flex items-center gap-3 text-sm text-[var(--color-soft-gray)]">
          <Youtube className="h-4 w-4 text-[var(--color-accent)]" />
          <a href={BRAND.social.youtube} target="_blank" rel="noreferrer" className="text-[var(--color-text)] underline-offset-4 hover:underline">
            youtube.com/@WeWalktopus
          </a>
        </p>
        <p className="flex items-center gap-3 text-sm text-[var(--color-soft-gray)]">
          <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
          <span>{BRAND.location}</span>
        </p>
        <p className="mt-6 flex items-center gap-3 text-sm">
          <MessageCircleMore className="h-4 w-4 text-[var(--color-accent)]" />
          <span>Response Promise: Within 24 hours.</span>
        </p>
        <p className="mt-6 text-xs uppercase tracking-[0.08em] text-[var(--color-soft-gray)]">
          A subsidiary of Dgen Technologies Private Limited
        </p>
      </aside>
    </div>
  );
}
