'use client';

import { useState } from 'react';
import { BadgeCheck, ChartLine, Compass, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/common/ScrollReveal';

const playbook = [
  {
    phase: 'Phase 01',
    title: 'Deep Discovery',
    icon: Compass,
    description:
      'We audit your market, audience, and current assets to find exact leverage points for growth.',
    output: 'Positioning map + 90-day action blueprint',
  },
  {
    phase: 'Phase 02',
    title: 'Creative and Content Engine',
    icon: BadgeCheck,
    description:
      'Narratives, visuals, and channel-specific content are built to convert awareness into qualified intent.',
    output: 'Campaign playbook + content production rhythm',
  },
  {
    phase: 'Phase 03',
    title: 'Launch and Distribution',
    icon: Rocket,
    description:
      'We deploy ads, organic growth loops, and community operations so every touchpoint compounds reach.',
    output: 'Launch dashboard + weekly optimization cycles',
  },
  {
    phase: 'Phase 04',
    title: 'Scale with Precision',
    icon: ChartLine,
    description:
      'Winning creatives and channels are doubled down while lagging units are reworked using live data.',
    output: 'ROI expansion framework + month-on-month growth model',
  },
] as const;

export function ScrollytellingPlaybook() {
  const [activeIndex, setActiveIndex] = useState(0);

  const ActiveIcon = playbook[activeIndex].icon;

  return (
    <section className="relative bg-[var(--color-text-dark)] py-24 text-[var(--color-bg)] lg:min-h-screen lg:py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <ScrollReveal y={24}>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-accent)]">Scrollytelling Playbook</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[var(--color-bg)] md:text-5xl">
              Watch how we turn attention into compounding growth
            </h2>
            <p className="mt-6 max-w-xl text-lg text-[var(--color-bg-secondary)]">
              As you scroll, each phase reveals the operating model we use to deliver measurable outcomes for businesses and personal brands.
            </p>
          </ScrollReveal>

          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10 border border-[var(--color-bg-secondary)]/30 bg-[var(--color-bg)]/5 p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-[var(--color-accent)]/40 bg-[var(--color-bg)]/10 text-[var(--color-accent)]">
                <ActiveIcon className="h-5 w-5" />
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">{playbook[activeIndex].phase}</p>
            </div>
            <h3 className="mt-3 text-3xl font-bold text-[var(--color-bg)]">{playbook[activeIndex].title}</h3>
            <p className="mt-4 text-[var(--color-bg-secondary)]">{playbook[activeIndex].description}</p>
            <p className="mt-6 border-t border-[var(--color-bg-secondary)]/20 pt-6 font-mono text-xs uppercase tracking-[0.1em] text-[var(--color-bg)]">
              Output: {playbook[activeIndex].output}
            </p>
          </motion.div>
        </div>

        <div>
          {playbook.map((item, index) => {
            const isActive = index === activeIndex;
            const ItemIcon = item.icon;

            return (
              <motion.article
                key={item.title}
                className="mb-10 flex min-h-[82vh] flex-col justify-center border border-[var(--color-bg-secondary)]/20 bg-[var(--color-bg)]/5 p-8 lg:h-[calc(100vh-8rem)] lg:min-h-0 last:mb-0"
                onViewportEnter={() => setActiveIndex(index)}
                viewport={{ amount: 0.6, margin: '-20% 0px -20% 0px' }}
                animate={{ borderColor: isActive ? 'rgba(239,77,48,0.85)' : 'rgba(217,210,191,0.2)' }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center border border-[var(--color-bg-secondary)]/40 bg-[var(--color-bg)]/10 text-[var(--color-accent)]">
                    <ItemIcon className="h-5 w-5" />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">{item.phase}</p>
                </div>
                <h3 className="mt-4 text-3xl font-bold text-[var(--color-bg)]">{item.title}</h3>
                <p className="mt-5 max-w-xl text-[var(--color-bg-secondary)]">{item.description}</p>
                <p className="mt-6 text-sm uppercase tracking-[0.08em] text-[var(--color-bg)]/90">{item.output}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
