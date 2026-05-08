import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-bg-secondary)] bg-[var(--color-bg)]/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-display text-3xl uppercase tracking-wide">
          Walktopus
        </Link>
        <nav className="hidden gap-6 text-sm font-semibold uppercase tracking-[0.08em] md:flex">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-[var(--color-accent)]">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="/contact" className="hidden md:inline-flex">
          Get a Quote
        </Button>
      </div>
    </header>
  );
}
