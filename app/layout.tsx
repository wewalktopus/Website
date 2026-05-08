import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Bebas_Neue, DM_Sans, Space_Mono, Syne } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BRAND } from '@/lib/constants';
import { organizationSchema, localBusinessSchema, pageMetadata, siteUrl } from '@/lib/seo';

const display = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-display' });
const heading = Syne({ subsets: ['latin'], variable: '--font-heading' });
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body' });
const mono = Space_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '700'] });

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Walktopus',
    description:
      'Walktopus is a digital marketing agency in Kolkata helping businesses and individuals grow through social media management, SEO-ready websites, local search visibility, YouTube strategy, and data-driven growth campaigns across India.',
    pathname: '/',
    keywords: [
      'digital marketing agency in Kolkata',
      'SEO agency in Kolkata',
      'social media marketing agency in India',
      'local business marketing West Bengal',
      'personal branding agency India',
      'YouTube marketing services',
      'website SEO content strategy',
    ],
  }),
  title: {
    template: '%s | Walktopus',
    default: 'Walktopus | Digital Marketing Agency in Kolkata',
  },
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'business',
  verification: {
    google: '1XQm0DhR9qM77JVkoEiCaLNKNuUTgs39FMtwFh5uM_M',
  },
  other: {
    'geo.region': 'IN-WB',
    'geo.placename': BRAND.location,
    'geo.position': '22.5726;88.3639',
    ICBM: '22.5726, 88.3639',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${heading.variable} ${body.variable} ${mono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
