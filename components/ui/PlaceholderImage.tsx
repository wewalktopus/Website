import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PlaceholderImageProps {
  seed: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  overlay?: boolean;
  sizes?: string;
}

export function PlaceholderImage({ seed, width, height, alt, className, overlay = true, sizes = '100vw' }: PlaceholderImageProps) {
  const src = `https://picsum.photos/seed/${seed}/${width}/${height}`;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {process.env.NODE_ENV === 'development' ? (
        <span className="absolute left-2 top-2 z-10 bg-[var(--color-accent)] px-2 py-1 font-mono text-[10px] text-white">
          PLACEHOLDER
        </span>
      ) : null}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className="h-full w-full object-cover grayscale-[30%]"
      />
      {overlay ? <div className="absolute inset-0 bg-[var(--color-bg)]/20 mix-blend-multiply" /> : null}
    </div>
  );
}
