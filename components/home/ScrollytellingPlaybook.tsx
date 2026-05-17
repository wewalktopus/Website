'use client';

import { useState } from 'react';
import { BadgeCheck, ChartLine, Compass, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section className="relative bg-(--color-text-dark) text-(--color-bg) lg:scroll-mt-20">
      {/* Desktop: sticky left + scrolling right */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:max-w-7xl lg:mx-auto lg:items-start">
        {/* LEFT: sticky panel — sticks for the full scroll height of the right column */}
        <div className="sticky top-20 flex h-[calc(100svh-5rem)] flex-col justify-center border-r border-(--color-bg-secondary)/10 px-8 xl:px-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.15em] text-(--color-accent)"
          >
            Scrollytelling Playbook
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-4 font-anton text-4xl leading-[0.95] text-(--color-bg) xl:text-5xl"
          >
            Watch how we turn attention into compounding growth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-4 max-w-md text-base text-(--color-bg-secondary)"
          >
            As you scroll, each phase reveals the operating model we use to deliver measurable outcomes for businesses and personal brands.
          </motion.p>

          {/* Active phase card — animates on each phase change */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-8 border border-(--color-bg-secondary)/30 bg-(--color-bg)/5 p-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center border border-(--color-accent)/40 bg-(--color-bg)/10 text-(--color-accent)">
                <ActiveIcon className="h-4 w-4" />
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">
                {playbook[activeIndex].phase}
              </p>
            </div>
            <h3 className="mt-3 text-2xl font-bold text-(--color-bg)">
              {playbook[activeIndex].title}
            </h3>
            <p className="mt-3 text-sm text-(--color-bg-secondary)">
              {playbook[activeIndex].description}
            </p>
            <p className="mt-5 border-t border-(--color-bg-secondary)/20 pt-4 font-mono text-xs uppercase tracking-widest text-(--color-bg)">
              Output: {playbook[activeIndex].output}
            </p>
          </motion.div>

          {/* Phase progress dots */}
          <div className="mt-6 flex gap-2">
            {playbook.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to phase ${i + 1}`}
                className={`h-1 flex-1 transition-all duration-300 ${
                  i === activeIndex ? 'bg-(--color-accent)' : 'bg-(--color-bg)/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: scrolling phase cards — each fills the viewport */}
        <div>
          {playbook.map((item, index) => {
            const isActive = index === activeIndex;
            const ItemIcon = item.icon;
            return (
              <motion.article
                key={item.title}
                className="flex min-h-[calc(100svh-5rem)] flex-col justify-center px-8 py-12 xl:px-12"
                onViewportEnter={() => setActiveIndex(index)}
                viewport={{ amount: 0.5 }}
              >
                <motion.div
                  animate={{
                    borderColor: isActive ? 'rgba(239,77,48,0.7)' : 'rgba(217,210,191,0.15)',
                    opacity: isActive ? 1 : 0.45,
                  }}
                  transition={{ duration: 0.35 }}
                  className="border bg-(--color-bg)/5 p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center border border-(--color-bg-secondary)/40 bg-(--color-bg)/10 text-(--color-accent)">
                      <ItemIcon className="h-5 w-5" />
                    </span>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">
                      {item.phase}
                    </p>
                  </div>
                  <h3 className="mt-4 font-anton text-3xl leading-none text-(--color-bg)">{item.title}</h3>
                  <p className="mt-4 max-w-lg text-(--color-bg-secondary)">{item.description}</p>
                  <p className="mt-6 border-t border-(--color-bg-secondary)/20 pt-5 font-mono text-xs uppercase tracking-[0.08em] text-(--color-bg)/80">
                    {item.output}
                  </p>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Mobile: vertical stacked layout */}
      <div className="px-6 py-16 lg:hidden">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-(--color-accent)">
          Scrollytelling Playbook
        </p>
        <h2 className="mt-4 font-anton text-3xl leading-[0.95] text-(--color-bg)">
          Watch how we turn attention into compounding growth
        </h2>
        <p className="mt-4 text-base text-(--color-bg-secondary)">
          Each phase reveals the operating model we use to deliver measurable outcomes.
        </p>
        <div className="mt-10 flex flex-col gap-6">
          {playbook.map((item) => {
            const ItemIcon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="border border-(--color-bg-secondary)/20 bg-(--color-bg)/5 p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center border border-(--color-accent)/40 text-(--color-accent)">
                    <ItemIcon className="h-4 w-4" />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-accent)">
                    {item.phase}
                  </p>
                </div>
                <h3 className="mt-3 font-anton text-xl leading-none text-(--color-bg)">{item.title}</h3>
                <p className="mt-3 text-sm text-(--color-bg-secondary)">{item.description}</p>
                <p className="mt-4 border-t border-(--color-bg-secondary)/20 pt-4 font-mono text-xs uppercase tracking-[0.08em] text-(--color-bg)/80">
                  {item.output}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
