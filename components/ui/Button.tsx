import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  href?: string;
  className?: string;
  variant?: Variant;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}

const base =
  'inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]';

const variants: Record<Variant, string> = {
  primary: 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]',
  secondary:
    'border-2 border-[var(--color-text)] text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]',
  ghost: 'text-[var(--color-accent)] hover:underline',
};

export function Button({ href, className, variant = 'primary', children, type = 'button', onClick }: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
