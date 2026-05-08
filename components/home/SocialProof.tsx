import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export function SocialProof() {
  return (
    <section className="bg-[var(--color-text-dark)] py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
        <AnimatedCounter end={200} suffix="+" label="Clients" />
        <AnimatedCounter end={50} suffix="M+" label="Reach" />
        <AnimatedCounter end={3} suffix="" label="Service Pillars" />
        <AnimatedCounter end={100} suffix="%" label="Data-Driven" />
      </div>
    </section>
  );
}
