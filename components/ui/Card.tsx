import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-sm border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-8 shadow-sm transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-lg',
        className,
      )}
    >
      {children}
    </div>
  );
}
