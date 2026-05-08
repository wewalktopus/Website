'use client';

import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  label: string;
}

export function AnimatedCounter({ end, suffix = '', label }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 40;
    const timer = setInterval(() => {
      frame += 1;
      const progress = frame / totalFrames;
      setCount(Math.round(end * progress));
      if (frame >= totalFrames) {
        clearInterval(timer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div>
      <p className="text-4xl font-extrabold text-[var(--color-bg)] md:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.08em] text-[var(--color-bg-secondary)]">{label}</p>
    </div>
  );
}
