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

  const marqueeLogos = useMemo(() => {
    if (logos.length === 0) {
      return [];
    }

    if (logos.length === 1) {
      return Array.from({ length: 4 }, () => logos[0]);
    }

    return logos;
  }, [logos]);

  if (!isLoaded || marqueeLogos.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-(--color-text) py-3 text-(--color-bg)">
      <div className="logo-marquee py-1" aria-label="Client logos">
        <div className="logo-marquee-track">
          {[...marqueeLogos, ...marqueeLogos].map((logo, index) => {
            const image = (
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="h-12 w-auto max-w-none object-contain opacity-95 md:h-12.5"
              />
            );

            const containerClass =
              marqueeLogos.length === 1
                ? 'logo-marquee-item logo-marquee-item-single'
                : 'logo-marquee-item';

            return logo.href ? (
              <a
                key={`${logo.id}-${index}`}
                href={logo.href}
                target="_blank"
                rel="noreferrer"
                className={containerClass}
              >
                {image}
              </a>
            ) : (
              <span key={`${logo.id}-${index}`} className={containerClass}>
                {image}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
