export function TrustBanner() {
  const text = 'Walktopus · A Proud Subsidiary of Dgen Technologies Private Limited · Walktopus · ';

  return (
    <section className="overflow-hidden bg-[var(--color-text)] py-3 text-[var(--color-bg)]">
      <div className="marquee-track font-mono text-[13px] uppercase tracking-[0.12em]">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </section>
  );
}
