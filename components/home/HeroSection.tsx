import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative flex h-[calc(100vh-5rem)] items-center overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="max-w-4xl">
          <p className="inline-block bg-[var(--color-accent)] px-3 py-1 font-mono text-xs uppercase tracking-[0.12em] text-white">
            W
          </p>
          <h1 className="mt-4 font-display text-5xl uppercase leading-[0.95] text-[var(--color-text-dark)] sm:text-6xl md:text-7xl">
            Amplify Your Digital Presence. Drive Measurable Growth.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-[var(--color-soft-gray)]">
            Walktopus helps businesses and individuals win attention, build trust, and turn digital traction into real growth.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/for-businesses">Solutions for Businesses</Button>
            <Button href="/for-individuals" variant="secondary">
              Solutions for Individuals
            </Button>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-16 -right-20 h-80 w-80 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
    </section>
  );
}
