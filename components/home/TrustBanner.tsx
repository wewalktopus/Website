'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CompanyLogo } from '@/types';

const FALLBACK_TEXT = 'Walktopus · A Proud Initiative by Dgen Technologies Private Limited · Walktopus · ';

export function TrustBanner() {
  const [logos, setLogos] = useState<CompanyLogo[]>([]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const res = await fetch('/api/logos', { cache: 'no-store' });
        const data = await res.json();

        if (!active) return;

        setLogos(Array.isArray(data.logos) ? data.logos : []);
      } catch {
        if (active) {
          setLogos([]);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  const marqueeLogos = useMemo(() => {
    if (logos.length === 0) {
      return [];
    }

    return [...logos, ...logos, ...logos];
  }, [logos]);

  return (
    <section className="overflow-hidden bg-(--color-text) py-3 text-(--color-bg)">
      {marqueeLogos.length === 0 ? (
        <div className="marquee-track font-mono text-[13px] uppercase tracking-[0.12em]">
          <span>{FALLBACK_TEXT}</span>
          <span>{FALLBACK_TEXT}</span>
          <span>{FALLBACK_TEXT}</span>
          <span>{FALLBACK_TEXT}</span>
        </div>
      ) : (
        <div className="marquee-track items-center gap-8 py-1">
          {marqueeLogos.map((logo, index) => {
            const image = (
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="h-10 w-auto max-w-42.5 object-contain opacity-95"
              />
            );

            return logo.href ? (
              <a
                key={`${logo.id}-${index}`}
                href={logo.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center"
              >
                {image}
              </a>
            ) : (
              <span key={`${logo.id}-${index}`} className="inline-flex shrink-0 items-center">
                {image}
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
}
