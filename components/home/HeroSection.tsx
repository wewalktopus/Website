 'use client';

import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden py-16">
      {/* Radial accent glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(239,77,48,0.08),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(58,55,55,0.1),transparent_42%)]" />

      {/* Grid pattern — top-left quadrant, fades out toward bottom-right */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(58,55,55,0.065) 1px, transparent 1px), linear-gradient(90deg, rgba(58,55,55,0.065) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage:
            'radial-gradient(ellipse 65% 75% at 18% 18%, black 20%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 65% 75% at 18% 18%, black 20%, transparent 78%)',
        }}
      />

      {/* Subtle top border line accent */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-(--color-accent)/30 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="max-w-4xl">
          {/* W badge — sits on top of the grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative inline-flex items-center gap-2.5"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center bg-(--color-accent) font-mono text-sm font-bold tracking-tight text-white">
              W
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-(--color-soft-gray)">
              Walktopus — Digital Growth Agency
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-5 font-display text-[2.6rem] uppercase leading-[0.92] break-words text-(--color-text-dark) sm:text-6xl md:text-7xl"
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

      {/* Bottom-right glow blob */}
      <motion.div
        className="pointer-events-none absolute -bottom-16 -right-20 h-80 w-80 rounded-full bg-(--color-accent)/10 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Decorative corner square */}
      <div className="pointer-events-none absolute -left-10 top-16 h-48 w-48 border border-(--color-bg-secondary)/60" />
    </section>
  );
}
