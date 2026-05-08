'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  label: string;
}

export function AnimatedCounter({ end, suffix = '', label }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    const totalFrames = 60;
    const timer = setInterval(() => {
      frame += 1;
      // Ease-out cubic for natural deceleration
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(Math.round(end * progress));
      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(end);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <div ref={ref}>
      <p className="text-4xl font-extrabold text-[var(--color-bg)] md:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.08em] text-[var(--color-bg-secondary)]">{label}</p>
    </div>
  );
}
