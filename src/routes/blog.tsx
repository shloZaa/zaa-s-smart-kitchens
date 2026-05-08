import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import kModern from "@/assets/kitchen-modern.jpg";
import kLuxury from "@/assets/kitchen-luxury.jpg";
import kOpen from "@/assets/kitchen-open.jpg";
import kSmall from "@/assets/kitchen-small.jpg";
import kTrans from "@/assets/kitchen-transitional.jpg";
import sCounter from "@/assets/service-counters.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Resources & Blog — Kitchen Remodeling Tips | Zaa's AI Kitchen" },
      { name: "description", content: "Kitchen remodeling tips, design trends, layout ideas, storage solutions, budgeting, and countertop comparisons." },
      { property: "og:title", content: "Kitchen Remodeling Resources" },
      { property: "og:description", content: "Tips, trends, and ideas for your next kitchen." },
    ],
  }),
  component: Blog,
});

const posts = [
  { img: kModern, cat: "Trends", title: "10 Modern Kitchen Trends Worth Investing In", excerpt: "Which design moves age beautifully — and which look dated by next year." },
  { img: kOpen, cat: "Layout", title: "Open Concept vs. Broken-Plan: What Actually Lives Better", excerpt: "How to balance flow with the quiet zones every household needs." },
  { img: sCounter, cat: "Materials", title: "Quartz vs. Marble vs. Quartzite: A Real-World Comparison", excerpt: "Pricing, durability, maintenance, and how each performs after 5 years of cooking." },
  { img: kSmall, cat: "Storage", title: "21 Storage Ideas for Small Kitchens That Actually Work", excerpt: "Pull-outs, corner solutions, and the cabinet hardware that makes the difference." },
  { img: kTrans, cat: "Budgeting", title: "How to Budget a Kitchen Remodel Without Surprises", excerpt: "A line-by-line breakdown of where the money actually goes." },
  { img: kLuxury, cat: "Tips", title: "5 Kitchen Remodeling Mistakes to Avoid in 2026", excerpt: "Hard-won lessons from 400+ projects." },
];

function Blog() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <Reveal><SectionHeading eyebrow="Resources" title="Kitchen ideas, tips, and design thinking." description="Field notes from our studio on remodeling, materials, and modern kitchen design." /></Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.18em] text-olive font-medium">{p.cat}</p>
                <h3 className="font-display text-xl text-charcoal mt-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
