export function ProjectStackChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-secondary"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
