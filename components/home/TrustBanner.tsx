'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CompanyLogo } from '@/types';

export function TrustBanner() {
  const [logos, setLogos] = useState<CompanyLogo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch('/api/logos', { cache: 'no-store', signal: controller.signal });
        const data = await res.json();

        if (res.ok) {
          setLogos(Array.isArray(data.logos) ? data.logos : []);
        } else {
          setLogos([]);
        }
      } catch {
        setLogos([]);
      } finally {
        setIsLoaded(true);
      }
    };

    load();

    return () => {
      controller.abort();
    };
  }, []);

  const marqueeLogos = useMemo(() => logos, [logos]);

  if (!isLoaded || marqueeLogos.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-(--color-text) py-3 text-(--color-bg)">
      <div className="logo-marquee py-1" aria-label="Client logos">
        <div className="logo-marquee-track">
          {[0, 1].map((groupIndex) => (
            <div
              key={`logo-group-${groupIndex}`}
              className={`logo-marquee-group ${marqueeLogos.length === 1 ? 'logo-marquee-group-single' : ''}`}
              aria-hidden={groupIndex === 1}
            >
              {marqueeLogos.map((logo) => {
                const image = (
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className="h-14 w-auto max-w-none object-contain opacity-95 md:h-15"
                  />
                );

                return logo.href ? (
                  <a
                    key={`${logo.id}-${groupIndex}`}
                    href={logo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="logo-marquee-item"
                  >
                    {image}
                  </a>
                ) : (
                  <span key={`${logo.id}-${groupIndex}`} className="logo-marquee-item">
                    {image}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
