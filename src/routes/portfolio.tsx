import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import kModern from "@/assets/kitchen-modern.jpg";
import kLuxury from "@/assets/kitchen-luxury.jpg";
import kOpen from "@/assets/kitchen-open.jpg";
import kSmall from "@/assets/kitchen-small.jpg";
import kTrans from "@/assets/kitchen-transitional.jpg";
import kAfter from "@/assets/kitchen-after.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Kitchen Remodel Portfolio — Modern, Luxury, Open Concept" },
      { name: "description", content: "Browse completed kitchen remodels: modern, transitional, luxury, small kitchens, and open concept renovations." },
      { property: "og:title", content: "Portfolio — Zaa's AI Kitchen" },
      { property: "og:description", content: "Recently designed and installed kitchens." },
      { property: "og:image", content: kLuxury },
    ],
  }),
  component: Portfolio,
});

const projects = [
  { slug: "coastal-modern", img: kModern, title: "Coastal Modern", cat: "Modern", loc: "Half Moon Bay" },
  { slug: "sage-heritage", img: kLuxury, title: "Sage Heritage", cat: "Luxury", loc: "Hillsborough" },
  { slug: "open-family", img: kOpen, title: "Open Concept Family", cat: "Open Concept", loc: "Menlo Park" },
  { slug: "city-galley", img: kSmall, title: "Bright City Galley", cat: "Small Kitchens", loc: "San Francisco" },
  { slug: "warm-transitional", img: kTrans, title: "Warm Transitional", cat: "Transitional", loc: "Burlingame" },
  { slug: "marble-revival", img: kAfter, title: "Marble Revival", cat: "Transitional", loc: "Palo Alto" },
];

const cats = ["All", "Modern", "Transitional", "Luxury", "Small Kitchens", "Open Concept"] as const;

function Portfolio() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const filtered = cat === "All" ? projects : projects.filter((p) => p.cat === cat);
  return (
    <>
      <section className="py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Portfolio" title="Recently designed & installed kitchens." description="A selection of custom kitchens across the Bay Area." />
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-sm transition-all ${cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-background text-charcoal/80 border-border hover:border-primary"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link to="/portfolio/$slug" params={{ slug: p.slug }} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-5 left-5 right-5 text-background">
                      <p className="text-xs uppercase tracking-[0.18em] text-background/80">{p.cat} • {p.loc}</p>
                      <h3 className="font-display text-2xl mt-1">{p.title}</h3>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
