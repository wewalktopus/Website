import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'This legacy URL now permanently redirects to the new Walktopus Solutions page focused on measurable business outcomes.',
  other: {
    dateModified: '2026-06-03',
  },
  alternates: {
    canonical: absoluteUrl('/solutions'),
  },
  robots: {
    index: false,
    follow: true,
  },
};

// FLAGGED FOR REVIEW: Legacy pricing-first content was removed because /for-businesses
// must permanently redirect to /solutions under the GEO/AEO architecture update.
export default function ForBusinessesLegacyPage() {
  permanentRedirect('/solutions');
}
