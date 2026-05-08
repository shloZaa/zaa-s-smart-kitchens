import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Hammer, Ruler, ShieldCheck, Star, MapPin } from "lucide-react";
import hero from "@/assets/hero-kitchen.jpg";
import kModern from "@/assets/kitchen-modern.jpg";
import kLuxury from "@/assets/kitchen-luxury.jpg";
import kOpen from "@/assets/kitchen-open.jpg";
import kBefore from "@/assets/kitchen-before.jpg";
import kAfter from "@/assets/kitchen-after.jpg";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BeforeAfter } from "@/components/site/BeforeAfter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luxury Kitchen Remodeling, Designed Smarter | Zaa's AI Kitchen" },
      { name: "description", content: "Custom kitchen remodeling, design, and installation built around your lifestyle. Free estimate, premium craftsmanship." },
      { property: "og:title", content: "Luxury Kitchens Designed Smarter" },
      { property: "og:description", content: "Custom kitchen remodeling and design built around your lifestyle." },
      { property: "og:image", content: hero },
    ],
  }),
  component: Home,
});

const features = [
  { icon: Sparkles, title: "Smarter Design", body: "AI-assisted layout planning that maximizes flow, light, and storage for the way you actually live." },
  { icon: Hammer, title: "Master Craftsmanship", body: "In-house cabinetry and finish carpenters with decades of high-end residential experience." },
  { icon: Ruler, title: "Precise Project Management", body: "Detailed timelines, daily updates, and one accountable lead from demo to reveal." },
  { icon: ShieldCheck, title: "10-Year Warranty", body: "Every install backed by an industry-leading workmanship and materials guarantee." },
];

const process = [
  { n: "01", t: "Discovery Call", d: "Free 30-minute consultation to understand your vision, constraints, and budget." },
  { n: "02", t: "Smart Design", d: "3D layout, material selections, and a fixed-price proposal — usually within 10 days." },
  { n: "03", t: "Pre-Construction", d: "Permits, ordering, and a precise schedule so you know exactly what happens each week." },
  { n: "04", t: "Build & Install", d: "Clean job site, daily updates, and a single project lead through the entire build." },
  { n: "05", t: "Reveal & Care", d: "Walkthrough, punch list, and a 10-year workmanship warranty on the finished kitchen." },
];

