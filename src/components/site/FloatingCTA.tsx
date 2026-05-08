import { Link } from "@tanstack/react-router";
import { Calculator } from "lucide-react";

export function FloatingCTA() {
  return (
    <Link
      to="/estimate"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 shadow-[var(--shadow-elegant)] hover:bg-primary/90 transition-all hover:scale-105"
    >
      <Calculator className="h-4 w-4" />
      <span className="text-sm font-medium">Free Estimate</span>
    </Link>
  );
}
