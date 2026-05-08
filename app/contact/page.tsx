export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a free consultation with Walktopus and discuss your digital growth goals.',
};

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
        <p className="mt-4 text-sm text-[var(--color-soft-gray)]">Email: {BRAND.email}</p>
        <p className="text-sm text-[var(--color-soft-gray)]">Location: {BRAND.location}</p>
        <p className="mt-6 text-sm">Response Promise: Within 24 hours.</p>
        <p className="mt-6 text-xs uppercase tracking-[0.08em] text-[var(--color-soft-gray)]">
          A subsidiary of DGEN Technologies Private Limited
        </p>
      </aside>
    </div>
  );
}
