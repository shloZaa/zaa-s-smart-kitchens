import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import kModern from "@/assets/kitchen-modern.jpg";
import kLuxury from "@/assets/kitchen-luxury.jpg";
import kOpen from "@/assets/kitchen-open.jpg";
import kSmall from "@/assets/kitchen-small.jpg";
import kTrans from "@/assets/kitchen-transitional.jpg";
import kAfter from "@/assets/kitchen-after.jpg";
import kBefore from "@/assets/kitchen-before.jpg";
import sCounter from "@/assets/service-counters.jpg";
import sTile from "@/assets/service-tile.jpg";
import sLight from "@/assets/service-lighting.jpg";

const data: Record<string, { title: string; cat: string; loc: string; hero: string; materials: string[]; timeline: string; quote: string; quoteBy: string; gallery: string[]; }> = {
  "coastal-modern": { title: "Coastal Modern", cat: "Modern", loc: "Half Moon Bay", hero: kModern, materials: ["Matte charcoal lacquer cabinets", "Calacatta quartz", "Brushed nickel hardware"], timeline: "9 weeks", quote: "Felt like a hotel and a home at the same time. Every choice made sense.", quoteBy: "Olivia P.", gallery: [kModern, sCounter, sLight] },
  "sage-heritage": { title: "Sage Heritage", cat: "Luxury", loc: "Hillsborough", hero: kLuxury, materials: ["Hand-painted sage shaker", "Honed marble", "Unlacquered brass"], timeline: "14 weeks", quote: "It's the kind of kitchen our parents would have called a once-in-a-lifetime project.", quoteBy: "Priya M.", gallery: [kLuxury, sTile, sCounter] },
  "open-family": { title: "Open Concept Family", cat: "Open Concept", loc: "Menlo Park", hero: kOpen, materials: ["Navy painted oak", "Quartzite waterfall island", "Smoked glass pendants"], timeline: "12 weeks", quote: "Finally a kitchen that fits two cooks, two kids, and a Friday night dinner party.", quoteBy: "Marcus H.", gallery: [kOpen, kAfter, sLight] },
  "city-galley": { title: "Bright City Galley", cat: "Small Kitchens", loc: "San Francisco", hero: kSmall, materials: ["White shaker", "Butcher block", "Brass pulls"], timeline: "6 weeks", quote: "They made 80 sq ft feel like 200. Storage everywhere.", quoteBy: "Chloe R.", gallery: [kSmall, sCounter, sTile] },
  "warm-transitional": { title: "Warm Transitional", cat: "Transitional", loc: "Burlingame", hero: kTrans, materials: ["Cream painted cabinets", "Quartz", "Polished nickel"], timeline: "10 weeks", quote: "Classic enough for the architecture, modern enough for daily life.", quoteBy: "James K.", gallery: [kTrans, sCounter, sLight] },
  "marble-revival": { title: "Marble Revival", cat: "Transitional", loc: "Palo Alto", hero: kAfter, materials: ["Inset cabinets", "Honed Carrara", "Antique brass"], timeline: "11 weeks", quote: "Took a closed-off 90s kitchen and gave us the heart of the house.", quoteBy: "Anaya S.", gallery: [kAfter, sCounter, sTile] },
};

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const project = data[params.slug];
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.project.title} — Kitchen Remodel | Zaa's AI Kitchen` },
      { name: "description", content: `${loaderData.project.cat} kitchen remodel in ${loaderData.project.loc}. ${loaderData.project.materials.join(", ")}.` },
      { property: "og:title", content: loaderData.project.title },
      { property: "og:description", content: `${loaderData.project.cat} kitchen in ${loaderData.project.loc}.` },
      { property: "og:image", content: loaderData.project.hero },
    ] : [],
  }),
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="font-display text-3xl">Project not found</h1>
      <Link to="/portfolio" className="mt-4 inline-flex text-primary">Back to portfolio</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="container-x py-32 text-center text-muted-foreground">{error.message}</div>,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={project.hero} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
        <div className="container-x relative h-full flex flex-col justify-end pb-12 text-background">
          <p className="text-xs uppercase tracking-[0.2em] text-background/80">{project.cat} • {project.loc}</p>
          <h1 className="font-display text-5xl lg:text-6xl mt-2">{project.title}</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid lg:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-olive">Materials</h3>
            <ul className="mt-3 space-y-1.5 text-charcoal">{project.materials.map(m => <li key={m}>• {m}</li>)}</ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-olive">Timeline</h3>
            <p className="mt-3 font-display text-3xl text-charcoal">{project.timeline}</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-olive">Style</h3>
            <p className="mt-3 font-display text-3xl text-charcoal">{project.cat}</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-soft-gray">
        <div className="container-x">
          <h2 className="font-display text-3xl text-charcoal mb-8">Before & After</h2>
          <BeforeAfter before={kBefore} after={project.hero} />
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.gallery.map((g, i) => (
            <Reveal key={i} delay={i * 60}><img src={g} alt="" loading="lazy" className="rounded-2xl object-cover aspect-[4/5] w-full" /></Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 bg-accent/40">
        <div className="container-x max-w-3xl text-center">
          <p className="font-display text-2xl lg:text-3xl text-charcoal text-balance">"{project.quote}"</p>
          <p className="mt-4 text-sm uppercase tracking-[0.18em] text-olive">— {project.quoteBy}</p>
        </div>
      </section>

      <section className="py-20 text-center">
        <Link to="/estimate" className="inline-flex rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium hover:bg-primary/90">Start your kitchen transformation</Link>
      </section>
    </>
  );
}