const testimonials = [
  { name: "Olivia Park", quote: "They turned a cramped 90s galley into the heart of our home. The design instincts were unmatched.", role: "Palo Alto, CA", rating: 5 },
  { name: "Marcus Hale", quote: "Smart, organized, and genuinely talented. Our open-concept remodel finished a week early and on budget.", role: "Berkeley, CA", rating: 5 },
  { name: "Priya Mehta", quote: "Custom cabinetry that looks like furniture. Zaa's team treats every detail like it's their own home.", role: "San Mateo, CA", rating: 5 },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden">
        <img src={hero} alt="Luxury custom kitchen with deep blue cabinets and marble island" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-charcoal/20" />
        <div className="container-x relative pb-20 lg:pb-32 pt-32 text-background">
          <div className="max-w-3xl space-y-6 animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/15 backdrop-blur px-4 py-1.5 text-xs uppercase tracking-[0.2em] border border-background/20">
              <Sparkles className="h-3 w-3" /> AI-assisted kitchen design
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-balance">
              Luxury Kitchens<br />Designed Smarter.
            </h1>
            <p className="text-lg lg:text-xl max-w-xl text-background/85">
              Custom kitchen remodeling, design, and installation built around your lifestyle.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/estimate" className="group inline-flex items-center gap-2 rounded-full bg-background text-charcoal px-7 py-3.5 text-sm font-medium hover:bg-sage hover:text-sage-foreground transition-all">
                Get Free Estimate <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-full border border-background/40 px-7 py-3.5 text-sm font-medium text-background hover:bg-background/10 transition-all">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Why Zaa's AI Kitchen"
              title="A smarter way to remodel your kitchen."
              description="We combine designer-led aesthetics with rigorous project management — so your kitchen is beautiful, functional, and on-time."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="h-full rounded-2xl bg-card border border-border p-7 hover-lift">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl mt-5 text-charcoal">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER */}
      <section className="py-24 lg:py-32 bg-soft-gray">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Real transformations"
              title="See what your space could become."
              description="Drag the slider to reveal what thoughtful kitchen design and craftsmanship can do for an outdated layout."
            />
            <div className="mt-6 flex gap-3">
              <Link to="/portfolio" className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90">Browse Portfolio</Link>
              <Link to="/estimate" className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-background">Start Yours</Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <BeforeAfter before={kBefore} after={kAfter} />
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading align="center" eyebrow="Our process" title="Designed beautifully. Built properly." />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {process.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="relative h-full rounded-2xl border border-border bg-card p-6 hover-lift">
                  <span className="font-display text-3xl text-olive">{s.n}</span>
                  <h3 className="font-display text-lg mt-3 text-charcoal">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-24 lg:py-32 bg-soft-gray">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow="Featured projects" title="Recently designed & installed." />
              <Link to="/portfolio" className="text-sm font-medium text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              { img: kModern, title: "Coastal Modern", loc: "Half Moon Bay" },
              { img: kLuxury, title: "Sage Heritage", loc: "Hillsborough" },
              { img: kOpen, title: "Open Concept Family", loc: "Menlo Park" },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <Link to="/portfolio" className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-background">
                      <p className="text-xs uppercase tracking-[0.18em] text-background/80">{p.loc}</p>
                      <h3 className="font-display text-2xl mt-1">{p.title}</h3>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <Reveal><SectionHeading align="center" eyebrow="Homeowners" title="Trusted by people who care about details." /></Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="h-full rounded-2xl bg-card border border-border p-7">
                  <div className="flex gap-1 text-olive">
                    {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="mt-4 text-charcoal leading-relaxed">"{t.quote}"</p>
                  <div className="mt-5 pt-5 border-t border-border">
                    <p className="font-medium text-charcoal">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-24 lg:py-32 bg-accent/40">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <SectionHeading eyebrow="Service areas" title="Proudly serving the Bay Area." description="From San Francisco to San Jose, we design and build kitchens for discerning homeowners across the Peninsula and East Bay." />
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              {["San Francisco", "Palo Alto", "Menlo Park", "Atherton", "Hillsborough", "Berkeley", "Oakland", "San Mateo", "Burlingame"].map((c) => (
                <div key={c} className="flex items-center gap-2 text-charcoal/80"><MapPin className="h-3.5 w-3.5 text-olive" /> {c}</div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-soft)] aspect-[4/3]">
              <iframe title="Service area map" src="https://www.openstreetmap.org/export/embed.html?bbox=-122.55%2C37.35%2C-121.95%2C37.85&amp;layer=mapnik" className="w-full h-full" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINANCING */}
      <section className="py-20">
        <div className="container-x">
          <Reveal>
            <div className="rounded-3xl bg-primary text-primary-foreground p-10 lg:p-14 grid lg:grid-cols-[1fr_auto] gap-6 items-center shadow-[var(--shadow-elegant)]">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-background/70">Financing</p>
                <h3 className="font-display text-3xl lg:text-4xl mt-2 text-balance">Flexible financing from 0% APR.</h3>
                <p className="mt-3 text-background/80 max-w-xl">Spread your kitchen investment across 12, 24, or 60 months with our certified lending partners.</p>
              </div>
              <Link to="/estimate" className="rounded-full bg-background text-charcoal px-7 py-3.5 text-sm font-medium hover:bg-sage hover:text-sage-foreground transition-colors">Check Eligibility</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 lg:py-32 bg-soft-gray">
        <div className="container-x text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium">Your dream kitchen starts here</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-3 text-charcoal text-balance">Smarter kitchen remodeling.<br />Beautiful by design.</h2>
            <div className="mt-8 flex justify-center flex-wrap gap-3">
              <Link to="/estimate" className="rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium hover:bg-primary/90">Get Free Estimate</Link>
              <Link to="/portfolio" className="rounded-full border border-border px-7 py-3.5 text-sm font-medium hover:bg-background">View Portfolio</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
