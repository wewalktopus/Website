export const dynamic = 'force-static';

import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Personal Branding Guide for Indian Professionals',
  description: 'Planned spoke page covering personal branding system design for Indian professionals.',
  pathname: '/blog/personal-branding-guide-for-indian-professionals',
  dateModified: '2026-06-03',
});

export default function PersonalBrandingSpokeStub() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-24 lg:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">Spoke 3 · Stub</p>
      <h1 className="mt-4 text-4xl font-extrabold text-[var(--color-text-dark)]">Personal branding guide for Indian professionals</h1>
      <p className="mt-4 text-sm font-semibold text-[var(--color-soft-gray)]">Last reviewed: June 2026</p>
      <p className="mt-6 text-[var(--color-text)]">
        TODO: Expand this spoke to full 1,500-2,500 words with authority framework, content cadence model, GEO-ready examples, and FAQ schema.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-[var(--color-text)]">
        <li>
          <Link href="/services" className="text-[var(--color-accent)] underline-offset-4 hover:underline">
            Return to the services hub for execution capabilities and engagement scope
          </Link>
        </li>
        <li>
          <Link href="/solutions" className="text-[var(--color-accent)] underline-offset-4 hover:underline">
            Return to the solutions hub for strategic growth systems
          </Link>
        </li>
      </ul>
    </div>
  );
}
