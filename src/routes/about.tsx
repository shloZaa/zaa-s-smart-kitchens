import { createFileRoute, Link } from "@tanstack/react-router";
import team from "@/assets/team.jpg";
import kLuxury from "@/assets/kitchen-luxury.jpg";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Award, Users, Sprout, Wrench } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Modern Kitchen Designers & Builders | Zaa's AI Kitchen" },
      { name: "description", content: "Meet the design-led team blending craftsmanship and smart planning to create luxury kitchens homeowners love." },
      { property: "og:title", content: "About Zaa's AI Kitchen" },
      { property: "og:description", content: "Design, craftsmanship, and smart planning under one roof." },
      { property: "og:image", content: team },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-end">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium">About us</p>
            <h1 className="font-display text-5xl lg:text-6xl text-charcoal mt-3 text-balance">A studio for kitchens that just feel right.</h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Zaa's AI Kitchen is a design-build studio creating modern luxury kitchens across the Bay Area. We blend designer-led aesthetics, master craftsmanship, and smart planning so the most important room in your home actually works for you.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <img src={kLuxury} alt="Sage green luxury kitchen" loading="lazy" className="rounded-2xl shadow-[var(--shadow-elegant)] aspect-[4/3] object-cover w-full" />
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-soft-gray">
        <div className="container-x grid lg:grid-cols-3 gap-10">
          {[
            { icon: Sprout, title: "Our story", body: "Founded in 2014 by a designer and a master cabinetmaker who were tired of remodels that looked great but lived poorly. Today our studio has completed 400+ kitchens." },
            { icon: Award, title: "Mission", body: "To make luxury kitchen remodeling clear, calm, and creatively ambitious — every step from sketch to install handled by people who care." },
            { icon: Wrench, title: "Modern approach", body: "We pair AI-assisted layout planning with hand-finished cabinetry. Smart where it helps, traditional where it matters." },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 80}>
              <div className="h-full rounded-2xl bg-card border border-border p-8 hover-lift">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground"><b.icon className="h-6 w-6" /></span>
                <h3 className="font-display text-2xl mt-5 text-charcoal">{b.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <Reveal><SectionHeading align="center" eyebrow="The team" title="Designers, planners, and craftspeople." /></Reveal>
          <Reveal delay={120}>
            <img src={team} alt="Zaa's AI Kitchen team" loading="lazy" className="mt-12 rounded-2xl object-cover w-full aspect-[16/9] shadow-[var(--shadow-soft)]" />
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {[
              { n: "Zaa Hassan", r: "Founder & Lead Designer" },
              { n: "Eliana Brooks", r: "Studio Director" },
              { n: "Marcus Chen", r: "Master Cabinetmaker" },
            ].map((m) => (
              <div key={m.n} className="text-center">
                <p className="font-display text-xl text-charcoal">{m.n}</p>
                <p className="text-sm text-muted-foreground">{m.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-accent/40">
        <div className="container-x grid lg:grid-cols-4 gap-8 text-center">
          {[
            { k: "400+", v: "Kitchens completed" },
            { k: "12 yrs", v: "Building together" },
            { k: "98%", v: "On-time delivery" },
            { k: "4.9★", v: "Average review" },
          ].map((s) => (
            <div key={s.k}>
              <p className="font-display text-5xl text-primary"><Users className="hidden" />{s.k}</p>
              <p className="mt-2 text-sm text-charcoal/70 uppercase tracking-wider">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="container-x">
          <h2 className="font-display text-4xl text-charcoal text-balance">Let's design the kitchen you'll actually love.</h2>
          <Link to="/estimate" className="mt-6 inline-flex rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium hover:bg-primary/90">Start with a Free Estimate</Link>
        </div>
      </section>
    </>
  );
}
