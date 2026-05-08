import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Reveal } from "@/components/site/Reveal";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Linkedin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Zaa's AI Kitchen | Bay Area Kitchen Remodeling" },
      { name: "description", content: "Get in touch with our kitchen design studio. Phone, email, hours, and showroom location." },
      { property: "og:title", content: "Contact Zaa's AI Kitchen" },
      { property: "og:description", content: "We'd love to hear about your project." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(5).max(1000),
});

function Contact() {
  const [busy, setBusy] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const r = schema.safeParse(data);
    if (!r.success) return toast.error(r.error.issues[0].message);
    setBusy(true);
    setTimeout(() => { toast.success("Message sent — we'll be in touch."); setBusy(false); (e.target as HTMLFormElement).reset(); }, 600);
  };
  return (
    <>
      <section className="py-20 lg:py-28">
        <div className="container-x grid lg:grid-cols-2 gap-12">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium">Contact</p>
            <h1 className="font-display text-5xl lg:text-6xl text-charcoal mt-3 text-balance">Let's talk about your kitchen.</h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">Visit our showroom, give us a call, or send a note. We answer within one business day — every time.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {[
                { i: Phone, label: "Phone", v: "(555) 010-2024" },
                { i: Mail, label: "Email", v: "hello@zaaskitchen.com" },
                { i: MapPin, label: "Showroom", v: "240 Industrial Way, San Carlos, CA" },
                { i: Clock, label: "Hours", v: "Mon–Fri 9–6 • Sat 10–4" },
              ].map((c) => (
                <div key={c.label} className="rounded-2xl border border-border p-5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground"><c.i className="h-4 w-4" /></span>
                  <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                  <p className="text-charcoal font-medium">{c.v}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              {[Instagram, Facebook, Linkedin].map((I, i) => (
                <a key={i} href="#" className="p-2.5 rounded-full border border-border hover:bg-primary hover:text-primary-foreground"><I className="h-4 w-4" /></a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <form onSubmit={onSubmit} className="rounded-3xl bg-card border border-border p-7 lg:p-10 shadow-[var(--shadow-soft)]">
              <h2 className="font-display text-2xl text-charcoal">Send a message</h2>
              <div className="mt-6 grid gap-4">
                <input name="name" placeholder="Your name" maxLength={80} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                <input name="email" type="email" placeholder="Email" maxLength={160} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                <textarea name="message" rows={6} placeholder="How can we help?" maxLength={1000} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none" />
                <button disabled={busy} className="rounded-full bg-primary text-primary-foreground py-3 text-sm font-medium hover:bg-primary/90 disabled:opacity-60">{busy ? "Sending…" : "Send Message"}</button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x">
          <div className="rounded-2xl overflow-hidden border border-border aspect-[16/7]">
            <iframe title="Showroom map" src="https://www.openstreetmap.org/export/embed.html?bbox=-122.27%2C37.49%2C-122.23%2C37.51&amp;layer=mapnik" className="w-full h-full" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  );
}
