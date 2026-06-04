'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-bg-secondary)] bg-[var(--color-bg)]/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-transparent.png"
            alt="Walktopus"
            width={160}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
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
        <button
          className="flex h-11 w-11 items-center justify-center text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-secondary)] md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-0 top-full w-full border-b border-[var(--color-bg-secondary)] bg-[var(--color-bg)]/95 backdrop-blur md:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col px-6 pb-4">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-[44px] items-center border-b border-[var(--color-bg-secondary)] text-sm font-semibold uppercase tracking-[0.08em] transition-colors hover:text-[var(--color-accent)]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4">
                <Button href="/contact" className="w-full justify-center">
                  Get a Quote
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
