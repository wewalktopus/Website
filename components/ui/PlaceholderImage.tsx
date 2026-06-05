"use client";

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PlaceholderImageProps {
  seed: string;
  width: number;
  height: number;
  alt: string;
  src?: string | null;
  className?: string;
  imageClassName?: string;
  overlay?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number;
}

export function PlaceholderImage({
  seed,
  width,
  height,
  alt,
  src,
  className,
  imageClassName,
  overlay = true,
  sizes = '100vw',
  priority = false,
  quality = 72,
}: PlaceholderImageProps) {
  const fallbackSrc = useMemo(() => `https://picsum.photos/seed/${seed}/${width}/${height}`, [seed, width, height]);
  const preferredSrc = typeof src === 'string' && src.trim() ? src.trim() : fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(preferredSrc);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {process.env.NODE_ENV === 'development' ? (
        <span className="absolute left-2 top-2 z-10 bg-(--color-accent) px-2 py-1 font-mono text-[10px] text-white">
          PLACEHOLDER
        </span>
      ) : null}
      <Image
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        quality={quality}
        onError={() => {
          if (currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
          }
        }}
        className={cn('h-full w-full object-cover grayscale-30', imageClassName)}
      />
      {overlay ? <div className="absolute inset-0 bg-(--color-bg)/20 mix-blend-multiply" /> : null}
    </div>
  );
}
