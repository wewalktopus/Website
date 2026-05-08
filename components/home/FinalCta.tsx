'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/common/ScrollReveal';

export function FinalCta() {
  return (
    <section className="pb-24 lg:pb-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <ScrollReveal>
          <div className="relative overflow-hidden border border-[var(--color-bg-secondary)] bg-[var(--color-text-dark)] px-8 py-16 text-[var(--color-bg)] md:px-16">
            <motion.div
              className="absolute -right-12 -top-16 h-44 w-44 border border-[var(--color-accent)]/35"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            />
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-accent)]">Ready to Build Market Gravity?</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-[var(--color-bg)] md:text-5xl">
              Partner with Walktopus and turn your digital presence into a predictable growth asset.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-[var(--color-bg-secondary)]">
              Whether you are scaling a business or building a personal brand, we bring strategy, execution, and accountability in one team.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact">Book a Free Consultation</Button>
              <Button href="/services" variant="secondary" className="border-[var(--color-bg)] text-[var(--color-bg)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text-dark)]">
                Explore Services
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
