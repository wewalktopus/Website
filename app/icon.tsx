import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://walktopus.in';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#EEEAD9',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${siteUrl}/logo.png`}
          alt=""
          width={28}
          height={28}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size },
  );
}
