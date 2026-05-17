import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Walktopus — Digital Marketing & Growth Agency';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://walktopus.in';

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#EEEAD9',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top accent stripe */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            backgroundColor: '#EF4D30',
          }}
        />

        {/* Logo + brand name row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${siteUrl}/logo.png`}
            alt="Walktopus logo"
            width={72}
            height={72}
            style={{ objectFit: 'contain' }}
          />
          <div
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#2B2929',
              letterSpacing: '-0.02em',
            }}
          >
            WALKTOPUS
          </div>
        </div>

        {/* Main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 900,
              color: '#2B2929',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: '860px',
            }}
          >
            Amplify Your Digital Presence.
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#8D8782',
              maxWidth: '680px',
              lineHeight: 1.5,
            }}
          >
            Social media management, web identity &amp; growth campaigns — for businesses and individuals.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              fontSize: '16px',
              color: '#8D8782',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Walktopus - A proud Initiative By Dgen Technologies Private Limited
          </div>
          <div
            style={{
              backgroundColor: '#EF4D30',
              color: '#EEEAD9',
              fontSize: '18px',
              fontWeight: 700,
              padding: '12px 28px',
              letterSpacing: '0.05em',
            }}
          >
            walktopus.in
          </div>
        </div>

        {/* Decorative right accent */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '6px',
            backgroundColor: '#D9D2BF',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
