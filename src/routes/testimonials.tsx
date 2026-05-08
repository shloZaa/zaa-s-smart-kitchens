import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import kModern from "@/assets/kitchen-modern.jpg";
import kLuxury from "@/assets/kitchen-luxury.jpg";
import kOpen from "@/assets/kitchen-open.jpg";
import kSmall from "@/assets/kitchen-small.jpg";
import kTrans from "@/assets/kitchen-transitional.jpg";
import kAfter from "@/assets/kitchen-after.jpg";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Reviews — What Homeowners Say | Zaa's AI Kitchen" },
      { name: "description", content: "Real reviews from Bay Area homeowners about their kitchen remodels with Zaa's AI Kitchen." },
      { property: "og:title", content: "Reviews — Zaa's AI Kitchen" },
      { property: "og:description", content: "Trusted by homeowners who care about details." },
    ],
  }),
  component: Testimonials,
});

const reviews = [
  { name: "Olivia Park", loc: "Palo Alto, CA", proj: "Modern Remodel", img: kModern, rating: 5, text: "From the first call through final walkthrough, every interaction felt thoughtful. The 3D plans were spot on and our finished kitchen is even better in person." },
  { name: "Marcus Hale", loc: "Berkeley, CA", proj: "Open Concept", img: kOpen, rating: 5, text: "Smart, organized, and genuinely talented. Our open-concept remodel finished a week early and on budget. The structural beam was handled flawlessly." },
  { name: "Priya Mehta", loc: "Hillsborough", proj: "Sage Heritage", img: kLuxury, rating: 5, text: "Custom cabinetry that looks like furniture. Marcus's craftsmanship is unmatched and the design instincts felt like a true partnership." },
  { name: "Chloe Rivera", loc: "San Francisco", proj: "Bright City Galley", img: kSmall, rating: 5, text: "We have a tiny kitchen and they made it feel huge. Storage everywhere, sightlines opened up, and the whole project finished in 6 weeks." },
  { name: "James Kim", loc: "Burlingame", proj: "Warm Transitional", img: kTrans, rating: 5, text: "Classic enough to match the architecture, modern enough for our daily life. The lighting plan transformed the entire room." },
  { name: "Anaya Shah", loc: "Palo Alto, CA", proj: "Marble Revival", img: kAfter, rating: 5, text: "They took a closed-off 90s kitchen and gave us the heart of the house. We host every weekend now." },
];

function Testimonials() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <Reveal><SectionHeading align="center" eyebrow="Reviews" title="What homeowners are saying." description="Real projects, real homeowners, real outcomes." /></Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 60}>
              <div className="rounded-2xl bg-card border border-border overflow-hidden hover-lift grid sm:grid-cols-[180px_1fr]">
                <img src={r.img} alt={r.proj} loading="lazy" className="w-full h-full object-cover aspect-square sm:aspect-auto" />
                <div className="p-6">
                  <div className="flex gap-1 text-olive">{Array.from({ length: r.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
                  <p className="mt-3 text-charcoal leading-relaxed">"{r.text}"</p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="font-medium text-charcoal">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.loc} • {r.proj}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
