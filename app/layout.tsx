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
    default: 'Walktopus — Digital Marketing & Growth Agency',
  },
  description:
    'Walktopus helps businesses and individuals amplify their digital presence through social media management, web identity, and data-driven growth campaigns. A subsidiary of Dgen Technologies Private Limited.',
  keywords: [
    'digital marketing',
    'social media management',
    'personal branding',
    'SEO',
    'Kolkata',
    'growth agency',
    'Dgen Technologies',
  ],
  authors: [{ name: 'Dgen Technologies Private Limited', url: siteUrl }],
  creator: 'Walktopus',
  publisher: 'Dgen Technologies Private Limited',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Walktopus',
    title: 'Walktopus — Digital Marketing & Growth Agency',
    description:
      'Amplify your digital presence. Social media management, web identity & growth campaigns for businesses and individuals.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Walktopus — Digital Marketing & Growth Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Walktopus — Digital Marketing & Growth Agency',
    description:
      'Amplify your digital presence. Social media management, web identity & growth campaigns for businesses and individuals.',
    images: ['/opengraph-image'],
    creator: '@walktopus',
    site: '@walktopus',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'business',
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
