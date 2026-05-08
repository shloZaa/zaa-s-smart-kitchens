import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="bg-charcoal text-background pt-20 pb-10 mt-24">
      <div className="container-x grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-2 space-y-5">
          <h3 className="font-display text-2xl">Zaa's AI Kitchen</h3>
          <p className="text-background/70 max-w-md text-sm leading-relaxed">
            Custom kitchen remodeling, design, and installation built around
            your lifestyle. Modern luxury kitchens designed smarter.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes("@")) return toast.error("Enter a valid email");
              toast.success("Subscribed — design tips coming your way.");
              setEmail("");
            }}
            className="flex max-w-sm gap-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 rounded-full bg-background/10 border border-background/20 px-4 py-2.5 text-sm placeholder:text-background/50 focus:outline-none focus:border-background/60"
            />
            <button className="rounded-full bg-sage px-5 py-2.5 text-sm font-medium text-sage-foreground hover:bg-sage/90">
              Join
            </button>
          </form>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/testimonials">Reviews</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> (555) 010-2024</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@zaaskitchen.com</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Serving the Bay Area</li>
          </ul>
          <div className="flex gap-3 mt-5">
            <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-background/10 hover:bg-sage hover:text-sage-foreground"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-background/10 hover:bg-sage hover:text-sage-foreground"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn" className="p-2 rounded-full bg-background/10 hover:bg-sage hover:text-sage-foreground"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="container-x mt-14 pt-6 border-t border-background/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-background/60">
        <p>© {new Date().getFullYear()} Zaa's AI Kitchen. All rights reserved.</p>
        <p>Licensed kitchen contractor • Custom kitchens • Luxury kitchen remodel</p>
      </div>
    </footer>
  );
}
