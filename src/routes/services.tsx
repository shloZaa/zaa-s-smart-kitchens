import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Check, ArrowRight } from "lucide-react";
import sCab from "@/assets/service-cabinets.jpg";
import sCounter from "@/assets/service-counters.jpg";
import sDesign from "@/assets/service-design.jpg";
import sFloor from "@/assets/service-flooring.jpg";
import sLight from "@/assets/service-lighting.jpg";
import sTile from "@/assets/service-tile.jpg";
import sSmart from "@/assets/service-smart.jpg";
import sOpen from "@/assets/kitchen-open.jpg";
import sFull from "@/assets/kitchen-after.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Kitchen Remodeling Services — Cabinets, Countertops & More" },
      { name: "description", content: "Full kitchen remodeling, custom cabinetry, countertops, design, flooring, lighting, tile, smart kitchens, and open concept renovations." },
      { property: "og:title", content: "Kitchen Remodeling Services" },
      { property: "og:description", content: "Everything you need to transform your kitchen — design through install." },
      { property: "og:image", content: sFull },
    ],
  }),
  component: Services,
});

const services = [
  { img: sFull, title: "Full Kitchen Remodeling", desc: "End-to-end remodels: design, demo, build, finish — managed by one accountable team.", benefits: ["Fixed-price proposals", "Single project lead", "10-year workmanship warranty"] },
  { img: sCab, title: "Custom Cabinetry", desc: "Hand-built cabinetry tailored to your space, with premium hardware and lifetime hinges.", benefits: ["Furniture-grade construction", "Hand-applied finishes", "Soft-close everywhere"] },
  { img: sCounter, title: "Countertops", desc: "Quartz, marble, granite, and porcelain — sourced, fabricated, and installed in-house.", benefits: ["Slab-yard selection", "Precision templating", "Seam-minimized layouts"] },
  { img: sDesign, title: "Kitchen Design & Layout Planning", desc: "AI-assisted 3D layouts that optimize flow, light, and storage for the way you cook.", benefits: ["3D walkthroughs", "Lighting + electrical plans", "Material specification"] },
  { img: sFloor, title: "Flooring", desc: "Engineered hardwood, herringbone oak, large-format porcelain, and natural stone.", benefits: ["Subfloor leveling", "Moisture mitigation", "Trim integration"] },
  { img: sLight, title: "Lighting", desc: "Layered lighting designs with dimmable LED, statement pendants, and hidden under-cabinet glow.", benefits: ["Designer fixture sourcing", "Smart dimming scenes", "Code-compliant install"] },
  { img: sTile, title: "Tile & Backsplash", desc: "Hand-glazed zellige, slab marble, and statement mosaics — installed by tile specialists.", benefits: ["Designer specification", "Waterproofing", "Custom edge details"] },
  { img: sSmart, title: "Smart Kitchen Upgrades", desc: "Subtle, useful smart features: lighting scenes, integrated appliances, voice-controlled faucets.", benefits: ["Privacy-first systems", "Reliable wiring", "Owner-trained handover"] },
  { img: sOpen, title: "Open Concept Renovations", desc: "Wall removals, structural beams, and unified flooring to open up the heart of your home.", benefits: ["Engineered structural plans", "Permits handled", "Flow-first design"] },
];

function Services() {
  return (
    <>
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="Everything your kitchen needs, under one roof."
              description="From a single countertop swap to a full structural open-concept renovation — designed and built by people who specialize in kitchens."
            />
          </Reveal>
        </div>
      </section>

      <section className="space-y-24 lg:space-y-32 pb-24">
        <div className="container-x space-y-24 lg:space-y-32">
          {services.map((s, i) => (
            <Reveal key={s.title}>
              <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}>
                <div>
                  <img src={s.img} alt={s.title} loading="lazy" className="rounded-2xl object-cover w-full aspect-[4/3] shadow-[var(--shadow-soft)]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium">0{i + 1}</p>
                  <h2 className="font-display text-3xl lg:text-4xl text-charcoal mt-3 text-balance">{s.title}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{s.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-charcoal"><Check className="h-4 w-4 text-olive" /> {b}</li>
                    ))}
                  </ul>
                  <Link to="/estimate" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90">
                    Discuss this service <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
