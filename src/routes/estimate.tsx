import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Reveal } from "@/components/site/Reveal";
import { ShieldCheck, Clock, Sparkles, Upload } from "lucide-react";
import hero from "@/assets/hero-kitchen.jpg";

export const Route = createFileRoute("/estimate")({
  head: () => ({
    meta: [
      { title: "Get a Free Kitchen Remodel Estimate | Zaa's AI Kitchen" },
      { name: "description", content: "Free, no-pressure consultation. Tell us about your kitchen project and get a detailed estimate within days." },
      { property: "og:title", content: "Free Kitchen Remodel Estimate" },
      { property: "og:description", content: "Start your kitchen transformation with a free consultation." },
      { property: "og:image", content: hero },
    ],
  }),
  component: Estimate,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Valid email required").max(160),
  phone: z.string().trim().min(7, "Phone required").max(30),
  projectType: z.string().min(1, "Select project type"),
  budget: z.string().min(1, "Select a budget range"),
  timeline: z.string().min(1, "Select a timeline"),
  message: z.string().max(1000).optional(),
});

function Estimate() {
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thanks! We'll reach out within one business day.");
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 700);
  };
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium">Free consultation</p>
          <h1 className="font-display text-5xl lg:text-6xl text-charcoal mt-3 text-balance">Start your kitchen transformation.</h1>
          <p className="mt-5 text-muted-foreground leading-relaxed">No pressure. No obligation. A 30-minute discovery call followed by a clear, itemized proposal — usually back in your inbox within 10 days.</p>
          <ul className="mt-8 space-y-4">
            {[
              { i: ShieldCheck, t: "Fixed-price proposals", d: "No surprises mid-project." },
              { i: Clock, t: "Reply within 1 business day", d: "Real humans, not chatbots." },
              { i: Sparkles, t: "Designer-led from day one", d: "AI-assisted layout planning included." },
            ].map((b) => (
              <li key={b.t} className="flex gap-3"><span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground"><b.i className="h-4 w-4" /></span>
                <div><p className="font-medium text-charcoal">{b.t}</p><p className="text-sm text-muted-foreground">{b.d}</p></div></li>
            ))}
          </ul>
          <img src={hero} alt="Luxury kitchen" loading="lazy" className="mt-10 rounded-2xl aspect-[4/3] object-cover w-full hidden lg:block" />
        </Reveal>
        <Reveal delay={120}>
          <form onSubmit={onSubmit} className="rounded-3xl bg-card border border-border p-7 lg:p-10 shadow-[var(--shadow-soft)]">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name"><input name="name" required maxLength={80} className={input} /></Field>
              <Field label="Email"><input name="email" type="email" required maxLength={160} className={input} /></Field>
              <Field label="Phone"><input name="phone" required maxLength={30} className={input} /></Field>
              <Field label="Project Type">
                <select name="projectType" required className={input}>
                  <option value="">Select…</option>
                  {["Full Remodel", "Cabinetry Only", "Countertops", "Open Concept", "Smart Upgrades", "Design Only"].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Budget Range">
                <select name="budget" required className={input}>
                  <option value="">Select…</option>
                  {["Under $50k", "$50k – $100k", "$100k – $200k", "$200k+"].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Timeline">
                <select name="timeline" required className={input}>
                  <option value="">Select…</option>
                  {["ASAP", "1–3 months", "3–6 months", "Just exploring"].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Inspiration Photos (optional)" className="mt-4">
              <label className="flex items-center gap-2 cursor-pointer rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:border-primary">
                <Upload className="h-4 w-4" /> Upload images
                <input name="photos" type="file" multiple accept="image/*" className="hidden" />
              </label>
            </Field>
            <Field label="Tell us about your project" className="mt-4">
              <textarea name="message" rows={5} maxLength={1000} className={input + " resize-none"} />
            </Field>
            <button disabled={submitting} className="mt-6 w-full rounded-full bg-primary text-primary-foreground py-3.5 text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
              {submitting ? "Sending…" : "Start Your Kitchen Transformation"}
            </button>
            <p className="mt-3 text-xs text-center text-muted-foreground">By submitting, you agree to be contacted about your project.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
const input = "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary";
function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return <label className={`block ${className}`}><span className="block text-xs font-medium text-charcoal/80 mb-1.5 uppercase tracking-wider">{label}</span>{children}</label>;
}
