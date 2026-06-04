'use client';

import { motion } from 'framer-motion';

interface CreativeRouteLoaderProps {
  label: string;
  title: string;
  hint: string;
}

export function CreativeRouteLoader({ label, title, hint }: CreativeRouteLoaderProps) {
  return (
    <div className="relative isolate flex min-h-[72vh] items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(239,77,48,0.18),transparent_38%),radial-gradient(circle_at_78%_76%,rgba(58,55,55,0.15),transparent_34%),linear-gradient(180deg,#f8f4ea_0%,#eee9d9_100%)]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-104 w-104 -translate-x-1/2 -translate-y-1/2 rounded-full border border-(--color-bg-secondary) opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-(--color-accent)/40" />

      <motion.div
        className="relative flex w-full max-w-xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-(--color-accent)">{label}</p>

        <div className="relative mt-8 h-40 w-40">
          <div className="absolute inset-0 rounded-full border border-(--color-accent)/25" />

          <motion.div
            className="absolute left-1/2 top-1/2 h-22 w-22 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-text-dark)"
            animate={{ scale: [1, 1.06, 1], boxShadow: ['0 0 0 0 rgba(239,77,48,0.25)', '0 0 0 18px rgba(239,77,48,0)', '0 0 0 0 rgba(239,77,48,0.25)'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex h-full w-full items-center justify-center font-display text-3xl text-(--color-bg)">W</div>
          </motion.div>

          {[0, 1, 2, 3].map((dot) => (
            <motion.span
              key={dot}
              className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-accent)"
              animate={{
                rotate: [dot * 90, dot * 90 + 360],
                x: [58, 58],
                y: [0, 0],
                opacity: [0.85, 0.35, 0.85],
              }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: dot * 0.08 }}
              style={{ transformOrigin: 'center center' }}
            />
          ))}
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
