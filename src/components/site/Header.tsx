import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChefHat, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/testimonials", label: "Reviews" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

const aiNav = { to: "/visualize", label: "AI Designer" } as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container-x flex h-16 lg:h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ChefHat className="h-5 w-5" />
          </span>
          <span className="font-display text-lg lg:text-xl font-semibold text-charcoal">
            Zaa's <span className="text-olive">AI</span> Kitchen
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="text-sm font-medium text-charcoal/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to={aiNav.to}
            className="inline-flex items-center gap-1.5 rounded-full bg-sage/15 text-sage px-3 py-1 text-sm font-medium border border-sage/30 hover:bg-sage hover:text-sage-foreground transition-colors"
            activeProps={{ className: "bg-sage text-sage-foreground" }}
          >
            <Sparkles className="h-3.5 w-3.5" /> {aiNav.label}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/estimate"
            className="hidden sm:inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-all"
          >
            Get Free Estimate
          </Link>
          <button
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-x py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-charcoal font-medium"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to={aiNav.to}
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 py-2 text-sage font-medium"
            >
              <Sparkles className="h-4 w-4" /> {aiNav.label}
            </Link>
            <Link
              to="/estimate"
              onClick={() => setOpen(false)}
              className="rounded-full bg-primary text-primary-foreground text-center py-2.5 mt-2"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
