import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Sparkles, Upload, Image as ImageIcon, Wand2, ArrowRight, Loader2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { generateKitchen } from "@/lib/generate-kitchen.server";
import hero from "@/assets/hero-kitchen.jpg";

export const Route = createFileRoute("/visualize")({
  head: () => ({
    meta: [
      { title: "AI Kitchen Visualizer | Zaa's AI Kitchen" },
      { name: "description", content: "Upload a photo of your current kitchen and let our AI show you a beautifully redesigned version in seconds." },
      { property: "og:title", content: "Visualize Your Dream Kitchen with AI" },
      { property: "og:description", content: "Upload, describe, and see your kitchen reimagined by AI." },
      { property: "og:image", content: hero },
    ],
  }),
  component: Visualize,
});

function Visualize() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG or PNG)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be smaller than 10MB");
      return;
    }
    setPhoto(file);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0] ?? null);
  };

  const handleGenerate = async () => {
    if (!photo || !preview) {
      toast.error("Upload a photo of your kitchen first");
      return;
    }
    if (description.trim().length < 5) {
      toast.error("Describe what you'd like to change (at least a few words)");
      return;
    }
    setGenerating(true);
    setResult(null);
    try {
      const { imageDataUrl } = await generateKitchen({
        data: { photoDataUrl: preview, description: description.trim() },
      });
      setResult(imageDataUrl);
      toast.success("Your AI kitchen design is ready!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Try again.";
      toast.error(message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 bg-gradient-to-b from-soft-gray to-background">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-sage/15 text-sage px-4 py-1.5 text-xs uppercase tracking-[0.2em] border border-sage/30">
                <Sparkles className="h-3 w-3" /> New · Powered by AI
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-5 text-charcoal text-balance leading-[1.05]">
                See your kitchen,<br />reimagined in seconds.
              </h1>
              <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
                Upload a photo of your current kitchen, describe the look you want, and our AI will generate a custom redesign — instantly.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TOOL */}
      <section className="pb-24 lg:pb-32">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT: Inputs */}
            <Reveal>
              <div className="rounded-3xl bg-card border border-border p-6 lg:p-8 shadow-[var(--shadow-soft)]">
                <h2 className="font-display text-2xl text-charcoal flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sage text-sage-foreground text-sm font-semibold">1</span>
                  Upload your kitchen
                </h2>

                <label
                  htmlFor="kitchen-photo"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="mt-5 block cursor-pointer rounded-2xl border-2 border-dashed border-border bg-soft-gray hover:border-sage hover:bg-sage/5 transition-colors"
                >
                  {preview ? (
                    <div className="relative">
                      <img src={preview} alt="Your kitchen" className="w-full h-72 object-cover rounded-2xl" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setPhoto(null);
                          setPreview(null);
                          if (inputRef.current) inputRef.current.value = "";
                        }}
                        className="absolute top-3 right-3 rounded-full bg-background/95 text-charcoal text-xs font-medium px-3 py-1.5 hover:bg-background"
                      >
                        Change photo
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-sage/15 text-sage">
                        <Upload className="h-6 w-6" />
                      </span>
                      <p className="mt-4 font-medium text-charcoal">Drop a photo here or click to upload</p>
                      <p className="mt-1 text-sm text-muted-foreground">JPG or PNG · up to 10MB</p>
                    </div>
                  )}
                  <input
                    id="kitchen-photo"
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                  />
                </label>

                <div className="mt-8">
                  <h2 className="font-display text-2xl text-charcoal flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sage text-sage-foreground text-sm font-semibold">2</span>
                    Describe your vision
                  </h2>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Replace the cabinets with deep navy shaker style, swap the counters for white marble, add brushed gold hardware, and warm wood floors."
                    rows={5}
                    maxLength={500}
                    className="mt-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-charcoal placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-sage/40"
                  />
                  <div className="mt-1 text-xs text-muted-foreground text-right">{description.length}/500</div>
                </div>

                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating}
                  className="mt-4 group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 text-sm font-medium hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Generating your kitchen…
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" /> Generate my dream kitchen
                    </>
                  )}
                </button>
              </div>
            </Reveal>

            {/* RIGHT: Result */}
            <Reveal delay={120}>
              <div className="rounded-3xl bg-soft-gray border border-border p-6 lg:p-8 h-full min-h-[500px] flex flex-col">
                <h2 className="font-display text-2xl text-charcoal flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-charcoal text-background text-sm font-semibold">3</span>
                  Your AI redesign
                </h2>

                <div className="mt-5 flex-1 rounded-2xl bg-background border border-border flex items-center justify-center overflow-hidden">
                  {generating ? (
                    <div className="text-center px-6">
                      <Loader2 className="h-8 w-8 animate-spin text-sage mx-auto" />
                      <p className="mt-4 text-sm text-muted-foreground">Designing your kitchen with AI…</p>
                      <p className="text-xs text-muted-foreground/80 mt-1">This usually takes 15–30 seconds</p>
                    </div>
                  ) : result ? (
                    <img src={result} alt="AI-generated kitchen redesign" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center px-6 py-12">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-sage/10 text-sage">
                        <ImageIcon className="h-6 w-6" />
                      </span>
                      <p className="mt-4 font-medium text-charcoal">Your redesigned kitchen will appear here</p>
                      <p className="mt-1 text-sm text-muted-foreground max-w-xs mx-auto">Upload a photo and describe what you want changed to get started.</p>
                    </div>
                  )}
                </div>

                {result && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link to="/estimate" className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90">
                      Get an estimate for this design <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <button type="button" onClick={() => setResult(null)} className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-background">
                      Start over
                    </button>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* DISCLAIMER */}
          <Reveal>
            <p className="mt-8 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
              AI-generated images are for inspiration only. Final kitchen designs may vary based on structural, plumbing, and electrical considerations. Get a free estimate to see what's possible in your space.
            </p>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 lg:py-32 bg-soft-gray">
        <div className="container-x">
          <Reveal>
            <SectionHeading align="center" eyebrow="How it works" title="Three steps to your dream kitchen." />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
            {[
              { n: "01", t: "Upload your photo", d: "Snap a picture of your current kitchen — the AI uses it as the canvas." },
              { n: "02", t: "Describe the vision", d: "Tell the AI what you want: cabinet color, countertops, floors, lighting, and style." },
              { n: "03", t: "See it come to life", d: "Get a photoreal redesign in seconds. Love it? Request an estimate to make it real." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="h-full rounded-2xl bg-card border border-border p-7 hover-lift">
                  <span className="font-display text-3xl text-sage">{s.n}</span>
                  <h3 className="font-display text-xl mt-3 text-charcoal">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
