 'use client';

import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(239,77,48,0.1),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(58,55,55,0.12),transparent_42%)]" />
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-block bg-(--color-accent) px-3 py-1 font-mono text-xs uppercase tracking-[0.12em] text-white"
          >
            W
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-4 font-display text-5xl uppercase leading-[0.95] text-(--color-text-dark) sm:text-6xl md:text-7xl"
          >
            Amplify Your Digital Presence. Drive Measurable Growth.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 max-w-2xl text-base text-(--color-soft-gray)"
          >
            Walktopus helps businesses and individuals win attention, build trust, and turn digital traction into real growth.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button href="/services">Explore Services</Button>
            <Button href="/contact" variant="secondary">
              Book a Free Consultation
            </Button>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-(--color-soft-gray)"
          >
            Trusted by founders, local businesses, and emerging brands across India
          </motion.p>
        </div>
      </div>
      <motion.div
        className="pointer-events-none absolute -bottom-16 -right-20 h-80 w-80 rounded-full bg-(--color-accent)/10 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="pointer-events-none absolute -left-16 top-20 h-52 w-52 border border-(--color-bg-secondary)/50" />
    </section>
  );
}
