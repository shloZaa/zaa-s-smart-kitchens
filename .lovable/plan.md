# Zaa's AI Kitchen — Premium Remodeling Website

A modern, conversion-focused multi-page site with luxury kitchen imagery, refined typography, and smooth motion. Built on TanStack Start with file-based routing, semantic design tokens, and SSR-friendly per-page SEO.

## Design system

Tokens added to `src/styles.css` (oklch):
- `--deep-blue` (primary), `--white`, `--soft-gray`, `--charcoal` (foreground), `--sage`, `--olive` (accents)
- Gradients (`--gradient-hero`, `--gradient-sage`), shadows (`--shadow-elegant`, `--shadow-soft`), radius scale
- Typography pair: **Fraunces** (display serif) + **Inter** (body) loaded via Google Fonts in `__root.tsx`
- Section rhythm alternates white / soft-gray / sage tinted bands
- Reusable motion utilities: `fade-in-up`, `reveal-on-scroll`, `hover-lift`

## Imagery

Generate ~10 realistic modern kitchen images via `imagegen` (hero, before/after pairs, service tiles, portfolio thumbs, about/team ambience). Stored in `src/assets/`.

## Routes (file-based, each with own `head()` SEO)

```text
src/routes/
  __root.tsx           layout: Header + Outlet + Footer + FloatingEstimateButton
  index.tsx            Home
  about.tsx            About
  services.tsx         Services overview (all sections)
  portfolio.tsx        Filterable gallery
  portfolio.$slug.tsx  Project detail (before/after slider, materials, timeline, testimonial, gallery)
  estimate.tsx         Estimate form
  contact.tsx          Contact + map + hours
  testimonials.tsx     Reviews
  blog.tsx             Article previews
```

## Shared components (`src/components/site/`)

Header (sticky, transparent→solid on scroll), Footer (newsletter, links, socials), SectionHeading, CTAButton variants, KitchenCard, ServiceCard, TestimonialCard, ProcessStep, BeforeAfterSlider, PortfolioGrid with category filter, FAQAccordion, FinancingBanner, ServiceAreaMap (embedded Google Maps iframe), InstagramGallery (image grid), FloatingEstimateButton, NewsletterForm.

## Page contents (high level)

- **Home**: Hero (full-bleed image, headline, dual CTA) → Why Choose (4 icon stats) → Before/After showcase → 5-step Process → Featured Projects (3 cards linking to portfolio) → Testimonials carousel → Service Areas → Financing band → Final CTA banner
- **About**: Story, mission, modern approach, 3 team members, trust badges
- **Services**: 9 service blocks in alternating zigzag layout, each with description, benefits list, image, CTA
- **Portfolio**: Category chips (All / Modern / Transitional / Luxury / Small Kitchens / Open Concept), masonry grid with hover overlay, click → detail page
- **Project detail**: Hero, before/after slider, meta (materials, timeline), client quote, photo gallery
- **Estimate**: Two-column layout — trust copy left, multi-field form right (zod-validated, file upload field, success toast)
- **Contact**: Form, info cards, Google Maps embed, hours, socials
- **Testimonials**: Grid of review cards with star ratings, photo, name, project type
- **Blog**: 6 article preview cards in grid with category tags

## Form validation

`zod` schemas for estimate + contact + newsletter. Client-side only (no backend yet) — submission shows success toast via existing sonner.

## SEO

Per-route `head()` with unique title, description, og:title, og:description; og:image set to that page's hero image. JSON-LD `LocalBusiness` on home and contact.

## Out of scope (this build)

- Real backend submissions / database (forms are UI only) — can wire to Lovable Cloud later
- Real blog CMS — preview cards only
- Auth, payments

## Technical notes

- Semantic tokens only — no hardcoded hex in components
- Images imported as ES6 modules from `src/assets/`
- All routes SSR-safe; no `window` access in loaders
- Mobile responsive with Tailwind breakpoints; sticky header collapses to drawer on mobile
- Smooth scroll reveals via IntersectionObserver hook
