import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Anton, Space_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { BRAND } from '@/lib/constants';
import { organizationSchema, extendedOrganizationSchema, localBusinessSchema, pageMetadata, siteUrl } from '@/lib/seo';

const display = Anton({ subsets: ['latin'], variable: '--font-display', weight: '400' });
const heading = Anton({ subsets: ['latin'], variable: '--font-heading', weight: '400' });
const mono = Space_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '700'] });
const anton = Anton({ subsets: ['latin'], variable: '--font-anton', weight: '400' });

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
    dateModified: '2026-06-03',
    'geo.region': 'IN-WB',
    'geo.placename': BRAND.location,
    'geo.position': '22.5726;88.3639',
    ICBM: '22.5726, 88.3639',
    'article:publisher': BRAND.social.facebook,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

  return (
    <html lang="en">
      {gaMeasurementId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${gaMeasurementId}');`}
          </Script>
        </>
      ) : null}
      <body className={`${display.variable} ${heading.variable} ${mono.variable} ${anton.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(extendedOrganizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
