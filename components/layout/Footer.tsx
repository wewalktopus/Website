import Link from 'next/link';
import { Instagram, Mail, MapPin, Youtube } from 'lucide-react';
import { BRAND, NAV_LINKS } from '@/lib/constants';
import { NewsletterSignup } from './NewsletterSignup';

export function Footer() {
  return (
    <footer className="border-t border-(--color-bg-secondary) bg-(--color-text-dark) text-(--color-bg)">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl uppercase">Walktopus</p>
          <p className="mt-4 text-sm text-(--color-bg-secondary)">{BRAND.tagline}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.08em] text-(--color-bg-secondary)">
            Walktopus - A proud Initiative By Dgen Technologies Private Limited
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.08em]">Navigation</p>
          <ul className="mt-4 space-y-2 text-sm text-(--color-bg-secondary)">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-(--color-accent)">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.08em]">Contact</p>
          <NewsletterSignup />
          <p className="mt-4 flex items-center gap-2 text-sm text-(--color-bg-secondary)">
            <Mail className="h-4 w-4 text-(--color-accent)" />
            <span>{BRAND.email}</span>
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-(--color-bg-secondary)">
            <Instagram className="h-4 w-4 text-(--color-accent)" />
            <Link href={BRAND.social.instagram} target="_blank" rel="noreferrer" className="hover:text-(--color-accent)">
              Instagram
            </Link>
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-(--color-bg-secondary)">
            <Youtube className="h-4 w-4 text-(--color-accent)" />
            <Link href={BRAND.social.youtube} target="_blank" rel="noreferrer" className="hover:text-(--color-accent)">
              YouTube
            </Link>
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-(--color-bg-secondary)">
            <MapPin className="h-4 w-4 text-(--color-accent)" />
            <span>{BRAND.location}</span>
          </p>
          <p className="mt-6 text-xs text-(--color-bg-secondary)">© {new Date().getFullYear()} Walktopus</p>
        </div>
      </div>
    </footer>
  );
}
