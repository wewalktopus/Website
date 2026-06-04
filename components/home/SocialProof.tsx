'use client';

import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const stats = [
  { end: 4.2, suffix: 'x', label: 'Average footfall growth across local retail clients' },
  { end: 68, suffix: '%', label: 'Average qualified lead lift from funnel redesigns' },
  { end: 3.1, suffix: 'x', label: 'Average repeat audience engagement increase for hospitality brands' },
  { end: 5, suffix: 'x', label: 'Average monthly profile reach growth for personal brands' },
];

export function SocialProof() {
  return (
    <section className="bg-[var(--color-text-dark)] py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-2 gap-10 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <AnimatedCounter end={stat.end} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
