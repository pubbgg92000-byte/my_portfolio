import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  showIcon?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  showIcon = true,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-300",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        variant === "primary" &&
          "bg-primary text-background shadow-glow hover:bg-accent hover:text-background",
        variant === "secondary" &&
          "border border-border bg-surface/70 text-primary hover:border-accent/70 hover:bg-elevated",
        variant === "ghost" && "text-secondary hover:text-primary",
        className,
      )}
      {...props}
    >
      {children}
      {showIcon ? <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> : null}
    </Link>
  );
}
