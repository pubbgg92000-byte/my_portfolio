const capabilities = ["Dashboards", "Admin panels", "Brand sites", "Portfolio systems", "Motion UI", "AI workflows"];

export function CapabilitiesStrip() {
  return (
    <div className="border-y border-border/70 bg-surface/45 py-5">
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium uppercase tracking-[0.14em] text-muted">
        {capabilities.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
