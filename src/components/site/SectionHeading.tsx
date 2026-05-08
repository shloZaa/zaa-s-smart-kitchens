import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow, title, description, align = "left", className,
}: { eyebrow?: string; title: ReactNode; description?: ReactNode; align?: "left" | "center"; className?: string }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium mb-3">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal text-balance">{title}</h2>
      {description && <p className="mt-4 text-muted-foreground text-base lg:text-lg leading-relaxed">{description}</p>}
    </div>
  );
}
