'use client';

import { ArrowUpRight, Gauge, Megaphone, Radar, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/common/ScrollReveal';

const capabilities = [
  {
    icon: Megaphone,
    title: 'Brand Narrative Systems',
    description:
      'We shape a repeatable content voice across channels so your audience recognizes and trusts you instantly.',
  },
  {
    icon: Workflow,
    title: 'Funnel Orchestration',
    description:
      'From awareness to conversion, every campaign is mapped into a measurable and scalable growth flow.',
  },
  {
    icon: Radar,
    title: 'Competitive Positioning',
    description:
      'We identify whitespace in your market and craft messaging that differentiates you where attention is won.',
  },
  {
    icon: Gauge,
    title: 'Performance Intelligence',
    description:
      'Weekly diagnostics and KPI instrumentation ensure each rupee spent contributes to revenue momentum.',
  },
] as const;

export function CapabilityMatrix() {
  return (
    <section className="mx-auto flex w-full max-w-7xl items-center px-6 py-24 lg:min-h-screen lg:py-28">
      <ScrollReveal>
        <SectionHeader
          eyebrow="Operating System"
          title="A premium growth stack built for serious brands"
          subtitle="Walktopus combines strategic thinking, sharp creative execution, and performance operations in one compact team."
        />
      </ScrollReveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {capabilities.map((capability, index) => (
          <ScrollReveal key={capability.title} delay={index * 0.08}>
            <Card className="group h-full">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center border border-[var(--color-bg-secondary)] bg-white/50 text-[var(--color-accent)] transition-colors duration-300 group-hover:border-[var(--color-accent)]">
                  <capability.icon className="h-5 w-5" />
                </div>
                <motion.span
                  className="text-[var(--color-soft-gray)]"
                  whileHover={{ x: 3, y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </motion.span>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[var(--color-text-dark)]">{capability.title}</h3>
              <p className="mt-4 text-[var(--color-soft-gray)]">{capability.description}</p>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
