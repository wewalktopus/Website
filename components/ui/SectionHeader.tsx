interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  titleClassName?: string;
  titleStyle?: React.CSSProperties;
}

export function SectionHeader({ eyebrow, title, subtitle, centered = false, titleClassName, titleStyle }: SectionHeaderProps) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-accent)]">{eyebrow}</p>
      ) : null}
      <h2
        className={`mt-3 text-4xl font-extrabold leading-tight md:text-5xl${titleClassName ? ` ${titleClassName}` : ''}`}
        style={titleStyle}
      >
        {title}
      </h2>
      <div className={centered ? 'mx-auto mt-4 h-[3px] w-12 bg-[var(--color-accent)]' : 'mt-4 h-[3px] w-12 bg-[var(--color-accent)]'} />
      {subtitle ? <p className="mt-6 text-lg text-[var(--color-soft-gray)]">{subtitle}</p> : null}
    </div>
  );
}
