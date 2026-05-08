import Link from 'next/link';
import { BRAND, NAV_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-bg-secondary)] bg-[var(--color-text-dark)] text-[var(--color-bg)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl uppercase">Walktopus</p>
          <p className="mt-4 text-sm text-[var(--color-bg-secondary)]">{BRAND.tagline}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.08em] text-[var(--color-bg-secondary)]">
            A subsidiary of Dgen Technologies Pvt. Ltd.
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.08em]">Navigation</p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-bg-secondary)]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[var(--color-accent)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.08em]">Contact</p>
          <p className="mt-4 text-sm text-[var(--color-bg-secondary)]">{BRAND.email}</p>
          <p className="mt-2 text-sm text-[var(--color-bg-secondary)]">
            <Link href={BRAND.social.instagram} target="_blank" rel="noreferrer" className="hover:text-[var(--color-accent)]">
              Instagram
            </Link>
          </p>
          <p className="text-sm text-[var(--color-bg-secondary)]">
            <Link href={BRAND.social.youtube} target="_blank" rel="noreferrer" className="hover:text-[var(--color-accent)]">
              YouTube
            </Link>
          </p>
          <p className="text-sm text-[var(--color-bg-secondary)]">{BRAND.location}</p>
          <p className="mt-6 text-xs text-[var(--color-bg-secondary)]">© {new Date().getFullYear()} Walktopus</p>
        </div>
      </div>
    </footer>
  );
}
