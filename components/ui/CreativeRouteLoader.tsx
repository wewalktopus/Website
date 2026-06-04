'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface CreativeRouteLoaderProps {
  label: string;
  title: string;
  hint: string;
}

export function CreativeRouteLoader({ label, title, hint }: CreativeRouteLoaderProps) {
  return (
    <div className="relative isolate flex min-h-[72vh] items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_18%,rgba(239,77,48,0.14),transparent_42%),linear-gradient(180deg,#f8f4ea_0%,#eee9d9_100%)]" />

      <motion.div
        className="relative flex w-full max-w-xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-(--color-accent)">{label}</p>

        <div className="relative mt-8 h-36 w-36">
          <motion.div
            className="absolute inset-0 rounded-full border border-(--color-accent)/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
          />

          <motion.div
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(58,55,55,0.18)]"
            animate={{ scale: [1, 1.06, 1], boxShadow: ['0 0 0 0 rgba(239,77,48,0.25)', '0 0 0 18px rgba(239,77,48,0)', '0 0 0 0 rgba(239,77,48,0.25)'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image src="/favicon.ico" alt="Walktopus" width={36} height={36} className="h-9 w-9 object-contain" priority />
          </motion.div>
        </div>

        <h2 className="mt-8 max-w-lg text-3xl font-extrabold leading-tight text-(--color-text-dark) sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-md text-sm text-(--color-soft-gray)">{hint}</p>

        <div className="mt-8 flex items-center gap-2" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2.5 w-2.5 rounded-full bg-(--color-accent)"
              animate={{ y: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.14, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
