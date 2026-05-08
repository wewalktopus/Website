import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Bebas_Neue, DM_Sans, Space_Mono, Syne } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const display = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-display' });
const heading = Syne({ subsets: ['latin'], variable: '--font-heading' });
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body' });
const mono = Space_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '700'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://walktopus.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Walktopus',
    default: 'Walktopus - Digital Marketing and Growth Agency',
  },
  description:
    'Walktopus helps businesses and individuals amplify their digital presence through social media management, web identity, and data-driven growth campaigns.',
  keywords: ['digital marketing', 'social media management', 'personal branding', 'SEO', 'Kolkata'],
  authors: [{ name: 'DGEN Technologies Private Limited' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Walktopus',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${heading.variable} ${body.variable} ${mono.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
