import { cn } from "@/lib/utils/cn";

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold leading-tight text-primary sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-5 text-base leading-7 text-secondary sm:text-lg">{description}</p> : null}
    </div>
  );
}
